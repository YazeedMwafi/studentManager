import { useState } from "react";
import { addStudent } from "./api";

export default function StudentForm({ onStudentAdded }) {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !age) return;

    try {
      await addStudent({ name, age: parseInt(age) });
      setName("");
      setAge("");
      onStudentAdded(); // refresh list
    } catch (err) {
      console.error(err);
      alert("Failed to add student");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Student</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
}
