import React, { useState } from "react"
import { CardStation } from "./CardStation"
import { ITrack } from "../App"

export interface Props {
  tracks: ITrack[]
  radioIndex: number
  listFavoriteRadioStation: ITrack[]
  setRadioIndex: (e: React.MouseEvent<HTMLElement>, arg: number) => void
  handleCardDelete: (
    e: React.MouseEvent<HTMLButtonElement>,
    arg: string
  ) => void
}

export const Favorites: React.FC<Props> = ({
  tracks,
  radioIndex,
  listFavoriteRadioStation,
  setRadioIndex,
  handleCardDelete
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const openFavoriteList = () => {
    setIsOpen(!isOpen)
  }

  const card = tracks.map((item: ITrack) => (
    <CardStation
      key={item.id}
      card={item}
      radioIndex={radioIndex}
      classButton="card__button-delete"
      setRadioIndex={setRadioIndex}
      onClick={handleCardDelete}
    />
  ))
  return (
    <div className="favorites">
      <div
        className="favorites__wrap-title"
        onClick={openFavoriteList}>
        <h3 className="favorites__title">Избранное</h3>
      </div>

      <ul
        className={`favorites__items cards favorites_direction ${
          isOpen && "favorites__items_open"
        }`}>
        {card}
      </ul>
      <div
        onClick={openFavoriteList}
        className="favorites__footer">
        {!isOpen && listFavoriteRadioStation.length
          ? `${listFavoriteRadioStation.length + " радиостанций"}`
          : ""}

        {isOpen && !listFavoriteRadioStation.length && <p>Пока список пуст</p>}
      </div>
    </div>
  )
}
