import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Admin.css";

function Admin() {
  const [isAdmin, setIsAdmin] = useState(null);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [tasks, setTasks] = useState([]); 
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      setIsAdmin(false);
      return;
    }

    axios.post("http://localhost:8000/checkAdmin.php", { id: user.id })
      .then((response) => {
        setIsAdmin(response.data.is_admin === 1);
      })
      .catch((error) => {
        console.error("Error", error);
        setIsAdmin(false);
      });
  }, []);

  useEffect(() => {
    if (isAdmin === false) {
      navigate("/home");
    }

    if (isAdmin === true) {
      fetchUsers();
    }
  }, [isAdmin, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  }

  const handleHome = () => {
    navigate("/home");
  }

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8000/getUsers.php");
      setUsers(response.data);
    } catch (error) {
      console.error("Error", error);
    }
  };

  const fetchTasks = async (userId) => {
    try {
      const response = await axios.get("http://localhost:8000/getTasks.php", {
        params: { user_id: userId }
      });
      setTasks(response.data);
    } catch (error) {
      console.error("Error", error);
    }
  };

  const handleSelectUser = (user) => {
    setSelectedUser(user);
    fetchTasks(user.id);
  };

  const handleDeleteTask = async (taskId) => {
    if (!taskId) return;

    try {
      const response = await axios.post("http://localhost:8000/deleteTask.php", { task_id: taskId });

      if (response.data.success) {
        fetchTasks(selectedUser.id);
      } else {
        console.error("Error", response.data.message);
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  if (isAdmin === null) {
    return <h1>Error</h1>;
  }

  return (
    <div className="admin-container">
      {isAdmin ? (
        <>
        <div className="navbar">
          <h2>Admin Panel</h2>
          <button className="btn btn-danger" onClick={handleLogout} id="buttonLogout">Logout</button>
          <button className="btn btn-warning" onClick={handleHome} id="buttonHome">Home</button>
        </div>

        <div className="admin-content">
          <div className="user-list">
            <h3>Users:</h3>
            {users.map(user => (
              <ul>
                <li>
                  <button className="btn btn-success" key={user.id} onClick={() => handleSelectUser(user)}>
                  {user.username}
                  </button>
                </li>
              </ul>
            ))}
          </div>

          <div className="task-list">
            {selectedUser ? (
            <>
            <h3>{selectedUser.username} tasks:</h3>
            <table>
              <thead>
                <tr>
                  <th id="TitleTable">Title</th>
                  <th>Task</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map(task => (
                <tr key={task.id}>
                  <td>{task.title}</td>
                  <td>{task.task} <button className="btn btn-danger" onClick={() => handleDeleteTask(task.id)}>x</button></td>
                </tr>
                ))}
              </tbody>
            </table>
            </>
            ) : (
            <>
            <h3>Select user</h3>
              <table>
                <thead>
                  <tr>
                    <th id="TitleTable">Title</th>
                    <th>Task</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.map(task => (
                  <tr key={task.id}>
                    <td>{task.title}</td>
                    <td>{task.task} <button className="btn btn-danger" onClick={() => handleDeleteTask(task.id)}>x</button></td>
                  </tr>
                  ))}
                </tbody>
              </table>
              </>
              )}
          </div>
        </div>
        </>
        ) : (
        <h1>Access denied</h1>
      )}
    </div>
  );
}

export default Admin;