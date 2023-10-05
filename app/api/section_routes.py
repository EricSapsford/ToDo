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
