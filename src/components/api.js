const API_BASE_URL = import.meta.env.VITE_API_URL;

// Helper function for error handling
const handleResponse = async (response) => {
  if (!response.ok) {
    let errorData;
    try {
      errorData = await response.json();
    } catch (e) {
      errorData = { message: response.statusText };
    }
    const error = new Error(errorData.message || 'Request failed');
    error.status = response.status;
    error.data = errorData;
    throw error;
  }
  return response.json();
};

export async function fetchStudents() {
  try {
    const response = await fetch(`${API_BASE_URL}/students`, {
      headers: {
        'Content-Type': 'application/json',
      },
      // Add these for better error handling
      cache: 'no-store',
      credentials: 'same-origin',
    });
    return await handleResponse(response);
  } catch (error) {
    console.error('API Error - fetchStudents:', error);
    throw new Error(error.message || 'Network error while fetching students');
  }
}

export async function addStudent(student) {
  try {
    if (!student.name || !student.age) {
      throw new Error('Name and age are required');
    }

    const response = await fetch(`${API_BASE_URL}/students`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: student.name.trim(),
        age: Number(student.age),
      }),
    });
    return await handleResponse(response);
  } catch (error) {
    console.error('API Error - addStudent:', error);
    throw error; // Re-throw to let components handle it
  }
}