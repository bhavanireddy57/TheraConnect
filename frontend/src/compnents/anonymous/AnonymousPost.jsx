import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const API_BASE = process.env.REACT_APP_API_URL;

const AnonymousPost = () => {
  const [title, setTitle] = useState("");
  const [article, setArticle] = useState("");
  const [tags, setTags] = useState("");
  const { username } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) return navigate("/unauthorizedAccess");

    try {
      const res = await fetch(`${API_BASE}/api/anonymous/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          article,
          tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
          options: "other",
        }),
      });

      if (!res.ok) throw new Error("Failed to create post");
      navigate(`/${username}/allanonymousposts`, { state: { refresh: true } });
    } catch (err) {
      console.error(err);
      alert("Failed to post. Check server or token.");
    }
  };

  return (
    <div className="container mx-auto mt-20 p-4">
      <h2 className="text-2xl font-bold mb-4">Create Anonymous Post</h2>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-2 border"
          required
        />
        <textarea
          placeholder="Write your post..."
          value={article}
          onChange={(e) => setArticle(e.target.value)}
          className="p-2 border h-40"
          required
        />
        <input
          placeholder="Tags (comma separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="p-2 border"
        />
        <button type="submit" className="bg-indigo-500 text-white p-2">Post</button>
      </form>
    </div>
  );
};

export default AnonymousPost;


