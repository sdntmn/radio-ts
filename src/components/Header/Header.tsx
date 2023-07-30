import VolumeRange from "components/VolumeRange"
import logoPath from "../../images/radioImg.jpg"
import { useWindowSize } from "hooks"

export interface Props {
  audioElement: HTMLAudioElement
}

export const Header: React.FC<Props> = ({ audioElement }) => {
  // const { windowWidth } = useWindowSize()
  return (
    <header className="header page__section ">
      {/* <button>Радиостанции</button> */}
      <img
        src={logoPath}
        alt="Логотип проекта Mesto"
        className="logo header__logo"
      />
      {/* <button>Избранное</button> */}
      {/* {windowWidth > 800 && <VolumeRange audioElement={audioElement} />} */}
    </header>
  )
}
