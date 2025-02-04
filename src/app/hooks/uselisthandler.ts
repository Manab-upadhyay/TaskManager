
import { ObjectId } from "mongodb";
import { Task } from "../model/task";
import useTaskStore from "../zustand/taskstore";

import { useState } from "react";
import { toast } from "react-toastify";

export function useListHandler() {
  const { setTaskdata,Taskdata } = useTaskStore();
const [editTaskId, setEditTaskId] = useState<string | null>(null);
  const [editedTask, setEditedTask] = useState<{ title: string; description: string; dueDate: string }>({
    title: "",
    description: "",
    dueDate: "",
  });
  const [deleteTaskId, setDeleteTaskId] = useState<ObjectId | null>(null);
  async function onMarkComplete(id: ObjectId) {
    try {
      console.log("calling API to mark task as complete");
      const res = await fetch('/api', {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({  id ,completed: true })
      });

      if (!res.ok) {
        throw new Error("Failed to update task");
      }

     


      
      setTaskdata(Taskdata.map((task)=>task._id==id?{...task,completed:true}:task));
      toast.success("task completed")

     
    } catch (error) {
      console.log("Error marking task as complete:", error);
    }
  }
  async function deleteTask(id:ObjectId){
    try{
        const res= await fetch('/api',{
            method:"DELETE",
            headers:{
                "content-Type":"application/json"
            },
            body:JSON.stringify({id})
        })
        if(!res.ok){
            throw new Error("Failed to detele task")
        }
        console.log("task deleted")
        setTaskdata(Taskdata.filter((task)=>task._id!=id));
        toast.success("task deleted")
    }
    
catch(error){
    console.log(error)
}
  }
  const handleEdit = (task: Task) => {
    setEditTaskId(task._id.toString());
    setEditedTask({ title: task.title, description: task.description, dueDate: task.dueDate });
  };

  const handleCancel = () => {
    setEditTaskId(null);
  };

   const handleSave = async(taskId: string) => {
    try {
        await fetch('/api',{
            method:"PATCH",
            headers:{
                "content-Type":"application/json"
            
            },
            body:JSON.stringify({id:taskId,...editedTask})
        })
        setTaskdata(
            Taskdata.map((task) =>
              task._id.toString() === taskId
                ? { ...task, title: editedTask.title, description: editedTask.description, dueDate: editedTask.dueDate }
                : task
            )
          );
          setEditTaskId(null);
          toast.success("task Updated")
    } catch (error) {
        console.log(error)
    }
    
  };
  const handleConfirmDelete = () => {
    if (deleteTaskId) {
      deleteTask(deleteTaskId);
      setDeleteTaskId(null);
    }
  };


  return { onMarkComplete,deleteTask,editTaskId,setEditTaskId,handleEdit,handleCancel,handleSave,setEditedTask,editedTask,handleConfirmDelete,setDeleteTaskId,deleteTaskId };
}