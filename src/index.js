import { useEffect } from "react"

export function ViewerCanvas({ data, canvasStyle, moleculeStyle }) {
  useEffect(() => {
    // Setup canvas
    const viewerCanvas = new ChemDoodle.ViewerCanvas('viewerCanvas');
    
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

  return (<canvas id="viewerCanvas" width={100} height={100} />)
}
