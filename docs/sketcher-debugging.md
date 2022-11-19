The error was coming from the SketcherCanvas constructor being called twice during the lifecycle of the application, which during the component was being mounted, unmounted and then remounted to the DOM. Each new render was appending a new Toolbar to the DOM and the old one was not removed. There were two things tried for resolving this

1. removing the "old" toolbar on component unmount (fast to check if it works),
2. overwriting the current ToolBar GUI with one in react (reproducing the toolbar UI and behaviour would take more time)

Updating the logic of useEffect to remove the toolbar from the DOM on component unmount solved the toolbar duplication and error. However, there was a problem with this in that the connection between the buttons and the sketcher instance was lost and the UI rendering was still broken. I didn't try to debug this further, but I still could.

Exploring the second approach, overwriting the Toolbar manager and implementing the UI in React appears to be working. A benefit of this is approach, beyond reducing a dependency on jQuery, is that it also lends itself to the possibility of exporting both the UI and the "plain" callbacks from the package for those who want full UI control.

A couple challenges so far with the react-based UI:
- Using the new React-based toolbar buttons, the canvas occasionally flickers "revealing another molecule beneath it".
- For completeness will need to reimplement the custom atom picker, which displays a full periodic table.