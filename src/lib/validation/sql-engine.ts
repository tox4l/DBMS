import initSqlJs from 'sql.js';

let SQL: initSqlJs.SqlJsStatic | null = null;

export async function initSqlEngine() {
  if (SQL) return SQL;
  SQL = await initSqlJs({
    // Fetch the WebAssembly file from the public directory
    locateFile: file => `/${file}`
  });
  return SQL;
}

export function createDatabase() {
  if (!SQL) throw new Error("SQL engine not initialized");
  return new SQL.Database();
}

// A predefined schema that covers the course materials (Patients, Doctors, Students, Courses, Products)
export const SEED_SCHEMA = `
CREATE TABLE patient (
  pid INT PRIMARY KEY,
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  phone VARCHAR(20),
  date_of_birth DATE
);

CREATE TABLE doctor (
  id INT PRIMARY KEY,
  name VARCHAR(50),
  specialty VARCHAR(50)
);

CREATE TABLE appointment (
  apid INT PRIMARY KEY,
  pid INT,
  doctor INT,
  start_time DATETIME,
  duration INT,
  FOREIGN KEY (pid) REFERENCES patient(pid),
  FOREIGN KEY (doctor) REFERENCES doctor(id)
);

CREATE TABLE product (
  prod_code INT PRIMARY KEY,
  name VARCHAR(50),
  regular_price DECIMAL(10,2),
  attribute1 VARCHAR(20)
);

-- Seed some initial data
INSERT INTO patient VALUES (232, 'Mohammed', 'Al Walkra', '4431-1132', '1990-01-01');
INSERT INTO patient VALUES (334, 'Fatima', 'Shamal', '5554-1123', '1995-05-15');
INSERT INTO patient VALUES (400, 'Test', 'Subject', '5555-1111', '2000-10-10');

INSERT INTO doctor VALUES (1, 'Dr. Smith', 'Cardiology');
INSERT INTO doctor VALUES (2, 'Dr. Jones', 'Neurology');

INSERT INTO appointment VALUES (1, 232, 1, '2026-05-01 10:00:00', 30);
INSERT INTO appointment VALUES (2, 334, 2, '2026-05-02 14:00:00', 45);

INSERT INTO product VALUES (1, 'Ajax Soap', 5.99, 'L');
INSERT INTO product VALUES (2, 'Bleach', 3.99, 'M');
INSERT INTO product VALUES (3, 'Ajax Cleaner', 15.00, 'L');
`;

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
  
  // Create a fresh DB instance for user
  const userDb = createDatabase();
  userDb.run(SEED_SCHEMA);
  
  const start = performance.now();
  let actual: QueryResult[] = [];
  let error: string | undefined;
  
  try {
    actual = userDb.exec(userQuery);
  } catch (err: any) {
    error = err.message;
  }
  
  const timeMs = performance.now() - start;
  
  let isCorrect = false;
  let expected: QueryResult[] = [];
  
  if (!error && expectedQuery) {
    const expectedDb = createDatabase();
    expectedDb.run(SEED_SCHEMA);
    try {
      expected = expectedDb.exec(expectedQuery);
      
      // Compare actual and expected JSON
      if (JSON.stringify(actual) === JSON.stringify(expected)) {
        isCorrect = true;
      }
    } catch (e) {
      console.error("Expected query invalid:", e);
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
