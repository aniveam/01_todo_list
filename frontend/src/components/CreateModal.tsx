import { useState } from "react";
import { useTodo } from "../context/TodoContext";
import { TodoType } from "../types/Todo";

interface ICloseModal {
  closeModal: () => void;
}

export default function CreateModal({ closeModal }: ICloseModal) {
  const [description, setDescription] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const { saveTodo } = useTodo();

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (description.trim().length) {
      const todo: TodoType = {
        title,
        description,
        completed: false,
        createdAt: new Date(Date.now()),
      };
      saveTodo(todo);
    }
    closeModal();
  };
  return (
    <div className="w-1/3 fixed top-1/3 left-1/2 -translate-x-1/2 z-20">
      <form onSubmit={handleSubmit}>
        <div className="bg-slate-600 bg-opacity-90 p-4 rounded-md shadow-lg">
          <input
            placeholder="Title"
            value={title}
            className="mb-4 p-2 rounded-md border w-full"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setTitle(e.target.value)
            }
          />
          <textarea
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setDescription(e.target.value)
            }
            placeholder="Description (optional)"
            className="w-full p-2 mb-4 border rounded-md"
          />
          <div className="flex flex-wrap justify-center space-x-2">
            <button className="bg-blue-500 text-white py-2 px-4 mb-1 rounded-md hover:bg-blue-700">
              Save
            </button>
            <button
              onClick={closeModal}
              className="bg-gray-300 py-2 px-4 mb-1 rounded-md hover:bg-gray-400"
            >
              Close
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
