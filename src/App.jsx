import { Button, Card, TextField } from "@mui/material"
import "./App.css"
import { Grid } from "@mui/material"
import { useRef, useState } from "react"

const App = () => {
  const taskField = useRef("pepe")

  const addTask = () => {

    setTasks([...tasks, taskField.current.value])
    taskField.current.value = ''
    // Añadir tarea al estado y reiniciar ref
  }

  const [tasks, setTasks] = useState([
    "comer patatas",
    "hacer que Tania se calle"
  ])


  return (
    <div className="App">
      <Card variant="outlined">
        <Grid container rowGap={4} spacing={1}>
          <Grid xs={12}>
            <h1>Todo list</h1>
            <hr />
          </Grid>
          <Grid xs={12}>
            {tasks.map((t) => <h2>{t}</h2>)}
          </Grid>
          <Grid xs={12}>
            <hr />
          </Grid>
          <Grid xs={8}>
            <TextField
              id="outlined-basic"
              label="Here your task"
              variant="outlined"
              inputRef={taskField}
            />
          </Grid>
          <Grid xs={4}>
            <Button onClick={() => addTask()} variant="contained">
              Add task
            </Button>
          </Grid>
        </Grid>

        <br />
      </Card>
    </div>
  )
}

export default App
