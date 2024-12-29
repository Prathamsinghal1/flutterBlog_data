import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export default function AddBlog() {
  const navigate = useNavigate();
  const [mapList, setMapList] = useState([{ key: "", value: "" }]);

  // Add a new row to the map list
  const handleAddRow = () => {
    setMapList([...mapList, { key: "", value: "" }]);
  };

  // Remove a specific row
  const handleRemoveRow = (index) => {
    setMapList(mapList.filter((_, i) => i !== index));
  };

  // Update a specific key or value in the map list
  const handleInputChange = (index, field, value) => {
    const updatedList = mapList.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    setMapList(updatedList);
  };

  // Submit the data to the backend
  const handleSubmit = async () => {
    // Check if all keys and values are filled
    const hasEmptyFields = mapList.some(
      (item) => !item.key.trim() || !item.value.trim()
    );

    if (hasEmptyFields || mapList.length === 0) {
      toast.error("Please fill in all key-value pairs before submitting.", { autoClose: 3000 });
      return;
    }

    try {
      const response = await axios.post("http://localhost:1000/api/map-data", { data: mapList });
      toast.success("Data submitted successfully!", { autoClose: 3000 });
      setTimeout(() => {
        navigate("/")
      }, 3000);
    } catch (error) {
      console.error("Error submitting data:", error);
      toast.error("Failed to submit data. Please try again.", { autoClose: 3000 });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-200 via-pink-200 to-red-200 flex items-center justify-center">
      <div className="my-8 bg-white rounded-lg shadow-lg p-8 w-full max-w-3xl">
        <h1 className="text-3xl font-bold text-purple-700 mb-6 text-center">Dynamic Map Input</h1>
        <div className="space-y-6 h-[60vh] overflow-y-auto">
          {/* Iterate over the mapList array and render each item */}
          {mapList.map((item, index) => (
            <div
              key={index}
              className="p-4 border rounded-lg shadow-md bg-gray-50 space-y-4"
            >
              {/* Layout for Key and Value inputs with grid system */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Key input field */}
                <input
                  type="text"
                  placeholder="Key"
                  value={item.key} // Display the current key
                  onChange={(e) => handleInputChange(index, "key", e.target.value)} // Update the key on change
                  className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />

                {/* Value input field */}
                <textarea
                  placeholder="Value"
                  rows={3}
                  value={item.value} // Display the current value
                  onChange={(e) => handleInputChange(index, "value", e.target.value)} // Update the value on change
                  className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              {/* Button to remove the current row */}
              <button
                onClick={() => handleRemoveRow(index)} // Remove the row based on the index
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-4 rounded-md w-full md:w-auto"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center mt-6">
          <button
            onClick={handleAddRow}
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-md"
          >
            Add Row
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md"
          >
            Submit
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
