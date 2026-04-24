# DBMS FINAL EXAM — KILLER STUDY GUIDE
**University of Doha for Science & Technology**

> **Exam intel:** 27 questions total. MCQ covers: reading relationships from CREATE TABLE code, 2NF/3NF functional dependency graphs (3–4 Qs), cardinality from ER diagrams. Written: normalization (normalize a given table), data anomalies. SQL coding: 5–7 Qs. MongoDB coding: 3–4 Qs. Same questions as leaks, different names.

---

## TABLE OF CONTENTS

1. [READING RELATIONSHIPS FROM CODE](#1-reading-relationships-from-code)
2. [CARDINALITY FROM ER DIAGRAMS](#2-cardinality-from-er-diagrams)
3. [NORMALIZATION — FULL WALKTHROUGH](#3-normalization--full-walkthrough)
   - 3.1 Why Normalization Exists / Data Anomalies
   - 3.2 Functional Dependencies
   - 3.3 1NF
   - 3.4 2NF + Partial Dependency
   - 3.5 3NF + Transitive Dependency
   - 3.6 Step-by-Step Normalization Process
4. [SQL CODING — EVERYTHING ON THE EXAM](#4-sql-coding--everything-on-the-exam)
5. [MONGODB CODING — EVERYTHING ON THE EXAM](#5-mongodb-coding--everything-on-the-exam)
6. [FINAL EXAM QUESTION BANK](#6-final-exam-question-bank)

---

## 1. READING RELATIONSHIPS FROM CODE

### The Skill: Look at a CREATE TABLE, Identify the Relationship

The exam gives you a CREATE TABLE block and asks: **"What is the relationship between these tables?"**

The answer lives entirely in the **FOREIGN KEY** lines. Here is the method:

**Step 1:** Find every `FOREIGN KEY ... REFERENCES` line.
**Step 2:** The table that HAS the FK is the **"many"** side (or the child).
**Step 3:** The table being REFERENCED is the **"one"** side (or the parent).
**Step 4:** Check if the FK is also part of the PRIMARY KEY → if yes, it's a bridge table (M:N).

---

### Example 1 — The Exam Pattern (Apartment)

```sql
CREATE TABLE apartment (
    ownerID   NUMBER(5),
    ownerName VARCHAR2(25),
    floor     NUMBER(4,0),
    CONSTRAINT apt_id_pk PRIMARY KEY (ownerID)
);
```

**What to read:**
- Table: `apartment`
- PK: `ownerID`
- No FK → this is a **standalone / parent table**

Now if a second table appears like:
```sql
CREATE TABLE lease (
    leaseID   INT PRIMARY KEY,
    ownerID   INT NOT NULL,
    CONSTRAINT fk_lease_owner FOREIGN KEY (ownerID) REFERENCES apartment(ownerID)
);
```

**Reading:**
- `lease` has a FK → `apartment`
- `lease` is the **many** side, `apartment` is the **one** side
- Relationship: **apartment 1 : M lease** (one apartment owner can have many leases)

---

### Example 2 — Bridge Table (M:N)

```sql
CREATE TABLE sale (
    member_id  INT NOT NULL,
    product_id INT NOT NULL,
    date       DATE NOT NULL,
    CONSTRAINT pk_sale PRIMARY KEY (member_id, product_id),
    CONSTRAINT fk_sale_member  FOREIGN KEY (member_id)  REFERENCES member(member_id),
    CONSTRAINT fk_sale_product FOREIGN KEY (product_id) REFERENCES product(product_id)
);
```

**Reading:**
- The PK is **composite**: `(member_id, product_id)`
- BOTH columns are also FKs → this is a **bridge table**
- Relationship: **member M:N product** (resolved through the `sale` bridge)

---

### Example 3 — 1:1 from Code

```sql
CREATE TABLE staff (
    staff_no   INT PRIMARY KEY,
    first_name VARCHAR(50),
    position   VARCHAR(50)
);

CREATE TABLE login (
    staff_no INT PRIMARY KEY,
    username VARCHAR(50),
    password VARCHAR(50),
    CONSTRAINT fk_login_staff FOREIGN KEY (staff_no) REFERENCES staff(staff_no)
);
```

**Reading:**
- `login.staff_no` is **both PK and FK** → each login maps to exactly one staff
- One staff → one login, one login → one staff
- Relationship: **1:1**

---

### Cheat Sheet: What Each Pattern Means

| What you see in the code | What it means |
|--------------------------|---------------|
| Table A has FK → Table B | A is "many", B is "one" → **B 1:M A** |
| Table A's PK is composite AND both parts are FKs | A is a bridge table → **M:N between the two referenced tables** |
| Table A's PK is the same column as its FK to Table B | **1:1 relationship** between A and B |
| Table has NO FK at all | It is a parent / independent table |
| FK column is NOT NULL | The relationship is **mandatory** on that side |
| FK column allows NULL | The relationship is **optional** on that side |

---

### How to Spot the Relationship Type in 10 Seconds

1. Count the `REFERENCES` lines in the table.
2. If **one REFERENCES** and FK ≠ PK → **1:M** (this table is the "many")
3. If **two+ REFERENCES** and FK columns = PK → **M:N bridge table**
4. If **one REFERENCES** and FK = PK → **1:1**

---

## 2. CARDINALITY FROM ER DIAGRAMS

### The Exam Pattern (Department → Employee style)

The exam shows an ER diagram with crow's foot notation and asks: **"What is the relationship?"**

### Crow's Foot Notation — Read This Once, Remember Forever

```
 ||----o{    means: "one and only one" to "zero or many"
 
 Symbols at the end of each line:
   |   = exactly one (mandatory)
   o   = zero (optional)
   {   = many
   ||  = one and only one
```

| Line ends look like | Reads as | Meaning |
|--------------------|----------|---------|
| `||` on left, `o{` on right | One-to-Many (optional right) | Left side: exactly 1. Right side: 0 or more |
| `||` on left, `|{` on right | One-to-Many (mandatory right) | Left: exactly 1. Right: 1 or more |
| `o|` on left, `o{` on right | One-to-Many (both optional) | Left: 0 or 1. Right: 0 or more |
| `}{` on both sides | Many-to-Many | Both sides: many |
| `||` on left, `|` or `o|` on right | One-to-One | Left: exactly 1. Right: exactly 1 (or 0 or 1) |

### The Department–Employee Example

```
DEPARTMENT  ||----o{  EMPLOYEE
```

**Reading left-to-right:** One department has zero or many employees.
**Reading right-to-left:** Each employee belongs to exactly one department.
**Answer: One-to-Many (1:M)** — Department is "one", Employee is "many".

**The FK goes in the EMPLOYEE table** (the "many" side).

### The Appointment Example from Course

```
PATIENT  ||--o{  APPOINTMENT  o{--|  DOCTOR
```

- Patient → Appointment: one patient has 0 or more appointments (**1:M**)
- Doctor → Appointment: one doctor has 0 or more appointments (**1:M**)
- Appointment has FK to both → it is the child/many side

### MCQ Strategy for Cardinality Questions

The exam will show you two tables (like Department and Employee with a crow's foot diagram) and ask which relationship type. Look at:

1. **Is there a crow's foot (`{`) on the right?** → "many" on that side
2. **Is the left end a single line (`|`)?** → "one" on that side
3. **If both ends have `{`?** → M:N
4. **If both ends have single lines?** → 1:1

---

## 3. NORMALIZATION — FULL WALKTHROUGH

> **Exam format:** They give you an unnormalized or partially normalized table and ask you to normalize it. They also ask: what is a data anomaly, and what are the types.

---

### 3.1 WHY NORMALIZATION EXISTS — DATA ANOMALIES

**Data Anomaly:** A problem that occurs when data is not properly organized, causing errors or inconsistencies during INSERT, UPDATE, or DELETE operations.

#### The Three Types of Data Anomalies

**Scenario:** Suppose we have this single, un-normalized table:

| order_id | customer_name | customer_phone | product_id | product_name | quantity | price |
|----------|---------------|----------------|------------|--------------|----------|-------|
| 1001 | Ali Hassan | 5551-0000 | P01 | Laptop | 1 | 2500 |
| 1002 | Ali Hassan | 5551-0000 | P02 | Mouse | 2 | 25 |
| 1003 | Sara Nour | 5552-1111 | P01 | Laptop | 1 | 2500 |

---

**1. UPDATE ANOMALY**
If Ali Hassan changes his phone number, you must update **every single row** where he appears. If you miss one row → the database has two different phone numbers for the same person → **inconsistency**.

> *Rule: Repeating the same data in multiple rows means you have to update it in multiple places.*

**2. INSERT ANOMALY**
You cannot add a new product to the database **until someone actually orders it**. You have no place to store "product P03 = Keyboard, price 80" unless there is an order for it.

> *Rule: You are forced to wait for an event (order) before you can record independent data (product info).*

**3. DELETE ANOMALY**
If order 1003 is deleted (Sara returns the laptop), you **lose all information** about product P01 (Laptop, price 2500) — because it only existed in that one row.

> *Rule: Deleting one piece of information accidentally destroys another unrelated piece of information.*

---

### Why Anomalies Happen

All three anomalies have the same root cause: **storing facts about multiple different things in a single table**. The table above mixes facts about **orders**, **customers**, and **products** together. Normalization separates them.

---

### 3.2 FUNCTIONAL DEPENDENCIES

**Definition:** B is functionally dependent on A if knowing A **always and uniquely** determines B. Written: `A → B`.

**Examples:**
- `order_id → customer_name` ✅ (each order has exactly one customer)
- `product_id → product_name, price` ✅ (each product ID has one name and price)
- `customer_name → customer_phone` ❌ (two customers can have the same name)
- `order_id → product_name` ❌ (an order can have multiple products)

**Composite key dependency:**
If the PK is `(order_id, product_id)`:
- `(order_id, product_id) → quantity` ✅ (you need BOTH to know how many were ordered)
- `product_id → product_name` ✅ but this only needs product_id, NOT order_id → **partial dependency**

**The dependency diagram the exam uses:**

```
Table: ORDER_ITEM(order_id, product_id, quantity, product_name, price, customer_name)
PK: (order_id, product_id)

        order_id ─────────────────────────────► customer_name
        │
        │
(order_id, product_id) ──────────────────────► quantity
        │
        │
        product_id ──────────────────────────► product_name, price
```

The arrows going from **only part of the PK** to non-key attributes = **partial dependencies** = violates 2NF.

---

### 3.3 FIRST NORMAL FORM (1NF)

**Rule:** Every cell must contain a **single, atomic value**. No repeating groups. No arrays. Each row must be uniquely identifiable (must have a PK).

**Violation example:**

| order_id | products_ordered |
|----------|-----------------|
| 1001 | Laptop, Mouse, Keyboard |

The `products_ordered` column has multiple values in one cell → **NOT 1NF**.

**Fix → make each product a separate row:**

| order_id | product_id | product_name | quantity |
|----------|------------|--------------|----------|
| 1001 | P01 | Laptop | 1 |
| 1001 | P02 | Mouse | 2 |
| 1001 | P03 | Keyboard | 1 |

Now PK = `(order_id, product_id)`. Each cell has one value. ✅ **1NF satisfied.**

**Quick test for 1NF:**
- Are there commas or lists inside a single cell? → NOT 1NF
- Is there a clear primary key? → needed for 1NF
- Are column headers repeating (e.g., `product1`, `product2`, `product3`)? → NOT 1NF

---

### 3.4 SECOND NORMAL FORM (2NF)

**Rule:** Must be in 1NF. **Every non-key attribute must depend on the ENTIRE primary key** — not just part of it.

> 2NF only matters when the PK is **composite** (more than one column). If the PK is a single column, 2NF is automatically satisfied.

**Partial Dependency:** A non-key attribute that depends on ONLY PART of a composite PK.

**Example violation:**

Table: `ORDER_ITEM(order_id, product_id, quantity, product_name, price)`
PK: `(order_id, product_id)`

| Attribute | Depends on | Problem? |
|-----------|-----------|---------|
| quantity | (order_id, product_id) — full PK | ✅ No problem |
| product_name | product_id only — PARTIAL | ❌ Partial dependency |
| price | product_id only — PARTIAL | ❌ Partial dependency |

`product_name` and `price` depend only on `product_id`, not on the full `(order_id, product_id)` PK. This is a **partial dependency** → violates 2NF.

**Fix → decompose into separate tables:**

```
ORDER_ITEM(order_id, product_id, quantity)
    PK: (order_id, product_id)
    FK: product_id → PRODUCT

PRODUCT(product_id, product_name, price)
    PK: product_id
```

Now `product_name` and `price` live in their own table where `product_id` IS the full PK. ✅ **2NF satisfied.**

**How to identify partial dependencies on the exam:**
1. Identify the composite PK.
2. For each non-key attribute, ask: "Does this need ALL of the PK columns to be determined?"
3. If NO → partial dependency → remove to its own table.

---

### 3.5 THIRD NORMAL FORM (3NF)

**Rule:** Must be in 2NF. **No non-key attribute should depend on another non-key attribute** (no transitive dependencies).

> 3NF matters even when the PK is a single column. A transitive dependency is a chain: PK → A → B, where B is determined by A (not directly by the PK).

**Transitive Dependency:** When `PK → A` and `A → B`, then B is transitively dependent on the PK through A. B should be in its own table.

**Example violation:**

Table: `ORDER(order_id, customer_id, customer_name, customer_phone, order_date)`
PK: `order_id`

| Attribute | Depends on | Problem? |
|-----------|-----------|---------|
| customer_id | order_id (full PK) | ✅ No problem |
| order_date | order_id (full PK) | ✅ No problem |
| customer_name | customer_id (not the PK) | ❌ Transitive |
| customer_phone | customer_id (not the PK) | ❌ Transitive |

Chain: `order_id → customer_id → customer_name, customer_phone`

`customer_name` and `customer_phone` depend on `customer_id`, which is itself a non-key attribute. This is a **transitive dependency** → violates 3NF.

**Fix → decompose:**

```
ORDER(order_id, customer_id, order_date)
    PK: order_id
    FK: customer_id → CUSTOMER

CUSTOMER(customer_id, customer_name, customer_phone)
    PK: customer_id
```

Now customer info lives where `customer_id` IS the PK. No attribute depends on another non-key attribute. ✅ **3NF satisfied.**

---

### PARTIAL vs TRANSITIVE — The Critical Distinction

| | Partial Dependency | Transitive Dependency |
|--|---|---|
| **Requires composite PK?** | YES — only possible with multi-column PK | NO — happens even with single-column PK |
| **The problem** | Non-key depends on PART of PK | Non-key depends on ANOTHER non-key |
| **The chain** | part-of-PK → non-key attribute | PK → non-key A → non-key B |
| **Violates** | 2NF | 3NF |
| **Fix** | Move partial-dependent attrs to new table keyed by the partial | Move transitively-dependent attrs to new table keyed by the intermediary |
| **Exam example** | `product_id → product_name` in a table with PK `(order_id, product_id)` | `customer_id → customer_name` in a table with PK `order_id` |

---

### 3.6 STEP-BY-STEP NORMALIZATION (EXAM FORMAT)

**The exam will give you a table like this and say: "Normalize to 3NF."**

#### Full Worked Example

**Given (unnormalized):**

`ORDER_INFO(order_id, order_date, customer_id, customer_name, customer_phone, product_id, product_name, product_price, quantity)`

PK (assumed initially): `order_id` — but wait, one order can have many products, so the real PK should be `(order_id, product_id)`.

---

**STEP 1 — Check 1NF:**
- Is every cell atomic? Assume yes (one value per cell).
- Is there a clear PK? → `(order_id, product_id)` as composite PK.
- ✅ Already in 1NF.

---

**STEP 2 — Check 2NF (find partial dependencies):**

PK = `(order_id, product_id)`

| Attribute | Depends on | Full or Partial? |
|-----------|-----------|-----------------|
| quantity | (order_id, product_id) | ✅ Full |
| order_date | order_id only | ❌ Partial |
| customer_id | order_id only | ❌ Partial |
| customer_name | order_id only (via customer_id) | ❌ Partial (also transitive) |
| customer_phone | order_id only | ❌ Partial |
| product_name | product_id only | ❌ Partial |
| product_price | product_id only | ❌ Partial |

**Fix (decompose partial dependencies):**

```
ORDER_ITEM(order_id, product_id, quantity)
    PK: (order_id, product_id)

ORDER(order_id, order_date, customer_id, customer_name, customer_phone)
    PK: order_id

PRODUCT(product_id, product_name, product_price)
    PK: product_id
```

✅ **Now in 2NF.** Each non-key attribute depends on the full PK of its table.

---

**STEP 3 — Check 3NF (find transitive dependencies):**

Look at the ORDER table: `ORDER(order_id, order_date, customer_id, customer_name, customer_phone)`

PK = `order_id`

| Attribute | Depends on | Transitive? |
|-----------|-----------|------------|
| order_date | order_id (PK) | ✅ No |
| customer_id | order_id (PK) | ✅ No |
| customer_name | customer_id (non-key!) | ❌ Transitive |
| customer_phone | customer_id (non-key!) | ❌ Transitive |

Chain: `order_id → customer_id → customer_name, customer_phone`

**Fix (decompose transitive dependencies):**

```
ORDER(order_id, order_date, customer_id)
    PK: order_id
    FK: customer_id → CUSTOMER

CUSTOMER(customer_id, customer_name, customer_phone)
    PK: customer_id
```

---

**FINAL RESULT — 3NF:**

```
CUSTOMER(customer_id, customer_name, customer_phone)
    PK: customer_id

ORDER(order_id, order_date, customer_id)
    PK: order_id
    FK: customer_id → CUSTOMER

ORDER_ITEM(order_id, product_id, quantity)
    PK: (order_id, product_id)
    FK: order_id → ORDER
    FK: product_id → PRODUCT

PRODUCT(product_id, product_name, product_price)
    PK: product_id
```

✅ **Fully normalized to 3NF.**

---

### Reading the Dependency Graph (Exam Image Type 2)

The exam shows an image like this:

```
      A ──────────────► B, C, D, E

With arrows like:
A alone → B, C
(A,B) together → D, E   [composite dependency]
B alone → D             [this means D has partial dep on (A,B)]
```

**How to read it:**
- The **yellow box** = the primary key (could be composite)
- Arrows FROM the full composite key = full functional dependencies (✅ fine)
- Arrows FROM only PART of the key = **partial dependencies** (❌ violates 2NF)
- Arrows FROM a non-key attribute to another non-key = **transitive dependency** (❌ violates 3NF)

**What the exam asks:** "What normal form is this table in?" or "What tables would this look like in 2NF?"

**How to answer:**
1. If there is a composite PK and some arrows come from only part of it → **not in 2NF** (it is only in 1NF)
2. If no partial deps but there are arrows from non-key to non-key → **not in 3NF** (it is only in 2NF)
3. If no partial deps AND no transitive deps → **in 3NF**

---

### Quick Normalization Decision Tree

```
Is every cell atomic and is there a PK?
    NO → Fix it → 1NF
    YES → Is in 1NF ✅

Does the PK have multiple columns AND do any non-key
attributes depend only on PART of that PK?
    YES → Fix partial deps → 2NF
    NO → Is in 2NF ✅

Does any non-key attribute depend on ANOTHER
non-key attribute (transitive)?
    YES → Fix transitive deps → 3NF
    NO → Is in 3NF ✅
```

---

## 4. SQL CODING — EVERYTHING ON THE EXAM

> 5–7 coding questions. Based on the exam leak, questions mirror the labs with different names.

---

### 4.1 CREATE TABLE (DDL)

```sql
-- Basic table
CREATE TABLE member (
    member_id   INT          NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name  VARCHAR(50)  NOT NULL,
    last_name   VARCHAR(50)  NOT NULL,
    email       VARCHAR(100) UNIQUE,
    join_date   DATE         NOT NULL DEFAULT (CURDATE())
);

-- Table with FK (must create parent first)
CREATE TABLE product (
    product_id   INT           NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name         VARCHAR(100)  NOT NULL,
    price        DECIMAL(10,2) NOT NULL,
    quantity_on_hand INT       NOT NULL,
    reorder_level    INT       NOT NULL,
    supplier_id  INT           NOT NULL,
    CONSTRAINT fk_product_supplier FOREIGN KEY (supplier_id)
        REFERENCES supplier(supplier_id)
);

-- Bridge table (M:N — both columns are PK AND FK)
CREATE TABLE sale (
    member_id  INT  NOT NULL,
    product_id INT  NOT NULL,
    sale_date  DATE NOT NULL,
    price      DECIMAL(10,2) NOT NULL,
    CONSTRAINT pk_sale PRIMARY KEY (member_id, product_id),
    CONSTRAINT fk_sale_member  FOREIGN KEY (member_id)  REFERENCES member(member_id),
    CONSTRAINT fk_sale_product FOREIGN KEY (product_id) REFERENCES product(product_id)
);
```

**What trips students up:**
- Composite PK syntax: `CONSTRAINT pk_name PRIMARY KEY (col1, col2)` — both cols inside ONE constraint
- Must create `member` and `product` BEFORE `sale` (FK order rule)
- `DECIMAL(10,2)` = up to 10 digits total, 2 after decimal point
- `AUTO_INCREMENT` on PK means you can omit that column on INSERT

---

### 4.2 INSERT

```sql
-- Insert with all columns
INSERT INTO product (product_id, name, price, quantity_on_hand, reorder_level, supplier_id)
VALUES (NULL, 'Laptop', 2500.00, 10, 3, 1);
-- NULL for auto_increment → DB generates the ID

-- Insert only required columns
INSERT INTO member (first_name, last_name, email, join_date)
VALUES ('Ali', 'Hassan', 'ali@email.com', '2024-01-15');

-- Insert into bridge table
INSERT INTO sale (member_id, product_id, sale_date, price)
VALUES (123, 444, '2024-03-01', 2500.00);

-- Delete from bridge table (composite PK = both conditions needed)
DELETE FROM sale
WHERE member_id = 123 AND product_id = 444;
```

---

### 4.3 SELECT — All Patterns the Exam Tests

```sql
-- Basic select
SELECT * FROM member;
SELECT first_name, last_name FROM member;

-- With WHERE
SELECT * FROM product WHERE price > 100;
SELECT * FROM product WHERE quantity_on_hand <= reorder_level;
SELECT * FROM member WHERE email IS NULL;
SELECT * FROM member WHERE first_name LIKE 'A%';

-- With ORDER BY
SELECT * FROM product ORDER BY price DESC;
SELECT * FROM product ORDER BY price ASC, name DESC;

-- COUNT
SELECT COUNT(*) FROM member;
SELECT COUNT(*) FROM product WHERE price < 50;

-- Aggregate functions
SELECT SUM(price) AS total_revenue FROM sale;
SELECT AVG(price) AS avg_price FROM product;
SELECT MIN(price), MAX(price) FROM product;

-- GROUP BY
SELECT supplier_id, COUNT(*) AS product_count
FROM product
GROUP BY supplier_id;

-- HAVING (filter AFTER grouping)
SELECT supplier_id, AVG(price) AS avg_price
FROM product
GROUP BY supplier_id
HAVING AVG(price) > 100;

-- Subquery
SELECT * FROM product
WHERE price = (SELECT MAX(price) FROM product);

SELECT quantity_on_hand FROM product WHERE product_id = 1212;
```

---

### 4.4 UPDATE and DELETE

```sql
-- Update a single row
UPDATE member SET email = 'newemail@email.com' WHERE member_id = 123;

-- Update multiple columns
UPDATE product SET price = 2400.00, quantity_on_hand = 8 WHERE product_id = 1;

-- Delete a specific row
DELETE FROM member WHERE member_id = 500;

-- Delete from bridge table (ALWAYS need both FK columns)
DELETE FROM sale WHERE member_id = 123 AND product_id = 444;
```

---

### 4.5 JOINs

```sql
-- INNER JOIN (most common on exam)
SELECT m.first_name, m.last_name, s.sale_date, p.name AS product_name
FROM sale s
JOIN member m  ON s.member_id  = m.member_id
JOIN product p ON s.product_id = p.product_id;

-- LEFT JOIN (all members, even those with no sales)
SELECT m.first_name, m.last_name, s.sale_date
FROM member m
LEFT JOIN sale s ON m.member_id = s.member_id;

-- Get all products and their supplier names
SELECT p.name AS product, p.price, s.supplier_name
FROM product p
JOIN supplier s ON p.supplier_id = s.supplier_id;
```

---

### 4.6 ALTER TABLE

```sql
-- Add a column
ALTER TABLE member ADD COLUMN phone VARCHAR(20);

-- Drop a column
ALTER TABLE member DROP COLUMN phone;

-- Add a foreign key
ALTER TABLE product ADD CONSTRAINT fk_prod_supplier
    FOREIGN KEY (supplier_id) REFERENCES supplier(supplier_id);

-- Drop a constraint
ALTER TABLE product DROP CONSTRAINT fk_prod_supplier;

-- Change auto_increment starting value
ALTER TABLE member AUTO_INCREMENT = 1000;
```

---

### 4.7 VIEWS and INDEXES

```sql
-- Create a view
CREATE VIEW product_summary AS
SELECT p.name, p.price, s.supplier_name
FROM product p
JOIN supplier s ON p.supplier_id = s.supplier_id;

-- Query the view
SELECT * FROM product_summary WHERE price < 100;

-- Create an index
CREATE INDEX idx_product_name ON product(name);

-- EXPLAIN to check index usage
EXPLAIN SELECT * FROM product WHERE name = 'Laptop';
```

---

### 4.8 SQL Exam Pattern: The `sale` Table Setup

The leaked exam uses a `member + product + sale` schema. Here are all likely SQL questions on it:

```sql
-- Q: Create the sale table
CREATE TABLE sale (
    member_id  INT  NOT NULL,
    product_id INT  NOT NULL,
    date       DATE NOT NULL,
    price      DECIMAL(10,2) NOT NULL,
    CONSTRAINT pk_sale PRIMARY KEY (member_id, product_id),
    CONSTRAINT fk_sale_m FOREIGN KEY (member_id)  REFERENCES member(member_id),
    CONSTRAINT fk_sale_p FOREIGN KEY (product_id) REFERENCES product(product_id)
);

-- Q: Insert a product (with null auto-id)
INSERT INTO product (product_id, name, price, quantity_on_hand, reorder_level, supplier_id)
VALUES (NULL, 'pc', 123.12, 5, 10, 1);

-- Q: Delete a sale record
DELETE FROM sale WHERE member_id = 123 AND product_id = 444;

-- Q: Get quantity of a specific product
SELECT quantity_on_hand FROM product WHERE product_id = 1212;

-- Q: Get all members who bought a specific product
SELECT m.first_name, m.last_name
FROM member m
JOIN sale s ON m.member_id = s.member_id
WHERE s.product_id = 444;

-- Q: Get total revenue per member
SELECT member_id, SUM(price) AS total_spent
FROM sale
GROUP BY member_id
ORDER BY total_spent DESC;
```

---

## 5. MONGODB CODING — EVERYTHING ON THE EXAM

> 3–4 coding questions. Pattern: insert, find, update, delete, aggregation.

---

### 5.1 Setup

```javascript
use clinic                          // switch to / create database
db.createCollection('patients')     // create a collection
```

---

### 5.2 INSERT

```javascript
// Insert one
db.patients.insertOne({
    first_name: "Ali",
    last_name:  "Hassan",
    age:        30,
    phone:      ["5551-0000", "5551-1111"],
    last_vitals: {
        height: 177,
        weight: 80,
        heart_rate: 70
    }
})

// Insert many
db.products.insertMany([
    { name: "Laptop",   price: 2500, category: "Electronics" },
    { name: "Mouse",    price: 25,   category: "Electronics" },
    { name: "Keyboard", price: 80,   category: "Electronics" }
])
```

---

### 5.3 FIND (Querying)

```javascript
// All documents
db.patients.find()

// Equality filter
db.patients.find({ first_name: "Ali" })

// Comparison operators
db.products.find({ price: { $gt: 100 } })   // greater than
db.products.find({ price: { $gte: 100 } })  // greater than or equal
db.products.find({ price: { $lt: 50 } })    // less than
db.products.find({ price: { $ne: 25 } })    // not equal
db.products.find({ category: { $in: ["Electronics", "Office"] } })

// Projection (show only name and price, hide _id)
db.products.find(
    { price: { $gt: 100 } },
    { name: 1, price: 1, _id: 0 }
)

// Sorting
db.products.find().sort({ price: -1 })   // descending
db.products.find().sort({ name: 1 })     // ascending

// Searching inside embedded objects (dot notation)
db.patients.find({ "last_vitals.weight": { $gt: 80 } })

// Searching inside arrays of objects ($elemMatch)
db.patients.find({
    "visits": { $elemMatch: { "doctor": "Taylor" } }
})
```

---

### 5.4 UPDATE

```javascript
// Update one field
db.patients.updateOne(
    { first_name: "Ali" },
    { $set: { phone: "9999-0000" } }
)

// Update many
db.patients.updateMany(
    { age: { $lt: 18 } },
    { $set: { status: "minor" } }
)

// Increment a field
db.products.updateOne(
    { name: "Laptop" },
    { $inc: { quantity_on_hand: -1 } }   // decrease by 1
)

// Remove a field
db.patients.updateOne(
    { first_name: "Ali" },
    { $unset: { status: "" } }
)
```

---

### 5.5 DELETE

```javascript
// Delete one
db.patients.deleteOne({ first_name: "Test" })

// Delete many
db.patients.deleteMany({ age: { $lt: 18 } })

// Delete ALL (empty filter = match everything)
db.patients.deleteMany({})
```

---

### 5.6 AGGREGATION PIPELINES (Most Likely on Exam)

```javascript
// Basic structure
db.collection.aggregate([
    { $stage1 },
    { $stage2 },
    ...
])

// ─── Example 1: Count products per category ───────────────────
db.products.aggregate([
    { $group: { _id: "$category", count: { $sum: 1 } } },
    { $sort: { count: -1 } }
])

// ─── Example 2: Total revenue per member (like GROUP BY) ───────
db.sales.aggregate([
    { $group: {
        _id: "$member_id",
        total_spent: { $sum: "$price" }
    }},
    { $sort: { total_spent: -1 } }
])

// ─── Example 3: Filter first THEN group ($match before $group = WHERE) ──
db.products.aggregate([
    { $match: { category: "Electronics" } },    // like WHERE
    { $group: {
        _id: "$category",
        avg_price: { $avg: "$price" },
        total: { $sum: "$price" }
    }}
])

// ─── Example 4: Filter AFTER group ($match after $group = HAVING) ────
db.sales.aggregate([
    { $group: {
        _id: "$member_id",
        total: { $sum: "$price" }
    }},
    { $match: { total: { $gt: 1000 } } }    // like HAVING
])

// ─── Example 5: $project (select specific fields) ─────────────
db.products.aggregate([
    { $project: { name: 1, price: 1, _id: 0 } }
])

// ─── Example 6: $count ────────────────────────────────────────
db.products.aggregate([
    { $match: { price: { $gt: 100 } } },
    { $count: "expensive_products" }
])

// ─── Example 7: $unwind + $group (flatten arrays then aggregate) ──
db.patients.aggregate([
    { $unwind: "$visits" },
    { $group: {
        _id: "$visits.doctor",
        visit_count: { $sum: 1 }
    }},
    { $sort: { visit_count: -1 } }
])
```

---

### 5.7 INDEXES

```javascript
// Create index (ascending = 1, descending = -1)
db.products.createIndex({ name: 1 })

// Unique index
db.members.createIndex({ email: 1 }, { unique: true })

// Compound index
db.products.createIndex({ category: 1, price: -1 })

// Check if index is used
db.products.find({ name: "Laptop" }).explain("executionStats")
// Look for: "stage": "IXSCAN" (good) vs "COLLSCAN" (bad = no index)
```

---

### 5.8 SQL vs MongoDB — Quick Recall for Exam

| SQL | MongoDB |
|-----|---------|
| `WHERE price > 100` | `{ price: { $gt: 100 } }` |
| `GROUP BY` + `COUNT(*)` | `$group: { _id: "$col", n: { $sum: 1 } }` |
| `SUM(price)` | `$sum: "$price"` |
| `AVG(price)` | `$avg: "$price"` |
| `HAVING total > 1000` | `$match: { total: { $gt: 1000 } }` (after $group) |
| `ORDER BY price DESC` | `$sort: { price: -1 }` |
| `SELECT col1, col2` | `$project: { col1: 1, col2: 1 }` |
| `WHERE` (before group) | `$match` (before `$group`) |

---

## 6. FINAL EXAM QUESTION BANK

> Calibrated exactly to the 27-question format. Questions mirror the leak patterns with different names.

---

### PART A — MCQ: Reading Relationships from Code (7 questions)

**Q1.** Consider the following:

```sql
CREATE TABLE department (
    dept_id   INT PRIMARY KEY,
    dept_name VARCHAR(50) NOT NULL
);

CREATE TABLE employee (
    emp_id    INT PRIMARY KEY,
    emp_name  VARCHAR(50),
    salary    DECIMAL(8,2),
    dept_id   INT,
    CONSTRAINT fk_emp_dept FOREIGN KEY (dept_id) REFERENCES department(dept_id)
);
```

What is the relationship between `department` and `employee`?

- A) Many-to-Many
- B) One-to-One
- C) One-to-Many (department is "one", employee is "many") ✅
- D) One-to-Many (employee is "one", department is "many")

**Explanation:** `employee` has a FK pointing to `department`. The FK is in `employee`, so `employee` is the "many" side. One department can have many employees.

---

**Q2.** Consider the following:

```sql
CREATE TABLE student (
    student_id INT PRIMARY KEY,
    name       VARCHAR(50)
);

CREATE TABLE course (
    course_id INT PRIMARY KEY,
    title     VARCHAR(100)
);

CREATE TABLE enrollment (
    student_id INT NOT NULL,
    course_id  INT NOT NULL,
    grade      CHAR(1),
    CONSTRAINT pk_enrollment PRIMARY KEY (student_id, course_id),
    CONSTRAINT fk_enr_student FOREIGN KEY (student_id) REFERENCES student(student_id),
    CONSTRAINT fk_enr_course  FOREIGN KEY (course_id)  REFERENCES course(course_id)
);
```

What is the relationship between `student` and `course`?

- A) One-to-One
- B) One-to-Many
- C) Many-to-Many ✅
- D) No relationship exists

**Explanation:** `enrollment` is a bridge table — its PK `(student_id, course_id)` is entirely composed of FKs from both tables. This is the classic M:N implementation.

---

**Q3.** Consider:

```sql
CREATE TABLE apartment (
    ownerID   NUMBER(5),
    ownerName VARCHAR2(25),
    floor     NUMBER(4,0),
    CONSTRAINT apt_id_pk PRIMARY KEY (ownerID)
);
```

Which of the following is TRUE about this table?

- A) It is a bridge table linking two entities
- B) It has a foreign key referencing another table
- C) It is an independent/parent table with no FK ✅
- D) The primary key is a composite key

**Explanation:** No FK constraint exists. `ownerID` is a single-column PK, not composite. This is a standalone parent table.

---

**Q4.** Consider:

```sql
CREATE TABLE staff (
    staff_id  INT PRIMARY KEY,
    full_name VARCHAR(100),
    position  VARCHAR(50)
);

CREATE TABLE login_info (
    staff_id  INT PRIMARY KEY,
    username  VARCHAR(50) UNIQUE,
    password  VARCHAR(255),
    CONSTRAINT fk_login_staff FOREIGN KEY (staff_id) REFERENCES staff(staff_id)
);
```

What is the relationship between `staff` and `login_info`?

- A) Many-to-Many
- B) One-to-Many (staff is one)
- C) One-to-One ✅
- D) One-to-Many (login_info is one)

**Explanation:** `login_info.staff_id` is BOTH the PK of `login_info` AND a FK to `staff`. Each staff record has exactly one login, and each login belongs to exactly one staff.

---

**Q5.** Consider:

```sql
CREATE TABLE sale (
    member_id  INT NOT NULL,
    product_id INT NOT NULL,
    date       DATE NOT NULL,
    price      DECIMAL(10,2) NOT NULL,
    CONSTRAINT pk_sale PRIMARY KEY (member_id, product_id),
    CONSTRAINT fk_sale FOREIGN KEY (member_id) REFERENCES member(member_id),
    CONSTRAINT fk_sale2 FOREIGN KEY (product_id) REFERENCES product(product_id)
);
```

What does the `sale` table represent?

- A) A one-to-many relationship between member and product
- B) A one-to-one relationship
- C) A bridge table implementing a many-to-many relationship ✅
- D) A standalone table with no relationships

---

**Q6.** In the `sale` table above, the `member_id` column is:

- A) Only a Primary Key
- B) Only a Foreign Key
- C) Both a Primary Key and a Foreign Key ✅
- D) Neither a Primary Key nor a Foreign Key

---

**Q7.** Which scenario would cause a CREATE TABLE statement to fail?

- A) Creating a table with a composite primary key
- B) Creating a table with AUTO_INCREMENT on the primary key
- C) Creating a table with a foreign key BEFORE the referenced table exists ✅
- D) Creating a table without any foreign keys

