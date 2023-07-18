import React, { useState, useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlay } from "@fortawesome/free-solid-svg-icons"

export interface Props {
  audioElement: HTMLAudioElement
}

export const VolumeRange: React.FC<Props> = ({ audioElement }) => {
  const stepVolume = 0.01

  const [levelVolume, setLevelVolume] = useState<number>(0.5)
  const [saveLevelVolume, setSaveLevelVolume] = useState<number>(0)

  const [isOnMouseDown, setIsOnMouseDown] = useState<boolean>(false)
  const [idButton, setIdButton] = useState<string>("")
  const [mutedClick, setMutedClick] = useState<boolean>(false)

  const onMouseDown = (id: React.SetStateAction<string>) => {
    setIdButton(id)
    setIsOnMouseDown(true)
  }

  const onMouseUp = () => {
    setIsOnMouseDown(false)
  }

  const setVolumeSound = (level: number) => {
    setLevelVolume(level)
  }

  useEffect(() => {
    audioElement.volume = levelVolume
    if (isOnMouseDown) {
      if (idButton === "decrementButton") {
        if (levelVolume <= stepVolume) {
          setLevelVolume(0)
        } else {
          setTimeout(() => setLevelVolume(audioElement.volume - stepVolume), 50)
        }
      }
      if (idButton === "incrementButton") {
        if (levelVolume < 0.99) {
          if (mutedClick) {
            audioElement.muted = false
          }
          setTimeout(() => setLevelVolume(audioElement.volume + stepVolume), 50)
        } else {
          setLevelVolume(1)
        }
      }
    }
  }, [audioElement, idButton, levelVolume, isOnMouseDown, stepVolume])

  const levelVolumeShow = Math.round(
    (Math.floor(levelVolume * 100) / 100) * 100
  )

  function handleClick(idButton: string) {
    onMouseDown(idButton)
  }

  function handleClickMute() {
    setMutedClick(!mutedClick)

    if (!mutedClick) {
      audioElement.muted = true
      setSaveLevelVolume(levelVolume)
      setLevelVolume(0)
    } else {
      audioElement.muted = false
      audioElement.volume = saveLevelVolume
      setLevelVolume((audioElement.volume = saveLevelVolume))
    }
  }

  function handleClickFullVolume() {
    if (mutedClick) {
      audioElement.muted = false
      setLevelVolume((audioElement.volume = 1))
    } else {
      setLevelVolume((audioElement.volume = 1))
    }
  }

  return (
    <div className="levelVolume">
      <h3 className="levelVolume__title"> Уровень громкости</h3>

      <div className="levelVolume__buttons-wrap">
        <div className="icon">
          <button
            className="levelVolume__button"
            id="incrementButton"
            onMouseDown={() => handleClick("decrementButton")}
            onMouseUp={onMouseUp}>
            <FontAwesomeIcon
              icon={faPlay}
              rotation={180}
            />
          </button>
        </div>

        <div>
          <div className="icon">
            <button
              className="levelVolume__button"
              id="incrementButton"
              onClick={handleClickFullVolume}>
              <FontAwesomeIcon
                icon={faPlay}
                rotation={270}
              />
            </button>
          </div>
          <div
            onClick={handleClickFullVolume}
            className="levelVolume__text-button-wrap">
            <p className="levelVolume__text-button levelVolume__text-button_position-full">
              full
            </p>
          </div>
          <div className="levelVolume__digital-scoreboard-wrap">
            <p className="levelVolume__digital-scoreboard">{levelVolumeShow}</p>
          </div>
          <div
            onClick={handleClickMute}
            className="levelVolume__text-button-wrap">
            <p className="levelVolume__text-button levelVolume__text-button_position-mute">
              mute
            </p>
          </div>
          <div className="icon">
            <button
              className="levelVolume__button"
              id="incrementButton"
              onClick={handleClickMute}>
              <FontAwesomeIcon
                icon={faPlay}
                rotation={90}
              />
            </button>
          </div>
        </div>

        <div className="icon">
          <button
            className="levelVolume__button"
            id="incrementButton"
            onMouseDown={() => handleClick("incrementButton")}
            onMouseUp={onMouseUp}>
            <FontAwesomeIcon icon={faPlay} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default VolumeRange
