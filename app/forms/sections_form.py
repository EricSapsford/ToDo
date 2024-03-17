from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Length


class SectionForm(FlaskForm):
    name = StringField("Name", validators=[DataRequired(), Length(min=1, max=255)])
    task_order = StringField("task_order", validators=[Length(min=0, max=510)])
