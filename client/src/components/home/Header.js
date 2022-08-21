import { Link } from "react-router-dom";
import "../../assets/scss/navbar.scss";

export default function Header() {
  // Toogle hamburger menu
  const onMenuClick = (e) => {
    e.preventDefault();

    const navbar = document.getElementById("navigation-bar");
    const hamburger = document.getElementById("hamburger");
    const responsive_class_name = "responsive";
    navbar.classList.toggle(responsive_class_name);

    if (hamburger.classList.contains("fa-bars")) {
      setTimeout(function () {
        hamburger.classList.remove("fa-bars");
        hamburger.classList.add("fa-close");
      }, 300);
    } else {
      setTimeout(function () {
        hamburger.classList.remove("fa-close");
        hamburger.classList.add("fa-bars");
      }, 300);
    }
  };

  return (
    <header className="container">
      <div className="page-header">
        <div className="site-header-inner">
          <div className="brand header-brand">
            <h1 className="m-0">
              <Link to="/">
                <img
                  width="40"
                  className="header-logo-image asset-light"
                  src="logo.png"
                  alt="Logo"
                />
              </Link>
            </h1>
          </div>
        </div>

        <div id="navigation-bar" className="nav-bar">
          <Link to="/signin">Connexion</Link>
          <Link className="bg-primary" to="/signup">
            Inscription
          </Link>
        </div>

        <a id="menu-icon" className="menu-icon" href="#" onClick={onMenuClick}>
          <i id="hamburger" className="fa fa-bars"></i>
        </a>
      </div>
    </header>
  );
}
