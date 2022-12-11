# React Chemdoodle Web Components

A React UI library add-on for ChemDoodle Web components, a scientific interface display library.

## ChemDoodle Web Components Installation

ChemDoodle Web Components (CWC) and can be downloaded from [web.chemdoodle.com/installation/download](https://web.chemdoodle.com/installation/download). Although CWC is not compatible with module bundling tools like webpack, adding the CWC package as a peer dependency in a React application is still recommended for dependency tracking. For example,

```
"peerDependencies": {
    "chemdoodleweb": "file:ChemDoodleWeb-9.4.0"
},
```

CWC can be installed in a React application via the approaches described below. In both cases the CWC script will not be bundled with rest of the React application and make an additional network request.

### Static, global installation

Adding CWC to the root HTML file script ([react-static-global](https://github.com/melaniebrgr/react-chemdoodleweb/tree/main/examples/react-static-global)) is a simple and familiar approach. CWC is loaded once and is available on every page for the lifetime of the project.

1. Place CWC in public folder of a React project created with [Create React App](https://create-react-app.dev/docs/using-the-public-folder/) or equivalent. The environment variable `PUBLIC_URL` can be used to reference assets in the public folder:

```
<script type="text/javascript" src="%PUBLIC_URL%/ChemDoodleWeb-9.4.0/install/ChemDoodleWeb.js"></script>
```

2. ChemDoodle can then be called on component mount:

```
useEffect(() => {
    console.log(ChemDoodle.getVersion());
}, []);
```

#### Advantages

- Simple and convenient implementation, available everywhere for the lifetime of the application.

#### Disadvantages

- CWC will be loaded even if the current page does not use it (the size of the minified script is just 414 kB).

### Dynamic, local installation

Conditional loading of CWC is straightforward by appending a `<script>` to the page ([react-dynamic-local](https://github.com/melaniebrgr/react-chemdoodleweb/tree/main/examples/react-dynamic-local)). When appended, CWC is executed as normal.

1. Place CWC in public folder of a React project created with [Create React App](https://create-react-app.dev/docs/using-the-public-folder/) or equivalent. The environment variable `PUBLIC_URL` can be used to reference assets in the public folder:

```
<script type="text/javascript" src="%PUBLIC_URL%/ChemDoodleWeb-9.4.0/install/ChemDoodleWeb.js"></script>
```

2. React hooks are a convenient way to append a `<script>` to the page. The following script will ensure CWC is only loaded once even if multiple components execute this same load script:

```
useEffect(() => {
    const id = 'CHEMDOODLE';
    const src = `${process.env.PUBLIC_URL}/ChemDoodleWeb-9.4.0/install/ChemDoodleWeb.js`;
    const script = document.createElement('script');
    script.setAttribute('id', id)
    script.src = src;
    const isScriptLoaded = !!document.getElementById(id);

    if (!isScriptLoaded) {
        document.head.appendChild(script);
    }
}, []);
```

3. Once the hook has executed the ChemDoodle object is available globally.

```
useEffect(() => {
    console.log(ChemDoodle.getVersion());
}, []);
```

#### Advantages

- CWC is loaded only if the page uses it.

#### Disadvantages

- The browser has to parse and execute the React bundle to discover and download the ChemDoodle script. This means the ChemDoodle script is likely hidden from the preload scanners that are used by browsers to discover resources on pages.

## Frequently encountered errors

> You might have mismatching versions of React and the renderer

In this project this happens because the library and example app are running [two different versions of react](https://reactjs.org/warnings/invalid-hook-call-warning.html#mismatching-versions-of-react-and-react-dom). Check if this is the case with `npm ls react`. Linking the library version to the app version resolves the issue. From the root folder run `npm link examples/react-static-global/node_modules/react`.
