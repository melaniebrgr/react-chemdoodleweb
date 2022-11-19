import { useCallback, memo } from "react"
const { structures, uis: { actions, gui: { imageDepot } } } = ChemDoodle;

const onMove = (sketcher) => {
    sketcher.stateManager.setState(sketcher.stateManager.STATE_MOVE);
}

const onClear = (sketcher) => {
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
    sketcher.stateManager.setState(sketcher.stateManager.STATE_ERASE);
}

const onSingleBond = (sketcher) => {
    sketcher.stateManager.setState(sketcher.stateManager.STATE_NEW_BOND);
    sketcher.stateManager.STATE_NEW_BOND.bondOrder = 1;
    sketcher.stateManager.STATE_NEW_BOND.stereo = structures.Bond.STEREO_NONE;
}

const onRecessedBond = (sketcher) => {
  sketcher.stateManager.setState(sketcher.stateManager.STATE_NEW_BOND);
  sketcher.stateManager.STATE_NEW_BOND.bondOrder = 1;
  sketcher.stateManager.STATE_NEW_BOND.stereo = structures.Bond.STEREO_RECESSED;
}

const onProtrudingBond = (sketcher) => {
  sketcher.stateManager.setState(sketcher.stateManager.STATE_NEW_BOND);
  sketcher.stateManager.STATE_NEW_BOND.bondOrder = 1;
  sketcher.stateManager.STATE_NEW_BOND.stereo = structures.Bond.STEREO_PROTRUDING;
}

const onDoubleBond = (sketcher) => {
  sketcher.stateManager.setState(sketcher.stateManager.STATE_NEW_BOND);
  sketcher.stateManager.STATE_NEW_BOND.bondOrder = 2;
  sketcher.stateManager.STATE_NEW_BOND.stereo = structures.Bond.STEREO_NONE;
};

const onZeroBond = (sketcher) => {
  sketcher.stateManager.setState(sketcher.stateManager.STATE_NEW_BOND);
  sketcher.stateManager.STATE_NEW_BOND.bondOrder = 0;
  sketcher.stateManager.STATE_NEW_BOND.stereo = structures.Bond.STEREO_NONE;
}

const covalentBond = (sketcher) => {
  sketcher.stateManager.setState(sketcher.stateManager.STATE_NEW_BOND);
  sketcher.stateManager.STATE_NEW_BOND.bondOrder = 0;
  sketcher.stateManager.STATE_NEW_BOND.stereo = structures.Bond.STEREO_PROTRUDING;
}

const halfBond = (sketcher) => {
    sketcher.stateManager.setState(sketcher.stateManager.STATE_NEW_BOND);
    sketcher.stateManager.STATE_NEW_BOND.bondOrder = 0.5;
    sketcher.stateManager.STATE_NEW_BOND.stereo = structures.Bond.STEREO_NONE;
};

const wavyBond = (sketcher) => {
    sketcher.stateManager.setState(sketcher.stateManager.STATE_NEW_BOND);
    sketcher.stateManager.STATE_NEW_BOND.bondOrder = 1;
    sketcher.stateManager.STATE_NEW_BOND.stereo = structures.Bond.STEREO_AMBIGUOUS;
};

const resonanceBond = (sketcher) => {
   sketcher.stateManager.setState(sketcher.stateManager.STATE_NEW_BOND);
   sketcher.stateManager.STATE_NEW_BOND.bondOrder = 1.5;
   sketcher.stateManager.STATE_NEW_BOND.stereo = structures.Bond.STEREO_NONE;
};

const doubleAmbiguousBond = (sketcher) => {
    sketcher.stateManager.setState(sketcher.stateManager.STATE_NEW_BOND);
    sketcher.stateManager.STATE_NEW_BOND.bondOrder = 2;
    sketcher.stateManager.STATE_NEW_BOND.stereo = structures.Bond.STEREO_AMBIGUOUS;
};

const tripleBond = (sketcher) => {
    sketcher.stateManager.setState(sketcher.stateManager.STATE_NEW_BOND);
    sketcher.stateManager.STATE_NEW_BOND.bondOrder = 3;
    sketcher.stateManager.STATE_NEW_BOND.stereo = structures.Bond.STEREO_NONE;
};


const onCyclohexaneRing = (sketcher) => {
  sketcher.stateManager.setState(sketcher.stateManager.STATE_NEW_RING);
  sketcher.stateManager.STATE_NEW_RING.numSides = 6;
  sketcher.stateManager.STATE_NEW_RING.unsaturated = false;
};

const onBenzeneRing = (sketcher) => {
  sketcher.stateManager.setState(sketcher.stateManager.STATE_NEW_RING);
  sketcher.stateManager.STATE_NEW_RING.numSides = 6;
  sketcher.stateManager.STATE_NEW_RING.unsaturated = true;
};

const onCyclopropaneRing = (sketcher) => {
  sketcher.stateManager.setState(sketcher.stateManager.STATE_NEW_RING);
  sketcher.stateManager.STATE_NEW_RING.numSides = 3;
  sketcher.stateManager.STATE_NEW_RING.unsaturated = false;
};

