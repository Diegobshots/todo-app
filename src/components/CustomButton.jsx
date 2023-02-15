import { useState, useEffect } from "react"
import Button from '@mui/material/Button'

const CustomButton = () => {

  const [count, setCount] = useState(0)

  useEffect(() => {
    
  }, [count])

  return (
    <>
      <Button variant="contained" onClick={() => setCount(count + 1)}>Incrementar</Button>
      <p>{count}</p>
    </>
  )
}

export default CustomButton
