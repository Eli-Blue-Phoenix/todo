import { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { TextField, Button, Grid } from '@mui/material';
import styled from '@emotion/styled';
import Taskitem from './components/Taskitem';
import useLocalStorage from './hooks/useLocalStorage';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [tasks, setTasks] = useLocalStorage ("tasks",[]);
  
  const [taskName, setTaskName] =useState("");
  
  const fetchTasks = async () => {
    const response = await fetch("http://my-craft-project.ddev.site/tasks.json");
    const tasks = await response.json();
    console.log("TASKSFORMAPI", tasks);

    if (tasks?.data) {
      setTasks(tasks.data);
    }

    

    
    }
  
    useEffect(() => {
      fetchTasks();
    }, []);

const valueChange = (event) => {
  const newValue = event.target.value;
  setTaskName(newValue);
}

  const handleAddTask = (e, task) => {
    e.preventDefault();
    const newTasks = [...tasks];

    newTasks.unshift ({
      id: uuidv4(),
      name: task,
    });

    setTasks(newTasks);
    setTaskName("");
  }
  
  console.log(taskName);
  
  
return (
    <div className="App">
      <div id="todo-app">
        <form>
          <Grid container justifyContent={"center"}>
            <Grid item>
              <TextField 
                type='text' 
                id='new task' 
                placeholder='Eneter a New Task'
                value={taskName}
                onChange={valueChange} 
              />
            </Grid>
          <Grid item>
            <Button 
              id="add-task" 
              onClick={(e) => handleAddTask (e, taskName)}>
              Create Task</Button>
          </Grid>
        </Grid>
          
          
          
          
          
          
          
          
          
          <ul id="task-list">
            {tasks.map((task, index) => {
              return (
                <Taskitem key={`task-${task.id}-${index}`} task={task} tasks={tasks} setTasks={setTasks} index={index}/>
              )
            })}
          </ul>
        </form>
      </div>
    </div>
  );

          }
export default App;

const StyledButton = styled (Button)`
border-color: green;

`;