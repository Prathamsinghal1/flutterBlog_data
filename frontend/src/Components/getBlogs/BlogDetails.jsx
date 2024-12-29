import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const BlogDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:1000/api/map-data/${id}`);
        setBlog(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching blog:", error);
        toast.error("Failed to load blog data.");
        setLoading(false);
      }
    };

    fetchBlogDetails();
  }, [id]);

  const handleCopy = (value) => {
    const textToCopy = typeof value === "object" ? JSON.stringify(value, null, 2) : value;
    navigator.clipboard.writeText(textToCopy);
    toast.success("Copied to clipboard!");
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this blog?");
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:1000/api/map-data/${id}`);
        toast.success("Blog deleted successfully!");
        setTimeout(() => navigate("/"), 3000);
      } catch (error) {
        toast.error("Failed to delete the blog. Please try again.");
      }
    }
  };

  const handleEdit = () => {
    navigate(`/edit-blog/${id}`, { state: { blog } });
  };

  const renderData = (value) => {
    if (value !== null && value !== undefined) {
      return (
        <div className="relative">
          <pre className="p-8 bg-gray-100 text-sm p-4 rounded-lg whitespace-pre-wrap break-words overflow-x-auto">
            {value}
          </pre>
          <button
  onClick={() => handleCopy(value)}
  className="absolute top-0 right-0 bg-gray-300 text-white px-4 rounded-lg hover:bg-gray-400 transition ml-4"
>
  Copy
</button>

        </div>
      );
    }
  
    return <span className="text-gray-700 break-words">No Data</span>;
  };
  

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-indigo-100">
        <p className="text-xl font-semibold text-indigo-600">Loading blog details...</p>
      </div>
    );
  }

  if (!blog || Object.keys(blog).length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-indigo-100">
        <p className="text-red-500 text-xl font-semibold">No blog data available.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-100 p-8 flex flex-col items-center">
      <div className="flex space-x-6 mb-6">
        <button
          onClick={handleEdit}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition"
        >
          Delete
        </button>
      </div>

      <div className="max-w-4xl w-full bg-white p-6 rounded-lg shadow-lg mb-8">
        <h1 className="text-3xl text-center font-bold text-purple-700 mb-6">Blog Details</h1>
        <div className="bg-gray-100 p-6 rounded-lg space-y-6">
          {blog.data &&
            blog.data.map((entry) => (
              <div
                key={entry._id}
                className="flex items-center justify-between p-4 rounded-lg shadow-inner bg-white"
              >
                <div className="w-full">
                  <span className="text-purple-600 font-medium capitalize">{entry.key}</span>
                  {renderData(entry.value)}
                </div>
              </div>
            ))}
        </div>
      </div>
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
    </div>
  );
};

export default BlogDetails;
