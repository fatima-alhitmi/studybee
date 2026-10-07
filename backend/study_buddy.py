from analysis import analyze_all_subjects
from planner import create_study_plan


def get_study_buddy_response(message):
    subjects = analyze_all_subjects()

    if not subjects:
        return "I don't have enough study data yet. Take a quiz first! 🐝"

    weakest = subjects[0]

    message_lower = message.lower()

    if "weak" in message_lower or "weakest" in message_lower:
        return (
            f"Your weakest subject is {weakest['subject']} "
            f"with a performance of {weakest['performance']}%. "
            f"{weakest['reason']}"
        )

    if "plan" in message_lower or "study" in message_lower:
        plan = create_study_plan(90)

        response = "Here is your personalized study plan:\n\n"

        for task in plan:
            response += (
                f"🐝 {task['subject']}: {task['minutes']} minutes\n"
                f"   {task['reason']}\n\n"
            )

        return response

    if "chemistry" in message_lower:
        chemistry = next(
            (
                subject
                for subject in subjects
                if subject["subject"] == "Chemistry"
            ),
            None
        )

        if chemistry:
            return (
                f"Your Chemistry performance is "
                f"{chemistry['performance']}%. "
                f"I recommend giving Chemistry extra attention today. 🧪"
            )

    if "math" in message_lower or "mathematics" in message_lower:
        mathematics = next(
            (
                subject
                for subject in subjects
                if subject["subject"] == "Mathematics"
            ),
            None
        )

        if mathematics:
            return (
                f"Your Mathematics performance is "
                f"{mathematics['performance']}%. "
                f"You're making progress, but some extra practice "
                f"could help. 📐"
            )

    return (
        f"Hi! 🐝 I'm your StudyBee Study Buddy. "
        f"Your current highest-priority subject is "
        f"{weakest['subject']}. "
        f"Ask me about your weakest subject, your study plan, "
        f"or a specific subject!"
    )