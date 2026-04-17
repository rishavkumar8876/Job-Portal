import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API } from '../App';
import { Search } from 'lucide-react';
import Navbar from '../components/Navbar';
import JobCard from '../components/JobCard';

const JobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = jobs.filter(
        (job) =>
          job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredJobs(filtered);
    } else {
      setFilteredJobs(jobs);
    }
  }, [searchTerm, jobs]);

  const fetchJobs = async () => {
    try {
      const response = await axios.get(`${API}/jobs`);
      setJobs(response.data);
      setFilteredJobs(response.data);
    } catch (error) {
      console.error('Failed to fetch jobs:', error);
    } finally {
      setLoading(false);
    }
  };

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
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight font-heading text-secondary mb-2" data-testid="jobs-page-title">
            Browse Jobs
          </h1>
          <p className="text-base text-muted-foreground">Explore {jobs.length} available opportunities</p>
        </div>

        {/* Search */}
        <div className="card mb-8" data-testid="search-section">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted" strokeWidth={1.5} />
            <input
              type="text"
              placeholder="Search by title, company, or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10 w-full"
              data-testid="search-input"
            />
          </div>
        </div>

        {/* Jobs Grid */}
        {filteredJobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="jobs-grid">
            {filteredJobs.map((job, index) => (
              <JobCard key={job.id} job={job} testId={`job-card-${index}`} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 card" data-testid="no-jobs-message">
            <p className="text-base text-muted-foreground">
              {searchTerm ? 'No jobs found matching your search' : 'No jobs available at the moment'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobsPage;