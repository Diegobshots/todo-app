import { useState, useRef } from 'react'

export const useTasks = () => {

    const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem('todos')) ?? [])
    const [isLoading, setIsLoading] = useState(false)
    const taskField = useRef("")
    const [inputError, setInputError] = useState(false)


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

    return { tasks, addTask, addRandomTask, completeTask, isLoading, inputError, taskField, setInputError }
}