import BlogPostBubble from "./BlogPostBubble";
import { Button } from "react-bootstrap";
import { useState, useEffect, useContext } from "react";
import { PanelContext } from "../contexts/panelContext";
import axios from "axios";
import { useAuth } from "../AuthContext";
import catImg from "../assets/cat1.jpeg";

const BlogPage = ({ post_id }) => {
  const { currentPanel, setCurrentPanel } = useContext(PanelContext);

  const { isAuthenticated, login, logout, userDetails } = useAuth();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const [blog, setBlog] = useState({
    date_and_time: "",
    username: "",
    topic: "",
    role: "",
    content: "",
  });

  const handleCommentSend = () => {
    const formattedDate = new Date()
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");
    axios
      .post("http://127.0.0.1:8000/blogpost/createComment", {
        user_id: userDetails.user_id,
        date_and_time: formattedDate,
        post_id: post_id,
        content: comment,
      })
      .then((res) => {
        console.log("response", res.data);
        setComments((prevState) => [
          ...prevState,
          {
            comment_id: res.data.comment_id,
            content: comment,
            user_id: userDetails.user_id,
            user_name: userDetails.user_name,
            date_and_time: formattedDate,
            role: userDetails.role,
          },
        ]);
        setComment("");
      });
  };

  const handleRemove = (comment_id) => {
    axios.delete("http://127.0.0.1:8000/blogpost/deleteComment/", {
      params: {
        comment_id: comment_id,
        post_id: post_id,
        user_id: userDetails.user_id,
      },
    });
    console.log("Will delete", comment_id);
    console.log(comments);
    console.log(
      "filter: ",
      comments.filter((c) => c.comment_id !== comment_id)
    );
    setComments((prevState) =>
      prevState.filter((c) => c.comment_id !== comment_id)
    );
  };

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/blogpost/getBlogComments/`, {
        params: {
          post_id: post_id,
        },
      })
      .then((res) => {
        console.log(res.data.comments);
        setComments(res.data.comments);
      });
    console.log("post_id", post_id);
    axios
      .get(`http://127.0.0.1:8000/blogpost/getBlog/`, {
        params: { post_id: post_id },
      })
      .then((res) => {
        console.log(res.data);
        setBlog(res.data);
      });
  }, []);

  return (
    <div className="d-flex flex-column p-3 w-100 h-100 gap-3">
      <div>
        <Button
          className="position-relative top-2 start-2"
          onClick={() => setCurrentPanel("back")}
        >
          Back
        </Button>
      </div>
      <div>
        <div className="d-flex w-100">
          <div className="card border-primary mb-2 w-100">
            <div className="d-flex card-header justify-content-start">
              <img
                src={catImg}
                style={{ width: "50px", borderRadius: "50%", flex: "0 0 auto" }}
              />
              <div className="ms-3" style={{ flex: "4 4 auto" }}>
                <h5>
                  {blog.username}
                  <span className="ms-3 badge rounded-pill bg-primary">
                    {blog.role}
                  </span>
                  <h5>
                    <b>{blog.topic}</b>
                  </h5>
                </h5>
                <h6>{blog.date_and_time.replace("T", " ")}</h6>
              </div>
            </div>
            <hr />
            <div className="card-body text-primary">
              <p style={{ fontSize: "18px" }} className="card-text">
                {blog.content}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          marginLeft: "50px",
          marginRight: "50px",
          flex: "2 2 0",
          overflowY: "scroll",
        }}
      >
        <div
          className="gap-5 p-3"
          style={{ flex: "2 2 0", border: "1px solid", overflowY: "scroll" }}
        >
          {comments.map((c, i) => (
            <BlogPostBubble
              key={i}
              handleRemove={handleRemove}
              comment={c}
            />
          ))}
        </div>
      </div>
      <div
        style={{
          marginLeft: "50px",
          marginRight: "50px",
          flex: "1 1 0",
          border: "1px solid",
          maxHeight: "80px",
        }}
      >
        <div className="form-floating h-100 mb-3">
          <textarea
            className="form-control"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Leave a comment here"
            id="floatingTextarea2"
            style={{ height: "100%" }}
          ></textarea>
        </div>
      </div>
      <Button
        onClick={handleCommentSend}
        className="mx-auto"
        style={{ width: "100px" }}
      >
        Send
      </Button>
    </div>
  );
};

export default BlogPage;
