import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function BlogSearchPage() {
  const [searchQuery, setSearchQuery] = useState(""); // Search query input by the user
  const [blogs, setBlogs] = useState([]); // Transformed blogs data
  const [filteredBlogs, setFilteredBlogs] = useState([]); // Blogs filtered based on the search query

  // Fetch blogs from the backend
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("http://localhost:1000/api/map-data");

        // Transform data to include only title and description
        const transformedBlogs = response.data.map((item) => {
          const titleObj = item.data.find((entry) => entry.key === "title");
          const descriptionObj = item.data.find((entry) => entry.key === "description");

          return {
            id: item._id,
            title: titleObj ? titleObj.value : "No title available",
            description: descriptionObj ? descriptionObj.value : "No description available",
          };
        });

        setBlogs(transformedBlogs);
        setFilteredBlogs(transformedBlogs);
      } catch (error) {
        console.error("Error fetching blogs:", error); // Log error for debugging
      }
    };

    fetchBlogs();
  }, []);

  // Dynamically filter blogs based on the search query
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredBlogs(blogs); // Show all blogs if the search query is empty
    } else {
      const results = blogs.filter((blog) =>
        [blog.title, blog.description].some((value) =>
          value.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      setFilteredBlogs(results);
    }
  }, [searchQuery, blogs]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-indigo-200 to-red-200 p-8">
      <div className="w-full max-w-6xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-extrabold text-purple-700 mb-6 text-center">Search Blogs</h1>
        
        <div className="flex gap-4 items-center mb-6">
          <input
            type="text"
            placeholder="Search by title or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800"
          />
          <button
            onClick={() => setSearchQuery("")}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition font-semibold"
          >
            Clear
          </button>
        </div>

        {filteredBlogs.length > 0 ? (
          <div className="overflow-hidden border rounded-lg overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="bg-indigo-200">
                  <th className="p-4 text-gray-800 font-semibold text-left">Title</th>
                  <th className="p-4 text-gray-800 font-semibold text-left">Description</th>
                  <th className="p-4 text-gray-800 font-semibold text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBlogs.map((blog) => (
                  <tr
                    key={blog.id}
                    className="hover:bg-indigo-50 transition-colors text-gray-700"
                  >
                    <td className="p-4 font-medium">{blog.title}</td>
                    <td className="p-4 text-sm text-gray-600">{blog.description}</td>
                    <td className="p-4 text-center">
                      <Link
                        to={`/blogs/blog-details/${blog.id}`}
                        className="text-white bg-indigo-500 hover:bg-indigo-600 text-sm whitespace-nowrap px-4 py-1 rounded-md font-semibold"
                      >
                        Learn More
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-600 mt-4 text-center">
            {searchQuery
              ? "No results found for your search."
              : "Start searching for blogs by title or description!"}
          </p>
        )}
      </div>
    </div>
  );
}
