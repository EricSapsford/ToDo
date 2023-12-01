from flask import Blueprint, request
from ..models.db import db, Project, Task, Section
from flask_login import login_required, current_user
from ..forms.projects_form import ProjectForm
from ..forms.tasks_form import TaskForm
from ..forms.sections_form import SectionForm
import datetime

project_routes = Blueprint("projects", __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

# Get all projects for a specific user
@project_routes.route("/<int:id>")
def get_all_projects(id):
    projects = Project.query.filter(id == Project.user_id).all()
    res = {"projects": [project.to_dict() for project in projects]}
    return res

# Get all sections for a specific project
@project_routes.route("/<int:id>/sections")
def get_all_sections(id):
    sections = Section.query.filter(Section.project_id == id).all()
    res = {"sections": [section.to_dict() for section in sections]}
    return res

# Get all tasks for a specific project
@project_routes.route("/<int:id>/tasks")
@login_required
def get_all_tasks(id):
    tasks = Task.query.filter(Task.project_id == id).all()
    res = {"tasks": [task.to_dict() for task in tasks]}
    return res

# Get details for a specific project
@project_routes.route("/<int:id>")
@login_required
def get_one_project(id):
    project = Project.query.get(id)
    res = project.to_dict()
    return res

# Create a new Project for a user
@project_routes.route("/create", methods=["POST"])
@login_required
def create_project():

    form = ProjectForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_project = Project(
            name=form.data["name"],
            color=form.data["color"],
            view=form.data["view"],
            user_id=current_user.id,
            created_at=datetime.datetime.now(),
            updated_at=datetime.datetime.now()
        )
        db.session.add(new_project)
        db.session.commit()
        new_section = Section(
            name="Section name",
            task_order="empty",
            project_id=new_project.id,
            created_at=datetime.datetime.now(),
            updated_at=datetime.datetime.now()
        )
        db.session.add(new_section)
        db.session.commit()
        res = new_project.to_dict()
        return res
    if form.errors:
        return {"errors": validation_errors_to_error_messages(form.errors)}, 400

# Create a new Section for a project
@project_routes.route("/<int:id>/section/create", methods=["POST"])
@login_required
def create_section(id):

    form = SectionForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_section = Section(
            name=form.data["name"],
            project_id=id,
            task_order="empty",
            created_at=datetime.datetime.now(),
            updated_at=datetime.datetime.now()
        )
        db.session.add(new_section)
        db.session.commit()
        res = new_section.to_dict()
        return res
    if form.errors:
        return {"errors": validation_errors_to_error_messages(form.errors)}, 400


# Create a new Task for a Project
@project_routes.route("/<int:id>/create", methods=["POST"])
@login_required
def create_task(id):

    form = TaskForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_task = Task(
            name=form.data["name"],
            description=form.data["description"],
            labels=form.data["labels"],
            due_date = form.data["due_date"],
            project_id=id,
            section_id=form.data["section_id"],
            created_at=datetime.datetime.now(),
            updated_at=datetime.datetime.now()
        )
        db.session.add(new_task)
        db.session.commit()
        section_to_update = Section.query.get(form.data["section_id"])
        if section_to_update.task_order == "empty":
            section_to_update.task_order = f"{new_task.id}"
        else:
            section_to_update.task_order = section_to_update.task_order + f",{new_task.id}"
        db.session.commit()
        res = new_task.to_dict()
        return res
    if form.errors:
        return {"errors": validation_errors_to_error_messages(form.errors)}, 400


# Update a project for a user
@project_routes.route("/<int:id>/update", methods=["PUT"])
@login_required
def update_project(id):

    form = ProjectForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        project_to_update = Project.query.get(id)
        project_to_update.name = form.data["name"]
        project_to_update.color = form.data["color"]
        project_to_update.view = form.data["view"]
        project_to_update.updated_at = datetime.datetime.now()
        db.session.commit()
        return project_to_update.to_dict()
    if form.errors:
        return {"errors": validation_errors_to_error_messages(form.errors)}

# Delete a project for a user


@project_routes.route("/<int:id>/delete", methods=["DELETE"])
@login_required
def delete_project(id):

    project_to_delete = Project.query.get(id)
    db.session.delete(project_to_delete)
    db.session.commit()
    was_it_deleted = Project.query.get(id)
    if was_it_deleted == None:
        res = {
            "message": "Successfully deleted project",
            "id": id
        }
        return res
    else:
        return {"message": "Unable to delete"}, 400
