import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../App';
import { Briefcase, LogOut } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-white/80 backdrop-blur-xl" data-testid="navbar">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2" data-testid="navbar-logo">
            <Briefcase className="h-8 w-8 text-primary" strokeWidth={1.5} />
            <span className="text-2xl font-bold tracking-tight font-heading">CareerFlow AI</span>
          </Link>

          <nav className="flex items-center space-x-6">
            <Link
              to="/jobs"
              className="text-sm font-medium text-muted-foreground hover:text-primary duration-300"
              data-testid="navbar-jobs-link"
            >
              Browse Jobs
            </Link>
            {user && (
              <>
                <Link
                  to={user.role === 'job_seeker' ? '/dashboard/job-seeker' : '/dashboard/recruiter'}
                  className="text-sm font-medium text-muted-foreground hover:text-primary duration-300"
                  data-testid="navbar-dashboard-link"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary duration-300"
                  data-testid="navbar-logout-btn"
                >
                  <LogOut className="h-4 w-4" strokeWidth={1.5} />
                  Logout
                </button>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;