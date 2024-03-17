import SectionForm from "../SectionForm"

function SectionFormCreate({ projectId }) {

  let section = {
    name: "",
    projectId
  }

    return (
      <SectionForm projectId={projectId} formType={"Create"} />
    )
  }

  export default SectionFormCreate
