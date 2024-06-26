import { useNavigate, useParams } from "react-router-dom";
import ViewCar from "../components/Content/Car/ViewCar";
import { useEffect, useState } from "react";
import { useAuthHeader } from "react-auth-kit";
import { Button } from "antd";
import { IoArrowBackOutline } from "react-icons/io5";

const ViewCarPage = () => {
  const { carId } = useParams();
  const authHeader = useAuthHeader();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
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
    document.title = "Thông tin phương tiện";

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/api/v1/cars/${carId}`,
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
        setError(true);
        if (import.meta.env.VITE_ENV === "development") console.error(err);
      }
    };

    fetchData();
  }, []);

  return (
    <ViewCar
      isLoading={isLoading}
      carData={carData}
      anotherData={anotherData}
      error={error}
      title={
        <Button
          type="text"
          icon={
            <IoArrowBackOutline
              style={{ fontSize: "2rem", verticalAlign: "middle" }}
            />
          }
          onClick={() => {
            navigate(-1);
          }}
        />
      }
    />
  );
};

export default ViewCarPage;
