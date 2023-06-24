import React, { useState, useEffect, useMemo } from "react"
import { ITrack } from "../App"
import { EProperty } from "../constants/enums"
import { LocalStorage } from "../helpers/LocalStorage"
import Header from "../components/Header"
import { RadioList } from "../components/RadioList"
import { Footer } from "../components/Footer"
import { Favorites } from "../components/Favorites"
import { AudioControls } from "../components/AudioControls"
import VolumeRange from "../components/VolumeRange"
import { CurrentCardStation } from "components/CurrentCardStation"

export interface Props {
  tracks: ITrack[]
}
export const Main: React.FC<Props> = ({ tracks }) => {
  //Список избранного. Первоначальное получение данных из localStorage
  let listSaveInLocalStorage =
    LocalStorage.getLocal<string[]>(EProperty.listSave) || null
  const [isLastRadioStation, setIsLastRadioStation] = useState(
    LocalStorage.getLocal(EProperty.lastStation) || []
  )
  const [radioIndex, setRadioIndex] = useState(0)
  const { name, img, url, id } = tracks[radioIndex]
  const [listRadioStation, setListRadioStation] = useState<ITrack[]>([])
  const [listFavoriteRadioStation, setlistFavoriteRadioStation] = useState<
    ITrack[]
  >([])
  const [listIdInLocalStorage, setListIdInLocalStorage] = useState<
    string[] | null
  >(listSaveInLocalStorage)

  const [isPlaying, setIsPlaying] = useState<boolean>(false)

  // localStorage
  //===================================================================
  //Список избранного. Отслеживание изменения и получения данных из localStorage
  useEffect(() => {
    if (listIdInLocalStorage !== null) {
      if (listIdInLocalStorage.length) {
        LocalStorage.setLocal(EProperty.listSave, listIdInLocalStorage)
      }
    }
    if (listIdInLocalStorage === null) {
      LocalStorage.delLocal(EProperty.listSave)
    }
  }, [listIdInLocalStorage, listIdInLocalStorage?.length])

  // Сохранение в state

  // useEffect(() => {
  //   LocalStorage.setLocal(EProperty.lastStation, JSON.stringify(radioIndex))
  // }, [radioIndex])

  // useEffect(() => {
  //   setIsLastRadioStation(LocalStorage.getLocal(EProperty.lastStation) || [])
  // }, [])

  // =================================================================

  const audioElement: HTMLAudioElement = useMemo(() => new Audio(url), [url])
  audioElement.preload = "auto"
  const valueStep = (audioElement.volume = 0.3) // шаг громкости
  // audioElement.value = 0.5 // первоначальная громкость

  // Свойство указывает состояние готовности носителя.
  // Можно использовать как preloader !!!
  const readyToPlay = audioElement.readyState

  useEffect(() => {
    audioElement.load()
  }, [audioElement, readyToPlay])

  // Весь список радиостанций
  useEffect(() => {
    if (listRadioStation.length < 1) {
      setListRadioStation(
        tracks.map((item, i) => Object.assign(item, { index: i }))
      )
    }
  }, [listRadioStation.length, radioIndex, tracks])

  // ================================================================
  // Получение данных сохраненного радио
  // Для отображения в избранном
  const addCardInFavorite = (tracksId: string) => {
    addIdInLocalStorage(tracksId)
    const track = tracks?.find(i => i.id === tracksId)
    if (track) {
      track.like = true
      const newTrack = [...listFavoriteRadioStation, track]

      return setlistFavoriteRadioStation(newTrack)
    }
    return
  }

  const addIdInLocalStorage = (tracksId: string) => {
    if (listIdInLocalStorage === null) {
      return setListIdInLocalStorage([tracksId])
    } else {
      const track = listIdInLocalStorage?.find(i => i !== tracksId)
      if (track) {
        return setListIdInLocalStorage([...listIdInLocalStorage, tracksId])
      }
    }

    return
  }

  // Удаление из избранного и списка id сохраняемого в localStorage
  const deleteCardFavorite = (
    e: React.MouseEvent<HTMLButtonElement>,
    tracksId: string
  ): void => {
    deleteIdLocalStorage(e, tracksId)
    e.stopPropagation()

    const track = listFavoriteRadioStation.filter(i => i.id !== tracksId)
    const trackDel = tracks?.find(i => i.id === tracksId)
    if (trackDel && trackDel?.like === true) {
      trackDel.like = false
    }
    if (track?.length) {
      setlistFavoriteRadioStation(track)
    } else {
      setlistFavoriteRadioStation([])
    }
  }

  const deleteIdLocalStorage = (
    e: React.MouseEvent<HTMLButtonElement>,
    tracksId: string
  ): void => {
    e.stopPropagation()
    const tracksIdFavorite = listIdInLocalStorage?.filter(i => i !== tracksId)
    if (tracksIdFavorite?.length) {
      return setListIdInLocalStorage(tracksIdFavorite)
    } else {
      return setListIdInLocalStorage(null)
    }
  }

  // Для первоначальной загрузки и обработки данных из localStorage
  useEffect(() => {
    if (listIdInLocalStorage) {
      const lengthDataListFavorite = Object?.keys(
        listFavoriteRadioStation
      )?.length
      if (listIdInLocalStorage.length !== lengthDataListFavorite) {
        for (let i = 0; i < listIdInLocalStorage.length; i++) {
          for (let elem of tracks) {
            if (elem.id === listIdInLocalStorage[i]) {
              listFavoriteRadioStation.push(elem)
              elem.like = true
            }
          }
        }
      }
    }
  }, [
    listFavoriteRadioStation,
    listFavoriteRadioStation.length,
    listIdInLocalStorage,
    tracks
  ])

  // отслеживание клика пролистывания нажатия вперед, назад
  function toPrevTrack(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation()
    if (radioIndex - 1 < 0) {
      setRadioIndex(tracks.length - 1)
    } else {
      setRadioIndex(radioIndex - 1)
    }
  }

  const toNextTrack = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    if (radioIndex < tracks.length - 1) {
      setRadioIndex(radioIndex + 1)
    } else {
      setRadioIndex(0)
    }
  }

  // play или pause
  const hendelPlayOrPause = (
    e: React.MouseEvent<HTMLButtonElement>,
    arg: boolean
  ) => {
    e.stopPropagation()
    setIsPlaying(arg)
    if (audioElement.paused && arg) {
      audioElement.play()
    }
    if (!audioElement.paused && !arg) {
      audioElement.pause()
    }
  }

  useEffect(() => {
    return () => {
      audioElement.pause()
    }
  }, [audioElement, url])

  useEffect(() => {
    if (isPlaying) {
      audioElement.autoplay = isPlaying
    } else {
      audioElement.autoplay = !isPlaying
    }
  }, [isPlaying, audioElement])

  return (
    <div className="page">
      <Header />
      <div className="main">
        <VolumeRange audioElement={audioElement} />
        <CurrentCardStation
          radioIndex={radioIndex}
          name={name}
          img={img}
          tracksId={id}
          listFavorites={listIdInLocalStorage}
          addCardInFavorite={addCardInFavorite}
          handleCardDelete={deleteCardFavorite}
          isPlaying={isPlaying}
          onPrev={toPrevTrack}
          onNext={toNextTrack}
          onPlayPause={hendelPlayOrPause}
        />
      </div>
      <RadioList
        tracks={tracks}
        setRadioIndex={setRadioIndex}
        handleCardDelete={deleteCardFavorite}
      />
      <Favorites
        tracks={listFavoriteRadioStation}
        setRadioIndex={setRadioIndex}
        handleCardDelete={deleteCardFavorite}
      />
      <Footer />
    </div>
  )
}
