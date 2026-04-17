import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Briefcase, DollarSign } from 'lucide-react';

const JobCard = ({ job, matchScore, applied, recruiterView, testId }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/jobs/${job.id}`)}
      className="job-card hover-lift"
      data-testid={testId || 'job-card'}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-xl font-semibold tracking-tight font-heading text-secondary mb-1" data-testid="job-card-title">
            {job.title}
          </h3>
          <p className="text-base text-muted-foreground" data-testid="job-card-company">{job.company}</p>
        </div>
        {matchScore !== undefined && (
          <div className="px-3 py-1 match-score-gradient text-white rounded-lg text-sm font-medium" data-testid="job-card-match-score">
            {matchScore}% Match
          </div>
        )}
        {applied && (
          <div className="px-3 py-1 bg-accent-success text-white rounded-lg text-sm font-medium" data-testid="job-card-applied-badge">
            Applied
          </div>
        )}
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground" data-testid="job-card-location">
          <MapPin className="h-4 w-4" strokeWidth={1.5} />
          {job.location}
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground" data-testid="job-card-type">
          <Briefcase className="h-4 w-4" strokeWidth={1.5} />
          {job.job_type}
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground" data-testid="job-card-salary">
          <DollarSign className="h-4 w-4" strokeWidth={1.5} />
          {job.salary}
        </div>
      </div>

      <div className="mb-4">
        <p className="text-sm text-muted-foreground line-clamp-2" data-testid="job-card-description">{job.description}</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {job.required_skills.slice(0, 3).map((skill, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-background-subtle text-secondary rounded text-xs font-medium"
            data-testid={`job-card-skill-${index}`}
          >
            {skill}
          </span>
        ))}
        {job.required_skills.length > 3 && (
          <span className="px-3 py-1 bg-background-subtle text-secondary rounded text-xs font-medium">
            +{job.required_skills.length - 3} more
          </span>
        )}
      </div>
    </div>
  );
};

export default JobCard;