---

### PART B — MCQ: Cardinality from ER Diagrams (4 questions)

**Q8.** The following ER diagram is shown:

```
DEPARTMENT  ||────────o{  EMPLOYEE
```

What does this represent?

- A) Each employee must belong to exactly one department, and a department can have zero or many employees ✅
- B) Each department must have at least one employee
- C) Each employee can belong to many departments
- D) This is a many-to-many relationship

---

**Q9.** A crow's foot diagram shows `||` on the left end and `|{` on the right end. This means:

- A) The left entity has many; the right entity has one
- B) The left entity has exactly one; the right entity has one or more ✅
- C) Both entities have exactly one
- D) Both entities have many

---

**Q10.** In a physical model in MySQL Workbench, which symbol indicates a mandatory foreign key (NOT NULL)?

- A) Open blue diamond
- B) Open red diamond
- C) Filled red diamond ✅
- D) Yellow key

---

**Q11.** If a foreign key is placed in the `EMPLOYEE` table referencing `DEPARTMENT`, this means:

- A) One employee can work in many departments
- B) Many employees can be in many departments
- C) Many employees can belong to one department ✅
- D) One department is linked to one employee only

---

### PART C — MCQ: 2NF / 3NF (4 questions)

**Q12.** A table has a composite primary key `(order_id, product_id)`. The attribute `product_name` depends only on `product_id`. What problem does this cause?

