/* eslint-disable no-console */
import qs from 'qs';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Form, Input, Button, message, Empty, Affix, Spin } from 'antd';
import { RouteComponentProps } from 'react-router-dom';
import { GetHashBlockDetails, HashBlockDetailsResponse } from '@/api/quire';
import request from '@/libs/api';
import { LabelMap } from './config';
import Item from './item';
import './style.scss';

const InputRules = [
  {
    required: true,
    message: '请输入 Block Hash',
    transform: (value: string) => String(value).trim(),
  },
];

type RouterPramas = {
  hash?: string;
};

const DelayTime = 100;

const Quire: React.FC<RouteComponentProps> = ({ history }) => {
  const [data, setData] = useState<HashBlockDetailsResponse>({});
  const [loading, setLoading] = useState(false);
  const keys = useMemo(() => Object.keys(LabelMap) as (keyof HashBlockDetailsResponse)[], [data]);
  const isEmpty = Object.values(data).length === 0;
  const params = qs.parse(history.location.search.slice(1)) as RouterPramas;
  const RequestSuore = useRef<ReturnType<typeof request.getCloseSoure>>();

  const onSubmit = useCallback(
    ({ hash }) => {
      if (RequestSuore.current) RequestSuore.current.cancel('');
      if (params.hash !== hash) history.push(`?hash=${hash}`);

      setLoading(true);
      const suore = request.getCloseSoure();
      RequestSuore.current = suore;
      GetHashBlockDetails(hash, { cancelToken: suore.token })
        .then((res) => setData(res))
        .catch((err) => {
          if (err?.response?.data?.message) message.error(err.response.data.message);
        })
        .finally(() => setLoading(false));
    },
    [params.hash]
  );

  useEffect(() => {
    if (params.hash) onSubmit({ hash: params.hash });
  }, []);

  useEffect(() => {
    return () => {
      RequestSuore.current?.cancel();
    };
  }, []);

  return (
    <div className="page quire">
      <Affix>
        <div className="header flex flex-ac flex-jc">
          <Form layout="inline" onFinish={onSubmit}>
            <Form.Item label="Block Hash" name="hash" rules={InputRules}>
              <Input placeholder="请输入Block Hash" className="input" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block data-testid="submit">
                查询
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Affix>
      <Spin spinning={loading} size="large" delay={DelayTime} tip="努力查询中...">
        <div className="list">
          {keys.map((key) => (
            <Item key={key} label={key} value={data[key]} />
          ))}
          {isEmpty && !loading && (
            <div className="mask">
              <Empty description="暂无数据" />
            </div>
          )}
        </div>
      </Spin>
    </div>
  );
};

export default Quire;
