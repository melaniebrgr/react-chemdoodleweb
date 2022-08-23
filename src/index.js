import { useEffect, useId, useRef } from "react"

const useChemDoodle = () => {
  const ref = useRef(null)

  useEffect(() => {
    if (ref?.current) {
      const ctx = ref.current.getContext('2d')
      ctx.fillStyle = 'blue'
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

export default useChemDoodle;
