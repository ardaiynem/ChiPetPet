import { Dropdown, Pagination, Button } from "react-bootstrap";
import { useState, useEffect, useContext } from "react";
import { PanelContext } from "../contexts/panelContext";
import BlogPage from "./BlogPage";
import axios from "axios";

const PetBlog = () => {
  const { currentPanel, setCurrentPanel } = useContext(PanelContext);

  const [blogs, setBlogs] = useState([]);

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
      </div>
      <h1>Pet Blog</h1>
      <div className="d-flex w-100 justify-content-between">
        <Dropdown>
          <Dropdown.Toggle variant="primary" id="dropdown-basic">
            Dropdown Button
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown>
          <Dropdown.Toggle variant="primary" id="dropdown-basic">
            Dropdown Button
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown>
          <Dropdown.Toggle variant="primary" id="dropdown-basic">
            Dropdown Button
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
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
    </div>
  );
};

export default PetBlog;
