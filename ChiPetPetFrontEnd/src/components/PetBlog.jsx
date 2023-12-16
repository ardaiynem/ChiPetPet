import { Dropdown, Pagination, Button, Modal } from "react-bootstrap";
import { useState, useEffect, useContext } from "react";
import { PanelContext } from "../contexts/panelContext";
import BlogPage from "./BlogPage";
import axios from "axios";
import { useAuth } from "../AuthContext";
import { useAlert } from "../AlertContext";

const PetBlog = () => {
  const { currentPanel, setCurrentPanel } = useContext(PanelContext);
  const [blogs, setBlogs] = useState([]);
  const [showCreateBlogModal, setShowCreateBlogModal] = useState(false);
  const [showRemoveBlogModal, setShowRemoveBlogModal] = useState(false);
  const { isAuthenticated, login, logout, userDetails } = useAuth();
  const { setTimedAlert } = useAlert();
  const [editMode, setEditMode] = useState(false);
  const [editedBlog, setEditedBlog] = useState();

  const [createdBlog, setCreatedBlog] = useState({
    topic: "",
    content: "",
  });

  let active = 1;
  let items = [];
  for (let number = 1; number <= 5; number++) {
    items.push(
      <Pagination.Item key={number} active={number === active}>
        {number}
      </Pagination.Item>
    );
  }

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/blogpost/topic").then((res) => {
      setBlogs(res.data.topics);
    });
  }, []);

  const handleEditBlog = (post_id) => {
    axios
      .get(`http://127.0.0.1:8000/blogpost/getBlog/`, {
        params: { post_id: post_id },
      })
      .then((res) => {
        setCreatedBlog({ topic: res.data.topic, content: res.data.content });
      });
    setEditMode(true);
    setEditedBlog(post_id);
    setShowCreateBlogModal(true);
  };

  const handleRemoveBlog = (post_id) => {
    axios
      .delete(`http://127.0.0.1:8000/blogpost/deleteBlog/`, {
        params: { post_id: post_id, user_id: userDetails.user_id },
      })
      .then((res) => {
        setBlogs(blogs.filter((blog) => blog.post_id !== post_id));
      });
    setShowRemoveBlogModal(false);
  };

  const handleSaveBlog = () => {
    if (createdBlog.topic == "" || createdBlog.content == "") {
      setCreatedBlog({ content: "", topic: "" });
      setShowCreateBlogModal(false);
      setTimedAlert("Topic or content can't be empty", "error", 3000);
      return;
    }

    const postdate = new Date().toISOString().slice(0, 19).replace("T", " ");
    if (!editMode) {
      axios
        .post("http://127.0.0.1:8000/blogpost/createBlog", {
          user_id: userDetails.user_id,
          date_and_time: postdate,
          topic: createdBlog.topic,
          content: createdBlog.content,
        })
        .then((res) => {
          setBlogs([
            ...blogs,
            {
              topic: createdBlog.topic,
              user_name: userDetails.username,
              date: postdate,
              post_id: res.data.post_id,
            },
          ]);
        });
    } else {
      axios
        .patch("http://127.0.0.1:8000/blogpost/updateBlog", {
          user_id: userDetails.user_id,
          post_id: editedBlog,
          date_and_time: postdate,
          topic: createdBlog.topic,
          content: createdBlog.content,
        })
        .then((res) => {
          setBlogs(
            blogs.map((blog) =>
              blog.post_id == editedBlog
                ? {
                    topic: createdBlog.topic,
                    user_name: userDetails.username,
                    date: postdate,
                    post_id: editedBlog,
                  }
                : blog
            )
          );
        });
    }
    setCreatedBlog({ content: "", topic: "" });
    setShowCreateBlogModal(false);
    setTimedAlert("Blog has been successfully saved.", "success", 3000);
  };

  const handleClickTableElement = (blog) => {
    setCurrentPanel(<BlogPage post_id={blog.post_id} />);
  };

  return (
    <div className="p-5 w-100 h-100 d-flex flex-column gap-3">
      <div>
        <Button
          className="position-relative top-2 start-2"
          onClick={() => setCurrentPanel("back")}
        >
          Back
        </Button>
        <Button
          className="position-relative top-2 start-2"
          style={{
            marginLeft: "1270px",
            background: "green",
            color: "white",
            borderColor: "green",
          }}
          onClick={() => setShowCreateBlogModal(true)}
        >
          Create Blog
        </Button>
      </div>
      <h1>Pet Blog</h1>
      <div className="d-flex w-100 justify-content-between">{/* ... */}</div>
      <div className="d-flex" style={{ flex: "1 1 0" }}>
        <div className="w-100">
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Username</th>
                <th scope="col">Topic/Subject</th>
                <th scope="col">Date</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog, i) => (
                <tr key={i}>
                  <th scope="row">{}</th>
                  <td
                    onClick={() =>
                      handleClickTableElement({
                        post_id: blog.post_id,
                      })
                    }
                  >
                    {blog.user_name}
                  </td>
                  <td
                    onClick={() =>
                      handleClickTableElement({
                        post_id: blog.post_id,
                      })
                    }
                  >
                    {blog.topic}
                  </td>
                  <td
                    onClick={() =>
                      handleClickTableElement({
                        post_id: blog.post_id,
                      })
                    }
                  >
                    {blog.date}
                  </td>
                  <td>
                    {blog.user_name === userDetails.username && (
                      <>
                        <Button
                          onClick={() => {
                            handleEditBlog(blog.post_id);
                          }}
                          style={{
                            fontSize: "16px",
                            height: "35px",
                            marginRight: "2px",
                            textAlign: "center",
                            textJustify: "center",
                          }}
                        >
                          Edit
                        </Button>
                        <Button
                          onClick={() => {
                            setEditedBlog(blog.post_id);
                            setShowRemoveBlogModal(true);
                          }}
                          style={{
                            fontSize: "16px",
                            height: "35px",
                            marginRight: "2px",
                            textAlign: "center",
                            textJustify: "center",
                          }}
                        >
                          Remove
                        </Button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="d-flex justify-content-center">
        <Pagination size="lg">{items}</Pagination>
      </div>

      {/* Create Blog Modal */}
      <Modal
        show={showCreateBlogModal}
        onHide={() => setShowCreateBlogModal(false)}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Create Blog</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <label htmlFor="topicInput" className="form-label">
              Enter Topic:
            </label>
            <input
              type="text"
              onChange={(e) =>
                setCreatedBlog({
                  content: createdBlog.content,
                  topic: e.target.value,
                })
              }
              value={createdBlog.topic}
              className="form-control"
              id="topicInput"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="textInput" className="form-label">
              Enter Text:
            </label>
            <textarea
              value={createdBlog.content}
              onChange={(e) =>
                setCreatedBlog({
                  content: e.target.value,
                  topic: createdBlog.topic,
                })
              }
              className="form-control"
              id="textInput"
              rows="6"
            ></textarea>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            style={{ background: "red", color: "white", borderColor: "red" }}
            onClick={() => {
              setEditMode(false);
              setShowCreateBlogModal(false);
              setCreatedBlog({ topic: "", content: "" });
            }}
          >
            Close
          </Button>
          <Button
            style={{
              background: "green",
              color: "white",
              borderColor: "green",
            }}
            onClick={handleSaveBlog}
          >
            Save Blog
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={showRemoveBlogModal}
        onHide={() => setShowRemoveBlogModal(false)}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Removing Blog</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <div>Are you sure to remove the selected label?</div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            style={{ background: "red", color: "white", borderColor: "red" }}
            onClick={() => {
              setEditMode(false);
              setShowRemoveBlogModal(false);
              setCreatedBlog({ topic: "", content: "" });
            }}
          >
            Cancel
          </Button>
          <Button
            style={{
              background: "green",
              color: "white",
              borderColor: "green",
            }}
            onClick={() => handleRemoveBlog(editedBlog)}
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PetBlog;
