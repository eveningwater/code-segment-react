import React from 'react';
import useAsync from './useAsync';

const Demo = () => {
  const imgFetch = useAsync((url) => fetch(url).then((res) => res.json()));
  return (
    <div>
      <button
        onClick={() => imgFetch.run('https://dog.ceo/api/breeds/image/random')}
      >
        Load image
      </button>
    </div>
  );
};

export default Demo;
