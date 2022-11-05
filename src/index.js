import { useCallback, useEffect, useRef } from "react"

export function ViewerCanvas({ id, data, style, width = 100, height = 100, canvasStyle, moleculeStyle }) {
  useEffect(() => {
    // Setup canvas
    const viewerCanvas = new ChemDoodle.ViewerCanvas(id);
    viewerCanvas.styles = {
      ...viewerCanvas.styles,
      ...canvasStyle
    };

    // Setup molecule
    const molecule = ChemDoodle.readMOL(data.mol);
    for (const key in moleculeStyle) {
      molecule[key](moleculeStyle[key])
    }
    
    // Load molecule in canvas
    viewerCanvas.loadMolecule(molecule);
  }, [data, canvasStyle, moleculeStyle]);

  return (<canvas id={id} style={style} width={width} height={height} />)
}

export function SketcherCanvas({ id, width = 100, height = 100, canvasOptions }) {
  const instance = useRef(null)
  
  useEffect(() => {
    const sketcher = new ChemDoodle.SketcherCanvas(id, undefined, undefined, canvasOptions);
    instance.current = sketcher;
    console.log(instance.current);

    return () => {
      const element = document.getElementById(`${id}_toolbar`);
      element.remove();
    }
  }, []);

  const onMove = useCallback(() => {
    instance.current.stateManager.setState(instance.current.stateManager.STATE_MOVE);
  });

  return (
    <>
      <button onClick={onMove}>move</button>
      <canvas id={id} width={width} height={height} />
    </>
  );
}