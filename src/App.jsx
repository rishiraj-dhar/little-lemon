import { Outlet } from "react-router-dom";
import "./App.css";

function Header() {
  return (
    <header className="outer-wrapper">
      <div className="inner-wrapper">
        <span className="header-logo">
          <img src="/little-lemon-wordmark.svg" alt="Little Lemon Logo" />
        </span>
        <nav>
          <ul>
            <li>
              <a className="nav-link" href="#">
                <span>Home</span>
              </a>
            </li>
            <li>
              <a className="nav-link" href="#">
                <span>About</span>
              </a>
            </li>
            <li>
              <a className="nav-link" href="#">
                <span>Menu</span>
              </a>
            </li>
            <li>
              <a className="nav-link" href="#">
                <span>Reservations</span>
              </a>
            </li>
            <li>
              <a className="nav-link" href="#">
                <span>Order online</span>
              </a>
            </li>
            <li>
              <a className="nav-link" href="#">
                <span>Login</span>
              </a>
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
        <div>
          <h3 className="footer-column-header">Doormat Links</h3>
          <nav>
            <ul>
              <li className="footer-column-item">
                <a className="nav-link" href="#">
                  <span>Home</span>
                </a>
              </li>
              <li className="footer-column-item">
                <a className="nav-link" href="#">
                  <span>About</span>
                </a>
              </li>
              <li className="footer-column-item">
                <a className="nav-link" href="#">
                  <span>Menu</span>
                </a>
              </li>
              <li className="footer-column-item">
                <a className="nav-link" href="#">
                  <span>Reservations</span>
                </a>
              </li>
              <li className="footer-column-item">
                <a className="nav-link" href="#">
                  <span>Order online</span>
                </a>
              </li>
              <li className="footer-column-item">
                <a className="nav-link" href="#">
                  <span>Login</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <div>
          <h3 className="footer-column-header">Contact Us</h3>
          <p className="footer-column-item">Address</p>
          <p className="footer-column-item">Phone Number</p>
          <p className="footer-column-item">Email</p>
        </div>
        <div>
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
