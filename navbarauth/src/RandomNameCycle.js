import React, { useState, useEffect } from 'react';

const RandomNameCycle = ({ names }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [randomizedNames, setRandomizedNames] = useState([]);
  const [isComplete, setIsComplete] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const formatDate = (date) => {
      const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const dayOfWeek = daysOfWeek[date.getDay()];
      const day = date.getDate();
      const month = date.toLocaleString('default', { month: 'long' });
      const suffix = getNumberSuffix(day);

      return `${dayOfWeek} ${day}${suffix} ${month}`;
    };

    const getNumberSuffix = (number) => {
      if (number >= 11 && number <= 13) {
        return 'th';
      }

      const lastDigit = number % 10;
      switch (lastDigit) {
        case 1:
          return 'st';
        case 2:
          return 'nd';
        case 3:
          return 'rd';
        default:
          return 'th';
      }
    };

    const intervalId = setInterval(() => {
      setCurrentDate(formatDate(new Date()));
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const randomizeNames = () => {
    const shuffledNames = shuffleArray(names);
    setRandomizedNames(shuffledNames);
    setCurrentIndex(0);
    setIsComplete(false);
    setIsStarted(true);
  };

  const nextName = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
    if (currentIndex === names.length - 1) {
      setIsComplete(true);
    }
  };

  const restartProcess = () => {
    setCurrentIndex(0);
    setIsComplete(false);
    setIsStarted(false);
  };

  const shuffleArray = (array) => {
    const shuffled = array.slice();
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const namesLeft = names.length - currentIndex - 1;
  const isLastName = namesLeft === 0;

  return (
    <div>
      <h2>Today's Date: {currentDate}</h2>
      {!isStarted && (
        <button onClick={randomizeNames}>
          {isComplete ? 'Start Over' : 'Start'}
        </button>
      )}
      {isStarted && !isComplete && (
        <div>
          <button onClick={nextName}>
            {isLastName ? 'Last' : 'Next'}
          </button>
          <p>{isLastName ? 'Last name' : `${namesLeft} names left`}</p>
        </div>
      )}
      {isComplete && (
        <div>
          <button onClick={restartProcess}>Start Over</button>
          <p>Complete</p>
        </div>
      )}
      {randomizedNames.length > 0 && !isComplete && (
        <h2>{randomizedNames[currentIndex]}</h2>
      )}
    </div>
  );
};

export default RandomNameCycle;