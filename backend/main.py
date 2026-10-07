from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from study_buddy import get_study_buddy_response


app = FastAPI()


# Allow the React frontend to communicate with the FastAPI backend
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


@app.post("/api/study-buddy")
def study_buddy(request: StudyBuddyRequest):

    response = get_study_buddy_response(
        request.message
    )

    return {
        "reply": response
    }
