# StudyBee

StudyBee is a web application that helps students plan their study time based on their quiz results. It tracks performance across subjects, identifies areas that need more practice, and creates a study plan with recommendations for how to use study time.

I built this project to explore how web development and data analysis can be used to make studying more organized and personalized.

## Features

* View performance statistics for each subject.
* Identify subjects that need more attention.
* Generate a study plan based on quiz performance.
* See explanations for study recommendations.
* View study information through a dashboard.
* Ask the Study Buddy about subjects and study plans.
* Store student, subject, quiz, and result data in a database.

## Technologies Used

* **Frontend:** React and Vite
* **Backend:** Python and FastAPI
* **Database:** SQLite
* **Database management:** SQLAlchemy
* **Version control:** Git and GitHub

## How It Works

StudyBee uses quiz results stored in its database to calculate performance for each subject. Subjects with lower scores receive higher priority in the study plan.

The planner divides the available study time between subjects according to their priorities. The dashboard then displays performance statistics, recommended study times, and explanations for the recommendations.

For example, if a student performs less well in Chemistry than in Mathematics, StudyBee will generally recommend spending more time on Chemistry.

## Project Structure

```text
studybee/
├── backend/
│   ├── analysis.py
│   ├── database.py
│   ├── init_db.py
│   ├── main.py
│   ├── models.py
│   ├── planner.py
│   ├── quiz.py
│   ├── seed_data.py
│   └── study_buddy.py
├── frontend/
│   ├── public/
│   └── src/
│       ├── App.jsx
│       ├── App.css
│       ├── Dashboard.jsx
│       ├── Dashboard.css
│       ├── index.css
│       └── main.jsx
├── .gitignore
└── README.md
```

## Installation

### Requirements

* Python 3.9 or later
* Node.js and npm
* Git

### 1. Clone the repository

```bash
git clone https://github.com/fatima-alhitmi/studybee.git
cd studybee
```

### 2. Set up the backend

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

Create the database tables:

```bash
python init_db.py
```

To add sample subjects, quizzes, and results to a fresh database, run:

```bash
python seed_data.py
```

Run the backend:

```bash
uvicorn main:app --reload
```

The backend runs at `http://127.0.0.1:8000`.

API documentation is available at `http://127.0.0.1:8000/docs`.

### 3. Set up the frontend

Open a second terminal and run:

```bash
cd studybee/frontend
npm install
npm run dev
```

Open the local address printed by Vite, usually `http://localhost:5173`.

Keep both servers running while using the application.

## API Endpoints

| Method | Endpoint                     | Description                       |
| ------ | ---------------------------- | --------------------------------- |
| GET    | `/`                          | Check the backend status          |
| GET    | `/api/dashboard`             | Retrieve dashboard data           |
| GET    | `/api/study-plan?minutes=90` | Generate a study plan             |
| POST   | `/api/study-buddy`           | Send a message to the Study Buddy |

The study plan endpoint accepts a study duration between 1 and 720 minutes.

## Testing

The following have been checked during development:

* Retrieving dashboard data from the backend.
* Generating a study plan from stored quiz results.
* Allocating the requested study time between subjects.
* Rejecting invalid study durations.
* Building the React frontend for production.

## Future Improvements

Some features I would like to add in future versions include:

* An interactive quiz interface.
* The ability to submit quiz results through the website.
* Support for more subjects and question types.
* Student accounts and individual study histories.
* More advanced personalization and automated testing.

## Author

Fatima Al-Hitmi

GitHub: [fatima-alhitmi](https://github.com/fatima-alhitmi)

