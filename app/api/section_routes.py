from flask import Blueprint, request
from ..models.db import db, Project, Task, Section
from flask_login import login_required, current_user
from ..forms.sections_form import SectionForm
import datetime

section_routes = Blueprint("sections", __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

# Update a section

@section_routes.route("/<int:id>/update", methods=["PUT"])
@login_required
def update_section(id):

    form = SectionForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        section_to_update = Section.query.get(id)
        section_to_update.name = form.data["name"]
        section_to_update.task_order = form.data["task_order"]
        db.session.commit()
        return section_to_update.to_dict()
    if form.errors:
        return {"errors": validation_errors_to_error_messages(form.errors)}

# Delete a section

@section_routes.route("/<int:id>/delete", methods=["DELETE"])
@login_required
def delete_section(id):

    section_to_delete = Section.query.get(id)
    db.session.delete(section_to_delete)
    db.session.commit()
    was_it_deleted = Section.query.get(id)
    if was_it_deleted == None:
        res = {
            "message": "Successfully deleted Section",
            "id": id
        }
        return res
    else:
        return {"message": "Unable to delete"}, 400

# Drag a Task between sections
@section_routes.route("/dragBetween", methods=["PUT"])
@login_required
def drag_between():

    section_1_to_update = Section.query.get(int(request.json["source_section_id"]))
    section_2_to_update = Section.query.get(int(request.json["destination_section_id"]))
    task_to_update = Task.query.get(int(request.json["task_id"]))

    section_1_to_update.task_order = ",".join([ele for ele in request.json["source_task_order"]])
    section_2_to_update.task_order = ",".join([ele for ele in request.json["destination_task_order"]])

    task_to_update.section_id = int(request.json["destination_section_id"])

    db.session.commit()

    source = section_1_to_update.to_dict()
    destination = section_2_to_update.to_dict()
    task = task_to_update.to_dict()

    res = {
        "source": source,
        "destination": destination,
        "task": task
    }

    return res
