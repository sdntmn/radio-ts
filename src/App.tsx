import "./index.css"
import { potok } from "./data/potok"
import { Main } from "./page/Main"

export interface ITrack {
  id: string
  like?: boolean
  name: string
  url: string
  img: string
  index?: number
}

export interface Props {
  tracks: ITrack[]
}

export const App: React.FC<Props> = () => {
  return (
    <div className="content">
      <Main tracks={potok} />
    </div>
  )
}
