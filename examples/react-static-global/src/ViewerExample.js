import { useState } from "react";
import { ViewerCanvas } from "react-chemdoodleweb";
import molUrl from "./molecules/benzoic-acid.mol";

const canvasStyles = {
  bonds_width_2D: .6,
  bonds_saturationWidthAbs_2D: 2.6,
  bonds_hashSpacing_2D: 2.5,
  atoms_font_size_2D: 10,
  atoms_font_families_2D: ["Helvetica", "Arial", "sans-serif"],
  atoms_displayTerminalCarbonLabels_2D: true,
}

const moleculeStyles = {
  scaleToAverageBondLength: 14.4
}

function ViewerExample() {
  const [mol, setMol] = useState()

  fetch(molUrl)
    .then(data => data.text())
    .then(setMol)

  return (<ViewerCanvas data={{ mol }} canvasStyles={canvasStyles} moleculeStyles={moleculeStyles} />)
}

export default ViewerExample;