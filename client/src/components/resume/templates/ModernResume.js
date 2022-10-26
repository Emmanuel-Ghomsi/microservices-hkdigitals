import "../../../assets/scss/resume/modern-resume.scss";

// Moment JS to format date
import moment from "moment";
import "moment/locale/fr";

export default function ModernResume(props) {
  return (
    <div id="resume" className="modern-resume" ref={props.componentRef}>
      <img
        className="img-responsive"
        src={
          props.presetImg != ""
            ? props.presetImg
            : props.avatar != null
            ? props.avatar[0] != undefined
              ? props.avatar[0].url
              : "#"
            : "#"
        }
      />
      <div className="left-section">
        <hr className="bg-white" />
        <div className="infos">
          <h4 className="title">Contact</h4>
          <ul className="details">
            <li>
              <i className="fas fa-envelope"></i>
              <p>{props.user.email}</p>
            </li>
            <li>
              <i className="fas fa-phone"></i>
              <p>{props.user.phone}</p>
            </li>
            <li>
              <i className="fas fa-map-marker"></i>
              <p>{props.user.address}</p>
            </li>
            {props.socials != null
              ? props.socials.map((social, index) => {
                  return (
                    <li index={index} key={social._id}>
                      <i className="fas fa-circle"></i>
                      <p>
                        {social.name} : {social.link}
                      </p>
                    </li>
                  );
                })
              : null}
          </ul>
        </div>
        <div className="infos">
          <h4 className="title">Infos</h4>
          <p className="summary">
            {props.resume !== null ? props.resume.summary ?? "" : ""}
          </p>
        </div>
        <div className="infos">
          <h4 className="title">Compétences</h4>
          <ul className="details">
            {props.skills != null
              ? props.skills.map((skill, index) => {
                  return (
                    <li index={index} key={skill._id}>
                      <p>{skill.name}</p>
                    </li>
                  );
                })
              : null}
          </ul>
        </div>
        <div className="infos">
          <h4 className="title">Langue(s)</h4>
          <ul className="details">
            {props.languages != null
              ? props.languages.map((language, index) => {
                  return (
                    <li index={index} key={language._id}>
                      <p>
                        {language.name} : {language.level}
                      </p>
                    </li>
                  );
                })
              : null}
          </ul>
        </div>
        <div className="infos">
          <h4 className="title">Centre d'intérêt</h4>
          <ul className="details">
            {props.hobbies != null
              ? props.hobbies.map((hobby, index) => {
                  return (
                    <li index={index} key={hobby._id}>
                      <p>{hobby.name}</p>
                    </li>
                  );
                })
              : null}
          </ul>
        </div>
      </div>

      <div className="right-section">
        <div className="name-section">
          <hr />
          <h2>{props.user.name}</h2>
          <p>{props.user.job}</p>
        </div>
        <div className="infos mt-2">
          <hr />
          <h4 className="title">Expériences professionnelles</h4>
          {props.experiences != null
            ? props.experiences.map((experience, index) => {
                return (
                  <div
                    index={index}
                    key={experience._id}
                    className="text-infos"
                  >
                    <h6>{experience.role}</h6>
                    <p>
                      {experience.company} |
                      {" " +
                        moment(experience.start_date)
                          .locale("fr")
                          .format("ll") +
                        (experience.end_date != null
                          ? " - " +
                            moment(experience.end_date)
                              .locale("fr")
                              .format("ll")
                          : " - aujourd'hui")}
                    </p>
                    <div
                      className="text-description"
                      dangerouslySetInnerHTML={{
                        __html: experience.description,
                      }}
                    ></div>
                  </div>
                );
              })
            : null}
        </div>
        <div className="infos">
          <hr />
          <h4 className="title">Formations</h4>
          {props.formations != null
            ? props.formations.map((formation, index) => {
                return (
                  <div index={index} key={formation._id} className="text-infos">
                    <h6>{formation.establishment}</h6>
                    <p>
                      {formation.degree} (
                      {moment(formation.start_date).locale("fr").format("ll") +
                        (formation.end_date != null
                          ? " - " +
                            moment(formation.end_date).locale("fr").format("ll")
                          : "")}
                      )
                    </p>
                    <div className="text-description">
                      {formation.description}
                    </div>
                  </div>
                );
              })
            : null}
        </div>
      </div>
    </div>
  );
}
