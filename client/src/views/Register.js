import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// From redux - dispatch event && get store state status
import { useDispatch, useSelector } from "react-redux";

// Toastify for popup informations
import { toast } from "react-toastify";

// Actions
import { signUp } from "../store/actions/authActions";

import Footer from "../components/home/Footer";
import Header from "../components/home/Header";

import "../assets/scss/auth.scss";

export default function Register() {
  const navigate = useNavigate(); // redirect and navigate
  const dispatch = useDispatch(); // dispatch events

  const auth = useSelector((state) => state.auth); // get store state status from auth

  // Register register definitions
  const [register, setRegister] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState(true); // if password and confirmPassword matches
  const [isSubscribed, setIsSubscribed] = useState(false); // if cgu is subscribed

  // Before mount, mount and update component
  useEffect(() => {
    // Check if user already authenticated and redirect to dashboard
    if (auth._id) navigate("/dashboard");
  }, [auth]);

  // Check if password and confirmPassword matches
  const checkConfirmPassword = (e) => {
    if (register.password === e.target.value) setConfirmPassword(true);
    else setConfirmPassword(false);

    e.stopPropagation();
  };

  // Set isSubscribed if the input is check
  const handleChangeSubscribed = (e) => {
    e.stopPropagation();

    if (e.target.checked) {
      setIsSubscribed(true);
    } else {
      setIsSubscribed(false);
    }
  };

  const handleSubmitRegister = (e) => {
    e.preventDefault();

    // If passwords don't matches
    if (!confirmPassword) {
      toast.error("Les mots de passe ne correspondent pas !", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      // Dispatch registration event with user informations
      dispatch(signUp(register));
    }
    e.stopPropagation();
  };

  return (
    <div className="body-wrap">
      <Header />

      <div className="page-content">
        <div className="form-structor shadow">
          <div className="signup">
            <h2 className="form-title" id="signup">
              S'inscrire
            </h2>
            <form className="form-holder">
              <input
                type="text"
                className="input"
                name="name"
                value={register.name}
                onChange={(e) => {
                  e.stopPropagation();
                  setRegister({ ...register, name: e.target.value });
                }}
                placeholder="Identifiant"
              />
              <input
                type="email"
                name="email"
                className="input"
                placeholder="Adresse mail"
                value={register.email}
                onChange={(e) => {
                  e.stopPropagation();
                  setRegister({ ...register, email: e.target.value });
                }}
              />
              <input
                type="password"
                className="input"
                name="password"
                placeholder="Mot de passe"
                value={register.password}
                onChange={(e) => {
                  e.stopPropagation();
                  setRegister({ ...register, password: e.target.value });
                }}
              />
              <input
                type="password"
                className="input"
                name="confirmPassword"
                onChange={checkConfirmPassword}
                placeholder="Confirmer le mot de passe"
              />
              {!confirmPassword ? (
                <div className="text-danger fs-12 fw-semibold">
                  Les mots de passe ne correspondent pas
                </div>
              ) : null}
            </form>
            <div>
              <input
                className="fw-semibold fs-12 mr-1"
                type="checkbox"
                value={isSubscribed}
                onChange={handleChangeSubscribed}
                id="subscribed"
              />
              <label
                className="fw-semibold fs-12 text-justify"
                htmlFor="subscribed"
              >
                J'accepte les&nbsp;
                <a href="#" className="link">
                  Conditions d'utilisation
                </a>
                &nbsp;et la&nbsp;
                <a href="#" className="link">
                  Politique de confidentialité.
                </a>
              </label>
            </div>
            <button
              className="submit-btn"
              onClick={handleSubmitRegister}
              disabled={!isSubscribed}
            >
              S'inscrire
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
