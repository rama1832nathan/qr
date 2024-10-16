// import "./qr.css"

import { useState } from "react"

const Qr = () => {
  const [img,setImg] = useState("");
  const [load,setLoad] = useState(false);
  const [qrData,setQrData] = useState("Lovedaycupball");
  const [qrSize,setQrSize] = useState("150")


  async function generate(){
    setLoad(true);
    try{
        const url = `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(qrData)}`
        setImg(url);
    }catch(err){
      console.log(err);
    }
    finally{
      setLoad(false);
    }
  }
  function download(){
    fetch(img).then((res)=>res.blob())
    .then((blob)=>{
      const link = document.createElement("a");
      link.href=URL.createObjectURL(blob);
      link.download="qrcode.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    })
  }

  return (
    <div className="container">
      <h2>QR CODE GENERATOR</h2>
      {load && <p>please wait...</p>}
      {img &&<img src={img} alt="" className="img"/>}
      <div>

        <label htmlFor="dataInput" className="input">
          Data for qr code:
        </label>
        <input type="text" id="dataInput" placeholder="Enter data" 
        onChange={(e)=>setQrData(e.target.value)}/>


        <label htmlFor="sizeInput" className="input">
          Enter the size:
        </label>
        <input type="text" id="sizeInput" placeholder="Enter image size"
        onChange={(e)=>setQrSize(e.target.value)} />

        <button className="generate-btn" disabled={load} onClick={generate}>Generate Qr</button>
        <button className="download-btn" onClick={download}>Download Qr</button>
      </div>
    
    </div>
  )
}
export default Qr
