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
      <Spin tip="加载中..." indicator={antIcon} spinning={loading}>
        <Alert
          message="提示框消息标题"
          description="有关此提示框上下文的更多详细信息。"
          type="info"
        />
      </Spin>
      <Row>
        加载状态：
        <Switch checked={loading} onChange={() => setLoading(!loading)} />
      </Row>
    </Space>
  );
};
export default Demo;
