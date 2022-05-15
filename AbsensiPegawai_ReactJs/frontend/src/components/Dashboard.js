import React, { useState, useEffect } from "react";
import {
  Card,
  Button,
  Row,
  Col,
  Form,
  Container,
  Image,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";

function Contact({ setAuth }) {
  var [tanggal] = useState(new Date());
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [position, setPosition] = useState("");
  const [address, setAddress] = useState("");
  const [user_id, setUserId] = useState();
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [ket, setKet] = useState("");
  const [msg, setMsg] = useState("");
  const [disable, setDisable] = useState(0);
  let Navigate = useNavigate();

  useEffect(() => {
    getUser();
    // getDetail();
  });

  async function getUser() {
    try {
      const response = await fetch("http://localhost:3001/dashboard/", {
        method: "GET",
        headers: { token: localStorage.token },
      });

      const parseRes = await response.json();
      // console.log(parseRes);
      setId(parseRes.id);
      setName(parseRes.name);
      setEmail(parseRes.email);
      setMobile(parseRes.mobile);
      setPosition(parseRes.position);
      setAddress(parseRes.address);
    } catch (err) {
      console.error(err.message);
    }
  }

  const [users, setUsers] = useState([]);

  const handleDetail = () => {
    axios.get("http://localhost:3001/Detail/" + id).then((res) => {
      setUsers(res.data);
      Navigate(`/Detail/${id}`);
    });
  };

  const handleTimeIn = () => {
    let user_id = id;
    let date = tanggal.toLocaleDateString();
    let time = tanggal.toLocaleTimeString();
    let ket = "Time In";
    axios
      .post("http://localhost:3001/TimeIn", {
        user_id: user_id,
        date: date,
        time: time,
        ket: ket,
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

  const handleTimeOut = () => {
    let user_id = id;
    let date = tanggal.toLocaleDateString();
    let time = tanggal.toLocaleTimeString();
    let ket = "Time Out";
    axios
      .post("http://localhost:3001/TimeOut", {
        user_id: user_id,
        date: date,
        time: time,
        ket: ket,
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

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setAuth(false);
  };

  return (
    <div className="row">
      <Navbar setAuth={setAuth} />
      <div>
        <Container style={{ margin: "10px" }}>
          <Row>
            <Card style={{ width: "65rem" }}>
              <Card.Body>
                <Row>
                  <Col>
                    <Image
                      src=""
                      alt="image"
                      shape="rounded"
                      style={{ width: "150px" }}
                    ></Image>
                    <Card.Title>{name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      {position}
                    </Card.Subtitle>
                    <Button variant="success" onClick={handleDetail}>
                      Detail
                    </Button>
                    <Button
                      variant="danger"
                      style={{ margin: "5px" }}
                      onClick={logout}
                    >
                      Logout
                    </Button>
                  </Col>
                  <Col>
                    <Form onSubmit={handleTimeIn}>
                      <h5>{msg}</h5>
                      <Form.Control
                        type="hidden"
                        id="user_id"
                        name="user_id"
                        value={id}
                        onChange={(e) => setUserId(e.target.value)}
                      ></Form.Control>
                      <Form.Label htmlFor="dates">Date</Form.Label>
                      <Form.Control
                        typeof="date"
                        id="date"
                        name="date"
                        value={tanggal.toLocaleDateString()}
                        onChange={(e) => setDate(e.target.value)}
                      ></Form.Control>
                      <Form.Label htmlFor="date">Time</Form.Label>
                      <Form.Control
                        typeof="time"
                        id="time"
                        name="time"
                        value={tanggal.toLocaleTimeString()}
                        onChange={(e) => setTime(e.target.value)}
                      ></Form.Control>
                      <Form.Control
                        type="hidden"
                        id="ket"
                        name="ket"
                        value={"Time In"}
                        onChange={(e) => setKet(e.target.value)}
                      ></Form.Control>
                      <br />
                      <Button
                        variant="primary"
                        // onClick={handleTimeIn}
                        onClick={() => {
                          handleTimeIn();
                          setDisable(1);
                        }}
                        style={{ margin: "5px" }}
                        disable={1}
                        disabled={disable !== 0}
                      >
                        Time In
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => {
                          handleTimeOut();
                          setDisable(false);
                        }}
                        disable={2}
                        disabled={disable !== 1}
                      >
                        Time Out
                      </Button>
                    </Form>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default Contact;

// let navigate = useNavigate()

// useEffect(()=>{
//   const token = localStorage.getItem('token')
//   axios.get("http://localhost:3001/Dashboard", {
//     // headers: {
//     //   Authorization: token,
//     // }
//   }).then(res =>{
//     console.log(res)
//   }).catch(err => {
//     console.log(err)
//     navigate('/')
//   })
// }, [])
