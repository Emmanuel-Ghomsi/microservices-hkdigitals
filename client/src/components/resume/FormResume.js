import UserPersonnalInfoBlock from "./user/UserPersonnalInfoBlock";
import ExperienceBlock from "./experience/ExperienceBlock";
import FormationBlock from "./formation/FormationBlock";

export default function FormResume(props) {
  return (
    <div className="form-resume">
      <div className="container">
        <UserPersonnalInfoBlock user={props.user} setUser={props.setUser} />

        <div className="block-group">
          <h4>Résumé professionnel</h4>
          <div className="form-group">
            <div className="form-content">
              <label htmlFor="summary" className="form-label">
                Inclure 2 ou 3 phrases claires au sujet de votre expérience
                globale
              </label>
              <textarea
                type="text"
                className="form-control"
                id="summary"
                name="summary"
                placeholder="par ex. Professeur de science passionné avec plus de 8 ans d'expérience et un parcours professionnel de ..."
                rows={5}
              ></textarea>
            </div>
          </div>
        </div>

        <ExperienceBlock
          user_id={props.user._id}
          experiences={props.experiences}
          setOpenModal={props.setOpenModal}
          setModalType={props.setModalType}
          setExperiences={props.setExperiences}
          setExperience={props.setExperience}
        />

        <FormationBlock
          user_id={props.user._id}
          formations={props.formations}
          setOpenModal={props.setOpenModal}
          setModalType={props.setModalType}
          setFormations={props.setFormations}
          setFormation={props.setFormation}
        />

        <div className="block-group">
          <h4>Site web et lien sociaux</h4>
          <span className="span-info">
            Vous pouvez ajouter des liens vers des sites web que les recruteurs
            verront ! Cela peut être un lien vers votre Portfolio, votre profil
            LinkedIn ou votre site web personnel.
          </span>
        </div>

        <div className="block-group">
          <h4>Compétences(s)</h4>
          <span className="span-info">
            Dressez la liste de vos compétences et de vos niveaux d'expériences
            afin de visualiser vos forces et d'optimiser vos mots-clés.
          </span>
        </div>

        <div className="block-group">
          <h4>Loisir(s)</h4>
          <span className="span-info">
            Quelle(s) activité(s) pratiquez-vous ?
          </span>
        </div>

        <div className="block-group">
          <h4>Langue(s)</h4>
          <span className="span-info">
            Quelle(s) est(sont) la(les) langue(s) que vous parlez ?
          </span>
        </div>
      </div>
    </div>
  );
}
