import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS dosyasını ekleyin
import dogIcn from "../assets/dogIcon.jpg";
import catIcn from "../assets/catIcon.jpg";
import birdIcn from "../assets/birdIcn.jpg";
import rabbitIcn from "../assets/rabbitIcon.jpg";
import ratIcn from "../assets/ratIcon.jpg";
import othersIcn from "../assets/othersIcon.jpg";

function SearchAnimalByType(){
    const categoryStyle = {
        color: '#f0087c',
        fontSize: '1.5rem',
        fontWeight: 'bold', 
      };

    return (
        <div className="container">
            <div className="row justify-content-center">
            <div className="col-md-2 mt-2 text-center">
            <div className="d-flex flex-column align-items-center">
                <button className="btn btn-primary btn-circle">
                <img
                    src= {catIcn}
                    alt="Image 2"
                    className="img-fluid"
                />
                </button>
                <div style={categoryStyle}>Cats</div>
            </div>
            </div>
            <div className="col-md-2 mt-2 text-center">
            <div className="d-flex flex-column align-items-center">
                <button className="btn btn-primary btn-circle">
                <img
                    src= {dogIcn}
                    alt="Image 2"
                    className="img-fluid"
                />
                </button>
                <div style={categoryStyle}>Dogs</div>
            </div>
            </div>
            <div className="col-md-2 mt-2 text-center">
            <div className="d-flex flex-column align-items-center">
                <button className="btn btn-primary btn-circle">
                <img
                    src= {birdIcn}
                    alt="Image 2"
                    className="img-fluid"
                />
                </button>
                <div style={categoryStyle}>Birds</div>
            </div>
            </div>
            </div>
            <div className="row mt-2 justify-content-center">
            <div className="col-md-2 mt-2 text-center">
            <div className="d-flex flex-column align-items-center">
                <button className="btn btn-primary btn-circle">
                <img
                    src= {rabbitIcn}
                    alt="Image 2"
                    className="img-fluid"
                />
                </button>
                <div style={categoryStyle}>Rabbits</div>
            </div>
            </div>
            <div className="col-md-2 mt-2 text-center">
            <div className="d-flex flex-column align-items-center">
                <button className="btn btn-primary btn-circle">
                <img
                    src= {ratIcn}
                    alt="Image 2"
                    className="img-fluid"
                />
                </button>
                <div style={categoryStyle}>Small & Furry</div>
            </div>
            </div>
            <div className="col-md-2 mt-2 text-center">
            <div className="d-flex flex-column align-items-center">
                <button className="btn btn-primary btn-circle">
                <img
                    src= {othersIcn}
                    alt="Image 2"
                    className="img-fluid"
                />
                </button>
                <div style={categoryStyle}>Others</div>
            </div>
            </div>
            </div>
        </div>
    )
}

export default SearchAnimalByType;
