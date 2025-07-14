import { useEffect, useState, useRef } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import supabase from "../SupabaseClient"
import Navbar from "../Components/common/Navbar"
import TestComponent from "../Components/TestComponent"
import LiveMonitoring from "../Components/LiveMonitoring"

import { toast } from "react-toastify"
import { FaLock, FaUnlock, FaEye, FaTrash, FaEdit, FaLink, FaCopy, FaVideo, FaArrowLeft } from "react-icons/fa"

// Modal component for viewing/editing questions
const QuestionModal = ({ exam, onClose, onSave }) => {
  const [editedQuestions, setEditedQuestions] = useState([...exam.questions])
  const [isSaving, setIsSaving] = useState(false)
  
  // Create a new empty question
  const createNewQuestion = (type = 'mcq') => ({
    question: '',
    type: type,
    optionA: type === 'mcq' ? '' : undefined,
    optionB: type === 'mcq' ? '' : undefined,
    optionC: type === 'mcq' ? '' : undefined,
    optionD: type === 'mcq' ? '' : undefined,
    correct_answer: type === 'mcq' ? 'A' : ''
  })

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...editedQuestions]
    updatedQuestions[index] = {
      ...updatedQuestions[index],
      [field]: value
    }
    setEditedQuestions(updatedQuestions)
  }

  const handleSave = async () => {
    try {
      setIsSaving(true)
      const { error } = await supabase
        .from('exams')
        .update({ questions: editedQuestions })
        .eq('id', exam.id)
      
      if (error) throw error
      onSave(editedQuestions)
      onClose()
    } catch (error) {
      console.error('Error updating questions:', error)
      alert('Failed to update questions. Please try again.')
    } finally {
      setIsSaving(false)
    }
  }

  if (!exam) return null

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Edit Questions: {exam.title}</h3>
          <button onClick={onClose} className="close-btn">&times;</button>
        </div>
        <div className="questions-container">
          {editedQuestions.map((q, index) => (
            <div key={index} className="question-card">
              {editedQuestions.length > 1 && (
                <button 
                  className="delete-question"
                  onClick={() => setEditedQuestions(editedQuestions.filter((_, i) => i !== index))}
                  title="Delete question"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    <line x1="10" y1="11" x2="10" y2="17"></line>
                    <line x1="14" y1="11" x2="14" y2="17"></line>
                  </svg>
                </button>
              )}
              <div className="form-group">
                <label>Question {index + 1}</label>
                <div className="question-type-toggle">
                  <button
                    type="button"
                    className={`toggle-btn ${q.type === 'mcq' ? 'active' : ''}`}
                    onClick={() => handleQuestionChange(index, 'type', 'mcq')}
                  >
                    MCQ
                  </button>
                  <button
                    type="button"
                    className={`toggle-btn ${q.type === 'answerable' ? 'active' : ''}`}
                    onClick={() => handleQuestionChange(index, 'type', 'answerable')}
                  >
                    Answerable
                  </button>
                </div>
                <input
                  type="text"
                  value={q.question}
                  onChange={(e) => handleQuestionChange(index, 'question', e.target.value)}
                  className="form-control"
                  placeholder="Enter your question here"
                />
              </div>

              {q.type === 'mcq' ? (
                <>
                  <div className="options-grid">
                    {['A', 'B', 'C', 'D'].map((opt) => (
                      <div key={opt} className="form-group">
                        <label>Option {opt}</label>
                        <input
                          type="text"
                          value={q[`option${opt}`] || ''}
                          onChange={(e) => handleQuestionChange(index, `option${opt}`, e.target.value)}
                          className={`form-control ${q.correct_answer === opt ? 'correct-answer' : ''}`}
                          placeholder={`Option ${opt}`}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="form-group">
                    <label>Correct Answer</label>
                    <select
                      value={q.correct_answer || 'A'}
                      onChange={(e) => handleQuestionChange(index, 'correct_answer', e.target.value)}
                      className="form-control"
                    >
                      {['A', 'B', 'C', 'D'].map(opt => (
                        <option key={opt} value={opt} disabled={!q[`option${opt}`]}>
                          {q[`option${opt}`] ? `Option ${opt}` : `Option ${opt} (empty)`}
                        </option>
                      ))}
                    </select>
                  </div>
                </>
              ) : (
                <div className="form-group">
                  <label>Expected Answer</label>
                  <textarea
                    value={q.correct_answer || ''}
                    onChange={(e) => handleQuestionChange(index, 'correct_answer', e.target.value)}
                    className="form-control"
                    rows="3"
                    placeholder="Enter the expected answer here"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="modal-actions">
          <div className="left-actions">
            <div className="add-question-container">
              <select 
                value=""
                onChange={(e) => {
                  if (e.target.value) {
                    setEditedQuestions([...editedQuestions, createNewQuestion(e.target.value)]);
                    e.target.value = ''; // Reset the select
                  }
                }}
                className="btn btn-add"
                style={{ appearance: 'none', paddingRight: '30px' }}
              >
                <option value="" disabled>Add Question</option>
                <option value="mcq">MCQ Question</option>
                <option value="answerable">Answerable Question</option>
              </select>
              <svg 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                style={{ marginLeft: '-24px', pointerEvents: 'none' }}
              >
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </div>
          </div>
          <div className="right-actions">
            <button onClick={onClose} className="btn btn-secondary">Cancel</button>
            <button onClick={handleSave} className="btn btn-primary" disabled={isSaving}>
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>
      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
          padding: 20px;
        }
        .modal-content {
          background: white;
          border-radius: 8px;
          width: 100%;
          max-width: 800px;
          max-height: 90vh;
          overflow-y: auto;
          padding: 20px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        }
        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          padding-bottom: 15px;
          border-bottom: 1px solid #eee;
        }
        .close-btn {
          background: none;
          border: none;
          font-size: 24px;
          cursor: pointer;
          color: #666;
        }
        .questions-container {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .question-card {
          background: #f9f9f9;
          padding: 15px;
          border-radius: 6px;
          border-left: 4px solid #4CAF50;
          position: relative;
        }
        
        .delete-question {
          position: absolute;
          top: 10px;
          right: 10px;
          background: #ffebee;
          border: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #c62828;
          padding: 0;
        }
        
        .delete-question:hover {
          background: #ffcdd2;
        }
        .form-group {
          margin-bottom: 15px;
        }
        .form-group label {
          display: block;
          margin-bottom: 5px;
          font-weight: 500;
          color: #333;
        }
        .form-control {
          width: 100%;
          padding: 8px 12px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 14px;
        }
        .form-control:focus {
          outline: none;
          border-color: #4CAF50;
          box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.2);
        }
        .options-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
          margin: 15px 0;
        }
        .correct-answer {
          border-color: #4CAF50;
          background-color: #f0f9f0;
        }
        .modal-actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 10px;
          margin-top: 20px;
          padding-top: 15px;
          border-top: 1px solid #eee;
        }
        
        .left-actions, .right-actions {
          display: flex;
          gap: 10px;
          align-items: center;
        }
        
        .add-question-container {
          position: relative;
          display: flex;
          align-items: center;
        }
        
        .question-type-toggle {
          display: flex;
          gap: 8px;
          margin-bottom: 10px;
        }
        
        .toggle-btn {
          flex: 1;
          padding: 6px 12px;
          border: 1px solid #ddd;
          background: #f5f5f5;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.2s;
        }
        
        .toggle-btn.active {
          background: #4CAF50;
          color: white;
          border-color: #45a049;
        }
        
        .btn-add {
          display: flex;
          align-items: center;
          gap: 6px;
          background: #2196F3;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 4px;
          cursor: pointer;
          transition: background 0.2s;
        }
        
        .btn-add:hover {
          background: #1976D2;
        }
        
        .btn-add svg {
          width: 16px;
          height: 16px;
        }
        .btn {
          padding: 8px 16px;
          border-radius: 4px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }
        .btn-primary {
          background: #4CAF50;
          color: white;
          border: none;
        }
        .btn-primary:hover {
          background: #45a049;
        }
        .btn-primary:disabled {
          background: #a5d6a7;
          cursor: not-allowed;
        }
        .btn-secondary {
          background: #f0f0f0;
          border: 1px solid #ddd;
          color: #333;
        }
        .btn-secondary:hover {
          background: #e0e0e0;
        }
      `}</style>
    </div>
  )
}

// Add custom styles
const styles = `
  .admin-dashboard {
    min-height: 100vh;
    background-color: #f5f7fa;
  }
  
  .admin-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .admin-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
  }
  
  .admin-title {
    font-size: 24px;
    font-weight: 600;
    color: #2d3748;
  }
  
  .exam-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 30px;
    margin-top: 20px;
  }
  
  .exam-card {
    background: white;
    border-radius: 8px;
    padding: 0px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    transition: transform 0.2s, box-shadow 0.2s;
   
  }
  
  .exam-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  }
  
  .exam-actions {
    display: flex;
    gap: 10px;
    margin-top: 15px;
  }
  
  .btn {
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 6px;
  }
  
  .btn-primary {
    background-color: #4299e1;
    color: white;
  }
  
  .btn-info {
    background-color: #0bc5ea;
    color: white;
  }
  
  .btn-warning {
    background-color: #ecc94b;
    color: #1a202c;
  }
  
  .btn-danger {
    background-color: #f56565;
    color: white;
  }
  
  .btn-secondary {
    background-color: #e2e8f0;
    color: #4a5568;
  }
  
  .loading {
    text-align: center;
    padding: 40px;
    color: #718096;
  }
  
  .error {
    color: #e53e3e;
    background-color: #fff5f5;
    padding: 15px;
    border-radius: 4px;
    margin: 20px 0;
  }
  
  .status-badge {
    display: inline-block;
    padding: 4px 8px;
    border-radius: 12px;
    font-size: 12px;
    font-weight: 600;
    margin-left: 10px;
  }
  
  .status-active {
    background-color: #c6f6d5;
    color: #22543d;
  }
  
  .status-inactive {
    background-color: #fed7d7;
    color: #822727;
  }
`;

export default function AdminDashboard() {
  const { examId } = useParams();
  const navigate = useNavigate();
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedExam, setSelectedExam] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [currentExam, setCurrentExam] = useState(null);
  const [copied, setCopied] = useState(false);
  const [loadingStates, setLoadingStates] = useState({});
  const [initialLoad, setInitialLoad] = useState(true);
  const [view, setView] = useState('list'); // 'list' or 'monitor'
  
  // Copy exam link to clipboard
  const copyToClipboard = (examId) => {
    const examLink = `${window.location.origin}/exam/${examId}`;
    navigator.clipboard.writeText(examLink).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(err => {
      console.error('Failed to copy:', err);
    });
  };

  // Open share modal
  const openShareModal = (exam) => {
    setCurrentExam(exam);
    setShareModalOpen(true);
    setCopied(false);
  };

  // Close share modal
  const closeShareModal = () => {
    setShareModalOpen(false);
    setCurrentExam(null);
    setCopied(false);
  };
  
  // Start monitoring an exam
  const startMonitoring = (exam) => {
    setSelectedExam(exam);
    setView('monitor');
    navigate(`/admin/monitor/${exam.id}`);
  };
  
  // Go back to exam list
  const goBackToList = () => {
    setView('list');
    setSelectedExam(null);
    navigate('/admin');
  };

  // Debug: Log component mount and environment
  useEffect(() => {
    console.log('AdminDashboard mounted');
    console.log('Supabase URL:', import.meta.env.VITE_SUPABASE_URL);
    console.log('Environment:', process.env.NODE_ENV);
    
    // Initial data fetch
    const loadData = async () => {
      try {
        await fetchExams();
        
        // If there's an examId in the URL, switch to monitoring view
        if (examId) {
          const exam = exams.find(e => e.id === examId);
          if (exam) {
            setSelectedExam(exam);
            setView('monitor');
          }
        }
      } catch (err) {
        console.error('Initial load error:', err);
        setError(`Failed to load data: ${err.message}`);
      } finally {
        setInitialLoad(false);
      }
    };
    
    loadData();
  }, [examId]);

  const fetchExams = async () => {
    console.log('Fetching exams...');
    try {
      setLoading(true);
      setError(null);
      
      // First, verify we have a valid supabase client
      if (!supabase) {
        throw new Error('Supabase client not initialized');
      }

      // Get all exams with their questions
      console.log('Making supabase query...');
      const { data: examsData, error: examsError } = await supabase
        .from("exams")
        .select("*")
        .order("created_at", { ascending: false });

      console.log('Supabase response:', { examsData, examsError });

      if (examsError) {
        console.error('Supabase error:', examsError);
        throw new Error(examsError.message || 'Failed to fetch exams');
      }

      if (!examsData) {
        console.warn('No data returned from exams query');
        setExams([]);
        return;
      }

      // Add question counts to each exam
      const examsWithCounts = examsData.map(exam => {
        const questions = Array.isArray(exam.questions) ? exam.questions : [];
        return {
          ...exam,
          questions: questions,
          questions_count: questions.length
        };
      });

      console.log('Processed exams:', examsWithCounts);
      setExams(examsWithCounts);
    } catch (err) {
      const errorMessage = err.message || 'Failed to load exams. Please try again.';
      console.error('Error in fetchExams:', err);
      setError(errorMessage);
      
      // Show more detailed error in development
      if (process.env.NODE_ENV === 'development') {
        setError(`${errorMessage} (${err.message || 'No error details'})`);
      }
    } finally {
      console.log('Fetch exams completed');
      setLoading(false);
    }
  };

  const toggleExamStatus = async (examId, currentStatus) => {
    try {
      setLoadingStates(prev => ({ ...prev, [examId]: true }));
      
      const { error } = await supabase
        .from('exams')
        .update({ is_active: !currentStatus })
        .eq('id', examId);

      if (error) throw error;

      setExams(exams.map(exam => 
        exam.id === examId ? { ...exam, is_active: !currentStatus } : exam
      ));

      toast.success(`Exam ${!currentStatus ? 'unlocked' : 'locked'} successfully`);
    } catch (error) {
      console.error('Error toggling exam status:', error);
      toast.error(error.message || 'Failed to update exam status');
    } finally {
      setLoadingStates(prev => ({ ...prev, [examId]: false }));
    }
  };

  const handleViewExam = (exam) => {
    setSelectedExam(exam);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedExam(null);
  };

  const handleQuestionsUpdate = (updatedQuestions) => {
    setExams(prevExams => 
      prevExams.map(exam => 
        exam.id === selectedExam.id 
          ? { ...exam, questions: updatedQuestions, questions_count: updatedQuestions.length }
          : exam
      )
    );
  };

  const handleDeleteExam = async (id) => {
    if (window.confirm("Are you sure you want to delete this exam? This action cannot be undone.")) {
      try {
        const { error } = await supabase
          .from("exams")
          .delete()
          .eq("id", id);
        
        if (error) throw error;
        fetchExams();
      } catch (err) {
        setError("Failed to delete exam. Please try again.");
        console.error("Error deleting exam:", err);
      }
    }
  };

  useEffect(() => {
    fetchExams();
  }, []);

  // Add styles to the document head
  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.textContent = styles;
    document.head.appendChild(styleElement);
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  // Show loading state
  if (initialLoad) {
    return (
      <div className="admin-dashboard">
        <Navbar />
        <div className="admin-container" style={{ textAlign: 'center', padding: '40px' }}>
          <div className="loading">
            <h3>Loading Admin Dashboard...</h3>
            <p>Please wait while we load your data</p>
            <div className="spinner" style={{ margin: '20px auto', width: '40px', height: '40px', border: '4px solid #f3f3f3', borderTop: '4px solid #3498db', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
            <style>{`
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            `}</style>
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="admin-dashboard">
        <Navbar />
        <div className="admin-container" style={{ maxWidth: '600px', margin: '40px auto', padding: '20px' }}>
          <div className="error" style={{
            backgroundColor: '#ffebee',
            color: '#c62828',
            padding: '20px',
            borderRadius: '8px',
            marginBottom: '20px',
            borderLeft: '4px solid #c62828'
          }}>
            <h3 style={{ marginTop: 0 }}>Error Loading Dashboard</h3>
            <p>{error}</p>
            <p style={{ fontSize: '0.9em', color: '#666' }}>
              Please check your internet connection and try again.
            </p>
          </div>
          <button 
            className="btn btn-primary" 
            onClick={fetchExams}
            style={{
              padding: '10px 20px',
              backgroundColor: '#3498db',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            Retry Loading Data
          </button>
          <div style={{ marginTop: '20px', fontSize: '0.9em', color: '#666' }}>
            <p>If the problem persists, please contact support with these details:</p>
            <pre style={{
              backgroundColor: '#f5f5f5',
              padding: '10px',
              borderRadius: '4px',
              overflowX: 'auto',
              fontSize: '12px'
            }}>
              URL: {window.location.href}
              {error.message && `\nError: ${error.message}`}
            </pre>
          </div>
        </div>
      </div>
    );
  }
  
  // Render monitoring view if in monitor mode
  if (view === 'monitor' && selectedExam) {
    return (
      <div className="admin-dashboard">
        <Navbar />
        <div className="admin-container" style={{ padding: '20px' }}>
          <button 
            onClick={goBackToList}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '20px',
              background: 'none',
              border: 'none',
              color: '#4a5568',
              cursor: 'pointer',
              fontSize: '16px',
              padding: '8px 0'
            }}
          >
            <FaArrowLeft /> Back to Exams
          </button>
          <h1 style={{ marginBottom: '20px' }}>Live Monitoring: {selectedExam.title}</h1>
          <LiveMonitoring examId={selectedExam.id} />
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <TestComponent />
      <Navbar />
      <div className="admin-container">
        <div className="admin-header">
          <div className="admin-title">
            <h1>Exam Management</h1>
            <p>Manage and monitor your exams</p>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <Link to="/create-exam" className="btn btn-primary">
              Create New Exam
            </Link>
          </div>
        </div>
          <Link to="/create-exam" className="create-exam-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </Link>
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {loading ? (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Loading exams...</p>
          </div>
        ) : exams.length === 0 ? (
          <div className="no-exams">
            <div className="no-exams-icon">📝</div>
            <h3>No Exams Found</h3>
            <p>Get started by creating your first exam</p>
            <Link to="/create-exam" className="create-exam-btn">
              Create Your First Exam
            </Link>
          </div>
        ) : (
          <div className="exam-grid">
            {exams.map((exam) => (
              <div className="exam-card" key={exam.id}>
                <div className="exam-card-header">
                  <h3>{exam.title}</h3>
                  <div className={`exam-status ${exam.is_active ? 'active' : 'inactive'}`}>
                    {exam.is_active ? 'Active' : 'Inactive'}
                  </div>
                </div>
                
                <div className="exam-details">
                  <div className="detail-item">
                    <span className="detail-label">Subject:</span>
                    <span className="detail-value">{exam.subject || 'General'}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Duration:</span>
                    <span className="detail-value">{exam.duration_minutes} minutes</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Questions:</span>
                    <span className="detail-value">{exam.questions_count || 0}</span>
                  </div>
                </div>
                
                <div className="exam-actions">
                  <button 
                    onClick={() => handleViewExam(exam)}
                    className="action-btn view"
                    title="View/Edit Questions"
                  >
                    <FaEye />
                    <span>View</span>
                  </button>
                  <button 
                    className="btn btn-info"
                    onClick={() => openShareModal(exam)}
                    title="Share exam link"
                  >
                    <FaLink />
                    <span>Share</span>
                  </button>
                  <button 
                    className="btn btn-primary"
                    onClick={() => startMonitoring(exam)}
                    title="Monitor exam"
                  >
                    <FaVideo />
                    <span>Monitor</span>
                  </button>
                  <button 
                    className={`btn ${exam.is_active ? 'btn-warning' : 'btn-primary'}`} 
                    onClick={() => toggleExamStatus(exam.id, exam.is_active)}
                    disabled={loadingStates[exam.id]}
                    title={exam.is_active ? 'Lock exam' : 'Unlock exam'}
                  >
                    {loadingStates[exam.id] ? (
                      'Loading...'
                    ) : (
                      <>
                        {exam.is_active ? <FaLock /> : <FaUnlock />}
                        {exam.is_active ? ' Lock' : ' Unlock'}
                      </>
                    )}
                  </button>
                  <button 
                    className="btn btn-danger" 
                    onClick={() => handleDeleteExam(exam.id)}
                    title="Delete exam"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {isModalOpen && selectedExam && (
        <QuestionModal 
          exam={selectedExam} 
          onClose={handleCloseModal}
          onSave={handleQuestionsUpdate}
        />
      )}

      {/* Share Exam Modal */}
      {shareModalOpen && currentExam && (
        <div className="modal-overlay" style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div className="modal-content" style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            width: '90%',
            maxWidth: '500px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ marginTop: 0, marginBottom: '20px' }}>Share Exam Link</h3>
            
            <div style={{ marginBottom: '20px' }}>
              <p style={{ marginBottom: '10px', fontWeight: 'bold' }}>Exam: {currentExam.title}</p>
              <div style={{
                display: 'flex',
                gap: '10px',
                marginBottom: '10px'
              }}>
                <input
                  type="text"
                  readOnly
                  value={`${window.location.origin}/exam/${currentExam.id}`}
                  style={{
                    flex: 1,
                    padding: '8px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '14px'
                  }}
                />
                <button
                  onClick={() => copyToClipboard(currentExam.id)}
                  style={{
                    padding: '8px 15px',
                    backgroundColor: copied ? '#4CAF50' : '#2196F3',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px'
                  }}
                >
                  <FaCopy />
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <p style={{
                fontSize: '12px',
                color: '#666',
                marginTop: '5px',
                fontStyle: 'italic'
              }}>
                Share this link with students to allow them to take the exam
              </p>
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '10px',
              marginTop: '20px',
              borderTop: '1px solid #eee',
              paddingTop: '15px'
            }}>
              <button
                onClick={closeShareModal}
                style={{
                  padding: '8px 15px',
                  backgroundColor: '#f5f5f5',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
