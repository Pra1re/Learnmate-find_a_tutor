import React from 'react';
import { motion } from 'framer-motion';

const PopularLanguages = () => {
  const languages = [
    {
      name: 'English',
      flag: '🇬🇧',
      description: 'The most widely spoken language in the world. Perfect for beginners and advanced learners.',
    },
    {
      name: 'Spanish',
      flag: '🇪🇸',
      description: 'Learn the second most spoken native language and explore Hispanic cultures.',
    },
    {
      name: 'French',
      flag: '🇫🇷',
      description: 'The language of love, art, and diplomacy. Start your journey today.',
    },
    {
      name: 'German',
      flag: '🇩🇪',
      description: 'Master the language of business and engineering in Europe.',
    },
    {
      name: 'Mandarin',
      flag: '🇨🇳',
      description: 'Unlock opportunities by learning the most spoken language in the world.',
    },
    {
      name: 'Japanese',
      flag: '🇯🇵',
      description: 'Discover the beauty of Japanese culture and language.',
    },
  ];

  // Animation variants for Framer Motion
  const cardVariants = {
    offscreen: {
      y: 50,
      opacity: 0,
    },
    onscreen: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        bounce: 0.4,
        duration: 0.8,
      },
    },
  };

  return (
    <section className=" py-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
      <div className="w-[95%] m-auto container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-12">
          Popular Languages to Learn
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {languages.map((language, index) => (
            <motion.div
              key={index}
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.5 }}
              variants={cardVariants}
              className="flex flex-col justify-between bg-white dark:bg-gray-700 p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105 h-[350px]"
            >
              <div className="text-6xl mb-6 text-center dark:text-white">
                {language.flag}
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4 text-center">
                {language.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6 text-center">
                {language.description}
              </p>
              <div className="text-center">
                <button
                  className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors duration-300"
                >
                  Explore {language.name}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularLanguages;