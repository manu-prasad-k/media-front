import React from 'react'
import {Row,Col} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';

function Landing() {



  //redirect from one page to another

  const navigate=useNavigate()
  const handleNavigate = () => {
    navigate('/home')
  }
  return (
    <div>
      <Row className="align-items-center">
        <Col></Col>
        <Col lg={6}>
          <h1>Welcome to video.com</h1>

          <p style={{ textAlign: "justify" }}>
            where user can use their favourite videos.user can upload any
            youtube videos by copy and paste their url in to video.com will
            allow to add and remove their uploaded videos and also arrange their
            in diffrent categories b drag and drop it is free try it now!
          </p>
          <button onClick={handleNavigate} className="btn btn-success">Click Here to Know More</button>
        </Col>
        <Col lg={5} className="ms-3">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6t1Lq5DDZz5-EbP7wzd1RSKq0L4m280xGHQ&usqp=CAU"
            alt="no-img"
            className="img-fluid"
           
          />
        </Col>
      </Row>
    </div>
  );
}

export default Landing