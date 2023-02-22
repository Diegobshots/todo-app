import { Button, Card, TextField, Container } from "@mui/material"
import LoadingButton from "@mui/lab/LoadingButton"
import LibraryAddIcon from "@mui/icons-material/LibraryAdd"
import LowPriorityIcon from "@mui/icons-material/LowPriority"

import "./App.css"
import { Grid } from "@mui/material"
import { useEffect } from "react"
import { useTasks } from "./hooks/useTasks"
import { useTheme } from "./hooks/useTheme"
import LightModeIcon from "@mui/icons-material/LightMode"
import NightsStaySharpIcon from "@mui/icons-material/NightsStaySharp"

import { ThemeProvider } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"

const App = () => {
  const { theme, changeTheme, darkTheme, lightTheme } = useTheme()

  const {
    tasks,
    addRandomTask,
    addTask,
    completeTask,
    isLoading,
    taskField,
    inputError,
    setInputError,
  } = useTasks()

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(tasks))
  }, [tasks])

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <CssBaseline />
      <Container className="App" sx={{ pb: "2rem" }}>
        <Card variant="outlined" sx={{ p: "2rem", boxShadow: 3, mt: "5rem" }}>
          <Grid container rowGap={4} spacing={1}>
            <Grid xs={12} align={'right'} >
              <Button onClick={changeTheme} endIcon={theme === 'light' ? <NightsStaySharpIcon/> : <LightModeIcon/>}>
                {theme === "light" ? <span>Go dark</span> : <span>Go light</span>}
              </Button>
            </Grid>
            <Grid sx={{ mx: "auto" }} xs={12}>
              <h1>Todo list</h1>
            </Grid>

            <Grid xs={12}>
              <hr />
            </Grid>
            <Grid xs={12}>
              {tasks.map((t) => {
                return (
                  <h2
                    key={t.id}
                    style={
                      t.completed ? { textDecoration: "line-through" } : null
                    }
                  >
                    {t.title}
                    {!t.completed ? (
                      <Button
                        variant="outlined"
                        onClick={() => completeTask(t)}
                      >
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
                helperText={
                  inputError ? "You need to write somerthing before" : null
                }
                variant="outlined"
                inputRef={taskField}
                onKeyDown={(e) =>
                  e.key === "Enter" ? addTask() : setInputError(false)
                }
              />
            </Grid>
            <Grid xs={4}>
              <Button
                onClick={() => addTask()}
                variant="contained"
                endIcon={<LibraryAddIcon />}
              >
                Add task
              </Button>
              <LoadingButton
                sx={{ ml: "1rem" }}
                onClick={() => addRandomTask()}
                loading={isLoading}
                loadingPosition="end"
                endIcon={<LowPriorityIcon />}
              >
                <span>Add random task</span>
              </LoadingButton>
            </Grid>
          </Grid>

          <br />
        </Card>
      </Container>
    </ThemeProvider>
  )
}

export default App
