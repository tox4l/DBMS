"use client";

import { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { sql } from "@codemirror/lang-sql";
import { Play, CheckCircle, XCircle, Database, ChevronDown, ChevronUp } from "lucide-react";
import { executeAndValidate } from "@/lib/validation/sql-engine";
import { clsx } from "clsx";
import { TextHighlighter } from "@/components/ui/TextHighlighter";

interface Props {
  expectedQuery: string;
  onSuccess: (score: number) => void;
  title?: string;
  description?: string;
  layout?: "horizontal" | "vertical";
  hideSchema?: boolean;
}

export function InlineSqlSandbox({ 
  expectedQuery, 
  onSuccess, 
  title, 
  description, 
  layout = "horizontal", 
  hideSchema = false 
}: Props) {
  const [code, setCode] = useState("");
  const [result, setResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showSchema, setShowSchema] = useState(false);

  const handleExecute = async () => {
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 200));
    
    try {
      const res = await executeAndValidate(code, expectedQuery);
      setResult(res);
      if (res.isCorrect) {
        onSuccess(100);
      } else {
        onSuccess(0);
      }
    } catch (err: any) {
      setResult({ success: false, error: err.message, isCorrect: false });
      onSuccess(0);
    }
    
    setIsLoading(false);
  };

  return (
    <div className="bg-zinc-900/50 border border-white/10 rounded-2xl overflow-hidden mt-6">
      {(title || description) && (
        <div className="flex justify-between items-center p-4 border-b border-white/10 bg-black/50">
          <div>
            {title && <h4 className="font-bold text-white"><TextHighlighter text={title} /></h4>}
            {description && <p className="text-sm text-zinc-400"><TextHighlighter text={description} /></p>}
          </div>
          <button 
            onClick={handleExecute}
            disabled={isLoading || !code.trim()}
            className="flex items-center gap-2 px-4 py-2 bg-[#0ea5e9]/10 text-[#0ea5e9] hover:bg-[#0ea5e9]/20 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg font-bold transition-colors"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-[#0ea5e9] border-t-transparent rounded-full animate-spin" />
            ) : (
              <Play className="w-4 h-4" />
            )}
            RUN
          </button>
        </div>
      )}

      {/* Schema Toggle */}
      {!hideSchema && (
        <div className="bg-zinc-900 border-b border-white/10 px-4 py-2 flex items-center justify-between">
          <button 
            onClick={() => setShowSchema(!showSchema)}
            className="flex items-center gap-2 text-xs font-bold text-zinc-400 hover:text-white transition-colors"
          >
            <Database className="w-3.5 h-3.5" />
            SCHEMA REFERENCE
            {showSchema ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>
      )}

      {/* Schema Content */}
      {!hideSchema && showSchema && (
        <div className="bg-black/80 border-b border-white/10 p-4 max-h-[200px] overflow-y-auto text-xs font-mono text-zinc-400 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <span className="text-[#0ea5e9] font-bold">University</span>
            <ul className="mt-1 space-y-1">
              <li>Students(StudentID, Name, Email, DOB, Major, GPA, EnrollmentDate)</li>
              <li>Courses(CourseID, CourseName, Credits, DepartmentID, InstructorID)</li>
              <li>Instructors(InstructorID, Name, Email, DepartmentID, Salary, HireDate)</li>
              <li>Departments(DepartmentID, DeptName, Building, Budget)</li>
              <li>Enrollments(EnrollmentID, StudentID, CourseID, Semester, Grade)</li>
            </ul>
          </div>
          <div>
            <span className="text-purple-400 font-bold">Company</span>
            <ul className="mt-1 space-y-1">
              <li>Employees(EmpID, Name, DeptID, ManagerID, Salary, HireDate)</li>
              <li>CompDepartments(DeptID, DeptName, Location, Budget)</li>
              <li>Projects(ProjectID, ProjectName, StartDate, EndDate, Budget)</li>
              <li>EmpProjects(EmpID, ProjectID, HoursWorked, Role)</li>
            </ul>
          </div>
          <div>
            <span className="text-amber-500 font-bold">E-Commerce</span>
            <ul className="mt-1 space-y-1">
              <li>Customers(CustomerID, Name, Email, City, Country)</li>
              <li>Orders(OrderID, CustomerID, OrderDate, TotalAmount, Status)</li>
              <li>EProducts(ProductID, Name, Category, Price, Stock)</li>
              <li>OrderItems(ItemID, OrderID, ProductID, Quantity, UnitPrice)</li>
            </ul>
          </div>
        </div>
      )}

      {/* Action bar for when title/desc are hidden */}
      {!(title || description) && (
        <div className="bg-zinc-900 border-b border-white/10 px-4 py-2 flex justify-between items-center">
           <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Query Console</span>
           <button 
            onClick={handleExecute}
            disabled={isLoading || !code.trim()}
            className="flex items-center gap-2 px-3 py-1.5 bg-[#0ea5e9]/10 text-[#0ea5e9] hover:bg-[#0ea5e9]/20 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg font-bold text-xs transition-colors"
          >
            {isLoading ? (
              <div className="w-3 h-3 border-2 border-[#0ea5e9] border-t-transparent rounded-full animate-spin" />
            ) : (
              <Play className="w-3 h-3" />
            )}
            RUN QUERY
          </button>
        </div>
      )}
      
      <div className={clsx(
        "grid divide-white/10",
        layout === "horizontal" ? "grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x" : "grid-cols-1 divide-y"
      )}>
        <div className="h-[300px] overflow-hidden">
          <CodeMirror
            value={code}
            height="300px"
            extensions={[sql()]}
            theme="dark"
            onChange={(val) => setCode(val)}
            className="text-sm h-full"
            placeholder="-- Write your SQL query here..."
          />
        </div>
        
        <div className="h-[300px] overflow-auto p-4 bg-black/30">
          {!result ? (
            <div className="h-full flex items-center justify-center text-zinc-600 font-mono text-sm uppercase tracking-widest">
              Results terminal
            </div>
          ) : result.error ? (
            <div className="text-red-400 font-mono text-sm whitespace-pre-wrap break-words p-2 bg-red-500/5 border border-red-500/20 rounded-lg">
              {result.error}
            </div>
          ) : (
            <div className="space-y-6">
              <div className={clsx(
                "p-3 rounded-lg border flex items-center gap-2 font-bold text-sm sticky top-0 z-10 shadow-lg backdrop-blur-md",
                result.isCorrect ? "bg-green-500/10 border-green-500/30 text-green-500" : "bg-amber-500/10 border-amber-500/30 text-amber-500"
              )}>
                {result.isCorrect ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                {result.isCorrect ? "Query Matches Expected Result" : "Results Mismatch"}
              </div>
              
              <div className={clsx(
                "grid gap-6",
                !result.isCorrect && result.expected ? "grid-cols-1 xl:grid-cols-2" : "grid-cols-1"
              )}>
                {/* Your Result */}
                <div className="min-w-0">
                  <h4 className="text-[10px] font-bold text-zinc-500 mb-2 uppercase tracking-widest flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    Your Output
                  </h4>
                  {result.actual && result.actual.length > 0 && result.actual[result.actual.length - 1].columns ? (
                    <div className="overflow-x-auto border border-white/5 rounded-lg bg-white/[0.02]">
                      <table className="w-full text-[11px] text-left">
                        <thead className="text-[10px] text-zinc-400 uppercase bg-white/5 border-b border-white/10">
                          <tr>
                            {result.actual[result.actual.length - 1].columns.map((col: string, i: number) => (
                              <th key={i} className="px-3 py-1.5 font-medium whitespace-nowrap">{col}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 font-mono">
                          {result.actual[result.actual.length - 1].values.slice(0, 50).map((row: any[], i: number) => (
                            <tr key={i} className="hover:bg-white/5">
                              {row.map((cell: any, j: number) => (
                                <td key={j} className="px-3 py-1.5 text-zinc-300">
                                  {cell === null ? <span className="text-zinc-600 italic">NULL</span> : String(cell)}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="text-zinc-500 italic text-xs p-4 bg-white/5 rounded-lg border border-white/5">No rows returned.</div>
                  )}
                </div>

                {/* Expected Result - Only shown if incorrect */}
                {!result.isCorrect && result.expected && result.expected.length > 0 && result.expected[result.expected.length - 1].columns && (
                  <div className="min-w-0">
                    <h4 className="text-[10px] font-bold text-amber-500 mb-2 uppercase tracking-widest flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                      Target Output
                    </h4>
                    <div className="overflow-x-auto border border-amber-500/20 rounded-lg bg-amber-500/[0.02]">
                      <table className="w-full text-[11px] text-left">
                        <thead className="text-[10px] text-amber-500 uppercase bg-amber-500/10 border-b border-amber-500/20">
                          <tr>
                            {result.expected[result.expected.length - 1].columns.map((col: string, i: number) => (
                              <th key={i} className="px-3 py-1.5 font-medium whitespace-nowrap">{col}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-amber-500/10 font-mono">
                          {result.expected[result.expected.length - 1].values.slice(0, 50).map((row: any[], i: number) => (
                            <tr key={i} className="hover:bg-amber-500/5">
                              {row.map((cell: any, j: number) => (
                                <td key={j} className="px-3 py-1.5 text-amber-500/80">
                                  {cell === null ? <span className="text-amber-500/40 italic">NULL</span> : String(cell)}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
