The error was coming from the SketcherCanvas constructor being called twice during the lifecycle of the application, which during the component was being mounted, unmounted and then remounted to the DOM. Each new render was appending a new Toolbar to the DOM and the old one was not removed. There were two things tried for resolving this

1. removing the "old" toolbar on component unmount (fast to check if it works),
2. overwriting the current ToolBar GUI with one in react (reproducing the toolbar UI and behaviour would take more time)

## 1. removing the "old" toolbar on component unmount

Updating the logic of useEffect to remove the toolbar from the DOM on component unmount solved the toolbar duplication issue and console error. However the problem remained with the "connection" between the buttons and the sketcher. Interacting with the buttons did not update the sketcher instance (interaction between UI and molecule in sketcher was lost), and the UI appearance was still broken.

[React.Strict mode](https://reactjs.org/docs/strict-mode.html) cause the component to unmount and remount and was the root cause "duplication issue". On unmount and remount the toolbar was being appended twice to the DOM, as it was the root cause why handlers, e.g. the click handler was called twice. On click, two callbacks could be seen executing, one correct and one incorrect. However, Strict mode does this on purpose to reveal potentatial issues. To solve the problem one should not remove `React.StrictMode` but avoid non-idempotent updates.

Essentially, React may repeatedly re-render a component containing a CWC during the lifetime of the application. This is normal React behaviour. If any CWC has a side-effect, they will be triggered again, like appending DOM node. This could be handled in CWC by first checking if the node exists and either removing and reattaching it, or doing nothing a.k.a render once.

Adding logic directly in CWC to check if tooldbar exists before writing a new one is effective for preventing UI duplication. However, I can still see the a click event called twice.

```
let oldWrite = ChemDoodle.uis.gui.ToolbarManager.prototype.write;
	ChemDoodle.uis.gui.ToolbarManager.prototype.write = function(){
		if(!alreadyExists){
			oldWrite();
		}
	};
```

## 2. overwriting the current ToolBar GUI with one in react

Exploring the second approach, overwriting the Toolbar manager and implementing the UI in React appears to be working. A benefit of this is approach, beyond reducing a dependency on jQuery, is that it also lends itself to the possibility of exporting both the UI and the "plain" callbacks from the package for those who want full UI control.

A couple challenges so far with the react-based UI:

- Using the new React-based toolbar buttons, the canvas occasionally flickers "revealing another molecule beneath it".
- For completeness will need to reimplement the custom atom picker, which displays a full periodic table.
