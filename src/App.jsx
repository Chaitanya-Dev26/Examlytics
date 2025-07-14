import { Routes, Route, Navigate } from "react-router-dom"
import { useEffect, useState } from "react"
import supabase from "./SupabaseClient"
import { useAuth } from "./hooks/useAuth"
// Pages
import Login from "./Pages/Login"
import AdminDashboard from "./Pages/AdminDashboard"
import CreateExam from "./Pages/CreateExam"
import StudentExamPage from "./Pages/StudentExamPage"
import ExamIntro from "./Pages/ExamIntro"
import ExamAttempt from "./Pages/ExamAttempt"
import ExamBlocked from "./Pages/ExamBlocked";
import ExamStatusCheck from "./Components/ExamStatusCheck";
import Examdone from "./Pages/Examdone"
import ExamRedirect from "./Pages/ExamRedirect";
import Examcode from "./Pages/Examcode";
import LiveMonitoring from "./Components/LiveMonitoring";

function App() {
  console.log('App component rendering...');
  const { user, loading } = useAuth()
  const [role, setRole] = useState(null)
  const [roleLoading, setRoleLoading] = useState(true)

  useEffect(() => {
    console.log('Auth state changed - user:', user ? 'Logged in' : 'Not logged in');
    
    const fetchRole = async () => {
      if (!user) {
        console.log('No user, skipping role fetch');
        setRoleLoading(false);
        return;
      }
      
      console.log('Fetching role for user:', user.email);
      
      try {
        const { data, error } = await supabase
          .from("users")
          .select("role")
          .eq("email", user.email)
          .single()

        console.log('Role fetch result:', { data, error });

        if (error || !data) {
          console.log('User not found in users table, creating as student...');
          // If user not found in users table, add them as student
          const { error: insertError } = await supabase
            .from("users")
            .insert([{ email: user.email, role: "student" }]);
            
          if (insertError) {
            console.error('Error creating user:', insertError);
          }
          
          setRole("student")
        } else {
          console.log('User role found:', data.role);
          setRole(data.role)
        }
      } catch (err) {
        console.error('Error in fetchRole:', err);
      } finally {
        setRoleLoading(false);
      }
    }

    fetchRole()
  }, [user])

  console.log('App render state:', { loading, user, role, roleLoading });

  if (loading || roleLoading) {
    console.log('Showing loading state...');
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        flexDirection: 'column',
        gap: '20px'
      }}>
        <div style={{
          width: '50px',
          height: '50px',
          border: '5px solid #f3f3f3',
          borderTop: '5px solid #3498db',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}></div>
        <style>
          {`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}
        </style>
        <p>Loading application...</p>
      </div>
    );
  }
  
  if (!user) {
    console.log('No user, redirecting to login');
    return <Login />;
  }
  
  if (!role) {
    console.log('No role available, showing role loading state');
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        flexDirection: 'column'
      }}>
        <p>Loading your user role...</p>
        <p>If this takes too long, please refresh the page.</p>
      </div>
    );
  }

  return (
    <Routes>
      {/* Common Exam Routes */}
      <Route path="/exam/:id" element={<ExamStatusCheck />}>
        <Route index element={<ExamIntro />} />
        <Route path="attempt" element={<ExamAttempt />} />
        <Route path="blocked" element={<ExamBlocked />} />
      </Route>
      <Route path="/exam/attempt/:id" element={<ExamAttempt />} />
      {/* Exam Redirect Route */}
      <Route path="/exam-redirect" element={<ExamRedirect />} />
      {/* Exam Done Route */}
      <Route path="/examdone" element={<Examdone />} />

      {/* Admin Routes */}
      {role === "admin" && (
        <>
          <Route path="/" element={<Navigate to="/admin" replace />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/monitor/:examId" element={<AdminDashboard />} />
          <Route path="/monitor/:examId" element={<LiveMonitoring />} />
          <Route path="/create-exam" element={<CreateExam />} />
          <Route path="*" element={<Navigate to="/admin" replace />} />
        </>
      )}

      {/* Student Routes */}
      {role === "student" && (
        <>
          <Route path="/examcode" element={<Examcode />} />
          <Route path="/exam" element={<StudentExamPage />} />
          <Route path="/" element={<Navigate to="/examcode" replace />} />
          <Route path="*" element={<Navigate to="/examcode" replace />} />
        </>
      )}
    </Routes>
  )
}

export default App
