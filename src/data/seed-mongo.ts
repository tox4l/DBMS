export const EXTENDED_MONGO_SEED = {
  patients: [
    { _id: 232, first_name: "Mohammed", last_name: "Al Walkra", phone: "4431-1132", date_of_birth: "1990-01-01" },
    { _id: 334, first_name: "Fatima", last_name: "Shamal", phone: "5554-1123", date_of_birth: "1995-05-15" },
    { _id: 400, first_name: "Test", last_name: "Subject", phone: "5555-1111", date_of_birth: "2000-10-10" }
  ],
  doctors: [
    { _id: 1, name: "Dr. Smith", specialty: "Cardiology" },
    { _id: 2, name: "Dr. Jones", specialty: "Neurology" }
  ],
  appointments: [
    { _id: 1, pid: 232, doctor: 1, start_time: "2026-05-01 10:00:00", duration: 30 },
    { _id: 2, pid: 334, doctor: 2, start_time: "2026-05-02 14:00:00", duration: 45 }
  ],
  products: [
    { _id: 1, name: "Ajax Soap", regular_price: 5.99, attribute1: "L" },
    { _id: 2, name: "Bleach", regular_price: 3.99, attribute1: "M" },
    { _id: 3, name: "Ajax Cleaner", regular_price: 15.00, attribute1: "L" }
  ],
  // University Schema (Nested & Arrays where appropriate)
  departments: [
    { _id: 1, name: "Computer Science", building: "Turing Hall", budget: 1500000 },
    { _id: 2, name: "Mathematics", building: "Euler Building", budget: 800000 },
    { _id: 3, name: "Physics", building: "Newton Lab", budget: 1200000 }
  ],
  instructors: [
    { _id: 101, name: "Dr. Alan Turing", email: "alan@univ.edu", department_id: 1, salary: 120000, hire_date: "2015-08-01" },
    { _id: 102, name: "Dr. Grace Hopper", email: "grace@univ.edu", department_id: 1, salary: 115000, hire_date: "2016-01-15" },
    { _id: 103, name: "Dr. John Nash", email: "john@univ.edu", department_id: 2, salary: 105000, hire_date: "2018-09-01" }
  ],
  courses: [
    { _id: 1001, name: "Intro to Programming", credits: 3, department_id: 1, instructor_id: 101 },
    { _id: 1002, name: "Data Structures", credits: 4, department_id: 1, instructor_id: 102 },
    { _id: 1003, name: "Calculus I", credits: 4, department_id: 2, instructor_id: 103 },
    { _id: 1004, name: "Database Systems", credits: 3, department_id: 1, instructor_id: 101 }
  ],
  students: [
    { 
      _id: 2001, name: "Alice Smith", email: "alice@student.edu", dob: "2004-05-14", major: "Computer Science", gpa: 3.8,
      enrollments: [
        { course_id: 1001, semester: "Fall 2024", grade: "A" },
        { course_id: 1002, semester: "Fall 2024", grade: "B" }
      ]
    },
    { 
      _id: 2002, name: "Bob Johnson", email: "bob@student.edu", dob: "2003-11-22", major: "Mathematics", gpa: 3.2,
      enrollments: [
        { course_id: 1003, semester: "Fall 2024", grade: "A" }
      ]
    },
    { 
      _id: 2003, name: "Charlie Brown", email: "charlie@student.edu", dob: "2005-01-10", major: "Physics", gpa: 2.9,
      enrollments: []
    },
    { 
      _id: 2004, name: "Diana Prince", email: "diana@student.edu", dob: "2004-08-30", major: "Computer Science", gpa: 4.0,
      enrollments: [
        { course_id: 1004, semester: "Fall 2024", grade: "A" }
      ]
    },
    { 
      _id: 2005, name: "Evan Wright", email: "evan@student.edu", dob: "2002-12-05", major: "Mathematics", gpa: 3.5,
      enrollments: [
        { course_id: 1003, semester: "Spring 2024", grade: "C" }
      ]
    }
  ],
  // Company Schema
  employees: [
    { _id: 1, name: "Sarah Boss", dept_id: 10, salary: 150000, hire_date: "2018-01-15", projects: [{ project_id: 100, hours: 20, role: "Manager" }] },
    { _id: 2, name: "Mike Coder", dept_id: 10, manager_id: 1, salary: 95000, hire_date: "2020-03-10", projects: [{ project_id: 100, hours: 150, role: "Developer" }] },
    { _id: 3, name: "Anna Design", dept_id: 20, salary: 110000, hire_date: "2019-07-22", projects: [{ project_id: 100, hours: 80, role: "Designer" }] },
    { _id: 4, name: "Tom Market", dept_id: 20, manager_id: 3, salary: 85000, hire_date: "2021-11-01", projects: [] },
    { _id: 5, name: "Nina Dev", dept_id: 10, manager_id: 1, salary: 90000, hire_date: "2022-02-14", projects: [{ project_id: 200, hours: 200, role: "Lead Dev" }] }
  ],
  comp_departments: [
    { _id: 10, name: "Engineering", location: "New York", budget: 5000000 },
    { _id: 20, name: "Marketing", location: "London", budget: 2000000 }
  ],
  company_projects: [
    { _id: 100, name: "Website Redesign", start_date: "2024-01-01", end_date: "2024-06-30", budget: 100000 },
    { _id: 200, name: "Mobile App", start_date: "2024-03-01", end_date: "2024-12-31", budget: 250000 }
  ],
  // E-Commerce Schema (Nested OrderItems)
  customers: [
    { _id: 1, name: "John Doe", email: "john@gmail.com", location: { city: "Seattle", country: "USA" } },
    { _id: 2, name: "Jane Smith", email: "jane@yahoo.com", location: { city: "Toronto", country: "Canada" } },
    { _id: 3, name: "Ali Khan", email: "ali@hotmail.com", location: { city: "Doha", country: "Qatar" } }
  ],
  ecommerce_products: [
    { _id: 101, name: "Laptop", category: "Electronics", price: 1200.00, stock: 50 },
    { _id: 102, name: "Mouse", category: "Electronics", price: 25.00, stock: 200 },
    { _id: 103, name: "Desk Chair", category: "Furniture", price: 150.00, stock: 30 },
    { _id: 104, name: "Headphones", category: "Electronics", price: 80.00, stock: 100 }
  ],
  orders: [
    { 
      _id: 1001, customer_id: 1, order_date: "2024-04-10", total_amount: 1225.00, status: "Shipped",
      items: [
        { product_id: 101, quantity: 1, unit_price: 1200.00 },
        { product_id: 102, quantity: 1, unit_price: 25.00 }
      ]
    },
    { 
      _id: 1002, customer_id: 3, order_date: "2024-04-12", total_amount: 150.00, status: "Processing",
      items: [
        { product_id: 103, quantity: 1, unit_price: 150.00 }
      ]
    }
  ]
};
