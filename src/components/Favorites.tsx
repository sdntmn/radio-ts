import React from "react"
import { CardStation } from "./CardStation"
import { ITrack } from "../App"

export interface Props {
  tracks: ITrack[]
  setRadioIndex: (arg: number) => void
  handleCardDelete: (
    e: React.MouseEvent<HTMLButtonElement>,
    arg: string
  ) => void
}

export const Favorites: React.FC<Props> = ({
  tracks,
  setRadioIndex,
  handleCardDelete
}) => {
  const card = tracks.map((item: ITrack) => (
    <CardStation
      key={item.id}
      card={item}
      classButton="card__button-delete"
      setRadioIndex={setRadioIndex}
      onClick={handleCardDelete}
    />
  ))
  return (
    <div className="favorites">
      <div>
        <h3 className="favorites__title">Избранное</h3>
      </div>

      <ul className="favorites__items cards favorites_direction">{card}</ul>
      <div className="favorites__footer"></div>
    </div>
  )
}
