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

  function handleClick(e: React.MouseEvent<HTMLElement>) {
    if (typeof index === "number") {
      setRadioIndex(e, index)
    }
  }

  const currentCard = card.index === radioIndex

  return (
    <>
      <li
        className={`card ${currentCard && "card_curent"}`}
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
