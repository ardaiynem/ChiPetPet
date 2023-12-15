import { Dropdown, Pagination, Button, Modal } from "react-bootstrap";
import { useState, useEffect, useContext } from "react";
import { PanelContext } from "../contexts/panelContext";
import BlogPage from "./BlogPage";
import axios from "axios";

const PetBlog = () => {
  const { currentPanel, setCurrentPanel } = useContext(PanelContext);
  const [blogs, setBlogs] = useState([]);
  const [showCreateBlogModal, setShowCreateBlogModal] = useState(false);

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

  const handleCreateBlog = () => {
      //ToDo
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
          style={{ marginLeft: "1270px", background: "green", color: "white", borderColor: "green" }}
          onClick={() => setShowCreateBlogModal(true)}
        >
          Create Blog
        </Button>
      </div>
      <h1>Pet Blog</h1>
      <div className="d-flex w-100 justify-content-between">
        {/* ... */}
      </div>
      <div className="d-flex" style={{ flex: "1 1 0" }}>
        <div className="w-100">
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Username</th>
                <th scope="col">Topic/Subject</th>
                <th scope="col">Date</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog, i) => (
                <tr
                  key={i}
                  onClick={() =>
                    handleClickTableElement({
                      post_id: blog.post_id,
                    })
                  }
                >
                  <th scope="row">{}</th>
                  <td>{blog.topic}</td>
                  <td>{blog.user_name}</td>
                  <td>{blog.date}</td>
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
      <Modal show={showCreateBlogModal} onHide={() => setShowCreateBlogModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Create Blog</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <label htmlFor="topicInput" className="form-label">Enter Topic:</label>
            <input type="text" className="form-control" id="topicInput" />
          </div>
          <div className="mb-3">
            <label htmlFor="textInput" className="form-label">Enter Text:</label>
            <textarea className="form-control" id="textInput" rows="6"></textarea>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button style={{background: "red", color: "white", borderColor: "red"}} onClick={() => setShowCreateBlogModal(false)}>
            Close
          </Button>
          <Button style={{background: "green", color: "white", borderColor: "green"}} onClick={handleCreateBlog}>
            Save Blog
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
};

export default PetBlog;