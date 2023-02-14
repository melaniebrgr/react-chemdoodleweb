# React Chemdoodle Web Components

The React Chemdoodle Web Components (`react-chemdoodle`) is a UI library add-on for the [ChemDoodle Web Components](https://web.chemdoodle.com/) (CWC) library. CWC provides 18 unique component canvases from a simple 2D "ViewerCanvas" to 3D "EditorCanvas3D" to a "PeriodicTableCanvas". At the moment, `react-chemdoodle` wraps just two canvases, the 2D "ViewerCanvas" and "SketcherCanvas". [Contributions are welcome](https://github.com/melaniebrgr/react-chemdoodleweb) to provide bindings for additional canvases.

## Installation

As it was originally written in 2007, CWC consists of a number of IIFE modules divided into two javascript files, one a "core" file and one an optional jQuery-based UI, that are loaded by a client browser. The `react-chemdoodle` library on the otherhand is a "require time" node module that can be compiled by JS bundlers more typical in modern web application development. While `react-chemdoodleweb` can be downloaded from NPM, CWC scripts need to be embedded into the HTML document. While this is a simple implementation that ensures CWC is available everywhere for the lifetime of the React application, the tradeoff is that CWC is not bundled with the rest of the React application code and will make an additional network request. As well, it will be loaded even if the current page does not use it (The size of the minified CWC script is 414 kB).

### 1. Download CWC

`react-chemdoodleweb` depends on the `ChemDoodle` global object, so CWC first needs to be installed in your project. Downloaded CWC from [web.chemdoodle.com/installation/download](https://web.chemdoodle.com/installation/download).

### 2. Embed CWC as a client-side script

Place CWC in the public folder of a React project created with [Create React App](https://create-react-app.dev/docs/using-the-public-folder/) or equivalent. The environment variable `PUBLIC_URL` can be used in the React application to reference assets in the public folder, e.g.

```html
<script
  type="text/javascript"
  src="%PUBLIC_URL%/ChemDoodleWeb-9.4.0/install/ChemDoodleWeb.js"
></script>
```

In it's entirety, your React app's`index.html` file may look something like:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <link
      rel="stylesheet"
      href="%PUBLIC_URL%/ChemDoodleWeb-9.5.0/install/ChemDoodleWeb.css"
      type="text/css"
    />
    <link
      rel="stylesheet"
      href="%PUBLIC_URL%/ChemDoodleWeb-9.5.0/install/uis/jquery-ui-1.11.4.css"
      type="text/css"
    />
    <script
      type="text/javascript"
      src="%PUBLIC_URL%/ChemDoodleWeb-9.5.0/install/ChemDoodleWeb.js"
    ></script>
    <script
      type="text/javascript"
      src="%PUBLIC_URL%/ChemDoodleWeb-9.5.0/install/uis/ChemDoodleWeb-uis.js"
    ></script>
    <title>My React Application</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>
</html>
```

Only embed the scripts and CSS that you need for you project, though. ChemDoodle can now be called on component mount. Verify that the ChemDoodle is available in the project:

```jsx
useEffect(() => {
  console.log(ChemDoodle.getVersion())
}, [])
```

Congrats! The ChemDoodle Web Components are now installed in your project! Now we are ready to render a molecule to the page. (Did you see the version logged to console twice? That is `React.StrictMode` 😉.)

### 3. Add CWC to package.json (optional)

The CWC package can be also optionally be listed as a peer dependency for visibility in your project. For example,

```json
"peerDependencies": {
    "chemdoodleweb": "file:ChemDoodleWeb-9.4.0"
},
```

### 4. Install `react-chemdoodle`

```bash
npm install react-chemdoodle
```

### 5. Import the react CWC components

Import the components in your react application, pass it molecular data (MOL file format) as a prop, and style the canvas and molecular structure as desired:

```jsx
import { ViewerCanvas } from 'react-chemdoodle'

function Caffeine() {
    const caffeine = // fetch molecular data

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

See the `react-example-app` (`npm run start`) in the [`react-chemdoodle` monorepo](https://github.com/melaniebrgr/react-chemdoodleweb) for a full, working example.

Happy (chem) doodling!
