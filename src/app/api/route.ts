import { NextRequest,NextResponse } from "next/server"
import { connectToDatabase } from "../lib/db";
import { Task } from "../model/task";

import { ObjectId } from "mongodb";

export async function POST(req: NextRequest) {
    try {
      const body = await req.json(); // Parse the request body
      const { _id, title, description, dueDate } = body;
  
      // Validate required fields
      if (!title || !description || !dueDate) {
        return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
      }
  
      // Create the task object
      const task: Task = {
        _id,
        title,
        description,
        dueDate: new Date(dueDate).toISOString(),
        completed: false, // Default value
      };
  
      // Connect to the database and insert the task
      const { db } = await connectToDatabase();
      const result = await db.collection<Task>("tasks").insertOne(task);
  
      return NextResponse.json({ message: "Task created", task: result }, { status: 201 });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
  }
  export async function GET() {
    try {
      const { db } = await connectToDatabase();
      const tasks = await db.collection<Task>("tasks").find().toArray();
  
      return NextResponse.json(tasks, { status: 200 }); // Correct way to return JSON
    } catch (error) {
      console.error(error);
      return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
  }
  export async function PATCH(req: NextRequest) {
    try {
        // const { searchParams } = new URL(req.url);
        // const id = searchParams.get("id"); 
        const body = await req.json();
       
      const { id, completed, title, description, dueDate } = body;
    

      // Validate ID
      if (!id || !ObjectId.isValid(id)) {
        return new NextResponse("Invalid Task ID", { status: 400 });
      }
  
      const { db } = await connectToDatabase();
  
      // Convert `id` to ObjectId
    
  
      // Dynamically construct the update object
      const updateFields: Partial<Task> = {};
      if (completed !== undefined) updateFields.completed = completed;
      if (title !== undefined) updateFields.title = title;
      if (description !== undefined) updateFields.description = description;
      if (dueDate !== undefined) updateFields.dueDate = dueDate;
  
      if (Object.keys(updateFields).length === 0) {
        return new NextResponse("No fields provided for update", { status: 400 });
      }
  
      // Update the task in the database
      const result = await db.collection<Task>("tasks").updateOne(
        { _id: new ObjectId(id as string) }, // Use the converted ObjectId
        { $set: updateFields }
      );
  
      if (result.matchedCount === 0) {
        return new NextResponse("Task not found", { status: 404 });
      }
  
      return new NextResponse(
        JSON.stringify({ message: "Task updated", result }),
        { status: 200 }
      );
    } catch (error) {
     
      return new NextResponse("Internal server error", { status: 500 });
    }
  }
  export async function DELETE(req:NextRequest){
    try {
        const body= await req.json()
       
        const {id}= body
        const {db}= await connectToDatabase()
        const result= await db.collection<Task>('tasks').deleteOne({_id:new ObjectId(id as string)})
        if(result.deletedCount===0){
            return new NextResponse("Task not found",{status:400})
        }
        return new NextResponse(JSON.stringify({message:"Task Deleted",result}),{status :200})
    } catch (error) {
        console.error("error deleting task",error)
        
        
    }
  }