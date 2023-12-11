import catImg from "../assets/cat1.jpeg";

function BlogPostBubble(props) {
    const { name, role, date, time, content } = props.postObject
    return (
        <div className="d-flex w-100">
            <div className="card border-primary mb-3 w-100">
                <div className="d-flex card-header justify-content-start">
                    <img src={catImg} style={{ width: "50px", borderRadius: "50%", flex: "0 0 auto" }} />
                    <div className="ms-3" style={{ flex: "4 4 auto" }}>
                        {name}
                        <span className="ms-3 badge rounded-pill bg-primary">{role.toUpperCase()}</span>
                    </div>
                    <div style={{ flex: "1 1 auto" }}>
                        {date} {time}
                    </div>
                </div>
                <hr />
                <div className="card-body text-primary">
                    <p className="card-text">{content}</p>
                </div>
            </div>
        </div>
    )
}

export default BlogPostBubble;