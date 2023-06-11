import InspectionsTable from "../Inspection/InspectionsTable";

const CentreInspections = (props) => {
  return <InspectionsTable mode="all" centreId={props.centreId} />;
};

export default CentreInspections;
