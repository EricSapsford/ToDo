from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, IntegerField
from wtforms.validators import DataRequired, Length


class TaskForm(FlaskForm):
  name = StringField("Name", validators=[DataRequired(), Length(min=1, max=255)])
  description = StringField("Description", validators=[Length(min=1, max=2000)])
  labels = StringField("Labels", validators=[Length(min=1, max=800)])
  status = BooleanField("Status")
  section_id = IntegerField("Section")