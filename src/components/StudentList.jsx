import { useEffect, useState } from "react";
import { fetchStudents } from "./api";

export default function StudentList() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadStudents = async () => {
      try {
        const data = await fetchStudents();
        setStudents(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadStudents();
  }, []);

  if (loading) return <p>Loading students...</p>;
  if (error) return <p className="error">Error: {error}</p>;

  return (
    <div>
      <h2>All Students</h2>
      {students.length === 0 ? (
        <p>No students found</p>
      ) : (
        <ul>
          {students.map((student) => (
            <li key={student.studentId} style={{ color: "black" }}>
              {student.name}, Age: {student.age}
              {student.createdAt && (
                <span> (Created: {new Date(student.createdAt).toLocaleDateString()})</span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}