import initSqlJs from 'sql.js';

let SQL: initSqlJs.SqlJsStatic | null = null;
let masterDbBuffer: Uint8Array | null = null;

export async function initSqlEngine() {
  if (SQL) return SQL;
  try {
    console.log("Initializing SQL.js engine...");
    SQL = await initSqlJs({
      locateFile: file => {
        // Using unpkg CDN guarantees the wasm file is found, bypassing Next.js asset pipeline issues
        const url = `https://unpkg.com/sql.js@1.14.1/dist/${file}`;
        console.log(`SQL.js locating file: ${url}`);
        return url;
      }
    });
    console.log("SQL.js engine initialized.");
    return SQL;
  } catch (err) {
    console.error("SQL.js initialization failed:", err);
    throw err;
  }
}

export function createDatabase() {
  if (!SQL) throw new Error("SQL engine not initialized");
  if (masterDbBuffer) {
    return new SQL.Database(masterDbBuffer);
  }
  return new SQL.Database();
}

import { EXTENDED_SEED_SCHEMA } from '@/data/seed-sql';

export interface QueryResult {
  columns: string[];
  values: any[][];
}

export interface ValidationResult {
  success: boolean;
  actual: QueryResult[];
  expected?: QueryResult[];
  error?: string;
  isCorrect: boolean;
  timeMs: number;
}

export async function executeAndValidate(
  userQuery: string,
  expectedQuery?: string
): Promise<ValidationResult> {
  await initSqlEngine();
  
  // Initialize master buffer if it doesn't exist
  if (!masterDbBuffer && SQL) {
    console.log("Seeding extended master database schema...");
    const tempDb = new SQL.Database();
    tempDb.run(EXTENDED_SEED_SCHEMA);
    masterDbBuffer = tempDb.export();
    tempDb.close();
  }
  
  // Create a fresh DB instance for user from the cached buffer (Instant)
  const userDb = createDatabase();
  
  const start = performance.now();
  let actual: QueryResult[] = [];
  let error: string | undefined;
  
  try {
    actual = userDb.exec(userQuery);
  } catch (err: any) {
    let errStr = typeof err === 'string' ? err : (err.message || "An unknown SQL error occurred.");
    // Clean up cryptic sqlite errors
    if (errStr.includes("near") || errStr.includes("syntax error")) {
      errStr = `Syntax Error: ${errStr}`;
    } else if (errStr.includes("no such table")) {
      errStr = `Table Not Found: ${errStr}`;
    } else if (errStr.includes("no such column")) {
      errStr = `Column Not Found: ${errStr}`;
    }
    error = errStr;
  } finally {
    userDb.close();
  }
  
  const timeMs = performance.now() - start;
  
  let isCorrect = false;
  let expected: QueryResult[] = [];
  
  if (!error && expectedQuery) {
    const expectedDb = createDatabase();
    try {
      expected = expectedDb.exec(expectedQuery);
      
      // Compare actual and expected JSON
      if (JSON.stringify(actual) === JSON.stringify(expected)) {
        isCorrect = true;
      }
    } catch (e) {
      console.error("Expected query invalid:", e);
    } finally {
      expectedDb.close();
    }
  } else if (!expectedQuery && !error) {
    // If no expected query is provided, it's a free practice query.
    // It's "correct" if it ran without errors.
    isCorrect = true;
  }
  
  return {
    success: !error,
    actual,
    expected: expectedQuery ? expected : undefined,
    error,
    isCorrect,
    timeMs
  };
}
