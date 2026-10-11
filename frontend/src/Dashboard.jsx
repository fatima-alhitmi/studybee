
import { useEffect, useState } from "react";
import "./Dashboard.css";

const API_URL = "http://127.0.0.1:8000";

function Dashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const response = await fetch(`${API_URL}/api/dashboard`);

        if (!response.ok) {
          throw new Error("Could not load dashboard data.");
        }

        const data = await response.json();
        setDashboard(data);
        setError("");
      } catch {
        setError(
          "StudyBee couldn't load your latest data. Make sure the backend is running."
        );
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  if (loading) {
    return (
      <section className="dashboard-section" id="dashboard">
        <div className="dashboard-container">
          <h2>Loading your dashboard... 🐝</h2>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="dashboard-section" id="dashboard">
        <div className="dashboard-container">
          <h2>Your dashboard needs a little help 🐝</h2>
          <p role="alert">{error}</p>
          <button onClick={() => window.location.reload()}>
            Try again
          </button>
        </div>
      </section>
    );
  }

  const subjects = dashboard.subjects || [];
  const studyPlan = dashboard.study_plan || [];

  return (
    <section className="dashboard-section" id="dashboard">
      <div className="dashboard-container">
        <div className="dashboard-heading">
          <div>
            <p className="small-title">YOUR STUDY DASHBOARD</p>
            <h2>Good luck today! 🐝</h2>
            <p>
              StudyBee analyzes your recent performance and recommends
              what to focus on next.
            </p>
          </div>

          <div className="dashboard-bee">🐝</div>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <span>📊</span>
            <p>Overall Performance</p>
            <strong>{dashboard.overall_performance}%</strong>
          </div>

          <div className="stat-card">
            <span>🎯</span>
            <p>Highest Priority</p>
            <strong>{dashboard.highest_priority || "None yet"}</strong>
          </div>

          <div className="stat-card">
            <span>⏱️</span>
            <p>Today's Study Time</p>
            <strong>
              {studyPlan.reduce((total, task) => total + task.minutes, 0)} min
            </strong>
          </div>

          <div className="stat-card">
            <span>📚</span>
            <p>Subjects</p>
            <strong>{dashboard.subjects_count}</strong>
          </div>
        </div>

        <div className="dashboard-grid">
          <div className="dashboard-panel">
            <div className="panel-heading">
              <div>
                <p className="small-title">PERFORMANCE</p>
                <h3>Your Subjects</h3>
              </div>
              <span>📈</span>
            </div>

            {subjects.length === 0 ? (
              <p>Take a quiz to start tracking your performance.</p>
            ) : (
              <div className="performance-list">
                {subjects.map((subject) => (
                  <div className="performance-item" key={subject.subject}>
                    <div className="performance-top">
                      <div className="subject-name">
                        <span>
                          {subject.subject === "Chemistry" ? "🧪" : "📚"}
                        </span>
                        <div>
                          <strong>{subject.subject}</strong>
                          <p>{subject.level}</p>
                        </div>
                      </div>

                      <strong>{subject.performance}%</strong>
                    </div>

                    <div className="progress-bar">
                      <div
                        className="progress-fill"
                        style={{
                          width: `${Math.min(
                            100,
                            Math.max(0, subject.performance)
                          )}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="dashboard-panel priority-panel">
            <div className="panel-heading">
              <div>
                <p className="small-title">FOCUS AREA</p>
                <h3>Start here today</h3>
              </div>
              <span>🎯</span>
            </div>

            {subjects.length > 0 ? (
              <>
                <div className="priority-subject">
                  <div className="priority-icon">🐝</div>
                  <div>
                    <h4>{dashboard.highest_priority}</h4>
                    <p>
                      Current performance:{" "}
                      <strong>
                        {subjects.find(
                          (subject) =>
                            subject.subject === dashboard.highest_priority
                        )?.performance ?? "—"}
                        %
                      </strong>
                    </p>
                  </div>
                </div>

                <div className="priority-message">
                  <strong>Why this subject?</strong>
                  <p>
                    {
                      subjects.find(
                        (subject) =>
                          subject.subject === dashboard.highest_priority
                      )?.reason
                    }
                  </p>
                </div>

                <a className="dashboard-action" href="#subjects">
                  Review your subjects 🐝
                </a>
              </>
            ) : (
              <p>Take a quiz so StudyBee can recommend a focus area.</p>
            )}
          </div>
        </div>

        <div className="study-plan-dashboard">
          <div className="panel-heading">
            <div>
              <p className="small-title">TODAY'S PLAN</p>
              <h3>Your personalized study plan</h3>
            </div>
            <span>🗓️</span>
          </div>

          {studyPlan.length === 0 ? (
            <p>Your study plan will appear after you have quiz data.</p>
          ) : (
            <div className="plan-list">
              {studyPlan.map((task, index) => (
                <div className="plan-item" key={task.subject}>
                  <div className="plan-number">{index + 1}</div>
                  <div className="plan-icon">
                    {task.subject === "Chemistry" ? "🧪" : "📚"}
                  </div>

                  <div className="plan-info">
                    <div className="plan-title">
                      <h4>{task.subject}</h4>
                      <span>{task.minutes} min</span>
                    </div>
                    <p>{task.reason}</p>
                  </div>

                  <a className="plan-button" href="#subjects">
                    Review
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="dashboard-message">
          <div className="message-bee">🐝</div>
          <div>
            <p className="small-title">STUDYBEE'S TIP</p>
            <h3>Focus on progress, not perfection.</h3>
            <p>
              Every quiz helps StudyBee understand your progress. Your
              recommendations change as your recorded performance changes.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Dashboard;

