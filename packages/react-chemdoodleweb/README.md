# React Chemdoodle Web Components

React Chemdoodle Web Components (`react-chemdoodleweb`) is a UI library add-on for the [ChemDoodle Web Components](https://web.chemdoodle.com/) (CWC) library, a chemical drawing javascript library from iChemLabs. At time of this writing, CWC provides 18 unique component canvases from a simple 2D "ViewerCanvas" to 3D "EditorCanvas3D" to a "PeriodicTableCanvas". `react-chemdoodleweb` wraps only two at this time, the 2D "ViewerCanvas" and "SketcherCanvas". Contributions are welcome to provide bindings for the others canvases.

## Installation

As was the practise at time it was created, the ChemDoodle Web Components (CWC) consist of IIFE modules combined into two javascript files, one core and one an optional jQuery-based UI, that are loaded by a client browser.

On the other hand, the `react-chemdoodleweb` library is a "require time" node module, that can be compiled by modern JS bundlers and is more conventionally in current web application development. While `react-chemdoodleweb` can be downloaded from NPM, CWC scripts needs to be added to the HTML document head. While this is a simple and convenient implementation that ensures CWC is available everywhere for the lifetime of the application, the tradeoff is that it is not be bundled with rest of the React application and therefore entails an additional network request. Also, CWC will be loaded even if the current page does not use it. The size of the minified CWC script is 414 kB.

### 1. Download CWC

`react-chemdoodleweb` depends on the `ChemDoodle` global object, so you will first need to install CWC in your project. Downloaded the CWC library from [web.chemdoodle.com/installation/download](https://web.chemdoodle.com/installation/download).

### 2. Add CWC to the package.json (optional)

Although CWC is not compatible with module bundlers like webpack, the CWC package can be added as a peer dependency. For example,

```json
"peerDependencies": {
    "chemdoodleweb": "file:ChemDoodleWeb-9.4.0"
},
```

### 3. Load CWC with `<script>` tags

Adding CWC to the root HTML file script ([react-static-global](https://github.com/melaniebrgr/react-chemdoodleweb/tree/main/examples/react-static-global)) is a simple and familiar approach. CWC is loaded once and is available on every page for the lifetime of the project.

Place CWC in public folder of a React project created with [Create React App](https://create-react-app.dev/docs/using-the-public-folder/) or equivalent. The environment variable `PUBLIC_URL` can be used to reference assets in the public folder:

```html
<script
  type="text/javascript"
  src="%PUBLIC_URL%/ChemDoodleWeb-9.4.0/install/ChemDoodleWeb.js"
></script>
```

ChemDoodle can then be called on component mount. Verify that the ChemDoodle is available in the project:

```jsx
useEffect(() => {
  console.log(ChemDoodle.getVersion())
}, [])
```

### 4. Install `react-chemdoodleweb`

```bash
npm install react-chemdoodleweb
```

### 5. Import the react CWC components

Import the components in your react application, pass in molecular data, and style the canvas and molecula structure as you wish. See the `react-example-app` (`npm run start`) in the `react-chemdoodleweb` monorepo for a working example.

```jsx
import { ViewerCanvas } from 'react-chemdoodleweb'

function Caffeine() {
    const caffeine = // molecular data

    return (
        <ViewerCanvas
            id="caffeine"
            data={{ mol: caffeine }}
            canvasStyle={{
                bonds_width_2D: 0.6,
                bonds_saturationWidthAbs_2D: 2.6,
                bonds_hashSpacing_2D: 2.5,
                atoms_font_size_2D: 10,
                atoms_font_families_2D: ['Helvetica', 'Arial', 'sans-serif']
            }}
            moleculeStyle={{
                scaleToAverageBondLength: 14.4
            }}
        />
    )
}
```
