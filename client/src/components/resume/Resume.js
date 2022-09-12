import "../../assets/scss/resume.scss";

export default function Resume(props) {
  return (
    <div className="resume">
      <div className="left-content">
        <div className="img-container">
          <img className="img-responsive" src="#" />
        </div>
        <div className="summary-header">
          <h4 className="text-name">{props.user.name}</h4>
          <h6 className="text-job">{props.user.job}</h6>
          <p className="text-summary">
            {props.resume !== null ? props.resume.summary ?? "" : ""}
          </p>
        </div>
        <div className="contact-section">
          <h4 className="title">Contacts</h4>
          <ul>
            <li className="contact-infos">
              <i className="fas fa-envelope"></i>
              <p>{props.user.email}</p>
            </li>
            <li className="contact-infos">
              <i className="fas fa-phone"></i>
              <p>{props.user.phone}</p>
            </li>
            <li className="contact-infos">
              <i className="fas fa-map-marker"></i>
              <p>{props.user.address}</p>
            </li>
            {props.socials != null
              ? props.socials.map((social, index) => {
                  return (
                    <li
                      index={index}
                      key={social._id}
                      className="contact-infos"
                    >
                    <i className="fas fa-circle"></i>
                      <p>{social.name} : {social.link}</p>
                    </li>
                  );
                })
              : null}
          </ul>
        </div>
        <div className="skill-section">
          <h4 className="title">Principales compétences</h4>
          <ul>
            {props.skills != null
              ? props.skills.map((skill, index) => {
                  return (
                    <li index={index} key={skill._id} className="skill-infos">
                      <p>{skill.name}</p>
                      <input type="range" min="0" max="100" value={skill.level} />
                    </li>
                  );
                })
              : null}
          </ul>
        </div>
        <div className="skill-section">
          <h4 className="title">Langue(s)</h4>
          <ul>
            {props.languages != null
              ? props.languages.map((language, index) => {
                  return (
                    <li index={index} key={language._id} className="language-infos">
                      <p>{language.name} : {language.level}</p>
                    </li>
                  );
                })
              : null}
          </ul>
        </div>
        <div className="skill-section">
          <h4 className="title">Centre d'intérêt</h4>
          <ul>
            {props.hobbies != null
              ? props.hobbies.map((hobby, index) => {
                  return (
                    <li index={index} key={hobby._id} className="hobby-infos">
                      <p>{hobby.name}</p>
                    </li>
                  );
                })
              : null}
          </ul>
        </div>
      </div>
      <div className="right-content"></div>
    </div>
  );
}
