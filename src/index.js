/* eslint-disable no-undef */

import { useEffect } from "react"

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
  }, [canvasStyle, data, id, moleculeStyle]);

  return (<canvas id={id} style={style} width={width} height={height} />)
}
