import React from 'react';
import Button from '../../guide/Button/Button';
import Loader from '../../guide/Loader/Loader';
import Alert from '../../guide/Alert/Alert';
import useAsync, { StateType } from './useAsync';
import styled from '@emotion/styled';

const LoadContainer = styled.div`
  margin-top: 10px;
  color: #2396ef;
`;
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  flex-direction: column;
`;
const Demo = () => {
  const imgFetch = useAsync((url) => fetch(url).then((res) => res.json()));
  return (
    <Container>
      <Button
        onClick={() => imgFetch.run('https://dog.ceo/api/breeds/image/random')}
        disabled={(imgFetch as StateType)?.loading}
      >
        加载图片
      </Button>
      {(imgFetch as StateType)?.loading && (
        <LoadContainer>
          <Loader size={16}></Loader>
        </LoadContainer>
      )}
      {(imgFetch as StateType)?.error && (
        <Alert
          type="error"
          message={`错误 ${(imgFetch as StateType)?.error}`}
        ></Alert>
      )}
      {(imgFetch as StateType)?.value && (
        <img
          src={(imgFetch as StateType)?.value.message}
          alt="avatar"
          width={400}
          height="auto"
          style={{
            display: 'block',
            marginTop: 10,
            borderRadius: 5,
            maxWidth: '100%',
          }}
        />
      )}
    </Container>
  );
};

export default Demo;
