import React, { useState, useEffect } from "react"
//import InputRange from "./Input";

export interface Props {
  audioElement: HTMLAudioElement
  stepVolume: number
  isLevelVolume: number
  // setIsLevelVolume: () => void
}

export const SliderVolume: React.FC<Props> = ({
  audioElement,
  stepVolume,
  isLevelVolume
  // setIsLevelVolume
}) => {
  const [isLeft, setIsLeft] = useState(0)
  const [isEm, setIsEm] = useState(0)
  // const tick = audioElement.step * 100
  // const min = +audioElement.min * 100 || 0
  // const max = +audioElement.max * 100 || 100

  const inputVolume = (
    <input
      id="range"
      type="range"
      name="range"
      step={stepVolume}
      min={0}
      max={1}
      value={isLevelVolume}
      onChange={() => console.info(222)}
    />
  )

  // расчет положения бегунка
  // useEffect(() => {
  //   const getRangePercent = () => {
  //     // const relativeValue = isLevelVolume - min
  //     // const ticks = max - min
  //     const percent = (relativeValue / ticks) * 100
  //     setIsLeft(Math.round(percent * 100))
  //     setIsEm(Math.floor(percent * 2.2 * 100) / 100) // разобраться 2.2?
  //   }
  //   getRangePercent()
  // }, [isLevelVolume, max, min])

  // выставляем стили нахождения бегунка
  const position = {
    position: "absolute",
    top: 0,
    left: `calc(${isLeft}% - ${isEm}em)`
  }

  // Уровень громкости выводимый в бегунке
  // const levelVolume = Math.round((Math.floor(isLevelVolume * 100) / 100) * 100);

  // const addTicks = () => {
  //   let content = []
  //   for (let t = min; t <= max; t += tick * 10) {
  //     content.push(
  //       <span className="range__tick">
  //         <span className="range__tick-text">{t}</span>
  //       </span>
  //     )
  //   }
  //   return content
  // }

  // const tickStep = addTicks().map((item, index) => (
  //   <span
  //     key={index}
  //     className="range__tick">
  //     <span className="range__tick-text">{item}</span>
  //   </span>
  // ))

  // const onScrub = value => {
  //   audioElement.volume = value
  //   setIsLevelVolume(audioElement.volume)
  // }

  return (
    <div className="rangeSlider">
      <div className="rangeSlider__wrap">
        <div className="range">
          {inputVolume}
          <div className="rangeSlider__ticks"></div>

          <div
            className="rangeSlider__data"
            // style={position}
          ></div>
        </div>
      </div>
    </div>
  )
}
