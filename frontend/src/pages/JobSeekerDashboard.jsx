import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth, API } from "../App";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import {
  Upload,
  FileText,
  Briefcase,
  LogOut,
  Target,
  CheckCircle,
} from "lucide-react";
import Navbar from "../components/Navbar";
import JobCard from "../components/JobCard";

const JobSeekerDashboard = () => {
  const { user, token, logout } = useAuth();
  const navigate = useNavigate();
  const [skills, setSkills] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [applications, setApplications] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const onDrop = useCallback(
    async (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (!file) return;

      setUploading(true);
      setUploadSuccess(false);

      try {
        const formData = new FormData();
        formData.append("file", file);

        await axios.post(`${API}/resume/upload`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });

        setUploadSuccess(true);
        fetchData();
      } catch (error) {
        console.error("Upload failed:", error);
        alert(error.response?.data?.error || "Failed to upload resume");
      } finally {
        setUploading(false);
      }
    },
    [token],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024,
  });

  const fetchData = async () => {
    try {
      const [skillsRes, recommendationsRes, applicationsRes] =
        await Promise.all([
          axios.get(`${API}/resume/my-skills`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${API}/recommendations`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${API}/applications/my-applications`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

      setSkills(skillsRes.data);
      setRecommendations(recommendationsRes.data);
      setApplications(applicationsRes.data);
    } catch (error) {
      console.error("Failed to fetch data:", error);
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
        <div className="mb-8">
          <h1
            className="text-4xl font-bold tracking-tight font-heading text-secondary mb-2"
            data-testid="dashboard-title"
          >
            Welcome, {user.name}!
          </h1>
          <p className="text-base text-muted-foreground">
            Track your applications and discover new opportunities
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="card" data-testid="stat-skills-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  Skills Extracted
                </p>
                <p className="text-3xl font-bold text-secondary">
                  {skills.length}
                </p>
              </div>
              <Target className="h-10 w-10 text-primary" strokeWidth={1.5} />
            </div>
          </div>

          <div className="card" data-testid="stat-recommendations-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  Recommended Jobs
                </p>
                <p className="text-3xl font-bold text-secondary">
                  {recommendations.length}
                </p>
              </div>
              <Briefcase className="h-10 w-10 text-primary" strokeWidth={1.5} />
            </div>
          </div>

          <div className="card" data-testid="stat-applications-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  Applications
                </p>
                <p className="text-3xl font-bold text-secondary">
                  {applications.length}
                </p>
              </div>
              <CheckCircle
                className="h-10 w-10 text-primary"
                strokeWidth={1.5}
              />
            </div>
          </div>
        </div>

        {/* Resume Upload */}
        <div className="card mb-8" data-testid="resume-upload-section">
          <h2 className="text-2xl font-semibold tracking-tight font-heading text-secondary mb-4">
            Upload Your Resume
          </h2>
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer duration-300 ${
              isDragActive
                ? "border-primary bg-primary/5"
                : "border-border hover:border-primary"
            }`}
            data-testid="resume-dropzone"
          >
            <input {...getInputProps()} data-testid="resume-file-input" />
            <Upload
              className="h-12 w-12 text-primary mx-auto mb-4"
              strokeWidth={1.5}
            />
            {uploading ? (
              <p className="text-base text-muted-foreground">
                Uploading and extracting skills...
              </p>
            ) : uploadSuccess ? (
              <p className="text-base text-accent-success">
                Resume uploaded successfully! Skills extracted.
              </p>
            ) : (
              <>
                <p className="text-base text-secondary font-medium mb-2">
                  {isDragActive
                    ? "Drop your resume here"
                    : "Drag & drop your resume here"}
                </p>
                <p className="text-sm text-muted-foreground">
                  or click to browse (PDF only, max 10MB)
                </p>
              </>
            )}
          </div>
        </div>

        {/* Your Skills */}
        {skills.length > 0 && (
          <div className="card mb-8" data-testid="skills-section">
            <h2 className="text-2xl font-semibold tracking-tight font-heading text-secondary mb-4">
              Your Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-primary/10 text-primary rounded-lg text-sm font-medium"
                  data-testid={`skill-badge-${index}`}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Recommended Jobs */}
        {recommendations.length > 0 && (
          <div className="mb-8" data-testid="recommendations-section">
            <h2 className="text-2xl font-semibold tracking-tight font-heading text-secondary mb-6">
              Recommended for You
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendations.slice(0, 6).map((rec, index) => (
                <JobCard key={rec.id} job={rec} matchScore={rec.matchScore} />
              ))}
            </div>
          </div>
        )}

        {/* My Applications */}
        {applications.length > 0 && (
          <div data-testid="applications-section">
            <h2 className="text-2xl font-semibold tracking-tight font-heading text-secondary mb-6">
              My Applications
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {applications.map(
                (app, index) =>
                  app.job && (
                    <JobCard
                      key={app.id}
                      job={app.job}
                      matchScore={app.match_score}
                      applied
                    />
                  ),
              )}
            </div>
          </div>
        )}

        {skills.length === 0 && (
          <div className="text-center py-12" data-testid="empty-state">
            <FileText
              className="h-16 w-16 text-muted mx-auto mb-4"
              strokeWidth={1.5}
            />
            <p className="text-base text-muted-foreground">
              Upload your resume to get personalized job recommendations
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobSeekerDashboard;
