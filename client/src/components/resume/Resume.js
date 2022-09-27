import "../../assets/scss/resume.scss";

// Moment JS to format date
import moment from "moment";
import "moment/locale/fr";

export default function Resume(props) {
  return (
    <div className="resume" ref={props.componentRef}>
      <div className="left-content">
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
        <div className="summary-header">
          <h4 className="text-name">{props.user.name}</h4>
          <h6 className="text-job">{props.user.job}</h6>
          <p className="text-summary">
            {props.resume !== null ? props.resume.summary ?? "" : ""}
          </p>
        </div>
        <div className="left-section">
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
                      <p>
                        {social.name} : {social.link}
                      </p>
                    </li>
                  );
                })
              : null}
          </ul>
        </div>
        <div className="left-section">
          <h4 className="title">Principales compétences</h4>
          <ul>
            {props.skills != null
              ? props.skills.map((skill, index) => {
                  return (
                    <li index={index} key={skill._id} className="skill-infos">
                      <p>{skill.name}</p>
                      <div className="d-flex">
                        <div
                          className={`circle-level ${
                            skill.level >= 20 ? "green" : ""
                          }`}
                        ></div>
                        <div
                          className={`circle-level ${
                            skill.level >= 40 ? "green" : ""
                          }`}
                        ></div>
                        <div
                          className={`circle-level ${
                            skill.level >= 60 ? "green" : ""
                          }`}
                        ></div>
                        <div
                          className={`circle-level ${
                            skill.level >= 80 ? "green" : ""
                          }`}
                        ></div>
                        <div
                          className={`circle-level ${
                            skill.level >= 90 ? "green" : ""
                          }`}
                        ></div>
                      </div>
                    </li>
                  );
                })
              : null}
          </ul>
        </div>
        <div className="left-section">
          <h4 className="title">Langue(s)</h4>
          <ul>
            {props.languages != null
              ? props.languages.map((language, index) => {
                  return (
                    <li
                      index={index}
                      key={language._id}
                      className="language-infos"
                    >
                      <p>
                        {language.name} : {language.level}
                      </p>
                    </li>
                  );
                })
              : null}
          </ul>
        </div>
        <div className="left-section">
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
      <div className="right-content">
        <div className="right-section">
          <div className="cover-div">
            <h4 className="title">Expériences professionnelles</h4>
          </div>
          <div>
            {props.experiences != null
              ? props.experiences.map((experience, index) => {
                  return (
                    <div
                      index={index}
                      key={experience._id}
                      className="experience-infos"
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
                        className="experience-description"
                        dangerouslySetInnerHTML={{
                          __html: experience.description,
                        }}
                      ></div>
                    </div>
                  );
                })
              : null}
          </div>
        </div>
        <div className="right-section">
          <div className="cover-div">
            <h4 className="title">Formations</h4>
          </div>
          <div>
            {props.formations != null
              ? props.formations.map((formation, index) => {
                  return (
                    <div
                      index={index}
                      key={formation._id}
                      className="formation-infos"
                    >
                      <h6>{formation.establishment}</h6>
                      <p>
                        {formation.degree} (
                        {moment(formation.start_date)
                          .locale("fr")
                          .format("ll") +
                          (formation.end_date != null
                            ? " - " +
                              moment(formation.end_date)
                                .locale("fr")
                                .format("ll")
                            : "")}
                        )
                      </p>
                      <div className="formation-description">
                        {formation.description}
                      </div>
                    </div>
                  );
                })
              : null}
          </div>
        </div>
      </div>
    </div>
  );
}
