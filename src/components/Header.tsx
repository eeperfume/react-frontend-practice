import React, { useState } from "react";
import { Navbar, Nav, Button, Modal, Form } from "react-bootstrap";

const Header = (): JSX.Element => {
  const [showSignUpModal, setShowSignUpModal] = useState(false);

  const handleSignUpClose = () => setShowSignUpModal(false);
  const handleSignUpShow = () => setShowSignUpModal(true);

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" className="px-4">
        <Navbar.Brand href="#home">Nail By Sol</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="#login">Log in</Nav.Link>
            <Button variant="outline-light" className="ms-2" onClick={handleSignUpShow}>
              Sign up
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <SignUpModal show={showSignUpModal} handleClose={handleSignUpClose} />
    </>
  );
};

type SignUpModalProps = {
  show: boolean;
  handleClose: () => void;
};

const SignUpModal: React.FC<SignUpModalProps> = ({ show, handleClose }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async () => {
    try {
      const response = await fetch("/users/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: username, email: email, password: password }),
      });

      if (response.ok) {
        alert("회원가입에 성공했습니다!");
        handleClose();
      } else {
        alert("회원가입에 실패했습니다. 다시 시도해 주세요.");
      }
    } catch (error) {
      console.log(error);
      alert("오류가 발생했습니다. 나중에 다시 시도해 주세요.");
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton className="bg-dark text-light">
        <Modal.Title>Sign Up</Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-dark text-light">
        <Form>
          <Form.Group controlId="formBasicUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              className="bg-dark text-light"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formBasicEmail" className="mt-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              className="bg-dark text-light"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword" className="mt-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              className="bg-dark text-light"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer className="bg-dark text-light">
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSignUp}>
          Sign Up
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Header;
