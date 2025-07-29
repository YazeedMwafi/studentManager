const API_BASE_URL = import.meta.env.VITE_API_URL;

export async function fetchStudents() {
  const response = await fetch(`${API_BASE_URL}/students`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to fetch students');
  }
  
  return await response.json();
}

export async function addStudent(student) {
  const response = await fetch(`${API_BASE_URL}/students`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(student),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to add student');
  }
  
  return await response.json();
}