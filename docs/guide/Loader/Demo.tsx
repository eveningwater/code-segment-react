import React, { useState } from 'react';
import { Alert, Space, Spin, Switch } from 'antd';
import Loader from './Loader';
import styled from '@emotion/styled';

const Row = styled.div`
  margin-top: 10px;
`;
const Demo = () => {
  const [loading, setLoading] = useState(true);
  const antIcon = <Loader size={24} spin />;
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Spin tip="Loading..." indicator={antIcon} spinning={loading}>
        <Alert
          message="Alert message title"
          description="Further details about the context of this alert."
          type="info"
        />
      </Spin>
      <Row>
        Loading state：
        <Switch checked={loading} onChange={() => setLoading(!loading)} />
      </Row>
    </Space>
  );
};
export default Demo;
