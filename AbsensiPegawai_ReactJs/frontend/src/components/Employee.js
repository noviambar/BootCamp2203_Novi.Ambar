import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import {
  Container,
  Row,
  Table,
  Button,
  Modal,
  Form,
  Image,
  Alert,
} from "react-bootstrap";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Employee({ setAuth }) {
  let Navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [show, setShow] = useState(false);
  const [showUp, setShowUp] = useState(false);
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState();
  const [filename, setFileName] = useState(null);
  const [msg, setMsg] = useState("");
  const [updates, setUpdates] = useState({ id: null, status: false });
  const [formContact, setFormContact] = useState({
    name: "",
    email: "",
    mobile: "",
    position: "",
    address: "",
  });

  useEffect(() => {
    getEmployee();
  }, []);

  const getEmployee = () => {
    axios
      .get("http://localhost:3001/Employee", {
        // headers: { token: localStorage.token },
      })
      .then((res) => {
        console.log(res.data);
        setUsers(res.data);
      });
  };

  const saveFile = (e) => {
    console.log(e.target.files[0]);
    setImage(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  //validate
  const [validate, setValidate] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("username", username);
    formData.append("name", name);
    formData.append("position", position);
    formData.append("email", email);
    formData.append("mobile", mobile);
    formData.append("address", address);
    formData.append("password", password);
    formData.append("image", image);
    formData.append("filename", filename);

    await axios
      .post("http://localhost:3001/Register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((user) => {
        console.log(user);
        setMsg(user.data.msg);
        Navigate("/Dashboard");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function handleChange(e) {
    let data = { ...formContact };
    data[e.target.name] = e.target.value;
    setFormContact(data);
  }

  //Update Data User
  const handleUpdate = async () => {
    let data = [...users];

    if (formContact.name === "") {
      return false;
    }
    if (formContact.position === "") {
      return false;
    }
    if (formContact.email === "") {
      return false;
    }
    if (formContact.mobile === "") {
      return false;
    }
    if (formContact.address === "") {
      return false;
    }

    if (updates.status) {
      data.forEach((contact) => {
        if (contact.id === updates.id) {
          const response = axios
            .put(`http://localhost:3001/Employee/${updates.id}`, {
              id: updates.id,
              name: formContact.name,
              email: formContact.email,
              mobile: formContact.mobile,
              position: formContact.position,
              address: formContact.address,
            })
            .then(() => {
              let data = [...users];
              setUsers(data);
            });

          const parseRes = response.json();
          if (parseRes.data) {
            toast.success("Berhasil Update");
          } else {
            toast.error(parseRes);
          }
        }
      });
    }
    setUsers(data);
    setUpdates(false);
    setFormContact({
      name: formContact.name,
      email: formContact.email,
      mobile: formContact.mobile,
      position: formContact.position,
      address: formContact.address,
    });
  };

  function handleDelete(id) {
    //delete
    axios.delete(`http://localhost:3001/Employee/Delete/${id}`).then(() => {
      alert("Yakin ingin menghapus Data ini?");
      let data = [...users].filter((contact) => contact.id !== id);
      setUsers(data);
    });
  }

  const handleView = (id) => {
    let data = [...users];
    let checkData = data.find((contact) => contact.id === id);
    setFormContact({
      name: checkData.name,
      email: checkData.email,
      mobile: checkData.mobile,
      position: checkData.position,
      address: checkData.address,
    });
    Navigate(`/Detail/${id}`);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleUp = (id) => {
    let data = [...users];
    let checkData = data.find((contact) => contact.id === id);
    setUpdates({ id: id, status: true });
    setFormContact({
      name: checkData.name,
      email: checkData.email,
      mobile: checkData.mobile,
      position: checkData.position,
      address: checkData.address,
    });
    setShowUp(true);
  };
  const handleCloseUp = () => setShowUp(false);

  return (
    <div>
      <Navbar />
      <div>
        <Container>
          <Row>
            <Button
              variant="success"
              onClick={handleShow}
              style={{ margin: "10px" }}
            >
              Add Employee
            </Button>
            {validate.errors && (
              <Alert variant="danger">
                <ul class="mt-0 mb-0">
                  {validate.errors.map((error, index) => (
                    <li key={index}>{`${error.param} : ${error.msg}`}</li>
                  ))}
                </ul>
              </Alert>
            )}
            <Form onSubmit={handleSubmit} encType="multipart/multi-data">
              <Modal
                show={show}
                onHide={handleClose}
                // backdrop="static"
                // keyboard={false}
              >
                <Modal.Header closeButton>
                  <Modal.Title>Register</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  {/* <p>{msg}</p> */}
                  <Form.Label htmlFor="username">Username</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    id="username"
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                  />
                  <Form.Label htmlFor="name">Name</Form.Label>
                  <Form.Control
                    type="text"
                    id="name"
                    name="name"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                  />
                  <Form.Label htmlFor="position">Position</Form.Label>
                  <Form.Control
                    type="text"
                    id="position"
                    name="position"
                    onChange={(e) => setPosition(e.target.value)}
                    value={position}
                  />
                  <Form.Label htmlFor="email">Email</Form.Label>
                  <Form.Control
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    name="email"
                    id="email"
                  />
                  <Form.Label htmlFor="mobile">Mobile</Form.Label>
                  <Form.Control
                    type="text"
                    id="mobile"
                    name="mobile"
                    onChange={(e) => setMobile(e.target.value)}
                    value={mobile}
                  />
                  <Form.Label htmlFor="address">Address</Form.Label>
                  <Form.Control
                    type="text"
                    id="address"
                    name="address"
                    onChange={(e) => setAddress(e.target.value)}
                    value={address}
                  />
                  <Form.Label htmlFor="password">Password</Form.Label>
                  <Form.Control
                    type="text"
                    id="password"
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                  />
                  <Form.Label htmlFor="image">Image</Form.Label>
                  <Form.Control
                    type="file"
                    name="image"
                    id="image"
                    accept=""
                    onChange={saveFile}
                  />
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="danger" onClick={handleClose}>
                    Cancel
                  </Button>
                  <Button variant="primary" onClick={handleSubmit}>
                    Add
                  </Button>
                </Modal.Footer>
              </Modal>
            </Form>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>No</th>
                  <th>Profile</th>
                  <th>Name</th>
                  <th>Position</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((contact, index) => {
                  return (
                    <tr key={contact.id}>
                      <td>{index + 1}</td>
                      <td>
                        <Image
                          src={`http://localhost:3001/singleImage/${contact.image}`}
                          style={{ width: "10%" }}
                        ></Image>
                      </td>
                      <td>{contact.name}</td>
                      <td>{contact.position}</td>
                      <td>
                        <Form onSubmit={handleUpdate}>
                          <Button
                            variant="primary"
                            onClick={() => handleUp(contact.id)}
                          >
                            Edit
                          </Button>
                          <Modal
                            show={showUp}
                            onHide={handleCloseUp}
                            // backdrop="static"
                            // keyboard={false}
                          >
                            <Modal.Header closeButton>
                              <Modal.Title>Update</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                              <Form.Label htmlFor="name">Name</Form.Label>
                              <Form.Control
                                type="text"
                                onChange={handleChange}
                                value={formContact.name}
                                className="form-control"
                                name="name"
                              />
                              <Form.Label htmlFor="position">
                                Position
                              </Form.Label>
                              <Form.Control
                                type="text"
                                onChange={handleChange}
                                value={formContact.position}
                                className="form-control"
                                name="position"
                              />
                              <Form.Label htmlFor="email">Email</Form.Label>
                              <Form.Control
                                type="email"
                                id="email"
                                name="email"
                                onChange={handleChange}
                                value={formContact.email}
                              />
                              <Form.Label htmlFor="mobile">Mobile</Form.Label>
                              <Form.Control
                                type="text"
                                id="mobile"
                                name="mobile"
                                onChange={handleChange}
                                value={formContact.mobile}
                              />
                              <Form.Label htmlFor="address">Address</Form.Label>
                              <Form.Control
                                type="text"
                                id="address"
                                name="address"
                                onChange={handleChange}
                                value={formContact.address}
                              />
                            </Modal.Body>
                            <Modal.Footer>
                              <Button
                                variant="secondary"
                                onClick={handleCloseUp}
                              >
                                Close
                              </Button>
                              <Button
                                variant="primary"
                                onClick={() => handleUpdate(contact.id)}
                              >
                                Update
                              </Button>
                            </Modal.Footer>
                          </Modal>
                          <Button
                            variant="secondary"
                            onClick={() => handleView(contact.id)}
                            style={{ margin: "5px" }}
                          >
                            View
                          </Button>
                          <Button
                            variant="danger"
                            onClick={() => handleDelete(contact.id)}
                          >
                            Delete
                          </Button>
                        </Form>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Row>
        </Container>
        <div>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
}

export default Employee;
