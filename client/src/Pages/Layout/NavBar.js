import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container'

const NavBar = () => {
  return (
    <Navbar bg="dark" expand="md">
      <Container>
        <Navbar.Brand className="text-white styled-link" href="/">Torre.co | People</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav>
            <Nav.Link className="text-white styled-link" href="/">
              People
            </Nav.Link>
            <Nav.Link className="text-white styled-link">
              Favorites
            </Nav.Link>
            <Nav.Link className="text-white styled-link">
              Profile
            </Nav.Link>
            <Nav.Link href="/login" className="text-white styled-link">
              Login
            </Nav.Link>
            <Nav.Link href="/signup" className="border rounded py-1 px-2 text-white styled-link d-flex bg-white">
              <div className="my-auto text-dark">
                Sign up
              </div>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  ) 
}

export default NavBar