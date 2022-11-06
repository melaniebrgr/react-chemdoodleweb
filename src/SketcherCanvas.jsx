import { useCallback, useEffect, useRef } from "react"

export function SketcherCanvas({ id, width = 100, height = 100, canvasOptions }) {
    const instance = useRef(null)
    
    useEffect(() => {
      instance.current = new ChemDoodle.SketcherCanvas(id, undefined, undefined, canvasOptions);
      console.log(instance.current);
  
      return () => {
        const element = document.getElementById(`${id}_toolbar`);
        element.remove();
      }
    }, []);
  
    const onMove = useCallback((instance) => {
      instance.current.stateManager.setState(instance.current.stateManager.STATE_MOVE);
    });
  
    return (
      <>
        <button onClick={onMove}>move</button>
        <canvas id={id} width={width} height={height} />
      </>
    );
  }