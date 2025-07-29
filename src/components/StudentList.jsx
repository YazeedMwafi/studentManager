import { useEffect, useState } from "react";
import { fetchStudents } from "./api";

export default function StudentList() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudents()
      .then(setStudents)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading students...</p>;

  return (
    <div>
      <h2>All Students</h2>
      <ul>
        {students.map((student) => (
          <li key={student.studentId}>
            {student.name}, Age: {student.age}
          </li>
        ))}
      </ul>
    </div>
  );
}
