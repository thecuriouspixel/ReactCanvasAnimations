import { useRef, useEffect } from 'react'

function resizeCanvas(canvas) {
  const { width, height } = canvas.getBoundingClientRect()
  
  if (canvas.width !== width || canvas.height !== height) {
    const { devicePixelRatio:ratio=1 } = window
    const context = canvas.getContext('2d')
    canvas.width = width*ratio
    canvas.height = height*ratio
    context.scale(ratio, ratio)
    return true
  }
  
  return false
}

const useCanvas = (draw) => {
  
  const canvasRef = useRef(null)
  
  
  useEffect(() => {
    
    const canvas = canvasRef.current
    const context = canvas.getContext('2d') // could support other modes
    let frameCount = 0 // need to add a way to pass when to stop animating
    let animationId
    
    const renderCanvas = () => {
      frameCount++
      draw(context, frameCount)
      animationId = window.requestAnimationFrame(renderCanvas)
    }
    renderCanvas()
    
    return () => {
      window.cancelAnimationFrame(animationId)
    }
  }, [draw])
  
  return canvasRef
}

export default useCanvas