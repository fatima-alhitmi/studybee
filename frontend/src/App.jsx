import "./App.css";

function App() {
  return (
    <div className="app">
      <header className="header">
        <div className="logo">
          🐝 <span>StudyBee</span>
        </div>

        <nav>
          <a href="#home">Home</a>
          <a href="#subjects">Subjects</a>
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
              <p>0% progress</p>
            </div>

            <div className="subject-card">
              <span>🧪</span>
              <h3>Chemistry</h3>
              <p>0% progress</p>
            </div>

            <div className="subject-card">
              <span>📚</span>
              <h3>English</h3>
              <p>0% progress</p>
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
            <strong>0%</strong>
            <p>Overall progress</p>
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
