
import "./Dashboard.css";

function Dashboard() {
  const subjects = [
    {
      name: "Chemistry",
      icon: "🧪",
      performance: 43.5,
      level: "Weak",
    },
    {
      name: "Mathematics",
      icon: "📐",
      performance: 70,
      level: "Needs Improvement",
    },
  ];

  const studyPlan = [
    {
      subject: "Chemistry",
      icon: "🧪",
      minutes: 59,
      reason:
        "Your performance is 43.5%, so StudyBee has given Chemistry the highest priority.",
    },
    {
      subject: "Mathematics",
      icon: "📐",
      minutes: 31,
      reason:
        "Your performance is 70%, so Mathematics needs less study time today.",
    },
  ];

  return (
    <section className="dashboard-section" id="dashboard">
      <div className="dashboard-container">

        {/* Dashboard heading */}
        <div className="dashboard-heading">
          <div>
            <p className="small-title">YOUR STUDY DASHBOARD</p>

            <h2>
              Good luck today, Fatima! 🐝
            </h2>

            <p>
              StudyBee has analyzed your recent performance and created a
              personalized plan for you.
            </p>
          </div>

          <div className="dashboard-bee">
            🐝
          </div>
        </div>


        {/* Statistics */}
        <div className="stats-grid">

          <div className="stat-card">
            <span>📊</span>

            <p>Overall Performance</p>

            <strong>56.8%</strong>
          </div>


          <div className="stat-card">
            <span>🎯</span>

            <p>Highest Priority</p>

            <strong>Chemistry</strong>
          </div>


          <div className="stat-card">
            <span>⏱️</span>

            <p>Today's Study Time</p>

            <strong>90 min</strong>
          </div>


          <div className="stat-card">
            <span>📚</span>

            <p>Subjects</p>

            <strong>2</strong>
          </div>

        </div>


        {/* Performance + Priority */}
        <div className="dashboard-grid">

          {/* Performance */}
          <div className="dashboard-panel">

            <div className="panel-heading">
              <div>
                <p className="small-title">PERFORMANCE</p>

                <h3>Your Subjects</h3>
              </div>

              <span>📈</span>
            </div>


            <div className="performance-list">

              {subjects.map((subject) => (
                <div
                  className="performance-item"
                  key={subject.name}
                >

                  <div className="performance-top">

                    <div className="subject-name">

                      <span>
                        {subject.icon}
                      </span>

                      <div>
                        <strong>
                          {subject.name}
                        </strong>

                        <p>
                          {subject.level}
                        </p>
                      </div>

                    </div>


                    <strong>
                      {subject.performance}%
                    </strong>

                  </div>


                  <div className="progress-bar">

                    <div
                      className="progress-fill"
                      style={{
                        width: `${subject.performance}%`,
                      }}
                    />

                  </div>

                </div>
              ))}

            </div>

          </div>


          {/* Priority */}
          <div className="dashboard-panel priority-panel">

            <div className="panel-heading">

              <div>
                <p className="small-title">
                  FOCUS AREA
                </p>

                <h3>
                  Start here today
                </h3>
              </div>

              <span>🎯</span>

            </div>


            <div className="priority-subject">

              <div className="priority-icon">
                🧪
              </div>

              <div>

                <h4>
                  Chemistry
                </h4>

                <p>
                  Current performance:{" "}
                  <strong>43.5%</strong>
                </p>

              </div>

            </div>


            <div className="priority-message">

              <strong>
                Why this subject?
              </strong>

              <p>
                Chemistry is currently your weakest subject, so StudyBee
                has made it your highest-priority topic.
              </p>

            </div>


            <button>
              Start Chemistry 🐝
            </button>

          </div>

        </div>


        {/* Today's Study Plan */}
        <div className="study-plan-dashboard">

          <div className="panel-heading">

            <div>
              <p className="small-title">
                TODAY'S PLAN
              </p>

              <h3>
                Your personalized study plan
              </h3>
            </div>

            <span>🗓️</span>

          </div>


          <div className="plan-list">

            {studyPlan.map((task, index) => (
              <div
                className="plan-item"
                key={task.subject}
              >

                <div className="plan-number">
                  {index + 1}
                </div>


                <div className="plan-icon">
                  {task.icon}
                </div>


                <div className="plan-info">

                  <div className="plan-title">

                    <h4>
                      {task.subject}
                    </h4>

                    <span>
                      {task.minutes} min
                    </span>

                  </div>


                  <p>
                    {task.reason}
                  </p>

                </div>


                <button className="plan-button">
                  Start
                </button>

              </div>
            ))}

          </div>

        </div>


        {/* StudyBee Tip */}
        <div className="dashboard-message">

          <div className="message-bee">
            🐝
          </div>


          <div>

            <p className="small-title">
              STUDYBEE'S TIP
            </p>

            <h3>
              Focus on progress, not perfection.
            </h3>

            <p>
              Every quiz helps StudyBee understand you better. As your
              performance changes, your study plan will adapt with you.
            </p>

          </div>

        </div>

      </div>
    </section>
  );
}

export default Dashboard;

