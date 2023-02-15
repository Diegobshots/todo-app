import { Button, Card, TextField, CircularProgress } from "@mui/material"
import "./App.css"
import { Grid } from "@mui/material"
import { useRef, useState } from "react"

const App = () => {
  const taskField = useRef("pepe")

  const addTask = () => {
    setTasks([...tasks, {title: taskField.current.value, completed: false}])
    taskField.current.value = ""
  }

  const addRandomTask = () => {

    setIsLoading(true)
   fetch('https://dummyjson.com/todos/random')
    .then(res => res.json())
    .then(data => {
      setIsLoading(false)
      setTasks([...tasks, { title: data.todo, completed: false }])
    })
  }

  const completeTask = (task) => {
    const newTasks = tasks.map(t => {
      return task.title === t.title ? {title: t.title, completed: !t.completed} : t
    })
    setTasks(newTasks)
  }

  const [isLoading, setIsLoading] = useState(false)

  const [tasks, setTasks] = useState([
    {
      title: "comer patatas",
      completed: false
    },
    {
      title: "hacer que Tania no compre ganchitos",
      completed: false
    }
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
            {tasks.map((t) => {
              return (
                  <h2 style={ t.completed ? {textDecoration: "line-through"} : null }>{t.title} 
                  {
                    !t.completed ? <Button variant="outlined" onClick={() => completeTask(t)}>Complete task</Button> : null
                  } 
                  </h2>
              )
            })}
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
            <Button onClick={() => addRandomTask()} variant="outlined">
              Add random task &nbsp;
              {
                isLoading && <CircularProgress color="primary" size='1rem'/>
              } 
            </Button>
          </Grid>
        </Grid>

        <br />
      </Card>
    </div>
  )
}

export default App
