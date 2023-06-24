import { ITrack } from "../App"

export interface Props {
  card: ITrack
  classButton: string
  setRadioIndex: (arg: number) => void
  onClick: (e: React.MouseEvent<HTMLButtonElement>, arg: string) => void
}
export const CardStation: React.FC<Props> = ({
  card,
  classButton,
  setRadioIndex,
  onClick
}) => {
  const { index, img, name, like } = card

  function handleClick() {
    if (typeof index === "number") {
      setRadioIndex(index)
    }
  }

  return (
    <>
      <li
        className="card "
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
        </div>
      </li>
    </>
  )
}
