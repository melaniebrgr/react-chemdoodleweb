import { SketcherCanvas } from 'react-chemdoodle'

const canvasOptions = {
  includeToolbar: true,
  oneMolecule: true
}

function SketcherCanvasExample() {
  return <SketcherCanvas id="sketcher-canvas" canvasOptions={canvasOptions} />
}

export default SketcherCanvasExample
