
# [RFC] ChemDoodle React Components API design
Summary: Enable developers to build cheminformatic and scientific UIs in React applications with the ChemDoodle Web Components (CWC) JS library.

- **Created:** Aug 7, 2022
- **Current Version:** 0.0.0
- **Target Version:** 1.0.0
- **Status:** Approved
- **ID:** rcwc-1.0.0

Owner: melaniebrgr@gmail.com,
Other stakeholders: kevin@ichemlabs.com

---

The [ChemDoodle Web Component](https://web.chemdoodle.com/) (CWC) library provides a suite of classes for creating and customizing the display of 2D and 3D chemical graphics rendered by HTML `<canvas>` elements. The ChemDoodle React Components project aims to bridge CWC and React applications, and will

1. expose CWC functionality via a flexible component API that is familiar for React developers,
2. support TypeScript and JavaScript React applications, and
3. enable import of the `react-chemdoodleweb` library in isomorphic applications.

Additionally, the `react-chemdoodleweb` library will be versioned and distributed via a package manager such as npm or GitHub Packages so it can be installed, upgraded, and tracked in React applications like any other third-party dependency.

## Background

To use ChemDoodle Web Components to display chemical graphics in a server-side rendered (SSR) React application recently I took the following steps:

- Downloaded the CWC package and placed it at the root of the project.
- Dynamically imported the library on Window load event. CWC extends the Window global object and therefore requires it to be available:

```javascript
window.addEventListener('load', () => {
    import('resources/assets/js/packages/cwc');
});
```

- Created a React component that renders a `<canvas>` element:

```jsx
const Component = () => {
    return (<canvas id="lipitor" />)
}
```

- Executed a script instantiating a ChemDoodle "transform canvas" object, one of the molecular display canvas types available in ChemDoodle, after the CWC library was loaded and the component was mounted (within an "on mount" lifecycle method of the React component above):

```javascript
let transformCanvas = new ChemDoodle.TransformCanvas('lipitor', 176, 103);
transformCanvas.styles.angstromsPerBondLength = 1.5;
transformCanvas.styles.atoms_font_size_2D = 6.0;
transformCanvas.styles.atoms_useJMOLColors = true;
transformCanvas.styles.atoms_showAttributedCarbons_2D = false;
transformCanvas.styles.bonds_width_2D = 0.6;
transformCanvas.styles.bonds_useAbsoluteSaturationWidths_2D = false;
transformCanvas.styles.bonds_saturationWidth_2D = 0.18;
transformCanvas.styles.bonds_ends_2D = 'butt';
transformCanvas.styles.bonds_clearOverlaps_2D = true;
transformCanvas.styles.bonds_atomLabelBuffer_2D = 0.1;
transformCanvas.styles.bonds_hashSpacing_2D = 1.7;
transformCanvas.styles.text_font_size = 6.0;
transformCanvas.styles.shapes_arrowLength_2D = 10.0;
let lipitor = new ChemDoodle.io.JSONInterpreter().molFrom({"a":[{"x":203.7239,"y":72.5374,"l":"N"},{"x":194.9563,"y":66.2314},{"x":186.2493,"y":72.6209},{"x":189.6358,"y":82.8763},{"x":200.4358,"y":82.8248},{"x":213.077,"y":67.1375},{"x":222.4301,"y":72.5374},{"x":231.7831,"y":67.1374},{"x":231.7831,"y":56.3374,"l":"O"},{"x":241.1362,"y":72.5374},{"x":250.4893,"y":67.1374},{"x":259.8424,"y":72.5374},{"x":250.4893,"y":56.3374,"l":"O"},{"x":269.1954,"y":67.1373},{"x":269.1954,"y":56.3373,"l":"O"},{"x":278.5485,"y":72.5373,"l":"O"},{"x":184.2359,"y":92.2294},{"x":205.8358,"y":92.1779},{"x":173.4359,"y":92.2294},{"x":168.0359,"y":101.5825},{"x":173.4359,"y":110.9355},{"x":184.2359,"y":110.9355},{"x":189.6359,"y":101.5824},{"x":200.4357,"y":101.5309},{"x":205.8357,"y":110.884},{"x":216.6357,"y":110.884},{"x":222.0357,"y":101.531},{"x":216.6357,"y":92.1779},{"x":222.0357,"y":120.2371,"l":"F"},{"x":194.9563,"y":55.4314},{"x":204.3094,"y":50.0314},{"x":185.6033,"y":50.0314},{"x":176.8962,"y":67.2209},{"x":167.5431,"y":72.6209,"l":"N"},{"x":176.8962,"y":56.421,"l":"O"},{"x":158.19,"y":67.2209},{"x":158.19,"y":56.421},{"x":148.8369,"y":51.021},{"x":139.4839,"y":56.421},{"x":139.4839,"y":67.2209},{"x":148.837,"y":72.6209}],"b":[{"b":0,"e":1},{"b":1,"e":2,"o":2},{"b":2,"e":3},{"b":3,"e":4,"o":2},{"b":4,"e":0},{"b":0,"e":5},{"b":5,"e":6},{"b":6,"e":7},{"b":7,"e":8},{"b":7,"e":9},{"b":9,"e":10},{"b":10,"e":11},{"b":10,"e":12},{"b":11,"e":13},{"b":13,"e":14,"o":2},{"b":13,"e":15},{"b":3,"e":16},{"b":4,"e":17},{"b":16,"e":18},{"b":18,"e":19,"o":2},{"b":19,"e":20},{"b":20,"e":21,"o":2},{"b":21,"e":22},{"b":22,"e":16,"o":2},{"b":17,"e":23},{"b":23,"e":24,"o":2},{"b":24,"e":25},{"b":25,"e":26,"o":2},{"b":26,"e":27},{"b":27,"e":17,"o":2},{"b":25,"e":28},{"b":1,"e":29},{"b":29,"e":30},{"b":29,"e":31},{"b":2,"e":32},{"b":32,"e":33},{"b":32,"e":34,"o":2},{"b":33,"e":35},{"b":35,"e":36},{"b":36,"e":37,"o":2},{"b":37,"e":38},{"b":38,"e":39,"o":2},{"b":39,"e":40},{"b":40,"e":35,"o":2}]});
lipitor.scaleToAverageBondLength(10.8);
transformCanvas.loadMolecule(lipitor);
```

## Proposal

### 1. Flexible Component Design
A react add-on for CWC can expose functionality on a continuum of fully configured, to composed, to fully headless components. "Configured" components expose variations through props and are well-suited for enforcing design, but have poor flexibility contributing to brittle code over time. "Headless" approaches leave markup and or styling up to the developer, and provide greater flexibility for web application developers. "Compositional" approaches lie between the two, exposing child subcomponents that can be configured and composed as needed.

Here we consider composition and headless-based component APIs, as they can be integrated into a wider variety of apps with different usage needs. They are intended as representative ideas of the component API instead of comprehensive examples.

#### 1.1 Composition
```jsx
import ChemDoodle from '@react-chemdoodleweb'

const Sketcher = () => {
    return (
        <ChemDoodle>
            <ChemDoodle.Controls>
                {(control) => <button {...control} />}
            </ChemDoodle.Controls>
            <ChemDoodle.Canvas options={options} molecule={molecule} />
        </ChemDoodle>
    )
}
```
The `Controls` sub-component exposes useful information via a render prop to enable custom styling. The `Canvas` sub-component takes an `options` that customise the appearance of the chemical graphics, and a `molecule` prop to load a molecule for initial rendering.

#### 1.2 Headless
```jsx
import { useChemDoodle } from '@react-chemdoodleweb'

const Sketcher = () => {
    const { canvas, controls } = useChemDoodle(options)

    return (
        <div>
            { controls.map(control => <button {...control} />) }
            <canvas molecule={molecule} />
        </div>
    )
}
```
The inversion of control for customising styling and appearance provided by a render prop in the Compositional example (1.1) is solved with a hook here instead.

In both examples, users can map or filter over the controls to customise the appearance, group, or limit which ones are presented. However the Headless example (1.2) is the more flexible and simplest possible API that accomplishes everything known and most likely to accomplish everything unknown in a declarative fashion.

#### Abandoned Ideas

##### Convenience control utlity methods on canvas component
The canvas component returned from a hook can also expose utility methods. This creates interesting possibilities, however, calling a utility methods on a component refence is a somewhat less familiar usage pattern than destructing controls, for instance, from a hook.

```jsx
import { useChemDoodle } from '@react-chemdoodleweb'

const Sketcher = () => {
    const canvas = useChemDoodle(options)

    return (
        <div>
            { canvas.getControls(controls).map(control => <button {...control} />) }
            <canvas molecule={molecule} />
        </div>
    )
}
```

## Appendix

### Controls

<details>
<summary>Basic controls</summary>

- open
- save
- clear
- center
- flip horizontally
- flip vertically
- move
- clean
- undo
- redo
- cut
- copy
- paste
- increase scale
- decrease scale
- lasso tool
- lasso tool (shapes only)
- marquee tool
- erase tool
- templates
- search (molgrabber)
- calculate
</details>

<details>
<summary>Element controls</summary>

- hydrogen
- carbon
- nitrogen
- oxygen
- fluorine
- chlorine
- bromine
- iodine
- phosphorus
- sulfur
- silicone
- periodic table
- atom label tool
- set query to atom or bond
</details>

<details>
<summary>Attribute controls</summary>

- increase charge
- decrease charge
- add lone pair
- remove lone pair
- add radical
- remove radical
- set isotope value
- set implicit hydrogen count
- define enhanced stereochemistry
</details>

<details>
<summary>Bond controls</summary>

- single bond
- recessed bond
- protruding bond
- double bond
- zero bond
- covalent bond
- half bond
- wavy bond
- resonance bond
- ambiguous double bond
- triple bond
- add carbon chain
</details>

<details>
<summary>Ring controls</summary>

- cyclohexane ring
- benzene ring
- cyclopropane ring
- cyclobutane ring
- pentane ring
- cycloheptane ring
- cyclohexane ring
- arbitrary ring size tool
</details>

<details>
<summary>Shape controls</summary>

- synthetic arrow
- retrosynthetic arrow
- resonance arrow
- equilibrium arrow
- single electron pusher
- electron pair pusher
- bond forming pusher
- reaction mapping
- bracket
- repeat unit
- variable attachment points
</details>
