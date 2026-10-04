from database import SessionLocal
from models import Student, Subject, Quiz, QuizResult


db = SessionLocal()


student = Student(name="Fatima")
db.add(student)
db.commit()
db.refresh(student)


math = Subject(
    name="Mathematics",
    student_id=student.id
)

chemistry = Subject(
    name="Chemistry",
    student_id=student.id
)

db.add_all([math, chemistry])
db.commit()
db.refresh(math)
db.refresh(chemistry)


algebra_quiz = Quiz(
    title="Algebra Quiz",
    subject_id=math.id
)

geometry_quiz = Quiz(
    title="Geometry Quiz",
    subject_id=math.id
)

bonding_quiz = Quiz(
    title="Chemical Bonding Quiz",
    subject_id=chemistry.id
)

atoms_quiz = Quiz(
    title="Atoms Quiz",
    subject_id=chemistry.id
)

db.add_all([
    algebra_quiz,
    geometry_quiz,
    bonding_quiz,
    atoms_quiz
])

db.commit()

db.refresh(algebra_quiz)
db.refresh(geometry_quiz)
db.refresh(bonding_quiz)
db.refresh(atoms_quiz)


results = [
    QuizResult(
        score=8,
        total_questions=10,
        quiz_id=algebra_quiz.id
    ),

    QuizResult(
        score=6,
        total_questions=10,
        quiz_id=geometry_quiz.id
    ),

    QuizResult(
        score=4,
        total_questions=10,
        quiz_id=bonding_quiz.id
    ),

    QuizResult(
        score=5,
        total_questions=10,
        quiz_id=atoms_quiz.id
    )
]

db.add_all(results)
db.commit()


print("Sample StudyBee data added successfully! 🐝")

db.close()