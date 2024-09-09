import "../CSS/HeaderApp.css";

type HeaderAppProps = {
  userInitial: string; // Recibir la inicial del usuario como prop
};

function HeaderApp({ userInitial }: HeaderAppProps) {
  return (
    <div className="header-container">
      <div className="icon" id="icon">
        <img
          src="/public/Images/LogoMotorMaster.png"
          alt="header-icon"
          className="header-img"
        />
      </div>
      <div className="profile" id="profile">
        <div className="profile-name">
          <label id="user-p">{userInitial}</label> {/* Mostrar la inicial */}
        </div>
      </div>
    </div>
  );
}

export default HeaderApp;
