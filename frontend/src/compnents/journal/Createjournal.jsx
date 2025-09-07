/*import React, { useState } from 'react';
import Navbar from '../navbar/Navbar';
import { useNavigate } from 'react-router-dom';

const CreateJournal = () => {
  const [title, setTitle] = useState('');
  const [article, setArticle] = useState('');
  const [tags, setTags] = useState('');
  const [coverPicture, setCoverPicture] = useState(null);
  const user = localStorage.getItem('tokenUser');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('article', article);
    formData.append('tags', tags);

    if (coverPicture) {
      formData.append('coverPicture', coverPicture);
    }

    try {
      const response = await fetch(`http://localhost:5001/${user}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${user}`
        },
        body: formData
      });

      if (response.ok) {
        const newJournal = await response.json();
        console.log('Journal created:', newJournal);
        // Clear the form
        setTitle('');
        setArticle('');
        setTags('');
        setCoverPicture(null);
        navigate(`/${user}/profile`);
      } else {
        console.error('Failed to create journal');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleFileChange = (e) => {
    setCoverPicture(e.target.files[0]);
  };

  return (
    <>
      <Navbar />
      <div className="w-screen mt-32">
        <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-md">
        <div className="px-6 py-4" style={{ background: 'linear-gradient(to right, #D1D5DB, #E5E7EB, #F3F4F6)' }}>

            <h2 className="text-2xl font-bold text-gray-800 mb-2">Create Journal</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                  Title
                </label>
                <input
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="title"
                  type="text"
                  placeholder="Enter title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="article">
                  Article
                </label>
                <textarea
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
                  id="article"
                  placeholder="Write your journal here..."
                  value={article}
                  onChange={(e) => setArticle(e.target.value)}
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tags">
                  Tags
                </label>
                <input
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="tags"
                  type="text"
                  placeholder="Enter tags (comma separated)"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="coverPicture">
                  Cover Picture
                </label>
                <input
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="coverPicture"
                  type="file"
                  onChange={handleFileChange}
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                  onClick={() => {
                    setTitle('');
                    setArticle('');
                    setTags('');
                    setCoverPicture(null);
                  }}
                >
                  Cancel
                </button>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateJournal;*/


import React, { useState } from 'react';
import Navbar from '../navbar/Navbar';
import { useNavigate } from 'react-router-dom';

const CreateJournal = () => {
  const [title, setTitle] = useState('');
  const [article, setArticle] = useState('');
  const [tags, setTags] = useState('');
  const [coverPicture, setCoverPicture] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');       // JWT token
    const username = localStorage.getItem('username'); // store username in localStorage

    if (!token || !username) return alert('Login required');

    const formData = new FormData();
    formData.append('title', title);
    formData.append('article', article);
    formData.append('tags', tags);
    if (coverPicture) formData.append('coverPicture', coverPicture);

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/${username}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      });

      if (!res.ok) throw new Error('Failed to create journal');

      const newJournal = await res.json();
      console.log('Journal created:', newJournal);

      // Clear form and navigate
      setTitle(''); setArticle(''); setTags(''); setCoverPicture(null);
      navigate(`/${username}/profile`);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="w-screen mt-32">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4">Create Journal</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="border p-2 rounded"
              required
            />
            <textarea
              placeholder="Write your journal..."
              value={article}
              onChange={e => setArticle(e.target.value)}
              className="border p-2 rounded h-32"
              required
            />
            <input
              type="text"
              placeholder="Tags (comma separated)"
              value={tags}
              onChange={e => setTags(e.target.value)}
              className="border p-2 rounded"
            />
            <input
              type="file"
              onChange={e => setCoverPicture(e.target.files[0])}
            />
            <div className="flex justify-between">
              <button type="button" className="bg-gray-400 px-4 py-2 rounded" onClick={() => {
                setTitle(''); setArticle(''); setTags(''); setCoverPicture(null);
              }}>Cancel</button>
              <button type="submit" className="bg-blue-500 px-4 py-2 text-white rounded">Save</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateJournal;

