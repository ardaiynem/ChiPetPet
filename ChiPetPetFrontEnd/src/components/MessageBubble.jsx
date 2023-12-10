import catImg from "../assets/cat1.jpeg";


function MessageBubble(props) {
    return (
        <div className="d-flex w-100" style={{justifyContent: props.side % 2 == 0 ? "start" : "end"}}>
            <div className="card border-primary mb-3 w-50">
                <div className="d-flex card-header justify-content-start">
                    <img src={catImg} style={{ width: "50px", borderRadius: "50%", flex: "0 0 auto" }} />
                    <div style={{ flex: "4 4 auto" }}>
                        Username
                    </div>
                    <div style={{ flex: "1 1 auto" }}>
                        Date
                    </div>
                </div>
                <hr />
                <div className="card-body text-primary">
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                </div>
            </div>
        </div>
    )
}

export default MessageBubble;