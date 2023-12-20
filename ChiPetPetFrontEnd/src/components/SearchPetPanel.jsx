import {
  Card,
  Button,
  Row,
  Col,
  Pagination,
  FormControl,
  Dropdown,
  Stack,
} from "react-bootstrap";
import catImg from "../assets/cat1.jpeg";

import { PanelContext } from "../contexts/panelContext";
import { useState, useEffect, useContext } from "react";
import { getPetsByType, getPetsByShelter } from "../apiHelper/backendHelper";

import SingleAnimalPanel from "./SingleAnimalPanel";
import axios from "axios";
import { useAlert } from "../AlertContext";

function SearchPetPanel(props) {
  let animalType = props.animalType;
  let shelterid = props.shelterid;

  const { currentPanel, setCurrentPanel } = useContext(PanelContext);
  const [page, setPage] = useState(1);
  const [pets, setPets] = useState([]);

  const [species, setSpecies] = useState("");

  const [age, setAge] = useState({
    min: 0,
    max: 1200,
  });

  const [sortOption, setSortOption] = useState("None");
  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");

  const { setTimedAlert } = useAlert();

  if (animalType) {
    useEffect(() => {
      axios
        .get(
          "http://127.0.0.1:8000/pet_create/get_pets_by_type_with_attributes/",
          {
            params: {
              name: name,
              breed: breed,
              sortOption: sortOption,
              species: animalType,
              max_age: age.max,
              min_age: age.min,
            },
          }
        )
        .then((res) => {
          console.log("With type", res.data);
          setPets(res.data.pets);
        })
        .catch((err) => {
          setTimedAlert("Error retrieving animals", "error", 3000);
          console.log(err);
        });
    }, [name, breed, sortOption, age]);
  } else if (shelterid) {
    useEffect(() => {
      axios
        .get(
          "http://127.0.0.1:8000/pet_create/get_pets_by_shelter_with_attributes/",
          {
            params: {
              name: name,
              breed: breed,
              species: species,
              sortOption: sortOption,
              user_id: shelterid,
              max_age: age.max,
              min_age: age.min,
            },
          }
        )
        .then((res) => {
          console.log("With shelter", res.data);
          setPets(res.data.pets);
        })
        .catch((err) => {
          setTimedAlert("Error retrieving animals", "error", 3000);
        });
    }, [name, breed, sortOption, age]);
  }

  let items = [];
  const animalPerPage = 6;
  let pageAmount = Math.floor(pets.length / animalPerPage) + 1;
  for (let number = 1; number <= pageAmount; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === page}
        onClick={() => setPage(number)}
      >
        {number}
      </Pagination.Item>
    );
  }

  return (
    <>
      <div className="p-0 w-100 h-100">
        <h1>Search {animalType} </h1>
        <Button
          className="position-relative top-2 start-2"
          onClick={() => setCurrentPanel("back")}
        >
          Back
        </Button>

        <div className="d-flex align-items-center mb-5">
          <div className="d-flex mt-1">
            <input
              style={{ marginLeft: "5px" }}
              className="form-control"
              type="text"
              placeholder={name === "" ? "Name" : ""}
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <input
              style={{ marginLeft: "5px" }}
              className="form-control"
              type="text"
              placeholder={breed === "" ? "Breed" : ""}
              value={breed}
              onChange={(e) => {
                setBreed(e.target.value);
              }}
            />

            <label> Age in months </label>
            <label> Min: </label>
            <FormControl
              type="number"
              value={age.min}
              min={0}
              max={age.max - 1}
              placeholder="Min Age(Months): "
              onChange={(e) =>
                setAge({
                  min: e.target.value,
                  max: age.max,
                })
              }
              className="mr-sm-2"
              style={{ maxWidth: "400px" }}
            />

            <label> Max: </label>
            <FormControl
              type="number"
              value={age.max}
              placeholder="Max Age(Months): "
              onChange={(e) =>
                setAge({
                  min: age.min + 1,
                  max: e.target.value,
                })
              }
              min={age.min + 1}
              max={1200}
              className="mr-sm-2"
              style={{ maxWidth: "400px" }}
            />

            {shelterid && (
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  Species {species === "" ? "" : ": " + species.toUpperCase()}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => setSpecies("")}>
                    All
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setSpecies("cat")}>
                    Cat
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setSpecies("dog")}>
                    Dog
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setSpecies("bird")}>
                    Bird
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setSpecies("rabbit")}>
                    Rabbit
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setSpecies("small&furry")}>
                    Small & Furry
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setSpecies("others")}>
                    Others
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}
          </div>

          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Sort By{" "}
              {sortOption === "None"
                ? ""
                : sortOption.charAt(0).toUpperCase() + sortOption.slice(1)}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item
                onClick={() => {
                  setSortOption("name");
                }}
              >
                {"Name(A-Z)"}
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  setSortOption("breed");
                }}
              >
                {"Breed(A-Z)"}
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>

        <div
          className="d-flex w-70 ms-3 mt-3 flex-column flex-wrap"
          style={{ height: "700px" }}
        >
          {pets.map((pet) => (
            <Card
              key={pet.id}
              className="mb-3 me-3"
              style={{ maxWidth: "576px" }}
            >
              <Row className="no-gutters">
                <Col xs={4} className="d-flex">
                  <Card.Img
                    src={`data:image/png;base64, ${pet.photo}`}
                    style={{ objectFit: "cover" }}
                  />
                </Col>
                <Col xs={8}>
                  <Card.Body>
                    <Card.Title>{pet.name}</Card.Title>
                    <Card.Text>{pet.description}</Card.Text>
                    <Button
                      variant="primary"
                      onClick={() =>
                        setCurrentPanel(
                          <SingleAnimalPanel petid={pet.pet_id} />
                        )
                      }
                    >
                      Go somewhere
                    </Button>
                  </Card.Body>
                </Col>
              </Row>
            </Card>
          ))}
          {/* <div class="card mb-3" style="max-width: 540px;">
                        <div class="row g-0">
                            <div class="col-md-4">
                            <img src="..." class="img-fluid rounded-start" alt="...">
                            </div>
                            <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">Card title</h5>
                                <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                <p class="card-text"><small class="text-body-secondary">Last updated 3 mins ago</small></p>
                            </div>
                            </div>
                        </div>
                        </div> */}
        </div>
        {/* <Pagination size="lg">{items}</Pagination> */}
      </div>
    </>
  );
}

export default SearchPetPanel;
