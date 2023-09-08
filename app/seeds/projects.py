from app.models.db import db, Project, environment, SCHEMA
from sqlalchemy.sql import text
import datetime
from .data import projects


# Adds demo menu_items
def seed_projects():

    for project in projects:
        new_project = Project(
            name = project["name"],
            color = project["color"],
            view = project["view"],
            user_id = project["user_id"],
            created_at = project["created_at"],
            updated_at = project["updated_at"],
        )
        db.session.add(new_project)

    db.session.commit()


def undo_projects():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.projects RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM projects"))

    db.session.commit()
