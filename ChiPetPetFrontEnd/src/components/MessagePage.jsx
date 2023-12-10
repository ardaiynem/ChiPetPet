import { Card, Button, Row, Col, Pagination, Dropdown, Stack } from "react-bootstrap";
import MessageThumbnail from "./MessageThumbnail";
import MessageBubble from "./MessageBubble";
import catImg from "../assets/cat1.jpeg";

function MessagePage() {
    let animal = [
        "Catto1"
        , "Catto2"
        , "Catto3"
        , "Catto4"
        , "Catto5"
        , "Catto6"
    ]

    return (
        <div className="p-0" style={{ width: "100%" }}>
            <Button className="position-relative top-2 start-2">
                Back
            </Button>

            <div className="d-flex gap-3">
                <div className="" style={{ flex: "1 1 0", border: "1px solid" }}>
                    <div className="d-flex flex-column p-3" style={{ maxHeight: "70vh", overflowY: "scroll" }}>
                        {animal.map(() => (
                            <MessageThumbnail />
                        ))}
                    </div>
                </div>
                <div className="d-flex flex-column justify-content-center gap-3 p-3" style={{ flex: "2 2 0" }}>
                    <div className="gap-5 p-3" style={{ flex: "2 2 0", border: "1px solid", overflowY: "scroll" }}>
                        {animal.map((e, i) => (
                            <MessageBubble side={i} />
                        ))}
                    </div>
                    <div style={{ flex: "1 1 0", border: "1px solid" }}>
                        <div className="form-floating h-100 mb-3">
                            <textarea className="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style={{ height: "100%" }}></textarea>
                            <label for="floatingTextarea2">Comments</label>
                        </div>
                        <Button className="w-100">
                            Send
                        </Button>
                    </div>
                </div>
            </div>
        </div>)
}

export default MessagePage;