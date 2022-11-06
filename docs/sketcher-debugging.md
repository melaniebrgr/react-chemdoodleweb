## Issue 1: duplicate toolbars
The SketcherCanvas constructor is being called twice because, for whatever reason, it is being mounted, unmounted and remounted to the DOM during the lifecycle of the application. The problem with this is that Toolbar is not removed when this happens and each new rendered appends a new Toolbar.

- Remove the toolbar on component unmount,
- Overwrite the current ToolBar GUI with one in react (reproducing the toolbar UI and behaviour would take time)

Updating the logic of useEffect to remove the toolbar from the DOM on unmount avoids toolbar duplication, but there was still a disconnect between the buttons and the interactions.