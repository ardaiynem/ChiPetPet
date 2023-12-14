import { useAuth } from "../AuthContext";
import catImg from "../assets/cat1.jpeg";

function BlogPostBubble({ handleRemove, handleEdit, comment }) {
  const { isAuthenticated, login, logout, userDetails } = useAuth();
  const { comment_id, content, user_id, user_name, date_and_time, role } =
    comment;

  return (
    <div className="d-flex w-100">
      <div className="card border-primary mb-3 w-100">
        <div className="d-flex card-header justify-content-start">
          <img
            src={catImg}
            style={{ width: "50px", borderRadius: "50%", flex: "0 0 auto" }}
          />
          <div className="ms-3" style={{ flex: "4 4 auto" }}>
            {user_name}
            <span className="ms-3 badge rounded-pill bg-primary">
              {role.toUpperCase().replace("_", " ")}
            </span>
          </div>

          <div style={{ flex: "1 1 auto" }}>
            {date_and_time.replace("T", " ")}
          </div>
          <div
            className="position-relative"
            style={{ width: "100%", height: "100%" }}
          >
            {user_id === userDetails.user_id && (
              <div className="position-absolute top-0 end-0">
                <button className="btn btn-primary">Edit</button>
                <button
                  onClick={() => handleRemove(comment_id)}
                  className="btn btn-danger"
                >
                  Remove
                </button>
              </div>
            )}
            {/* Other content of your container */}
          </div>
        </div>
        <hr />
        <div className="card-body text-primary">
          <p className="card-text">{content}</p>
        </div>
      </div>
    </div>
  );
}

export default BlogPostBubble;
