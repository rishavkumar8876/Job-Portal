import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../App';
import { Briefcase, Target, Zap, TrendingUp, CheckCircle } from 'lucide-react';

const LandingPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (user) {
      if (user.role === 'job_seeker') {
        navigate('/dashboard/job-seeker');
      } else {
        navigate('/dashboard/recruiter');
      }
    } else {
      navigate('/register');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-white/80 backdrop-blur-xl">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          <div className="flex h-16 items-center justify-between">
            <Link to="/" className="flex items-center space-x-2" data-testid="logo-link">
              <Briefcase className="h-8 w-8 text-primary" strokeWidth={1.5} />
              <span className="text-2xl font-bold tracking-tight font-heading">CareerFlow AI</span>
            </Link>
            
            <nav className="hidden md:flex items-center space-x-6">
              <Link to="/jobs" className="text-sm font-medium text-muted-foreground hover:text-primary duration-300" data-testid="nav-jobs-link">
                Browse Jobs
              </Link>
              {!user ? (
                <>
                  <Link to="/login" className="text-sm font-medium text-muted-foreground hover:text-primary duration-300" data-testid="nav-login-link">
                    Login
                  </Link>
                  <Link to="/register" className="btn-primary" data-testid="nav-register-btn">
                    Get Started
                  </Link>
                </>
              ) : (
                <Link 
                  to={user.role === 'job_seeker' ? '/dashboard/job-seeker' : '/dashboard/recruiter'}
                  className="btn-primary"
                  data-testid="nav-dashboard-btn"
                >
                  Dashboard
                </Link>
              )}
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 md:py-32 hero-gradient" data-testid="hero-section">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-secondary mb-6 font-heading">
                Find Your Perfect Job with AI
              </h1>
              <p className="text-lg leading-relaxed text-muted-foreground mb-8 max-w-2xl">
                Upload your resume and let our AI match you with the best opportunities. 
                Smart recommendations powered by advanced skill extraction.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button onClick={handleGetStarted} className="btn-primary text-lg px-8 py-3" data-testid="hero-get-started-btn">
                  Get Started Free
                </button>
                <Link to="/jobs" className="btn-outline text-lg px-8 py-3" data-testid="hero-browse-jobs-btn">
                  Browse Jobs
                </Link>
              </div>
            </div>
            
            <div className="flex-1">
              <img 
                src="https://images.unsplash.com/photo-1758518730523-c9f6336ebdae?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NTN8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwcHJvZmVzc2lvbmFsJTIwdGVhbSUyMG1vZGVybiUyMG9mZmljZSUyMGhhcHB5fGVufDB8fHx8MTc3MjY4NTU3OXww&ixlib=rb-4.1.0&q=85"
                alt="Professional team"
                className="rounded-xl shadow-xl w-full"
                data-testid="hero-image"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-32 bg-background-subtle" data-testid="features-section">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight font-heading text-secondary mb-4">
              How It Works
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get matched with your dream job in three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white border border-transparent hover:border-border p-8 rounded-2xl duration-300" data-testid="feature-upload-card">
              <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                <Target className="h-7 w-7 text-primary" strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl font-medium tracking-tight font-heading mb-4">Upload Resume</h3>
              <p className="text-base text-muted-foreground">
                Upload your PDF resume and our AI will extract your skills automatically.
              </p>
            </div>

            <div className="bg-white border border-transparent hover:border-border p-8 rounded-2xl duration-300" data-testid="feature-ai-card">
              <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                <Zap className="h-7 w-7 text-primary" strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl font-medium tracking-tight font-heading mb-4">AI Analysis</h3>
              <p className="text-base text-muted-foreground">
                Advanced AI analyzes your profile and matches you with relevant opportunities.
              </p>
            </div>

            <div className="bg-white border border-transparent hover:border-border p-8 rounded-2xl duration-300" data-testid="feature-match-card">
              <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                <TrendingUp className="h-7 w-7 text-primary" strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl font-medium tracking-tight font-heading mb-4">Get Matched</h3>
              <p className="text-base text-muted-foreground">
                Receive personalized job recommendations with match scores.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 md:py-32" data-testid="benefits-section">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight font-heading text-secondary mb-6">
                For Job Seekers
              </h2>
              <ul className="space-y-4">
                <li className="flex items-start gap-3" data-testid="benefit-skill-extraction">
                  <CheckCircle className="h-6 w-6 text-accent-success mt-1" strokeWidth={1.5} />
                  <span className="text-base leading-relaxed">AI-powered skill extraction from your resume</span>
                </li>
                <li className="flex items-start gap-3" data-testid="benefit-recommendations">
                  <CheckCircle className="h-6 w-6 text-accent-success mt-1" strokeWidth={1.5} />
                  <span className="text-base leading-relaxed">Personalized job recommendations with match scores</span>
                </li>
                <li className="flex items-start gap-3" data-testid="benefit-tracking">
                  <CheckCircle className="h-6 w-6 text-accent-success mt-1" strokeWidth={1.5} />
                  <span className="text-base leading-relaxed">Track your applications in one place</span>
                </li>
                <li className="flex items-start gap-3" data-testid="benefit-instant">
                  <CheckCircle className="h-6 w-6 text-accent-success mt-1" strokeWidth={1.5} />
                  <span className="text-base leading-relaxed">Instant profile analysis and insights</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight font-heading text-secondary mb-6">
                For Recruiters
              </h2>
              <ul className="space-y-4">
                <li className="flex items-start gap-3" data-testid="benefit-post-jobs">
                  <CheckCircle className="h-6 w-6 text-accent-success mt-1" strokeWidth={1.5} />
                  <span className="text-base leading-relaxed">Post and manage job listings easily</span>
                </li>
                <li className="flex items-start gap-3" data-testid="benefit-candidates">
                  <CheckCircle className="h-6 w-6 text-accent-success mt-1" strokeWidth={1.5} />
                  <span className="text-base leading-relaxed">View matched candidates with skill analysis</span>
                </li>
                <li className="flex items-start gap-3" data-testid="benefit-analytics">
                  <CheckCircle className="h-6 w-6 text-accent-success mt-1" strokeWidth={1.5} />
                  <span className="text-base leading-relaxed">Analytics dashboard for better insights</span>
                </li>
                <li className="flex items-start gap-3" data-testid="benefit-efficiency">
                  <CheckCircle className="h-6 w-6 text-accent-success mt-1" strokeWidth={1.5} />
                  <span className="text-base leading-relaxed">Streamlined hiring process</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-background-subtle" data-testid="cta-section">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight font-heading text-secondary mb-6">
            Ready to Find Your Dream Job?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of job seekers and recruiters using AI to make better career decisions.
          </p>
          <button onClick={handleGetStarted} className="btn-primary text-lg px-8 py-3" data-testid="cta-get-started-btn">
            Get Started Now
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary text-secondary-foreground py-12">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Briefcase className="h-6 w-6" strokeWidth={1.5} />
            <span className="text-xl font-bold font-heading">CareerFlow AI</span>
          </div>
          <p className="text-sm text-slate-400">© 2026 CareerFlow AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;