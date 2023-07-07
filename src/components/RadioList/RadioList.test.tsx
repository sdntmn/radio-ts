import { render, screen } from "@testing-library/react"
import { RadioList } from "./RadioList"
import { MouseEvent } from "react"
import { potok } from "data/radioStation"
import { ITrack } from "App"

export interface Props {
  tracks: ITrack[]
}

// Группировка тестов функция describe
describe("RadioList components", () => {
  it("Лист отрисован", () => {
    render(
      <RadioList
        tracks={potok}
        radioIndex={123}
        setRadioIndex={function (
          e: MouseEvent<HTMLElement, globalThis.MouseEvent>,
          arg: number
        ): void {
          throw new Error("Function not implemented.")
        }}
        handleCardDelete={function (
          e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
          arg: string
        ): void {
          throw new Error("Function not implemented.")
        }}
      />
    )
    expect(screen.getByText("Список радиостанций")).toBeInTheDocument()
    expect(screen.getByRole("list")).toBeInTheDocument()
  })

  it("Лист пуст", () => {
    render(
      <RadioList
        tracks={[]}
        radioIndex={0}
        setRadioIndex={function (
          e: MouseEvent<HTMLElement, globalThis.MouseEvent>,
          arg: number
        ): void {
          throw new Error("Function not implemented.")
        }}
        handleCardDelete={function (
          e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
          arg: string
        ): void {
          throw new Error("Function not implemented.")
        }}
      />
    )
    // eslint-disable-next-line testing-library/prefer-presence-queries
    expect(screen.queryByRole("list")).toBeNull()
  })

  it("List snapshot", () => {
    // eslint-disable-next-line testing-library/render-result-naming-convention
    const list = render(
      <RadioList
        tracks={[]}
        radioIndex={0}
        setRadioIndex={function (
          e: MouseEvent<HTMLElement, globalThis.MouseEvent>,
          arg: number
        ): void {
          throw new Error("Function not implemented.")
        }}
        handleCardDelete={function (
          e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
          arg: string
        ): void {
          throw new Error("Function not implemented.")
        }}
      />
    )
    expect(list).toMatchSnapshot()
  })
})
