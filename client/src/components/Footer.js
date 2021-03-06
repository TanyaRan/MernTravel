import React from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'

const Footer = () => {
  return (
    <Container>
      <Row>
        <Col className='text-center py-2'>
          &copy; 2021
          <Button variant='outlined-light' className='mx-2 mb-1'>
            Happy in Wild <i className='fas fa-hiking'></i>
          </Button>
        </Col>
      </Row>
    </Container>
  )
}

export default Footer
