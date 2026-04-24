"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { TextHighlighter } from "@/components/ui/TextHighlighter";
import { InlineSqlSandbox } from "@/components/sandbox/InlineSqlSandbox";
import { Database, Lock, Unlock, CheckCircle2, Trophy, ArrowRight, ShieldCheck } from "lucide-react";
import { clsx } from "clsx";

const STAGES = [
  {
    id: 1,
    title: "The Core SELECT",
    description: "Filtering, sorting, and projecting data. The bread and butter of SQL.",
    challenge: "We need the names and emails of all Computer Science students who were born after 2003, sorted by their GPA from highest to lowest.",
    expectedQuery: "SELECT Name, Email FROM Students WHERE Major = 'Computer Science' AND DOB > '2003-12-31' ORDER BY GPA DESC;"
  },
  {
    id: 2,
    title: "JOIN Operations",
    description: "Combining tables using INNER, LEFT, and RIGHT JOINs.",
    challenge: "List all Instructors and their Department Names. You must include instructors even if they don't belong to a department (use LEFT JOIN).",
    expectedQuery: "SELECT Instructors.Name, Departments.DeptName FROM Instructors LEFT JOIN Departments ON Instructors.DepartmentID = Departments.DepartmentID;"
  },
  {
    id: 3,
    title: "Aggregation & Grouping",
    description: "GROUP BY and HAVING clauses.",
    challenge: "Find the total number of students enrolled in each course semester. Show Semester and the count of students, only for semesters with more than 1 student.",
    expectedQuery: "SELECT Semester, COUNT(StudentID) as StudentCount FROM Enrollments GROUP BY Semester HAVING COUNT(StudentID) > 1;"
  },
  {
    id: 4,
    title: "Subqueries",
    description: "Queries inside queries.",
    challenge: "Find the names of all Employees who work in the 'Engineering' department using a subquery (do not use JOIN).",
    expectedQuery: "SELECT Name FROM Employees WHERE DeptID = (SELECT DeptID FROM CompDepartments WHERE DeptName = 'Engineering');"
  },
  {
    id: 5,
    title: "Data Modification",
    description: "INSERT, UPDATE, DELETE and Transactions.",
    challenge: "Give all employees in the Engineering department (DeptID = 10) a 10% raise. Write the UPDATE query.",
    expectedQuery: "UPDATE Employees SET Salary = Salary * 1.1 WHERE DeptID = 10; SELECT Name, Salary FROM Employees WHERE DeptID = 10;"
    // Note: sql.js supports multiple statements, returning the last one's results. We add a SELECT so the sandbox can validate the output.
  },
  {
    id: 6,
    title: "Views & Indexes",
    description: "Virtual tables and performance optimization.",
    challenge: "Create a View named 'TopStudents' containing students with a GPA >= 3.5. Then SELECT * from it.",
    expectedQuery: "CREATE VIEW TopStudents AS SELECT * FROM Students WHERE GPA >= 3.5; SELECT * FROM TopStudents;"
  }
];

