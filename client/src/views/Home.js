import React from "react";
import Footer from "../components/home/Footer";
import Header from "../components/home/Header";

export default function Home() {
  return (
    <div className="body-wrap">
      <Header />

      <main>
        <section className="hero">
          <div className="container">
            <div className="hero-inner">
              <div className="hero-copy">
                <h1 className="hero-title mt-0">
                  Créer rapidement un CV professionnel
                </h1>
                <p className="hero-paragraph">
                  Utilisez des modèles de CV professionnels testés sur le
                  terrain qui suivent exactement les « règles de CV » que les
                  employeurs recherchent. Facile à utiliser et à faire en
                  quelques minutes - essayez maintenant gratuitement !
                </p>
                <div className="hero-form field field-grouped">
                  <div className="control control-expanded">
                    <input
                      className="input"
                      type="email"
                      name="email"
                      placeholder="cv@example.com"
                    />
                  </div>
                  <div className="control">
                    <a className="button button-danger button-block" href="#">
                      Se connecter
                    </a>
                  </div>
                </div>
              </div>
              <div className="hero-media">
                <div className="hero-media-container">
                  <img
                    className="hero-media-image asset-light"
                    src="dist/images/liste-cv-en-ligne.png"
                    alt="Hero media"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
