from app.models.db import db, Task, environment, SCHEMA
from sqlalchemy.sql import text
import datetime
from .data import tasks


# Adds demo menu_items
def seed_tasks():

    for task in tasks:
        new_task = Task(
            name = task["name"],
            description = task["description"],
            labels = task["labels"],
            due_date = task["due_date"],
            project_id = task["project_id"],
            section_id = task["section_id"],
            created_at = task["created_at"],
            updated_at = task["updated_at"],
        )
        db.session.add(new_task)

    db.session.commit()


def undo_tasks():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.tasks RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM tasks"))

    db.session.commit()
