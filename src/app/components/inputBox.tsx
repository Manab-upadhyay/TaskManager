"use client"; // Marks this file as a client-side component

import { useInputHandler } from "../hooks/useInputHanddler";  // Correct import

import { useThemeContext } from "../context/usethemeContext";

export default function TaskForm() {
  const {
    taskTitle,
    taskDescription,
    dateTime,
    handleTaskTitleChange,
    handleTaskDescriptionChange,
    handleDateTimeChange,
    onAddtask,
 
    error,
  } = useInputHandler();
  const { theme } = useThemeContext();

  return (
    <>
      <div
        className={`max-w-md mx-auto mt-10 p-6 ${
          theme === "light" ? "bg-white text-black border-black" : "bg-black text-white border-background border-white"
        } shadow-lg rounded-lg`}
      >
        <h2
          className={`text-xl font-semibold mb-4 ${
            theme === "light" ? "text-gray-800" : "text-white"
          }`}
        >
          Create a Task
        </h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onAddtask();
          }}
          className="space-y-4"
        >
          {/* Task Title */}
          <div>
            {error && <p className="text-red-500">{error}</p>}

            <label
              className={`block font-medium ${
                theme === "light" ? "text-gray-700" : "text-white"
              }`}
            >
              Task Title
            </label>
            <input
  type="text"
  value={taskTitle}
  onChange={handleTaskTitleChange}
  placeholder="Enter task title"
  className={`w-full px-3 py-2 border 
    rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 ${
      theme === "light" ? "bg-white text-black border-black" : "bg-black text-white border-white"
    }`}
/>
          </div>

          {/* Task Description */}
          <div>
            <label
              className={`block font-medium ${
                theme === "light" ? "text-gray-700" : "text-white"
              }`}
            >
              Task Description
            </label>
            <textarea
              value={taskDescription}
              onChange={handleTaskDescriptionChange}
              placeholder="Enter task description"
              className={`w-full px-3 py-2 border 
                rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 ${
                  theme === "light" ? "bg-white text-black border-black" : "bg-black text-white border-white"
                }`}
            ></textarea>
          </div>

          {/* Date & Time */}
          <div>
            <label
              className={`block font-medium ${
                theme === "light" ? "text-gray-700" : "text-white"
              }`}
            >
              Due Date & Time
            </label>
            <input
              type="datetime-local"
              value={dateTime}
              onChange={handleDateTimeChange}
              className={`w-full px-3 py-2 border 
                rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 ${
                  theme === "light" ? "bg-white text-black border-black" : "bg-black text-white border-white"
                }`}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full py-2 rounded-md transition duration-300 ${
              theme === "light"
                ? "bg-black text-white hover:bg-gray-800"
                : "bg-white text-black hover:bg-gray-200"
            }`}
          >
            Add Task
          </button>
        </form>
      </div>
     
    </>
  );
}
