import { nanoid } from "nanoid";
import { ItemPhoto } from "./ItemPhoto";

export function Widjet({ listURL, del }: Incoming) {
  
  
  return (
    <div className="widget-image">
      {listURL.map((url, index) => <ItemPhoto url={url} id={index} key={nanoid()} del={del} />)}
    </div>
  )
}

type Incoming = {
  listURL: string[],
  del: (id: number) => void
}
