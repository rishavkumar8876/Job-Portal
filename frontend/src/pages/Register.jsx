import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth, API } from '../App';
import axios from 'axios';
import { Briefcase, Mail, Lock, User, UserCheck } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'job_seeker',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post(`${API}/auth/register`, formData);

      login(response.data.token, response.data.user);

      if (response.data.user.role === 'job_seeker') {
        navigate('/dashboard/job-seeker');
      } else {
        navigate('/dashboard/recruiter');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background-subtle flex items-center justify-center py-12 px-4" data-testid="register-page">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2 mb-6" data-testid="register-logo-link">
            <Briefcase className="h-10 w-10 text-primary" strokeWidth={1.5} />
            <span className="text-3xl font-bold tracking-tight font-heading">CareerFlow AI</span>
          </Link>
          <h1 className="text-3xl font-semibold tracking-tight font-heading text-secondary mb-2">
            Create Account
          </h1>
          <p className="text-base text-muted-foreground">Join thousands finding their dream jobs</p>
        </div>

        <div className="card">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-accent-error/10 border border-accent-error/20 text-accent-error px-4 py-3 rounded-lg text-sm" data-testid="register-error-message">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-secondary mb-3">
                I am a...
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, role: 'job_seeker' })}
                  className={`p-4 rounded-lg border-2 duration-300 ${
                    formData.role === 'job_seeker'
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                  data-testid="register-role-jobseeker-btn"
                >
                  <User className="h-6 w-6 mx-auto mb-2 text-primary" strokeWidth={1.5} />
                  <div className="text-sm font-medium">Job Seeker</div>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, role: 'recruiter' })}
                  className={`p-4 rounded-lg border-2 duration-300 ${
                    formData.role === 'recruiter'
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                  data-testid="register-role-recruiter-btn"
                >
                  <UserCheck className="h-6 w-6 mx-auto mb-2 text-primary" strokeWidth={1.5} />
                  <div className="text-sm font-medium">Recruiter</div>
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-secondary mb-2">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                className="input-field"
                placeholder="John Doe"
                required
                data-testid="register-name-input"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-secondary mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted" strokeWidth={1.5} />
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="input-field pl-10"
                  placeholder="you@example.com"
                  required
                  data-testid="register-email-input"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-secondary mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted" strokeWidth={1.5} />
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="input-field pl-10"
                  placeholder="••••••••"
                  required
                  minLength={6}
                  data-testid="register-password-input"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full"
              data-testid="register-submit-btn"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">Already have an account? </span>
            <Link to="/login" className="text-primary font-medium hover:underline" data-testid="register-login-link">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;