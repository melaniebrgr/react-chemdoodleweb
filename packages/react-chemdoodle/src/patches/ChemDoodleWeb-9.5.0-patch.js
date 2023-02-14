/* eslint-disable */

/*
 * ChemDoodleWeb-9.5.0 uses jQuery to create the SketcherCanvas Toolbar.
 * Since its lifecycle is not managed by React, toolbar rendering is
 * out-of-sync with react SketcherCanvas renders and caused errors.
 *
 * However, since ChemDoodle is in the global namespace we can monkeypatch it.
 * This patch checks if the Toolbar exists before (re)rendering (See, "NOTE: patch change").
 */

;(function (
  c,
  iChemLabs,
  io,
  structures,
  actions,
  gui,
  imageDepot,
  desktop,
  tools,
  states,
  q,
  document,
  undefined
) {
  gui.ToolbarManager.prototype.write = function () {
    let sb = [
      '<div id="' + this.sketcher.id + '_toolbar" style="font-size:10px;">'
    ] /* NOTE: patch change */
    let bg = this.sketcher.id + '_main_group'
    if (this.sketcher.oneMolecule) {
      sb.push(this.buttonMove.getSource(bg))
    } else {
      sb.push(this.lassoSet.getSource(bg))
    }
    sb.push(this.buttonClear.getSource())
    sb.push(this.buttonErase.getSource(bg))
    sb.push(this.buttonCenter.getSource())
    if (this.sketcher.useServices) {
      sb.push(this.buttonClean.getSource())
    }
    sb.push(this.flipSet.getSource())
    sb.push(this.historySet.getSource())
    if (!this.sketcher.oneMolecule) {
      sb.push(this.copySet.getSource())
    }
    sb.push(this.scaleSet.getSource())
    sb.push(this.buttonOpen.getSource())
    sb.push(this.buttonSave.getSource())
    sb.push(this.buttonTemplate.getSource(bg))
    if (this.sketcher.useServices) {
      sb.push(this.buttonSearch.getSource())
      sb.push(this.buttonCalculate.getSource())
    }
    if (!this.sketcher.floatDrawTools) {
      sb.push('<br>')
      if (desktop.TextInput) {
        sb.push(this.buttonTextInput.getSource(bg))
      }
      sb.push(this.labelSet.getSource(bg))
      if (this.sketcher.includeQuery) {
        sb.push(this.buttonQuery.getSource(bg))
      }
      sb.push(this.attributeSet.getSource(bg))
      sb.push(this.bondSet.getSource(bg))
      sb.push(this.ringSet.getSource(bg))
      sb.push(this.buttonChain.getSource(bg))
      if (!this.sketcher.oneMolecule) {
        sb.push(this.shapeSet.getSource(bg))
      }
    }
    sb.push('</div>')
    if (this.sketcher.floatDrawTools) {
      if (desktop.TextInput) {
        this.drawTools.components.splice(0, 0, this.buttonTextInput)
      }
      if (this.sketcher.includeQuery) {
        this.drawTools.components.splice(
          desktop.TextInput ? 1 : 0,
          0,
          this.buttonQuery
        )
      }
      this.drawTools.components.splice(
        this.drawTools.components.length - (this.sketcher.oneMolecule ? 1 : 3),
        0,
        this.buttonChain
      )
      if (!this.sketcher.oneMolecule) {
        this.drawTools.components.push(this.buttonVAP)
      }
      sb.push(this.drawTools.getSource(bg))
    }

    if (document.getElementById(this.sketcher.id)) {
      let canvas = q('#' + this.sketcher.id)
      canvas.before(sb.join(''))
    } else {
      document.write(sb.join(''))
    }
  }
})(
  ChemDoodle,
  ChemDoodle.iChemLabs,
  ChemDoodle.io,
  ChemDoodle.structures,
  ChemDoodle.uis.actions,
  ChemDoodle.uis.gui,
  ChemDoodle.uis.gui.imageDepot,
  ChemDoodle.uis.gui.desktop,
  ChemDoodle.uis.tools,
  ChemDoodle.uis.states,
  ChemDoodle.lib.jQuery,
  document
)
;(function (
  c,
  extensions,
  featureDetection,
  uis,
  structures,
  d2,
  tools,
  q,
  m,
  window,
  undefined
) {
  const prototype = c.SketcherCanvas.prototype

  c.SketcherCanvas = function (id, width, height, options) {
    // keep checks to undefined here as these are booleans
    this.isMobile =
      options.isMobile === undefined
        ? featureDetection.supports_touch()
        : options.isMobile
    this.useServices =
      options.useServices === undefined ? false : options.useServices
    this.oneMolecule =
      options.oneMolecule === undefined ? false : options.oneMolecule
    this.requireStartingAtom =
      options.requireStartingAtom === undefined
        ? true
        : options.requireStartingAtom
    this.includeToolbar =
      options.includeToolbar === undefined ? true : options.includeToolbar
    this.floatDrawTools =
      options.floatDrawTools === undefined ? false : options.floatDrawTools
    this.resizable = options.resizable === undefined ? false : options.resizable
    this.includeQuery =
      options.includeQuery === undefined ? false : options.includeQuery
    // save the original options object
    this.originalOptions = options
    // toolbar manager needs the sketcher id to make it unique to this
    // canvas
    this.id = id
    this.toolbarManager = new uis.gui.ToolbarManager(this)
    const hasToolbar = !!document.getElementById(
      this.id + '_toolbar'
    ) /* NOTE: patch change */
    if (this.includeToolbar && !hasToolbar) {
      this.toolbarManager.write()
      // If pre-created, wait until the last button image loads before
      // calling setup.
      let self = this
      if (document.getElementById(this.id)) {
        q('#' + id + '_button_chain_icon').load(function () {
          self.toolbarManager.setup()
        })
      } else {
        q(window).load(function () {
          self.toolbarManager.setup()
        })
      }
      this.dialogManager = new uis.gui.DialogManager(this)
    }
    if (uis.gui.desktop.TextInput) {
      this.textInput = new uis.gui.desktop.TextInput(
        this,
        this.id + '_textInput'
      )
    }
    if (id) {
      this.create(id, width, height)
    }
    // cursor manager must be initialized before state manager
    // cursor manager must be initialized after sketcher element is created to set the default cursor
    this.cursorManager = new uis.gui.desktop.CursorManager(this)
    this.stateManager = new uis.states.StateManager(this)
    this.historyManager = new uis.actions.HistoryManager(this)
    this.copyPasteManager = new uis.CopyPasteManager(this)
    // styles is now created and available
    this.styles.atoms_circleDiameter_2D = 7
    this.styles.atoms_circleBorderWidth_2D = 0
    this.isHelp = false
    this.lastPinchScale = 1
    this.lastGestureRotate = 0
    this.inGesture = false
    if (this.oneMolecule) {
      let startMol = new structures.Molecule()
      startMol.atoms.push(new structures.Atom())
      this.loadMolecule(startMol)
    } else {
      this.startAtom = new structures.Atom('C', -10, -10)
      this.startAtom.isLone = true
      this.lasso = new tools.Lasso(this)
    }
    if (this.resizable) {
      let jqsk = q('#' + this.id)
      let self = this
      jqsk.resizable({
        resize: function (event, ui) {
          self.resize(jqsk.innerWidth(), jqsk.innerHeight())
        }
      })
    }
  }

  c.SketcherCanvas.prototype = prototype
})(
  ChemDoodle,
  ChemDoodle.extensions,
  ChemDoodle.featureDetection,
  ChemDoodle.uis,
  ChemDoodle.structures,
  ChemDoodle.structures.d2,
  ChemDoodle.uis.tools,
  ChemDoodle.lib.jQuery,
  Math,
  window
)
