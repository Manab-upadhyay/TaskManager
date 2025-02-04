"use client";
import { useEffect } from "react";
import { useFetch } from "../hooks/usefetch";
import { Task } from "../model/task";
import { useListHandler } from "../hooks/uselisthandler";
import useTaskStore from "../zustand/taskstore";
import { FiEdit, FiTrash } from "react-icons/fi";
import DialogBox from "../dialogBox/dialog";

import { useThemeContext } from "../context/usethemeContext";

export default function TaskList() {
  const { data, loading } = useFetch<Task[]>("http://localhost:3000/api");
  const { Taskdata, setTaskdata } = useTaskStore();
  const { theme } = useThemeContext();

  const {
    onMarkComplete,

    editTaskId,

    handleCancel,
    handleEdit,
    handleSave,
    editedTask,
    setEditedTask,
    setDeleteTaskId,
    handleConfirmDelete,
    deleteTaskId,
  } = useListHandler();

  useEffect(() => {
    if (data) setTaskdata(data);
  }, [data]);

  // Loading UI
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  // Empty state UI
  if (Taskdata.length === 0) {
    return (
      <div className="max-w-6xl mx-auto mt-10 px-4">
        <h2
          className={`text-2xl font-semibold mb-6 text-center ${
            theme === "dark" ? "text-white" : "text-black"
          }`}
        >
          Task List
        </h2>
        <div className="text-center text-gray-500">No tasks added yet.</div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4">
      <h2
        className={`text-2xl font-semibold mb-6 text-center ${
          theme === "dark" ? "text-white" : "text-black"
        }`}
      >
        Task List
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Taskdata?.map((task) => (
          <div
            key={task?._id.toString()}
            className={`p-5 border border-gray-300 rounded-lg shadow-md transition duration-300 ${
              task.completed
                ? "bg-green-100" // Completed task stays green
                : theme === "dark"
                ? "bg-black text-white border-white" // Dark theme for incomplete tasks
                : "bg-white" // Light theme for incomplete tasks
            } relative`}
          >
            {/* Top Right Edit & Delete Icons */}
            <div className="absolute top-3 right-3 flex space-x-3">
              {!task.completed && (
                <FiEdit
                  className="cursor-pointer text-blue-500 hover:text-blue-700"
                  onClick={() => handleEdit(task)}
                />
              )}
              <FiTrash
                className="cursor-pointer text-red-500 hover:text-red-700"
                onClick={() => setDeleteTaskId(task._id)} // Set deleteTaskId to open the dialog
              />
            </div>

            {/* Task Content */}
            {editTaskId === task._id.toString() ? (
              <div className="space-y-3">
                {(!editedTask.title.trim() ||
                  !editedTask.description.trim() ||
                  !editedTask.dueDate.trim()) && (
                  <p className="text-red-500">
                    Title, Description, or Due Date cannot be empty
                  </p>
                )}
                <input
                  type="text"
                  className={`w-full px-3 py-2 border mt-3 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 ${
                    theme === "light"
                      ? "bg-white text-black border-black"
                      : "bg-black text-white border-white"
                  }`}
                  value={editedTask.title}
                  onChange={(e) =>
                    setEditedTask({ ...editedTask, title: e.target.value })
                  }
                  placeholder="Task Title"
                />
                <textarea
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 ${
                    theme === "light"
                      ? "bg-white text-black border-black"
                      : "bg-black text-white border-white"
                  }`}
                  value={editedTask.description}
                  onChange={(e) =>
                    setEditedTask({ ...editedTask, description: e.target.value })
                  }
                  placeholder="Task Description"
                />
                <input
                  type="date"
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 ${
                    theme === "light"
                      ? "bg-white text-black border-black"
                      : "bg-black text-white border-white"
                  }`}
                  value={editedTask.dueDate.split("T")[0]}
                  onChange={(e) =>
                    setEditedTask({ ...editedTask, dueDate: e.target.value })
                  }
                />
                <div className="flex justify-end space-x-2">
                  <button
                    className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    onClick={() => handleSave(task._id.toString())}
                    disabled={
                      !editedTask.title.trim() ||
                      !editedTask.description.trim() ||
                      !editedTask.dueDate.trim()
                    }
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <h3
                  className={`text-lg font-bold ${
                    !task.completed && theme === "dark"
                      ? "text-white"
                      : "text-gray-800"
                  }`}
                >
                  {task.title}
                </h3>
                <p
                  className={`mt-2 ${
                    !task.completed && theme === "dark"
                      ? "text-white"
                      : "text-gray-600"
                  }`}
                >
                  {task.description}
                </p>
                <p
                  className={`mt-1 ${
                    !task.completed && theme === "dark"
                      ? "text-white"
                      : "text-gray-500"
                  }`}
                >
                  <strong>Due:</strong> {new Date(task.dueDate).toLocaleDateString()}
                </p>
              </div>
            )}

            {/* Status Button */}
            <div className="mt-4 flex justify-between items-center">
              <span
                className={`px-3 py-1 text-sm font-semibold rounded-full ${
                  task.completed ? "bg-green-600 text-white" : "bg-yellow-500 text-black"
                }`}
              >
                {task.completed ? "Completed" : "Pending"}
              </span>
              {!task.completed && !editTaskId && (
                <button
                  className="bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition duration-300"
                  onClick={() => onMarkComplete(task._id)}
                >
                  {task.completed ? "Mark as Incomplete" : "Mark as Complete"}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Dialog Box */}
      <DialogBox
        isOpen={!!deleteTaskId}
        onClose={() => setDeleteTaskId(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Task"
      >
        Are you sure you want to delete this task? This action cannot be undone.
      </DialogBox>
    </div>
  );
}