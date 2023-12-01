from flask import Blueprint, request
from ..models.db import db, Task, Section
from flask_login import login_required, current_user
from ..forms.tasks_form import TaskForm
import datetime
import re


task_routes = Blueprint("tasks", __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

### Get all tasks for today
@task_routes.route("/today")
@login_required
def todays_tasks():
    tasks = Task.query.filter(Task.due_date == str(datetime.date.today())).all()
    if tasks:
        res = {"tasks": [task.to_dict() for task in tasks]}
        return res
    else:
        res = { "message": "No tasks for today"}, 200
        return res


### Update a task
@task_routes.route("/<int:id>/update", methods=["PUT"])
@login_required
def update_task(id):

    form = TaskForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        task_to_update = Task.query.get(id)
        task_to_update.name = form.data["name"]
        task_to_update.description = form.data["description"]
        task_to_update.labels = form.data["labels"]
        task_to_update.due_date = form.data["due_date"]
        task_to_update.section_id = form.data["section_id"]
        task_to_update.updated_at = datetime.datetime.now()
        db.session.commit()
        return task_to_update.to_dict()
    if form.errors:
        return { "errors": validation_errors_to_error_messages(form.errors) }

### Delete a task
@task_routes.route("/<int:id>/delete", methods=["DELETE"])
@login_required
def delete_task(id):

    task_to_delete = Task.query.get(id)
    section_to_update = Section.query.get(task_to_delete.section_id)

    #regex optimization start
    #--------------------------------------
    task_order_string = section_to_update.task_order

    patternBegEnd = r'^' + re.escape(str(id)) + ',|,' + re.escape(str(id)) + '$'
    patternMid = r',' + re.escape(str(id)) + ','

    task_order_string = re.sub(patternBegEnd, "", task_order_string)
    task_order_string = re.sub(patternMid, ",", task_order_string)

    section_to_update.task_order = task_order_string
    #regex optimization end
    #--------------------------------------

    db.session.delete(task_to_delete)
    db.session.commit()
    was_it_deleted = Task.query.get(id)
    if was_it_deleted == None:
        res = {
            "message": "Successfully deleted task",
            "id": id
        }
        return res
    else:
        return { "message": "Unable to delete" }, 400
