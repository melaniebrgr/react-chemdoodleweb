import { useEffect } from 'react'
import ViewerCanvasExample from './ViewerCanvasExample'
import SketcherCanvasExample from './SketcherCanvasExample'

function App() {
  useEffect(() => {
    const id = 'CHEMDOODLE'
    const src = `${process.env.PUBLIC_URL}/ChemDoodleWeb-9.4.0/install/ChemDoodleWeb.js`
    const script = document.createElement('script')
    script.setAttribute('id', id)
    script.src = src
    const isScriptLoaded = !!document.getElementById(id)

    if (!isScriptLoaded) {
      document.head.appendChild(script)
    }
  }, [])

  return (
    <div>
      <header>
        <h1>React ChemDoodle "dynamic local" Examples</h1>
      </header>
      <main>
        <h2>Viewer Canvas Example</h2>
        <ViewerCanvasExample />
        <h2>Sketcher Canvas Example</h2>
        <SketcherCanvasExample />
      </main>
    </div>
  )
}

export default App