- A) It violates 1NF because of repeating groups
- B) It violates 2NF because of a partial dependency ✅
- C) It violates 3NF because of a transitive dependency
- D) It does not violate any normal form

---

**Q13.** A table `ORDER(order_id, customer_id, customer_name, customer_email)` has PK `order_id`. The `customer_name` and `customer_email` depend on `customer_id`, not directly on `order_id`. What problem is this?

- A) Partial dependency — violates 2NF
- B) Transitive dependency — violates 3NF ✅
- C) Repeating groups — violates 1NF
- D) No problem — this is normal

---

**Q14.** Which of the following tables is in 2NF but NOT in 3NF?

- A) `PRODUCT(product_id, name, price)` — PK: product_id
- B) `SALE(member_id, product_id, quantity)` — PK: (member_id, product_id)
- C) `ORDER(order_id, customer_id, customer_city)` where `customer_id → customer_city` ✅
- D) `ENROLLMENT(student_id, course_id, grade)` — PK: (student_id, course_id)

**Explanation:** C has a transitive dependency: `order_id → customer_id → customer_city`. Not 3NF. A is fine. B and D have composite PKs with no partial or transitive issues.

---

**Q15.** A dependency graph shows: `(A, B) → C, D` and `B → D`. What does `B → D` represent?

