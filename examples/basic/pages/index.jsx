import useChemDoodle from '../../../dist/'

function Basic() {
  const { canvas, controls } = useChemDoodle()

  return (
    <div>
      <h1>Basic Example</h1>
      <div>
          { controls.map(({ props }) => <button {...props} />) }
          <canvas {...canvas.props} />
      </div>
    </div>
  );
}

export default Basic;