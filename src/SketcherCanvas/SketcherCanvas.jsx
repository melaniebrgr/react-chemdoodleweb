import { useEffect, useRef, memo } from "react"
import { Toolbar } from "./Toolbar"

export const SketcherCanvas = memo(({ id, width = 100, height = 100, canvasOptions }) => {
  const sketcherInstance = useRef(null)
  
  useEffect(() => {
    sketcherInstance.current = new ChemDoodle.SketcherCanvas(id, undefined, undefined, canvasOptions);

    // return () => {
    //   const element = document.getElementById(`${id}_toolbar`);
    //   element.remove();
    // }
  }, []);

  return (
    <>
      {/* <Toolbar instance={sketcherInstance} /> */}
      <canvas id={id} width={width} height={height} />
    </>
  );
})