# DBMS Complete Curriculum — Lossless Study Guide

> **Course:** Database Management Systems (DBMS)  
> **Institution:** University of Doha for Science & Technology  
> **Tools:** MySQL (relational), MongoDB (NoSQL)  
> **Source:** All content grounded in uploaded lecture slides

---

# CURRICULUM MAP

| Module | Title | Key Topics |
|--------|-------|------------|
| 1 | Database Foundations | Classification, data models, building blocks |
| 2 | Database Design | Keys, relationships, relational algebra, lifecycle, conceptual/logical/physical models, ER-to-table mapping |
| 3 | SQL — Structure & Data | DDL, DML, constraints, INSERT, SELECT, UPDATE, DELETE |
| 4 | SQL — Advanced Querying | Aggregates, GROUP BY, HAVING, table alteration, joins, indexes, views, JSON |
| 5 | NoSQL — MongoDB | Document databases, CRUD, aggregation, arrays, embedded objects, document design, indexes |

---

# MODULE 1: DATABASE FOUNDATIONS

---

## 1.1 Module Overview

This module establishes what databases are, why they exist, how they are classified, and what data models look like at a high level. It sets the vocabulary and conceptual framework for everything that follows.

## 1.2 Why This Module Exists

Before learning SQL or designing schemas, you must understand *what problem databases solve* compared to file systems, how databases are categorized (by location, by model), and what a data model is. Without this foundation, later concepts like ER modeling, normalization, and NoSQL will lack context.

## 1.3 Core Concepts

### Database Classification by Location

**Centralized Database:** Data is kept in one physical location. Administration is simple and there is no possibility of different sites getting incorrect data because there is only a single copy. However, it becomes a single point of failure, and if remote access locations have slow internet, performance suffers. It can also overload the database server. Real-world example: airline systems where a single failure can cancel thousands of flights.

**Distributed Database:** Data is kept in multiple physical locations to make local access faster. Some systems allow the database to be replicated across nodes, providing redundancy — if one node goes down, no data is lost. Considerably more challenging to configure and maintain, but good for situations where you need data close to the end user. Example: the Google search database, where each country or region has its own copy.

### Database Models

**Relational Database:** Everything is stored in tables. Offers a flexible retrieval mechanism. The majority of this course uses MySQL as the relational DBMS.

**Key-Value Stores:** Each record is freeform and can contain anything. Given a key, the system returns the value. The final part of the course uses MongoDB for this model.

### What is a Data Model?

A data model is a representation of a data structure — how data will be stored in a database. It provides the necessary means to achieve abstraction. "Structure" means the data types, relationships, and constraints that apply to the data. "Abstraction" means a simplified representation of what the data looks like.

Three main categories exist:
- **High-level / conceptual data models** — based on entities and relationships
- **Low-level / physical data models** — hardware and storage specifics
- **Representational / implementation data models** — record-based, object-oriented

### Building Blocks of Data Modeling

**Entities:** The things about which we store information (e.g., patient, course, instructor). Also called table or relation. Entity names should always be singular (e.g., "student" not "students").

