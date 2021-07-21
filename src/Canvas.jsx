import React from 'react'
import useCanvas from './CanvasHook.jsx'
import bkndImage from '../public/logo.png'; 

const Canvas = props => {  
  
  const { draw, ...rest } = props
  const canvasRef = useCanvas(draw)
  
  return <canvas ref={canvasRef} {...rest}/>
}

export default Canvas