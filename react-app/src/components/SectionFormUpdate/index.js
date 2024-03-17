import SectionForm from "../SectionForm"

function SectionFormUpdate({ section, sectionId }) {

    return (
      <SectionForm section={section} sectionId={sectionId} formType={"Update"} />
    )
  }

  export default SectionFormUpdate
