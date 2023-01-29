# React Chemdoodle Web Components

A React UI library add-on for ChemDoodle Web components, a scientific interface display library.

## ChemDoodle Web Components Installation

### Download ChemDoodle Web Components

ChemDoodle Web Components (CWC) and can be downloaded from [web.chemdoodle.com/installation/download](https://web.chemdoodle.com/installation/download).

### Add to package.json (optional)

Although CWC is not compatible with module bundling tools like webpack, the CWC package can be tracked as a peer dependency in a React application. For example,

```
"peerDependencies": {
    "chemdoodleweb": "file:ChemDoodleWeb-9.4.0"
},
```

### Add script

Adding CWC to the root HTML file script ([react-static-global](https://github.com/melaniebrgr/react-chemdoodleweb/tree/main/examples/react-static-global)) is a simple and familiar approach. CWC is loaded once and is available on every page for the lifetime of the project.

1. Place CWC in public folder of a React project created with [Create React App](https://create-react-app.dev/docs/using-the-public-folder/) or equivalent. The environment variable `PUBLIC_URL` can be used to reference assets in the public folder:

```
<script type="text/javascript" src="%PUBLIC_URL%/ChemDoodleWeb-9.4.0/install/ChemDoodleWeb.js"></script>
```

2. ChemDoodle can then be called on component mount. Verify that the ChemDoodle is available in the project:

```
useEffect(() => {
    console.log(ChemDoodle.getVersion());
}, []);
```

#### Advantages

- Simple and convenient implementation, available everywhere for the lifetime of the application.

#### Disadvantages

- Note that it will not be bundled with rest of the React application and therefore make an additional network request. CWC will be loaded even if the current page does not use it (the size of the minified script is just 414 kB).