export default function SqlMasteryPage() {
  const { sqlMasteryProgress, recordSqlMasteryScore } = useAppStore();

  const [activeStage, setActiveStage] = useState<number | null>(1);

  // Helper to check if a stage is unlocked
  const isUnlocked = (stageId: number) => {
    if (stageId === 1) return true;
    const prevScore = sqlMasteryProgress[stageId - 1] || 0;
    return prevScore >= 70;
  };

  const handleSandboxSuccess = (stageId: number, score: number) => {
    recordSqlMasteryScore(stageId, score);
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8 lg:p-12 max-w-[98%] mx-auto space-y-12">

      {/* Header */}
      <div className="space-y-6 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary font-bold tracking-widest text-sm uppercase">
          <Database className="w-4 h-4" /> Curriculum Path
        </div>
        <h1 className="text-5xl md:text-7xl font-black font-outfit tracking-tight">
          SQL <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500 text-glow">Mastery</span>
        </h1>
        <p className="text-xl text-zinc-400 font-inter">
          A structured, 6-stage progression from basic queries to advanced database tuning.
          <span className="block mt-2 font-bold text-amber-500">Pass each stage with 70% to unlock the next.</span>
        </p>
      </div>

      {/* Stages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {STAGES.map((stage) => {
          const unlocked = isUnlocked(stage.id);
          const score = sqlMasteryProgress[stage.id] || 0;
          const passed = score >= 70;
          const active = activeStage === stage.id;

          return (
            <div
              key={stage.id}
              onClick={() => unlocked && setActiveStage(stage.id)}
              className={clsx(
                "relative p-6 rounded-2xl border transition-all duration-300",
                unlocked ? "cursor-pointer hover:border-primary/50 bg-zinc-900/50" : "opacity-50 grayscale cursor-not-allowed bg-zinc-900/20 border-white/5",
                active ? "border-primary shadow-[0_0_30px_rgba(14,165,233,0.15)] ring-1 ring-primary/50" : "border-white/10",
                passed && !active ? "border-green-500/30" : ""
              )}
            >
              <div className="absolute top-4 right-4">
                {!unlocked ? (
                  <Lock className="w-5 h-5 text-zinc-600" />
                ) : passed ? (
                  <CheckCircle2 className="w-6 h-6 text-green-500 drop-shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                ) : (
                  <Unlock className="w-5 h-5 text-primary opacity-50" />
                )}
              </div>

              <div className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">Stage {stage.id}</div>
              <h3 className="text-xl font-bold font-outfit mb-2 text-white">{stage.title}</h3>
              <p className="text-sm text-zinc-400 mb-6 min-h-[40px]">{stage.description}</p>

              <div className="flex justify-between items-center text-sm font-bold">
                {unlocked ? (
                  <>
                    <span className={clsx(passed ? "text-green-500" : "text-primary")}>
                      {passed ? "COMPLETED" : "IN PROGRESS"}
                    </span>
                    <span className="text-zinc-300">{score}% Best</span>
                  </>
                ) : (
                  <span className="text-zinc-600 flex items-center gap-2">
                    Requires 70% in Stage {stage.id - 1}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Active Stage Content */}
      <AnimatePresence mode="wait">
        {activeStage !== null && (
          <motion.div
            key={activeStage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="p-1 rounded-3xl bg-gradient-to-b from-primary/30 to-transparent relative"
          >
            {/* Scroll anchor */}
            <div id="active-stage-anchor" className="absolute -top-24" />

            <div className="bg-black p-8 md:p-12 rounded-[22px] border border-white/5">
              <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">

                {/* Left Column: Challenge & Schema */}
                <div className="w-full lg:w-1/4 flex flex-col gap-6">
                  <div>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                        <ShieldCheck className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-black font-outfit text-white leading-tight">
                          Stage {activeStage}:<br />
                          <span className="text-primary">{STAGES[activeStage - 1].title}</span>
                        </h2>
                      </div>
                    </div>
                    <div className="p-5 bg-zinc-900/50 border border-white/10 rounded-2xl">
                      <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-widest mb-3">Challenge Question</h3>
                      <p className="text-white text-lg leading-relaxed"><TextHighlighter text={STAGES[activeStage - 1].challenge} /></p>
                    </div>
                  </div>

                  <div className="p-5 bg-zinc-900/50 border border-white/10 rounded-2xl flex-1 flex flex-col">
                    <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                      <Database className="w-4 h-4 text-amber-500" />
                      Schema Reference
                    </h3>
                    <div className="overflow-y-auto pr-2 custom-scrollbar space-y-6 max-h-[300px] lg:max-h-[500px]">
                      <div>
                        <span className="text-[#0ea5e9] font-bold text-sm block mb-1">University</span>
                        <ul className="text-xs text-zinc-400 font-mono space-y-1">
                          <li>Students(StudentID, Name, Email, DOB, Major, GPA, EnrollmentDate)</li>
                          <li>Courses(CourseID, CourseName, Credits, DepartmentID, InstructorID)</li>
                          <li>Instructors(InstructorID, Name, Email, DepartmentID, Salary, HireDate)</li>
                          <li>Departments(DepartmentID, DeptName, Building, Budget)</li>
                          <li>Enrollments(EnrollmentID, StudentID, CourseID, Semester, Grade)</li>
                        </ul>
                      </div>
                      <div>
                        <span className="text-purple-400 font-bold text-sm block mb-1">Company</span>
                        <ul className="text-xs text-zinc-400 font-mono space-y-1">
                          <li>Employees(EmpID, Name, DeptID, ManagerID, Salary, HireDate)</li>
                          <li>CompDepartments(DeptID, DeptName, Location, Budget)</li>
                          <li>Projects(ProjectID, ProjectName, StartDate, EndDate, Budget)</li>
                          <li>EmpProjects(EmpID, ProjectID, HoursWorked, Role)</li>
                        </ul>
                      </div>
                      <div>
                        <span className="text-amber-500 font-bold text-sm block mb-1">E-Commerce</span>
                        <ul className="text-xs text-zinc-400 font-mono space-y-1">
                          <li>Customers(CustomerID, Name, Email, City, Country)</li>
                          <li>Orders(OrderID, CustomerID, OrderDate, TotalAmount, Status)</li>
                          <li>EProducts(ProductID, Name, Category, Price, Stock)</li>
                          <li>OrderItems(ItemID, OrderID, ProductID, Quantity, UnitPrice)</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column: Sandbox */}
                <div className="w-full lg:w-3/4 flex flex-col min-w-0">
                  <div className="flex-1 bg-zinc-900/20 border border-white/5 rounded-2xl p-4 md:p-6 flex flex-col">
                    <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                      <Database className="w-5 h-5 text-amber-500" />
                      Interactive Query Sandbox
                    </h3>
                    <p className="text-zinc-400 mb-4 text-sm">Write your query below. We evaluate your code against an expected output dataset.</p>

                    <div className="flex-1 mt-0">
                      <InlineSqlSandbox
                        expectedQuery={STAGES[activeStage - 1].expectedQuery}
                        onSuccess={(score) => handleSandboxSuccess(activeStage, score)}
                        layout="vertical"
                        hideSchema={true}
                      />
                    </div>
                  </div>
                </div>

              </div>

              {/* Success State Overlay or Indicator could go here */}
              {(sqlMasteryProgress[activeStage] || 0) >= 70 && activeStage < 6 && (
                <div className="mt-8 flex justify-end">
                  <button
                    onClick={() => {
                      setActiveStage(activeStage + 1);
                      document.getElementById("active-stage-anchor")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="flex items-center gap-2 px-6 py-3 bg-green-500 text-black font-bold rounded-full hover:bg-green-400 transition-colors shadow-[0_0_30px_rgba(34,197,94,0.3)]"
                  >
                    Proceed to Stage {activeStage + 1}
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              )}
              {(sqlMasteryProgress[activeStage] || 0) >= 70 && activeStage === 6 && (
                <div className="mt-8 p-6 bg-amber-500/10 border border-amber-500/30 rounded-2xl flex flex-col items-center text-center">
                  <Trophy className="w-16 h-16 text-amber-500 mb-4" />
                  <h3 className="text-3xl font-black text-amber-500 text-glow">SQL MASTER RANK ACHIEVED</h3>
                  <p className="text-amber-200 mt-2">You have completed the entire curriculum path.</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
