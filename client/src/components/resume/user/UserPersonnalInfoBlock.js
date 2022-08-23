import { useState, useEffect } from "react";

// From redux - dispatch event && get store state status
import { useDispatch } from "react-redux";

export default function UserPersonnalInfoBlock(props) {
  const dispatch = useDispatch(); // dispatch events

  return (
    <div className="block-group">
      <h4>Renseignements personnels</h4>
      <div className="form-group">
        <div className="w-45">
          <div className="form-content">
            <label htmlFor="job" className="form-label">
              Titre du Poste
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="par ex. Enseignant"
              id="job"
              name="job"
              value={props.user.job ?? ""}
              onChange={(e) => {
                e.stopPropagation();
                props.setUser({ ...props.user, job: e.target.value });
              }}
            />
          </div>
        </div>
        <div className="w-45">
          <div className="form-content">
            <label htmlFor="avatar" className="form-label">
              Image de profil
            </label>
            <input
              type="file"
              className="form-control"
              id="avatar"
              name="avatar"
            />
          </div>
        </div>
      </div>
      <div className="form-group">
        <div className="form-content">
          <label htmlFor="name" className="form-label">
            Nom complet
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={props.user.name ?? ""}
            onChange={(e) => {
              e.stopPropagation();
              props.setUser({ ...props.user, name: e.target.value });
            }}
          />
        </div>
      </div>
      <div className="form-group">
        <div className="w-45">
          <div className="form-content">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              placeholder="par ex. cv@example.com"
              id="email"
              name="email"
              value={props.user.email ?? ""}
              onChange={(e) => {
                e.stopPropagation();
                props.setUser({ ...props.user, email: e.target.value });
              }}
            />
          </div>
        </div>
        <div className="w-45">
          <div className="form-content">
            <label htmlFor="phone" className="form-label">
              Téléphone
            </label>
            <input
              type="text"
              className="form-control"
              id="phone"
              name="phone"
              value={props.user.phone ?? ""}
              onChange={(e) => {
                e.stopPropagation();
                props.setUser({ ...props.user, phone: e.target.value });
              }}
            />
          </div>
        </div>
      </div>
      <div className="form-group">
        <div className="form-content">
          <label htmlFor="address" className="form-label">
            Adresse
          </label>
          <input
            type="text"
            className="form-control"
            id="address"
            name="address"
            placeholder="par ex. Douala, Cameroun"
            value={props.user.address ?? ""}
            onChange={(e) => {
              e.stopPropagation();
              props.setUser({ ...props.user, address: e.target.value });
            }}
          />
        </div>
      </div>
    </div>
  );
}
