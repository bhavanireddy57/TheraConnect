/*import React from 'react';

const Home2 = () => {
  return (
    <section class="bg-gray-800 dark:bg-gray-800">
    <div class="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-6">
        <div class="mx-auto mb-8 max-w-screen-sm lg:mb-16">
            <h2 class="mb-4 text-4xl tracking-tight font-extrabold  text-white">Mental Health</h2>
            <p class="font-light sm:text-xl text-white">Read about some mental health related topics</p>
        </div> 
        <div class="grid gap-8 lg:gap-16 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <div class="text-center text-gray-500 dark:text-gray-400">
                <img class="mx-auto mb-4 w-36 h-36 rounded-full" src="https://img.freepik.com/premium-vector/adhd-attention-disorder-prevent-adhd-vector-stock-illustration_100456-10568.jpg" alt="Bonnie Avatar" />
                <h3 class="mb-1 text-2xl font-bold tracking-tight text-gray-900 text-white">
                    ADHD
                </h3>
                <a className='cursor-pointer' href='https://applications.emro.who.int/docs/EMRPUB_leaflet_2019_mnh_214_en.pdf'>Read More</a>
                
            </div>
            <div class="text-center text-gray-500 dark:text-gray-400">
                <img class="mx-auto mb-4 w-36 h-36 rounded-full" src="https://st4.depositphotos.com/23877174/25249/v/450/depositphotos_252490948-stock-illustration-depression-icon-vector-from-human.jpg" alt="Helene Avatar" />
                <h3 class="mb-1 text-2xl font-bold tracking-tight text-gray-900 text-white">
                    Depression
                </h3>
                <a className='cursor-pointer' href='https://www.who.int/news-room/fact-sheets/detail/depression'>Read More</a>
                
            </div>
            <div class="text-center text-gray-500 dark:text-gray-400">
                <img class="mx-auto mb-4 w-36 h-36 rounded-full" src="https://i0.wp.com/www.additudemag.com/wp-content/uploads/2021/07/GettyImages-1250310797.jpg" alt="Jese Avatar" />
                <h3 class="mb-1 text-2xl font-bold tracking-tight text-gray-900 text-white">
                    Bipolar Disorder
                </h3>
                <a className='cursor-pointer' href='https://applications.emro.who.int/docs/EMRPUB_leaflet_2019_mnh_216_en.pdf'>Read More</a>
                
            </div>
            <div class="text-center text-gray-500 dark:text-gray-400">
                <img class="mx-auto mb-4 w-36 h-36 rounded-full" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIB4hzxb2gqZY1oD5Key0bryI_xkC_0IUY3LObg_y2Hg&s" alt="Joseph Avatar" />
                <h3 class="mb-1 text-2xl font-bold tracking-tight text-gray-900 text-white">
                    PTSD
                </h3>
                <a className='cursor-pointer' href='https://applications.emro.who.int/docs/WHOEMMNH235E-eng.pdf?ua=1'>Read More</a>
               
            </div>
            <div class="text-center text-gray-500 dark:text-gray-400">
                <img class="mx-auto mb-4 w-36 h-36 rounded-full" src="https://i0.wp.com/mindsitenews.org/wp-content/uploads/2023/09/shutterstock_1519533587-schizophrenia.jpeg?resize=780%2C780&ssl=1" alt="Sofia Avatar" />
                <h3 class="mb-1 text-2xl font-bold tracking-tight text-gray-900 text-white">
                    Schizophrenia
                </h3>
                <a className='cursor-pointer' href='https://www.who.int/news-room/fact-sheets/detail/schizophrenia'>Read More</a>
                
            </div>
            <div class="text-center text-gray-500 dark:text-gray-400">
                <img class="mx-auto mb-4 w-36 h-36 rounded-full" src="https://static01.nyt.com/images/2022/01/19/well/19good-anxiety/19good-anxiety-mediumSquareAt3X-v3.jpg" alt="Leslie Avatar" />
                <h3 class="mb-1 text-2xl font-bold tracking-tight text-gray-900 text-white">
                    Anxiety
                </h3>
                <a className='cursor-pointer' href='https://www.who.int/news-room/fact-sheets/detail/anxiety-disorders'>Read More</a>
                
            </div>
            <div class="text-center text-gray-500 dark:text-gray-400">
                <img class="mx-auto mb-4 w-36 h-36 rounded-full" src="https://zinc.ca/wp-content/uploads/2023/04/zinc-eating-disorders.jpg" alt="Michael Avatar" />
                <h3 class="mb-1 text-2xl font-bold tracking-tight text-gray-900 text-white">
                    Eating Disorder
                </h3>
                <a className='cursor-pointer' href='https://www.nimh.nih.gov/health/statistics/eating-disorders'>Read More</a>
                
            </div>
            <div class="text-center text-gray-500 dark:text-gray-400">
                <img class="mx-auto mb-4 w-36 h-36 rounded-full" src="https://etimg.etb2bimg.com/photo/99479867.cms" alt="Neil Avatar" />
                <h3 class="mb-1 text-2xl font-bold tracking-tight text-gray-900 text-white">
                    Paranoia
                </h3>
                <a className='cursor-pointer' href='https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6420131/'>Read More</a>
            
            </div>
        </div>  
    </div>
  </section>
  )
}

export default Home2;*/



