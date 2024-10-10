import React from "react";
import { Stepper, Step, StepLabel } from "@mui/material";

const CollectionStatus = [
  "READY_TO_PICK",
  "INTRANSIT_FROM_cAMPUS",
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

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString(); // Format the date to a readable string
};

const CollectionStatusSteps = ({ currentStatus = "READY_TO_PICK", previousStatus = [] }) => {
  const currentIndex = CollectionStatus.indexOf(currentStatus);

  return (
    <div style={{ marginBlock: "1rem" }}>
      <h1 style={{ fontSize: "22px" }}>Collection Current Status</h1>
      <p style={{ color: "rgb(4, 201, 215)" }}>{currentStatus}</p>

      <Stepper activeStep={currentIndex} orientation="vertical" style={{ marginBlock: "1rem" }}>
        {CollectionStatus.map((status, index) => {
          const prevStatus = previousStatus.find((s) => s.status === status);
          const updatedTime = prevStatus ? formatDate(prevStatus.updated_time) : null;

          return (
            <Step key={status}>
              <StepLabel
                optional={
                  <>
                    {index === currentIndex && (
                      <div style={{ color: "rgb(3, 201, 215)", marginTop: "0rem" }}>
                        Current Status
                      </div>
                    )}
                    {updatedTime && (
                      <div style={{ color: index <= currentIndex ? "green" : "gray" }}>
                        {updatedTime}
                      </div>
                    )}
                  </>
                }
                style={{
                  color: index <= currentIndex ? "green" : "gray",
                }}
              >
                {status}
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </div>
  );
};

export default CollectionStatusSteps;