- A) A full functional dependency
- B) A transitive dependency
- C) A partial dependency ✅
- D) The primary key is incorrect

**Explanation:** The PK is `(A, B)`. `D` depends on only `B` (part of the PK) — this is a partial dependency, violating 2NF.

---

### PART D — Written: Data Anomalies (2 questions)

**Q16.** Define "data anomaly" and describe the three types. For each type, give a concrete example using a `customer-order-product` scenario where all data is in one table.

**Answer:**

A **data anomaly** is a problem that arises when data is stored in an improperly organized table, causing errors or inconsistencies during database operations.

**Setup:** Single table `ALL_DATA(order_id, customer_id, customer_name, customer_phone, product_id, product_name, price, quantity)`

**1. UPDATE ANOMALY:** If customer Ali Hassan (customer_id 101) changes his phone number, we must update EVERY row where his ID appears. Miss one row → the database contains two different phone numbers for the same customer → inconsistency.

**2. INSERT ANOMALY:** We cannot add a new product (e.g., product_id=P99, name="Monitor", price=300) until someone actually orders it. There is no row to store the product information independently.

**3. DELETE ANOMALY:** If we delete the only order containing product P01 ("Laptop"), we permanently lose all information about that product (its name, price, etc.) — even though we only intended to delete an order.

