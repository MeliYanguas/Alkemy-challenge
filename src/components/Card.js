import React, { useState } from 'react';
import './Style.css';

const Card = (props) => {
  const {
    name,
    biography: { alignment, aliases },
    image: { url },
    appearance: { height, weight },
    work: { base },
  } = props.hero;

  const [isMember, setIsMember] = useState(props.isMember);

  const handleClick = () => {
    if (isMember === false) {
      props.addMember(props.hero);
    } else {
      props.removeMember(props.hero);
    }
    setIsMember(!isMember);
  };

  const [details, setDetails] = useState(false);

  const handleShowDetails = () => {
    if (details === false) {
      setDetails(true);
    } else {
      setDetails(false);
    }
  };

  return (
    <div className="card" style={{ width: 170 }}>
      <img src={url} alt={name} width="auto" onClick={handleShowDetails} />
      <div className="card-body">
        <h4 className="card-title my-0">{name}</h4>
        <p className="text-secondary my-0">{alignment}</p>

        <div>
          <button
            type="button"
            className={
              !isMember
                ? 'btn my-1 btn-secondary text-secondary my-1'
                : 'btn my-1 btn-dark text-secondary my-1'
            }
            onClick={handleClick}
          >
            {isMember ? 'Borrar del equipo' : 'Agregar Al equipo'}
          </button>
        </div>

        {/* DISPLAY DITAILS */}

        {details === true ? (
          <div className="details card-text text-secondary">
            Peso: {weight[1]} <br />
            Altura : {height[1]} <br />
            Nombre: {name} <br />
            Alias: {aliases[1]} <br />
            Color de ojos : {props.hero.appearance['eye-color']} <br />
            Color de cabello : {props.hero.appearance['hair-color']} <br />
            Lugar de trabajo : {base} <br />
            <button type="button" onClick={handleShowDetails}>x</button>
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default Card;
