from flask.cli import AppGroup
from .users import seed_users, undo_users
from .projects import seed_projects, undo_projects
from .tasks import seed_tasks, undo_tasks
from .sections import seed_sections, undo_sections

from app.models.db import db, environment, SCHEMA

seed_commands = AppGroup('seed')


# Create the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        undo_tasks()
        undo_sections()
        undo_projects()
        undo_users()
    seed_users()
    seed_projects()
    seed_sections()
    seed_tasks()


# Create the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_tasks()
    undo_sections()
    undo_projects()
    undo_users()
