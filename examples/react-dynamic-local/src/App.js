import { useEffect } from 'react';

function App() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = `${process.env.PUBLIC_URL}/ChemDoodleWeb-9.4.0/install/ChemDoodleWeb.js`;
    document.body.appendChild(script);
  
    return () => {
        document.body.removeChild(script);
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
