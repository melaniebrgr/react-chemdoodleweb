import { useCallback, useEffect, useRef } from "react"
const { uis: { actions, gui: { imageDepot } } } = ChemDoodle;

const onMove = (sketcher) => {
    // ChemDoodleWeb-uis-unpacked.js > ToolbarManager > buttonMove
    sketcher.stateManager.setState(sketcher.stateManager.STATE_MOVE);
}

const onClear = (sketcher) => {
    // ChemDoodleWeb-uis-unpacked.js > ToolbarManager > buttonClear
    let clear = true;
    if (sketcher.oneMolecule) {
        if (sketcher.molecules[0].atoms.length === 1) {
            let a = sketcher.molecules[0].atoms[0];
            if (a.label === 'C' && a.charge === 0 && a.mass === -1) {
                clear = false;
            }
        }
    } else {
        if (sketcher.molecules.length === 0 && sketcher.shapes.length === 0) {
            clear = false;
        }
    }
    if (clear) {
        sketcher.stateManager.getCurrentState().clearHover();
        if (sketcher.lasso && sketcher.lasso.isActive()) {
            sketcher.lasso.empty();
        }
        sketcher.historyManager.pushUndo(new actions.ClearAction(sketcher));
    }
}

const onErase = (sketcher) => {
    // ChemDoodleWeb-uis-unpacked.js > ToolbarManager > buttonMove
    sketcher.stateManager.setState(sketcher.stateManager.STATE_ERASE);
}

export function SketcherCanvas({ id, width = 100, height = 100, canvasOptions }) {
    const instance = useRef(null)
    
    useEffect(() => {
      instance.current = new ChemDoodle.SketcherCanvas(id, undefined, undefined, canvasOptions);
      console.log(instance.current);
  
      return () => {
        const element = document.getElementById(`${id}_toolbar`);
        element.remove();
      }
    }, []);
  
    const handleMove = useCallback(() => onMove(instance.current));
    const handleClear = useCallback(() => onClear(instance.current));
    const handleErase = useCallback(() => onErase(instance.current));
  
    return (
      <>
        <button onClick={handleMove}>
            <img src={imageDepot.getURI(imageDepot.MOVE)} alt="move" width={20} height={20} />
        </button>
        <button onClick={handleClear}>clear</button>
        <button onClick={handleErase}>erase</button>
        <canvas id={id} width={width} height={height} />
      </>
    );
  }