import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Home() {
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    async function fetchBlogs() {
      const response = await axios.get('/api/blog');
      setBlogs(response.data.data);
    }
    fetchBlogs();
  }, []);

  const addBlog = async () => {
    const response = await axios.post('/api/blog', { title, content });
    setBlogs([...blogs, response.data.data]);
    setTitle('');
    setContent('');
  };

  const deleteBlog = async (id) => {
    await axios.delete(`/api/blog/${id}`);
    setBlogs(blogs.filter(blog => blog._id !== id));
  };

  return (
    <div>
      <h1>Blog App</h1>
      <form onSubmit={(e) => { e.preventDefault(); addBlog(); }}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Blog Title"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Blog Content"
        />
        <button type="submit">Add Blog</button>
      </form>
      <h2>Blogs</h2>
      <ul>
        {blogs.map(blog => (
          <li key={blog._id}>
            <h3>{blog.title}</h3>
            <p>{blog.content}</p>
            <button onClick={() => deleteBlog(blog._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}