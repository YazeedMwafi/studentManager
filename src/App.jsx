import { useState } from "react";
import StudentList from "./components/StudentList";
import StudentForm from "./components/StudentForm";

function App() {
  const [reloadKey, setReloadKey] = useState(0);

  const refreshList = () => setReloadKey((key) => key + 1);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Student Profiles</h1>
      <StudentForm onStudentAdded={refreshList} />
      <hr />
      <StudentList key={reloadKey} />
    </div>
  );
}

export default App;
