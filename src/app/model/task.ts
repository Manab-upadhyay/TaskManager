// src/models/Task.ts


export interface Task {
    _id: string ; // Optional because MongoDB will generate an `_id`
    title: string;
    description: string;
    dueDate: string; // Use `string` for input, convert to `Date` for MongoDB
    completed: boolean;
}