---

**Q17.** Explain what causes data anomalies, and how normalization solves them.

**Answer:**

Data anomalies are caused by **data redundancy** — storing facts about multiple distinct real-world things (customers, products, orders) in a single table. When the same data is repeated across multiple rows, any change requires updating many rows simultaneously, and dependent data can be accidentally lost or corrupted.

**Normalization solves this** by decomposing the table into smaller tables, each focused on exactly one subject. After normalizing:
- `CUSTOMER` table stores customer facts → update phone in one place only (no update anomaly)
- `PRODUCT` table stores product facts → products exist independently of orders (no insert anomaly)
- `ORDER` and `ORDER_ITEM` tables store order facts → deleting an order doesn't delete product records (no delete anomaly)

---

### PART E — Written: Normalization (2 questions)

**Q18.** Normalize the following table to 3NF. Show each step clearly.

```
STUDENT_COURSE(student_id, student_name, student_major, course_id, course_name,
               dept_id, dept_name, grade)
```

Assume: Each student has one major. Each course belongs to one department. The PK is `(student_id, course_id)`.

**Answer:**

**Step 1 — Check 1NF:** Each cell has one value, PK exists. ✅ In 1NF.

**Step 2 — Find Partial Dependencies (→ 2NF):**
PK = `(student_id, course_id)`

| Attribute | Depends on | Full or Partial? |
|-----------|-----------|-----------------|
| grade | (student_id, course_id) | ✅ Full |
| student_name | student_id only | ❌ Partial |
| student_major | student_id only | ❌ Partial |
| course_name | course_id only | ❌ Partial |
| dept_id | course_id only | ❌ Partial |
| dept_name | course_id only | ❌ Partial |

**Decompose:**
```
ENROLLMENT(student_id, course_id, grade)        PK: (student_id, course_id)
STUDENT(student_id, student_name, student_major) PK: student_id
COURSE(course_id, course_name, dept_id, dept_name) PK: course_id
```
✅ In 2NF.

**Step 3 — Find Transitive Dependencies (→ 3NF):**
Look at COURSE: `dept_name` depends on `dept_id`, not on `course_id` directly.
Chain: `course_id → dept_id → dept_name`

**Decompose:**
```
COURSE(course_id, course_name, dept_id)   PK: course_id, FK: dept_id → DEPARTMENT
DEPARTMENT(dept_id, dept_name)            PK: dept_id
```

**Final 3NF result:**
```
STUDENT(student_id, student_name, student_major)
    PK: student_id

DEPARTMENT(dept_id, dept_name)
    PK: dept_id

COURSE(course_id, course_name, dept_id)
    PK: course_id
    FK: dept_id → DEPARTMENT

ENROLLMENT(student_id, course_id, grade)
    PK: (student_id, course_id)
    FK: student_id → STUDENT
    FK: course_id → COURSE
```

---

**Q19.** Given the following table, identify whether it is in 2NF or 3NF, and explain why.

```
EMPLOYEE(emp_id, emp_name, dept_id, dept_name, dept_location)
PK: emp_id
```

**Answer:**

