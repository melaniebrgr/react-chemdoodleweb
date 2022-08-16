
# [RFC] React ChemDoodle Web Components
Summary: Enable developers to build cheminformatic and scientific UIs in React applications based on the ChemDoodle Web Components (CWC) JS library.

- **Created:** Aug 7, 2022
- **Current Version:** 0.0.0
- **Target Version:** 1.0.0
- **Status:** WIP
- **ID:** rcwc

Owner: melaniebrgr@gmail.com,
Other stakeholders: kevin@ichemlabs.com

---

The ChemDoodle Web Component (CWC) library provides a suite of classes for creating and customizing the display of 2D and 3D chemical graphics within HTML `<canvas>` elements. The goals of the React ChemDoodle Web Component project (rCWC) are to

1. expose the functionality of CWC via a flexible component design that is familiar to React developers, 
3. support TypeScript as well as JavaScript React applications, and
2. version and distribute the `react-chemdoodleweb` library via a package manager such as npm or GitHub Packages, so it can be installed, upgraded, and tracked in React applications like any other third-party dependency.

## Background

To use ChemDoodle Web Components to display chemical graphics in a server-side rendered React application recently I took the following steps:

- The CWC package was downloaded and placed at the root of the project.
- CWC Because it extends the window object, the package dynamically imported 

## Proposal

### 1. Flexible Component Design
A react add-on for CWC can expose functionality on a continuum of fully configured, to composed, to fully headless components. "Configured" components expose variations through props and are well-suited for enforcing design, but have poor flexibility contributing to brittle code over time. "Headless" approaches leave markup and or styling up to the developer, and provide greater flexibility for web application developers. "Compositional" approaches lie between the two, exposing child subcomponents that can be configured and composed as needed.

Here we consider composition and headless-based component APIs, as they can be integrated into a wider variety of apps with different usage needs. They are intended as representative ideas of the component API, and are not exhaustive.

#### Component Composition approach
```jsx
import ChemDoodle from '@react-chemdoodleweb'

const Sketcher = () => {
    return (
        <ChemDoodle onChange={onChange}>
            <ChemDoodle.Controls>
                {(control) => <button {...control} />}
            </ChemDoodle.Controls>
            <ChemDoodle.Canvas options={options} molecule={molecule} />
        </ChemDoodle>
    )
}
```
- The `onChange` callback on the parent component is run whenever the displayed molecule changes.
- The `Controls` sub-component exposes useful information via a render prop so that custom markup and styling can be applied.
- The `Canvas` sub-component takes an `options` configuration object to customise the appearance of the chemical graphics, and an optional `molecule` prop to load the molecule that is initially rendered.

#### Headless UI approach
```jsx
import { useChemDoodle } from '@react-chemdoodleweb'

const Sketcher = () => {
    const { canvas, controls } = useChemDoodle(options)

    return (
        <div>
            { controls.map(control => <button {...control} />) }
            <canvas />
        <div>
    )
}
```



#### Controls

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

#### Abandoned Ideas

##### Convenience control utlity methods on canvas component
Canvas component also exposes utility methods. As a developer destructing a controls prop from the hook is a more prectible usage than calling utility method on a component. Users can filter over the controls as they like to group the controls, and examples can be provided in the documentation. Future versions could expose convenience methods that group by control type if it's found to be useful.

```javascript
canvas.getControls(); // Returns an array of all controls.
canvas.getControls('open', 'save'); // Returns specified control(s).
```

### 2. TypeScript support

### 3. Package Manager Distribution

To install CWC in a web application javascript and stylesheets are linked from `<script>` and `<style>` tags respectively, usually from the HTML document head.
- impacts bundling and tree-shaking
- barrier to typical installation in React applications
- causes errors in SSR applications because WINDOW object is expected to be available