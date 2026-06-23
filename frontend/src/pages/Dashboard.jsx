import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (!token || !userData) {
      navigate('/login');
    } else {
      setUser(JSON.parse(userData));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (!user) return null; // or a loading spinner

  return (
    <div className="dashboard-card">
      <div className="dashboard-header">
        <div className="user-info">
          <div className="avatar">
            {user.email.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '600' }}>{user.email}</h2>
            <span className="role-badge">{user.role}</span>
          </div>
        </div>
        <button onClick={handleLogout} className="btn-secondary btn-logout">
          Logout
        </button>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Welcome to your Dashboard</h3>
        <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>
          You have successfully authenticated using Spring Security and JWT.
          Depending on your role ({user.role}), you have specific access rights within the system.
        </p>

        {/* Role-based content examples */}
        {user.role === 'Admin' && (
          <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '12px', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
            <h4 style={{ color: '#93c5fd', marginBottom: '0.5rem' }}>Admin Controls</h4>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>You have full access to manage users, roles, and system settings.</p>
          </div>
        )}

        {user.role === 'Employee' && (
          <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '12px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
            <h4 style={{ color: '#6ee7b7', marginBottom: '0.5rem' }}>Employee Area</h4>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>You can view your tasks and update your profile information.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
