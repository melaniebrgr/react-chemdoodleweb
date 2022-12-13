import { useEffect, useRef, memo } from "react"
import { Toolbar } from "./Toolbar"

export const SketcherCanvas = memo(({ id, width = 100, height = 100, canvasOptions }) => {
  const sketcherInstance = useRef(null)
  
  useEffect(() => {
    sketcherInstance.current = new ChemDoodle.SketcherCanvas(id, undefined, undefined, canvasOptions);
    sketcherInstance.current.toolbarManager.setup()
  }, []);

  return (
    <>
      {/* <Toolbar instance={sketcherInstance} /> */}
      <canvas id={id} width={width} height={height} />
    </>
  );
})