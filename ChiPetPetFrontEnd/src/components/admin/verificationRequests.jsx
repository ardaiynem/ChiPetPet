import { Button, Dropdown, FormControl } from "react-bootstrap";
import catImg from "../../assets/cat1.jpeg";
import { PanelContext } from "../../contexts/panelContext";
import { useState, useEffect, useContext } from "react";
import {
  getUnverifiedDocuments,
  verifyUser,
  rejectVerificationRequest,
} from "../../apiHelper/backendHelper";
import { useAlert } from "../../AlertContext";

// converts base64 string into blob
const b64toBlob = (b64Data, contentType = "", sliceSize = 512) => {
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

  const blob = new Blob(byteArrays, { type: contentType });
  return blob;
};

function VerificationRequests() {
  const { setTimedAlert } = useAlert();
  const { currentPanel, setCurrentPanel } = useContext(PanelContext);

  const [verificationRequests, setVerificationRequests] = useState([]);
  useEffect(() => {
    getUnverifiedDocuments()
      .then((res) => {
        console.log(res);
        const documentsWithDownloadLink = res.data.unverified_documents.map(
          (obj) => {
            const blob = b64toBlob(
              obj.verification_documents,
              "application/pdf"
            );
            const blobUrl = URL.createObjectURL(blob);

            // Add the blobUrl as a new attribute to the object
            return { ...obj, downloadLink: blobUrl };
          }
        );
        setVerificationRequests(documentsWithDownloadLink);
      })
      .catch((err) => {
        console.log(err);
        setTimedAlert(
          "Error retrieving unverified verification documents",
          "error",
          3000
        );
      });
  }, []);

  const [selectedRow, setSelectedRow] = useState(null);

  const handleVerifyButton = (id) => {
    const data = {
      user_id: id,
    };
    console.log(data);
    verifyUser(data)
      .then((res) => {
        console.log(res);
        setVerificationRequests((prevRequests) =>
          prevRequests.filter((request) => request.user_id !== id)
        );
        setTimedAlert("The user is verified", "success", 3000);

        setSelectedRow(null);
      })
      .catch((err) => {
        console.log(err);
        setTimedAlert("Error verifiying the user", "error", 3000);
      });
  };

  const handleRejectButton = (id) => {
    const data = {
      user_id: id,
    };
    console.log(data);

    rejectVerificationRequest(data)
      .then((res) => {
        console.log(res);
        setVerificationRequests((prevRequests) =>
          prevRequests.filter((request) => request.user_id !== id)
        );
        setTimedAlert("The user is rejected", "success", 3000);

        setSelectedRow(null);
      })
      .catch((err) => {
        console.log(err);
        setTimedAlert("Error verifiying the user", "error", 3000);
      });
  };

  return (
    <div className="p-0" style={{ width: "100%" }}>
      <Button
        className="position-relative top-2 start-2"
        onClick={() => setCurrentPanel("back")}
      >
        Back
      </Button>

      <div className="d-flex">
        <div className="p-3" style={{ flex: "1 1 0" }}>
          <div className="d-flex justify-content-between mb-5"></div>

          <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">User id</th>
                <th scope="col">Username</th>
                <th scope="col">Applied role</th>
              </tr>
            </thead>
            <tbody>
              {verificationRequests.map((verificationReq, index) => (
                <tr onClick={() => setSelectedRow(verificationReq)}>
                  <th scope="row">{index + 1}</th>
                  <td>{verificationReq.user_id}</td>
                  <td>{verificationReq.username}</td>
                  <td>{verificationReq.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div
          className="d-flex justify-content-center p-3"
          style={{ flex: "1 1 0", height: "45vh" }}
        >
          <div
            className="card border-primary mb-3 w-100"
            style={{ visibility: selectedRow ? "visible" : "hidden" }}
          >
            <div className="d-flex card-header justify-content-start p-3">
              <div
                className="d-flex flex-column align-items-start justify-content-center ms-3"
                style={{ flex: "4 4 auto" }}
              >
                <h1>{selectedRow?.username}</h1>
              </div>
            </div>
            <div className="card-body d-flex flex-column gap-3">
              <a
                className="btn btn-primary"
                href={selectedRow?.downloadLink}
                download="verification_document.pdf"
              >
                Download Verification Document
              </a>

              <button
                variant="success"
                className="btn btn-success w-100"
                type="button"
                style={{
                  backgroundColor: "green",
                  borderColor: "green",
                  color: "white",
                  width: "100px",
                }}
                onClick={() => handleVerifyButton(selectedRow?.user_id)}
              >
                Verify
              </button>
              <button
                variant="danger"
                className="btn btn-danger w-100"
                type="button"
                style={{
                  backgroundColor: "red",
                  borderColor: "red",
                  color: "white",
                  width: "100px",
                }}
                onClick={() => handleRejectButton(selectedRow?.user_id)}
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VerificationRequests;
