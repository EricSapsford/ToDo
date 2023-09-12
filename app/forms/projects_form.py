from flask_wtf import FlaskForm
from wtforms import StringField, RadioField, SelectField, BooleanField
from wtforms.validators import DataRequired, Length

color_options = [
  "BerryRed",
  "Red",
  "Orange",
  "Yellow",
  "OliveGreen",
  "LimeGreen",
  "Green",
  "MintGreen",
  "Teal",
  "SkyBlue",
  "LightBlue",
  "Blue",
  "Grape",
  "Violet",
  "Lavender",
  "Magenta",
  "Salmon",
  "Charcoal",
  "Grey",
  "Taupe"
]

class ProjectForm(FlaskForm):
  name = StringField("Name", validators=[DataRequired(), Length(min=1, max=255)])
  color = SelectField("Color", choices=color_options, validators=[DataRequired()])
  view = BooleanField("View", validators=[DataRequired()])
