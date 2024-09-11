import React from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/Card.css";

type CardProps = {
  imageSrc: string;
  title: string;
  link: string;
};

const Card: React.FC<CardProps> = ({ imageSrc, title, link }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    const userLabel = document.getElementById("user-p")?.innerText;
    console.log(userLabel);
    navigate(link);
  };

  return (
    <div className="card-container" onClick={handleClick}>
      <img src={imageSrc} alt={title} className="card-image" />
      <span className="card-title">{title}</span>
    </div>
  );
};

export default Card;
