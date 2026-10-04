from sqlalchemy import Column, Integer, String, Float, ForeignKey
from sqlalchemy.orm import relationship

from database import Base


class Student(Base):
    __tablename__ = "students"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)

    subjects = relationship("Subject", back_populates="student")


class Subject(Base):
    __tablename__ = "subjects"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    student_id = Column(Integer, ForeignKey("students.id"))

    student = relationship("Student", back_populates="subjects")
    quizzes = relationship("Quiz", back_populates="subject")


class Quiz(Base):
    __tablename__ = "quizzes"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    subject_id = Column(Integer, ForeignKey("subjects.id"))

    subject = relationship("Subject", back_populates="quizzes")
    results = relationship("QuizResult", back_populates="quiz")


class QuizResult(Base):
    __tablename__ = "quiz_results"

    id = Column(Integer, primary_key=True, index=True)
    score = Column(Float, nullable=False)
    total_questions = Column(Integer, nullable=False)
    quiz_id = Column(Integer, ForeignKey("quizzes.id"))

    quiz = relationship("Quiz", back_populates="results")