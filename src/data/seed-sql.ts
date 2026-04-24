export const EXTENDED_SEED_SCHEMA = `
-- ==========================================
-- EXISTING TABLES (Hotel / Clinic / Products)
-- ==========================================
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

-- ==========================================
-- 1. UNIVERSITY DATABASE
-- ==========================================
CREATE TABLE Departments (
    DepartmentID INT PRIMARY KEY,
    DeptName VARCHAR(100),
    Building VARCHAR(50),
    Budget DECIMAL(15,2)
);

CREATE TABLE Instructors (
    InstructorID INT PRIMARY KEY,
    Name VARCHAR(100),
    Email VARCHAR(100),
    DepartmentID INT,
    Salary DECIMAL(10,2),
    HireDate DATE,
    FOREIGN KEY (DepartmentID) REFERENCES Departments(DepartmentID)
);

CREATE TABLE Courses (
    CourseID INT PRIMARY KEY,
    CourseName VARCHAR(100),
    Credits INT,
    DepartmentID INT,
    InstructorID INT,
    FOREIGN KEY (DepartmentID) REFERENCES Departments(DepartmentID),
    FOREIGN KEY (InstructorID) REFERENCES Instructors(InstructorID)
);

CREATE TABLE Students (
    StudentID INT PRIMARY KEY,
    Name VARCHAR(100),
    Email VARCHAR(100),
    DOB DATE,
    Major VARCHAR(50),
    GPA DECIMAL(3,2),
    EnrollmentDate DATE
);

CREATE TABLE Enrollments (
    EnrollmentID INT PRIMARY KEY,
    StudentID INT,
    CourseID INT,
    Semester VARCHAR(20),
    Grade VARCHAR(2),
    FOREIGN KEY (StudentID) REFERENCES Students(StudentID),
    FOREIGN KEY (CourseID) REFERENCES Courses(CourseID)
);

-- Seed University Data
INSERT INTO Departments VALUES (1, 'Computer Science', 'Turing Hall', 1500000);
INSERT INTO Departments VALUES (2, 'Mathematics', 'Euler Building', 800000);
INSERT INTO Departments VALUES (3, 'Physics', 'Newton Lab', 1200000);

INSERT INTO Instructors VALUES (101, 'Dr. Alan Turing', 'alan@univ.edu', 1, 120000, '2015-08-01');
INSERT INTO Instructors VALUES (102, 'Dr. Grace Hopper', 'grace@univ.edu', 1, 115000, '2016-01-15');
INSERT INTO Instructors VALUES (103, 'Dr. John Nash', 'john@univ.edu', 2, 105000, '2018-09-01');

INSERT INTO Courses VALUES (1001, 'Intro to Programming', 3, 1, 101);
INSERT INTO Courses VALUES (1002, 'Data Structures', 4, 1, 102);
INSERT INTO Courses VALUES (1003, 'Calculus I', 4, 2, 103);
INSERT INTO Courses VALUES (1004, 'Database Systems', 3, 1, 101);

INSERT INTO Students VALUES (2001, 'Alice Smith', 'alice@student.edu', '2004-05-14', 'Computer Science', 3.8, '2023-09-01');
INSERT INTO Students VALUES (2002, 'Bob Johnson', 'bob@student.edu', '2003-11-22', 'Mathematics', 3.2, '2022-09-01');
INSERT INTO Students VALUES (2003, 'Charlie Brown', 'charlie@student.edu', '2005-01-10', 'Physics', 2.9, '2024-09-01');
INSERT INTO Students VALUES (2004, 'Diana Prince', 'diana@student.edu', '2004-08-30', 'Computer Science', 4.0, '2023-09-01');
INSERT INTO Students VALUES (2005, 'Evan Wright', 'evan@student.edu', '2002-12-05', 'Mathematics', 3.5, '2021-09-01');

INSERT INTO Enrollments VALUES (3001, 2001, 1001, 'Fall 2024', 'A');
INSERT INTO Enrollments VALUES (3002, 2001, 1002, 'Fall 2024', 'B');
INSERT INTO Enrollments VALUES (3003, 2002, 1003, 'Fall 2024', 'A');
INSERT INTO Enrollments VALUES (3004, 2004, 1004, 'Fall 2024', 'A');
INSERT INTO Enrollments VALUES (3005, 2005, 1003, 'Spring 2024', 'C');

-- ==========================================
-- 2. COMPANY DATABASE
-- ==========================================
CREATE TABLE CompDepartments (
    DeptID INT PRIMARY KEY,
    DeptName VARCHAR(50),
    Location VARCHAR(50),
    Budget DECIMAL(15,2)
);

CREATE TABLE Employees (
    EmpID INT PRIMARY KEY,
    Name VARCHAR(100),
    DeptID INT,
    ManagerID INT,
    Salary DECIMAL(10,2),
    HireDate DATE,
    FOREIGN KEY (DeptID) REFERENCES CompDepartments(DeptID)
);

CREATE TABLE Projects (
    ProjectID INT PRIMARY KEY,
    ProjectName VARCHAR(100),
    StartDate DATE,
    EndDate DATE,
    Budget DECIMAL(15,2)
);

CREATE TABLE EmpProjects (
    EmpID INT,
    ProjectID INT,
    HoursWorked INT,
    Role VARCHAR(50),
    PRIMARY KEY (EmpID, ProjectID),
    FOREIGN KEY (EmpID) REFERENCES Employees(EmpID),
    FOREIGN KEY (ProjectID) REFERENCES Projects(ProjectID)
);

-- Seed Company Data
INSERT INTO CompDepartments VALUES (10, 'Engineering', 'New York', 5000000);
INSERT INTO CompDepartments VALUES (20, 'Marketing', 'London', 2000000);

INSERT INTO Employees VALUES (1, 'Sarah Boss', 10, NULL, 150000, '2018-01-15');
INSERT INTO Employees VALUES (2, 'Mike Coder', 10, 1, 95000, '2020-03-10');
INSERT INTO Employees VALUES (3, 'Anna Design', 20, NULL, 110000, '2019-07-22');
INSERT INTO Employees VALUES (4, 'Tom Market', 20, 3, 85000, '2021-11-01');
INSERT INTO Employees VALUES (5, 'Nina Dev', 10, 1, 90000, '2022-02-14');

INSERT INTO Projects VALUES (100, 'Website Redesign', '2024-01-01', '2024-06-30', 100000);
INSERT INTO Projects VALUES (200, 'Mobile App', '2024-03-01', '2024-12-31', 250000);

INSERT INTO EmpProjects VALUES (1, 100, 20, 'Manager');
INSERT INTO EmpProjects VALUES (2, 100, 150, 'Developer');
INSERT INTO EmpProjects VALUES (3, 100, 80, 'Designer');
INSERT INTO EmpProjects VALUES (5, 200, 200, 'Lead Dev');

-- ==========================================
-- 3. E-COMMERCE DATABASE
-- ==========================================
CREATE TABLE Customers (
    CustomerID INT PRIMARY KEY,
    Name VARCHAR(100),
    Email VARCHAR(100),
    City VARCHAR(50),
    Country VARCHAR(50)
);

CREATE TABLE EProducts (
    ProductID INT PRIMARY KEY,
    Name VARCHAR(100),
    Category VARCHAR(50),
    Price DECIMAL(10,2),
    Stock INT
);

CREATE TABLE Orders (
    OrderID INT PRIMARY KEY,
    CustomerID INT,
    OrderDate DATE,
    TotalAmount DECIMAL(10,2),
    Status VARCHAR(20),
    FOREIGN KEY (CustomerID) REFERENCES Customers(CustomerID)
);

CREATE TABLE OrderItems (
    ItemID INT PRIMARY KEY,
    OrderID INT,
    ProductID INT,
    Quantity INT,
    UnitPrice DECIMAL(10,2),
    FOREIGN KEY (OrderID) REFERENCES Orders(OrderID),
    FOREIGN KEY (ProductID) REFERENCES EProducts(ProductID)
);

-- Seed E-Commerce Data
INSERT INTO Customers VALUES (1, 'John Doe', 'john@gmail.com', 'Seattle', 'USA');
INSERT INTO Customers VALUES (2, 'Jane Smith', 'jane@yahoo.com', 'Toronto', 'Canada');
INSERT INTO Customers VALUES (3, 'Ali Khan', 'ali@hotmail.com', 'Doha', 'Qatar');

INSERT INTO EProducts VALUES (101, 'Laptop', 'Electronics', 1200.00, 50);
INSERT INTO EProducts VALUES (102, 'Mouse', 'Electronics', 25.00, 200);
INSERT INTO EProducts VALUES (103, 'Desk Chair', 'Furniture', 150.00, 30);
INSERT INTO EProducts VALUES (104, 'Headphones', 'Electronics', 80.00, 100);

INSERT INTO Orders VALUES (1001, 1, '2024-04-10', 1225.00, 'Shipped');
INSERT INTO Orders VALUES (1002, 3, '2024-04-12', 150.00, 'Processing');

INSERT INTO OrderItems VALUES (1, 1001, 101, 1, 1200.00);
INSERT INTO OrderItems VALUES (2, 1001, 102, 1, 25.00);
INSERT INTO OrderItems VALUES (3, 1002, 103, 1, 150.00);
`;
