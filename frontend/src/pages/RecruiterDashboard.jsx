import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, API } from '../App';
import axios from 'axios';
import { Plus, Briefcase, Users, TrendingUp } from 'lucide-react';
import Navbar from '../components/Navbar';
import JobCard from '../components/JobCard';

const RecruiterDashboard = () => {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [stats, setStats] = useState({ total_jobs: 0, total_applications: 0, active_jobs: 0 });
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [jobsRes, statsRes] = await Promise.all([
        axios.get(`${API}/recruiter/my-jobs`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get(`${API}/recruiter/stats`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      setJobs(jobsRes.data);
      setStats(statsRes.data);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-subtle">
      <Navbar />

      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-bold tracking-tight font-heading text-secondary mb-2" data-testid="recruiter-dashboard-title">
              Welcome, {user.name}!
            </h1>
            <p className="text-base text-muted-foreground">Manage your job postings and applications</p>
          </div>
          <button
            onClick={() => navigate('/post-job')}
            className="btn-primary flex items-center gap-2"
            data-testid="post-job-btn"
          >
            <Plus className="h-5 w-5" strokeWidth={1.5} />
            Post New Job
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="card" data-testid="stat-total-jobs-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Jobs Posted</p>
                <p className="text-3xl font-bold text-secondary">{stats.total_jobs}</p>
              </div>
              <Briefcase className="h-10 w-10 text-primary" strokeWidth={1.5} />
            </div>
          </div>

          <div className="card" data-testid="stat-applications-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Applications</p>
                <p className="text-3xl font-bold text-secondary">{stats.total_applications}</p>
              </div>
              <Users className="h-10 w-10 text-primary" strokeWidth={1.5} />
            </div>
          </div>

          <div className="card" data-testid="stat-active-jobs-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Active Jobs</p>
                <p className="text-3xl font-bold text-secondary">{stats.active_jobs}</p>
              </div>
              <TrendingUp className="h-10 w-10 text-primary" strokeWidth={1.5} />
            </div>
          </div>
        </div>

        {/* Posted Jobs */}
        <div data-testid="posted-jobs-section">
          <h2 className="text-2xl font-semibold tracking-tight font-heading text-secondary mb-6">
            Your Posted Jobs
          </h2>
          {jobs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobs.map((job, index) => (
                <JobCard key={job.id} job={job} recruiterView testId={`posted-job-${index}`} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 card" data-testid="empty-state">
              <Briefcase className="h-16 w-16 text-muted mx-auto mb-4" strokeWidth={1.5} />
              <p className="text-base text-muted-foreground mb-4">You haven't posted any jobs yet</p>
              <button
                onClick={() => navigate('/post-job')}
                className="btn-primary"
                data-testid="empty-state-post-job-btn"
              >
                Post Your First Job
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecruiterDashboard;