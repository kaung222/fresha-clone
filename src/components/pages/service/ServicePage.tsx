import React from "react";
import { AllServices, Heading } from "./serviceSection";
import Footer from "@/components/layout/Footer";

type Props = {};

const ServicePage = (props: Props) => {
  return (
    <>
      <Heading />
      <AllServices />
      <Footer />
    </>
  );
};

export default ServicePage;
