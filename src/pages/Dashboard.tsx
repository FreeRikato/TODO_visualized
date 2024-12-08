// src/components/Todo.tsx
import { useState, useEffect } from 'react';
import { auth } from '../firebaseConfig';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

interface TodoItem {
  id: number;
  text: string;
  completed: boolean;
}

const DashboardPage = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [input, setInput] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate('/login');
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [navigate]);

  const handleAddTodo = () => {
    if (input.trim() === '') return;
    const newTodo: TodoItem = {
      id: Date.now(),
      text: input.trim(),
      completed: false,
    };
    setTodos([newTodo, ...todos]);
    setInput('');
  };

  const toggleCompletion = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (err: any) {
      console.error('Error signing out:', err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">My Todo List</h2>
          <button
            onClick={handleSignOut}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200"
          >
            Sign Out
          </button>
        </div>
        <div className="flex mb-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add a new todo"
            className="flex-grow px-3 py-2 border rounded-l focus:outline-none focus:ring focus:border-blue-300"
          />
          <button
            onClick={handleAddTodo}
            className="bg-blue-600 text-white px-4 py-2 rounded-r hover:bg-blue-700 transition duration-200"
          >
            Add
          </button>
        </div>
        {todos.length === 0 ? (
          <p className="text-gray-500">No todos yet. Add one!</p>
        ) : (
          <ul>
            {todos.map((todo) => (
              <li
                key={todo.id}
                className="flex items-center justify-between mb-2 p-2 border rounded"
              >
                <span
                  className={`flex-grow ${
                    todo.completed ? 'line-through text-gray-500' : ''
                  }`}
                  onClick={() => toggleCompletion(todo.id)}
                >
                  {todo.text}
                </span>
                <button
                  onClick={() => toggleCompletion(todo.id)}
                  className={`px-2 py-1 rounded ${
                    todo.completed
                      ? 'bg-yellow-300 hover:bg-yellow-400'
                      : 'bg-green-300 hover:bg-green-400'
                  } transition duration-200`}
                >
                  {todo.completed ? 'Undo' : 'Complete'}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
