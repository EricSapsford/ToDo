import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
import { useModal } from "../../context/Modal";
import OpenModalButton from "../OpenModalButton";
import SectionFormDelete from "../SectionFormDelete"
import * as sectionActions from "../../store/section"
import "./SectionForm.css"

function SectionForm ({ section, sectionId, projectId, formType }) {
  const dispatch = useDispatch()
  const { closeModal } = useModal()

  const [name, setName] = useState(section?.name)
  const [placeholderCont, setPlaceholderCont] = useState()

  const [editSectionNameToggle, setEditSectionNameToggle] = useState(false)
  const [errors, setErrors] = useState([]);

  const toggleSectionName = () => {
    setEditSectionNameToggle(!editSectionNameToggle)
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("button clicked")

    section = {
      ...section,
      name,
      sectionId,
      projectId
    }

    if (formType === "Create") {

      try {
        console.log("This is what you're sending", section)
        const res = await dispatch(sectionActions.createSectionThunk(section));
        toggleSectionName()
        {res.errors ? setErrors(res.errors) : setErrors([]); }
        if (res.section.id) {
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
    } else if (formType === "Update") {

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
    <div>
      {editSectionNameToggle ?
      <form
        onSubmit={handleSubmit}
        // encType="multipart/form-data"
      >

      {formType === "Update" ?
      <div>
        <div className="section-name-input-div">
          <input
            type="text"
            name="name"
            size={40}
            onChange={(e) => setName(e.target.value)}
            value={name}
            placeholder={section.name}
          />
        </div>
        {errors.name && (<div className="errorsDiv">{errors.name}</div>)}
      </div>
      :
      <div>
        <div className="section-name-input-div">
          <input
            type="text"
            name="name"
            size={40}
            onChange={(e) => setName(e.target.value)}
            value={name}
            placeholder={"Name this section"}
          />
        </div>
        {errors.name && (<div className="errorsDiv">{errors.name}</div>)}
      </div>}


      <div className="section-form-submit-button">
        <button onClick={handleSubmit}>
          {formType === "Create" ? "Add section" : "Save"}
        </button>
      </div>

      <div className="section-form-cancel-button">
        <button onClick={toggleSectionName}>
          Cancel
        </button>
      </div>

      </form>
      :
      formType === "Create" ?
      <button className="section-title-create-button" onClick={toggleSectionName}>
      <h3>Add Section</h3>
    </button>
      :
      <span>
        <button className="section-title-edit-button" onClick={toggleSectionName}   aria-label={`${section.name} section. Click to edit`}>
          <h3>{section.name}</h3>
        </button>

        <OpenModalButton
          buttonText={<i class="fa-regular fa-trash-can fa-xl"></i>}
          modalComponent={<SectionFormDelete sectionId={sectionId}/>}
        />
      </span>
      }
    </div>
    </>
  )
}

export default SectionForm
