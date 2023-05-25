import { useParams } from "react-router-dom";
import ViewCar from "../components/Content/Car/ViewCar";
import { useEffect, useState } from "react";
import { useAuthHeader } from "react-auth-kit";

const ViewCarPage = () => {
  const { carId } = useParams();
  const authHeader = useAuthHeader();
  const [isLoading, setIsLoading] = useState(false);
  const [carData, setCarData] = useState({
    numberPlate: "",
    registrationNumber: "",
    registrationDate: "",
    type: "",
    brand: "",
    modelCode: "",
    engineNumber: "",
    chassisNumber: "",
    color: "",
    manufacturedYear: "",
    manufacturedCountry: "",
    boughtPlace: "",
    purpose: "",
    recovered: "",
    inspected: "",
  });

  const [anotherData, setAnotherData] = useState({
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
    inspections: [
      {
        id: "",
        inspectionDate: "",
        expiredDate: "",
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `https://sleepy-coast-93816.herokuapp.com/api/v1/cars/${carId}`,
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

        const data = res.data.data;

        setCarData({
          numberPlate: data.numberPlate,
          registrationNumber: data.registrationNumber,
          registrationDate: data.registrationDate,
          type: data.type,
          brand: data.brand,
          modelCode: data.modelCode,
          engineNumber: data.engineNumber,
          chassisNumber: data.chassisNumber,
          color: data.color,
          manufacturedYear: data.manufacturedYear,
          manufacturedCountry: data.manufacturedCountry,
          boughtPlace: data.boughtPlace,
          purpose: data.purpose,
          recovered: data.recovered,
          inspected: data.inspected,
        });

        const { owner, specification, inspections } = data;

        setAnotherData({ owner, specification, inspections });

        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        console.error(err);
      }
    };

    fetchData();
  }, []);

  return (
    <ViewCar
      isLoading={isLoading}
      carData={carData}
      anotherData={anotherData}
    />
  );
};

export default ViewCarPage;
