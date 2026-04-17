import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, API } from '../App';
import axios from 'axios';
import { Plus, X } from 'lucide-react';
import Navbar from '../components/Navbar';

const PostJobPage = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    salary: '',
    job_type: 'Full-time',
    description: '',
    required_skills: [],
  });
  const [skillInput, setSkillInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const addSkill = () => {
    if (skillInput.trim() && !formData.required_skills.includes(skillInput.trim())) {
      setFormData({
        ...formData,
        required_skills: [...formData.required_skills, skillInput.trim()],
      });
      setSkillInput('');
    }
  };

  const removeSkill = (skillToRemove) => {
    setFormData({
      ...formData,
      required_skills: formData.required_skills.filter((skill) => skill !== skillToRemove),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.required_skills.length === 0) {
      setError('Please add at least one required skill');
      return;
    }

    setLoading(true);
    try {
      await axios.post(`${API}/jobs`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate('/dashboard/recruiter');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to post job');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background-subtle">
      <Navbar />

      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-3xl py-8">
        <h1 className="text-4xl font-bold tracking-tight font-heading text-secondary mb-8" data-testid="post-job-title">
          Post a New Job
        </h1>

        <div className="card">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-accent-error/10 border border-accent-error/20 text-accent-error px-4 py-3 rounded-lg text-sm" data-testid="post-job-error">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="title" className="block text-sm font-medium text-secondary mb-2">
                Job Title *
              </label>
              <input
                id="title"
                name="title"
                type="text"
                value={formData.title}
                onChange={handleChange}
                className="input-field"
                placeholder="e.g. Senior Software Engineer"
                required
                data-testid="job-title-input"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-secondary mb-2">
                  Company *
                </label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  value={formData.company}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="e.g. Tech Corp"
                  required
                  data-testid="job-company-input"
                />
              </div>

              <div>
                <label htmlFor="location" className="block text-sm font-medium text-secondary mb-2">
                  Location *
                </label>
                <input
                  id="location"
                  name="location"
                  type="text"
                  value={formData.location}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="e.g. San Francisco, CA"
                  required
                  data-testid="job-location-input"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="salary" className="block text-sm font-medium text-secondary mb-2">
                  Salary *
                </label>
                <input
                  id="salary"
                  name="salary"
                  type="text"
                  value={formData.salary}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="e.g. $120k - $150k"
                  required
                  data-testid="job-salary-input"
                />
              </div>

              <div>
                <label htmlFor="job_type" className="block text-sm font-medium text-secondary mb-2">
                  Job Type *
                </label>
                <select
                  id="job_type"
                  name="job_type"
                  value={formData.job_type}
                  onChange={handleChange}
                  className="input-field"
                  required
                  data-testid="job-type-select"
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Freelance">Freelance</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-secondary mb-2">
                Job Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="input-field min-h-[150px]"
                placeholder="Describe the role, responsibilities, and requirements..."
                required
                data-testid="job-description-input"
              />
            </div>

            <div>
              <label htmlFor="skills" className="block text-sm font-medium text-secondary mb-2">
                Required Skills *
              </label>
              <div className="flex gap-2 mb-3">
                <input
                  id="skills"
                  type="text"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                  className="input-field flex-1"
                  placeholder="e.g. React, Python, AWS"
                  data-testid="skill-input"
                />
                <button
                  type="button"
                  onClick={addSkill}
                  className="btn-primary flex items-center gap-2"
                  data-testid="add-skill-btn"
                >
                  <Plus className="h-5 w-5" strokeWidth={1.5} />
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.required_skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-primary/10 text-primary rounded-lg text-sm font-medium flex items-center gap-2"
                    data-testid={`skill-badge-${index}`}
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => removeSkill(skill)}
                      className="hover:text-accent-error duration-300"
                      data-testid={`remove-skill-${index}`}
                    >
                      <X className="h-4 w-4" strokeWidth={1.5} />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="btn-primary flex-1"
                data-testid="submit-job-btn"
              >
                {loading ? 'Posting...' : 'Post Job'}
              </button>
              <button
                type="button"
                onClick={() => navigate('/dashboard/recruiter')}
                className="btn-outline"
                data-testid="cancel-btn"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostJobPage;