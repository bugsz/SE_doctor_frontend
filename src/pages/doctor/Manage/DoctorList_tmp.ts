import React, { useRef } from 'react';
import { PlusOutlined, EllipsisOutlined } from '@ant-design/icons';
import { Button, Tag, Space, Menu, Dropdown } from 'antd';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import request from 'umi-request';
import { doctorItem } from './data.js';

const columns: ProColumns<doctorItem>[] = [
  {
    dataIndex: 'index',
    valueType: 'indexBorder',
    width: 48,
  },
  {
    title: '姓名',
    dataIndex: 'name',
    copyable: true,
    ellipsis: true,
    // tip: '标题过长会自动收缩',
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此项为必填项',
        },
      ],
    },
  },

  {
    title: '工号',
    key: 'id',
    dataIndex: 'id',
    // valueType: 'string',
    sorter: true,
    hideInSearch: true,
  },

  {
    title: '部门',
    key: 'department',
    dataIndex: 'department',
    // valueType: 'string',
    sorter: true,
    hideInSearch: true,
  },
  {
    title: '职位',
    dataIndex: 'role',
    // valueType: 'string',
    hideInTable: true,
  },
  {
    title: '操作',
    valueType: 'option',
    key: 'option',
    render: (text, record, _, action) => [

      <a href={record.url} target="_blank" rel="noopener noreferrer" key="view">
      删除
      </a>,
      <a href={record.url} target="_blank" rel="noopener noreferrer" key="view">
        查看
      </a>,

    ],
  },
];


const menu = (
  <Menu>
    <Menu.Item key="1">1st item</Menu.Item>
    <Menu.Item key="2">2nd item</Menu.Item>
    <Menu.Item key="3">3rd item</Menu.Item>
  </Menu>
);

const Manage = () => {
  const actionRef = useRef<ActionType>();
  return (
    <ProTable<doctorItem>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      request={async (params = {}, sort, filter) => {
        console.log(sort, filter);
        return request<{
          data: doctorItem[];
        }>('/api/doctor/get', {
          params,
        });
      }}
      editable={{
        type: 'multiple',
      }}
      columnsState={{
        persistenceKey: 'pro-table-singe-demos',
        persistenceType: 'localStorage',
        onChange(value) {
          console.log('value: ', value);
        },
      }}
      rowKey="id"
      search={{
        labelWidth: 'auto',
      }}
    //   form={{
    //     // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
    //     syncToUrl: (values, type) => {
    //       if (type === 'get') {
    //         return {
    //           ...values,
    //           created_at: [values.startTime, values.endTime],
    //         };
    //       }
    //       return values;
    //     },
    //   }}
      pagination={{
        pageSize: 5,
        onChange: (page) => console.log(page),
      }}
      dateFormatter="string"
      headerTitle="高级表格"
      toolBarRender={() => [
        <Button key="button" icon={<PlusOutlined />} type="primary">
          新建
        </Button>,
        <Dropdown key="menu" overlay={menu}>
          <Button>
            <EllipsisOutlined />
          </Button>
        </Dropdown>,
      ]}
    />
  );
};

export default Manage;