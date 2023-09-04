import React, {useState} from 'react';
import Draggable from "react-draggable";
import { Resizable } from "react-resizable";


const TextOverlay = ({text,position, onDrag, onResize}) => {
   
    const [editableText, setEditableText] = useState(text);
    const [isEditing, setIsEditing] = useState(false);
  
    
  
    const handleTextDoubleClick = () => {
      setIsEditing(true);
    };
  
    const handleTextBlur = () => {
      setIsEditing(false);
    };
  
    const handleTextChange = (e) => {
      setEditableText(e.target.value);
    };
    const fontSize=3;
  
    return (
        <Draggable defaultPosition={position} >
      <div
        style={{
          position: 'absolute',
          top: `${position.y}px`,
          left: `${position.x}px`,
          border: '1px solid #000',
          boxSizing: 'content-box',
          fontSize: `${fontSize}rem`,
        }}
      >
        {isEditing ? (
          <input
           style={{
                fontSize: '3rem', 
              }}
            type="text"
            value={editableText}
            onChange={handleTextChange}
            onBlur={handleTextBlur}
            autoFocus
          />
        ) : (
          <div onDoubleClick={handleTextDoubleClick}>{editableText}</div>
        )}
      </div>
    </Draggable>
    );
}

export default TextOverlay
