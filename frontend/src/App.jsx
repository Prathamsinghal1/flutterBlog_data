import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Home from './Components/Home/Home';
import SearchBlogs from './Components/getBlogs/SearchBlogs';
import BlogDetails from './Components/getBlogs/BlogDetails';
import AddBlog from './Components/createBlogs/AddBlog';
import EditBlog from './Components/editBlogs/EditBlog';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/search-blogs" element={<SearchBlogs />} />
        <Route path="/add-blog" element={<AddBlog />} />
        <Route path="/blogs/blog-details/:id" element={<BlogDetails />} />
        <Route path="/edit-blog/:id" element={<EditBlog />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
