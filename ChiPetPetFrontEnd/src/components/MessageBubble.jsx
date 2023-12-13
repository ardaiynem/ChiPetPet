import catImg from "../assets/cat1.jpeg";

function MessageBubble({ username, side, date, content }) {
  return (
    <div
      className="d-flex w-100"
      style={{ justifyContent: side == 0 ? "start" : "end" }}
    >
      <div className="card border-primary mb-3 w-50">
        <div className="d-flex card-header justify-content-start">
          <img
            src={catImg}
            style={{ width: "50px", borderRadius: "50%", flex: "0 0 auto" }}
          />
          <div style={{ flex: "4 4 auto" }}>{username}</div>
          <div style={{ flex: "1 1 auto" }}>{date}</div>
        </div>
        <hr />
        <div className="card-body text-primary">
          <p class="card-text">{content}</p>
        </div>
      </div>
    </div>
  );
}

export default MessageBubble;
