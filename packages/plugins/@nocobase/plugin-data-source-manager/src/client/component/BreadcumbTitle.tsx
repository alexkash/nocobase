import { RightOutlined } from '@ant-design/icons';
import { useApp, useCompile, useDataSourceManager } from '@nocobase/client';
import { Breadcrumb, Space, Tag } from 'antd';
import React, { useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { DataSourceContext } from '../DatabaseConnectionProvider';
import { NAMESPACE, lang } from '../locale';
import { statusEnum } from '../schema';

export const BreadcumbTitle = () => {
  const app = useApp();
  const { name } = useParams();
  const compile = useCompile();
  const dm = useDataSourceManager();
  const { displayName } = dm.getDataSource(name) || {};
  const { dataSource } = useContext(DataSourceContext);
  const { status } = dataSource || dm.getDataSource(name);
  const option = statusEnum.find((v) => v.value === status);
  return (
    <Breadcrumb
      separator={<RightOutlined />}
      items={[
        { title: <Link to={app.pluginSettingsManager.getRoutePath(NAMESPACE)}>{lang('Data source manager')}</Link> },
        {
          title: (
            <Space>
              <span>{compile(displayName)}</span>
              {status && (
                <Tag key={status} color={option?.color}>
                  {compile(option?.label)}
                </Tag>
              )}
            </Space>
          ),
        },
      ]}
    />
  );
};
