import React, { useState, useContext, useEffect } from "react";
import { Button } from "react-bootstrap";
import { PanelContext } from "../../contexts/panelContext";

function SystemRecords() {
  const { setCurrentPanel } = useContext(PanelContext);

  // Define an array with sample data
  const animalData = [
    { name: "Dog", species: "Canine", adoptionStatus: "Available" },
    { name: "Cat", species: "Feline", adoptionStatus: "Adopted" },
    { name: "Cat", species: "Feline", adoptionStatus: "Adopted" },
    { name: "Cat", species: "Feline", adoptionStatus: "Adopted" },
    { name: "Cat", species: "Feline", adoptionStatus: "Adopted" },
    { name: "Cat", species: "Feline", adoptionStatus: "Adopted" },
    { name: "Cat", species: "Feline", adoptionStatus: "Adopted" },
    { name: "Cat", species: "Feline", adoptionStatus: "Adopted" }
    // Add more data as needed
  ];

  return (
    <div className="p-0" style={{ width: "100%" }}>
      <Button
        className="position-relative top-0 start-2 m-1"
        onClick={() => setCurrentPanel("back")}
      >
        Back
      </Button>

      {/* Render the first two tables side by side */}
      <div className="d-flex">
        <div className="m-2" style={{ flex: "1" }}>
        <h>Top 5 bisibisi</h>
        <table className="table table-striped">
          <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Species</th>
          </tr>
        </thead>
        <tbody>
          {animalData.slice(0, 5).map((animal, index) => (
            <tr key={index}>
              <td>{animal.name}</td>
              <td>{animal.species}</td>
            </tr>
          ))}
        </tbody>
          </table>
        </div>
        <div className="m-2" style={{ flex: "1" }}>
        <h>Top 5 bisibisi</h>
          <table className="table table-striped">
          <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Species</th>
          </tr>
        </thead>
        <tbody>
        {animalData.slice(0, 5).map((animal, index) => (
            <tr key={index}>
              <td>{animal.name}</td>
              <td>{animal.species}</td>
            </tr>
          ))}
        </tbody>
          </table>
        </div>
      </div>

      {/* Render the other two tables below the first two */}
      <div className="d-flex">
        <div className="m-2" style={{ flex: "1" }}>
        <h>Top 5 bisibisi</h>
          <table className="table table-striped">
          <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Species</th>
          </tr>
        </thead>
        <tbody>
        {animalData.slice(0, 5).map((animal, index) => (
            <tr key={index}>
              <td>{animal.name}</td>
              <td>{animal.species}</td>
            </tr>
          ))}
        </tbody>
          </table>
        </div>
        <div className="m-2" style={{ flex: "1" }}>
        <h>Top 5 bisibisi</h>
          <table className="table table-striped">
          <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Species</th>
          </tr>
        </thead>
        <tbody>
        {animalData.slice(0, 5).map((animal, index) => (
            <tr key={index}>
              <td>{animal.name}</td>
              <td>{animal.species}</td>
            </tr>
          ))}
        </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default SystemRecords;
