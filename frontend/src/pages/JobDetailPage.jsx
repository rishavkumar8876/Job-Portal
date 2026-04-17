import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth, API } from '../App';
import axios from 'axios';
import { MapPin, Briefcase, DollarSign, Calendar, ArrowLeft } from 'lucide-react';
import Navbar from '../components/Navbar';

const JobDetailPage = () => {
  const { id } = useParams();
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [applied, setApplied] = useState(false);

  useEffect(() => {
    fetchJobDetails();
  }, [id]);

  const fetchJobDetails = async () => {
    try {
      const jobRes = await axios.get(`${API}/jobs/${id}`);
      setJob(jobRes.data);

      if (user && user.role === 'recruiter' && token) {
        try {
          const applicantsRes = await axios.get(`${API}/recruiter/jobs/${id}/applicants`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setApplicants(applicantsRes.data);
        } catch (err) {
          console.log('Not authorized to view applicants');
        }
      }
    } catch (error) {
      console.error('Failed to fetch job details:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (user.role !== 'job_seeker') {
      alert('Only job seekers can apply to jobs');
      return;
    }

    setApplying(true);
    try {
      const response = await axios.post(
        `${API}/jobs/${id}/apply`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setApplied(true);
      alert(`Application submitted! Match score: ${response.data.match_score}%`);
    } catch (error) {
      alert(error.response?.data?.error || 'Failed to apply');
    } finally {
      setApplying(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-background-subtle">
        <Navbar />
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl py-8">
          <div className="text-center py-12">
            <p className="text-base text-muted-foreground">Job not found</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-subtle">
      <Navbar />

      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-4xl py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-muted-foreground hover:text-primary duration-300 mb-6"
          data-testid="back-btn"
        >
          <ArrowLeft className="h-5 w-5" strokeWidth={1.5} />
          Back
        </button>

        {/* Job Details */}
        <div className="card mb-8" data-testid="job-detail-card">
          <h1 className="text-4xl font-bold tracking-tight font-heading text-secondary mb-4" data-testid="job-title">
            {job.title}
          </h1>
          <p className="text-xl text-muted-foreground mb-6" data-testid="job-company">{job.company}</p>

          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center gap-2 text-muted-foreground" data-testid="job-location">
              <MapPin className="h-5 w-5" strokeWidth={1.5} />
              {job.location}
            </div>
            <div className="flex items-center gap-2 text-muted-foreground" data-testid="job-type">
              <Briefcase className="h-5 w-5" strokeWidth={1.5} />
              {job.job_type}
            </div>
            <div className="flex items-center gap-2 text-muted-foreground" data-testid="job-salary">
              <DollarSign className="h-5 w-5" strokeWidth={1.5} />
              {job.salary}
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold tracking-tight font-heading text-secondary mb-3">
              Job Description
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed whitespace-pre-line" data-testid="job-description">
              {job.description}
            </p>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold tracking-tight font-heading text-secondary mb-3">
              Required Skills
            </h2>
            <div className="flex flex-wrap gap-2" data-testid="job-skills">
              {job.required_skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-primary/10 text-primary rounded-lg text-sm font-medium"
                  data-testid={`skill-${index}`}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {user && user.role === 'job_seeker' && (
            <button
              onClick={handleApply}
              disabled={applying || applied}
              className="btn-primary"
              data-testid="apply-btn"
            >
              {applying ? 'Applying...' : applied ? 'Applied' : 'Apply Now'}
            </button>
          )}
        </div>

        {/* Applicants Section (Recruiter Only) */}
        {user && user.role === 'recruiter' && applicants.length > 0 && (
          <div className="card" data-testid="applicants-section">
            <h2 className="text-2xl font-semibold tracking-tight font-heading text-secondary mb-6">
              Applicants ({applicants.length})
            </h2>
            <div className="space-y-4">
              {applicants.map((app, index) => (
                <div
                  key={app.application.id}
                  className="border border-border rounded-lg p-4 hover:border-primary/50 duration-300"
                  data-testid={`applicant-${index}`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-medium text-secondary" data-testid={`applicant-name-${index}`}>{app.user.name}</h3>
                      <p className="text-sm text-muted-foreground" data-testid={`applicant-email-${index}`}>{app.user.email}</p>
                    </div>
                    <div className="px-3 py-1 match-score-gradient text-white rounded-lg text-sm font-medium" data-testid={`applicant-score-${index}`}>
                      {app.application.match_score}% Match
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Skills:</p>
                    <div className="flex flex-wrap gap-2">
                      {app.user_skills.map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-background-subtle text-secondary rounded text-xs"
                          data-testid={`applicant-skill-${index}-${idx}`}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobDetailPage;