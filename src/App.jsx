import React, { useEffect, useState } from "react";

const App = () => {
  const [input, setinput] = useState("");
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || [],
  );
  const [editId, setEditId] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleAddorUpdate = () => {
    if (input.trim() != "") {
      if (editId == "") {
        const newTasks = [
          ...tasks,
          { name: input, id: Date.now(), isComplete: false },
        ];
        setTasks(newTasks);
      } else {
        const newTasks = tasks.map((el) => {
          if (el.id == editId) {
            return { ...el, name: input };
          }
          return el;
        });
        setEditId("");
        setTasks(newTasks);
      }
    } else {
      alert("Please Enter the task");
    }
    setinput("");
  };

  const handleDel = (id) => {
    const newtasks = tasks.filter((el) => {
      return el.id !== id;
    });
    setTasks(newtasks);
  };

  const HandleCheckbox = (task) => {
    const newTasks = tasks.map((el) => {
      if (el.id === task.id) {
        return { ...el, isComplete: !el.isComplete };
      }
      return el;
    });
    setTasks(newTasks);
  };

  const handleEdit = (task) => {
    setinput(task.name);
    setEditId(task.id);
  };

  return (
    <div className=" bg-zinc-800 min-h-[90vh] w-full max-w-4xl p-4 sm:p-8 rounded-lg shadow-xl flex flex-col  ">
      <h1 className="font-bold text-2xl sm:text-4xl text-white text-center mb-6">
        To Do List
      </h1>

      {/* Input Group */}
      <div className="flex flex-col sm:flex-row mb-6 gap-2">
        <input
          type="text"
          onChange={(e) => setinput(e.target.value)}
          value={input}
          className="flex-1 bg-zinc-400 placeholder-zinc-100 p-3 text-lg sm:text-xl outline-none text-white rounded"
          placeholder="Add a new task..."
        />
        <button
          onClick={() => handleAddorUpdate()}
          className="bg-violet-500 hover:bg-violet-600 text-white font-bold text-xl ml-1.5 px-4 py-2 cursor-pointer w-25 rounded-xl transition-colors shrink-0"
        >
          {editId ? "Update" : "Add"}
        </button>
      </div>

      {/* Show Todo */}
      <div className="w-full flex-1 overflow-y-auto text-white flex flex-col gap-3">
        {tasks.map((task) => {
          return (
            <div
              key={task.id}
              className="w-full flex items-start justify-between gap-3 border p-3 rounded bg-zinc-900 border-zinc-700 hover:border-violet-400 transition-all"
            >
              <div className="flex items-start gap-3 min-w-0 ">
                <input
                  type="checkbox"
                  checked={task.isComplete}
                  onChange={() => HandleCheckbox(task)}
                  className="shrink-0 w-4 mt-1 h-4 accent-violet-700 cursor-pointer"
                />
                <span
                  className={` break-all   sm:text-lg ${
                    task.isComplete ? "line-through text-zinc-500" : ""
                  }`}
                >
                  {task.name}
                </span>
              </div>

              <div className="flex gap-4 mt-1 shrink-0 ml-2">
                <button
                  onClick={() => handleEdit(task)}
                  className="hover:scale-110 transition-transform"
                >
                  <i
                    className="fa-solid fa-pen-to-square fa-lg cursor-pointer"
                    style={{ color: "rgb(177, 151, 252)" }}
                  ></i>
                </button>
                <button
                  onClick={() => handleDel(task.id)}
                  className="hover:scale-110 "
                >
                  <i
                    className="fa-solid fa-trash fa-lg cursor-pointer"
                    style={{ color: "rgb(177, 151, 252)" }}
                  ></i>
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <div className=" w-full flex justify-center mt-6 pb-2 ">
        <button
          className="bg-violet-500 hover:bg-violet-600 mt-3.5  text-white font-bold text-xl text-center p-4 rounded-xl transition-colors cursor-pointer"
          onClick={() => setTasks([])}
        >
          Remove All
        </button>
      </div>
    </div>
  );
};

export default App;
