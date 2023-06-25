import logoPath from "../images/radioImg.jpg"

export const Header: React.FC = () => {
  return (
    <header className="header page__section ">
      {/* <button>Радиостанции</button> */}
      <img
        src={logoPath}
        alt="Логотип проекта Mesto"
        className="logo header__logo"
      />
      {/* <button>Избранное</button> */}
    </header>
  )
}
