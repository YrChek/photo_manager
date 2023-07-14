/* eslint-disable @typescript-eslint/no-misused-promises */
import { useState } from "react";
import { Widjet } from "../Widjet/Widjet";

export function Starting() {

  const [listURL, setListUrl] = useState<string[]>([])
  
  const fileToDataUrl = (file: File) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
    
      fileReader.addEventListener('load', evt => {
        resolve(evt.target?.result); // на currentTarget TS ругается: Свойство "result" не существует в типе "EventTarget". 
      });
      
      fileReader.addEventListener('error', evt => {
        reject(new Error(evt.target?.error as unknown as string)); // Свойство "error" не существует в типе "EventTarget"
      });
      
      fileReader.readAsDataURL(file);
    });
  }
  
  const handleSelect = async (evt: React.ChangeEvent<HTMLInputElement>) => {
    const file = evt.target.files && evt.target.files[0];
    if(!file) return;


    const files = [...evt.target.files as FileList];
    const urls = await Promise.all(files.map(obj => fileToDataUrl(obj))) as unknown as string;

    setListUrl([...listURL, ...urls]);
  }

  const handdlerDelete = (id: number) => {
    setListUrl(listURL.filter((_, index) => index !== id))

  }

  return (
    <div className="container">
      <div className="file-container">
        {/*С этой ошибкой так и не разобрася. "Promise-returning function provided to attribute where a void return was expected." */}
        <input type="file" multiple accept="image/*" className="selectionFile" onChange={handleSelect} />
        <div className="overlap"><span>Click to select</span></div>
      </div>
      <Widjet listURL={listURL} del={handdlerDelete}/>
    </div>
  )
}
