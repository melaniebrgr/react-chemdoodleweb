import { ViewerCanvas } from "react-chemdoodleweb";

const styles = {
  bonds_width_2D: .6,
  bonds_saturationWidthAbs_2D: 2.6,
  bonds_hashSpacing_2D: 2.5,
  atoms_font_size_2D: 10,
  atoms_font_families_2D: ["Helvetica", "Arial", "sans-serif"],
  atoms_displayTerminalCarbonLabels_2D: true,
}

function ViewerExample() {
    return (<ViewerCanvas styles={styles} />)
}

export default ViewerExample;