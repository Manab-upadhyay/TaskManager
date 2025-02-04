"use client"
import { useState } from "react"

import { Task } from "../model/task"


import useTaskStore from "../zustand/taskstore"
import {toast } from "react-toastify"

export function useInputHandler() {
  // State for task input fields
const {setTaskdata,Taskdata}= useTaskStore()
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [error,setError]= useState("")
 


  // Handlers for updating input fields
  function handleTaskTitleChange(e:React.ChangeEvent<HTMLInputElement>) {
    setTaskTitle(e.target.value);
    console.log("tt",taskTitle)
  }

  function handleTaskDescriptionChange(e:React.ChangeEvent<HTMLTextAreaElement>) {
    setTaskDescription(e.target.value);
    console.log("td",taskDescription)
  }

  function handleDateTimeChange(e:React.ChangeEvent<HTMLInputElement>) {
    setDateTime(e.target.value);
  }
  async function onAddtask() {
    try {
      // Create a task object
      if(!taskTitle || !taskDescription || !dateTime){
        setError("please fill all details")
        return
      }
      setError('')
       
    
      const task = {
        title: taskTitle,
        description: taskDescription,
        dueDate: new Date(dateTime).toISOString(), // Convert to ISO string
        completed: false,
      };

  
      // Insert the task into MongoDB
    //   const { db } = await connectToDatabase();
    //   const result = await db.collection<Task>('tasks').insertOne(task);
  
   
    const response = await fetch("/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task), // Send the task object as JSON
      });

      if (!response.ok) {
        throw new Error("Failed to add task");
      }

      const res1 = await fetch('/api');
      if (!res1.ok) {
        throw new Error("Failed to fetch updated tasks");
      }

   
      const updatedTasks: Task[] = await res1.json();
      console.log("Updated tasks:", updatedTasks);

      
      setTaskdata(updatedTasks);
toast.success("task added")
      // Update the local state with the new task
     
      // Update the local state with the new task
  
      // Clear input fields
      setTaskTitle('');
      setTaskDescription('');
      setDateTime('');
    } catch (error) {
      console.error('Error inserting task:', error);
    }
  }

  // Return state and handlers
  return {
    taskTitle,
    taskDescription,
    dateTime,
    setTaskdata,
    handleTaskTitleChange,
    handleTaskDescriptionChange,
    handleDateTimeChange,
    onAddtask, error,
    Taskdata
  };
}
