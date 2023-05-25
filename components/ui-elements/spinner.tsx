import React from "react";
import { Spinner } from "react-bootstrap";

export default function GrowSpinner() {
  return (
    <>
      <Spinner animation="grow" size="sm" />
      <Spinner animation="grow" size="sm" />
      <Spinner animation="grow" size="sm" />
    </>
  );
}
