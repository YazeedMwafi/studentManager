import { useState } from "react";
import StudentList from "./components/StudentList";
import StudentForm from "./components/StudentForm";
import "./App.css"; // Make sure to create this for styling

function App() {
  const [reloadKey, setReloadKey] = useState(0);

  const refreshList = () => setReloadKey((key) => key + 1);

  return (
    <div className="app-container">
      <h1>Student Management System</h1>
      <div className="content">
        <div className="form-section">
          <StudentForm onStudentAdded={refreshList} />
        </div>
        <div className="list-section">
          <StudentList key={reloadKey} />
        </div>
      </div>
    </div>
  );
}

export default App;