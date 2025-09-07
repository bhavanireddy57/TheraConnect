
/*import React from "react";
import { useParams, Link } from "react-router-dom";

const AnonymousSharing = () => {
  const { username } = useParams();

  const links = [
    { name: "Create a post", to: `/${username}/createanonymouspost` },
    { name: "View all anonymous posts", to: `/${username}/allanonymousposts` },
  ];

  return (
    <div className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32 min-h-screen">
      <img
        src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2830&h=1500&q=80&blend=111827&sat=-100&exp=15&blend-mode=multiply"
        alt="Background"
        className="absolute inset-0 -z-10 h-full w-full object-cover object-center"
      />
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-4xl font-bold text-white sm:text-6xl">
            Anonymous Sharing Portal
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            Share your thoughts freely or browse posts from others.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
          <div className="grid grid-cols-1 gap-6 text-base font-semibold leading-7 text-white sm:grid-cols-2 md:flex lg:gap-10">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.to}
                className="hover:text-indigo-400 transition-colors"
              >
                {link.name} <span aria-hidden="true">&rarr;</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnonymousSharing;*/



/*import React from "react";
import { useParams, Link } from "react-router-dom";

const AnonymousSharing = () => {
  const { username } = useParams();

  const links = [
    { 
      name: "Create a Post", 
      description: "Write your thoughts safely and anonymously.", 
      to: `/${username}/createanonymouspost` 
    },
    { 
      name: "View All Posts", 
      description: "Explore what others have shared in the community.", 
      to: `/${username}/allanonymousposts` 
    },
  ];

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-6 lg:px-8 text-center">
       
        <h2 className="text-4xl font-bold tracking-tight text-gray-800 sm:text-6xl">
          Anonymous Sharing Portal
        </h2>
        <p className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
          A safe and supportive space 🌸. Share freely without judgment, or 
          discover stories from others who feel just like you.
        </p>

        
        <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2">
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.to}
              className="group relative rounded-2xl bg-white shadow-lg hover:shadow-xl transition transform hover:-translate-y-2 p-8 text-left"
            >
              <h3 className="text-2xl font-semibold text-gray-800">
                {link.name}
              </h3>
              <p className="mt-3 text-gray-600">{link.description}</p>
              <span className="mt-5 inline-block text-indigo-500 font-medium group-hover:text-indigo-600">
                Go &rarr;
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnonymousSharing;*/



import React from "react";
import { useParams, Link } from "react-router-dom";

const AnonymousSharing = () => {
  const { username } = useParams();

  const links = [
    {
      name: "Create a Post",
      description: "Write your thoughts safely and anonymously.",
      to: `/${username}/createanonymouspost`,
      color: "bg-pink-200 hover:bg-pink-300"
    },
    {
      name: "View All Posts",
      description: "Explore what others have shared in the community.",
      to: `/${username}/allanonymousposts`,
      color: "bg-blue-200 hover:bg-blue-300"
    },
  ];

  return (
    <div className="relative min-h-screen bg-gray-50 py-16 flex items-center justify-center">
      <div className="max-w-4xl w-full px-6 text-center space-y-8">
        
        {/* Title */}
        <h2 className="text-3xl font-bold text-gray-800">
          Anonymous Sharing Portal
        </h2>
        <p className="text-base text-gray-600 max-w-xl mx-auto">
          A safe and supportive space 🌸. Share freely without judgment, or 
          discover stories from others who feel just like you.
        </p>

        {/* Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.to}
              className={`${link.color} rounded-xl shadow-md p-6 text-left transition transform hover:-translate-y-1 hover:shadow-lg`}
            >
              <h3 className="text-lg font-semibold text-gray-800">{link.name}</h3>
              <p className="mt-2 text-sm text-gray-700">{link.description}</p>
              <span className="mt-4 inline-block text-sm font-medium text-gray-900">
                Open →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnonymousSharing;

