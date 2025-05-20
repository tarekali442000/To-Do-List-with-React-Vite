import { useEffect, useState } from "react";

const ToDoList = () => {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });
  const [newTasks, setNewTasks] = useState("");
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);
  const handleInputChange = (event) => {
    setNewTasks(event.target.value);
  };
  const [toastMessage, setToastMessage] = useState("");

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(""), 2500);
  };
  const addTask = () => {
    if (newTasks.trim() !== "") {
      setTasks([...tasks, newTasks]);
      setNewTasks("");
      showToast("Task added successfully!");
    }
  };
  function deleteTask(index) {
    setTasks(tasks.filter((_, i) => i !== index));
    showToast("Task deleted!");
  }
  function moveTaskUp(index) {
    if (index > 0) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index - 1]] = [
        updatedTasks[index - 1],
        updatedTasks[index],
      ];
      setTasks(updatedTasks);
    }
  }
  function moveTaskDown(index) {
    if (index < tasks.length - 1) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index + 1]] = [
        updatedTasks[index + 1],
        updatedTasks[index],
      ];
      setTasks(updatedTasks);
    }
  }

  return (
    <div className="to-do-list">
      <h2>ToDoList</h2>
      <input
        type="text"
        value={newTasks}
        onChange={handleInputChange}
        placeholder="Enter Task..."
      />
      <button
        style={{ backgroundColor: "#0d6efd", color: "white" }}
        onClick={addTask}
      >
        Add Task
      </button>
      <ul className="task-list">
        {tasks.map((task, index) => (
          <li key={index}>
            <span className="text">{task}</span>
            <button className="delete-button" onClick={() => deleteTask(index)}>
              Delete
            </button>
            <button
              className="move-up-button"
              onClick={() => moveTaskUp(index)}
            >
              ☝
            </button>
            <button
              className="move-down-button"
              onClick={() => moveTaskDown(index)}
            >
              👇
            </button>
          </li>
        ))}
      </ul>
      {toastMessage && <div className={`toast show`}>{toastMessage}</div>}
    </div>
  );
};

export default ToDoList;
