import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container'
import { AuthContext } from '../../Services/AuthContext'
import { useCookies } from 'react-cookie';
import { useContext } from 'react'
import { Notyf } from 'notyf';

const NavBar = () => {
  const { isAuth, username } = useContext(AuthContext)
  const [cookies, removeCookie] = useCookies(['t']);
  const notyf = new Notyf()

  const handleLogout = () => {
    notyf.success('Logged out')
    removeCookie('t');
  }

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
            {
              !isAuth ? (
                <>
                  <Nav.Link href="/login" className="text-white styled-link">
                    Login
                  </Nav.Link>
                  <Nav.Link href="/signup" className="border rounded py-1 px-2 text-white styled-link d-flex bg-white">
                    <div className="my-auto text-dark">
                      Sign up
                    </div>
                  </Nav.Link>
                </>
              ) : (
                <>
                  {/* <Nav.Link className="text-white styled-link">
                    Favorites
                  </Nav.Link> */}
                  <Nav.Link href={`/profile/${username}`} className="text-white styled-link">
                    My profile
                  </Nav.Link>
                  <Nav.Link href="/" onClick={handleLogout} className="text-white styled-link">
                    Logout
                  </Nav.Link>
                </>
              )
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  ) 
}

export default NavBar