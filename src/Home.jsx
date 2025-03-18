import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import './Home.css';

function Home() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser) {
      navigate("/");
      return;
    }

    setUser(storedUser);
    fetchTasks(storedUser.id);
  }, [navigate]);

  const fetchTasks = async (userId) => {
    try {
      const response = await axios.get("http://localhost:8000/getTasks.php", {
        params: { user_id: userId }
      });
      setTasks(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error while fetching: ", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  }

  const handleDeleteTask = async (taskId) => {
    if (!taskId) return;

    try {
      const response = await axios.post("http://localhost:8000/deleteTask.php", { task_id: taskId });

      if (response.data.success) {
        console.log("Task deleted");
        fetchTasks(user.id);
      } else {
        console.error("Error while deleting task:", response.data.message);
      }
    } catch (error) {
      console.error("Error while deleting task:", error);
    }
  };

  if (loading) {
    return <h1>Loading</h1>;
  }

  if (!user) {
    return <h1>Error</h1>;
  }

  return (
    <div>
      <div className="navbar">
        <h1 id="welcomeText">Hello {user.username}.</h1>
        <button className="btn btn-danger" onClick={handleLogout} id="buttonLogout">Logout</button>
      </div>

      <div className="tableTask">
        <h2>Tasks:</h2>
        <table>
          <thead>
            <tr>
              <th id="titleTable">Title</th>
              <th>Task</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map(task => (
              <tr key={task.id}>
                <td>{task.title}</td>
                <td>{task.task} <button id="closeTaskButton" className="btn btn-danger" onClick={() => handleDeleteTask(task.id)}><p>x</p></button></td>
              </tr>
            ))}
          </tbody>
        </table>
        <TaskForm userId={user.id} fetchTasks={fetchTasks} />
      </div>
    </div>
  );
}

function TaskForm({ userId, fetchTasks }) {
  const [title, setTitle] = useState("");
  const [task, setTask] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      console.error("User id is missing in local");
      return;
    }

    try {
      await axios.post("http://localhost:8000/addTask.php", {
        user_id: userId,
        title,
        task
      });
      setTitle("");
      setTask("");
      fetchTasks(userId);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3 id="addTaskText">Add task</h3>
      <input type="text" className="form-control" id="inputTitle" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <input type="text" className="form-control" id="inputTask" placeholder="Description" value={task} onChange={(e) => setTask(e.target.value)} required />
      <button type="submit" id="saveTaskButton" className="btn btn-warning">Add</button>
    </form>
  );
}

export default Home;