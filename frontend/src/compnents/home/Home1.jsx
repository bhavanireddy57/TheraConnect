/*import React from 'react'

const Home1 = () => {
  return (
    <div className="relative isolate px-6 pt-14 lg:px-8 ">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">

          </div>
          <div className="text-center -mt-24">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Welcome to Mindfulness.
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
            Welcome to our mental health app, where you can anonymously chat, track your mood, and receive personalized support through quizzes and an AI assistant. Prioritize your emotional well-being discreetly and effectively with our compassionate community.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              
              <a href="/aboutus" className="text-sm font-semibold leading-6 text-gray-900">
                About Us <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
        <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
      </div>
  )
}

export default Home1;*/




import React from "react";
import { motion } from "framer-motion";

const Home1 = () => {
  return (
    <section className="relative isolate px-6 lg:px-8">
      {/* Background Gradient */}
      <div
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-60"
        aria-hidden="true"
      >
        <div
          className="relative left-1/2 aspect-[1155/678] w-[40rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-pink-200 via-purple-200 to-blue-200 opacity-40 sm:w-[70rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-3xl py-32 sm:py-40 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-extrabold tracking-tight text-gray-800 sm:text-6xl"
        >
          Welcome to <span className="text-blue-500">Mindfulness</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl mx-auto"
        >
          Your safe space to anonymously chat, track moods, and receive
          personalized support through guided quizzes and our AI assistant.
          Prioritize your emotional well-being with compassion and care.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mt-10 flex items-center justify-center gap-x-6"
        >
          <a
            href="/aboutus"
            className="rounded-2xl bg-blue-500 px-6 py-3 text-sm font-semibold text-white shadow-md hover:bg-blue-600 transition"
          >
            Learn More
          </a>
          <a
            href="/signup"
            className="text-sm font-semibold leading-6 text-blue-600 hover:underline"
          >
            Get Started →
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Home1;
