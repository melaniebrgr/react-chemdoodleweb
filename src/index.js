import { useEffect } from "react"

export function ViewerCanvas({ styles, mol }) {
  useEffect(() => {
    
    const viewerCanvas = new ChemDoodle.ViewerCanvas('viewerCanvas', 100, 100);
    
    viewerCanvas.styles = {
      ...viewerCanvas.styles,
      ...styles
    };

    const molecule = ChemDoodle.readMOL(mol);

    molecule.scaleToAverageBondLength(14.4);
    
    viewerCanvas.loadMolecule(molecule);
  }, [styles, mol]);

  return (<canvas id="viewerCanvas" />)
}
