import React from "react"
import { ReactComponent as Play } from "../../images/play-button-svgrepo-com.svg"
import { ReactComponent as Pause } from "../../images/pause-svgrepo-com.svg"
import { ReactComponent as Next } from "../../images/forward-svgrepo-com.svg"
import { ReactComponent as Prev } from "../../images/forward-svgrepo-com.svg"

export interface Props {
  isPlaying: boolean
  onPrev: (e: React.MouseEvent<HTMLButtonElement>) => void
  onNext: (e: React.MouseEvent<HTMLButtonElement>) => void
  onPlayPause: (e: React.MouseEvent<HTMLButtonElement>, arg: boolean) => void
  radioIndex: number
}

export const AudioControls: React.FC<Props> = ({
  isPlaying,
  onPlayPause,
  onPrev,
  onNext
}) => {
  return (
    <div className="controls">
      <button
        type="button"
        className="controls__prev button"
        aria-label="Previous"
        onClick={onPrev}>
        <Prev />
      </button>
      {isPlaying ? (
        <button
          type="button"
          className="controls__button button"
          onClick={e => onPlayPause(e, false)}
          aria-label="Pause">
          <Pause />
        </button>
      ) : (
        <button
          type="button"
          className="controls__button button"
          onClick={e => onPlayPause(e, true)}
          aria-label="Play">
          <Play />
        </button>
      )}
      <button
        type="button"
        className="controls__next button"
        aria-label="Next"
        onClick={onNext}>
        <Next />
      </button>
    </div>
  )
}