**Attributes:** The details about an entity (e.g., a patient's name). Also called columns. Attributes define properties of a table.

**Relationships:** How entities or tables are related to each other (e.g., a doctor HAS patients).

**Constraints:** Limits placed on the data (e.g., age must be between 16 and 85).

### Business Rules

Business rules are descriptions of how the business works, from which entities, attributes, relationships, and constraints are derived. They are obtained by talking with people in the business (requirement gathering).

**Translation rules:**
- Nouns in business descriptions → entities
- Verbs associating nouns → relationships
- Limitations mentioned → constraints

### Design is Iterative

Rarely will you design a data model in a single pass. It requires educated guesses, asking questions, and sometimes undoing work. Multiple solutions usually exist for each problem. Taking shortcuts during design leads to many problems during implementation.

### Evolution of Data Models

Third-generation relational models have been around for ~50 years but remain one of the most commonly used. Fourth-generation object-oriented databases never caught on. The "next generation" gaining traction is NoSQL — the course covers this through MongoDB using JSON as the storage technique.

## 1.4 Comparison Tables

| Aspect | Centralized DB | Distributed DB |
|--------|---------------|----------------|
| Data location | One physical location | Multiple physical locations |
| Administration | Simple | Complex |
| Data consistency | Guaranteed (single copy) | Must be managed (replication) |
| Fault tolerance | Single point of failure | Redundancy possible |
| Performance for remote users | Slow if internet is poor | Fast (local copies) |
| Example | Airline reservation system | Google search database |

| Aspect | Relational Database | Key-Value Store |
|--------|-------------------|-----------------|
| Data structure | Tables with rows and columns | Freeform documents |
| Schema | Fixed, predefined | Flexible, schema-less |
| Retrieval | SQL (structured queries) | Key-based lookup |
| Course tool | MySQL | MongoDB |
| Best for | Structured, consistent data | Flexible, varied data |

| Building Block | What It Is | Example | Maps To in SQL |
|---------------|-----------|---------|----------------|
| Entity | A thing we store info about | Patient | Table |
| Attribute | A detail about an entity | Patient name | Column |
| Relationship | Association between entities | Doctor HAS patients | Foreign key / join |
| Constraint | Limit on data values | Age ≥ 16 | CHECK, NOT NULL, etc. |

## 1.5 Trap Areas & Common Mistakes

- **Database vs. DBMS:** A database is the organized collection of data. A DBMS is the software system that manages it (e.g., MySQL, MongoDB). Students often use these terms interchangeably — examiners test this distinction.
- **Entity names must be singular:** "student" not "students". This is a convention that gets tested.
- **Design is never one-pass:** Don't assume your first ER diagram is final.

## 1.6 Exam Relevance

Expect questions on: centralized vs. distributed trade-offs, what a data model is, the three building blocks (entity, attribute, relationship, constraint), and the distinction between database and DBMS.

---

# MODULE 2: DATABASE DESIGN

---

## 2.1 Keys

### Module Overview

Keys are the backbone of relational databases. They enforce uniqueness, establish relationships between tables, and enable deterministic data retrieval. Without understanding keys, you cannot design or query a database correctly.

### Why Keys Exist

In a relational database, every row must be uniquely identifiable. Keys provide this guarantee. They also establish the mechanism for linking tables together (foreign keys) and enable efficient searching.

### Core Concepts

**Key (General Definition):** One or more attributes that uniquely identify a single row. Equivalently: one or more attributes that determine other attributes.

**Functional Dependence:** B is functionally dependent on A if A determines B. Written: A → B. Example: A patient ID determines the name, DoB, and contact information. But a phone number does NOT determine the patient name because two people (e.g., a child and parent) may share the same phone number.

**Determinism notation:** `qid → name, dob, address` means that knowing the QID uniquely tells you the name, date of birth, and address.

**Composite Key:** A key that comprises multiple columns. Sometimes needed when no single column can uniquely identify a row. Example: `student_id, course_number, semester → grade`. A student cannot be enrolled in the same course twice in the same semester, so you need all three to determine the grade.

**Primary Key:** The attribute (or set of attributes) chosen by the database designer to uniquely identify each row. Must be unique and NOT NULL. Each table has exactly one primary key.

**Foreign Key:** An attribute in one table that matches the primary key in a related table. It creates the link between tables. Example: the `pid` column in an appointment table references the `patient_id` in the patient table.

**Secondary Key:** Any key used for data retrieval purposes that is not the primary key. It is not necessarily unique. Example: phone number in Qatar — it narrows down the search but two people might share the same number, and numbers change over time.

**Surrogate Key:** An artificial key (usually auto-incremented integer) with no business meaning. Most common type of primary key in practice. Created using `auto_increment` in MySQL.

### Relational Schema Notation

A textual representation of a table structure:
- Table name comes first
- Attributes listed in parentheses
- Key fields are **underlined** and usually bold

Example:
```
VENDOR (VEND_CODE, VEND_CONTACT, VEND_AREACODE, VEND_PHONE)
PRODUCT (PROD_CODE, PROD_DESCRIPT, PROD_PRICE, PROD_ON_HAND, VEND_CODE)
```

Where VEND_CODE in PRODUCT is a foreign key referencing VENDOR.

### Comparison Table: Key Types

| Key Type | Definition | Unique? | Null Allowed? | Per Table | Example |
|----------|-----------|---------|---------------|-----------|---------|
| Primary Key | Chosen identifier for each row | Yes | No | Exactly 1 | patient_id |
| Foreign Key | References a PK in another table | Not necessarily | Depends on design | 0 or more | pid in appointment referencing patient |
| Composite Key | PK made of multiple columns | Yes (combination) | No | 1 | (student_id, course_id, semester) |
| Secondary Key | Used for searching, not primary | Not necessarily | Yes | 0 or more | Phone number |
| Surrogate Key | Artificial, auto-generated PK | Yes | No | 0 or 1 | auto_increment id |

### Trap Areas

- **A key is about uniqueness, not just any column.** Just because a column has data doesn't make it a key.
- **Composite keys:** All parts are required together. `student_id` alone is not the key if the composite key is `(student_id, course_id, semester)`.
- **Foreign keys can be NULL** (optional relationship) or NOT NULL (mandatory relationship). This is a design decision.
- **Secondary keys are not unique.** Students confuse them with candidate keys from textbook theory.
- **Surrogate vs. natural key:** Surrogate keys have no business meaning (just an auto-incremented number). Natural keys use real data (like QID or email). The course emphasizes that surrogate keys are the most common.

---

## 2.2 Relationships

### Core Concepts

**Relationship:** An association among entities. Every relationship should be readable in both directions: "A student is enrolled in a course" and "A course has students enrolled in it."

### Cardinality Types

**1:M (One-to-Many):** The most common relationship in relational databases. One entity is related to multiple entities. Example: "A patient is subjected to multiple procedures/tests but each test is for a single patient."

**M:N (Many-to-Many):** Multiple items are related to multiple other items. Example: "A patient is prescribed multiple medicines and a medicine is prescribed to multiple people." In implementation, M:N relationships are resolved using a bridge (junction) table.

**1:1 (One-to-One):** A single item related to a single item in the other table. Somewhat rare in relational databases.

### Comparison Table: Cardinality

| Cardinality | Frequency | FK Placement | Bridge Table Needed? | Example |
|-------------|-----------|-------------|---------------------|---------|
| 1:M | Most common | FK goes in the "many" side | No | Department → Instructors |
| M:N | Common | Both PKs go into bridge table | Yes | Students ↔ Courses |
| 1:1 | Rare | FK in the optional side (or either if both optional) | No | Instructor ↔ Office |

### Trap Areas

- **M:N cannot be directly implemented** in a relational database. It MUST be resolved with a bridge table containing foreign keys from both sides.
- **1:1 foreign key placement** depends on optionality: put the FK in the entity where the relationship is optional. If both are optional, the designer chooses. If both are mandatory and no other relationships exist, consider merging into one table (but beware of transitive dependencies).
- **Cardinality vs. participation:** Cardinality tells you the maximum number of associations (1 or M). Participation (mandatory vs. optional) tells you whether every instance must participate.

---

## 2.3 Relational Algebra

### Why This Exists

Relational algebra provides the theoretical foundation for SQL. Understanding these operations helps you understand what SQL queries actually do under the hood.

### Core Operations

In relational algebra, **tables are the operands** and **operators** include: SELECT, PROJECT, JOIN, INTERSECT, UNION, DIFFERENCE, PRODUCT, DIVIDE. The course mainly focuses on **SELECT, PROJECT, and JOIN**.

**SELECT (σ):** List all rows from a table that satisfy some condition. This is the equivalent of the SQL WHERE clause — it filters rows.

**PROJECT (π):** Select specific attributes (columns) from a table. This is the equivalent of listing specific columns in a SQL SELECT statement.

**IMPORTANT DISTINCTION:** In relational algebra, "selection" filters rows and "projection" filters columns. In SQL, both are done within the SELECT statement, which causes confusion. The SQL SELECT keyword does projection (choosing columns), while the WHERE clause does selection (choosing rows).

**PRODUCT (×):** All possible pairs of rows from two tables, including all columns. Called the Cartesian product or cross product. This produces a very large result and is rarely useful on its own.

**UNION (∪):** All entries from both tables with no duplicates. Tables must be union-compatible (same number and types of columns).

### Join Types

**Inner Join:** Only rows where the primary key and foreign key match are included. Rows without matches are excluded from both tables.

**Natural Join:** A special case of inner join where columns with the same name are automatically matched. Works only when column names match exactly.

**Outer Join:** Includes all rows from one or both tables, filling in NULLs where there is no match. Used when you want to see unmatched rows.

### Comparison Table: Relational Algebra Operations

| Operation | What It Does | SQL Equivalent | Filters | Example |
|-----------|-------------|----------------|---------|---------|
| SELECT (σ) | Filters rows by condition | WHERE clause | Rows | σ(age > 18)(Student) |
| PROJECT (π) | Chooses specific columns | Column list in SELECT | Columns | π(name, age)(Student) |
| PRODUCT (×) | All possible row combinations | FROM t1, t2 (no WHERE) | Neither — expands | Student × Course |
| UNION (∪) | Combines results, no duplicates | UNION | Removes duplicates | T1 ∪ T2 |
| INNER JOIN (⋈) | Matched rows only | JOIN ... ON | Unmatched rows excluded | Appointment ⋈ Patient |
| OUTER JOIN | All rows, NULLs for unmatched | LEFT/RIGHT JOIN | Nothing excluded | Patient ⟕ Appointment |
| NATURAL JOIN | Auto-match on same column names | NATURAL JOIN | Unmatched excluded | Appointment NATURAL JOIN Patient |

### Trap Areas

- **Selection ≠ SQL SELECT.** Selection is row filtering (WHERE). Projection is column filtering (the column list). The SQL keyword SELECT does projection, which confuses everyone.
- **Natural joins are fragile.** They only work when column names match exactly and fail with 3+ tables or when column names differ. Don't rely on them.
- **Cartesian product is almost never what you want.** If you write `FROM t1, t2` without a WHERE clause, you get every possible combination — often millions of rows.

---

## 2.4 Database Lifecycle

### Phases

1. **Database Initial Study:** Analyze the current situation, understand the operating environment, define problems and constraints, define objectives, define scope and boundaries.

2. **Database Design:** Create the conceptual → logical → physical models (covered in Module 2.5).

3. **Implementation and Loading:** Install the DBMS, create the database, load or convert data.

4. **Testing:** Ensure required data can be retrieved, verify performance, confirm security is implemented.

5. **Operation and Maintenance:** Ongoing use, monitoring, tuning, and updates.

---

## 2.5 Conceptual, Logical, and Physical Models

### Why Three Levels?

Database design moves from abstract to concrete in stages. Each stage adds more detail and brings the design closer to implementation.

### Conceptual Model

The highest level of abstraction. Focuses on high-level organization without concern for how data will be stored or retrieved. Defines entities and relationships in a general way. Aims to be understandable by non-technical stakeholders. Entity-Relationship Diagrams (ERDs) are the typical tool. Attributes can be left out at this level. Even if using MongoDB, this model should still be valid.

**Contains:** Entity names, entity relationships.

### Logical Model

More detailed. Includes specifics about data structure without being tied to a particular DBMS. Expands on the conceptual model to include attributes, primary keys, and foreign keys. Many-to-many relationships are resolved using bridging tables at this stage. Still somewhat abstract — no specific data types yet.

**Contains:** Entity names, relationships, attributes, primary keys, foreign keys.

### Physical Model

The most detailed level. Specifies exactly how data will be stored. Includes all tables, columns, data types, constraints, indexes, and relationships — tailored to the chosen DBMS. Performance considerations, storage details, and access methods are defined here. Some systems allow data storage on different drives (SSD vs. HDD); this is decided at this level.

**Contains:** Everything from logical model + table names, column names, column data types.

### Feature Comparison Table

| Feature | Conceptual | Logical | Physical |
|---------|-----------|---------|----------|
| Entity Names | Yes | Yes | Yes |
| Entity Relationships | Yes | Yes | Yes |
| Attributes | — | Yes | Yes |
| Primary Keys | — | Yes | Yes |
| Foreign Keys | — | Yes | Yes |
| Table Names | — | — | Yes |
| Column Names | — | — | Yes |
| Column Data Types | — | — | Yes |

### MySQL Workbench Symbols (Physical Model)

| Symbol | Meaning |
|--------|---------|
| Yellow key | Attribute is a primary key |
| Red key | Attribute is a foreign key AND part of the primary key |
| Blue diamond (filled) | Mandatory column (NOT NULL) |
| Blue diamond (open) | Optional column (nullable) |
| Red diamond (filled) | Mandatory foreign key (NOT NULL) |
| Red diamond (open) | Optional foreign key |

### Trap Areas

- **Workbench = Physical Modeling.** MySQL Workbench automatically resolves M:N relationships as bridge tables. You cannot create relationships in Workbench unless tables have primary keys.
- **Different people have different definitions** of what goes into each model. The course follows the textbook descriptions as shown in the table above.
- **Don't create foreign keys manually in Workbench.** Create the relationship and let the FK be inserted automatically, otherwise you may get duplicate attributes.

---

## 2.6 Mapping ER to Relational Tables

### Rules for Mapping

**Logical to Physical:**
- Each entity → a table (adjust name to snake_case)
- Each attribute → a column (use snake_case)
- Assign data types and sizes
- Apply constraints from business rules

**Implementing 1:M Relationships:** The foreign key goes into the "many" side. Example: many instructors in each department → FK goes into the Instructor table.

**Implementing M:N Relationships:** Create a bridge table containing primary keys from both tables. All keys in the bridge table are both primary AND foreign keys (identifying relationship). Pick an appropriate name based on the relation.

**Implementing 1:1 Relationships:**
- If both sides are mandatory and no other relationship: consider combining into a single entity (but watch for transitive dependencies).
- If one side is optional: put the FK in the optional side.
- If both are optional: designer chooses.

### Trap Areas

- **Bridge table for M:N is not optional** — you must create it.
- **FK placement in 1:1** is a common exam question. Remember: FK goes in the entity where the relationship is optional.
- **1:1 merging can introduce transitive dependencies** — be cautious.

---

# MODULE 3: SQL — STRUCTURE & DATA (DDL/DML)

---

## 3.1 DDL — Data Definition Language

### Table Creation

DDL deals with defining the structure of the database: creating, modifying, and deleting tables.

### Data Types in MySQL

| Category | Type | Description |
|----------|------|-------------|
| Text | `varchar(n)` | Variable-length string, n ≤ 65535. Good for most short strings. |
| Text | `char(n)` | Fixed-length string. Slightly faster if all data is exactly n characters. |
| Text | `text` | For large text. Not stored directly in the table row (counts only 9-12 bytes toward row limit). |
| Numeric | `int` | Integer values |
| Numeric | `decimal(p,s)` | Exact numeric with precision p and scale s |
| Date/Time | `date` | Date only |
| Date/Time | `datetime` | Date and time combined |
| Other | `json` | JSON data type (preparation for NoSQL concepts) |

**Important:** MySQL limits 65,535 bytes per row. `char()` and `varchar()` types count toward that limit. `text` only counts 9-12 bytes.

### Constraints

| Constraint | Purpose | Notes |
|-----------|---------|-------|
| NOT NULL | Column must have a value | Cannot be left empty |
| UNIQUE | All values must be different | Allows one NULL unless combined with NOT NULL |
| DEFAULT | Provides a fallback value | Used when no value is specified during INSERT |
| CHECK | Validates values against a condition | e.g., age >= 18 |
| PRIMARY KEY | Unique identifier for each row | Combines UNIQUE and NOT NULL; one per table |
| FOREIGN KEY | Links to PK of another table | Enforces referential integrity |

### Foreign Key Syntax

```sql
create table appointment (
    id int not null auto_increment primary key,
    patient int not null,
    doctor int not null,
    start_time datetime not null,
    constraint fk_appointment_patient foreign key (patient) references patient(id),
    constraint fk_appointment_doctor foreign key (doctor) references doctor(id)
);
```

Named constraints are useful for later when you need to change or remove them using ALTER TABLE.

### Table Deletion

- You cannot delete a table that doesn't exist.
- You cannot delete a table with foreign keys referencing it unless the referencing table is deleted first or the constraint is removed.
- **Order matters:** Create tables without FKs first, then tables with FKs. Delete in reverse order.

### Comparison Table: Constraint Types

| Constraint | Enforces | Can Be Named? | Multiple Per Table? | Exam Focus |
|-----------|---------|---------------|--------------------|-----------| 
| NOT NULL | No empty values | No | Yes | Often combined with other constraints |
| UNIQUE | No duplicates | Yes | Yes | Different from PK (allows one NULL) |
| DEFAULT | Fallback value | No | Yes | What happens when INSERT omits column |
| CHECK | Value validation | Yes | Yes | Business rule enforcement |
| PRIMARY KEY | Row identity | Yes (not in MySQL) | No (exactly 1) | Must be unique + not null |
| FOREIGN KEY | Referential integrity | Yes (recommended) | Yes | Order of creation/deletion |

---

## 3.2 DML — Data Manipulation Language

### The Four DML Commands

**INSERT, UPDATE, DELETE** are DML commands that modify data. **SELECT** retrieves data. Important: INSERT, UPDATE, and DELETE changes only appear to the current user until they have been **committed** to the database.

### INSERT

```sql
-- Single row
insert into patient values (232, 'Mohammed', 'Al Walkra', '4431-1132');

-- Multiple rows (MySQL only, not Oracle)
insert into patient values
    (401, 'Next', 'Subject', '1234-4321'),
    (402, 'Final', 'Demo', '4444-3333');
```

### SELECT (Basic)

```sql
select * from medicine;           -- All columns, all rows
select name, price from medicine; -- Projection (specific columns)
select * from medicine where price > 10; -- Selection (filtering rows)
```

**Remember:** The SQL SELECT keyword performs **projection** (choosing columns). The WHERE clause performs **selection** (filtering rows). These terms come from relational algebra and are easy to mix up.

### UPDATE

```sql
update patient set phone = '5555-0000' where pid = 232;
```

**DANGER:** If you use the wrong filter or forget the WHERE clause, you could accidentally update the entire table.

### DELETE

```sql
delete from patient where pid = 400;
```

Similar danger as UPDATE — specifying an incorrect condition could delete everything. If a row is referenced by a foreign key, deletion will fail unless cascade is set.

### CASCADE Operations

**ON DELETE CASCADE:** When a parent row is deleted, all child rows referencing it are automatically deleted. Sounds useful but generally you don't want it (you lose history).

```sql
constraint appointment_patient_fk foreign key (pid) references patient(patient_id)
    on delete cascade
```

**ON UPDATE CASCADE:** When a primary key value is updated, all foreign keys referencing it are automatically updated. Without this, updating a referenced PK will fail.

### Ordering Output

- SELECT does NOT guarantee any order. Usually results appear ordered by PK but there is no guarantee.
- Use `ORDER BY` for explicit ordering. ASC (ascending) is the default; DESC for descending.
- ORDER BY must come after WHERE.
- **Ordering is a slow operation** — only use it when needed.

### Column Aliases

Use `AS` to rename columns in output: `select sum(price) as total_price from product;`

### Comparison Table: DML Commands

| Command | Purpose | Danger Level | Reversible Before COMMIT? | Syntax Pattern |
|---------|---------|-------------|--------------------------|----------------|
| SELECT | Read data | None | N/A | `SELECT cols FROM table WHERE condition` |
| INSERT | Add new rows | Low | Yes (rollback) | `INSERT INTO table VALUES (...)` |
| UPDATE | Modify existing rows | HIGH — wrong WHERE updates everything | Yes (rollback) | `UPDATE table SET col=val WHERE condition` |
| DELETE | Remove rows | HIGH — wrong WHERE deletes everything | Yes (rollback) | `DELETE FROM table WHERE condition` |

### Comparison Table: CASCADE Options

| Option | Trigger | Effect | Use With Caution? |
|--------|---------|--------|-------------------|
| ON DELETE CASCADE | Parent row deleted | All child rows auto-deleted | YES — lose history |
| ON UPDATE CASCADE | Parent PK updated | All child FKs auto-updated | Moderate — generally safe |
| No cascade (default) | Parent modified | Operation fails if children exist | Safest option |

---

# MODULE 4: SQL — ADVANCED QUERYING

---

## 4.1 Aggregate Functions

### Core Functions

| Function | Output |
|----------|--------|
| COUNT | Number of rows containing non-null values |
| MIN | Minimum attribute value in a column |
| MAX | Maximum attribute value in a column |
| SUM | Sum of all values in a column |
| AVG | Arithmetic mean of a column |

### DISTINCT

`SELECT DISTINCT column FROM table;` — Lists all unique values in a column. Useful when you have many duplicate entries and need to know all possible values.

### GROUP BY

Groups rows that share the same values in specified columns, then applies aggregate functions to each group. Returns one row per group.

**Execution order in MySQL:** FROM → WHERE → GROUP BY → HAVING → SELECT → DISTINCT → ORDER BY → LIMIT

```sql
select attribute1, count(*) from product
where name like 'Ajax%' and attrib1name='Size'
group by attribute1;
```

### HAVING

Restricts the output of GROUP BY. HAVING filters groups **after** aggregation, while WHERE filters rows **before** aggregation.

### Subqueries

Inner queries (subqueries) execute first; their result is used in the outer query.

```sql
select * from product where price = (select max(price) from product);
```

### Comparison Table: WHERE vs. HAVING

| Aspect | WHERE | HAVING |
|--------|-------|--------|
| When it filters | Before grouping | After grouping |
| Can use aggregate functions? | No | Yes |
| Works without GROUP BY? | Yes | Technically yes but pointless |
| Filters | Individual rows | Groups of rows |
| Exam trap | `WHERE count(*) > 5` is INVALID | `HAVING count(*) > 5` is correct |

---

## 4.2 Table Alteration

### ALTER TABLE Operations

Used to modify table structure without dropping and recreating (preserves data).

**Adding columns:**
```sql
alter table t add column new_name new_type;
alter table t add column new_name new_type after other_column;
```
New column fills with NULLs. You can set a DEFAULT constraint.

**Dropping columns:**
```sql
alter table t drop column column_name;
```
All values in that column are permanently lost.

**Changing column types:**
```sql
alter table t change old_name new_name new_type;
```
If you try to shrink a varchar to be too small, MySQL rejects it. Changing from character to integer requires deleting or transforming data first.

**Adding/removing constraints:**
```sql
alter table tblname add constraint pk_name primary key (column_id);
alter table tblname add constraint fk_name foreign key (column) references table(col);
alter table tblname drop constraint fk_name;
alter table tblname drop primary key;
```
When adding constraints, existing data must not violate them. Fix data first, then alter.

---

## 4.3 Joins in SQL

### Join Syntax

**Old-style (comma-separated):**
```sql
select * from appointment, patient where appointment.pid = patient.pid;
```

**Modern syntax (preferred):**
```sql
select * from appointment
join patient on appointment.pid = patient.pid;
```

Most people omit the word "inner" — `JOIN` defaults to inner join. You must specify which columns you are joining on because they could be named differently in the two tables.

### Inner Join

Only rows where the join condition matches are included. If a patient has no appointments, that patient is excluded. If an appointment references a non-existent patient (shouldn't happen with FK constraints), that appointment is excluded.

### Outer Joins

Includes unmatched rows, filling in NULLs:

```sql
select * from patient left join appointment on patient.pid = appointment.pid;
```

The word "outer" is optional — most people leave it out. LEFT JOIN keeps all rows from the left table. RIGHT JOIN keeps all rows from the right table. You can flip the table order and change LEFT to RIGHT to get the same result.

### Joining Multiple Tables

Chain additional JOIN clauses. Using projections to limit columns and aliases to rename ambiguous columns is helpful.

```sql
select * from appointment
join patient on appointment.pid = patient.pid
join staff on appointment.doctor = staff.st_id;
```

### Natural Join

If two tables have columns with matching names, `NATURAL JOIN` auto-matches them. Does not work with 3+ tables or different column names in MySQL. Oracle supports natural joins with multiple tables. Don't rely on this — it's fragile.

### Comparison Table: Join Types

| Join Type | Includes Unmatched Rows? | NULLs for Missing? | Use Case |
|-----------|------------------------|--------------------|---------| 
| INNER JOIN | No | No | Most common — only matching data |
| LEFT (OUTER) JOIN | From left table only | Yes, right side | Find records with no matches |
| RIGHT (OUTER) JOIN | From right table only | Yes, left side | Same as LEFT with tables swapped |
| NATURAL JOIN | No | No | Quick match on same-name columns |
| CROSS JOIN (PRODUCT) | All combinations | No | Rarely useful |

---

## 4.4 Auto Increment & Indexing

### Auto Increment

Used for surrogate keys. The value continuously increments and never goes back down.

```sql
create table patient (
    id int not null auto_increment primary key,
    name varchar(50)
);
```

Key rules:
- Only one auto_increment per table.
- Must be the primary key (older versions) — newer MySQL allows AI on any column but still only one per table.
- `ALTER TABLE mytable AUTO_INCREMENT=1002` can set the next value, but trying to roll it backwards is ignored.
- The next value is always one larger than the largest value in the table.

### Indexes

An index is a summary data structure that tells the database where to find specific values — like the index at the back of a book. Without indexes, searches require a **full table scan** (checking every row).

**When to use:**
- Searching on primary key is already fast (no extra index needed).
- Columns frequently used in WHERE clauses should be indexed.
- Sorting is slow — indexes on sorted columns help.
- Always join tables on primary keys where possible.

**Using EXPLAIN:**
```sql
explain select * from patient where phone = '55563';
```
The dangerous result is `type: ALL` (full table scan). Ideal is `type: const` (constant-time lookup using an index).

| EXPLAIN Field | Bad Value | Good Value | Meaning |
|--------------|-----------|------------|---------|
| type | ALL | const, ref | ALL = full scan; const = instant lookup |
| possible_keys | NULL | Index name | NULL = no index available |
| key | NULL | Index name | NULL = no index used |
| rows | 100 (all rows) | 1 | How many rows examined |

**Adding indexes:**
```sql
create index idx_phone on patient(phone);
```

**Downsides:**
- Indexes take storage space.
- INSERT, UPDATE, and DELETE become slower because indexes must also be updated.
- Only add indexes where they provide a measurable benefit.

---

## 4.5 Sequences and Views

### Sequences

Not part of the main course content, but mentioned for awareness. Oracle uses sequences; MS SQL Server uses IDENTITY columns.

**Identity column** (SQL Server): Values are managed by the server and usually cannot be modified. `IDENTITY(seed, increment)` — e.g., `IDENTITY(1,1)` starts at 1 and increments by 1.

An identity column differs from a primary key in that its values are server-managed.

### Views

A view is a virtual table based on a SELECT statement. It does not store data — it re-executes the underlying query each time.

**Uses:**
- Create "SELECT shortcuts" for complex queries
- Security: provide restricted view of data (users see only what they're allowed to)

```sql
create view entry_list as
select p.name, a.start_time from patient p
join appointment a on p.pid = a.pid
where date(a.start_time) = curdate();
```

**Updatable vs. Non-Updatable Views:**
- A view is updatable only if there is a one-to-one relationship between view rows and base table rows.
- Views containing aggregate functions, DISTINCT, GROUP BY, UNION, or nested queries are NOT updatable.
- If a view column is formed from multiple base table columns, that column is not updatable.

### Comparison Table: View Properties

| Property | Updatable View | Non-Updatable View |
|---------|---------------|-------------------|
| Based on | Simple SELECT from one table | Complex queries, joins, aggregates |
| Can INSERT/UPDATE through it? | Yes (for simple columns) | No |
| Contains aggregates? | No | Possibly |
| Contains GROUP BY/DISTINCT? | No | Possibly |
| Contains UNION? | No | Possibly |

---

## 4.6 JSON Data Type in MySQL

### Why JSON in SQL?

MySQL supports JSON field types as preparation for NoSQL concepts. JSON allows flexible, schema-less data within a relational table.

**JSON (JavaScript Object Notation):** Lightweight data interchange format. Based on two structures: name/value pairs (objects) and ordered lists of values (arrays).

**Key differences from relational tables:**
- In relational tables: all records have the same properties, and multi-valued cells are not allowed.
- JSON is free of these rules — fields can vary from record to record.

**Extracting JSON data:**
```sql
select json_extract(json_column, '$.fieldname') from table;
```

**When to use JSON in MySQL:**
- Small amounts of denormalized data (e.g., a person with 2-3 phone numbers — easier than creating a separate table).
- Records with large variety of data (e.g., football match details with varying numbers of goals, penalties, cards).

---

# MODULE 5: NoSQL — MongoDB

---

## 5.1 SQL vs. NoSQL Overview

### Terminology Mapping

| MySQL Term | MongoDB Term |
|-----------|-------------|
| Database | Database |
| Table | Collection |
| Row / Record / Tuple | Document |
| Column | Field |
| Primary Key | _id field |
| Foreign Key | Reference (manual) |
| JOIN | $lookup (aggregation) or embedding |
| Schema (fixed) | Schema-less (flexible) |

### MongoDB Basics

- A "document-based" database.
- Each record is made of a key value (like a primary key) and a document.
- Documents contain multiple fields stored in JSON format.
- Very popular in web application storage.
- **NoSQL** = "Not only SQL" or "Non-SQL" — enables storage and querying outside traditional relational structures.

---

## 5.2 MongoDB Setup & Fundamentals

### Creating Databases and Collections

```javascript
use database_name          // Switches to DB (creates on first use)
db.createCollection('collection_name')  // Creates a collection
```

### Data Types in MongoDB

String, Integer (no quotes), Boolean (true/false, no quotes), Arrays (inside []), Objects (inside {}), Null, Date, Binary data, and others.

### The _id Field

Every document has an `_id` field that uniquely identifies it. It can be specified manually but is typically auto-generated (based on time, machine, process ID, and integer). It is the primary key and the ONLY field that is fast to search. All other searches are **full document scans** unless you define an index.

---

## 5.3 Document CRUD Operations

### Inserting

```javascript
db.collection.insertOne({field1: "value1", field2: "value2"})
db.collection.insertMany([{...}, {...}])
```

- Will also create the collection if it doesn't exist.
- A default ObjectId is generated if you don't provide `_id`.
- Duplicate `_id` values cause an error.

### Querying (Find)

```javascript
db.collection.find(<query>, <projection>)
```

- Query selector = filter (like WHERE in SQL)
- Projection = which fields to show (like column list in SELECT)

### Comparison Operators

| MongoDB | SQL Equivalent | Example |
|---------|---------------|---------|
| `$eq` | = | `{age: {$eq: 25}}` |
| `$gt` | > | `{age: {$gt: 25}}` |
| `$gte` | >= | `{age: {$gte: 25}}` |
| `$lt` | < | `{age: {$lt: 25}}` |
| `$lte` | <= | `{age: {$lte: 25}}` |
| `$ne` | != | `{age: {$ne: 25}}` |
| `$in` | IN | `{age: {$in: [20,25,30]}}` |

### Updating

```javascript
db.collection.updateOne(<filter>, <update>)
db.collection.updateMany(<filter>, <update>)
```

Common update operators: `$set`, `$unset`, `$inc`, `$push`, `$pull`

### Deleting

```javascript
db.collection.deleteOne(<filter>)
db.collection.deleteMany(<filter>)
```

An empty query `{}` matches ALL documents.

---

## 5.4 Aggregation Pipelines

### Overview

```javascript
db.collection.aggregate([<stage1>, <stage2>, ...])
```

The course focuses on four stages: `$match`, `$project`, `$group`, `$count`. Build complex queries one stage at a time.

**$match** — Filters documents (like WHERE)
**$project** — Chooses/reshapes fields (like SELECT column list)
**$group** — Groups and aggregates (like GROUP BY)
**$count** — Counts documents

### Example: Total price of all Volvos

```javascript
db.cars.aggregate([
    { $match: { manufacturer: "Volvo" } },
    { $group: { _id: "$manufacturer", total: { $sum: "$price" } } }
])
```

### Example: Manufacturers with total < 10,000, sorted

```javascript
db.cars.aggregate([
    { $group: { _id: "$manufacturer", total: { $sum: "$price" } } },
    { $match: { total: { $lt: 10000 } } },
    { $sort: { total: 1 } }
])
```

### Comparison Table: SQL Aggregation vs. MongoDB Aggregation

| SQL | MongoDB Aggregation | Purpose |
|-----|-------------------|---------|
| WHERE | $match | Filter before grouping |
| SELECT columns | $project | Choose fields |
| GROUP BY + aggregate | $group with $sum/$avg/$count | Group and compute |
| HAVING | $match (after $group) | Filter after grouping |
| ORDER BY | $sort | Sort results |
| COUNT(*) | $count | Count documents |

---

## 5.5 Arrays and Embedded Objects

### Embedded Objects

An embedded object is a document nested inside another document. Used to handle 1:1 type relationships without separate collections.

```javascript
{
    "first_name": "Michael",
    "last_vitals": {
        "height": 177,
        "weight": 80,
        "heart_rate": 70,
        "blood_pressure": [125, 82]
    },
    "visits": [
        {"date": "2023-07-30T14:30", "doctor": "Taylor"},
        {"date": "2024-01-05T11:30", "doctor": "Carter"}
    ]
}
```

### Searching Embedded Objects

Use **dot notation** with quotes:
```javascript
db.patients.find({ "last_vitals.height": 175 })
db.patients.find({ "last_vitals.weight": { $gt: 80 } })
```

### Arrays

Arrays handle 1:M and M:N relationships. Searching for items in arrays has specific techniques:

**Simple arrays (scalar values):**
```javascript
db.patients.find({ "phone": "134-411-7696" })  // Direct search
db.patients.find({ "last_vitals.blood_pressure.0": { $gt: 130 } })  // By position (0-indexed)
```

**Arrays of embedded objects — use $elemMatch:**
```javascript
db.patients.find({
    "visits": { $elemMatch: { "doctor": "Taylor" } }
})
```

### $unwind

An aggregation pipeline stage that "flattens" arrays — produces one document per array element, making array data look like a table. Useful for processing array details individually.

---

## 5.6 Document Design

### The Central Question

When to **embed** information inside a document vs. when to **reference** it from a separate collection.

### Three Patterns

**One-to-Few (embed directly):**
- 2-20 items
- Embed when you won't search frequently for embedded items and the data isn't needed independently
- Example: Multiple patient addresses

**One-to-Many (array of references):**
- Fewer than a few thousand records
- Main document contains an array of `_id` references to child documents
- Example: Patient with many visits stored in separate VISITS collection, with visit IDs in patient document

**One-to-Squillions (parent reference in child):**
- Extremely large number of child records
- Put the parent reference (`patient_id`) in each child document — like a foreign key in SQL
- Avoids unbounded array growth

### Five Design Rules

| Rule | Principle | Good Example | Bad Example |
|------|-----------|-------------|-------------|
| 1 | Favor embedding unless compelling reason not to | Blog post with few comments | Company with thousands of employees |
| 2 | If an object needs independent access, don't embed | Products referenced by orders | Products embedded in each order |
| 3 | Avoid joins/lookups if possible, but use them when needed | Restaurant with embedded menu | Large retail store — use references |
| 4 | Arrays should not grow without bound (max ~hundreds) | A few phone numbers | Thousands of blog comments |
| 5 | Design depends on your application's access patterns | Structure data for how you query it | One-size-fits-all approach |

### Embedding vs. Referencing

| Aspect | Embedding | Referencing |
|--------|-----------|-------------|
| Query efficiency | All data in one query | May need multiple queries |
| Atomic operations | Supported | Not across collections |
| Document size | Grows larger | Stays smaller |
| Data duplication | Possible | Reduced |
| Maximum size | 16MB per document | No practical limit |
| Independence | Objects tied to parent | Objects stand alone |

### 16MB Document Limit

MongoDB documents have a 16MB limit. This ensures no single document uses too much RAM or bandwidth during synchronization between cluster nodes. This is why unbounded arrays are dangerous.

---

## 5.7 Indexes in MongoDB

### Why Indexes

Searching by `_id` is fast. All other queries result in a full document scan unless you create an index.

### Index Types

| Type | Use Case |
|------|----------|
| Single field | Index on one field |
| Compound | Index on multiple fields |
| Multikey | Index on array fields |
| Geospatial | Location-based queries |
| Text | Full-text search |

### Creating Indexes

```javascript
db.cars.createIndex({ manufacturer: 1 })   // Ascending
db.cars.createIndex({ manufacturer: -1 })  // Descending
```

### Index Options

| Option | Purpose |
|--------|---------|
| unique | Ensure each value appears only once |
| name | Give the index a human-readable name |
| expireAfterSeconds | Documents auto-deleted after specified time (TTL index) |

### Using Explain

Run a query with `.explain()` to see if indexes are being used. Look for `IXSCAN` (index scan = good) vs. `COLLSCAN` (collection scan = full scan = bad).

---

# MASTER COMPARISON TABLES

---

## SQL vs. MongoDB — Complete Comparison

| Feature | MySQL (SQL) | MongoDB (NoSQL) |
|---------|------------|-----------------|
| Data model | Tables with fixed schema | Documents with flexible schema |
| Data format | Rows and columns | JSON/BSON documents |
| Schema | Must be defined before inserting data | Schema-less; fields vary per document |
| Relationships | Foreign keys + JOINs | Embedding or referencing |
| Query language | SQL | MongoDB Query Language (MQL) |
| Primary key | User-defined or auto_increment | `_id` (auto-generated ObjectId) |
| Joins | Native JOIN syntax | $lookup (less efficient) or embed |
| Transactions | Full ACID support | Supported but less traditional |
| Scaling | Vertical (bigger server) | Horizontal (more servers) |
| Best for | Structured, consistent data with complex relationships | Flexible, rapidly changing data |

## DELETE vs. DROP vs. TRUNCATE

| Command | What It Does | Can Be Rolled Back? | Removes Structure? | Speed |
|---------|-------------|--------------------|--------------------|-------|
| DELETE | Removes specific rows (or all with no WHERE) | Yes (before commit) | No | Slow (row by row) |
| DROP | Removes entire table + structure | No | Yes | Fast |
| TRUNCATE | Removes all rows, keeps structure | No (in most DBMS) | No | Fast |

## Selection vs. Projection

| Concept | What It Filters | Relational Algebra Symbol | SQL Implementation |
|---------|----------------|--------------------------|-------------------|
| Selection | Rows (horizontal) | σ (sigma) | WHERE clause |
| Projection | Columns (vertical) | π (pi) | Column list in SELECT |

## Exam Trap Summary

| Topic | Common Mistake | Correct Understanding |
|-------|---------------|----------------------|
| SELECT in SQL | Thinking it does selection | It does PROJECTION (columns) |
| WHERE vs HAVING | Using aggregate in WHERE | Aggregates only in HAVING |
| FK placement in 1:M | Putting FK in the "one" side | FK goes in the "many" side |
| FK placement in 1:1 | Random placement | FK in the optional side |
| M:N implementation | Trying without bridge table | Always needs a bridge table |
| CASCADE DELETE | Assuming it's always good | Usually bad — lose history |
| ORDER BY | Assuming default order exists | SELECT has NO guaranteed order |
| Auto_increment rollback | Trying to decrease it | Cannot roll backwards — ignored |
| MongoDB _id | Thinking all fields are fast to search | Only _id is fast; others need indexes |
| Embedding large arrays | Embedding thousands of items | Use references for large cardinality |
| NATURAL JOIN | Using for complex queries | Only works with matching column names, 2 tables |
| Conceptual model | Including data types | Conceptual has only entities + relationships |
| Physical model | Forgetting data types | Physical includes everything |

---

*End of Complete DBMS Curriculum Study Guide*
