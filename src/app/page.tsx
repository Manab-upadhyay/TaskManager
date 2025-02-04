"use client";

import TaskForm from "./components/inputBox";
import { useThemeContext } from "./context/usethemeContext";
import TaskList from "./components/TaskList";
import { FiSun, FiMoon } from 'react-icons/fi';

export default function Home() {
  const { theme, toggleTheme } = useThemeContext();

  return (
    <>
      {/* Apply theme styles here */}
      <div className={`min-h-screen ${theme === 'light' ? 'bg-white' : 'bg-black'} relative`}>
        
        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="absolute top-4 right-4 px-4 py-2 mb-4 border rounded-md bg-gray-200 dark:bg-gray-800 dark:text-white flex items-center justify-center"
        >
          {theme === "light" ? (
            <FiMoon className="text-gray-800 dark:text-white" size={24} />
          ) : (
            <FiSun className="text-gray-800 dark:text-white" size={24} />
          )}
        </button>

        {/* Main Content */}
        <div className={`p-6 ${theme === 'light' ? 'text-black' : 'text-white'}`}>
          <TaskForm />
          <TaskList />
        </div>
      </div>
    </>
  );
}
