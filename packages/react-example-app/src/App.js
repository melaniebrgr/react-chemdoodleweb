import ViewerCanvasExample from './ViewerCanvasExample'
import SketcherCanvasExample from './SketcherCanvasExample'

function App() {
  return (
    <div>
      <header>
        <h1>React ChemDoodle Example Components</h1>
      </header>
      <main>
        <h2>Viewer Canvas</h2>
        <ViewerCanvasExample />
        <h2>Sketcher Canvas</h2>
        <SketcherCanvasExample />
      </main>
    </div>
  )
}

export default App
