import React from "react"
import { ITrack } from "../App"
import { CardStation } from "./CardStation"

export interface Props {
  tracks: ITrack[]
  setRadioIndex: (arg: number) => void
  handleCardDelete: (
    e: React.MouseEvent<HTMLButtonElement>,
    arg: string
  ) => void
}

export const RadioList: React.FC<Props> = ({
  tracks,
  setRadioIndex,
  handleCardDelete
}) => {
  const card = tracks.map((item: ITrack) => (
    <CardStation
      key={item.id}
      card={item}
      setRadioIndex={setRadioIndex}
      classButton="card__button-is-favorite-size "
      onClick={handleCardDelete}
    />
  ))
  return (
    <>
      <div className="radioList">
        <h3 className="radioList__title">Список радиостанций</h3>
        <ul className="radioList__items ">{card}</ul>
        <div className="favorites__footer"></div>
      </div>
    </>
  )
}
