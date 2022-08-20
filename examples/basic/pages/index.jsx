import { useEffect, useId, useRef } from "react"

const useChemDoodle = () => {
  const ref = useRef(null)

  useEffect(() => {
    if (ref?.current) {
      const ctx = ref.current.getContext('2d')
      ctx.fillStyle = 'green'
      ctx.fillRect(10, 10, 150, 100)
    }
  }, [ref])

  return {
    controls: [{
      props: {
        id: 'open',
        key: useId(),
        children: 'Open',
      }
    }],
    canvas: {
      props: {
        id: useId(),
        ref,
      }
    },
  }
}

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