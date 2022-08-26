import React from 'react'
import {Container,Row,Col} from 'react-bootstrap';
import './Header.scss'
import logo from '../../assets/images/header.png'
const Header = () => {
  console.log(logo);
  return (
    <div className='header'>
      <Container fluid>
         <Row>
          <Col>
              <div className='header__logo'>
                    <img src={logo}/>
                    <span>BE</span>
              </div>
              
          </Col>
          <Col>
          <div className='header__info'>
                  <p>admin@beyonedge.co</p>
              </div>
          </Col>
         </Row>
      </Container>
    </div>
  )
}

export default Header