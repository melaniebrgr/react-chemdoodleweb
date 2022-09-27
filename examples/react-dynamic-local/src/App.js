import { useEffect } from 'react';

function App() {
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

  return (
    <div>
      <header>
        <h1>React Example</h1>
      </header>
    </div>
  );
}

export default App;
