import React from 'react';
import RandomNameCycle from './RandomNameCycle';

const App = () => {
  const names = ['Alice', 'Bob', 'Charlie', 'David', 'Eve'];

  return (
    <div>
      <RandomNameCycle names={names} />
    </div>
  );
};

export default App;
