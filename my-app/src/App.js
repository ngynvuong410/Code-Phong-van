import { Container, Row, Col } from "react-bootstrap";
import Header from "./componets/Header/Header";
import Login from "./pages/Login/Login";
import { Routes, Route, Link } from "react-router-dom";
import User from "./pages/User/User";
import { useNavigate } from 'react-router-dom'
import React, { useEffect } from 'react'
function App() {
  const navigate = useNavigate()
  useEffect(() => {
    const token = localStorage.getItem('token')
    if(token!==null) navigate('/user')
  }, []);
  return (

    <div className="App">
      <Header />
      <Container>
        <Row>
          <Col>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/User" element={<User />} />
             
            </Routes>
          </Col>
        </Row>
      </Container>

    </div>


  );
}

export default App;
