
from analysis import analyze_all_subjects


def create_study_plan(total_minutes=90):
    subjects = analyze_all_subjects()

    if not subjects:
        return []

    # A perfect score should not cause division by zero.
    priorities = [
        max(0, subject["priority"])
        for subject in subjects
    ]

    total_priority = sum(priorities)

    if total_priority == 0:
        priorities = [1] * len(subjects)
        total_priority = len(subjects)

    # Calculate each subject's proportional share.
    exact_minutes = [
        total_minutes * priority / total_priority
        for priority in priorities
    ]

    # Use whole minutes and distribute the remainder fairly.
    allocated_minutes = [
        int(minutes)
        for minutes in exact_minutes
    ]

    remaining_minutes = total_minutes - sum(allocated_minutes)

    order = sorted(
        range(len(subjects)),
        key=lambda index: exact_minutes[index] - allocated_minutes[index],
        reverse=True,
    )

    for index in order[:remaining_minutes]:
        allocated_minutes[index] += 1

    plan = []

    for subject, minutes in zip(subjects, allocated_minutes):
        reason = (
            f"StudyBee recommends {minutes} minutes for "
            f"{subject['subject']} because your performance "
            f"is {subject['performance']}%, helping you prioritize "
            "subjects that need more practice."
        )

        plan.append({
            "subject": subject["subject"],
            "minutes": minutes,
            "performance": subject["performance"],
            "priority": subject["priority"],
            "level": subject["level"],
            "reason": reason,
        })

    return plan