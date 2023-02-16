import { Button, Card, TextField, CircularProgress } from "@mui/material"
import "./App.css"
import { Grid } from "@mui/material"
import { useRef, useState, useEffect } from "react"

const App = () => {
  const taskField = useRef("")
  const [isLoading, setIsLoading] = useState(false)
  const [inputError, setInputError] = useState(false)
  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem('todos')) ?? [])


  useEffect(() => {
    localStorage.setItem('todos',  JSON.stringify(tasks))
  }, [tasks])

  const addTask = () => {

    if ( taskField.current.value === '' ) {
      setInputError(true)
      return
    }
    setInputError(false)
    setTasks([...tasks, { title: taskField.current.value, completed: false, id: taskField.current.value+Math.random() }])
    
    taskField.current.value = ""
  }

  const addRandomTask = () => {
    setIsLoading(true)
    fetch("https://dummyjson.com/todos/random")
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(false)
        setTasks([...tasks, { title: data.todo, completed: false, id: data.id }])
      })
  }

  const completeTask = task => {
    const newTasks = tasks.map( t => {
      return task.id === t.id ? { title: t.title, completed: !t.completed, id: t.id } : t
    })
    setTasks(newTasks)
  }

 

  

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
                <h2 key={t.id} style={t.completed ? { textDecoration: "line-through" } : null}>
                  {t.title}
                  {!t.completed ? (
                    <Button variant="outlined" onClick={() => completeTask(t)}>
                      Complete task
                    </Button>
                  ) : null}
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
              error={inputError}
              helperText={ inputError ? "You need to write somerthing before" : null}
              variant="outlined"
              inputRef={taskField}
              onKeyDown={e => e.key === 'Enter' ?  addTask() : setInputError(false)}
            />
          </Grid>
          <Grid xs={4}>
            <Button onClick={() => addTask()} variant="contained">
              Add task
            </Button>
            <Button onClick={() => addRandomTask()} variant="outlined">
              Add random task &nbsp;
              {isLoading && <CircularProgress color="primary" size="1rem" />}
            </Button>
          </Grid>
        </Grid>

        <br />
      </Card>
    </div>
  )
}

export default App
