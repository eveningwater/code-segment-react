import React from 'react';
import Button from '../../../guide/Button/Button';
import Loader from '../../../guide/Loader/Loader';
import Alert from '../../../guide/Alert/Alert';
import styled from '@emotion/styled';
import useAsync from './useAsync';

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

const FetchImage = styled('img')({
  display: 'block',
  marginTop: 10,
  borderRadius: 5,
  maxWidth: '100%',
});

const Demo = () => {
  const imgFetch = useAsync((url) => fetch(url).then((res) => res.json()));
  return (
    <Container>
      <Button
        onClick={() => imgFetch.run('https://dog.ceo/api/breeds/image/random')}
        disabled={imgFetch?.loading}
      >
        Load image
      </Button>
      {imgFetch?.loading && (
        <LoadContainer>
          <Loader size={16}></Loader>
        </LoadContainer>
      )}
      {imgFetch?.error && (
        <Alert type="error" message={`Error ${imgFetch?.error}`}></Alert>
      )}
      {imgFetch?.value && (
        <FetchImage
          src={imgFetch?.value.message}
          alt="avatar"
          width={400}
          height="auto"
        />
      )}
    </Container>
  );
};

export default Demo;
