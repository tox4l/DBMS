# DBMS Curriculum - Lossless Comparison Tables

Source handling: slide order is preserved by PDF file. Each slide/page is represented in a comparison table. Extracted slide text is preserved inside `<pre>` blocks to avoid collapsing code, spacing, bullets, and examples.

No outside teaching content was added. Comparison anchors are detected only from terms and relationships present in the extracted curriculum text.

## 0. Source Coverage Table

<table>
<thead><tr><th>#</th><th>Source PDF</th><th>Pages</th><th>Extracted text characters</th><th>Coverage status</th></tr></thead>
<tbody>
<tr><td>1</td><td>L1.2 DB Classification</td><td>28</td><td>7271</td><td>Included</td></tr>
<tr><td>2</td><td>L1.3 Data Models</td><td>9</td><td>2946</td><td>Included</td></tr>
<tr><td>3</td><td>L2.1 - Keys</td><td>9</td><td>3037</td><td>Included</td></tr>
<tr><td>4</td><td>L2.2 - Relationships</td><td>10</td><td>1134</td><td>Included</td></tr>
<tr><td>5</td><td>L2.3 - Relational Algebra</td><td>11</td><td>1646</td><td>Included</td></tr>
<tr><td>6</td><td>L2.4 - Database Lifecycle</td><td>9</td><td>1038</td><td>Included</td></tr>
<tr><td>7</td><td>L2.5 - Conceptual Logical Physical Models</td><td>11</td><td>3519</td><td>Included</td></tr>
<tr><td>8</td><td>L2.6 - Mapping ER to Relational Tables</td><td>8</td><td>2176</td><td>Included</td></tr>
<tr><td>9</td><td>L4.1 - DDL</td><td>8</td><td>1874</td><td>Included</td></tr>
<tr><td>10</td><td>L4.2 - Inserting and Basic Select</td><td>14</td><td>3101</td><td>Included</td></tr>
<tr><td>11</td><td>L4.3 - Updating and Deleting Data</td><td>12</td><td>2892</td><td>Included</td></tr>
<tr><td>12</td><td>L4.4 - Aggregate Functions</td><td>10</td><td>2335</td><td>Included</td></tr>
<tr><td>13</td><td>L4.5 - Table Alteration</td><td>6</td><td>1966</td><td>Included</td></tr>
<tr><td>14</td><td>L4.6 - Joins</td><td>9</td><td>2437</td><td>Included</td></tr>
<tr><td>15</td><td>L4.7 - Auto Increment, Indexing</td><td>10</td><td>3590</td><td>Included</td></tr>
<tr><td>16</td><td>L4.9 - Sequences Views</td><td>9</td><td>3697</td><td>Included</td></tr>
<tr><td>17</td><td>L4.10 - Extra Data Types</td><td>10</td><td>2988</td><td>Included</td></tr>
<tr><td>18</td><td>L5.1 - Comparison Overview</td><td>10</td><td>3361</td><td>Included</td></tr>
<tr><td>19</td><td>L5.2 - MongoDB Overview</td><td>15</td><td>1878</td><td>Included</td></tr>
<tr><td>20</td><td>L5.3 - Document Inserting and Querying</td><td>11</td><td>2997</td><td>Included</td></tr>
<tr><td>21</td><td>L5.4 - Updating and Deleting Documents</td><td>9</td><td>2151</td><td>Included</td></tr>
<tr><td>22</td><td>L5.5 - Arrays and Embedded Objects</td><td>11</td><td>12839</td><td>Included</td></tr>
<tr><td>23</td><td>L5.6 - Document Design</td><td>13</td><td>6485</td><td>Included</td></tr>
<tr><td>24</td><td>L5.7 - Indexes in MongoDB</td><td>6</td><td>891</td><td>Included</td></tr>
<tr><td>25</td><td>T4.1 - DDL</td><td>6</td><td>906</td><td>Included</td></tr>
</tbody>
</table>

## 1. Curriculum-Wide Comparison Map