const onCyclobutaneRing = (sketcher) => {
  sketcher.stateManager.setState(sketcher.stateManager.STATE_NEW_RING);
  sketcher.stateManager.STATE_NEW_RING.numSides = 4;
  sketcher.stateManager.STATE_NEW_RING.unsaturated = false;
};

const onCyclopentaneRing = (sketcher) => {
  sketcher.stateManager.setState(sketcher.stateManager.STATE_NEW_RING);
  sketcher.stateManager.STATE_NEW_RING.numSides = 5;
  sketcher.stateManager.STATE_NEW_RING.unsaturated = false;
};

const onCycloheptaneRing = (sketcher) => {
  sketcher.stateManager.setState(sketcher.stateManager.STATE_NEW_RING);
  sketcher.stateManager.STATE_NEW_RING.numSides = 7;
  sketcher.stateManager.STATE_NEW_RING.unsaturated = false;
}

const onCyclooctaneRing = (sketcher) => {
  sketcher.stateManager.setState(sketcher.stateManager.STATE_NEW_RING);
  sketcher.stateManager.STATE_NEW_RING.numSides = 8;
  sketcher.stateManager.STATE_NEW_RING.unsaturated = false;
};

const onArbitraryRing = (sketcher) => {
  sketcher.stateManager.setState(sketcher.stateManager.STATE_NEW_RING);
  sketcher.stateManager.STATE_NEW_RING.numSides = -1;
  sketcher.stateManager.STATE_NEW_RING.unsaturated = false;
};

export const Toolbar = ({ sketcher }) => {
  const handleMove = useCallback(() => onMove(sketcher));
  const handleClear = useCallback(() => onClear(sketcher));
  const handleErase = useCallback(() => onErase(sketcher));
  const handleSingleBond = useCallback(() => onSingleBond(sketcher));
  const handleRecessedBond = useCallback(() => onRecessedBond(sketcher));
  const handleProtrudingBond = useCallback(() => onProtrudingBond(sketcher));
  const handleDoubleBond = useCallback(() => onDoubleBond(sketcher));
  const handleZeroBond = useCallback(() => onZeroBond(sketcher));
  const handleCovalentBond = useCallback(() => covalentBond(sketcher));
  const handleHalfBond = useCallback(() => halfBond(sketcher));
  const handleWavyBond = useCallback(() => wavyBond(sketcher));
  const handleResonanceBond = useCallback(() => resonanceBond(sketcher));
  const handleDoubleAmbiguousBond = useCallback(() => doubleAmbiguousBond(sketcher));
  const handleTripleBond = useCallback(() => tripleBond(sketcher));
  const handleCyclohexaneRing = useCallback(() => onCyclohexaneRing(sketcher));
  const handleBenzeneRing = useCallback(() => onBenzeneRing(sketcher));
  const handleCyclopropaneRing = useCallback(() => onCyclopropaneRing(sketcher));
  const handleCyclobutaneRing = useCallback(() => onCyclobutaneRing(sketcher));
  const handleCyclopentaneRing = useCallback(() => onCyclopentaneRing(sketcher));
  const handleCycloheptaneRing = useCallback(() => onCycloheptaneRing(sketcher));
  const handleCyclooctaneRing = useCallback(() => onCyclooctaneRing(sketcher));
  const handleArbitraryRing = useCallback(() => onArbitraryRing(sketcher));
console.log(sketcher);
  return (
    <div>
      <div>
        <button onClick={handleMove}>move</button>
        <button onClick={handleClear}>clear</button>
        <button onClick={handleErase}>erase</button>
      </div>
      <div>
        <button onClick={handleSingleBond}>single bond</button>
        <button onClick={handleRecessedBond}>recessed bond</button>
        <button onClick={handleProtrudingBond}>protruding bond</button>
        <button onClick={handleDoubleBond}>double bond</button>
        <button onClick={handleZeroBond}>zero bond</button>
        <button onClick={handleCovalentBond}>covalent bond</button>
        <button onClick={handleHalfBond}>half bond</button>
        <button onClick={handleWavyBond}>wavy bond</button>
        <button onClick={handleResonanceBond}>wavy bond</button>
        <button onClick={handleDoubleAmbiguousBond}>double ambiguous bond</button>
        <button onClick={handleTripleBond}>triple bond</button>
      </div>
      <div>
        <button onClick={handleCyclohexaneRing}>cyclohexane ring</button>
        <button onClick={handleBenzeneRing}>benzene ring</button>
        <button onClick={handleCyclopropaneRing}>cyclopropane ring</button>
        <button onClick={handleCyclobutaneRing}>cyclobutane ring</button>
        <button onClick={handleCyclopentaneRing}>cyclopentane ring</button>
        <button onClick={handleCycloheptaneRing}>cycloheptane ring</button>
        <button onClick={handleCyclooctaneRing}>cyclooctane ring</button>
        <button onClick={handleArbitraryRing}>arbitrary ring</button>
      </div>
    </div>
  );
};