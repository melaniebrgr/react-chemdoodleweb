import { useEffect } from "react"

export function ViewerCanvas({ data, canvasStyles, moleculeStyles }) {
  useEffect(() => {
    // Setup canvas
    const viewerCanvas = new ChemDoodle.ViewerCanvas('viewerCanvas');
    
    viewerCanvas.styles = {
      ...viewerCanvas.styles,
      ...canvasStyles
    };

    // Setup molecule
    const molecule = ChemDoodle.readMOL(data.mol);

    for (const key in moleculeStyles) {
      molecule[key](moleculeStyles[key])
    }
    
    // Load molecule in canvas
    viewerCanvas.loadMolecule(molecule);
  }, [data, canvasStyles, moleculeStyles]);

  return (<canvas id="viewerCanvas" width={100} height={100} />)
}