<table>
<thead><tr><th>#</th><th>Source PDF</th><th>Main detected curriculum anchors</th><th>Direct comparison / relationship lines detected from slides</th></tr></thead>
<tbody>
<tr><td>1</td><td>L1.2 DB Classification</td><td>single-user, multi-user, centralized, distributed, transactional, data warehouse, OLTP, OLAP, paper-based, relational, SQL, MySQL, Oracle, MongoDB, physical, redundancy, product, operation, backup, where, count, min, sum, JSON, variety, value, BASE, consistent, document, find</td><td><pre>The concept of single vs multi-user databases is mostly a textbook definition;
database because the old version allowed only a single application
to connect at any given time but unless the database is opened in
such as SQL Server, Oracle and MySQL
Centralized Database
A centralized database is a situation where the data is kept in one
ensures that there is no possibility of different sites getting incorrect
It does however become a single point of failure and if the remote
Distributed Database
Considerably more challenging to configure and maintain but good
A good example of this is the Google search database… distributed
Transactional vs Data Warehouses
Data Warehouse
Transactional
Transactional Databases are used for processing of real-time
Read and write data quickly while maintaining data integrity.
Data Warehouse system would likely capture all of the day-to-day transactions
suggestions for different times of the year.
• While it is possible to find the full history of a single patient, it is
Text is okay to read but not that useful for retrieving
The only thing that we benefit from compared to the
Excel mimics a database because it is possible to store
However, unless you spend a lot of time to protect data, the
record the age of one person in days while another person
While we can ask D2L how long a student took to write a Quiz, we cannot ask
queries (SQL), you can ask questions that the D2L designers haven’t
thought about but might still be something that you are interested in.</pre></td></tr>
<tr><td>2</td><td>L1.3 Data Models</td><td>NoSQL, SQL, MongoDB, data model, conceptual, physical, abstraction, attribute, entity, relationship, constraint, business rules, implementation, constraint, where, min, JSON, BASE</td><td><pre>• Entities are also called table, or relation
• Verbs associating nouns will be a relationship
• The “next generation” however seems to be gaining traction in the
classification called ‘noSQL’.... the table mentions XML but JSON is</pre></td></tr>
<tr><td>3</td><td>L2.1 - Keys</td><td>relational, logical, attribute, entity, relationship, primary key, foreign key, composite key, product, unique, min, view, unique</td><td><pre>Entity Relationship Models
Tables (aka Entity or Relation)
• The name of the patient, however, does not determine the QID!
• A phone number does not determine the patient name because it is
• Name of relation (table) comes first</pre></td></tr>
<tr><td>4</td><td>L2.2 - Relationships</td><td>relational, entity, relationship, 1:1, 1:M, M:N, cardinality, redundancy, test, BASE, one-to-many</td><td><pre>Relationships in Relation
• A relationship should be read in both directions:
Cardinality
• Most common relation in a relational model
• “A patient is subjected to multipe procedures/tests but each test is for</pre></td></tr>
<tr><td>5</td><td>L2.3 - Relational Algebra</td><td>relational, SQL, MongoDB, attribute, primary key, foreign key, select operator, project, union, intersect, difference, product, divide, join, cartesian, operation, select, where, min, find</td><td><pre>SQL syntax
• Operators: select, project, join, intersect, union, difference, product, divide
• This course mainly focuses on: select, project, join
UNION
• All entries from both tables but no duplicates
• Tables must be union compatible
INTERSECT
DIFFERENCE
• Rows that appear in the first table but not the second table
difference could be used to determine which student was enrolled in
one course but not the other
appointment inner join patient
• Special case of the inner join
appointment natural join patient
patient outer join appointment</pre></td></tr>
<tr><td>6</td><td>L2.4 - Database Lifecycle</td><td>constraint, database lifecycle, initial study, database design, implementation, loading, test, operation, maintenance, backup, recovery, security, constraint, check, performance, view, BASE</td><td><pre>• While the system is being used, collect statistics about the operation.</pre></td></tr>
<tr><td>7</td><td>L2.5 - Conceptual Logical Physical Models</td><td>SQL, MySQL, MongoDB, conceptual, logical, physical, abstraction, attribute, entity, relationship, constraint, primary key, foreign key, mandatory, optional, bridge table, database design, constraint, not null, unique, where, min, index, performance, BASE, find, unique, Workbench</td><td><pre>• While you are designing the database, it is easier to start with more
Different Definitions
• You will find that different people have different definitions of what
Relationship Diagrams (ERDs).
• Attributes can be left out at this level, but some people include
and relationships defined in the logical model, but tailored to the
different drives (SSD vs Mechanical Hard drives); this would be
Relationship Participation
The relationship says that a patient could have many appointments (including zero)
but each appointment is for a single patient.</pre></td></tr>
<tr><td>8</td><td>L2.6 - Mapping ER to Relational Tables</td><td>conceptual, logical, physical, attribute, entity, relationship, constraint, business rules, primary key, foreign key, mandatory, optional, 1:1, 1:M, M:N, normalization, bridge table, identifying relationship, constraint, BASE, Workbench</td><td><pre>Mapping Relations from
• The foreign key goes into the “many” side of the relationship.
• The foreign key might be optional or mandatory but this is really a
This creates an identifying relationship.
• Pick an appropriate name for the bridge table based on the relation.
• If both sides are mandatory and not part of another relationship then
• Be careful because you might be introducing transitive
• If we decide that each instructor must have an office (but an office
• If we decide that each office must have an instructor (but an</pre></td></tr>
<tr><td>9</td><td>L4.1 - DDL</td><td>SQL, MySQL, Oracle, attribute, constraint, primary key, foreign key, constraint, not null, unique, check, default, insert, delete, count, alter table, value, BASE, unique</td><td><pre>• The format is flexible but best if you can put each attribute on a
Named primary key is not used in MySQL but other systems such as Oracle SQL does</pre></td></tr>
<tr><td>10</td><td>L4.2 - Inserting and Basic Select</td><td>SQL, MySQL, Oracle, logical, constraint, project, test, DML, TCL, constraint, not null, check, default, insert, select, update, delete, commit, rollback, where, value, BASE, projection, logical operator, Workbench</td><td><pre>MySQL (but not Oracle) allows for multiple values to be inserted.
Remember: SELECTION vs PROJECTION
• Can be used as “column between 4 and 10” instead of “column &gt;= 4 and
but you must use “column is null”
https://www.w3schools.com/sql/
https://www.w3schools.com/sql/sql_quiz.asp
https://www.geeksforgeeks.org/sql-tutorial/
https://sql.practicetestgeeks.com/sql-cert-practice-test/</pre></td></tr>
<tr><td>11</td><td>L4.3 - Updating and Deleting Data</td><td>SQL, MySQL, relationship, constraint, primary key, foreign key, optional, operation, create table, constraint, default, insert, select, update, delete, commit, rollback, where, order by, alias, cascade update, cascade delete, sum, rename, value, BASE</td><td><pre>• Helpful while learning because we can undo changes.
• If row is not being used in a foreign key relationship, then no
• Sounds useful but generally you probably don’t want it (keeping
get things ordered by primary key but there is no guarantee.</pre></td></tr>
<tr><td>12</td><td>L4.4 - Aggregate Functions</td><td>SQL, MySQL, select, where, distinct, aggregate, count, min, max, avg, sum, group by, having, subquery, rename, value, BASE, find</td><td><pre>• SQL provides various mathematical functions to help summarize
• The example table doesn’t make sense but we’ll add the
very useful analysis results but unfortunately it is a bit trickier to use
• Suppose we wanted to know how many different sizes are supplied</pre></td></tr>
<tr><td>13</td><td>L4.5 - Table Alteration</td><td>SQL, MySQL, constraint, primary key, foreign key, referential integrity, union, intersect, difference, operation, constraint, default, select, update, delete, where, min, alter table, add column, drop column, set operations, value</td><td><pre>• This is better than dropping the table and recreating because you
MySQL supports the Union operation but not the others listed below
union
Intersect:
Difference:</pre></td></tr>
<tr><td>14</td><td>L4.6 - Joins</td><td>relational, SQL, Oracle, foreign key, mandatory, normalization, project, join, operation, select, where, alias, having, BASE, projection</td><td><pre>• The most imporant SQL operation in a relational database!
• Sounds sort of like the opposite of normalization
• But, we use joins BECAUSE we have normalized
have an “inner join”.
Join Syntax
• It is necessary to say which column you are joining on because the
“natural join” command.
different column names.
Outer Join
• An outer join allows you to include all results from a table even if there are
inner join.
• A join always has two tables that we would probably call “first” and
“second” but we will also refer to them as “left” and ”right”.
Outer Join Syntax
• We could flip the order and use a “right join”.
• Add additional “join” clauses.</pre></td></tr>
<tr><td>15</td><td>L4.7 - Auto Increment, Indexing</td><td>SQL, MySQL, primary key, surrogate key, difference, join, operation, insert, select, update, delete, where, min, sum, alter table, auto_increment, index, performance, explain, view, value, BASE, find</td><td><pre>mySQL allow AI on any column, but still, only 1 AI per table.
• Why not include everything? Because the table could possibly be too
• Most patients’ records will be found by phone number because they
• Notice the difference between search on ID vs phone number.
• Insert, update and delete operations take longer because the
• Make sure that you join tables based on the primary key!</pre></td></tr>
<tr><td>16</td><td>L4.9 - Sequences Views</td><td>SQL, Oracle, entity, relationship, primary key, union, security, create table, not null, insert, select, update, distinct, aggregate, min, max, group by, having, alter table, sequence, view, value, BASE</td><td><pre>• Not part of the course but mentioned because it is in the book and
* In MS SQL server there are ”identities”:
• sequence returns 10 once it reaches 100 because of the CYCLE
able to see fields like the name, phone number but you don’t want
Updatable vs Non Updatable Views
the view but only some columns:
• The column patient is not because it is formed from multiple columns
on the base tables.
For a view to be updatable, there must be a one-to-one relationship
Aggregate functions, distinct, group by, union, nested queries, etc.</pre></td></tr>
<tr><td>17</td><td>L4.10 - Extra Data Types</td><td>relational, NoSQL, SQL, MySQL, attribute, relationship, 1:M, database design, select, where, min, JSON, value, BASE, collection, array</td><td><pre>(in preparation for noSQL)
unlike a table.
JSON vs Relational Tables
• MySQL supports JSON field types, however, it is not as efficient as a
NoSQL database.
• Writing a large JSON structure is unpleasant, but generally, a
What Is a NoSQL Database? | IBM
NoSQL, also referred to as “not only
SQL” or “non-SQL”, is an approach
• Strings have lots of surprises because of the quotation marks.
• Most people only have a couple of phone numbers but rather than
creating a new 1:M relationship with another table, a JSON record
• Imagine a competition where each team has a score and a time but
• We know the final scores of the teams but maybe we want to keep track of what</pre></td></tr>
<tr><td>18</td><td>L5.1 - Comparison Overview</td><td>distributed, relational, non-relational, NoSQL, SQL, MongoDB, primary key, foreign key, product, check, commit, where, min, view, JSON, big data, volume, velocity, variety, veracity, value, ACID, BASE, atomic, consistent, isolated, durable, document, find</td><td><pre>Introduction to noSQL Databases
• Storage of this data requires new approaches to data storage, but a
standard SQL relational database was not designed to handle such
day but over time this adds up.
NoSQL Databases
Relational Databases use ACID transactions
• Distributed
• Compared to vertically scalable in RDBMS, meaning that we
• Focus is on finding information rather than updating it
NoSQL Databases use BASE Transactions
all of the records but it will get there eventually
• SQL vs NoSQL</pre></td></tr>
<tr><td>19</td><td>L5.2 - MongoDB Overview</td><td>SQL, MySQL, MongoDB, primary key, unique, insert, where, count, index, view, JSON, value, BASE, collection, document, array, unique</td><td><pre>• The _id can be specified but typically generated automatically by the</pre></td></tr>
<tr><td>20</td><td>L5.3 - Document Inserting and Querying</td><td>relational, SQL, MongoDB, logical, primary key, optional, project, default, insert, select, count, value, collection, document, insertOne, insertMany, find, projection</td><td><pre>• db.collection.insertOne({…}) -- recall a collection here is like a table in SQL
• You can set a primary key if you want, but if you don’t add one to the
Relational Operators for comparison
• db.car_sales.count() – Deprecated but still works for now...
• don’t use it because it might stop working the day before the final exam!</pre></td></tr>
<tr><td>21</td><td>L5.4 - Updating and Deleting Documents</td><td>MongoDB, project, operation, update, delete, aggregate, count, sum, sequence, value, collection, document, updateOne, updateMany, replaceOne, $set, $inc, $mul, $unset, deleteOne, deleteMany, aggregation pipeline, $match, $project, $group, $count</td><td><pre>There are many but we focus on: $set, $inc, $mul, $unset
There are many aggregate functions but for this course we focus on:
• List all manufacturers by the sum of the prices but show only the</pre></td></tr>
<tr><td>22</td><td>L5.5 - Arrays and Embedded Objects</td><td>MongoDB, relationship, 1:1, 1:M, M:N, check, update, where, sum, having, value, BASE, collection, document, find, aggregation pipeline, embedded object, array, dot notation, $elemMatch, $unwind</td><td><pre>Error raised because Sarah has multiple visits. How to Solve it? &quot;321-789-6540&quot;
1) This version will work because one record match the query. &quot;visits&quot;: [
2) This version will work because it updates all visits for Sarah.</pre></td></tr>
<tr><td>23</td><td>L5.6 - Document Design</td><td>SQL, MongoDB, entity, relationship, foreign key, cardinality, product, join, operation, update, where, min, performance, view, atomic, collection, document, find, embedded object, array, embedding, referencing, one-to-few, one-to-many, one-to-squillions, 16MB</td><td><pre>• No Rules = Easy, but No Rules = Chaos!
• Just because there are no rules doesn’t mean we shouldn’t try to
• The question is when to embed information and when to keep the
information in a separate collection (reference).
• Embed the document directly, especially if:
• You need to maintain relationships, but you don’t need to load all child data every
• A patient may have many visits, but these visits are stored in a separate collection
because a patient might have hundreds or thousands of visits over time.
• When the number of child records is extremely large, it is better to emulate the SQL
• Instead of storing an array of references in the parent document (which could grow
very large), you place a reference to the parent document (e.g., patient_id) in the
large. However, we include it
here for comparison with the
Embedding vs Referencing
Embedding
Referencing
•Rule 1: Favor embedding unless there is a compelling reason not
Good Use of Embedding
Embedding comments in a blog post makes
Bad Use of Embedding
Embedding thousands of employee
reason not to embed it.
reference them in the order.
Embedding a product inside
•Rule 3: Avoid joins and lookups, if possible, but don&#x27;t be afraid if
For a large retail store, reference the products and use a
Embedding the menu in the
embed them; if there are more than a few thousand documents on
cardinality arrays are a compelling reason not to embed.
Bad Use of Embedding Better Approach:
post document can cause it to grow too large collection and reference them
embedding is likely better.
 If data is often queried or updated independently, referencing is a
 Embed the N side if the cardinality is one-to-few and there is no need
 Use an array of references to the N-side objects if the cardinality is
 Use a reference to the One-side in the N-side objects if the cardinality</pre></td></tr>
<tr><td>24</td><td>L5.7 - Indexes in MongoDB</td><td>MongoDB, unique, index, performance, explain, value, collection, document, unique, expireAfterSeconds, compound, multikey, geospatial</td><td><pre>• Searching for a document given the _id is quick but all other queries
• MongoDB supports many types of indexes:
• MongoDB has an explain command but it is somewhat tricky to write
This is useful if you need to sort but otherwise single searching will</pre></td></tr>
<tr><td>25</td><td>T4.1 - DDL</td><td>SQL, MySQL, attribute, relationship, foreign key, drop table, insert, delete, BASE, Workbench</td><td><pre>• Creating a relationship automatically inserts a foreign key.
• Hint: Do not create the foreign keys, just create the relationship and
• Making a change to the SQL file does not change the database!</pre></td></tr>
</tbody>
</table>

## 1. L1.2 DB Classification

Pages: 28.

<table>
<thead><tr><th>Page</th><th>Slide focus / heading</th><th>Comparison anchors detected on this slide</th><th>Direct comparison / relationship lines from slide</th><th>Lossless extracted slide text</th></tr></thead>
<tbody>
<tr><td>1</td><td>Database Classification</td><td>BASE</td><td><pre>None explicit</pre></td><td><pre>Database Classification



                          www.udst.edu.qa</pre></td></tr>
<tr><td>2</td><td>Database Access / The concept of single vs multi-user databases is mostly a textbook definition;</td><td>single-user, multi-user, BASE</td><td><pre>The concept of single vs multi-user databases is mostly a textbook definition;
database because the old version allowed only a single application
to connect at any given time but unless the database is opened in</pre></td><td><pre>Database Access
The concept of single vs multi-user databases is mostly a textbook definition;

Single-user databases really don’t exist these days. e.g. Personal DB – One user at
a time.

The classic Microsoft Access is sometimes described as a single-user
database because the old version allowed only a single application
to connect at any given time but unless the database is opened in
exclusive mode, multiple applications can connect now.

Even the later versions of MS Access could not really handle the load of multiple
users simultaneously connecting to them efficiently.

Some applications may store their data (i.e. their files) using a single-user customized
database engine.</pre></td></tr>
<tr><td>3</td><td>•Multi-user databases / • Support two or more users accessing the database simultaneously</td><td>multi-user, relational, SQL, MySQL, Oracle, BASE</td><td><pre>such as SQL Server, Oracle and MySQL</pre></td><td><pre>•Multi-user databases
 • Support two or more users accessing the database simultaneously
 • Almost all modern databases - Industry-standard relational databases
   such as SQL Server, Oracle and MySQL




          https://www.oracle.com/          https://www.mysql.com/</pre></td></tr>
<tr><td>4</td><td>Centralized Database</td><td>centralized, BASE</td><td><pre>Centralized Database</pre></td><td><pre>Centralized Database</pre></td></tr>
<tr><td>5</td><td>A centralized database is a situation where the data is kept in one / physical location. It makes administration very simple and it</td><td>centralized, physical, where, min, BASE</td><td><pre>A centralized database is a situation where the data is kept in one
ensures that there is no possibility of different sites getting incorrect
It does however become a single point of failure and if the remote</pre></td><td><pre>A centralized database is a situation where the data is kept in one
physical location. It makes administration very simple and it
ensures that there is no possibility of different sites getting incorrect
data as there is only one single copy of the database.

It does however become a single point of failure and if the remote
access locations have slow Internet access then it makes things
difficult for them. It could also overload the database server.
Think of airlines, and search how sometimes thousands of flights are
cancelled due to the failure of the airline database systems.</pre></td></tr>
<tr><td>6</td><td>Distributed Database</td><td>distributed, BASE</td><td><pre>Distributed Database</pre></td><td><pre>Distributed Database</pre></td></tr>
<tr><td>7</td><td>Data is kept in multiple physical locations to make local access / faster. Some systems allow for the database to be replicated across</td><td>distributed, physical, redundancy, where, count, BASE</td><td><pre>Considerably more challenging to configure and maintain but good
A good example of this is the Google search database… distributed</pre></td><td><pre>Data is kept in multiple physical locations to make local access
faster. Some systems allow for the database to be replicated across
the nodes providing redundancy. if one of the DB nodes goes down
it is possible that no data will be lost.
Considerably more challenging to configure and maintain but good
for situations where you need the data close to the end user.
A good example of this is the Google search database… distributed
allows each country or region to have their own copy of the data.</pre></td></tr>
<tr><td>8</td><td>Title / visual-only slide</td><td>None explicit</td><td><pre>None explicit</pre></td><td><pre>https://www.youtube.com/watch?v=QjvjeQquon8</pre></td></tr>
<tr><td>9</td><td>Transactional vs Data Warehouses / Sales Managers</td><td>transactional, data warehouse, BASE</td><td><pre>Transactional vs Data Warehouses
Data Warehouse
Transactional</pre></td><td><pre>Transactional vs Data Warehouses
                             Sales Managers
Customers




                            Data Warehouse
            Transactional
              Database
               (sales)</pre></td></tr>
<tr><td>10</td><td>Transactional Databases are used for processing of real-time / data for day-to-day operations.</td><td>transactional, data warehouse, OLTP, OLAP, operation, where, BASE</td><td><pre>Transactional Databases are used for processing of real-time
Read and write data quickly while maintaining data integrity.
Data Warehouse system would likely capture all of the day-to-day transactions
suggestions for different times of the year.</pre></td><td><pre>Transactional Databases are used for processing of real-time
data for day-to-day operations.
Read and write data quickly while maintaining data integrity.
Most databases used by organizations would fit this category. (Designed and
optimized to record data) Online transaction process (OLTP)

Data Warehouse system would likely capture all of the day-to-day transactions
and would contain additional information that has been processed/analyzed.
(Designed to perform data analysis questions) Online analytical processing
(OLAP)

e.g. Think of Amazon’s website where it would provide suggestions such as
“Consider buying the following packages”, “People who looked at this item
ultimately purchased this item”. It could also allow a manager to make price
suggestions for different times of the year.</pre></td></tr>
<tr><td>11</td><td>Options to a Paper-Based System / Consider the following scenario:</td><td>paper-based, sum, BASE</td><td><pre>None explicit</pre></td><td><pre>Options to a Paper-Based System
Consider the following scenario:

You are asked to help digitize a set of medical records at a small medical clinic.

Assume that currently the medical clinic keeps one folder for each patient.
Each time that patient visits, the medical file is obtained from the storage room
and a new piece of paper is attached to the file describing what happened
during the current visit.</pre></td></tr>
<tr><td>12</td><td>Title / visual-only slide</td><td>None explicit</td><td><pre>None explicit</pre></td><td><pre>[No selectable text extracted on this slide. Visual/title content may exist in the original PDF.]</pre></td></tr>
<tr><td>13</td><td>Paper System / • Each time a new patient arrives, a new folder is</td><td>None explicit</td><td><pre>None explicit</pre></td><td><pre>Paper System

• Each time a new patient arrives, a new folder is
  prepared.

• The folder is provided to the doctor who adds a
  paper record to the folder.

• At the end of the visit, the folder is stored in the
  records department.</pre></td></tr>
<tr><td>14</td><td>The obvious limitations of this approach are: / • Physical storage of files increases over time (usually the law</td><td>physical, backup, find</td><td><pre>• While it is possible to find the full history of a single patient, it is</pre></td><td><pre>The obvious limitations of this approach are:
• Physical storage of files increases over time (usually the law
  requires to maintain records for a certain number of years)
• Each visit requires visiting the records department to find the file.
• If a patient visits frequently, that one file could become large.
• While it is possible to find the full history of a single patient, it is
  not possible to ask questions like “Give me a list of all the patients
  who have been prescribed a certain antiboiotic medicine”.
• The privacy of the file is limited to the people who handle the file.
  Perhaps it is desirable that the nurse who obtains the file shouldn’t
  be able to look through the file.
• Other issues????
• Backups, damage to folder, misplaced, etc……</pre></td></tr>
<tr><td>15</td><td>Desktop Productivity Tools / • Option 1: Create a long Word document for each patient</td><td>product, document</td><td><pre>None explicit</pre></td><td><pre>Desktop Productivity Tools

• Option 1: Create a long Word document for each patient
  • Each time a patient visits, the document gets longer just like the paper
     folder

• Option 2: Create individual Word documents for each visit
  • Probably keep patient documents in a patient folder

• Option 3: Create an Excel workbook for each patient and separate
  worksheets for each visit</pre></td></tr>
<tr><td>16</td><td>Productivity tools are okay for simple documents that are / more or less “one offs” where you need to enter data in</td><td>paper-based, physical, product, where, min, BASE, document</td><td><pre>Text is okay to read but not that useful for retrieving
The only thing that we benefit from compared to the</pre></td><td><pre>Productivity tools are okay for simple documents that are
more or less “one offs” where you need to enter data in
free form.

MS Word suffers from problems that you are storing text,
not information.

Text is okay to read but not that useful for retrieving
information.

The only thing that we benefit from compared to the
paper-based system is that the storage stops becoming
physical and instead becomes digital (a single hard
drive takes a lot less space than a room full of folders).</pre></td></tr>
<tr><td>17</td><td>Excel mimics a database because it is possible to store / specific data in specific cells.</td><td>BASE, consistent</td><td><pre>Excel mimics a database because it is possible to store
However, unless you spend a lot of time to protect data, the
record the age of one person in days while another person</pre></td><td><pre>Excel mimics a database because it is possible to store
specific data in specific cells.
However, unless you spend a lot of time to protect data, the
data undergoes very little validation. Somebody could
record the age of one person in days while another person
records it in decimal years.

Consolidating data for analysis remains impossible to do.
It also makes it impossible to produce consistent reports
across multiple patients.
It all depends on how careful the spreadsheet designer
was.</pre></td></tr>
<tr><td>18</td><td>Customized Software / • Computer programs can store data in a variety of formats:</td><td>JSON, variety, consistent</td><td><pre>None explicit</pre></td><td><pre>Customized Software

• Computer programs can store data in a variety of formats:
   • CSV, XML, JSON, fixed width binary, etc.

• By creating customized software we ensure that data is consistently
  recorded in the same way.

• We can guarantee that we can run the reports that we want.</pre></td></tr>
<tr><td>19</td><td>The problem with cusomized software is the cost of developing / programs and limitations of what that program does.</td><td>SQL</td><td><pre>While we can ask D2L how long a student took to write a Quiz, we cannot ask
queries (SQL), you can ask questions that the D2L designers haven’t
thought about but might still be something that you are interested in.</pre></td><td><pre>The problem with cusomized software is the cost of developing
programs and limitations of what that program does.

Consider D2L…



While we can ask D2L how long a student took to write a Quiz, we cannot ask
the questions “How many final exams during Spring had more than 50% of the
students finish in less than one hour”
or even
“How many final exams used only multiple-choice questions?”

When you have access to the raw data and can write the customized
queries (SQL), you can ask questions that the D2L designers haven’t
thought about but might still be something that you are interested in.</pre></td></tr>
<tr><td>20</td><td>DBMS System</td><td>None explicit</td><td><pre>None explicit</pre></td><td><pre>DBMS System</pre></td></tr>
<tr><td>21</td><td>DBMS System</td><td>None explicit</td><td><pre>None explicit</pre></td><td><pre>DBMS System</pre></td></tr>
<tr><td>22</td><td>DBMS System</td><td>None explicit</td><td><pre>None explicit</pre></td><td><pre>DBMS System</pre></td></tr>
<tr><td>23</td><td>DBMS System</td><td>None explicit</td><td><pre>None explicit</pre></td><td><pre>DBMS System</pre></td></tr>
<tr><td>24</td><td>DBMS System</td><td>None explicit</td><td><pre>None explicit</pre></td><td><pre>DBMS System</pre></td></tr>
<tr><td>25</td><td>DBMS System</td><td>None explicit</td><td><pre>None explicit</pre></td><td><pre>DBMS System</pre></td></tr>
<tr><td>26</td><td>DBMS System</td><td>None explicit</td><td><pre>None explicit</pre></td><td><pre>DBMS System</pre></td></tr>
<tr><td>27</td><td>DBMS System</td><td>None explicit</td><td><pre>None explicit</pre></td><td><pre>DBMS System</pre></td></tr>
<tr><td>28</td><td>Database Models / • Relational Database</td><td>relational, SQL, MySQL, MongoDB, value, BASE</td><td><pre>None explicit</pre></td><td><pre>Database Models

• Relational Database
   • Everything is stored in tables
   • Flexible retrieval mechanism
   • Most of the course using MySQL www.mysql.com

• Key-Value Stores
   • Each record is freeform containing anything
   • Given a key, the system will return the value
   • Final part of course using MongoDB www.mongodb.com</pre></td></tr>
</tbody>
</table>

## 2. L1.3 Data Models

Pages: 9.

<table>
<thead><tr><th>Page</th><th>Slide focus / heading</th><th>Comparison anchors detected on this slide</th><th>Direct comparison / relationship lines from slide</th><th>Lossless extracted slide text</th></tr></thead>
<tbody>
<tr><td>1</td><td>Data Models</td><td>data model</td><td><pre>None explicit</pre></td><td><pre>Data Models



              www.udst.edu.qa</pre></td></tr>
<tr><td>2</td><td>What is a Data Model? / • It is a representation of a data structure</td><td>data model, conceptual, physical, abstraction, relationship, constraint, implementation, constraint, BASE</td><td><pre>None explicit</pre></td><td><pre>What is a Data Model?
• It is a representation of a data structure
   • How data will be stored in your database
   • A data model provides the necessary means to achieve abstraction
   • By ‘structure’ of a database we mean the data types, relationships, and
       constraints that apply to the data
   • By ‘abstraction’ we mean the ‘idea’ as to what something looks like; or a
       simplified text representation
• There are three main categories:
   • High-level or conceptual data models (based on entities and
       relationships)
   • Low-level or physical data models
   • Representational or implementation data models (record-based, object-
       oriented)</pre></td></tr>
<tr><td>3</td><td>What is a Data Model?</td><td>data model</td><td><pre>None explicit</pre></td><td><pre>What is a Data Model?</pre></td></tr>
<tr><td>4</td><td>Design is Iterative / • Rarely will you design a data model in a single pass, it requires</td><td>data model, min</td><td><pre>None explicit</pre></td><td><pre>Design is Iterative

• Rarely will you design a data model in a single pass, it requires
  taking well-educated guesses, asking questions and sometimes
  undoing what you just did.

• Don’t expect to get a good model with only a few minutes of work!

• Taking shortcuts when designing the model will lead to many
  problems later when implementing.

• Multiple solutions will usually exist for each problem.
  • Just like in problem solving and programming</pre></td></tr>
<tr><td>5</td><td>Building Blocks in Modeling / • Attributes</td><td>attribute, entity, relationship, constraint, constraint</td><td><pre>None explicit</pre></td><td><pre>Building Blocks in Modeling

• Attributes
   • the details about an entity, such as a patient’s name
   • also called column, attributes define properties of a table

• Relationships
   • how the entities or tables are related to each other

• Constraints
   • Limits placed on the data

https://www.youtube.com/watch?v=y2DD8tAjM0E</pre></td></tr>
<tr><td>6</td><td>Business Rules / • Where the entities, attributes, relationships and constraints can be derived</td><td>attribute, relationship, constraint, business rules, constraint, where</td><td><pre>None explicit</pre></td><td><pre>Business Rules

• Where the entities, attributes, relationships and constraints can be derived

• They are descriptions of how the business works

• Obtained by talking with people in the business to understand how things
  work
   • Requirement gathering




Extracting business rules is essentially ”System Analysis and Design”
and often DB people are involved during this phase.</pre></td></tr>
<tr><td>7</td><td>Translation of Business Rules to Data Model / • Generally nouns in business will be an entity</td><td>data model, entity, relationship, constraint, business rules, constraint, BASE</td><td><pre>• Entities are also called table, or relation
• Verbs associating nouns will be a relationship</pre></td><td><pre>Translation of Business Rules to Data Model

• Generally nouns in business will be an entity
  • Entities are also called table, or relation
  • Entity names should always be singular
       • Example: a table that will hold students’ names and address would be called
         student


• Verbs associating nouns will be a relationship
   • A doctor HAS several patients

• Constraints are limitations
   • The traffic department database probably has an age limit so drivers
     cannot be younger than 16, and probably no older than 85</pre></td></tr>
<tr><td>8</td><td>Evolution of Data Models</td><td>data model</td><td><pre>None explicit</pre></td><td><pre>Evolution of Data Models</pre></td></tr>
<tr><td>9</td><td>Evolution of Data Models / • Although 3rd generation models might seem sort of old (they have</td><td>NoSQL, SQL, MongoDB, data model, JSON, BASE</td><td><pre>• The “next generation” however seems to be gaining traction in the
classification called ‘noSQL’.... the table mentions XML but JSON is</pre></td><td><pre>Evolution of Data Models

• Although 3rd generation models might seem sort of old (they have
  been around for 50 years) they are still one of the most commonly
  used models.

• The 4th generation object-oriented databases really never caught on.

• The “next generation” however seems to be gaining traction in the
  classification called ‘noSQL’.... the table mentions XML but JSON is
  the more common storage technique, and we will see this in
  MongoDB later in this course.</pre></td></tr>
</tbody>
</table>

## 3. L2.1 - Keys

Pages: 9.

<table>
<thead><tr><th>Page</th><th>Slide focus / heading</th><th>Comparison anchors detected on this slide</th><th>Direct comparison / relationship lines from slide</th><th>Lossless extracted slide text</th></tr></thead>
<tbody>
<tr><td>1</td><td>Entity Relationship Models</td><td>entity, relationship</td><td><pre>Entity Relationship Models</pre></td><td><pre>Entity Relationship Models



                             www.udst.edu.qa</pre></td></tr>
<tr><td>2</td><td>Textbook Sections / The material from this slide show is covered in the textbook in sections:</td><td>logical, view</td><td><pre>None explicit</pre></td><td><pre>Textbook Sections

The material from this slide show is covered in the textbook in sections:
• 3.1 A Logical View of Data
• 3.2 Keys
• 3.3 Integrity Rules</pre></td></tr>
<tr><td>3</td><td>Tables (aka Entity or Relation)</td><td>entity</td><td><pre>Tables (aka Entity or Relation)</pre></td><td><pre>Tables (aka Entity or Relation)</pre></td></tr>
<tr><td>4</td><td>Keys / • One or more attributes that uniquely identify a single row</td><td>attribute, unique, min, unique</td><td><pre>• The name of the patient, however, does not determine the QID!</pre></td><td><pre>Keys

• One or more attributes that uniquely identify a single row

• Another way:
   • One or more attributes that identify other attributes
                                                   QID     f_name address   city     phone
• The role of the key is determinism:              2991240 Ali    This St   Doha     55563

   • A determines B                              3023001 Iman L. That St    Lusail   55598

   • The QID determines the name of the patient 3012347 Ali      Other St   Wakra    55541

   • The name of the patient, however, does not determine the QID!
   • Written: qid → name, dob, address</pre></td></tr>
<tr><td>5</td><td>Functional Dependence / • B is functionaly dependent on A if A determines B</td><td>min</td><td><pre>• A phone number does not determine the patient name because it is</pre></td><td><pre>Functional Dependence

• B is functionaly dependent on A if A determines B

• Example:
   • A patient ID determines the name, DoB and contact information for a
     patient

   • A phone number does not determine the patient name because it is
     possible that two people (often a child) shares the same phone
     number at the medical clinic
           pid       QID     f_name    address      dob      phone
        4356      2991240   Ali       This St    15/01/1999 55563
        543342    3023001   Iman L.   That St    20/12/2002 55598
        45452     3012347   Ali       Other St   01/01/2001 55541
        5432532   3211242   Mona      This St    01/04/2021 55563</pre></td></tr>
<tr><td>6</td><td>Composite Keys / • A key that comprises of multiple columns</td><td>composite key, unique, min, unique</td><td><pre>None explicit</pre></td><td><pre>Composite Keys

• A key that comprises of multiple columns
• Sometimes needed to uniquely identify a row
• Example student grade in a course
   • student_id,course_number,semester → grade
• A second way to think of it, is unique combinations
   • A student cannot be enrolled in the same course twice in the same
     semester.
   • To determine a grade, you need to know the student, the course and
     the semester.</pre></td></tr>
<tr><td>7</td><td>Relational Schema / • Textual representation of a table</td><td>relational, attribute, product</td><td><pre>• Name of relation (table) comes first</pre></td><td><pre>Relational Schema

•   Textual representation of a table
•   Name of relation (table) comes first
•   Attributes are listed in parentheses
•   Key fields are underlined and usually bold to make them stand out

VENDOR (VEND_CODE, VEND_CONTACT, VEND_AREACODE, VEND_PHONE)
PRODUCT (PROD_CODE, PROD_DESCRIPT, PROD_PRICE, PROD_ON_HAND, VEND_CODE)</pre></td></tr>
<tr><td>8</td><td>Foreign Keys / • Attribute that matches the primary key in a related table</td><td>attribute, primary key, foreign key, product</td><td><pre>None explicit</pre></td><td><pre>Foreign Keys

• Attribute that matches the primary key in a related table

VENDOR (VEND_CODE, VEND_CONTACT, VEND_AREACODE, VEND_PHONE)
PRODUCT (PROD_CODE, PROD_DESCRIPT, PROD_PRICE, PROD_ON_HAND,
VEND_CODE)</pre></td></tr>
<tr><td>9</td><td>Secondary Keys / • Any key that is used for data retrieval</td><td>unique, unique</td><td><pre>None explicit</pre></td><td><pre>Secondary Keys

• Any key that is used for data retrieval
• Most common secondary key in Qatar is your phone number
   • Not necessarily unique (some children will use their parent&#x27;s number)
   • The numbers change over time as people leave and new people arrive
   • Using a secondary key reduces the size of the search list to usually a
     few people
• Watch these videos:
   • https://www.youtube.com/watch?v=kG5edDFilhw
   • https://www.youtube.com/watch?v=xzVWLfZrnvM
   • https://www.youtube.com/watch?v=5Rd2atcDR4s</pre></td></tr>
</tbody>
</table>

## 4. L2.2 - Relationships

Pages: 10.

<table>
<thead><tr><th>Page</th><th>Slide focus / heading</th><th>Comparison anchors detected on this slide</th><th>Direct comparison / relationship lines from slide</th><th>Lossless extracted slide text</th></tr></thead>
<tbody>
<tr><td>1</td><td>Relationships in Relation / Modeling</td><td>relationship</td><td><pre>Relationships in Relation</pre></td><td><pre>Relationships in Relation
       Modeling


                            www.udst.edu.qa</pre></td></tr>
<tr><td>2</td><td>Textbook Sections / 3.5 Relationships within the Relational Database</td><td>relational, relationship, redundancy, BASE</td><td><pre>None explicit</pre></td><td><pre>Textbook Sections

3.5 Relationships within the Relational Database
3.6 Data Redundancy Revisited</pre></td></tr>
<tr><td>3</td><td>Relationships / • Association among entities</td><td>relationship</td><td><pre>• A relationship should be read in both directions:</pre></td><td><pre>Relationships

• Association among entities

• A relationship should be read in both directions:
   • “A student is enrolled in a course”
   • “A course has students enrolled in it”

                                   HAS

    student                                           course
                                    IS
                                 ENROLLED</pre></td></tr>
<tr><td>4</td><td>Cardinality / • 1:M (one-to-many)</td><td>relational, entity, 1:1, 1:M, M:N, cardinality, test, BASE, one-to-many</td><td><pre>Cardinality
• Most common relation in a relational model
• “A patient is subjected to multipe procedures/tests but each test is for</pre></td><td><pre>Cardinality

• 1:M (one-to-many)
   • Most common relation in a relational model
   • One entity is related to multiple entities
   • “A patient is subjected to multipe procedures/tests but each test is for
     a single patient”
• M:N (many-to-many)
   • Multiple items are related to multiple other items
   • “A patient is prescribed multiple medicines and a medicine is
     prescribed to multiple people
• 1:1 (one-to-one)
   • Single item related to a single item in the other table
   • Somewhat rare occurance in relational databases</pre></td></tr>
<tr><td>5</td><td>1:M (one-to-many)</td><td>1:M, one-to-many</td><td><pre>None explicit</pre></td><td><pre>1:M (one-to-many)</pre></td></tr>
<tr><td>6</td><td>1:1 (one-to-one)</td><td>1:1</td><td><pre>None explicit</pre></td><td><pre>1:1 (one-to-one)</pre></td></tr>
<tr><td>7</td><td>1:1</td><td>1:1</td><td><pre>None explicit</pre></td><td><pre>1:1</pre></td></tr>
<tr><td>8</td><td>1:1</td><td>1:1</td><td><pre>None explicit</pre></td><td><pre>1:1</pre></td></tr>
<tr><td>9</td><td>M:N</td><td>M:N</td><td><pre>None explicit</pre></td><td><pre>M:N</pre></td></tr>
<tr><td>10</td><td>M:N</td><td>M:N</td><td><pre>None explicit</pre></td><td><pre>M:N</pre></td></tr>
</tbody>
</table>

## 5. L2.3 - Relational Algebra

Pages: 11.

<table>
<thead><tr><th>Page</th><th>Slide focus / heading</th><th>Comparison anchors detected on this slide</th><th>Direct comparison / relationship lines from slide</th><th>Lossless extracted slide text</th></tr></thead>
<tbody>
<tr><td>1</td><td>Relational Algebra / (operations on relations)</td><td>relational, operation</td><td><pre>None explicit</pre></td><td><pre>Relational Algebra
(operations on relations)


                            www.udst.edu.qa</pre></td></tr>
<tr><td>2</td><td>Relational Algebra / • Less scary than it sounds</td><td>relational, SQL, project, union, intersect, difference, product, divide, join, operation, select</td><td><pre>SQL syntax
• Operators: select, project, join, intersect, union, difference, product, divide
• This course mainly focuses on: select, project, join</pre></td><td><pre>Relational Algebra

• Less scary than it sounds
• We want to understand the operations before we try to cover them with the
  SQL syntax
• Example: 3 + 4
   • 3 and 4 are the operands
   • + is the operator
• In relational algebra
   • Tables are the operands
   • Operators: select, project, join, intersect, union, difference, product, divide
   • This course mainly focuses on: select, project, join</pre></td></tr>
<tr><td>3</td><td>SELECT Operator / • List all rows from a table that satisfy some condition</td><td>select operator, select</td><td><pre>None explicit</pre></td><td><pre>SELECT Operator

• List all rows from a table that satisfy some condition</pre></td></tr>
<tr><td>4</td><td>PROJECT / • Selected attributes for a table</td><td>MongoDB, attribute, project, select</td><td><pre>None explicit</pre></td><td><pre>PROJECT

• Selected attributes for a table
• We will see this term in MongoDB later</pre></td></tr>
<tr><td>5</td><td>UNION / • All entries from both tables but no duplicates</td><td>union</td><td><pre>UNION
• All entries from both tables but no duplicates
• Tables must be union compatible</pre></td><td><pre>UNION

• All entries from both tables but no duplicates
• Tables must be union compatible</pre></td></tr>
<tr><td>6</td><td>INTERSECT / • Rows that are in common between both tables</td><td>intersect, find</td><td><pre>INTERSECT</pre></td><td><pre>INTERSECT

• Rows that are in common between both tables
• If the tables were of students enrolled in two classes, you could find
  out which students were enrolled in both classes</pre></td></tr>
<tr><td>7</td><td>DIFFERENCE / • Rows that appear in the first table but not the second table</td><td>difference, min</td><td><pre>DIFFERENCE
• Rows that appear in the first table but not the second table
difference could be used to determine which student was enrolled in
one course but not the other</pre></td><td><pre>DIFFERENCE

• Rows that appear in the first table but not the second table
• If the tables were of students enrolled in two classes then the
  difference could be used to determine which student was enrolled in
  one course but not the other</pre></td></tr>
<tr><td>8</td><td>PRODUCT / • All possible pairs of rows from the table including columns</td><td>product, cartesian</td><td><pre>None explicit</pre></td><td><pre>PRODUCT

• All possible pairs of rows from the table including columns
• Called the ‘cartesian product’ or ‘cross product’</pre></td></tr>
<tr><td>9</td><td>Inner Joins / • Only the rows where the primary key and foreign key match are</td><td>primary key, foreign key, join, where</td><td><pre>appointment inner join patient</pre></td><td><pre>Inner Joins

• Only the rows where the primary key and foreign key match are
  included.




                         appointment inner join patient</pre></td></tr>
<tr><td>10</td><td>Natural Joins / • Two tables joined together in a “natural” way</td><td>join</td><td><pre>• Special case of the inner join
appointment natural join patient</pre></td><td><pre>Natural Joins

• Two tables joined together in a “natural” way
• Special case of the inner join




                          appointment natural join patient</pre></td></tr>
<tr><td>11</td><td>Outer Joins / patient outer join appointment</td><td>join</td><td><pre>patient outer join appointment</pre></td><td><pre>Outer Joins




              patient outer join appointment</pre></td></tr>
</tbody>
</table>

## 6. L2.4 - Database Lifecycle

Pages: 9.

<table>
<thead><tr><th>Page</th><th>Slide focus / heading</th><th>Comparison anchors detected on this slide</th><th>Direct comparison / relationship lines from slide</th><th>Lossless extracted slide text</th></tr></thead>
<tbody>
<tr><td>1</td><td>Database Lifecycle</td><td>database lifecycle, BASE</td><td><pre>None explicit</pre></td><td><pre>Database Lifecycle



                     www.udst.edu.qa</pre></td></tr>
<tr><td>2</td><td>Relevant Textbook Sections / Section 10.3</td><td>None explicit</td><td><pre>None explicit</pre></td><td><pre>Relevant Textbook Sections

Section 10.3</pre></td></tr>
<tr><td>3</td><td>Overview</td><td>view</td><td><pre>None explicit</pre></td><td><pre>Overview</pre></td></tr>
<tr><td>4</td><td>Database Initial Study / • Analyze current situation</td><td>constraint, initial study, constraint, check, BASE</td><td><pre>None explicit</pre></td><td><pre>Database Initial Study

• Analyze current situation
   • What is the general operating environment, and what is its mission
     within that environment?
   • What is the organization’s structure?
• Define problems and constraints
   • How does the existing sytem operate? Check from multiple
     perspectives.
• Define objectives
   • Design the database to fix problems.
• Define scope and boundaries</pre></td></tr>
<tr><td>5</td><td>Database Design</td><td>database design, BASE</td><td><pre>None explicit</pre></td><td><pre>Database Design</pre></td></tr>
<tr><td>6</td><td>Implementation and Loading / • Install the DBMS</td><td>implementation, loading, BASE</td><td><pre>None explicit</pre></td><td><pre>Implementation and Loading

• Install the DBMS
• Create the database
• Load or Convert Data</pre></td></tr>
<tr><td>7</td><td>Test The Database / • Ensure that required data can be retreived.</td><td>test, security, performance, BASE</td><td><pre>None explicit</pre></td><td><pre>Test The Database

• Ensure that required data can be retreived.
• Make sure that performance is as expected.
• Make sure that security implemented.</pre></td></tr>
<tr><td>8</td><td>Operation / • While the system is being used, collect statistics about the operation.</td><td>operation</td><td><pre>• While the system is being used, collect statistics about the operation.</pre></td><td><pre>Operation

• While the system is being used, collect statistics about the operation.
• Are there things that could be improved?
• Are there things that require immediate patches?</pre></td></tr>
<tr><td>9</td><td>Maintenance / • Backups and recovery.</td><td>maintenance, backup, recovery, security</td><td><pre>None explicit</pre></td><td><pre>Maintenance

• Backups and recovery.
• Monitoring and enhancing slow responses.
• Security audits</pre></td></tr>
</tbody>
</table>

## 7. L2.5 - Conceptual Logical Physical Models

Pages: 11.

<table>
<thead><tr><th>Page</th><th>Slide focus / heading</th><th>Comparison anchors detected on this slide</th><th>Direct comparison / relationship lines from slide</th><th>Lossless extracted slide text</th></tr></thead>
<tbody>
<tr><td>1</td><td>Database Design Stages</td><td>database design, BASE</td><td><pre>None explicit</pre></td><td><pre>Database Design Stages



                         www.udst.edu.qa</pre></td></tr>
<tr><td>2</td><td>Why Abstraction Levels / • While you are designing the database, it is easier to start with more</td><td>conceptual, logical, physical, abstraction, BASE</td><td><pre>• While you are designing the database, it is easier to start with more</pre></td><td><pre>Why Abstraction Levels

• While you are designing the database, it is easier to start with more
  abstract levels, then work towards more details.
• Three Levels:
   • Conceptual model
   • Logical model
   • Physical model</pre></td></tr>
<tr><td>3</td><td>Different Definitions / • You will find that different people have different definitions of what</td><td>conceptual, logical, physical, attribute, entity, relationship, primary key, foreign key, find</td><td><pre>Different Definitions
• You will find that different people have different definitions of what</pre></td><td><pre>Different Definitions

• You will find that different people have different definitions of what
  goes into each model.
• We will follow the textbook descriptions.
 Feature                Conceptual   Logical   Physical
 Entity Names           Yes          Yes       Yes
 Entity Relationships   Yes          Yes       Yes
 Attributes                          Yes       Yes
 Primary Keys                        Yes       Yes
 Foreign Keys                        Yes       Yes
 Table Names                                   Yes
 Column Names                                  Yes
 Column Data Types                             Yes</pre></td></tr>
<tr><td>4</td><td>Conceptual Level / • The highest level of abstraction.</td><td>MongoDB, conceptual, abstraction, attribute, entity, relationship</td><td><pre>Relationship Diagrams (ERDs).
• Attributes can be left out at this level, but some people include</pre></td><td><pre>Conceptual Level

• The highest level of abstraction.
• Focuses on the high-level organization of data without concern
  for how the data will be stored or retrieved.
• Defines entities (things about which information is stored) and
  relationships (associations between entities) in a general way.
• Aims to be understandable by non-technical stakeholders.
• Tools often used for conceptual modeling include Entity-
  Relationship Diagrams (ERDs).
• Attributes can be left out at this level, but some people include
  them without types.
• Even if we were using MongoDB, this model should still be valid.</pre></td></tr>
<tr><td>5</td><td>Conceptual Model</td><td>conceptual</td><td><pre>None explicit</pre></td><td><pre>Conceptual Model</pre></td></tr>
<tr><td>6</td><td>Logical Model / • A more detailed exploration that includes specifics about the</td><td>conceptual, logical, attribute, relationship, primary key, foreign key, unique, BASE, unique</td><td><pre>None explicit</pre></td><td><pre>Logical Model

• A more detailed exploration that includes specifics about the
  structure of the data without being tied to a particular database
  management system (DBMS).
• Expands on the conceptual model to include attributes (data we
  record about entities), primary keys (unique identifiers), and
  foreign keys (identifiers that establish relationships).
• Resolve many-to-many relationships using bridging tables.
• Still somewhat abstract, as it doesn&#x27;t get into specifics about how
  the data will be stored in the database.
• We usually do not worry about the types of attributes at this
  stage.</pre></td></tr>
<tr><td>7</td><td>Example of a Logical Model Here!</td><td>logical</td><td><pre>None explicit</pre></td><td><pre>Example of a Logical Model Here!</pre></td></tr>
<tr><td>8</td><td>Physical Model / • The most detailed level of database design, specifying exactly</td><td>logical, physical, relationship, constraint, database design, constraint, where, index, performance, BASE</td><td><pre>and relationships defined in the logical model, but tailored to the
different drives (SSD vs Mechanical Hard drives); this would be</pre></td><td><pre>Physical Model

• The most detailed level of database design, specifying exactly
  how data will be stored in the database.
• Includes all tables, columns, data types, constraints, indexes,
  and relationships defined in the logical model, but tailored to the
  specifics of the chosen DBMS.
• This is where performance considerations, storage details, and
  access methods are defined.
• Some database systems include the ability to store data in
  different drives (SSD vs Mechanical Hard drives); this would be
  decided here.</pre></td></tr>
<tr><td>9</td><td>MySQL Workbench Limitations / • Workbench is Physical Modeling</td><td>SQL, MySQL, physical, primary key, bridge table, Workbench</td><td><pre>None explicit</pre></td><td><pre>MySQL Workbench Limitations

• Workbench is Physical Modeling
• N:M relations are always resolved as a bridge table automatically
• You cannot create relations in Workbench unless the tables have
  primary keys</pre></td></tr>
<tr><td>10</td><td>MySQL Symbols / • Yellow key: attribute is a primary key.</td><td>SQL, MySQL, attribute, primary key, foreign key, mandatory, optional, not null</td><td><pre>None explicit</pre></td><td><pre>MySQL Symbols

•   Yellow key: attribute is a primary key.
•   Red key: attribute is a foreign key and part of the primary key.
•   Blue diamond: mandatory column (not null)
•   Open blue diamond: optional column
•   Red diamond: mandatory foreign key (not null)
•   Open red diamond: optional foreign key</pre></td></tr>
<tr><td>11</td><td>Relationship Participation / • A patient can have 0 or more appointments</td><td>relationship, min</td><td><pre>Relationship Participation
The relationship says that a patient could have many appointments (including zero)
but each appointment is for a single patient.</pre></td><td><pre>Relationship Participation
• A patient can have 0 or more appointments
• An appointment must have 1 doctor




The | and O in the line end indicates the minimum number.
The relationship says that a patient could have many appointments (including zero)
but each appointment is for a single patient.</pre></td></tr>
</tbody>
</table>

## 8. L2.6 - Mapping ER to Relational Tables

Pages: 8.

<table>
<thead><tr><th>Page</th><th>Slide focus / heading</th><th>Comparison anchors detected on this slide</th><th>Direct comparison / relationship lines from slide</th><th>Lossless extracted slide text</th></tr></thead>
<tbody>
<tr><td>1</td><td>Mapping Relations from / Conceptual to Logical Model</td><td>conceptual, logical</td><td><pre>Mapping Relations from</pre></td><td><pre>Mapping Relations from
Conceptual to Logical Model

                              www.udst.edu.qa</pre></td></tr>
<tr><td>2</td><td>Simple Example / • Students can enroll in courses.</td><td>primary key</td><td><pre>None explicit</pre></td><td><pre>Simple Example

•   Students can enroll in courses.
•   Each course has one instructor.
•   Each instructor belongs to a department.
•   The only primary key shown in the student_id.</pre></td></tr>
<tr><td>3</td><td>Implement 1:M Relationships / • The foreign key goes into the “many” side of the relationship.</td><td>physical, entity, relationship, constraint, foreign key, mandatory, optional, 1:M, constraint</td><td><pre>• The foreign key goes into the “many” side of the relationship.
• The foreign key might be optional or mandatory but this is really a</pre></td><td><pre>Implement 1:M Relationships

• The foreign key goes into the “many” side of the relationship.
• In our example there are many instructors in each department. The
  foreign key goes into the Instructor entity.
• The foreign key might be optional or mandatory but this is really a
  constraint on the physical model later.</pre></td></tr>
<tr><td>4</td><td>Implement M:N Relationships / • Create a bridge table with all the primary keys from both tables.</td><td>relationship, primary key, foreign key, M:N, bridge table, identifying relationship, BASE</td><td><pre>This creates an identifying relationship.
• Pick an appropriate name for the bridge table based on the relation.</pre></td><td><pre>Implement M:N Relationships

• Create a bridge table with all the primary keys from both tables.
• All the keys will be both primary and foreign keys in the new table.
  This creates an identifying relationship.
• Add any additonal relationships as required by the problem. Wether
  or not these are primary or foreign keys depends on the problem.
• Pick an appropriate name for the bridge table based on the relation.</pre></td></tr>
<tr><td>5</td><td>Implement 1:1 Relationships / • If both sides are mandatory and not part of another relationship then</td><td>entity, relationship, mandatory, 1:1, normalization</td><td><pre>• If both sides are mandatory and not part of another relationship then
• Be careful because you might be introducing transitive</pre></td><td><pre>Implement 1:1 Relationships

• If both sides are mandatory and not part of another relationship then
  you might be able to combine them into a single entity.
• Be careful because you might be introducing transitive
  dependencies (see next section on normalization).</pre></td></tr>
<tr><td>6</td><td>Implement 1:1 Relationships / • If one side is optional, then you can put the foreign key in that entity.</td><td>entity, relationship, foreign key, optional, 1:1</td><td><pre>• If we decide that each instructor must have an office (but an office
• If we decide that each office must have an instructor (but an</pre></td><td><pre>Implement 1:1 Relationships

• If one side is optional, then you can put the foreign key in that entity.
• If we decide that each instructor must have an office (but an office
  could be unassigned) then we put the foreign key into the instructor
  entity.
• If we decide that each office must have an instructor (but an
  instructor might not have an office) then we place the foreign key
  into the office entity.
• If both are optional, then as a DB designer, you get to pick.</pre></td></tr>
<tr><td>7</td><td>Non-optional 1:1 / • If both sides are mandatory (each instructor must have an office and</td><td>relationship, mandatory, optional, 1:1</td><td><pre>None explicit</pre></td><td><pre>Non-optional 1:1

• If both sides are mandatory (each instructor must have an office and
  each office must have an instructor) then we actually need two 1:1
  relationships.</pre></td></tr>
<tr><td>8</td><td>Logical to Physical (Workbench) / • Each entity is a table</td><td>logical, physical, attribute, entity, constraint, business rules, constraint, Workbench</td><td><pre>None explicit</pre></td><td><pre>Logical to Physical (Workbench)

• Each entity is a table
   • Adjust the name as required (snake_case_is_common)
• Each attribute is a column
   • Use snake_case
   • Assign types and sizes
   • Apply constraints (from the business rules)</pre></td></tr>
</tbody>
</table>

## 9. L4.1 - DDL

Pages: 8.

<table>
<thead><tr><th>Page</th><th>Slide focus / heading</th><th>Comparison anchors detected on this slide</th><th>Direct comparison / relationship lines from slide</th><th>Lossless extracted slide text</th></tr></thead>
<tbody>
<tr><td>1</td><td>Table Creation, Delete / and Constraints</td><td>constraint, constraint, delete</td><td><pre>None explicit</pre></td><td><pre>Table Creation, Delete
   and Constraints


                         www.udst.edu.qa</pre></td></tr>
<tr><td>2</td><td>Major Data Types in MySQL / • Numeric:</td><td>SQL, MySQL</td><td><pre>None explicit</pre></td><td><pre>Major Data Types in MySQL

• Numeric:
   • integer (int), decimal
• Character:
   • char(n), varchar(n)
• Date:
   • date
   • datetime
• Text
• BLOB
• Others (xml, geographical information systems, etc)</pre></td></tr>
<tr><td>3</td><td>Text Fields / • varchar(n)</td><td>SQL, MySQL, count, BASE</td><td><pre>None explicit</pre></td><td><pre>Text Fields

• varchar(n)
   • Good for most short strings
   • n &lt;= 65535
• char(n)
   • Useful if you know all data will be n characters
   • Might be slightly faster on some database systems
• text
   • The data is not kept directly in the table


MySQL limits 65,535 bytes per row. Char() and varchar() types count
towards that limit. Text only counts as 9-12 bytes.</pre></td></tr>
<tr><td>4</td><td>Table Creation / • The format is flexible but best if you can put each attribute on a</td><td>attribute</td><td><pre>• The format is flexible but best if you can put each attribute on a</pre></td><td><pre>Table Creation

• The format is flexible but best if you can put each attribute on a
  separate line and use indentation to make it easier to read and spot
  errors




https://www.youtube.com/watch?v=XfrgCK6BX5w</pre></td></tr>
<tr><td>5</td><td>Table Deletion / • You cannot delete a table that isn’t there!</td><td>constraint, foreign key, constraint, delete</td><td><pre>None explicit</pre></td><td><pre>Table Deletion

• You cannot delete a table that isn’t there!
• You cannot delete a table with foreign keys unless the related table
  is deleted first; or the constraint is removed.</pre></td></tr>
<tr><td>6</td><td>Constraints / • Not Null</td><td>constraint, primary key, foreign key, constraint, not null, unique, check, default, unique</td><td><pre>None explicit</pre></td><td><pre>Constraints

•   Not Null
•   Unique
•   Default
•   Check
•   Primary Key
•   Foreign Key




https://www.youtube.com/watch?v=620DzFVz41o</pre></td></tr>
<tr><td>7</td><td>Foreign Key / The named constraints are particularly useful for later when you are trying to change or</td><td>SQL, MySQL, Oracle, constraint, primary key, foreign key, constraint, alter table</td><td><pre>Named primary key is not used in MySQL but other systems such as Oracle SQL does</pre></td><td><pre>Foreign Key




The named constraints are particularly useful for later when you are trying to change or
remove them later using the ”alter table”.

Named primary key is not used in MySQL but other systems such as Oracle SQL does
support it.
https://www.youtube.com/watch?v=rFssfx37UJw</pre></td></tr>
<tr><td>8</td><td>Check Constraints / • Allows you to put restrictions on the values.</td><td>constraint, constraint, check, insert, value</td><td><pre>None explicit</pre></td><td><pre>Check Constraints

• Allows you to put restrictions on the values.
• The check is done each time that you attempt to insert or to modify a
  data value. If the check fails, the data modification is not done.
• Can perform basic things like =, !=, &lt;, &gt;, etc.
• Maybe you want your patients recorded temperatures to be in the
  range of 30 to 50 degrees.




https://www.youtube.com/watch?v=EeG2boJCXbc</pre></td></tr>
</tbody>
</table>

## 10. L4.2 - Inserting and Basic Select

Pages: 14.

<table>
<thead><tr><th>Page</th><th>Slide focus / heading</th><th>Comparison anchors detected on this slide</th><th>Direct comparison / relationship lines from slide</th><th>Lossless extracted slide text</th></tr></thead>
<tbody>
<tr><td>1</td><td>Inserting and Selecting Data</td><td>insert, select</td><td><pre>None explicit</pre></td><td><pre>Inserting and Selecting Data



                               www.udst.edu.qa</pre></td></tr>
<tr><td>2</td><td>DESCRIBE (DESC) Command / DESCRIBE tablename;</td><td>default</td><td><pre>None explicit</pre></td><td><pre>DESCRIBE (DESC) Command

DESCRIBE tablename;

• desc or describe command
• shows the structure of table
  • Name of the column
  • Data-type of column
  • Nullability
  • Key
  • DEFAULT
  • Extra</pre></td></tr>
<tr><td>3</td><td>Title / visual-only slide</td><td>None explicit</td><td><pre>None explicit</pre></td><td><pre>[No selectable text extracted on this slide. Visual/title content may exist in the original PDF.]</pre></td></tr>
<tr><td>4</td><td>Transactions / DML (Data Manipulation Language)</td><td>DML, insert, select, update, delete, commit, BASE</td><td><pre>None explicit</pre></td><td><pre>Transactions

DML (Data Manipulation Language)

  • SELECT

  • INSERT
  • UPDATE
  • DELETE
  Last 3 only appear to the current user until they have been committed to the
  database.</pre></td></tr>
<tr><td>5</td><td>Basic Insert Statement / MySQL (but not Oracle) allows for multiple values to be inserted.</td><td>SQL, MySQL, Oracle, insert, value</td><td><pre>MySQL (but not Oracle) allows for multiple values to be inserted.</pre></td><td><pre>Basic Insert Statement




MySQL (but not Oracle) allows for multiple values to be inserted.




 https://www.youtube.com/watch?v=Cxilfg-M158</pre></td></tr>
<tr><td>6</td><td>Missing Values / • List the columns you want to provide and leave out any that you want the default</td><td>constraint, constraint, not null, default, insert, value</td><td><pre>None explicit</pre></td><td><pre>Missing Values

• List the columns you want to provide and leave out any that you want the default
  value used.
• You can list the columns in any order.
• You cannot leave out any columns with the ‘not null’ constraint.




 Columns without a ‘not null’ constraint can be omitted during inserts.

 You must list the column names in the order you want to insert (pick any order)...
 missing values will be set as NULL unless there is a default constraint.</pre></td></tr>
<tr><td>7</td><td>TCL – (Transaction Control Language) / • The standard MySQL installation has autocommit turned on.</td><td>SQL, MySQL, TCL, commit, rollback, Workbench</td><td><pre>None explicit</pre></td><td><pre>TCL – (Transaction Control Language)
• The standard MySQL installation has autocommit turned on.
   • MySQL workbench runs in “autocommit mode”

• Autocommit can be turned off with:
   • start transaction; (MySQL)
   • buttons on MySQL workbench

• The command COMMIT; will make the changes visible to other users.
• The command ROLLBACK; will undo the changes.

• A lost connection will result in the same thing as a rollback.
• Changes in multiple tables will either be committed or rolled back.
https://www.youtube.com/watch?v=GOQVlrQohtM</pre></td></tr>
<tr><td>8</td><td>Selection (SELECT Statement) / select *</td><td>project, select, projection</td><td><pre>Remember: SELECTION vs PROJECTION</pre></td><td><pre>Selection (SELECT Statement)




                               select *
                               from medicine;

                     Remember: SELECTION vs PROJECTION
                     (Still formed from a “Select” statement)</pre></td></tr>
<tr><td>9</td><td>Conditional Restrictions (WHERE clause)</td><td>where</td><td><pre>None explicit</pre></td><td><pre>Conditional Restrictions (WHERE clause)




https://www.youtube.com/watch?v=kUDznItqKbI</pre></td></tr>
<tr><td>10</td><td>Date Comparisons and Arithmetic</td><td>None explicit</td><td><pre>None explicit</pre></td><td><pre>Date Comparisons and Arithmetic</pre></td></tr>
<tr><td>11</td><td>Logical Operators / • and</td><td>logical, test, select, where, logical operator</td><td><pre>None explicit</pre></td><td><pre>Logical Operators
• and
• or
• not

select * from student
where name=‘Test’ and gpa &lt; 3;

select * from student
where name=‘Test’ or gpa &lt; 3;
https://www.youtube.com/watch?v=lScJW5Qz_5k</pre></td></tr>
<tr><td>12</td><td>Special Operators / • between</td><td>not null, check, select, where</td><td><pre>• Can be used as “column between 4 and 10” instead of “column &gt;= 4 and
but you must use “column is null”</pre></td><td><pre>Special Operators
• between
   • Can be used as “column between 4 and 10” instead of “column &gt;= 4 and
      column &lt;= 10”
• is null
   • Need this to check if columns are null. You cannot use “column = null”
      but you must use “column is null”
• is not null
• in
   • Used for a list
   select * from student where id in (1234,1235, 2222)</pre></td></tr>
<tr><td>13</td><td>LIKE / • Used to match parts of strings</td><td>select, where</td><td><pre>None explicit</pre></td><td><pre>LIKE
• Used to match parts of strings
• % means any character(s)
    • select * from student where name like ‘m%’
        • Students with names that start with m

    • select * from student where name like ‘%m’
        • Students with names that end with m

    • select * from student where name like ‘%m%’
        • Students with names that contain m


https://www.youtube.com/watch?v=T11d2ScMtk8</pre></td></tr>
<tr><td>14</td><td>Sample Practice Sites / W3Schools</td><td>SQL, test</td><td><pre>https://www.w3schools.com/sql/
https://www.w3schools.com/sql/sql_quiz.asp
https://www.geeksforgeeks.org/sql-tutorial/
https://sql.practicetestgeeks.com/sql-cert-practice-test/</pre></td><td><pre>Sample Practice Sites

W3Schools
https://www.w3schools.com/sql/

https://www.w3schools.com/sql/sql_quiz.asp

Geeks for Geeks
https://www.geeksforgeeks.org/sql-tutorial/

https://sql.practicetestgeeks.com/sql-cert-practice-test/</pre></td></tr>
</tbody>
</table>

## 11. L4.3 - Updating and Deleting Data

Pages: 12.

<table>
<thead><tr><th>Page</th><th>Slide focus / heading</th><th>Comparison anchors detected on this slide</th><th>Direct comparison / relationship lines from slide</th><th>Lossless extracted slide text</th></tr></thead>
<tbody>
<tr><td>1</td><td>Inserting and Updating Data / Select Column Aliases</td><td>insert, select, alias</td><td><pre>None explicit</pre></td><td><pre>Inserting and Updating Data
   Select Column Aliases
      Output Ordering

                              www.udst.edu.qa</pre></td></tr>
<tr><td>2</td><td>Transactions / • By default MySQL connects using “autocommit” mode. Changes</td><td>SQL, MySQL, operation, default, commit, rollback, BASE</td><td><pre>• Helpful while learning because we can undo changes.</pre></td><td><pre>Transactions

• By default MySQL connects using “autocommit” mode. Changes
  happen immediately in the database.
• You can disable autocommit and then use these two commands:
   • commit – record the changes to the database
   • rollback – undo the changes
• The feature is used to change multiple tables in a single operation.
• Helpful while learning because we can undo changes.




https://www.youtube.com/watch?v=GOQVlrQohtM</pre></td></tr>
<tr><td>3</td><td>Updating Values / • Can update multiple columns with new values on any number of</td><td>update, value</td><td><pre>None explicit</pre></td><td><pre>Updating Values

• Can update multiple columns with new values on any number of
  rows.
• Danger! If you use the wrong filter you could accidentally update the
  entire table.</pre></td></tr>
<tr><td>4</td><td>Cascade Updates / • If you have a foreign key in a table and try to update the primary key</td><td>primary key, foreign key, create table, update, cascade update, BASE</td><td><pre>None explicit</pre></td><td><pre>Cascade Updates

• If you have a foreign key in a table and try to update the primary key
  of the other table, you will end up with a failure.
• If you include the phrase “on update cascade” on the create table
  statement you can get the database to automatically update the
  foreign keys.




https://www.youtube.com/watch?v=dWJy6ZZylf0</pre></td></tr>
<tr><td>5</td><td>Deleting Values / • Very similar to the update command.</td><td>relationship, constraint, foreign key, operation, constraint, update, delete, value</td><td><pre>• If row is not being used in a foreign key relationship, then no</pre></td><td><pre>Deleting Values

• Very similar to the update command.
• Specifying an incorrect condition could result in the deletion of
  everything.
• If row is not being used in a foreign key relationship, then no
  problem.
• Trying to delete a record on which a foreign key constraint exists will
  results in the operation failing.




https://www.youtube.com/watch?v=OB2leB2iZ6U</pre></td></tr>
<tr><td>6</td><td>Cascade Delete / • If you create a foreign key constraint with ‘on delete cascade’ then</td><td>constraint, foreign key, constraint, update, delete, cascade delete</td><td><pre>• Sounds useful but generally you probably don’t want it (keeping</pre></td><td><pre>Cascade Delete

• If you create a foreign key constraint with ‘on delete cascade’ then
  you can have child tables updated when parent rows are deleted.
• Sounds useful but generally you probably don’t want it (keeping
  history).




https://www.youtube.com/watch?v=vANfY96ccOY</pre></td></tr>
<tr><td>7</td><td>Select Column Aliases / • If you don’t like the name of the column in the result set, you can</td><td>select, alias, rename</td><td><pre>None explicit</pre></td><td><pre>Select Column Aliases

• If you don’t like the name of the column in the result set, you can
  rename them.
• Very handy if you need to perform some calculation on the column.</pre></td></tr>
<tr><td>8</td><td>Simple Ordering</td><td>None explicit</td><td><pre>None explicit</pre></td><td><pre>Simple Ordering




https://www.youtube.com/watch?v=R-5F3BF8IeY</pre></td></tr>
<tr><td>9</td><td>Ordering / • The select operation does not guarantee any order. Most times you</td><td>primary key, optional, operation, default, select, where, order by, sum</td><td><pre>get things ordered by primary key but there is no guarantee.</pre></td><td><pre>Ordering

• The select operation does not guarantee any order. Most times you
  get things ordered by primary key but there is no guarantee.
• If you want the output sorted you must use the “order by” clause.
• A “where” clause is optional to perform filtering before the ordering.
• Ordering output is a slow operation so only do it if you need to.
• ASC means ascending, DESC means descending. If you write
  nothing then ASC is assumed/default.
• The “order by” clause must come after the “where” clause.</pre></td></tr>
<tr><td>10</td><td>Example</td><td>None explicit</td><td><pre>None explicit</pre></td><td><pre>Example</pre></td></tr>
<tr><td>11</td><td>Ordering Multiple Columns / • If you have one column with all the same values (such as the price),</td><td>operation, value</td><td><pre>None explicit</pre></td><td><pre>Ordering Multiple Columns

• If you have one column with all the same values (such as the price),
  you may want to sort by a second column.

• You can mix and match ASC and DESC as you want.

• You can add as many columns to the ordering as you want.

• Ordering by multiple columns will also be a slow operation so best to
  avoid unless you need it.


https://www.youtube.com/watch?v=R-5F3BF8IeY</pre></td></tr>
<tr><td>12</td><td>Ordering on Multiple Columns</td><td>None explicit</td><td><pre>None explicit</pre></td><td><pre>Ordering on Multiple Columns</pre></td></tr>
</tbody>
</table>

## 12. L4.4 - Aggregate Functions

Pages: 10.

<table>
<thead><tr><th>Page</th><th>Slide focus / heading</th><th>Comparison anchors detected on this slide</th><th>Direct comparison / relationship lines from slide</th><th>Lossless extracted slide text</th></tr></thead>
<tbody>
<tr><td>1</td><td>Aggregate Functions and / Grouping</td><td>aggregate</td><td><pre>None explicit</pre></td><td><pre>Aggregate Functions and
       Grouping


                          www.udst.edu.qa</pre></td></tr>
<tr><td>2</td><td>Listing Distinct Column Values / • When you have a lot of similar data entries and you need to know all</td><td>distinct, value, BASE</td><td><pre>None explicit</pre></td><td><pre>Listing Distinct Column Values

• When you have a lot of similar data entries and you need to know all
   the possible values you can use the ‘distinct’ clause.
(the database is not well designed in the example...why?)</pre></td></tr>
<tr><td>3</td><td>Aggregate Functions / • SQL provides various mathematical functions to help summarize</td><td>SQL, aggregate, sum</td><td><pre>• SQL provides various mathematical functions to help summarize</pre></td><td><pre>Aggregate Functions

• SQL provides various mathematical functions to help summarize
  information found in tables.




https://www.youtube.com/watch?v=9HXJUGT-06w</pre></td></tr>
<tr><td>4</td><td>Count Function / • Can be used to count the number of rows in a table (or a selection of</td><td>select, where, count</td><td><pre>None explicit</pre></td><td><pre>Count Function
• Can be used to count the number of rows in a table (or a selection of
  a table)
• Can be used to count the number of non-null entries in a single
  column. Example in below right
• Can be used with where clauses to count occurences of certain
  things</pre></td></tr>
<tr><td>5</td><td>Min/Max/Avg / • Use to find the smallest value, the largest value, and the average</td><td>min, max, avg, value, find</td><td><pre>None explicit</pre></td><td><pre>Min/Max/Avg

• Use to find the smallest value, the largest value, and the average
  value of a column




https://www.youtube.com/watch?v=i5acg3Hvu6g</pre></td></tr>
<tr><td>6</td><td>Using Min/Max/Avg in Subquery / • Inner queries (red) are executed first</td><td>min, max, avg, subquery</td><td><pre>None explicit</pre></td><td><pre>Using Min/Max/Avg in Subquery

• Inner queries (red) are executed first
• The result of the inner query is then used in the outer query</pre></td></tr>
<tr><td>7</td><td>Sum / • Add up all the values of a single column</td><td>aggregate, sum, rename, value, find</td><td><pre>• The example table doesn’t make sense but we’ll add the</pre></td><td><pre>Sum

• Add up all the values of a single column
• The example table doesn’t make sense but we’ll add the
  regular_price column anyways as a demo
• Usually people will use the “as” clause to rename the column to be
  something more useful. If you use the aggregate functions in a
  program you will find that a normal name will be much better than
  ‘sum(regular_price)’</pre></td></tr>
<tr><td>8</td><td>Grouping Data / • The GROUP BY clause allows the aggregate functions to perform</td><td>aggregate, group by</td><td><pre>very useful analysis results but unfortunately it is a bit trickier to use
• Suppose we wanted to know how many different sizes are supplied</pre></td><td><pre>Grouping Data

• The GROUP BY clause allows the aggregate functions to perform
  very useful analysis results but unfortunately it is a bit trickier to use
  than the aggregate functions on their own
• Suppose we wanted to know how many different sizes are supplied
  by the items that start with ‘Ajax’
• The GROUP BY clause returns
  one row for each group. In other
  words, it reduces the number of
  rows in the result set




 https://www.youtube.com/watch?v=FztbYXeOEQ4</pre></td></tr>
<tr><td>9</td><td>GROUP BY / • MySQL evaluates the GROUP BY clause after the FROM and WHERE</td><td>SQL, MySQL, select, where, distinct, aggregate, count, min, max, avg, sum, group by, having</td><td><pre>None explicit</pre></td><td><pre>GROUP BY

• MySQL evaluates the GROUP BY clause after the FROM and WHERE
  clauses and before the HAVING, SELECT, DISTINCT, ORDER
  BY and LIMIT clauses



• In practice, you often use the GROUP BY clause with aggregate
  functions such as SUM, AVG, MAX, MIN, and COUNT

• The aggregate function that appears in the SELECT clause provides the
  information of each group</pre></td></tr>
<tr><td>10</td><td>Group By with Having / • The ”having” clause allows you to restrict the output of a “group by”</td><td>group by, having</td><td><pre>None explicit</pre></td><td><pre>Group By with Having

• The ”having” clause allows you to restrict the output of a “group by”
  clause</pre></td></tr>
</tbody>
</table>

## 13. L4.5 - Table Alteration

Pages: 6.

<table>
<thead><tr><th>Page</th><th>Slide focus / heading</th><th>Comparison anchors detected on this slide</th><th>Direct comparison / relationship lines from slide</th><th>Lossless extracted slide text</th></tr></thead>
<tbody>
<tr><td>1</td><td>Table Alterations / Set Operations</td><td>operation, set operations</td><td><pre>None explicit</pre></td><td><pre>Table Alterations
 Set Operations


                    www.udst.edu.qa</pre></td></tr>
<tr><td>2</td><td>Alter Table / • The alter table command is used to modify the table structure for</td><td>constraint, constraint, min, alter table</td><td><pre>• This is better than dropping the table and recreating because you</pre></td><td><pre>Alter Table

• The alter table command is used to modify the table structure for
  things like:
   • Renaming table or columns
   • Adding or removing columns
   • Chaging types of columns
   • Adding or removing constraints

• This is better than dropping the table and recreating because you
  may be able to preserve the original data

• Simple type changes will preserve the original columns</pre></td></tr>
<tr><td>3</td><td>Changing Column Types / alter table t change old_name new_name new_type;</td><td>SQL, MySQL, update, delete, alter table</td><td><pre>None explicit</pre></td><td><pre>Changing Column Types

alter table t change old_name new_name new_type;

• If you try to adjust the size of a varchar to be too small, MySQL will
  reject the change. If you needed to shorten a column, you will need
  to truncate the data first with an update.

• Trying to change from character to integer would require that you
  first delete the data or you could add a new column and apply some
  transformation before.</pre></td></tr>
<tr><td>4</td><td>Adding/Dropping Columns / alter table t add column new_name new_type;</td><td>constraint, constraint, default, alter table, add column, drop column, value</td><td><pre>None explicit</pre></td><td><pre>Adding/Dropping Columns

alter table t add column new_name new_type;
alter table t add column new_name new_type after other_column;

The column will be filled with null values. You can also set a default
constraint.

alter table t drop column column_name;

All values in the column will be lost.</pre></td></tr>
<tr><td>5</td><td>Adding/Removing Constraints / alter table tblname add</td><td>constraint, primary key, foreign key, referential integrity, constraint, alter table</td><td><pre>None explicit</pre></td><td><pre>Adding/Removing Constraints

alter table tblname add
   constraint pk_name primary key (column_id);
alter table tblname add
  constraint fk_name foreign key (column) references table(col);

alter table tblname drop constraint fk_name;
alter table tblname drop primary key;

When adding you must ensure that no referential integrity problems
exist. Fix them first, then you can alter the table.

https://www.youtube.com/watch?v=OAPM0fE80aY</pre></td></tr>
<tr><td>6</td><td>Set Operations / MySQL supports the Union operation but not the others listed below</td><td>SQL, MySQL, union, intersect, difference, operation, select, where, set operations</td><td><pre>MySQL supports the Union operation but not the others listed below
union
Intersect:
Difference:</pre></td><td><pre>Set Operations
MySQL supports the Union operation but not the others listed below

select name from patient
union
select name from doctor;


Intersect:
select name from patient
where name in (select name from doctor);


Difference:
select name from doctor
where name not in (select name from patient)
https://www.youtube.com/watch?v=su-fxrvKTCk</pre></td></tr>
</tbody>
</table>

## 14. L4.6 - Joins

Pages: 9.

<table>
<thead><tr><th>Page</th><th>Slide focus / heading</th><th>Comparison anchors detected on this slide</th><th>Direct comparison / relationship lines from slide</th><th>Lossless extracted slide text</th></tr></thead>
<tbody>
<tr><td>1</td><td>Joining Tables</td><td>join</td><td><pre>None explicit</pre></td><td><pre>Joining Tables



                 www.udst.edu.qa</pre></td></tr>
<tr><td>2</td><td>Joins / • The most imporant SQL operation in a relational database!</td><td>relational, SQL, normalization, join, operation, BASE</td><td><pre>• The most imporant SQL operation in a relational database!
• Sounds sort of like the opposite of normalization
• But, we use joins BECAUSE we have normalized</pre></td><td><pre>Joins

• The most imporant SQL operation in a relational database!

• Allows you to combine data from multiple tables to produce a single
  table containing a result.
   • Sounds sort of like the opposite of normalization
       • But, we use joins BECAUSE we have normalized


• The process does not modify the tables and/or data, it just presents
  the information from multiple tables as if they were in a single table.</pre></td></tr>
<tr><td>3</td><td>Joins</td><td>join</td><td><pre>None explicit</pre></td><td><pre>Joins</pre></td></tr>
<tr><td>4</td><td>Inner Joins / • Notice that there is a patient in the previous slide (id 400) who did</td><td>foreign key, join</td><td><pre>have an “inner join”.</pre></td><td><pre>Inner Joins

• Notice that there is a patient in the previous slide (id 400) who did
  not have an appointment and they did not appear in the joined result.

• When you only include rows for which there is a foreign key, you
  have an “inner join”.</pre></td></tr>
<tr><td>5</td><td>Join Syntax / • Most people leave out the word “inner”.</td><td>project, join, select, where, projection</td><td><pre>Join Syntax
• It is necessary to say which column you are joining on because the</pre></td><td><pre>Join Syntax

• Most people leave out the word “inner”.
• It is necessary to say which column you are joining on because the
  columns could be named differently in the other table.
• You can include projections and filters to limit columns and rows.




select * from appointment, patient where appointment.pid = patient.pid</pre></td></tr>
<tr><td>6</td><td>Natural Joins / • If you have 2 tables and the column names match, you can try the</td><td>Oracle, join, having</td><td><pre>“natural join” command.
different column names.</pre></td><td><pre>Natural Joins

• If you have 2 tables and the column names match, you can try the
  “natural join” command.
• Note that this does not work with 3 tables or tables that have
  different column names.
• Although handy for some cases, don’t get used to having it!
• The Oracle DB can use natural joins with multiple tables.</pre></td></tr>
<tr><td>7</td><td>Outer Join / • An outer join allows you to include all results from a table even if there are</td><td>join</td><td><pre>Outer Join
• An outer join allows you to include all results from a table even if there are
inner join.
• A join always has two tables that we would probably call “first” and
“second” but we will also refer to them as “left” and ”right”.</pre></td><td><pre>Outer Join

• An outer join allows you to include all results from a table even if there are
  no corresponding rows in the other table.

• Think about the problem of “show me all appointments for all patients”.
  The patient with 400 has no appointment so it doesn’t show up in the
  inner join.

• A join always has two tables that we would probably call “first” and
  “second” but we will also refer to them as “left” and ”right”.

• If there is no entry in the second table then the result set will contain ‘null’.

https://www.youtube.com/watch?v=G3lJAxg1cy8</pre></td></tr>
<tr><td>8</td><td>Outer Join Syntax / • The word “outer” is not mandatory and most people will leave it out.</td><td>mandatory, join</td><td><pre>Outer Join Syntax
• We could flip the order and use a “right join”.</pre></td><td><pre>Outer Join Syntax
• The word “outer” is not mandatory and most people will leave it out.
• The left table is patient and the right table is appointment.
• We could flip the order and use a “right join”.</pre></td></tr>
<tr><td>9</td><td>Joining Multiple Tables / • Add additional “join” clauses.</td><td>project, join, alias, projection</td><td><pre>• Add additional “join” clauses.</pre></td><td><pre>Joining Multiple Tables

• Add additional “join” clauses.
• Using a projection to limit the number of columns is helpful.
• Using aliases to change names is also helpful (i.e. there are two
  first_name columns... who is the doctor and who is the patient?




https://www.youtube.com/watch?v=pqPVIuzS0ZQ</pre></td></tr>
</tbody>
</table>

## 15. L4.7 - Auto Increment, Indexing

Pages: 10.

<table>
<thead><tr><th>Page</th><th>Slide focus / heading</th><th>Comparison anchors detected on this slide</th><th>Direct comparison / relationship lines from slide</th><th>Lossless extracted slide text</th></tr></thead>
<tbody>
<tr><td>1</td><td>Auto Increment / Indexes</td><td>index, performance</td><td><pre>None explicit</pre></td><td><pre>Auto Increment
      Indexes
Performance Analysis

                       www.udst.edu.qa</pre></td></tr>
<tr><td>2</td><td>auto_increment / • This is used for surrogate keys.</td><td>SQL, MySQL, primary key, surrogate key, alter table, auto_increment, value</td><td><pre>mySQL allow AI on any column, but still, only 1 AI per table.</pre></td><td><pre>auto_increment

• This is used for surrogate keys.
        • Artificial (surrogate) keys are the most common primary keys
• The value is continuously incremented and never goes back down.
• The value can be modified with:
   • alter table mytablename auto_increment=1002
• If you try to roll the auto_increment backwards it will be ignored!
• There is only one auto_increment allowed in a table and it must be
  the primary key.
   • this last half of the statement is no longer true. Newer versions of
      mySQL allow AI on any column, but still, only 1 AI per table.
• The next value is always one larger than the largest value in the table.
https://www.youtube.com/watch?v=ALht4W2QxqY</pre></td></tr>
<tr><td>3</td><td>A Sample Problem / • https://sit.cna-qatar.edu.qa/~robert/infs2201/</td><td>select, where, min, BASE, find</td><td><pre>None explicit</pre></td><td><pre>A Sample Problem

• https://sit.cna-qatar.edu.qa/~robert/infs2201/
• This small book repository has books with ID numbers between 0
  and 9. The problem is that it is very slow (around 4 seconds to get a
  single book).
• If you were asked to find the book for INFS1101 you would have to
  start by looking at record 0, then 1, etc until you finally found the
  book you were looking for.
• In programming we call this a linear search, and you must have seen
  it in your programming course(s).
• In a database we would be issuing a command like:
    • select * from book where course=&#x27;INFS1101&#x27;
    • We call this type of searching a “full table scan”</pre></td></tr>
<tr><td>4</td><td>Making the Solution Faster / • Take the time to build up a small table consisting of the course</td><td>where, sum, index, value, find</td><td><pre>• Why not include everything? Because the table could possibly be too</pre></td><td><pre>Making the Solution Faster
• Take the time to build up a small table consisting of the course
  number and the id number:
   course          id
   INFS2201        0
   INFS1201        1
   MATH1030        2

• This is called an index. It is a summary of where to find specific
  values. Just like the index at the end of a book.
• Why not include everything? Because the table could possibly be too
  big.
• We could even sort the index table alphabetically to make it faster to
  find the id of specific records.</pre></td></tr>
<tr><td>5</td><td>Finding Full Table Scans in MySQL / • If you don’t know you have a problem, you will not know it needs to</td><td>SQL, MySQL, find</td><td><pre>• Most patients’ records will be found by phone number because they</pre></td><td><pre>Finding Full Table Scans in MySQL
• If you don’t know you have a problem, you will not know it needs to
  be fixed.
• Consider the patient table from the medical clinic with a large
  number of patients.
• Most patients’ records will be found by phone number because they
  do not know the patient id.</pre></td></tr>
<tr><td>6</td><td>Explain / • The command “explain” can be put in front of any query to have the</td><td>difference, min, explain</td><td><pre>• Notice the difference between search on ID vs phone number.</pre></td><td><pre>Explain
• The command “explain” can be put in front of any query to have the
  server examine the query to suggest how it will be solved.
• Notice the difference between search on ID vs phone number.</pre></td></tr>
<tr><td>7</td><td>Explain Results / • The dangerous word is “ALL”</td><td>primary key, where, min, index, explain</td><td><pre>None explicit</pre></td><td><pre>Explain Results

• The dangerous word is “ALL”

•type: ALL - Performs a full table scan (worst case)
•possible_keys: NULL - No index available for phone column
•key: NULL - No index is used
•rows: 100 - Examines all 100 rows
•filtered: 10.00% - Only 10% match the condition
•Extra: Using where - Filtering after reading all rows


•type: const - Constant time lookup (best case)
•possible_keys: PRIMARY - Primary key index available
•key: PRIMARY - Uses primary key index
•rows: 1 - Examines only 1 row
•filtered: 100.00% - All examined rows match</pre></td></tr>
<tr><td>8</td><td>Adding Indexes</td><td>index</td><td><pre>None explicit</pre></td><td><pre>Adding Indexes




https://www.youtube.com/watch?v=t0grczCICMk</pre></td></tr>
<tr><td>9</td><td>Downsides to Indexes / • Indexes take space in the database so the database becomes</td><td>operation, insert, update, delete, index, BASE</td><td><pre>• Insert, update and delete operations take longer because the</pre></td><td><pre>Downsides to Indexes

• Indexes take space in the database so the database becomes
  larger.

• Insert, update and delete operations take longer because the
  indexes need to be updated.</pre></td></tr>
<tr><td>10</td><td>How To Spot Problematic Queries / • If you have a slow query, you need to review the “where” clause to</td><td>primary key, join, where, index, view, BASE</td><td><pre>• Make sure that you join tables based on the primary key!</pre></td><td><pre>How To Spot Problematic Queries

• If you have a slow query, you need to review the “where” clause to
  see which columns are being searched.

• Sorting is slow, so don’t do it unless you need to.

• Searching based on primary key is fast so no need for an index.

• Make sure that you join tables based on the primary key!
       • Where/when possible</pre></td></tr>
</tbody>
</table>

## 16. L4.9 - Sequences Views

Pages: 9.

<table>
<thead><tr><th>Page</th><th>Slide focus / heading</th><th>Comparison anchors detected on this slide</th><th>Direct comparison / relationship lines from slide</th><th>Lossless extracted slide text</th></tr></thead>
<tbody>
<tr><td>1</td><td>Sequences / Views</td><td>sequence, view</td><td><pre>None explicit</pre></td><td><pre>Sequences
  Views


            www.udst.edu.qa</pre></td></tr>
<tr><td>2</td><td>Sequences / • Not part of the course but mentioned because it is in the book and</td><td>SQL, Oracle, insert, having, sequence, value, BASE</td><td><pre>• Not part of the course but mentioned because it is in the book and
* In MS SQL server there are ”identities”:</pre></td><td><pre>Sequences

• Not part of the course but mentioned because it is in the book and
  you might end up with having to deal with such a database!
• In Oracle DB there are ”sequences”:
create sequence customer_seq start with 1000;
insert into customer values (customer_seq.nextval, ‘name’, etc);


* In MS SQL server there are ”identities”:</pre></td></tr>
<tr><td>3</td><td>Use the IDENTITY[(seed, increment)] property with the column to declare it as / an identity column in the CREATE TABLE or ALTER TABLE statements</td><td>SQL, entity, primary key, create table, not null, insert, min, alter table, value</td><td><pre>None explicit</pre></td><td><pre>Use the IDENTITY[(seed, increment)] property with the column to declare it as
an identity column in the CREATE TABLE or ALTER TABLE statements

An identity column differs from a primary key in that its values are managed by the server and usually cannot be
modified.
                   CREATE TABLE History (
                      ID int primary key IDENTITY(1,1) NOT NULL,
                      ...


CREATE TABLE new_employees
(
id_num int IDENTITY(1,1),
fname varchar (20),
minit char(1),
lname varchar(30)
);

INSERT new_employees (fname, minit, lname)
VALUES (&#x27;Karin&#x27;, &#x27;F&#x27;, &#x27;Josephs&#x27;);


                         https://www.tutorialsteacher.com/sqlserver/identity-column</pre></td></tr>
<tr><td>4</td><td>ORACLE: / CREATE SEQUENCE schema_name.sequence_name</td><td>Oracle, insert, min, max, sequence, value</td><td><pre>• sequence returns 10 once it reaches 100 because of the CYCLE</pre></td><td><pre>ORACLE:

CREATE SEQUENCE schema_name.sequence_name
[INCREMENT BY interval]
[START WITH first_number]                        The following statement creates an ascending sequence:
[MAXVALUE max_value | NOMAXVALUE]                • called id_seq,
[MINVALUE min_value | NOMINVALUE]                • starting from 10,
[CYCLE | NOCYCLE]                                • incrementing by 10,
[CACHE cache_size | NOCACHE]                     • minimum value 10,
[ORDER | NOORDER];                               • maximum value 100,
                                                 • sequence returns 10 once it reaches 100 because of the CYCLE

                                                         CREATE SEQUENCE id_seq
                                                           INCREMENT BY 10
                                                           START WITH 10
                                                           MINVALUE 10
          INSERT INTO sale_boat (id, name)                 MAXVALUE 100
          VALUES (id_seq.NEXTVAL, ‘My Boat’);              CYCLE
                                                           CACHE 2;



    https://www.oracletutorial.com/oracle-sequence/oracle-create-sequence/</pre></td></tr>
<tr><td>5</td><td>Views / • A virtual table based on a select.</td><td>security, select, view, BASE</td><td><pre>None explicit</pre></td><td><pre>Views

• A virtual table based on a select.

• Can be used to help to create “select” shortcuts.

• Can be used in conjunction with security settings to provide a
  restricted view of data.</pre></td></tr>
<tr><td>6</td><td>Security Scenario / • Suppose you needed to add a column to record if a patient has been</td><td>security, view</td><td><pre>able to see fields like the name, phone number but you don’t want</pre></td><td><pre>Security Scenario

• Suppose you needed to add a column to record if a patient has been
  previously infected with COVID. You need the reception staff to be
  able to see fields like the name, phone number but you don’t want
  them to see this extra field.
• We could create a view with less details.</pre></td></tr>
<tr><td>7</td><td>Views</td><td>view</td><td><pre>None explicit</pre></td><td><pre>Views




https://www.youtube.com/watch?v=wciubfRhvtM (6m)</pre></td></tr>
<tr><td>8</td><td>Complex Views / • Multiple tables and complex formulas can be created as a view.</td><td>view</td><td><pre>None explicit</pre></td><td><pre>Complex Views

• Multiple tables and complex formulas can be created as a view.
• Example: suppose we need a list to be printed about who is allowed
  to enter the medical clinic on a certain day.
• We can query just entry_list later.</pre></td></tr>
<tr><td>9</td><td>Updatable vs Non Updatable Views / If we consider the previous view we can easily update the data using</td><td>relationship, union, select, update, distinct, aggregate, group by, view, BASE</td><td><pre>Updatable vs Non Updatable Views
the view but only some columns:
• The column patient is not because it is formed from multiple columns
on the base tables.
For a view to be updatable, there must be a one-to-one relationship
Aggregate functions, distinct, group by, union, nested queries, etc.</pre></td><td><pre>Updatable vs Non Updatable Views

If we consider the previous view we can easily update the data using
the view but only some columns:
• The column duration is updatable;
• The column patient is not because it is formed from multiple columns
   on the base tables.
You can create views ONLY with a SELECT statement.
For a view to be updatable, there must be a one-to-one relationship
between the rows in the view and the rows in the underlying table.
There are also certain other constructs that make a view non-updatable;
For example, if it contains any of the following:
Aggregate functions, distinct, group by, union, nested queries, etc.</pre></td></tr>
</tbody>
</table>

## 17. L4.10 - Extra Data Types

Pages: 10.

<table>
<thead><tr><th>Page</th><th>Slide focus / heading</th><th>Comparison anchors detected on this slide</th><th>Direct comparison / relationship lines from slide</th><th>Lossless extracted slide text</th></tr></thead>
<tbody>
<tr><td>1</td><td>JSON Data Type / (in preparation for noSQL)</td><td>NoSQL, SQL, JSON</td><td><pre>(in preparation for noSQL)</pre></td><td><pre>JSON Data Type
(in preparation for noSQL)


                             www.udst.edu.qa</pre></td></tr>
<tr><td>2</td><td>JSON Data / • JavaScript Object Notation</td><td>JSON, value, BASE, collection, array</td><td><pre>None explicit</pre></td><td><pre>JSON Data

• JavaScript Object Notation
• Lightweight data interchange format popular for communicating
  between a backend server and a web front end or mobile front end.
• Based on two main structures:
   • A collection of name/value pairs
     (objects, records, dictionary, associative array, etc.)
   • An ordered list of values (array, list, etc.)
• Ideas:
   • Fast for a computer to interpret
   • Easy for a human to interpret</pre></td></tr>
<tr><td>3</td><td>Example / • The fields can vary from record to record,</td><td>JSON, collection</td><td><pre>unlike a table.</pre></td><td><pre>Example




   • The fields can vary from record to record,
     unlike a table.

   • We can store the information in these
     datasets as a collection of tables

   • Or a JSON object</pre></td></tr>
<tr><td>4</td><td>Example</td><td>None explicit</td><td><pre>None explicit</pre></td><td><pre>Example</pre></td></tr>
<tr><td>5</td><td>JSON vs Relational Tables / • In a relational database</td><td>relational, JSON, value, BASE</td><td><pre>JSON vs Relational Tables</pre></td><td><pre>JSON vs Relational Tables

• In a relational database

  • everything is a table such that all records have the same
    properties

  • multi-valued cells are not allowed

• JSON is free of these rules.</pre></td></tr>
<tr><td>6</td><td>JSON in MySQL / • MySQL supports JSON field types, however, it is not as efficient as a</td><td>relational, NoSQL, SQL, MySQL, database design, min, JSON, BASE</td><td><pre>• MySQL supports JSON field types, however, it is not as efficient as a
NoSQL database.
• Writing a large JSON structure is unpleasant, but generally, a
What Is a NoSQL Database? | IBM
NoSQL, also referred to as “not only
SQL” or “non-SQL”, is an approach</pre></td><td><pre>JSON in MySQL

• MySQL supports JSON field types, however, it is not as efficient as a
  NoSQL database.
• Writing a large JSON structure is unpleasant, but generally, a
  programming language can be used to automatically convert to JSON
  format.




                                                            What Is a NoSQL Database? | IBM
                                                        NoSQL, also referred to as “not only
                                                        SQL” or “non-SQL”, is an approach
                                                        to database design that enables
                                                        the storage and querying of data
                                                        outside the traditional structures
                                                        found in relational databases.</pre></td></tr>
<tr><td>7</td><td>Selecting JSON Data / • JSON data appears as a string.</td><td>select, JSON</td><td><pre>None explicit</pre></td><td><pre>Selecting JSON Data

• JSON data appears as a string.
• In a program you would be able to convert a JSON string into a
  dictionary or object very easily.</pre></td></tr>
<tr><td>8</td><td>Extracting Data from JSON Columns / • Use the json_extract command</td><td>JSON</td><td><pre>• Strings have lots of surprises because of the quotation marks.</pre></td><td><pre>Extracting Data from JSON Columns

• Use the json_extract command
• Strings have lots of surprises because of the quotation marks.
• Use a substring function to try and clean it up.</pre></td></tr>
<tr><td>9</td><td>Searching on JSON Attributes / • If an object in a particular cell doesn’t contain the attribute, the row</td><td>attribute, JSON</td><td><pre>None explicit</pre></td><td><pre>Searching on JSON Attributes

• If an object in a particular cell doesn’t contain the attribute, the row
  will be ignored.
• You use the “$.” notation style</pre></td></tr>
<tr><td>10</td><td>Why Use JSON? / • Dealing with small amounts of denormalized data:</td><td>relationship, 1:M, where, JSON</td><td><pre>• Most people only have a couple of phone numbers but rather than
creating a new 1:M relationship with another table, a JSON record
• Imagine a competition where each team has a score and a time but
• We know the final scores of the teams but maybe we want to keep track of what</pre></td><td><pre>Why Use JSON?

• Dealing with small amounts of denormalized data:
   • Most people only have a couple of phone numbers but rather than
     creating a new 1:M relationship with another table, a JSON record
     might be easier.
• Dealing with records that have large varieties of data:
   • Imagine a competition where each team has a score and a time but
     there are also details about how the score was calculated.
   • Think of a football match.
       • We know the final scores of the teams but maybe we want to keep track of what
         times the goals were made.
       • There may be penalty kicks, yellow cards and red cards that we want to also
         track as part of the game.</pre></td></tr>
</tbody>
</table>

## 18. L5.1 - Comparison Overview

Pages: 10.

<table>
<thead><tr><th>Page</th><th>Slide focus / heading</th><th>Comparison anchors detected on this slide</th><th>Direct comparison / relationship lines from slide</th><th>Lossless extracted slide text</th></tr></thead>
<tbody>
<tr><td>1</td><td>Introduction to noSQL Databases / Database Type Overview</td><td>NoSQL, SQL, view, BASE</td><td><pre>Introduction to noSQL Databases</pre></td><td><pre>Introduction to noSQL Databases
    Database Type Overview


                                  www.udst.edu.qa</pre></td></tr>
<tr><td>2</td><td>Big Data / • Massive amounts of data is being collected about everything.</td><td>product, min, big data</td><td><pre>None explicit</pre></td><td><pre>Big Data

• Massive amounts of data is being collected about everything.
• There are many license plate readers in use. Every time that
  somebody enters this parking lot their information is being recorded.
  This particular venue could do things like increase prices as the
  parking lot fills up to increase revenue.
• When you visit a site like Amazon, they are recording every time you
  scroll and what you stop on. A 5-minute visit to Amazon to look at 5
  products probably results in a lot of data items being collected.
• Amazon estimates over a million visitors each second!
• Businesses can use collected data to improve sales by offering
  related items to customers.</pre></td></tr>
<tr><td>3</td><td>Big Data Storage / • Amazon has approximately a million TB (Terabytes) of purchase</td><td>relational, SQL, big data, BASE</td><td><pre>• Storage of this data requires new approaches to data storage, but a
standard SQL relational database was not designed to handle such
day but over time this adds up.</pre></td><td><pre>Big Data Storage

• Amazon has approximately a million TB (Terabytes) of purchase
  information.
• Storage of this data requires new approaches to data storage, but a
  standard SQL relational database was not designed to handle such
  purposes.
• For UDST, there are 135 parameters tracked in D2L such as login IP
  addresses, question &amp; answers, submitted files to dropboxes, when
  a student reads content, etc.
• For UDST this probably amounts to probably 10-20 MB of data per
  day but over time this adds up.</pre></td></tr>
<tr><td>4</td><td>The 5 V’s of Big Data / • A set of data that displays characteristics of:</td><td>big data, volume, velocity, variety, veracity, value</td><td><pre>None explicit</pre></td><td><pre>The 5 V’s of Big Data

• A set of data that displays characteristics of:

   • Volume – the quantity of data to be stored

   • Velocity – the speed in which new data is added

   • Variety – the variations in the structure of the data

   • Veracity – the trustworthiness of the data

   • Value – the worth of the data to a business</pre></td></tr>
<tr><td>5</td><td>NoSQL Databases / • A term used to describe databases that were designed to help with</td><td>relational, NoSQL, SQL, where, big data, BASE</td><td><pre>NoSQL Databases</pre></td><td><pre>NoSQL Databases

• A term used to describe databases that were designed to help with
  big data.

• The term really means any database that doesn’t use the standard
  relational model.

• Databases where you don’t have to decide the structure of the data
  in advance.</pre></td></tr>
<tr><td>6</td><td>Relational Databases use ACID transactions / • Atomic – it is all changed or nothing is changed</td><td>relational, foreign key, check, commit, ACID, BASE, atomic, consistent, isolated, durable</td><td><pre>Relational Databases use ACID transactions</pre></td><td><pre>Relational Databases use ACID transactions

• Atomic – it is all changed or nothing is changed

• Consistent – database changes from one consistent state
  to another (unless you disable foreign key checks)

• Isolated – Changes made during transactions are not
  visible until the transaction is completed

• Durable – Committed transactions survive failures</pre></td></tr>
<tr><td>7</td><td>NoSQL Databases / • Typically non-relational</td><td>distributed, relational, non-relational, NoSQL, SQL, BASE, find</td><td><pre>NoSQL Databases
• Distributed
• Compared to vertically scalable in RDBMS, meaning that we
• Focus is on finding information rather than updating it</pre></td><td><pre>NoSQL Databases



• Typically non-relational
• Distributed
• Horizontally scalable
   • Can use a lot of low-powered machines to scale
   • Compared to vertically scalable in RDBMS, meaning that we
     have to get one really fast machine if we have high loads
• Focus is on finding information rather than updating it</pre></td></tr>
<tr><td>8</td><td>NoSQL Databases use BASE Transactions / • BAsically Available: no guarantees of consistent data</td><td>NoSQL, SQL, BASE, consistent</td><td><pre>NoSQL Databases use BASE Transactions
all of the records but it will get there eventually</pre></td><td><pre>NoSQL Databases use BASE Transactions

• BAsically Available: no guarantees of consistent data

• Soft State: The state could change over time due to the idea of
  eventual consistency

• Eventual consistency: It can take time for a change to propogate to
  all of the records but it will get there eventually</pre></td></tr>
<tr><td>9</td><td>MongoDB / • A “document based” database.</td><td>MongoDB, primary key, min, JSON, value, BASE, document</td><td><pre>None explicit</pre></td><td><pre>MongoDB

• A “document based” database.

• Each record is made of a key value (think of a primary key) and a
  document.

• The document contains multiple fields and is stored in JSON format.

• Becoming very popular in web application storage!</pre></td></tr>
<tr><td>10</td><td>Related Links / • SQL vs NoSQL</td><td>NoSQL, SQL, MongoDB, min, JSON</td><td><pre>• SQL vs NoSQL</pre></td><td><pre>Related Links

• SQL vs NoSQL
   • https://www.youtube.com/watch?v=ZS_kXvOeQ5Y

• Learn JSON
   • https://www.youtube.com/watch?v=iiADhChRriM

• Learn MongoDB in a few minutes
   • https://www.youtube.com/watch?v=bKjH8WhSu_E</pre></td></tr>
</tbody>
</table>

## 19. L5.2 - MongoDB Overview

Pages: 15.

<table>
<thead><tr><th>Page</th><th>Slide focus / heading</th><th>Comparison anchors detected on this slide</th><th>Direct comparison / relationship lines from slide</th><th>Lossless extracted slide text</th></tr></thead>
<tbody>
<tr><td>1</td><td>MongoDB Overview / Atlas Cloud on mongodb.com</td><td>MongoDB, view</td><td><pre>None explicit</pre></td><td><pre>MongoDB Overview
Atlas Cloud on mongodb.com


                             www.udst.edu.qa</pre></td></tr>
<tr><td>2</td><td>MongoDB Compass</td><td>MongoDB</td><td><pre>None explicit</pre></td><td><pre>MongoDB Compass</pre></td></tr>
<tr><td>3</td><td>Sign Up for an account</td><td>count</td><td><pre>None explicit</pre></td><td><pre>Sign Up for an account</pre></td></tr>
<tr><td>4</td><td>Build a Database</td><td>BASE</td><td><pre>None explicit</pre></td><td><pre>Build a Database</pre></td></tr>
<tr><td>5</td><td>Create a User</td><td>None explicit</td><td><pre>None explicit</pre></td><td><pre>Create a User</pre></td></tr>
<tr><td>6</td><td>Allow for Access from Everywhere!</td><td>where</td><td><pre>None explicit</pre></td><td><pre>Allow for Access from Everywhere!</pre></td></tr>
<tr><td>7</td><td>Use the Connection String in Compass</td><td>None explicit</td><td><pre>None explicit</pre></td><td><pre>Use the Connection String in Compass</pre></td></tr>
<tr><td>8</td><td>Introducing Document Databases</td><td>BASE, document</td><td><pre>None explicit</pre></td><td><pre>Introducing Document Databases



                                 www.udst.edu.qa</pre></td></tr>
<tr><td>9</td><td>Databases, Collections and Documents / • Think of a database in MongoDB as a database in MySQL</td><td>SQL, MySQL, MongoDB, BASE, collection, document</td><td><pre>None explicit</pre></td><td><pre>Databases, Collections and Documents

• Think of a database in MongoDB as a database in MySQL
• Think of a table in MySQL as a collection in MongoDB
• Think of a record/row/tuple in MySQL as a document in MongoDB


           MySQL                       MongoDB



           Tables




           Records</pre></td></tr>
<tr><td>10</td><td>Documents are JSON Objects / • Key-Value pairs (recall the Python dictionary object)</td><td>JSON, value, document</td><td><pre>None explicit</pre></td><td><pre>Documents are JSON Objects

• Key-Value pairs (recall the Python dictionary object)</pre></td></tr>
<tr><td>11</td><td>Create a Database / • use database_name</td><td>BASE, collection</td><td><pre>None explicit</pre></td><td><pre>Create a Database
• use database_name
• This command switches to database_name even if it doesn’t exist. If
  The database_name will be created when its first collection is
  created.</pre></td></tr>
<tr><td>12</td><td>Create a Collection / • db.createCollection(&#x27;collection_name&#x27;)</td><td>BASE, collection</td><td><pre>None explicit</pre></td><td><pre>Create a Collection

• db.createCollection(&#x27;collection_name&#x27;)
• This will create a collection if it didn’t already exist.
• Learning these commands is necessary for assessments in this course.

• The GUI allows you to create the database and collection directly without commands</pre></td></tr>
<tr><td>13</td><td>Simple Document Insert using GUI</td><td>insert, document</td><td><pre>None explicit</pre></td><td><pre>Simple Document Insert using GUI</pre></td></tr>
<tr><td>14</td><td>Types of Values / • String</td><td>value, array</td><td><pre>None explicit</pre></td><td><pre>Types of Values

•   String
•   Integer (no quotes)
•   Boolean (true/false, no quotes)
•   Arrays (inside [ ])
•   Objects (inside { })
•   Null
•   Date
•   Other items such as binary data, JavaScript code, etc.</pre></td></tr>
<tr><td>15</td><td>The Unique Key / • Every document has an _id key field that uniquely identifies it.</td><td>primary key, unique, index, BASE, collection, document, unique</td><td><pre>• The _id can be specified but typically generated automatically by the</pre></td><td><pre>The Unique Key

• Every document has an _id key field that uniquely identifies it.
• The _id can be specified but typically generated automatically by the
  database engine:
   • Based on Time, Machine, Process ID, and an Integer.
• The _id is the primary key for the collection and is the only thing
  that is fast to search for. Every other search parameter will be a full
  table scan unless you define an index.




https://youtu.be/ojKJqNQYaOI?si=i3okdGreuVWOtN8Y (3:38 m)</pre></td></tr>
</tbody>
</table>

## 20. L5.3 - Document Inserting and Querying

Pages: 11.

<table>
<thead><tr><th>Page</th><th>Slide focus / heading</th><th>Comparison anchors detected on this slide</th><th>Direct comparison / relationship lines from slide</th><th>Lossless extracted slide text</th></tr></thead>
<tbody>
<tr><td>1</td><td>MongoDB / Inserting and Querying Documents</td><td>MongoDB, insert, document</td><td><pre>None explicit</pre></td><td><pre>MongoDB
Inserting and Querying Documents


                                   www.udst.edu.qa</pre></td></tr>
<tr><td>2</td><td>Inserting Documents / • Two commands: - will also create a new collection in if it does not already exist.</td><td>SQL, primary key, default, insert, value, collection, document, insertOne, insertMany</td><td><pre>• db.collection.insertOne({…}) -- recall a collection here is like a table in SQL
• You can set a primary key if you want, but if you don’t add one to the</pre></td><td><pre>Inserting Documents

• Two commands: - will also create a new collection in if it does not already exist.
   • db.collection.insertOne({…}) -- recall a collection here is like a table in SQL
   • db.collection.insertMany([{…},{…}])

• Replace the word ‘collection’ with the name of your actual
• collection
• You can set a primary key if you want, but if you don’t add one to the
  document the default ObjectId type will be generated automatically

• Trying to insert a duplicate _id value will result in an error</pre></td></tr>
<tr><td>3</td><td>Example</td><td>None explicit</td><td><pre>None explicit</pre></td><td><pre>Example</pre></td></tr>
<tr><td>4</td><td>Querying Documents / • The command is ‘db.collection.find()’</td><td>optional, project, select, collection, document, find, projection</td><td><pre>None explicit</pre></td><td><pre>Querying Documents

• The command is ‘db.collection.find()’

• The find() method takes 2 parameters:
• db.collection.find(&lt;query&gt;,&lt;projection&gt;)

   • A query selector - first

   • An optional projection list (the desired list of columns reported)</pre></td></tr>
<tr><td>5</td><td>Equality Queries: Single + Multiple (AND) / • Put a single parameter in the find() with the field you want matched</td><td>logical, find</td><td><pre>None explicit</pre></td><td><pre>Equality Queries: Single + Multiple (AND)

• Put a single parameter in the find() with the field you want matched
  inside a set of curly braces { }
   • db.car_sales.find( {manufacturer: &quot;BMW&quot;} )
   • db.car_sales.find( {price: 26000} )

• To match multiple fields include multiple columns:
   • db.car_sales.find( {manufacturer: &quot;Ford&quot;, type: &quot;Passenger&quot;} )
       • This essentially behaves as an AND (Logical/Boolean Operator)


 db.car_sales.find( {$and: [ {manufacturer: &quot;Ford&quot;} , {type: &quot;Passenger&quot;} ] } )</pre></td></tr>
<tr><td>6</td><td>Equality Queries with OR / • The OR Boolean operator is more complicated!</td><td>find</td><td><pre>None explicit</pre></td><td><pre>Equality Queries with OR

• The OR Boolean operator is more complicated!
• Use the $or operator with a list of things that could be matched.


db.car_sales.find(
      { $or: [
         {manufacturer: &quot;BMW&quot;} ,
         {manufacturer: &quot;Jeep&quot;}
       ]}
)</pre></td></tr>
<tr><td>7</td><td>Equal &amp; Not Equal Operators / Use the $eq (=) operator to match a field that is equal to something</td><td>find</td><td><pre>None explicit</pre></td><td><pre>Equal &amp; Not Equal Operators

Use the $eq (=) operator to match a field that is equal to something

db.car_sales.find( {type: {$eq: &quot;Car&quot;} } )

Use the $ne (≠) operator to match a field that is not equal to something

db.car_sales.find( {type: {$ne: &quot;Car&quot;} } )</pre></td></tr>
<tr><td>8</td><td>Relational Operators for comparison / $gt (greater than &gt;)</td><td>relational, find</td><td><pre>Relational Operators for comparison</pre></td><td><pre>Relational Operators for comparison

$gt    (greater than &gt;)
$gte   (greater than or equal to ≥)
$lt    (less than &gt;)
$lte   (less than or equal to ≤)



db.car_sales.find( {price: {$gt: 70000} } )



https://www.youtube.com/watch?v=q5EY2HRfw5c (8:10 m)</pre></td></tr>
<tr><td>9</td><td>Projections / • Restrict the number of output “columns” reported by:</td><td>project, find, projection</td><td><pre>None explicit</pre></td><td><pre>Projections
• Restrict the number of output “columns” reported by:
• Adding a second parameter to the find() to specify the columns to
  include in the output report
• Put a 1 if you want the column reported in the output ( price:1 )
• Put a 0 if you don’t want to show a column ( _id:0 )</pre></td></tr>
<tr><td>10</td><td>Basic Counting / • There are several options:</td><td>count, document, find</td><td><pre>• db.car_sales.count() – Deprecated but still works for now...
• don’t use it because it might stop working the day before the final exam!</pre></td><td><pre>Basic Counting

• There are several options:
   • db.car_sales.find( {manufacturer: ”Toyota”} ).count()

   • db.car_sales.countDocuments( {manufacturer: ”Toyota”} )

   • db.car_sales.count() – Deprecated but still works for now...
       • don’t use it because it might stop working the day before the final exam!




   https://www.youtube.com/watch?v=3QtLLyGEBIE (5:34 m)</pre></td></tr>
<tr><td>11</td><td>Basic Sorting / • Append a “.sort( {} )” to the end of the find()</td><td>find</td><td><pre>None explicit</pre></td><td><pre>Basic Sorting

• Append a “.sort( {} )” to the end of the find()
• db.car_sales.find().sort( {manufacturer:1} ) – ascending order
• db.car_sales.find().sort( {manufacturer:-1} ) – descending order</pre></td></tr>
</tbody>
</table>

## 21. L5.4 - Updating and Deleting Documents

Pages: 9.

<table>
<thead><tr><th>Page</th><th>Slide focus / heading</th><th>Comparison anchors detected on this slide</th><th>Direct comparison / relationship lines from slide</th><th>Lossless extracted slide text</th></tr></thead>
<tbody>
<tr><td>1</td><td>MongoDB / Updating, Removing Documents</td><td>MongoDB, document, aggregation pipeline</td><td><pre>None explicit</pre></td><td><pre>MongoDB
Updating, Removing Documents
   &amp; Aggregation Pipelines

                               www.udst.edu.qa</pre></td></tr>
<tr><td>2</td><td>Updating / • The update functions allow editing or changing the values of</td><td>operation, update, value, document, updateOne, updateMany, replaceOne, $set, $inc, $mul, $unset</td><td><pre>There are many but we focus on: $set, $inc, $mul, $unset</pre></td><td><pre>Updating

• The update functions allow editing or changing the values of
  some field(s) in an existing document.
• The update method can be used to add($set)/remove($unset) fields.
• Functions:
   • updateOne(): Modify one document and stop
   • updateMany(): Modify every document that matches a criterion
   • replaceOne(): Replace a document with an entirely new document
• Update methods take the first parameter as a filter.
• The second parameter is an operation.
  There are many but we focus on: $set, $inc, $mul, $unset
             https://www.youtube.com/watch?v=s8YG0GvQInY (10:39 m)

             https://www.youtube.com/watch?v=PXFYxN9KOEg (13:03 m)</pre></td></tr>
<tr><td>3</td><td>Examples</td><td>None explicit</td><td><pre>None explicit</pre></td><td><pre>Examples</pre></td></tr>
<tr><td>4</td><td>Deleting / • Methods are:</td><td>delete, document, deleteOne, deleteMany</td><td><pre>None explicit</pre></td><td><pre>Deleting

• Methods are:
   • deleteOne()
   • deleteMany()
• The parameter is a query to match the documents.
• An empty query { } will match all documents.




https://www.youtube.com/watch?v=hq7gGo-1CgM (5:38 m)</pre></td></tr>
<tr><td>5</td><td>Aggregation Pipeline / • A pipeline is a sequence of stages used to process documents.</td><td>operation, sequence, value, document, aggregation pipeline</td><td><pre>None explicit</pre></td><td><pre>Aggregation Pipeline

• A pipeline is a sequence of stages used to process documents.
• Each stage performs one operation on the input documents such as:
   • filter, reshape, group, calculate values, etc




         Filter               Group               Calculate</pre></td></tr>
<tr><td>6</td><td>Aggregation Code / db.collection.aggregate([&lt;put your aggregate functions here&gt;])</td><td>project, aggregate, count, collection, $match, $project, $group, $count</td><td><pre>There are many aggregate functions but for this course we focus on:</pre></td><td><pre>Aggregation Code

db.collection.aggregate([&lt;put your aggregate functions here&gt;])

There are many aggregate functions but for this course we focus on:
• $match, $project, $group, $count



It is easiest to build up a difficult query one stage at a time.

https://www.youtube.com/watch?v=Kk6Er0c7srU (12:44 m)</pre></td></tr>
<tr><td>7</td><td>Example / • No real purpose here for this query, it is just an example:</td><td>None explicit</td><td><pre>None explicit</pre></td><td><pre>Example

• No real purpose here for this query, it is just an example:</pre></td></tr>
<tr><td>8</td><td>Something Real / • Compute the total price of all the Volvos in the collection.</td><td>sum, collection, document</td><td><pre>None explicit</pre></td><td><pre>Something Real

• Compute the total price of all the Volvos in the collection.
• First create a match stage to filter out the documents that we want




• Next use a group with the sum function. The grouping will only have
  a single manufacturer.</pre></td></tr>
<tr><td>9</td><td>Another Example / • List all manufacturers by the sum of the prices but show only the</td><td>sum</td><td><pre>• List all manufacturers by the sum of the prices but show only the</pre></td><td><pre>Another Example

• List all manufacturers by the sum of the prices but show only the
  manufacturers whose totals is less than 10,000 and sort the result.
• 3 Stages
   • Group stage to compute the sum
   • Match stage to remove totals over 10000
   • Sort stage</pre></td></tr>
</tbody>
</table>

## 22. L5.5 - Arrays and Embedded Objects

Pages: 11.

<table>
<thead><tr><th>Page</th><th>Slide focus / heading</th><th>Comparison anchors detected on this slide</th><th>Direct comparison / relationship lines from slide</th><th>Lossless extracted slide text</th></tr></thead>
<tbody>
<tr><td>1</td><td>MongoDB / Arrays and Embedded Objects</td><td>MongoDB, embedded object, array</td><td><pre>None explicit</pre></td><td><pre>MongoDB
Arrays and Embedded Objects


                              www.udst.edu.qa</pre></td></tr>
<tr><td>2</td><td>Embedded Objects / {</td><td>relationship, 1:1, having, embedded object</td><td><pre>None explicit</pre></td><td><pre>Embedded Objects
                                                                          {
• An embedded object is one                                                   &quot;first_name&quot;: &quot;Michael&quot;,
                                                                              &quot;last_name&quot;: &quot;Smith&quot;,
  technique that we can be used to                                            &quot;phone&quot;: [
  avoid having multiple tables.                                                 &quot;321-654-9870&quot;,
                                                                                &quot;321-789-6540&quot;
• You can use it to handle 1:1 type                                           ],
  relationships.                                                              &quot;last_vitals&quot;: {
                                                                                &quot;height&quot;: 177,
                                                                                &quot;weight&quot;: 80,
                                                                                &quot;heart_rate&quot;: 70,
                                                                                &quot;blood_pressure&quot;: [125,82]
                                                                              },
                                                                              &quot;visits&quot;: [
                                                                                {&quot;date&quot;: &quot;2023-07-30T14:30&quot;,&quot;doctor&quot;: &quot;Taylor&quot;},
                                                                                {&quot;date&quot;: &quot;2024-01-05T11:30&quot;,&quot;doctor&quot;: &quot;Carter&quot;}
                                                                              ]
                                                                          }



  •   You can use the code in the notes section to create the patients table.</pre></td></tr>
<tr><td>3</td><td>Searching on Fields of Embedded Objects / {</td><td>document, find, embedded object, dot notation</td><td><pre>None explicit</pre></td><td><pre>Searching on Fields of Embedded Objects
                                                        {
• Provide the name of the main document                     &quot;first_name&quot;: &quot;Michael&quot;,
                                                            &quot;last_name&quot;: &quot;Smith&quot;,
  field and the name of the document,                       &quot;phone&quot;: [
  separated by a period. (dot notation)                       &quot;321-654-9870&quot;,
                                                              &quot;321-789-6540&quot;
• You must enclose the name of the fully                    ],
  qualified field in quotation marks (&quot; &quot;).                 &quot;last_vitals&quot;: {
                                                              &quot;height&quot;: 177,
                                                              &quot;weight&quot;: 80,
                                                              &quot;heart_rate&quot;: 70,
db.patients.find({ &quot;last_vitals.height&quot;: 175})                &quot;blood_pressure&quot;: [125,82]
                                                            },
                                                            &quot;visits&quot;: [
                                                              {&quot;date&quot;: &quot;2023-07-30T14:30&quot;,&quot;doctor&quot;: &quot;Taylor&quot;},
db.patients.find({ &quot;last_vitals.weight&quot;: {$gt: 80} })         {&quot;date&quot;: &quot;2024-01-05T11:30&quot;,&quot;doctor&quot;: &quot;Carter&quot;}
                                                            ]
                                                        }</pre></td></tr>
<tr><td>4</td><td>Update Fields of Embedded Objects / {</td><td>update, embedded object</td><td><pre>None explicit</pre></td><td><pre>Update Fields of Embedded Objects
                                                {
   Update weight inside last_vitals for Sarah       &quot;first_name&quot;: “Sarah&quot;,
                                                    &quot;last_name&quot;: “Ali&quot;,
                                                    &quot;phone&quot;: [
                                                      &quot;321-654-9870&quot;,
                                                      &quot;321-789-6540&quot;
                                                    ],
                                                    &quot;last_vitals&quot;: {
                                                      &quot;height&quot;: 177,
                                                      &quot;weight&quot;: 80,
                                                      &quot;heart_rate&quot;: 70,
                                                      &quot;blood_pressure&quot;: [125,82]
                                                    },
                                                    &quot;visits&quot;: [
                                                      {&quot;date&quot;: &quot;2023-07-30T14:30&quot;,&quot;doctor&quot;: &quot;Taylor&quot;},
                                                      {&quot;date&quot;: &quot;2024-01-05T11:30&quot;,&quot;doctor&quot;: &quot;Carter&quot;}
                                                    ]
                                                }</pre></td></tr>
<tr><td>5</td><td>Arrays in Objects / {</td><td>relationship, 1:M, M:N, document, array</td><td><pre>None explicit</pre></td><td><pre>Arrays in Objects
                                          {
• Arrays are often used for 1:M and           &quot;first_name&quot;: &quot;Michael&quot;,
                                              &quot;last_name&quot;: &quot;Smith&quot;,
  M:N type relationships of                   &quot;phone&quot;: [
  documents.                                    &quot;321-654-9870&quot;,
                                                &quot;321-789-6540&quot;
• Searching for a particular item in an       ],
  array is tricky unless your data is         &quot;last_vitals&quot;: {
                                                &quot;height&quot;: 177,
  kept very simple.                             &quot;weight&quot;: 80,
• Let’s put multiple phone numbers for          &quot;heart_rate&quot;: 70,
                                                &quot;blood_pressure&quot;: [125,82]
  each patient.                               },
                                              &quot;visits&quot;: [
                                                {&quot;date&quot;: &quot;2023-07-30T14:30&quot;,&quot;doctor&quot;: &quot;Taylor&quot;},
                                                {&quot;date&quot;: &quot;2024-01-05T11:30&quot;,&quot;doctor&quot;: &quot;Carter&quot;}
                                              ]
                                          }</pre></td></tr>
<tr><td>6</td><td>Searching Simple Arrays / {</td><td>check, value, BASE, find, array</td><td><pre>None explicit</pre></td><td><pre>Searching Simple Arrays
                                                                 {
If an array is comprised of simple (non-object) elements then        &quot;first_name&quot;: &quot;Michael&quot;,
searching is easy:                                                   &quot;last_name&quot;: &quot;Smith&quot;,
                                                                     &quot;phone&quot;: [
1- You can perform a direct search to find the specific value.         &quot;321-654-9870&quot;,
                                                                       &quot;321-789-6540&quot;
db.patients.find({ &quot;phone&quot;: &quot;134-411-7696&quot;})                         ],
                                                                     &quot;last_vitals&quot;: {
                                                                       &quot;height&quot;: 177,
2- You can search based on the position of the element within          &quot;weight&quot;: 80,
the array.                                                             &quot;heart_rate&quot;: 70,
                                                                       &quot;blood_pressure&quot;: [125,82]
                                                                     },
                                                                     &quot;visits&quot;: [
                                                                       {&quot;date&quot;: &quot;2023-07-30T14:30&quot;,&quot;doctor&quot;: &quot;Taylor&quot;},
                                                                       {&quot;date&quot;: &quot;2024-01-05T11:30&quot;,&quot;doctor&quot;: &quot;Carter&quot;}
                                                                     ]
 • This checks the first element in the blood_pressure array
                                                                 }
   for values greater than 130.
 • Note that &quot;last_vitals.blood_pressure.1&quot; refers to the
   second element in the blood_pressure array.</pre></td></tr>
<tr><td>7</td><td>Searching Simple Arrays – cont. / {</td><td>where, value, find, array</td><td><pre>None explicit</pre></td><td><pre>Searching Simple Arrays – cont.
                                                       {
                                                           &quot;first_name&quot;: &quot;Michael&quot;,
                                                           &quot;last_name&quot;: &quot;Smith&quot;,
                                                           &quot;phone&quot;: [
                                                             &quot;321-654-9870&quot;,
                                                             &quot;321-789-6540&quot;
                                                           ],
This will find any patient where the blood_pressure
                                                           &quot;last_vitals&quot;: {
array exactly matches [125, 82] in that order.               &quot;height&quot;: 177,
                                                             &quot;weight&quot;: 80,
                                                             &quot;heart_rate&quot;: 70,
                                                             &quot;blood_pressure&quot;: [125,82]
                                                           },
                                                           &quot;visits&quot;: [
                                                             {&quot;date&quot;: &quot;2023-07-30T14:30&quot;,&quot;doctor&quot;: &quot;Taylor&quot;},
                                                             {&quot;date&quot;: &quot;2024-01-05T11:30&quot;,&quot;doctor&quot;: &quot;Carter&quot;}
                                                           ]
Find patients where the first element in               }
blood_pressure is in the range 120-130 or the second
element value is in the range 80-90</pre></td></tr>
<tr><td>8</td><td>Searching Arrays of Embedded Objects / {</td><td>check, where, embedded object, array, $elemMatch</td><td><pre>None explicit</pre></td><td><pre>Searching Arrays of Embedded Objects
                                                        {
• Use $elemMatch to search                                  &quot;first_name&quot;: &quot;Michael&quot;,
                                                            &quot;last_name&quot;: &quot;Smith&quot;,
• We are looking for elements in the visits                 &quot;phone&quot;: [
                                                              &quot;321-654-9870&quot;,
  array where the doctor field equals                         &quot;321-789-6540&quot;
  &quot;Taylor&quot;.                                                 ],
                                                            &quot;last_vitals&quot;: {
                                                              &quot;height&quot;: 177,
                                                              &quot;weight&quot;: 80,
                                                              &quot;heart_rate&quot;: 70,
                               This checks for visits         &quot;blood_pressure&quot;: [125,82]
                               to Dr Taylor on May          },
                               20th, 2023, between          &quot;visits&quot;: [
                               midnight (2023-05-             {&quot;date&quot;: &quot;2023-05-20T14:30&quot;,&quot;doctor&quot;: &quot;Taylor&quot;},
                               20T00:00) and the              {&quot;date&quot;: &quot;2024-01-05T11:30&quot;,&quot;doctor&quot;: &quot;Carter&quot;}
                               end of the day
                                                            ]
                               (2023-05-20T23:59),
                               including all times      }
                               within that date
                               range.</pre></td></tr>
<tr><td>9</td><td>Update Arrays of Embedded Objects / {</td><td>update, embedded object, array</td><td><pre>Error raised because Sarah has multiple visits. How to Solve it? &quot;321-789-6540&quot;
1) This version will work because one record match the query. &quot;visits&quot;: [
2) This version will work because it updates all visits for Sarah.</pre></td><td><pre>Update Arrays of Embedded Objects
                                                                     {
                                                                      &quot;first_name&quot;: “Sarah&quot;,
                                                                      &quot;last_name&quot;: “Ali&quot;,
                                                                      &quot;phone&quot;: [
                                                                        &quot;321-654-9870&quot;,
Error raised because Sarah has multiple visits. How to Solve it?        &quot;321-789-6540&quot;
                                                                      ],
                                                                      &quot;last_vitals&quot;: {
                                                                        &quot;height&quot;: 177,
                                                                        &quot;weight&quot;: 80,
                                                                        &quot;heart_rate&quot;: 70,
                                                                        &quot;blood_pressure&quot;: [125,82]
                                                                      },
1) This version will work because one record match the query.         &quot;visits&quot;: [
                                                                        {&quot;date&quot;: &quot;2022-10-05T12:00&quot;,&quot;doctor&quot;: “Kamal&quot;},
                                                                        {&quot;date&quot;: &quot;2023-11-01T10:00&quot;,&quot;doctor&quot;: “Patel&quot;}
                                                                      ]
                                                                     }`


2) This version will work because it updates all visits for Sarah.</pre></td></tr>
<tr><td>10</td><td>Unwinding Arrays / • $unwind is an aggregation pipeline method that allows you to</td><td>sum, collection, document, aggregation pipeline, array, $unwind</td><td><pre>None explicit</pre></td><td><pre>Unwinding Arrays

   • $unwind is an aggregation pipeline method that allows you to
     produce something that looks like a table.
   • Sometimes useful if you are trying to process details of the array.
                                                Let’s assume your patients collection has documents like this:


Lets try to unwind the visits array so that
each visit is treated as a separate document.</pre></td></tr>
<tr><td>11</td><td>Unwinding Result / After running the aggregation pipeline, the result will look like this:</td><td>aggregation pipeline</td><td><pre>None explicit</pre></td><td><pre>Unwinding Result
After running the aggregation pipeline, the result will look like this:</pre></td></tr>
</tbody>
</table>

## 23. L5.6 - Document Design

Pages: 13.

<table>
<thead><tr><th>Page</th><th>Slide focus / heading</th><th>Comparison anchors detected on this slide</th><th>Direct comparison / relationship lines from slide</th><th>Lossless extracted slide text</th></tr></thead>
<tbody>
<tr><td>1</td><td>MongoDB / Designing Documents</td><td>MongoDB, document</td><td><pre>None explicit</pre></td><td><pre>MongoDB
Designing Documents



                      www.udst.edu.qa</pre></td></tr>
<tr><td>2</td><td>No Rules! / • No Rules = Easy, but No Rules = Chaos!</td><td>MongoDB, foreign key, collection, document, find</td><td><pre>• No Rules = Easy, but No Rules = Chaos!
• Just because there are no rules doesn’t mean we shouldn’t try to
• The question is when to embed information and when to keep the
information in a separate collection (reference).</pre></td><td><pre>No Rules!

• No Rules = Easy, but No Rules = Chaos!
• Just because there are no rules doesn’t mean we shouldn’t try to
  follow some.
• The question is when to embed information and when to keep the
  information in a separate collection (reference).
• The “_id” field can be used like a foreign key to find information from
  another collection.
• Typical question to ask is:
   • Should the visits be embedded as a document in the patient or should
      the visits be referenced, thus stored in a separate collection?
https://www.mongodb.com/blog/post/6-rules-of-thumb-for-mongodb-schema-design</pre></td></tr>
<tr><td>3</td><td>Modeling One-to-Few / • This is for situations where you have maybe 2 to 20 items.</td><td>where, document, one-to-few</td><td><pre>• Embed the document directly, especially if:</pre></td><td><pre>Modeling One-to-Few

• This is for situations where you have maybe 2 to 20 items.
• Embed the document directly, especially if:
   • You won’t search frequently for items in the embedded documents
   • The same data isn’t required for multiple other documents.
• Example:
   • Multiple patient addresses</pre></td></tr>
<tr><td>4</td><td>Modeling One-To-Many / • When to use this approach:</td><td>relationship, collection, document, array, one-to-many</td><td><pre>• You need to maintain relationships, but you don’t need to load all child data every
• A patient may have many visits, but these visits are stored in a separate collection
because a patient might have hundreds or thousands of visits over time.</pre></td><td><pre>Modeling One-To-Many

• When to use this approach:
  • This approach is used when you have less than a few thousand records.
  • You need to maintain relationships, but you don’t need to load all child data every
     time you access the parent document.
• The main document contains references to the child document as an array.
Example:
   • A patient may have many visits, but these visits are stored in a separate collection
     because a patient might have hundreds or thousands of visits over time.


                                           VISITS collection:                   Why use references?
    PATIENTS collection:                                                        • The number of visits
                                                                                  can grow over time.</pre></td></tr>
<tr><td>5</td><td>Modeling One-to-Squillions / • When to use this approach:</td><td>SQL, entity, foreign key, collection, document, array, one-to-squillions</td><td><pre>• When the number of child records is extremely large, it is better to emulate the SQL
• Instead of storing an array of references in the parent document (which could grow
very large), you place a reference to the parent document (e.g., patient_id) in the
large. However, we include it
here for comparison with the</pre></td><td><pre>Modeling One-to-Squillions

   •   When to use this approach:
        • When the number of child records is extremely large, it is better to emulate the SQL
          approach by putting the foreign key in the other table.
   •   Instead of storing an array of references in the parent document (which could grow
       very large), you place a reference to the parent document (e.g., patient_id) in the
       child documents (e.g., visits), allowing each child document to be a standalone
       entity.
                                                                                       This approach doesn&#x27;t apply to
PATIENTS collection:                     VISITS collection:                            the medical clinic scenario, as
                                                                                       the number of visits for each
                                                                                       patient is not exceptionally
                                                                                       large. However, we include it
                                                                                       here for comparison with the
                                                                                       previous approach.</pre></td></tr>
<tr><td>6</td><td>Why Have Multiple Ways? / • MongoDB documents have a limit.</td><td>MongoDB, document, 16MB</td><td><pre>None explicit</pre></td><td><pre>Why Have Multiple Ways?

• MongoDB documents have a limit.
• Currently this is 16MB/document.
• Limitation is done to make sure that a single document doesn’t use
  too much RAM or bandwidth during synchronization between cluster
  nodes.</pre></td></tr>
<tr><td>7</td><td>Embedding vs Referencing / Embedding</td><td>operation, atomic, document, embedding, referencing, 16MB</td><td><pre>Embedding vs Referencing
Embedding
Referencing</pre></td><td><pre>Embedding vs Referencing

Embedding
• + All relevant information in a single query.
• + Can perform atomic operations.
• - Overhead if you don’t need all the document content
• - 16MB limit
Referencing
• + Smaller documents
• + Infreqently accessed data not needed on each query
• + Reduces duplicated data
• - May require multiple queries</pre></td></tr>
<tr><td>8</td><td>General Rules / •Rule 1: Favor embedding unless there is a compelling reason not</td><td>performance, document, embedding</td><td><pre>•Rule 1: Favor embedding unless there is a compelling reason not
Good Use of Embedding
Embedding comments in a blog post makes
Bad Use of Embedding
Embedding thousands of employee</pre></td><td><pre>General Rules
•Rule 1: Favor embedding unless there is a compelling reason not
to.
Good Use of Embedding
A blog post that has a few comments.
Embedding comments in a blog post makes
sense as they are often accessed together




Bad Use of Embedding
Embedding thousands of employee
records in a company document can
result in large files and performance
issues.</pre></td></tr>
<tr><td>9</td><td>General Rules / •Rule 2: Needing to access an object on its own is a compelling</td><td>product, collection, embedding</td><td><pre>reason not to embed it.
reference them in the order.
Embedding a product inside</pre></td><td><pre>General Rules
•Rule 2: Needing to access an object on its own is a compelling
reason not to embed it.
                                 Better approach: store products in a separate collection and
                                 reference them in the order.




 Embedding a product inside
 each order duplicate product
 details, making independent
 product queries inefficient.</pre></td></tr>
<tr><td>10</td><td>General Rules / •Rule 3: Avoid joins and lookups, if possible, but don&#x27;t be afraid if</td><td>product, join, min, view, document, embedding</td><td><pre>•Rule 3: Avoid joins and lookups, if possible, but don&#x27;t be afraid if
For a large retail store, reference the products and use a
Embedding the menu in the</pre></td><td><pre>General Rules
•Rule 3: Avoid joins and lookups, if possible, but don&#x27;t be afraid if
they can provide a better schema design.
                                     Using References for Better Schema Design (Lookups)
                                           For a large retail store, reference the products and use a
 Embedding the menu in the
                                           lookup for more flexible querying.
 restaurant document works well
 as it eliminates the need for
 lookups when viewing the menu.</pre></td></tr>
<tr><td>11</td><td>General Rules / •Rule 4: Arrays should not grow without bound. If there are more</td><td>cardinality, collection, document, array, embedding</td><td><pre>embed them; if there are more than a few thousand documents on
cardinality arrays are a compelling reason not to embed.
Bad Use of Embedding Better Approach:
post document can cause it to grow too large collection and reference them</pre></td><td><pre>General Rules
•Rule 4: Arrays should not grow without bound. If there are more
than a couple of hundred documents on the many side, don&#x27;t
embed them; if there are more than a few thousand documents on
the many side, don&#x27;t use an array of ObjectID references. High-
cardinality arrays are a compelling reason not to embed.

Bad Use of Embedding                           Better Approach:
Storing thousands of blog comments in the      Store comments in a separate
post document can cause it to grow too large   collection and reference them
over time, leading to inefficiency.            in the post for hundreds of
                                               comments.</pre></td></tr>
<tr><td>12</td><td>General Rules / •Rule 5: As always, with MongoDB, how you model your data</td><td>MongoDB, update, embedding, referencing</td><td><pre>embedding is likely better.
 If data is often queried or updated independently, referencing is a</pre></td><td><pre>General Rules
•Rule 5: As always, with MongoDB, how you model your data
depends entirely on your particular application&#x27;s data access
patterns. You want to structure your data to match the ways that
your application queries and updates it.

    If your application frequently accesses related data together,
     embedding is likely better.
    If data is often queried or updated independently, referencing is a
     better approach.</pre></td></tr>
<tr><td>13</td><td>Recap: for the “N” side of the One-to-N /  Embed the N side if the cardinality is one-to-few and there is no need</td><td>cardinality, embedded object, array, one-to-few, one-to-many, one-to-squillions</td><td><pre> Embed the N side if the cardinality is one-to-few and there is no need
 Use an array of references to the N-side objects if the cardinality is
 Use a reference to the One-side in the N-side objects if the cardinality</pre></td><td><pre>Recap: for the “N” side of the One-to-N

   Embed the N side if the cardinality is one-to-few and there is no need
    to access the embedded object outside the context of the parent
    object.
   Use an array of references to the N-side objects if the cardinality is
    one-to-many or if the N-side objects should stand alone for any
    reasons.
   Use a reference to the One-side in the N-side objects if the cardinality
    is one-to-squillions.</pre></td></tr>
</tbody>
</table>

## 24. L5.7 - Indexes in MongoDB

Pages: 6.

<table>
<thead><tr><th>Page</th><th>Slide focus / heading</th><th>Comparison anchors detected on this slide</th><th>Direct comparison / relationship lines from slide</th><th>Lossless extracted slide text</th></tr></thead>
<tbody>
<tr><td>1</td><td>MongoDB / Indexes</td><td>MongoDB, index</td><td><pre>None explicit</pre></td><td><pre>MongoDB
 Indexes


           www.udst.edu.qa</pre></td></tr>
<tr><td>2</td><td>Indexes / • Searching for a document given the _id is quick but all other queries</td><td>MongoDB, index, performance, document, compound, multikey, geospatial</td><td><pre>• Searching for a document given the _id is quick but all other queries
• MongoDB supports many types of indexes:</pre></td><td><pre>Indexes

• Searching for a document given the _id is quick but all other queries
  will result in a full document scan.
• Indexes can be built on other fiels to improve the performance.
• MongoDB supports many types of indexes:
   • Single field
   • Compound
   • Multikey
   • Geospatial
   • Text</pre></td></tr>
<tr><td>3</td><td>Explain / • MongoDB has an explain command but it is somewhat tricky to write</td><td>MongoDB, explain</td><td><pre>• MongoDB has an explain command but it is somewhat tricky to write</pre></td><td><pre>Explain

• MongoDB has an explain command but it is somewhat tricky to write
  and interpret.
• MongoDB Compass has an easy to use interface!</pre></td></tr>
<tr><td>4</td><td>Creating Single Field Indexes / • Indexes can be created in either increasing or decreasing values.</td><td>index, value</td><td><pre>This is useful if you need to sort but otherwise single searching will</pre></td><td><pre>Creating Single Field Indexes

• Indexes can be created in either increasing or decreasing values.
  This is useful if you need to sort but otherwise single searching will
  be the same.</pre></td></tr>
<tr><td>5</td><td>Result of Explain with Index</td><td>index, explain</td><td><pre>None explicit</pre></td><td><pre>Result of Explain with Index</pre></td></tr>
<tr><td>6</td><td>Index Options / • unique: make sure that each item appears only once in a collection</td><td>unique, index, collection, document, unique, expireAfterSeconds</td><td><pre>None explicit</pre></td><td><pre>Index Options

• unique: make sure that each item appears only once in a collection
• name: give a name to make it easier to manage
• expireAfterSeconds: documents vanish after so many seconds</pre></td></tr>
</tbody>
</table>

## 25. T4.1 - DDL

Pages: 6.

<table>
<thead><tr><th>Page</th><th>Slide focus / heading</th><th>Comparison anchors detected on this slide</th><th>Direct comparison / relationship lines from slide</th><th>Lossless extracted slide text</th></tr></thead>
<tbody>
<tr><td>1</td><td>Tutorial / Data Definition Language</td><td>None explicit</td><td><pre>None explicit</pre></td><td><pre>Tutorial
Data Definition Language
    (Creating Tables)

                           www.udst.edu.qa</pre></td></tr>
<tr><td>2</td><td>MySQL Workbench Symbols</td><td>SQL, MySQL, Workbench</td><td><pre>None explicit</pre></td><td><pre>MySQL Workbench Symbols</pre></td></tr>
<tr><td>3</td><td>Order Is Important! / • You will not be able to create any table with a foreign key until after</td><td>foreign key, delete</td><td><pre>None explicit</pre></td><td><pre>Order Is Important!

• You will not be able to create any table with a foreign key until after
  the other tables are done.
• Likewise you cannot delete any table that a foreign key refers to until
  the table with the foreign key is removed.</pre></td></tr>
<tr><td>4</td><td>Drop Tables / • Using an “if exists” clause in the drop table will probably help you.</td><td>drop table</td><td><pre>None explicit</pre></td><td><pre>Drop Tables

• Using an “if exists” clause in the drop table will probably help you.
• drop table if exists student;</pre></td></tr>
<tr><td>5</td><td>Be Careful with Relationships / • Creating a relationship automatically inserts a foreign key.</td><td>attribute, relationship, foreign key, insert</td><td><pre>• Creating a relationship automatically inserts a foreign key.
• Hint: Do not create the foreign keys, just create the relationship and</pre></td><td><pre>Be Careful with Relationships

• Creating a relationship automatically inserts a foreign key.
• You might end up with extra attributes that you don’t want on a table.
• Hint: Do not create the foreign keys, just create the relationship and
  let the foreign key be inserted automatically.</pre></td></tr>
<tr><td>6</td><td>Run the Script / • Making a change to the SQL file does not change the database!</td><td>SQL, BASE</td><td><pre>• Making a change to the SQL file does not change the database!</pre></td><td><pre>Run the Script

• Making a change to the SQL file does not change the database!
• You must execute the script to make the database change.</pre></td></tr>
</tbody>
</table>
