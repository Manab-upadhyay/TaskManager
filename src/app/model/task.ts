// src/models/Task.ts

import { ObjectId } from "mongodb";


export interface Task {
    _id: ObjectId ; // Optional because MongoDB will generate an `_id`
    title: string;
    description: string;
    dueDate: string; // Use `string` for input, convert to `Date` for MongoDB
    completed: boolean;
}