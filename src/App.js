import './App.css';
import axios from "axios";


import React, { useState,useEffect } from 'react'
import TextOverlay from './components/TextOverlay/TextOverlay';

const App = () => {
  const [imageUrl, setImageUrl] = useState('');
  useEffect(()=>{
    const fetchRandomImages= async ()=>{
      try {
        const response=await axios.get("https://api.unsplash.com/photos/random/?client_id=wuVH072bJSHESgb9apsPQnMNie2y3V3Irzs-bd38knM",{
          headers:{
            Authorization:"wuVH072bJSHESgb9apsPQnMNie2y3V3Irzs-bd38knM"
          }
        })
        console.log(response.data.urls.regular);
      
        setImageUrl(response.data.urls.regular);
      } catch (error) {
        
          console.error("Error in fetching data: " + error);
        
      }
    }
    if (!imageUrl) {
      fetchRandomImages();
    }
  },[imageUrl])

  const [textOverlays, setTextOverlays] = useState([]);
  const [customText,setCustomText]=useState("");

  const addTextOverlay=()=>{
    if(customText){
      setTextOverlays([
        ...textOverlays,
        {
          text: customText,
          position: { x: 100, y: 100 },
        }
      ]);
      setCustomText("");
    }
  }
  return (
    <div>
    <div>
      <img className='random-bg' src={imageUrl} alt='unsplash-random-image' />
    </div>

    <div className='overlay'>
      <input
        className='input'
        type='text'
        value={customText}
        onChange={(e) => setCustomText(e.target.value)}
      />
      <button onClick={addTextOverlay} className='btn'>Add Text</button>
    </div>

    {textOverlays.map((overlay, index) => (
      <TextOverlay
        key={index}
        text={overlay.text}
        position={overlay.position}
        onDrag={(e, data) => {
          // Update the position when dragged
          const updatedOverlays = [...textOverlays];
          updatedOverlays[index].position = { x: data.x, y: data.y };
          setTextOverlays(updatedOverlays);
        }}
        onResize={(size) => {
          // Handle resizing if needed
          // You can access the width and height of the resized overlay via the 'size' parameter
          console.log(`Resized to width: ${size.width}, height: ${size.height}`);
        }}
      />
    ))}
  </div>
  )
}

export default App



