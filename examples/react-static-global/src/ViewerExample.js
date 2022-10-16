import { useState } from "react";
import { ViewerCanvas } from "react-chemdoodleweb";
import moleculeUrl from "./molecules/benzoic-acid.mol";

const useMolecule = (moleculeUrl) => {
  const [molecule, setMolecule] = useState()

  fetch(moleculeUrl)
    .then(data => data.text())
    .then(setMolecule)

  return molecule
}

const styles = {
  bonds_width_2D: .6,
  bonds_saturationWidthAbs_2D: 2.6,
  bonds_hashSpacing_2D: 2.5,
  atoms_font_size_2D: 10,
  atoms_font_families_2D: ["Helvetica", "Arial", "sans-serif"],
  atoms_displayTerminalCarbonLabels_2D: true,
}

function ViewerExample() {
  const mol = useMolecule(moleculeUrl)

  return (<ViewerCanvas styles={styles} mol={mol} />)
}

export default ViewerExample;