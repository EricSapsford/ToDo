import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
import { useModal } from "../../context/Modal";
import OpenModalButton from "../OpenModalButton";
import SectionFormDelete from "../SectionFormDelete"
import * as sectionActions from "../../store/section"
import "./SectionForm.css"

function SelectUpdate ({ section, sectionId, projectId }) {
  const dispatch = useDispatch()
  const { closeModal } = useModal()

  const [name, setName] = useState(section?.name)
  const [disabled, setDisabled] = useState(true)

  const [editSectionNameToggle, setEditSectionNameToggle] = useState(false)
  const [gutsToggle, setGutsToggle] = useState(false)
  const [errors, setErrors] = useState([]);

  const toggleSectionName = () => {
    setEditSectionNameToggle(!editSectionNameToggle)
    setGutsToggle(true)
  }

  const toggleGuts = () => {
    setGutsToggle(!gutsToggle)
  }

  useEffect(() => {
    if (name && name.length > 0) {
      setDisabled(false)
    } else {
      setDisabled(true)
    }
  }, [name])

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("button clicked")

    section = {
      ...section,
      name,
      sectionId,
      projectId
    }
     if (formType === "Update") {

      try {
        // console.log("This is what you're sending", section)
        const res = await dispatch(sectionActions.updateSectionThunk(section));
        toggleSectionName()
        {res.errors ? setErrors(res.errors) : setErrors([]); }
        if (res.ok) {
          setErrors([]);
        } else {
          return res
        }
      } catch (res) {
        const data = res
        if (data && data.errors) {
          setErrors(data.errors);
        }
      }
    }
  }

  return (
    <>
    <div className="section-form-overdiv">
      {editSectionNameToggle ?
      <form
        onSubmit={handleSubmit}
        // encType="multipart/form-data"
      >

      {formType === "Update" ?
      <div>
        <div>
          <input
            className="section-name-input-div"
            type="text"
            name="name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            placeholder={section.name}
          />
        </div>
        {errors.name && (<div className="errorsDiv">{errors.name}</div>)}
      </div>
      :
      <div>
        <div>
          <input
            className="section-name-input-div"
            type="text"
            name="name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            placeholder={"Name this section"}
          />
        </div>
        {errors.name && (<div className="errorsDiv">{errors.name}</div>)}
      </div>}

      <div className="section-form-buttons">
        <div>
          <button
            className="section-form-submit-button"
            onClick={handleSubmit}
            disabled={disabled}
          >
            {formType === "Create" ? "Add section" : "Save"}
          </button>
        </div>

        <div>
          <button
            className="section-form-cancel-button"
            onClick={toggleSectionName}
          >
            Cancel
          </button>
        </div>
      </div>

      </form>
      :
      formType === "Create" ?
      <button
        className="section-title-create-button"
        onClick={toggleSectionName}
        onMouseEnter={toggleGuts}
        onMouseLeave={toggleGuts}
      >
        <div className="section-form-create-button-div">Add Section</div>
      </button>
      :
      <span>
        <button className="section-title-edit-button" onClick={toggleSectionName}   aria-label={`${section.name} section. Click to edit`}>
          {section.name}
        </button>

        <span className="section-form-delete-button">
        <OpenModalButton
          buttonText={<i class="fa-regular fa-trash-can fa-xl"></i>}
          modalComponent={<SectionFormDelete sectionId={sectionId}/>}
        />
        </span>
      </span>
      }
    </div>
    </>
  )
}

export default SelectUpdate
