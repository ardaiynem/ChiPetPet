import React, { useState, useContext, useEffect } from "react";
import { Button } from "react-bootstrap";
import { PanelContext } from "../../contexts/panelContext";
import { getTopVets, getTopAdopters, getTopShelters, getMostAdoptedBreed } from "../../apiHelper/backendHelper";

function SystemRecords() {
  const { setCurrentPanel } = useContext(PanelContext);

  const [topVets, setTopVets ] = useState([]);
  const [topAdopters, setTopAdopters ] = useState([]);
  const [topShelters, setTopShelters ] = useState([]);
  const [mostAdoptedBreeds, setMostAdoptedBreeds ] = useState([]);


  useEffect(() => {

    getTopVets()
    .then((res) => {
        setTopVets(res.data.top_vets);
    })
    .catch((err) => {
        setTimedAlert("Error retrieving top vets", "error", 3000);
    });

    getTopAdopters()
    .then((res) => {
        setTopAdopters(res.data.top_adopters);
    })
    .catch((err) => {
        setTimedAlert("Error retrieving top adopters", "error", 3000);
    });

    getTopShelters()
    .then((res) => {
        setTopShelters(res.data.top_shelters);
    })
    .catch((err) => {
        setTimedAlert("Error retrieving top shelters", "error", 3000);
    });

    getMostAdoptedBreed()
    .then((res) => {
        setMostAdoptedBreeds(res.data.most_adopted_breed);
    })
    .catch((err) => {
        setTimedAlert("Error retrieving most adopted breeds", "error", 3000);
    });

}, []);

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
        <h>Top 5 veterinarians</h>
        <table className="table table-striped">
          <thead>
          <tr>
            <th scope="col">Veterinarian</th>
            <th scope="col">Appoinment Count</th>
          </tr>
        </thead>
        <tbody>
          {topVets.slice(0, 5).map((vet, index) => (
            <tr key={index}>
              <td>{vet.username}</td>
              <td>{vet.count}</td>
            </tr>
          ))}
        </tbody>
          </table>
        </div>
        <div className="m-2" style={{ flex: "1" }}>
        <h>Top 5 adopters</h>
          <table className="table table-striped">
          <thead>
          <tr>
            <th scope="col">Adopter</th>
            <th scope="col">Adopt Count</th>
          </tr>
        </thead>
        <tbody>
        {topAdopters.slice(0, 5).map((adopter, index) => (
            <tr key={index}>
              <td>{adopter.username}</td>
              <td>{adopter.count}</td>
            </tr>
          ))}
        </tbody>
          </table>
        </div>
      </div>

      {/* Render the other two tables below the first two */}
      <div className="d-flex">
        <div className="m-2" style={{ flex: "1" }}>
        <h>Top 5 animal shelters</h>
          <table className="table table-striped">
          <thead>
          <tr>
            <th scope="col">Shelter Name</th>
            <th scope="col">Animal Count</th>
          </tr>
        </thead>
        <tbody>
        {topShelters.slice(0, 5).map((shelter, index) => (
            <tr key={index}>
              <td>{shelter.username}</td>
              <td>{shelter.animal_count}</td>
            </tr>
          ))}
        </tbody>
          </table>
        </div>
        <div className="m-2" style={{ flex: "1" }}>
        <h>Top 5 most adopted breeds</h>
          <table className="table table-striped">
          <thead>
          <tr>
            <th scope="col">Breed</th>
            <th scope="col">Adopt Count</th>
          </tr>
        </thead>
        <tbody>
        {mostAdoptedBreeds.slice(0, 5).map((breed, index) => (
            <tr key={index}>
              <td>{breed.breed}</td>
              <td>{breed.breed_count}</td>
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
