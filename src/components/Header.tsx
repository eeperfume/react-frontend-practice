import React, { useState } from "react";
import { Navbar, Nav, Button, Modal, Form } from "react-bootstrap";

const Header = (): JSX.Element => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);

  const handleLoginClose = () => setShowLoginModal(false);
  const handleLoginShow = () => setShowLoginModal(true);

  const handleSignUpClose = () => setShowSignUpModal(false);
  const handleSignUpShow = () => setShowSignUpModal(true);

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" className="px-4">
        <Navbar.Brand href="#home">Nail By Sol</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as="button" className="btn btn-link" onClick={handleLoginShow}>
              Log in
            </Nav.Link>
            <Button variant="outline-light" className="ms-2" onClick={handleSignUpShow}>
              Sign up
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <LoginModal show={showLoginModal} handleClose={handleLoginClose} />
      <SignUpModal show={showSignUpModal} handleClose={handleSignUpClose} />
    </>
  );
};

type ModalProps = {
  show: boolean;
  handleClose: () => void;
};

const LoginModal: React.FC<ModalProps> = ({ show, handleClose }): JSX.Element => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch("/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: username, password: password }),
      });

      if (response.ok) {
        alert("로그인에 성공했습니다!");

        const data = await response.json();
        const token = data.access_token;

        // JWT 토큰을 로컬 스토리지에 저장
        localStorage.setItem("token", token);

        handleClose();
        setUsername("");
        setPassword("");
      } else {
        alert("로그인에 실패했습니다. 다시 시도해 주세요.");
      }
    } catch (error) {
      console.log(error);
      alert("오류가 발생했습니다. 나중에 다시 시도해 주세요.");
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton className="bg-dark text-light">
        <Modal.Title>Log in</Modal.Title>
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
        <Button variant="primary" onClick={handleLogin}>
          Log in
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const SignUpModal: React.FC<ModalProps> = ({ show, handleClose }): JSX.Element => {
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
        body: JSON.stringify({ username: username, email: email, password: password }),
      });

      if (response.ok) {
        alert("회원가입에 성공했습니다!");
        handleClose();
        setUsername("");
        setEmail("");
        setPassword("");
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
        <Button variant="primary" onClick={handleSignUp} disabled={!username || !email || !password}>
          Sign Up
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Header;
