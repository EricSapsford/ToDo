from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
import enum

import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")


db = SQLAlchemy()

# helper function for adding prefix to foreign key column references in production
def add_prefix_for_prod(attr):
    if environment == "production":
        return f"{SCHEMA}.{attr}"
    else:
        return attr


# ================================== USERS MODEL ==================================
# ================================== USERS MODEL ==================================
# ================================== USERS MODEL ==================================
# ================================== USERS MODEL ==================================
# ================================== USERS MODEL ==================================

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(80), nullable=False)
    created_at = db.Column(db.Date, nullable=False)
    updated_at = db.Column(db.Date, nullable=False)

    # one-to-many: one user can have many projects
    projects_rel = db.relationship("Project", back_populates="users_rel", cascade="all, delete-orphan")

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            "firstName": self.first_name,
            "last_name": self.last_name,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at
        }


# ================================ PROJECTS MODELS ================================
# ================================ PROJECTS MODELS ================================
# ================================ PROJECTS MODELS ================================
# ================================ PROJECTS MODELS ================================

class ProjectColor(enum.Enum):
    BerryRed = "BerryRed"
    Red = "Red"
    Orange = "Orange"
    Yellow = "Yellow"
    OliveGreen = "OliveGreen"
    LimeGreen = "LimeGreen"
    Green = "Green"
    MintGreen = "MintGreen"
    Teal = "Teal"
    SkyBlue = "SkyBlue"
    LightBlue = "LightBlue"
    Blue = "Blue"
    Grape = "Grape"
    Violet = "Violet"
    Lavender = "Lavender"
    Magenta = "Magenta"
    Salmon = "Salmon"
    Charcoal = "Charcoal"
    Grey = "Grey"
    Taupe = "Taupe"

    def to_list():
        return [
           "BerryRed"
           "Red"
           "Orange"
           "Yellow"
           "OliveGreen"
           "LimeGreen"
           "Green"
           "MintGreen"
           "Teal"
           "SkyBlue"
           "LightBlue"
           "Blue"
           "Grape"
           "Violet"
           "Lavender"
           "Magenta"
           "Salmon"
           "Charcoal"
           "Grey"
           "Taupe"
        ]

class Project(db.Model):
    __tablename__ = "projects"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    color = db.Column(db.Enum(ProjectColor), nullable=False)
    view = db.Column(db.Boolean, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    created_at = db.Column(db.Date, nullable=False)
    updated_at = db.Column(db.Date, nullable=False)

    # one-to-many: one user can have many projects
    users_rel = db.relationship("User", back_populates="projects_rel")

    # one-to-many: one project can have many tasks
    tasks_rel = db.relationship("Task", back_populates="projects_rel", cascade="all, delete-orphan")

    #one-to-many: one project can have many sections
    sections_rel = db.relationship("Section", back_populates="projects_rel", cascade="all, delete-orphan")

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "color": str(self.color).split(".")[1],
            "view": self.view,
            "userId": self.user_id,
            "createdAt": self.created_at,
            "updatedAt": self.updated_at,
        }


# ================================== TASKS MODEL ==================================
# ================================== TASKS MODEL ==================================
# ================================== TASKS MODEL ==================================
# ================================== TASKS MODEL ==================================

class Task(db.Model):
    __tablename__ = "tasks"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String(2000), nullable=True)
    labels = db.Column(db.String(800), nullable=True)
    status = db.Column(db.Boolean, nullable=False)
    project_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("projects.id")), nullable=False)
    section_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("sections.id")), nullable=True)
    created_at = db.Column(db.Date, nullable=False)
    updated_at = db.Column(db.Date, nullable=False)

    # one-to-many: one project can have many tasks
    projects_rel = db.relationship("Project", back_populates="tasks_rel")

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "labels": self.labels,
            "status": self.status,
            "projectId": self.project_id,
            "sectionId": self.section_id,
            "createdAt": self.created_at,
            "updatedAt": self.updated_at,
        }


# ================================ SECTIONS MODEL =================================
# ================================ SECTIONS MODEL =================================
# ================================ SECTIONS MODEL =================================
# ================================ SECTIONS MODEL =================================

class Section(db.Model):
    __tablename__ = "sections"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    project_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("projects.id")), nullable=False)
    created_at = db.Column(db.Date, nullable=False)
    updated_at = db.Column(db.Date, nullable=False)

    # one-to-many: one project can have many sections
    projects_rel = db.relationship("Project", back_populates="sections_rel")

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "projectId": self.project_id,
            "createdAt": self.created_at,
            "updatedAt": self.updated_at,
        }