**1NF:** ✅ Single values in each cell, PK exists.

**2NF:** The PK is a single column `emp_id`. A partial dependency is impossible with a single-column PK. ✅ In 2NF automatically.

**3NF check:** Look for transitive dependencies.
- `emp_id → dept_id` ✅ (direct from PK)
- `dept_id → dept_name, dept_location` ❌ TRANSITIVE — `dept_id` is a non-key attribute that determines other non-key attributes.

Chain: `emp_id → dept_id → dept_name, dept_location`

**Conclusion:** The table is in 2NF but **NOT in 3NF** due to the transitive dependency.

**Fix:**
```
EMPLOYEE(emp_id, emp_name, dept_id)   PK: emp_id, FK: dept_id → DEPARTMENT
DEPARTMENT(dept_id, dept_name, dept_location)   PK: dept_id
```

---

### PART F — SQL Coding (6 questions)

**Q20.** Write the SQL to create the `product` table with the following specifications:
- `product_id`: integer, NOT NULL, auto-increment, primary key
- `name`: varchar 100, NOT NULL
- `price`: decimal(10,2), NOT NULL
- `quantity_on_hand`: integer, NOT NULL
- `reorder_level`: integer, NOT NULL
- `supplier_id`: integer, NOT NULL — foreign key referencing `supplier(supplier_id)`

**Answer:**
```sql
CREATE TABLE product (
    product_id       INT           NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name             VARCHAR(100)  NOT NULL,
    price            DECIMAL(10,2) NOT NULL,
    quantity_on_hand INT           NOT NULL,
    reorder_level    INT           NOT NULL,
    supplier_id      INT           NOT NULL,
    CONSTRAINT fk_product_supplier FOREIGN KEY (supplier_id)
        REFERENCES supplier(supplier_id)
);
```

---

**Q21.** Write the SQL to insert a new product with: name='pc', price=123.12, quantity_on_hand=5, reorder_level=10, supplier_id=1. Let the system generate the product_id automatically.

**Answer:**
```sql
INSERT INTO product (product_id, name, price, quantity_on_hand, reorder_level, supplier_id)
VALUES (NULL, 'pc', 123.12, 5, 10, 1);
```
*OR equivalently (omitting product_id from column list):*
```sql
INSERT INTO product (name, price, quantity_on_hand, reorder_level, supplier_id)
VALUES ('pc', 123.12, 5, 10, 1);
```

---

**Q22.** Write the SQL to delete a specific sale record for member_id=123 and product_id=444.

**Answer:**
```sql
DELETE FROM sale
WHERE member_id = 123 AND product_id = 444;
```

---

**Q23.** Write the SQL to find the quantity_on_hand for the product with product_id = 1212.

**Answer:**
```sql
SELECT quantity_on_hand FROM product
WHERE product_id = 1212;
```

---

**Q24.** Write the SQL to show all products along with their supplier names. Use a JOIN.

**Answer:**
```sql
SELECT p.name AS product_name, p.price, s.supplier_name
FROM product p
JOIN supplier s ON p.supplier_id = s.supplier_id;
```

---

**Q25.** Write the SQL to find the average price of products for each supplier, only showing suppliers where the average price is above 50.00. Order by average price descending.

**Answer:**
```sql
SELECT supplier_id, AVG(price) AS avg_price
FROM product
GROUP BY supplier_id
HAVING AVG(price) > 50.00
ORDER BY avg_price DESC;
```

---

### PART G — MongoDB Coding (3 questions)

**Q26.** Write the MongoDB command to find all products in the "Electronics" category with a price greater than 100. Show only the `name` and `price` fields, hiding the `_id`.

**Answer:**
```javascript
db.products.find(
    { category: "Electronics", price: { $gt: 100 } },
    { name: 1, price: 1, _id: 0 }
)
```

---

**Q27.** Write the MongoDB aggregation pipeline to compute the total revenue per product category, only showing categories with total revenue above 5000, sorted by total revenue descending.

**Answer:**
```javascript
db.sales.aggregate([
    { $group: {
        _id: "$category",
        total_revenue: { $sum: "$price" }
    }},
    { $match: { total_revenue: { $gt: 5000 } } },
    { $sort: { total_revenue: -1 } }
])
```

---

**Q28 (Bonus).** Write the MongoDB command to update ALL products in the "Electronics" category, increasing their price by 10 using `$inc`.

**Answer:**
```javascript
db.products.updateMany(
    { category: "Electronics" },
    { $inc: { price: 10 } }
)
```

---

## MASTER CHEAT SHEET — Last 10 Minutes Before Exam

### Normalization in 3 Lines
- **1NF:** Atomic values, no lists in cells, must have a PK
- **2NF:** No partial dependencies (non-key must need the WHOLE composite PK)
- **3NF:** No transitive dependencies (non-key must NOT determine another non-key)

### Data Anomalies in 3 Lines
- **Update:** Same data in many rows → must update many places → inconsistency risk
- **Insert:** Can't add data without an unrelated event (e.g., can't add product without an order)
- **Delete:** Deleting one thing accidentally destroys another unrelated thing

### Read Relationship from Code in 5 Seconds
- Table has FK → it's the "many" side
- PK is composite AND both parts are FKs → bridge table = M:N
- PK equals FK → 1:1

### SQL Must-Know Patterns
```sql
-- GROUP BY + HAVING (most tested combo)
SELECT col, COUNT(*) FROM table GROUP BY col HAVING COUNT(*) > 2;

-- Subquery
SELECT * FROM product WHERE price = (SELECT MAX(price) FROM product);

-- Delete from bridge table
DELETE FROM sale WHERE member_id = 123 AND product_id = 444;

-- Insert with auto_increment (use NULL)
INSERT INTO product (...) VALUES (NULL, ...);
```

### MongoDB Must-Know Patterns
```javascript
// $match BEFORE $group = WHERE
// $match AFTER  $group = HAVING
// $sum: 1 = COUNT(*)
// $sum: "$price" = SUM(price)

db.col.aggregate([
    { $match: { filter } },          // WHERE
    { $group: { _id: "$col", n: { $sum: 1 } } },   // GROUP BY + COUNT
    { $match: { n: { $gt: 5 } } },  // HAVING
    { $sort: { n: -1 } }            // ORDER BY DESC
])
```

### Partial vs Transitive — One Line Each
- **Partial:** Part of composite PK → non-key attribute (needs composite PK to exist)
- **Transitive:** PK → non-key A → non-key B (chain through a non-key)
