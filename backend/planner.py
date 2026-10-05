from analysis import analyze_all_subjects


def create_study_plan(total_minutes=90):

    subjects = analyze_all_subjects()

    if not subjects:
        return []

    total_priority = sum(
        subject["priority"]
        for subject in subjects
    )

    plan = []

    for subject in subjects:

        minutes = round(
            total_minutes
            * subject["priority"]
            / total_priority
        )

        reason = (
            f"StudyBee recommends {minutes} minutes for "
            f"{subject['subject']} because your performance "
            f"is {subject['performance']}%, making it a high-priority subject."
        )

        task = {
            "subject": subject["subject"],
            "minutes": minutes,
            "performance": subject["performance"],
            "priority": subject["priority"],
            "level": subject["level"],
            "reason": reason
        }

        plan.append(task)

    return plan

