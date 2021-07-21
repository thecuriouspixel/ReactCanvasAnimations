import React, {useState, useMemo} from 'react';
import ReactDOM from 'react-dom';
import './app.css';
import bkndImage from '../public/pollinator-background.jpg'; 
import Canvas, {resizeCanvas} from './Canvas.jsx'



function App() {
  
  console.log("App rendering")
  
  const [imageReady, setImageReady] = useState(false);
  
  const pulsatingCircle = (ctx, frameCount) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    ctx.fillStyle = '#FF0000'
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    ctx.fillStyle = '#000000'
    ctx.beginPath()
    ctx.arc(50, 100, 20*Math.sin(frameCount*0.05)**2, 0, 2*Math.PI)
    ctx.fill()
  }
    
  const revealBackgroundInSlices = (ctx, frameCount) => {
    
    const sliceHeight = 83
    const slices = backgroundImage.height/sliceHeight
    const alphaSteps = 10
    
    // canvas is 60 ?
    // multiply by fps
    const adjustedFrameCount = (frameCount/60) * 25
    
    if (adjustedFrameCount <= (slices*alphaSteps)) {
    
      const cW = ctx.canvas.width
      const cH = ctx.canvas.height
      
      ctx.clearRect(0, 0, cW, cH)
      for (let i = 0; i < adjustedFrameCount; i++) { 
        
        const alpha = ((adjustedFrameCount - i) * (1/alphaSteps))
        // use min max instead ?
        ctx.globalAlpha = alpha < 0 ? 0 : alpha > 1 ? 1 : alpha 
        ctx.drawImage(backgroundImage, 0, sliceHeight*i, cW*2, sliceHeight, 0, (sliceHeight/2)*i, cW, (sliceHeight/2)) 
      }
    }
    
  }        
  
  const theCanvas = (imageReady) ? <Canvas draw={revealBackgroundInSlices} width={440} height={880}/> : <div>Not ready</div>
   
 
  const backgroundImage =  useMemo(()=>{
    const image = new Image()
    image.src = bkndImage 
    image.onload = () => {
      console.log("backgroundImage ready")
      setImageReady(true)
    }
    return image
  },[bkndImage])
       
  return theCanvas
}



ReactDOM.render(<App />, document.getElementById('root'));
