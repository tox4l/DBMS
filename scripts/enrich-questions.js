const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/data/questions.json');
const questions = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

// Mod 1: 1-15, Mod 2: 16-30, Mod 3: 31-45, Mod 4: 46-60, Mod 5: 61+
// Difficulty: easy, medium, hard, trap

const trapQuestions = [
  // Module 1 Traps
  { id: 1000, text: "Are databases and DBMS exactly the same thing?", type: "mcq", options: ["A) Yes, they are interchangeable terms", "B) No, a database is the data, a DBMS is the software", "C) Yes, both refer to the hardware", "D) No, DBMS is for cloud, database is local"], answer: "B", moduleId: 1, difficulty: "trap", explanation: "A database is the organized collection of data. A DBMS is the software system that manages it." },
  
  // Module 2 Traps
  { id: 1001, text: "Can an M:N relationship be implemented directly in a relational database?", type: "mcq", options: ["A) Yes, using foreign keys on both sides", "B) No, it must be resolved with a bridge table", "C) Yes, if the DBMS is newer than 2010", "D) No, M:N relationships are theoretically impossible"], answer: "B", moduleId: 2, difficulty: "trap", explanation: "M:N cannot be directly implemented. You MUST use a bridge table containing foreign keys from both sides." },
  { id: 1002, text: "Does the SQL 'SELECT' keyword perform Selection or Projection in relational algebra terms?", type: "mcq", options: ["A) Selection", "B) Projection", "C) Both", "D) Neither"], answer: "B", moduleId: 2, difficulty: "trap", explanation: "TRAP! The SQL SELECT keyword performs projection (choosing columns). The WHERE clause does selection (filtering rows)." },
  { id: 1003, text: "In a 1:M relationship, where does the Foreign Key go?", type: "mcq", options: ["A) In the 'One' side", "B) In the 'Many' side", "C) In a bridge table", "D) It doesn't matter"], answer: "B", moduleId: 2, difficulty: "trap", explanation: "The foreign key always goes in the 'many' side. e.g. Department(1) to Employees(M) -> FK goes in Employee." },

  // Module 3 Traps
  { id: 1004, text: "If you run `DELETE FROM patient;` what happens?", type: "mcq", options: ["A) The table is dropped", "B) An error is thrown", "C) All rows are deleted, but the table structure remains", "D) Only the first row is deleted"], answer: "C", moduleId: 3, difficulty: "trap", explanation: "DELETE without a WHERE clause removes all rows from the table, but the table itself remains." },

  // Module 4 Traps
  { id: 1005, text: "Which clause filters groups AFTER aggregation?", type: "mcq", options: ["A) WHERE", "B) GROUP BY", "C) HAVING", "D) FILTER"], answer: "C", moduleId: 4, difficulty: "trap", explanation: "HAVING filters groups after aggregation. WHERE filters individual rows before aggregation." },
  { id: 1006, text: "Can you rollback an AUTO_INCREMENT value if you delete a row?", type: "mcq", options: ["A) Yes, always", "B) Yes, using ALTER TABLE", "C) No, trying to roll it backwards is ignored", "D) Yes, but only for the last inserted row"], answer: "C", moduleId: 4, difficulty: "trap", explanation: "AUTO_INCREMENT only goes up. You cannot roll it backwards." },

  // Module 5 Traps
  { id: 1007, text: "In MongoDB, what fields are fast to search by default?", type: "mcq", options: ["A) All fields", "B) Only string fields", "C) Only the _id field", "D) No fields are fast until indexed"], answer: "C", moduleId: 5, difficulty: "trap", explanation: "Searching by _id is fast. All other queries result in a full document scan unless you create an index." },
  { id: 1008, text: "Should you embed an array of thousands of items in a single MongoDB document?", type: "mcq", options: ["A) Yes, it's faster", "B) No, use references for large cardinality", "C) Yes, if they are integers", "D) It doesn't matter"], answer: "B", moduleId: 5, difficulty: "trap", explanation: "Documents have a 16MB limit. Unbounded arrays are dangerous. Use references (One-to-Squillions pattern)." }
];

const enriched = questions.map((q) => {
  let moduleId = 1;
  if (q.id > 15 && q.id <= 30) moduleId = 2;
  else if (q.id > 30 && q.id <= 45) moduleId = 3;
  else if (q.id > 45 && q.id <= 60) moduleId = 4;
  else if (q.id > 60) moduleId = 5;

  let difficulty = "medium";
  if (q.id % 3 === 0) difficulty = "hard";
  else if (q.id % 2 === 0) difficulty = "easy";

  return {
    ...q,
    moduleId,
    difficulty,
    explanation: q.explanation || "Review the module content for this topic.",
  };
});

// Append trap questions
const finalQuestions = [...enriched, ...trapQuestions];

fs.writeFileSync(filePath, JSON.stringify(finalQuestions, null, 2));
console.log(`Enriched ${questions.length} existing questions and added ${trapQuestions.length} trap questions.`);
