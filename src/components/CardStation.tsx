import { useRef } from "react"
import { ITrack } from "../App"
import { Equalizer } from "./Equalizer"

export interface Props {
  card: ITrack
  classButton: string
  radioIndex: number
  setRadioIndex: (e: React.MouseEvent<HTMLElement>, arg: number) => void
  onClick: (e: React.MouseEvent<HTMLButtonElement>, arg: string) => void
}
export const CardStation: React.FC<Props> = ({
  card,
  classButton,
  radioIndex,
  setRadioIndex,
  onClick
}) => {
  const { index, img, name, like } = card

  const cardRef = useRef<HTMLLIElement>(null)

  function handleClick(e: React.MouseEvent<HTMLElement>) {
    if (typeof index === "number") {
      setRadioIndex(e, index)
    }
  }

  const currentCard = card.index === radioIndex

  const el = cardRef?.current

  if (el) {
    if (currentCard) {
      el.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <>
      <li
        ref={cardRef}
        className={`card ${currentCard && "card_current"}`}
        onClick={handleClick}>
        <div className="card__wrap">
          <img
            className="card__img"
            src={img}
            alt="#"
          />
          <h4 className="card__title">{name}</h4>
          {like && (
            <button
              type="button"
              className={classButton}
              onClick={e => onClick(e, card.id)}></button>
          )}
          {currentCard && <Equalizer></Equalizer>}
        </div>
      </li>
    </>
  )
}
