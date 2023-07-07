import React, { useState } from "react"
import { ITrack } from "../../App"
import { CardStation } from "../CardStation"

export interface Props {
  tracks: ITrack[]
  radioIndex: number
  setRadioIndex: (e: React.MouseEvent<HTMLElement>, arg: number) => void
  handleCardDelete: (
    e: React.MouseEvent<HTMLButtonElement>,
    arg: string
  ) => void
}

export const RadioList: React.FC<Props> = ({
  tracks,
  radioIndex,
  setRadioIndex,
  handleCardDelete
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(true)
  const openRadioList = () => {
    setIsOpen(!isOpen)
  }

  const card = tracks.map((item: ITrack) => (
    <CardStation
      key={item.id}
      card={item}
      radioIndex={radioIndex}
      setRadioIndex={setRadioIndex}
      classButton="card__button-is-favorite-size "
      onClick={handleCardDelete}
    />
  ))
  return (
    <>
      <div className="radioList">
        <div
          className="radioList__wrap-title"
          onClick={openRadioList}>
          <h3 className="radioList__title">Список радиостанций</h3>
        </div>
        <ul
          className={`radioList__items cards ${
            isOpen && "radioList__items_open"
          }`}>
          {tracks.length ? card : null}
        </ul>
        <div className="favorites__footer"></div>
      </div>
    </>
  )
}
