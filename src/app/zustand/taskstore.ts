import { create } from 'zustand';

interface Task {
  _id: string // Corrected type
  title: string;
  description: string;
  dueDate: string; // Use string for input, convert to Date for MongoDB
  completed: boolean;
}

interface TaskStore {
  Taskdata: Task[];
  addTask: (task: Task) => void;
  // Changed id to string
  setTaskdata: (tasks: Task[]) => void;
}

const useTaskStore = create<TaskStore>((set) => ({
  Taskdata: [],
  
  addTask: (task) =>
    set((state) => ({
      Taskdata: [...state.Taskdata, task],
    })),



  setTaskdata: (tasks) => set({ Taskdata: tasks }),
}));

export default useTaskStore;
