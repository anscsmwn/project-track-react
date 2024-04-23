import React from "react";
import KanbanCard from "./KanbanCard";
import circleDot from "../../assets/circle-dot.svg";
import circleProgress from "../../assets/circle-progress.svg";
import circleDone from "../../assets/circle-done.svg";
import plusIcon from "../../assets/plus.svg";
import { createTask } from "../../services/KanbanBoard";
import { updateProgress } from "../../services/Student";
import { getUserId } from "../../utils/utils";

const KanbanColumn = ({
  board,
  status,
  tasks,
  initialTasks,
  setInitialTasks,
}) => {
  const [isAdding, setIsAdding] = React.useState(false);
  const [newTaskTitle, setNewTaskTitle] = React.useState("");

  const handleSaveNewTask = async () => {
    if (newTaskTitle === "") {
      setIsAdding(false);
      return;
    }
    const newTask = {
      title: newTaskTitle,
      description: "",
      board_id: board.id,
      status,
    };

    try {
      const newTasks = await createTask({
        title: newTaskTitle,
        description: "",
        board_id: board.id,
        status,
      });
      // Create a new array with the new task added
      const updatedTasks = [...initialTasks, newTasks[0]];
      setInitialTasks(updatedTasks);
      setIsAdding(false);
      const doneTasks = updatedTasks.filter((task) => task.status === "Done");
      const percentage = parseInt(
        (doneTasks.length / updatedTasks.length) * 100
      );
      const idStudent = await getUserId();
      await updateProgress(idStudent, percentage);
    } catch (error) {}
    setNewTaskTitle("");
  };

  return (
    <div className="w-full max-w-72 min-w-max">
      <div className="text-slate-700 flex items-center justify-between gap-2 mb-2 text-sm">
        <div className="flex items-center gap-2">
          {status === "To Do" && (
            <img
              src={circleDot}
              alt="circle dot"
              className="w-4 h-4 opacity-70"
            />
          )}
          {status === "In Progress" && (
            <img
              src={circleProgress}
              alt="circle progress"
              className="w-4 h-4 opacity-70"
            />
          )}
          {status === "Done" && (
            <img
              src={circleDone}
              alt="circle done"
              className="w-4 h-4 opacity-70"
            />
          )}
          <span className="font-semibold">{status}</span>
        </div>
        <span className="opacity-40">{tasks.length}</span>
      </div>
      <div>
        {tasks.map((task) => (
          <KanbanCard
            key={task.id}
            task={task}
            initialTasks={initialTasks}
            setInitialTasks={setInitialTasks}
          />
        ))}
        {isAdding ? (
          <div className="p-2 my-1 w-full rounded-md flex justify-between shadow-sm border border-solid border-zinc-300 text-sm duration-500">
            <input
              type="text"
              value={newTaskTitle}
              onChange={(event) => setNewTaskTitle(event.target.value)}
              onBlur={handleSaveNewTask}
              autoFocus
              onKeyUp={(event) => {
                if (event.key === "Enter") {
                  handleSaveNewTask();
                }
              }}
              placeholder="Enter new task"
              className="w-full bg-transparent outline-none"
            />
          </div>
        ) : (
          <button
            onClick={() => setIsAdding(true)}
            className="w-full flex items-center p-2 hover:bg-gray-100 cursor-pointer transition-all rounded-md gap-2 text-sm text-gray-400"
          >
            <img src={plusIcon} alt="plus" className="w-3 h-3 opacity-45" />
            <p>New</p>
          </button>
        )}
      </div>
    </div>
  );
};

export default KanbanColumn;
