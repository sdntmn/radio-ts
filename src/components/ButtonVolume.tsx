import React from "react"

export interface Props {
  id: string
  audioLabel: string
  textButton: string
  onMouseClickDown: (arg: string) => void
  onMouseClickUp: () => void
  className: string
}

export const ButtonVolume: React.FC<Props> = ({
  id,
  audioLabel,
  textButton,
  onMouseClickDown,
  onMouseClickUp,
  className
}) => {
  function handleClick() {
    onMouseClickDown(id)
  }
  return (
    <button
      id={id}
      className={className}
      aria-label={audioLabel}
      type="button"
      onMouseDown={handleClick}
      onMouseUp={onMouseClickUp}></button>
  )
}

export default ButtonVolume
