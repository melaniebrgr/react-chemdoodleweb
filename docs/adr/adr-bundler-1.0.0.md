# [ADR] ChemDoodle React Components Bundler

Summary: Evaluate module bundlers.

- **Created:** Aug 21, 2022
- **Current Version:** 0.0.0
- **Target Version:** 1.0.0
- **Status:** WIP
- **ID:** bundler-1.0.0

Owner: melaniebrgr@gmail.com,
Other stakeholders: kevin@ichemlabs.com

---

The goal of this RFC is decide which module bunder to adopt, considering

- TypeScript compilation
- speed
- hot-module reloading
- production bundling (tree-shaking, lazy-loading, common chunk splitting, code minification)

# Background

There are only two ways to load JavaScript in the browser. You can load it via a script tag and references a JS file in the source attribute, or you can write JS on the page in a script tag. The problem with both approaches is that they do not scale "horizontally" or "vertically".

Scaling “horizontally", i.e. loading 100s of components, is limited by the number of possible concurrent requests for files. HTTP most permits only 2-6 connections, and HTTP2 permits ~50.

Scaling “Vertically”, i.e. one massive JS file, leads to scoping issues, maintainability issues, and performance issues since you're loading more JS on the page than what is needed. To get around scoping issues developers used IIFEs or other module patterns to encapsulate JS files into the single large file. This lead to an explosion of tooling to help with the concatenation of JS into a many module file, e.g. grunt, gulp, broccoli. The problems with these tools was that the whole file had to be rebuilt every time there was a change, and you were often concatenating whole libraries even if you only needed one util.

Module bundling tools emerged to solve these problems that issued from the need to ship more and more JS to browser. Module "bundling" is essentially the use tools to crawl, process and concatenate many source module files into files that can run in the browser. In 2015 Webpack emerged and quickly became the dominant module bundler; however today other bundlers such as Rollup, Parcel, Snowpack, Vite and have been developed that offer some advantages over Webpack. These four will be considered briefly in turn.

# Proposal

Try Parcel. Parcel seems to be quicker and more convenient for getting started than Rollup and covers all the features necessary. Vite is not ready for production library bundling, and Snowpack is no longer maintained.

## [Vite](https://vitejs.dev/)

### Speed

Appplication development with Vite is fast:

> Vite only needs to transform and serve source code on demand, as the browser requests it with native ESM.

> in practice we've found that even HMR update speed deteriorates significantly as the size of the application grows. HMR is performed over native ESM. When a file is edited, Vite only needs to precisely invalidate the chain between the edited module and its closest HMR boundary (most of the time only the module itself), making HMR updates consistently fast regardless of the size of your application.

### Production bundling

However, it is not suitable yet for application bundling.

> Even though native ESM is now widely supported, shipping unbundled ESM in production is still inefficient (even with HTTP/2) due to the additional network round trips caused by nested imports. To get the optimal loading performance in production, it is still better to bundle your code with tree-shaking, lazy-loading and common chunk splitting (for better caching).

> While esbuild is blazing fast and is already a very capable bundler for libraries, some of the important features needed for bundling applications are still work in progress - in particular code-splitting and CSS handling. For the time being, Rollup is more mature and flexible in these regards.

## [Rollup](https://rollupjs.org/guide/en/)

### TypeScript compilation

> You can also use other languages for your configuration files like TypeScript. To do that, install a corresponding Rollup plugin like @rollup/plugin-typescript and use the --configPlugin option

### Production bundling

> In addition to enabling the use of ES modules, Rollup also statically analyzes the code you are importing, and will exclude anything that isn't actually used.

> You can export an array from your config file to build bundles from several unrelated inputs at once, even in watch mode.

## [Parcel](https://parceljs.org/)

### Production bundling

Clear and convenient [documentation](https://parceljs.org/getting-started/library/) and doesn't require a configuration file.

## [Snowpack](https://www.snowpack.dev/)

> Update (April 20, 2022): Snowpack is no longer actively maintained and is not recommended for new projects.
