import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="site-footer has-top-divider">
      <div className="container">
        <div className="site-footer-inner">
          <div className="brand footer-brand">
            <Link to="/">
              <img
                width="40"
                className="asset-light"
                src="logo-white.png"
                alt="Logo"
              />
            </Link>
          </div>
          <ul className="footer-links list-reset">
            <li>
              <a href="#">Contact</a>
            </li>
            <li>
              <a href="#">À propos</a>
            </li>
            <li>
              <a href="#">FAQ's</a>
            </li>
            <li>
              <a href="#">Support</a>
            </li>
          </ul>
          <ul className="footer-social-links list-reset">
            <li>
              <a href="#">
                <i className="fa fa-facebook"></i>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fa fa-twitter"></i>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fa fa-google"></i>
              </a>
            </li>
          </ul>
          <div className="footer-copyright">
            &copy; {new Date().getFullYear()}
            <Link to="/">&nbsp;Hkdigitals</Link>, all rights reserved
          </div>
        </div>
      </div>
    </footer>
  );
}