import React from "react";

const topics = [
  {
    title: "ADHD",
    img: "https://img.freepik.com/premium-vector/adhd-attention-disorder-prevent-adhd-vector-stock-illustration_100456-10568.jpg",
    link: "https://applications.emro.who.int/docs/EMRPUB_leaflet_2019_mnh_214_en.pdf",
  },
  {
    title: "Depression",
    img: "https://st4.depositphotos.com/23877174/25249/v/450/depositphotos_252490948-stock-illustration-depression-icon-vector-from-human.jpg",
    link: "https://www.who.int/news-room/fact-sheets/detail/depression",
  },
  {
    title: "Bipolar Disorder",
    img: "https://i0.wp.com/www.additudemag.com/wp-content/uploads/2021/07/GettyImages-1250310797.jpg",
    link: "https://applications.emro.who.int/docs/EMRPUB_leaflet_2019_mnh_216_en.pdf",
  },
  {
    title: "PTSD",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIB4hzxb2gqZY1oD5Key0bryI_xkC_0IUY3LObg_y2Hg&s",
    link: "https://applications.emro.who.int/docs/WHOEMMNH235E-eng.pdf?ua=1",
  },
  {
    title: "Schizophrenia",
    img: "https://i0.wp.com/mindsitenews.org/wp-content/uploads/2023/09/shutterstock_1519533587-schizophrenia.jpeg?resize=780%2C780&ssl=1",
    link: "https://www.who.int/news-room/fact-sheets/detail/schizophrenia",
  },
  {
    title: "Anxiety",
    img: "https://static01.nyt.com/images/2022/01/19/well/19good-anxiety/19good-anxiety-mediumSquareAt3X-v3.jpg",
    link: "https://www.who.int/news-room/fact-sheets/detail/anxiety-disorders",
  },
  {
    title: "Eating Disorder",
    img: "https://zinc.ca/wp-content/uploads/2023/04/zinc-eating-disorders.jpg",
    link: "https://www.nimh.nih.gov/health/statistics/eating-disorders",
  },
  {
    title: "Paranoia",
    img: "https://etimg.etb2bimg.com/photo/99479867.cms",
    link: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6420131/",
  },
];

const Home2 = () => {
  return (
    <section className="bg-gradient-to-b from-white to-blue-50 py-16 px-6">
      <div className="mx-auto max-w-6xl text-center">
        {/* Title */}
        <h2 className="mb-4 text-4xl font-bold tracking-tight text-gray-800">
          Mental Health Topics
        </h2>
        <p className="mb-12 text-lg text-gray-600">
          Explore articles and trusted resources on common mental health
          conditions
        </p>

        {/* Grid */}
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {topics.map((topic, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-6 flex flex-col items-center text-center"
            >
              <img
                className="w-28 h-28 rounded-full object-cover mb-4"
                src={topic.img}
                alt={topic.title}
              />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {topic.title}
              </h3>
              <a
                href={topic.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 font-medium hover:underline"
              >
                Read More →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Home2;
