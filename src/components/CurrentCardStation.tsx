import React from "react"
import { AudioControls } from "./AudioControls"

export interface Props {
  img: string
  name: string
  tracksId: string
  isPlaying: boolean
  radioIndex: number
  listFavorites: string[] | null
  onPrev: (e: React.MouseEvent<HTMLButtonElement>) => void
  onNext: (e: React.MouseEvent<HTMLButtonElement>) => void
  onPlayPause: (e: React.MouseEvent<HTMLButtonElement>, arg: boolean) => void
  handleCardDelete: (
    e: React.MouseEvent<HTMLButtonElement>,
    arg: string
  ) => void
  addCardInFavorite: (arg: string) => void
}

export const CurrentCardStation: React.FC<Props> = ({
  img,
  name,
  tracksId,
  isPlaying,
  radioIndex,
  listFavorites,
  onPrev,
  onNext,
  onPlayPause,
  handleCardDelete,
  addCardInFavorite
}) => {
  const isLikeStation = listFavorites?.includes(tracksId)

  const buttonStyleFavorite = ` ${
    isLikeStation
      ? "radioPlayer__button-is-Favorite "
      : "radioPlayer__button-is-notFavorite"
  }`

  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    if (!isLikeStation) {
      addCardInFavorite(tracksId)
    } else {
      handleCardDelete(e, tracksId)
    }
  }

  return (
    <>
      <div className="radioPlayer">
        <div className="radioPlayer__info">
          <img
            className="radioPlayer__img"
            src={img}
            alt={`track artwork for ${name}`}
          />
          <h2 className="radioPlayer__title">{name}</h2>
        </div>
        <button
          type="button"
          className={buttonStyleFavorite}
          onClick={onClick}></button>
      </div>
      <AudioControls
        isPlaying={isPlaying}
        onPrev={onPrev}
        onNext={onNext}
        onPlayPause={onPlayPause}
        radioIndex={radioIndex}
      />
    </>
  )
}
