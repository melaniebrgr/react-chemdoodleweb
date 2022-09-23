import { useEffect } from "react";

function App() {
  useEffect(() => {
    // eslint-disable-next-line no-undef
    console.log(ChemDoodle.getVersion());
  }, []);

  return (
    <div>
      <header>
        <h1>Basic React Example</h1>
      </header>
    </div>
  );
}

export default App;
