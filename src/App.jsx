import { Link, Outlet } from "react-router-dom";
import "./App.css";
import { Button } from "components/button";
import { useState } from "react";

function Header() {
  const [isNavActive, setIsNavActive] = useState(false);

  return (
    <header className="outer-wrapper">
      <div className="inner-wrapper">
        <Button className="nav-trigger" onClick={() => setIsNavActive(true)}>
          <img src="/icon-hamburger-menu.svg" alt="hamburger menu icon" />
        </Button>
        <span className="header-logo">
          <Link to="/">
            <img src="/little-lemon-wordmark.svg" alt="Little Lemon Logo" />
          </Link>
        </span>
        <nav data-active={isNavActive}>
          <Button className="nav-trigger" onClick={() => setIsNavActive(false)}>
            <img src="/icon-close.svg" alt="close icon" />
          </Button>
          <ul>
            <li>
              <Link
                to="/"
                className="nav-link"
                onClick={() => setIsNavActive(false)}
              >
                <span>Home</span>
              </Link>
            </li>
            <li>
              <Link
                to="/#about"
                className="nav-link"
                onClick={() => setIsNavActive(false)}
              >
                <span>About</span>
              </Link>
            </li>
            <li>
              <Link
                to="/#specials"
                className="nav-link"
                onClick={() => setIsNavActive(false)}
              >
                <span>Menu</span>
              </Link>
            </li>
            <li>
              <Link
                to="/confirmation"
                className="nav-link"
                onClick={() => setIsNavActive(false)}
              >
                <span>Reservations</span>
              </Link>
            </li>
            <li>
              <Link
                to="/#specials"
                className="nav-link"
                onClick={() => setIsNavActive(false)}
              >
                <span>Order online</span>
              </Link>
            </li>
            <li>
              <Link
                to="/confirmation"
                className="nav-link"
                onClick={() => setIsNavActive(false)}
              >
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
          <img src="/little-lemon-wordmark-light.svg" alt="Little Lemon Logo" />
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
          <ul>
            <li className="footer-column-item">
              <h4 className="footer-column-sub-header">Address</h4>
              <Link
                className="nav-link"
                rel="noopener noreferrer"
                target="_blank"
                to="https://www.google.com/maps/search/?api=1&query=123+Mediterranean+Ave,+Chicago,+IL+60601"
              >
                Little Lemon <br />
                123 Mediterranean Ave Chicago <br />
                IL 60601
              </Link>
            </li>
            <li className="footer-column-item">
              <h4 className="footer-column-sub-header">Phone Number</h4>
              <Link
                className="nav-link"
                rel="noopener noreferrer"
                target="_blank"
                to="tel:+13125556789"
              >
                (312) 555-6789
              </Link>
            </li>
            <li className="footer-column-item">
              <h4 className="footer-column-sub-header">Email</h4>
              <Link
                className="nav-link"
                rel="noopener noreferrer"
                target="_blank"
                to="mailto:hello@littlelemonchicago.com"
              >
                hello@littlelemonchicago.com
              </Link>
            </li>
          </ul>
        </div>
        <div className="footer-column">
          <h3 className="footer-column-header">Social Media Links</h3>
          <ul>
            <li className="footer-column-item">
              <Link
                className="nav-link"
                rel="noopener noreferrer"
                target="_blank"
                to="https://facebook.com/littlelemonchicago"
              >
                Facebook
              </Link>
            </li>
            <li className="footer-column-item">
              <Link
                className="nav-link"
                rel="noopener noreferrer"
                target="_blank"
                to="https://instagram.com/littlelemonchicago"
              >
                Instagram
              </Link>
            </li>
            <li className="footer-column-item">
              <Link
                className="nav-link"
                rel="noopener noreferrer"
                target="_blank"
                to="https://x.com/littlelemonchicago"
              >
                X
              </Link>
            </li>
          </ul>
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
