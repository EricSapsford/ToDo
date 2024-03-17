from app.models.db import db, Section, environment, SCHEMA
from sqlalchemy.sql import text
import datetime
from .data import sections


# Adds demo menu_items
def seed_sections():

    for section in sections:
        new_section = Section(
            name=section["name"],
            project_id=section["project_id"],
            task_order=section["task_order"],
            created_at=section["created_at"],
            updated_at=section["updated_at"],
        )
        db.session.add(new_section)

    db.session.commit()


def undo_sections():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.sections RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM sections"))

    db.session.commit()
