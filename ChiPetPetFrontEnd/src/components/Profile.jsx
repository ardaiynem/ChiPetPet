import { PanelContext } from "../contexts/panelContext";
import { useState, useEffect, useContext } from "react";
import { Button, Dropdown } from "react-bootstrap";
import catImg from "../assets/cat1.jpeg";
import { uploadVerificationDocument, getOwnVerificationDocuments } from "../apiHelper/backendHelper";
import { useAuth } from "../AuthContext";
import { useAlert } from "../AlertContext";

// converts base64 string into blob
const b64toBlob = (b64Data, contentType='', sliceSize=512) => {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];
  
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
  
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
  
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
      
    const blob = new Blob(byteArrays, {type: contentType});
    return blob;
}


const Profile = (props) => {
    const {setTimedAlert} = useAlert();

    const { currentPanel, setCurrentPanel } = useContext(PanelContext);
    const role = props.role

    const verified = props.role != "user"

    const { userDetails } = useAuth();


    const [submitStatus, setSubmitStatus] = useState(0);
    const [previousVerificationDocument, setPreviousVerificationDocument] = useState([]);
    const [downloadLink, setDownloadLink] = useState('');  
    useEffect(() => {
        
        getOwnVerificationDocuments(userDetails.user_id)
        .then((res) => {
            if( res.status == 200){
                setPreviousVerificationDocument(res.data.verification_documents);
            
                // If the content type is PDF, create a download link
                if (res.data.content_type === 'application/pdf') {
                    const blob = b64toBlob(res.data.verification_documents, 'application/pdf');
                    const blobUrl = URL.createObjectURL(blob);
                    setDownloadLink(blobUrl);
                }
            }

        })
        .catch((err) => {
            console.log(err);
            setTimedAlert("Error retrieving previous verification document", "error", 3000);
        });

    }, [submitStatus]);


    // for uploading verification documents
    const [selectedProfession, setSelectedProfession] = useState('');
    const [verificationDocument, setVerificationDocument] = useState(null);

    // Function to handle file input change
    const handleFileChange = (e) => {
        setVerificationDocument(e.target.files[0]);
    };

    // Function to handle profession selection
    const handleProfessionChange = (profession) => {
        setSelectedProfession(profession);
    };

    // Function to handle form submission
    const handleSubmit =  () => {
        // Create a FormData object to send the file
        const formData = new FormData();
        formData.append('user_id', userDetails.user_id);
        formData.append('verification_document', verificationDocument);
        formData.append('role', selectedProfession);

        const data = {
            'user_id': userDetails.user_id,
            'role': selectedProfession,
            'verification_docment': verificationDocument
        }

        // Call the API to upload the verification document
        
        uploadVerificationDocument(formData)
        .then((res) => {
            console.log(res.data); // Handle the response as needed
            setSubmitStatus(1);
        })
        .catch((err) => {
            setTimedAlert("Error uploading verification document", "error", 3000);
        });

    };

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
                    {
                        previousVerificationDocument.length === 0? 
                        <div className="d-flex justify-content-center align-items-center flex-column gap-3" style={{ flex: "1 1 0" }}>
                        <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
                            <Dropdown>
                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                    {selectedProfession ? ` ${selectedProfession}` : 'Select Profession'}
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={() => handleProfessionChange('Animal_Shelter')}>Animal Shelter</Dropdown.Item>
                                    <Dropdown.Item onClick={() => handleProfessionChange('Veterinarian')}>Veterinarian</Dropdown.Item>
                                    <Dropdown.Item onClick={() => handleProfessionChange('Field_Expert')}>Field Expert</Dropdown.Item>
                                    <Dropdown.Item onClick={() => handleProfessionChange('Admin')}>Admin</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>

                            <input type="file" className="form-control" id="inputGroupFile02" onChange={handleFileChange} disabled={verified} />
                        </div>

                        <textarea className="form-control" style={{ flex: "1 1 0" }} disabled={verified} />
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" disabled={verified} />
                            <label className="form-check-label" for="flexCheckDefault" >
                                Accept
                            </label>
                            <button className="btn btn-primary ms-4 d-inline" onClick={handleSubmit} disabled={verified}>Submit</button>
                        </div>
                    </div>:
                    <div>
                    {downloadLink && (
                        <a href={downloadLink} download="verification_document.pdf">
                            Download Verification Document
                        </a>
                    )}
                    
                    
                    </div>
                    }
                    
                </div>
            </div>
        </div>
    )
}

export default Profile;