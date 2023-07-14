export function ItemPhoto({ url, id, del }: Incoming) {

  const remove = () => del(id)
  
  return (
    <div className="widget-item">
      <img className="image_content" src={url} alt="цветок" />
      <div className="circle" id={`${id}`} onClick={remove}>&times;</div>
    </div>
  )
}

type Incoming = {
  url: string,
  id: number,
  del: (id: number) => void
}