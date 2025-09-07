
/*import React, { useEffect, useState } from "react";

const API_BASE = "http://localhost:5001";

const AllAnonymousPost = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Optionally pass token if user is logged in
        const token = localStorage.getItem("token");
        const res = await fetch(`${API_BASE}/api/anonymous/all`, {
          headers: token
            ? { Authorization: `Bearer ${token}` }
            : {},
        });

        if (!res.ok) {
          throw new Error(`Server error: ${res.status}`);
        }

        const data = await res.json();

        // Ensure data is always an array
        setPosts(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <div className="mt-20 text-center">Loading posts...</div>;

  return (
    <div className="container mx-auto mt-20 p-4">
      <h2 className="text-2xl font-bold mb-6">All Anonymous Posts</h2>
      {posts.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        posts.map((post) => (
          <div key={post._id} className="border p-4 rounded mb-4">
            <h3 className="font-bold">{post.title}</h3>
            <p>{post.article}</p>
            {post.tags && post.tags.length > 0 && (
              <div className="flex gap-2 mt-2">
                {post.tags.map((tag, idx) => (
                  <span key={idx} className="bg-gray-200 px-2 rounded">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
            <p className="text-gray-500 text-sm mt-1">
              {new Date(post.createdAt).toLocaleString()}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default AllAnonymousPost;*/



import React, { useEffect, useState } from "react";

const API_BASE = process.env.REACT_APP_API_URL;

const AllAnonymousPost = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${API_BASE}/api/anonymous/all`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });

        if (!res.ok) {
          throw new Error(`Server error: ${res.status}`);
        }

        const data = await res.json();
        setPosts(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <div className="mt-20 text-center">Loading posts...</div>;

  return (
    <div className="container mx-auto mt-20 p-4">
      <h2 className="text-2xl font-bold mb-6">All Anonymous Posts</h2>
      {posts.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        posts.map((post) => (
          <div key={post._id} className="border p-4 rounded mb-4">
            <h3 className="font-bold">{post.title}</h3>
            <p>{post.article}</p>
            {post.tags && post.tags.length > 0 && (
              <div className="flex gap-2 mt-2">
                {post.tags.map((tag, idx) => (
                  <span key={idx} className="bg-gray-200 px-2 rounded">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
            <p className="text-gray-500 text-sm mt-1">
              {new Date(post.createdAt).toLocaleString()}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default AllAnonymousPost;




