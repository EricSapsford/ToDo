import { useState, useEffect } from "react";
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
  const [disabled, setDisabled] = useState(true)

  const [editSectionNameToggle, setEditSectionNameToggle] = useState(false)
  const [gutsToggle, setGutsToggle] = useState(false)
  const [errors, setErrors] = useState([]);

  const toggleSectionName = () => {
    setEditSectionNameToggle(!editSectionNameToggle)
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
      {gutsToggle ?
        <svg className="section-form-create-button-svg"width={24} height={24} viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M19.5 20a.5.5 0 0 1 0 1h-15a.5.5 0 0 1 0-1h15zM18 6a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h12zm-6 3a.5.5 0 0 0-.5.5v2h-2a.5.5 0 0 0-.492.41L9 12a.5.5 0 0 0 .5.5h2v2a.5.5 0 0 0 .41.492L12 15a.5.5 0 0 0 .5-.5v-2h2a.5.5 0 0 0 .492-.41L15 12a.5.5 0 0 0-.5-.5h-2v-2a.5.5 0 0 0-.41-.492zm7.5-6a.5.5 0 0 1 0 1h-15a.5.5 0 0 1 0-1h15z"
          >
          </path>
        </svg>
        :
        <svg className="section-form-create-button-svg"width={24} height={24} viewBox="0 0 24 24">
        <path
          fill="currentColor"
          d="M19.5 20a.5.5 0 0 1 0 1h-15a.5.5 0 0 1 0-1h15zM18 6a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h12zm0 1H6a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1zm-6 2a.5.5 0 0 1 .5.5v2h2a.5.5 0 0 1 0 1h-2v2a.5.5 0 0 1-1 0v-2h-2a.5.5 0 0 1 0-1h2v-2A.5.5 0 0 1 12 9zm7.5-6a.5.5 0 0 1 0 1h-15a.5.5 0 0 1 0-1h15z"
        >
        </path>
      </svg>
      }
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

export default SectionForm
