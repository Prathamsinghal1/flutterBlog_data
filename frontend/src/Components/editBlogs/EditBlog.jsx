import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function EditBlog() {
  const { id } = useParams(); // Get the blog ID from the route
  const [blog, setBlog] = useState({ data: [] }); // Initialize with an empty data array
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the blog details by ID
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`http://localhost:1000/api/map-data/${id}`);
        setBlog(response.data); // Assuming response.data contains { data: [...key-value pairs] }
        console.log(response.data);
      } catch (error) {
        toast.error("Failed to fetch blog details. Please try again.", { autoClose: 3000 });
      }
    };

    fetchBlog();
  }, [id]);

  // Handle input change for key-value pairs in the mapdata
  const handleMapRowChange = (key, value) => {
    const updatedData = blog.data.map((item) =>
      item.key === key ? { ...item, value } : item
    );
    setBlog({
      ...blog,
      data: updatedData,
    });
  };

  // Add a new map row (key-value pair)
  const addMapRow = () => {
    setBlog({
      ...blog,
      data: [...blog.data, { key: "newKey", value: "" }],
    });
  };

  // Remove a row by key
  const removeMapRow = (key) => {
    const updatedData = blog.data.filter((item) => item.key !== key);
    setBlog({
      ...blog,
      data: updatedData,
    });
  };

  // Handle saving the edited blog
  const handleEditBlog = async () => {
    if (blog.data.length > 0) { // Ensure there is data to save
      try {
        const updatedBlog = { data: blog.data };
        const response = await axios.put(`http://localhost:1000/api/map-data/${id}`, updatedBlog);
        toast.success(response.data.message, { autoClose: 3000 });
        setTimeout(() => {
          navigate("/"); // Redirect after successful update
        }, 3000);
      } catch (error) {
        toast.error("Failed to update blog. Please try again.", { autoClose: 3000 });
      }
    } else {
      toast.error("Please fill out the map data.", { autoClose: 3000 });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-200 via-pink-200 to-red-200 flex items-center justify-center">
      <div className="my-8 bg-white rounded-lg shadow-lg p-8 w-full max-w-3xl">
        <h1 className="text-3xl font-bold text-purple-700 mb-6 text-center">Edit Blog</h1>
        <div className="space-y-6">
          <div className="p-4 border rounded-lg shadow-md bg-gray-50 space-y-4">
            {/* Dynamically render key-value pairs in blog.data */}
            {blog.data.map((item, index) => (
              <div key={index} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder={`Enter key for map row ${index + 1}`}
                    value={item.key} // Display the key
                    onChange={(e) => {
                      const newKey = e.target.value;
                      const updatedData = blog.data.map((dataItem) =>
                        dataItem.key === item.key
                          ? { ...dataItem, key: newKey }
                          : dataItem
                      );
                      setBlog({
                        ...blog,
                        data: updatedData, // Update the key in mapdata
                      });
                    }}
                    className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <textarea
                    rows={5}
                    placeholder={`Enter value for ${item.key}`}
                    value={item.value || ""}
                    onChange={(e) => handleMapRowChange(item.key, e.target.value)}
                    className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                {/* Add the remove button next to each row */}
                <div className="flex justify-between items-center mt-2">
                  <button
                    onClick={() => removeMapRow(item.key)} // Remove the row
                    className="text-red-600 hover:text-red-800 text-sm font-semibold"
                  >
                    Remove Row
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center mt-6">
            <button
              onClick={addMapRow}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md"
            >
              Add New Row
            </button>
            <button
              onClick={handleEditBlog}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md"
            >
              Save Changes
            </button>
          </div>
        </div>
        {message && <p className="text-gray-700 mt-4">{message}</p>}
      </div>
      <ToastContainer />
    </div>
  );
}
