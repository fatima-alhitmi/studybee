from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from analysis import analyze_all_subjects
from planner import create_study_plan
from study_buddy import get_study_buddy_response


app = FastAPI(
    title="StudyBee API",
    description="An adaptive AI study planner",
    version="1.0.0",
)


# Allow the React frontend to communicate with the backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class StudyBuddyRequest(BaseModel):
    message: str


@app.get("/")
def home():
    return {
        "message": "StudyBee is buzzing! 🐝"
    }


@app.get("/api/dashboard")
def get_dashboard():
    subjects = analyze_all_subjects()

    if not subjects:
        return {
            "subjects": [],
            "overall_performance": 0,
            "highest_priority": None,
            "subjects_count": 0,
            "study_plan": create_study_plan(90),
        }

    overall_performance = round(
        sum(subject["performance"] for subject in subjects)
        / len(subjects),
        1,
    )

    highest_priority = subjects[0]["subject"]

    return {
        "subjects": subjects,
        "overall_performance": overall_performance,
        "highest_priority": highest_priority,
        "subjects_count": len(subjects),
        "study_plan": create_study_plan(90),
    }


@app.get("/api/study-plan")
def get_study_plan(minutes: int = 90):
    if minutes < 1 or minutes > 720:
        raise HTTPException(
            status_code=400,
            detail="Study time must be between 1 and 720 minutes.",
        )

    return {
        "total_minutes": minutes,
        "tasks": create_study_plan(minutes),
    }


@app.post("/api/study-buddy")
def study_buddy(request: StudyBuddyRequest):
    response = get_study_buddy_response(request.message)

    return {
        "reply": response
    }

