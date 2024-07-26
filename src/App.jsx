import { Link, Outlet } from "react-router-dom";
import "./App.css";

function Header() {
  return (
    <header className="outer-wrapper">
      <div className="inner-wrapper">
        <span className="header-logo">
          <Link to="/">
            <img src="/little-lemon-wordmark.svg" alt="Little Lemon Logo" />
          </Link>
        </span>
        <nav>
          <ul>
            <li>
              <Link to="/" className="nav-link">
                <span>Home</span>
              </Link>
            </li>
            <li>
              <Link to="/#about" className="nav-link">
                <span>About</span>
              </Link>
            </li>
            <li>
              <Link to="/#specials" className="nav-link">
                <span>Menu</span>
              </Link>
            </li>
            <li>
              <Link to="/confirmation" className="nav-link">
                <span>Reservations</span>
              </Link>
            </li>
            <li>
              <Link to="/#specials" className="nav-link">
                <span>Order online</span>
              </Link>
            </li>
            <li>
              <Link to="/confirmation" className="nav-link">
                <span>Login</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="outer-wrapper">
      <div className="inner-wrapper">
        <div className="footer-logo">
          <img src="/little-lemon-wordmark.svg" alt="Little Lemon Logo" />
        </div>
        <div className="footer-column">
          <h3 className="footer-column-header">Doormat Links</h3>
          <nav>
            <ul>
              <li className="footer-column-item">
                <Link to="/" className="nav-link">
                  <span>Home</span>
                </Link>
              </li>
              <li className="footer-column-item">
                <Link to="/#about" className="nav-link">
                  <span>About</span>
                </Link>
              </li>
              <li className="footer-column-item">
                <Link to="/#specials" className="nav-link">
                  <span>Menu</span>
                </Link>
              </li>
              <li className="footer-column-item">
                <Link to="/confirmation" className="nav-link">
                  <span>Reservations</span>
                </Link>
              </li>
              <li className="footer-column-item">
                <Link to="/#specials" className="nav-link">
                  <span>Order online</span>
                </Link>
              </li>
              <li className="footer-column-item">
                <Link to="/confirmation" className="nav-link">
                  <span>Login</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="footer-column">
          <h3 className="footer-column-header">Contact Us</h3>
          <p className="footer-column-item">Address</p>
          <p className="footer-column-item">Phone Number</p>
          <p className="footer-column-item">Email</p>
        </div>
        <div className="footer-column">
          <h3 className="footer-column-header">Social Media Links</h3>
          <p className="footer-column-item">Facebook</p>
          <p className="footer-column-item">Instagram</p>
          <p className="footer-column-item">X</p>
        </div>
      </div>
    </footer>
  );
}

function App() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
