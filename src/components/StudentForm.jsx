import { useState } from "react";
import { addStudent } from "./api";

export default function StudentForm({ onStudentAdded }) {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    if (!name.trim() || !age) {
      setError("Name and age are required");
      return;
    }

    setIsSubmitting(true);
    
    try {
      await addStudent({ 
        name: name.trim(), 
        age: parseInt(age) 
      });
      setName("");
      setAge("");
      onStudentAdded();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Student</h2>
      {error && <p className="error">{error}</p>}
      <div>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={isSubmitting}
        />
      </div>
      <div>
        <input
          type="number"
          placeholder="Age"
          min="1"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          disabled={isSubmitting}
        />
      </div>
      <button type="submit" disabled={isSubmitting || !name.trim() || !age}>
        {isSubmitting ? "Adding..." : "Add Student"}
      </button>
    </form>
  );
}