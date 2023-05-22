import { useEffect, useState } from "react";
import { useAuthHeader } from "react-auth-kit";
import { useParams } from "react-router-dom";
import ViewInspection from "../components/Content/Inspection/ViewInspection";

const ViewInspectionPage = () => {
  const { carId } = useParams();
  const authHeader = useAuthHeader();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    inspectionNumber: "",
    inspectionDate: "",
    madeBy: {
      name: "",
      workFor: {
        name: "",
        phone: "",
        email: "",
      },
    },
    expiredDate: "",
    firstTime: "",
    car: {
      owner: {
        name: "",
        address: "",
        phone: "",
        email: "",
        role: "",
      },
      specification: {
        wheelFormula: "",
        wheelTread: "",
        overallDimension: "",
        containerDimension: "",
        lengthBase: "",
        kerbMass: "",
        designedAndAuthorizedPayload: "",
        designedAndAuthorizedTotalMass: "",
        designedAndAuthorizedTowedMass: "",
        permissibleCarry: "",
        fuel: "",
        engineDisplacement: "",
        maximumOutputToRpmRatio: "",
        numberOfTiresAndTireSize: "",
      },
      numberPlate: "",
      registrationNumber: "",
      registrationDate: "",
      type: "",
      brand: "",
      modelCode: "",
      engineNumber: "",
      chassisNumber: "",
      manufacturedYear: "",
      manufacturedCountry: "",
      recovered: "",
      purpose: "",
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `https://sleepy-coast-93816.herokuapp.com/api/v1/inspections/${carId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: authHeader(),
            },
          }
        );

        if (!response.ok) {
          throw new Error("Can not get.");
        }

        const res = await response.json();

        setData(res.data.data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.error(err);
      }
    };

    fetchData();
  }, []);

  return <ViewInspection loading={loading} data={data} />;
};

export default ViewInspectionPage;
