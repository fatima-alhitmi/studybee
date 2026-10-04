from database import SessionLocal
from models import Subject, Quiz, QuizResult


def analyze_subject(subject_id):
    db = SessionLocal()

    subject = db.query(Subject).filter(
        Subject.id == subject_id
    ).first()

    if not subject:
        db.close()
        return None

    quizzes = db.query(Quiz).filter(
        Quiz.subject_id == subject_id
    ).all()

    total_score = 0
    total_questions = 0

    for quiz in quizzes:
        results = db.query(QuizResult).filter(
            QuizResult.quiz_id == quiz.id
        ).all()

        for result in results:
            total_score += result.score
            total_questions += result.total_questions

    if total_questions == 0:
        db.close()

        return {
            "subject": subject.name,
            "performance": 0,
            "level": "No data",
            "priority": 100,
            "reason": "There are not enough quiz results yet."
        }

    performance = (total_score / total_questions) * 100

    if performance < 50:
        level = "Weak"
    elif performance < 75:
        level = "Needs Improvement"
    else:
        level = "Strong"

    priority = round(100 - performance, 1)

    if performance < 50:
        reason = (
            f"Your recent performance in {subject.name} "
            f"is {round(performance, 1)}%, so this subject needs "
            "more study attention."
        )

    elif performance < 75:
        reason = (
            f"Your performance in {subject.name} is "
            f"{round(performance, 1)}%. You are making progress, "
            "but additional practice could improve your score."
        )

    else:
        reason = (
            f"Your performance in {subject.name} is "
            f"{round(performance, 1)}%, so this subject currently "
            "needs less study priority."
        )

    db.close()

    return {
        "subject": subject.name,
        "performance": round(performance, 1),
        "level": level,
        "priority": priority,
        "reason": reason
    }


def analyze_all_subjects():
    db = SessionLocal()

    subjects = db.query(Subject).all()

    db.close()

    results = []

    for subject in subjects:
        analysis = analyze_subject(subject.id)

        if analysis:
            results.append(analysis)

    # Highest priority = weakest subject
    results.sort(
        key=lambda x: x["priority"],
        reverse=True
    )

    return results