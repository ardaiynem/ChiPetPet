import { PanelContext } from "../contexts/panelContext";
import { useState, useEffect, useContext } from "react";
import { Button } from "react-bootstrap";
import catImg from "../assets/cat1.jpeg";

const Profile = (props) => {
    const { currentPanel, setCurrentPanel } = useContext(PanelContext);
    const role = props.role

    return (
        <div className="p-2 w-100">
            <Button className="position-relative top-2 start-2" onClick={() => setCurrentPanel("back")}>
                Back
            </Button>
            <div className="d-flex flex-column h-100 w-100 gap-2">
                <div className="d-flex justify-content-center align items-center" style={{ flex: "1 1 0" }}>
                    <div className="d-flex flex-column gap-3">
                        <img src={catImg} style={{ width: "300px", borderRadius: "50%" }} />
                        <span className="badge rounded-pill bg-primary" >{role.toUpperCase()}</span>
                    </div>
                </div>
                <div className="d-flex p-3 gap-3" style={{ flex: "2 2 0" }}>
                    <div className="d-flex justify-content-center align-items-center flex-column" style={{ flex: "1 1 0" }}>
                        <div className="input-group mb-3 gap-2">
                            <input type="text" className="form-control" placeholder="Name" />
                            <input type="text" className="form-control" placeholder="Last Name" />
                            <div className="input-group">
                                <span className="input-group-text" id="basic-addon1">@</span>
                                <input type="text" className="form-control" placeholder="Username" />
                            </div>
                        </div>
                        <div className="input-group mb-3 gap-2">
                            <input type="text" className="form-control" placeholder="City" />
                            <input type="text" className="form-control" placeholder="State" />
                            <input type="text" className="form-control" placeholder="Zip" />
                        </div>
                        <button className="btn btn-primary w-100">Edit</button>
                    </div>
                    <div className="d-flex justify-content-center align-items-center flex-column gap-3" style={{ flex: "1 1 0" }}>
                        <input type="file" class="form-control" id="inputGroupFile02" />
                        <textarea className="form-control" style={{ flex: "1 1 0" }}></textarea>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                            <label className="form-check-label" for="flexCheckDefault">
                                Accept
                            </label>
                            <button className="btn btn-primary ms-4 d-inline">Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;