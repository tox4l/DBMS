import mingo from 'mingo';
import { EXTENDED_MONGO_SEED } from '@/data/seed-mongo';

export interface MongoValidationResult {
  success: boolean;
  actual: any[];
  expected?: any[];
  error?: string;
  isCorrect: boolean;
  timeMs: number;
}

// Deep copy helper
const clone = (obj: any) => JSON.parse(JSON.stringify(obj));

class MockCollection {
  name: string;
  data: any[];

  constructor(name: string, data: any[]) {
    this.name = name;
    this.data = data;
  }

  find(query: any = {}, projection?: any) {
    let cursor = new mingo.Query(query).find(this.data);
    if (projection) {
      // Basic projection support via map
      return cursor.all().map((doc: any) => {
        const ret: any = {};
        const isInclude = Object.values(projection).some(v => v === 1 || v === true);
        const hideId = projection._id === 0 || projection._id === false;
        
        if (isInclude) {
          for (const key in projection) {
            if (projection[key]) ret[key] = doc[key];
          }
          if (!hideId) ret._id = doc._id;
        } else {
          Object.assign(ret, doc);
          for (const key in projection) {
            if (!projection[key]) delete ret[key];
          }
        }
        return ret;
      });
    }
    return cursor.all();
  }
  
  aggregate(pipeline: any[]) {
    return new mingo.Aggregator(pipeline).run(this.data);
  }

  insertOne(doc: any) {
    if (!doc._id) doc._id = Date.now();
    this.data.push(doc);
    return { acknowledged: true, insertedId: doc._id };
  }

  insertMany(docs: any[]) {
    docs.forEach(doc => {
      if (!doc._id) doc._id = Date.now() + Math.random();
      this.data.push(doc);
    });
    return { acknowledged: true, insertedCount: docs.length };
  }

  updateOne(query: any, update: any) {
    const doc = new mingo.Query(query).find(this.data).next();
    if (doc) {
      if (update.$set) Object.assign(doc, update.$set);
      if (update.$unset) {
        for (const key in update.$unset) delete (doc as any)[key];
      }
      return { acknowledged: true, modifiedCount: 1 };
    }
    return { acknowledged: true, modifiedCount: 0 };
  }

  updateMany(query: any, update: any) {
    const docs = new mingo.Query(query).find(this.data).all();
    docs.forEach((doc: any) => {
      if (update.$set) Object.assign(doc, update.$set);
      if (update.$unset) {
        for (const key in update.$unset) delete (doc as any)[key];
      }
    });
    return { acknowledged: true, modifiedCount: docs.length };
  }

  deleteOne(query: any) {
    const idx = this.data.findIndex(doc => new mingo.Query(query).test(doc));
    if (idx !== -1) {
      this.data.splice(idx, 1);
      return { acknowledged: true, deletedCount: 1 };
    }
    return { acknowledged: true, deletedCount: 0 };
  }

  deleteMany(query: any) {
    const initialLen = this.data.length;
    this.data = this.data.filter(doc => !new mingo.Query(query).test(doc));
    return { acknowledged: true, deletedCount: initialLen - this.data.length };
  }
}

class MockDb {
  collections: Record<string, MockCollection> = {};

  constructor(initialData: Record<string, any[]>) {
    for (const [key, val] of Object.entries(initialData)) {
      this.collections[key] = new MockCollection(key, clone(val));
      // Expose collection directly on db object (e.g. db.patients)
      (this as any)[key] = this.collections[key];
    }
  }
}

function runMongoCode(code: string, db: MockDb) {
  // Wrap in a function and execute.
  // We return the last expression's result.
  const fn = new Function('db', `
    try {
      const result = eval(${JSON.stringify(code)});
      // if result is a cursor, we might need to handle it, but our mock find() returns array
      return result;
    } catch(e) {
      throw e;
    }
  `);
  return fn(db);
}

export async function executeMongoValidate(
  userCode: string,
  expectedCode?: string
): Promise<MongoValidationResult> {
  const userDb = new MockDb(EXTENDED_MONGO_SEED);
  const start = performance.now();
  let actual: any[] = [];
  let error: string | undefined;

  try {
    const res = runMongoCode(userCode, userDb);
    // If it's a mutation, we return the entire collection state so they can see what changed
    // We try to guess which collection was mutated
    const match = userCode.match(/db\.([a-zA-Z0-9_]+)\.(insert|update|delete)/);
    if (match) {
      actual = userDb.collections[match[1]].data;
    } else {
      actual = Array.isArray(res) ? res : [res];
    }
  } catch (err: any) {
    error = err.message;
  }
  
  const timeMs = performance.now() - start;

  let isCorrect = false;
  let expected: any[] = [];

  if (!error && expectedCode) {
    const expectedDb = new MockDb(EXTENDED_MONGO_SEED);
    try {
      const expRes = runMongoCode(expectedCode, expectedDb);
      const match = expectedCode.match(/db\.([a-zA-Z0-9_]+)\.(insert|update|delete)/);
      if (match) {
        expected = expectedDb.collections[match[1]].data;
      } else {
        expected = Array.isArray(expRes) ? expRes : [expRes];
      }
      
      if (JSON.stringify(actual) === JSON.stringify(expected)) {
        isCorrect = true;
      }
    } catch (e) {
      console.error("Expected code invalid:", e);
    }
  } else if (!expectedCode && !error) {
    isCorrect = true;
  }

  return {
    success: !error,
    actual,
    expected: expectedCode ? expected : undefined,
    error,
    isCorrect,
    timeMs
  };
}
