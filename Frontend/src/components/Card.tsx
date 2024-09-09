import React from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/Card.css";

type CardsProps = {
  imageSrc: string;
  title: string;
  link: string;
  userInitial: string; // Asegúrate de pasar la inicial aquí
};

const Cards: React.FC<CardsProps> = ({
  imageSrc,
  title,
  link,
  userInitial,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    const userLabel = document.getElementById("user-p")?.innerText;
    console.log(userLabel);
    console.log(userInitial);
    navigate(link, { state: { usuario: userInitial || userLabel } });
  };

  return (
    <div className="card-container" onClick={handleClick}>
      <img src={imageSrc} alt={title} className="card-image" />
      <span className="card-title">{title}</span>
    </div>
  );
};

export default Cards;
