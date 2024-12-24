import React from 'react'
import { getContrastingColor } from '../config/helpers'
import { useSnapshot } from 'valtio'
import state from '../store'

const CustomButton = ({title,type,customStyles,HandleClick}) => {
   const snap = useSnapshot(state)
    const generateStyle = (type)=>{
      if(type === 'filled'){
        return{
            backgroundColor: snap.color ,
            color: getContrastingColor(snap.color)
        }
      }    else if(type ==='outline'){
          return {
            borderWidth: "1px",
            borderColor: snap.color,
            color : snap.color
          }
      }
    }
  return (
   <button className={`px-2 py-1.5 rounded-md flex-1 ${customStyles}`}
   style={generateStyle(type)}
   onClick={HandleClick}>
     {title}
   </button>
  )
}

export default CustomButton