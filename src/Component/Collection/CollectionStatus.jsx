import React from "react";
import { Stepper, Step, StepLabel } from "@mui/material";

const CollectionStatus = [
  "READY_TO_PICK",
  "INTRANSIT_FROM_CAMPUS",
  "DELIVERED_TO_WAREHOUSE",
  "WASHING",
  "WASHING_DONE",
  "DRYING",
  "DRYING_DONE",
  "IN_SEGREGATION",
  "READY_FOR_DELIVERY",
  "INTRANSIT_FROM_WAREHOUSE",
  "DELIVERED_TO_CAMPUS",
  "DELIVERED_TO_STUDENT",
];

const CollectionStatusSteps = ({ currentStatus = "READY_TO_PICK" }) => {
  const currentIndex = CollectionStatus.indexOf(currentStatus);

  return (
    <Stepper
      activeStep={currentIndex}
      orientation="vertical"
      style={{ marginBlock: "1rem" }}
    >
      {CollectionStatus.map((status, index) => (
        <Step key={status}>
          <StepLabel
            optional={
              index === currentIndex && (
                <div style={{ color: "rgb(3, 201, 215)",marginTop:"0rem" }}>Current Status</div>
              )
            }
            style={{
              color: index <= currentIndex ? "green" : "gray",
            }}
          >
            {status}
          </StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};

export default CollectionStatusSteps;
