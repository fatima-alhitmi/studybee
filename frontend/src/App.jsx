import { useState } from "react";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState(
    "Hi! 🐝 I'm your StudyBee Study Buddy. Ask me about your weakest subject or what you should study today!"
  );
  const [loading, setLoading] = useState(false);

  async function askStudyBuddy() {
    if (!message.trim()) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/study-buddy",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: message,
          }),
        }
      );

      const data = await response.json();

      setReply(data.reply);
      setMessage("");
    } catch (error) {
      setReply(
        "I couldn't connect to StudyBee right now. Make sure the backend is running! 🐝"
      );
    }

    setLoading(false);
  }

  return (
    <div className="app">
      <header className="header">
        <div className="logo">
          🐝 <span>StudyBee</span>
        </div>

        <nav>
          <a href="#home">Home</a>
          <a href="#subjects">Subjects</a>
          <a href="#study-buddy">AI Buddy</a>
          <a href="#progress">Progress</a>
        </nav>
      </header>

      <main>
        <section id="home" className="hero">
          <div className="hero-text">
            <p className="welcome">WELCOME TO STUDYBEE 🐝</p>

            <h1>
              Study smarter.
              <br />
              <span>Buzz your way to success.</span>
            </h1>

            <p className="hero-description">
              Your personalized AI study companion that learns from your
              progress and helps you focus on what matters most.
            </p>

            <button>Start Studying 🐝</button>
          </div>

          <div className="bee-card">
            <div className="bee">🐝</div>
            <h2>Let's get learning!</h2>
            <p>Your study journey starts here.</p>
          </div>
        </section>

        <section id="subjects" className="section">
          <h2>Your Subjects</h2>

          <p className="section-description">
            Keep track of the subjects you're working on.
          </p>

          <div className="subject-grid">
            <div className="subject-card">
              <span>📐</span>
              <h3>Mathematics</h3>
              <p>70% performance</p>
            </div>

            <div className="subject-card">
              <span>🧪</span>
              <h3>Chemistry</h3>
              <p>43.5% performance</p>
            </div>

            <div className="subject-card">
              <span>📚</span>
              <h3>English</h3>
              <p>Start learning</p>
            </div>
          </div>
        </section>

        <section id="study-buddy" className="study-buddy-section">
          <div className="study-buddy-container">
            <div className="study-buddy-intro">
              <p className="small-title">YOUR AI STUDY COMPANION</p>

              <h2>Meet your Study Buddy. 🤖🐝</h2>

              <p>
                Ask StudyBee about your performance, your weakest subject,
                or what you should study today.
              </p>

              <div className="buddy-features">
                <div>
                  <span>🧠</span>
                  <strong>Understands your performance</strong>
                </div>

                <div>
                  <span>🎯</span>
                  <strong>Personalizes your study plan</strong>
                </div>

                <div>
                  <span>💡</span>
                  <strong>Explains why you should study it</strong>
                </div>
              </div>
            </div>

            <div className="chat-card">
              <div className="chat-header">
                <span>🐝</span>

                <div>
                  <strong>StudyBee Buddy</strong>
                  <p>AI Study Assistant</p>
                </div>
              </div>

              <div className="chat-message">
                <div className="buddy-avatar">🐝</div>

                <div className="message-bubble">
                  {reply}
                </div>
              </div>

              <div className="chat-input-area">
                <input
                  type="text"
                  placeholder="Ask your Study Buddy..."
                  value={message}
                  onChange={(event) =>
                    setMessage(event.target.value)
                  }
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      askStudyBuddy();
                    }
                  }}
                />

                <button
                  onClick={askStudyBuddy}
                  disabled={loading}
                >
                  {loading ? "..." : "Ask 🐝"}
                </button>
              </div>
            </div>
          </div>
        </section>

        <section id="progress" className="progress-section">
          <div>
            <p className="small-title">YOUR JOURNEY</p>

            <h2>Every little step counts. 🌱</h2>

            <p>
              StudyBee will analyze your performance and help create a study
              plan that adapts to you.
            </p>
          </div>

          <div className="progress-card">
            <span>🐝</span>
            <strong>0</strong>
            <p>Study sessions</p>
          </div>

          <div className="progress-card">
            <span>🎯</span>
            <strong>43.5%</strong>
            <p>Current weakest subject</p>
          </div>
        </section>
      </main>

      <footer>
        <p>Made with 💛 for smarter studying 🐝</p>
      </footer>
    </div>
  );
}

export default App;
