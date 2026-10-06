
from database import SessionLocal
from models import Subject, Quiz, QuizResult


quizzes = {
    "Mathematics": [
        {
            "question": "What is 5 × 6?",
            "options": ["20", "25", "30", "35"],
            "answer": "30"
        },
        {
            "question": "What is 12 + 8?",
            "options": ["18", "20", "22", "24"],
            "answer": "20"
        },
        {
            "question": "What is 9²?",
            "options": ["18", "27", "81", "90"],
            "answer": "81"
        }
    ],

    "Chemistry": [
        {
            "question": "What is the chemical symbol for oxygen?",
            "options": ["O", "Ox", "C", "H"],
            "answer": "O"
        },
        {
            "question": "What is H₂O commonly called?",
            "options": ["Oxygen", "Hydrogen", "Water", "Salt"],
            "answer": "Water"
        },
        {
            "question": "What is the atomic number of hydrogen?",
            "options": ["1", "2", "8", "10"],
            "answer": "1"
        }
    ]
}


def get_quiz(subject):

    if subject not in quizzes:
        return []

    return quizzes[subject]


def calculate_score(subject, answers):

    quiz = get_quiz(subject)

    if not quiz:
        return None

    score = 0

    for question, answer in zip(quiz, answers):

        if answer == question["answer"]:
            score += 1

    total_questions = len(quiz)

    percentage = (score / total_questions) * 100

    return {
        "subject": subject,
        "score": score,
        "total_questions": total_questions,
        "percentage": round(percentage, 1)
    }


def save_quiz_result(subject, score, total_questions):

    db = SessionLocal()

    subject_record = db.query(Subject).filter(
        Subject.name == subject
    ).first()

    if not subject_record:
        db.close()
        return None

    quiz = db.query(Quiz).filter(
        Quiz.subject_id == subject_record.id
    ).first()

    if not quiz:
        db.close()
        return None

    result = QuizResult(
        score=score,
        total_questions=total_questions,
        quiz_id=quiz.id
    )

    db.add(result)
    db.commit()
    db.refresh(result)

    result_id = result.id

    db.close()

    return result_id

