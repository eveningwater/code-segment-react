import React from 'react';
import useFetch from './useFetch';
import { Spin } from 'antd';

const Demo = () => {
  const res = useFetch('https://dog.ceo/api/breeds/image/random', {});
  if (!res.response) {
    return <Spin tip="图片加载中....."></Spin>;
  }
  const imageUrl = res.response?.message;
  return (
    <div>
      <img src={imageUrl} alt="avatar" width={400} height="auto" />
    </div>
  );
};

export default Demo;
