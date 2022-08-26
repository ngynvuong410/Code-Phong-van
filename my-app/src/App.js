import { Container, Row,Col } from "react-bootstrap";
import Header from "./componets/Header/Header";
import Login from "./pages/Login/Login";


function App() {
  return (
    <div className="App">
      <Header />
      <Container>
        <Row>
          <Col>
             <Login/>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
