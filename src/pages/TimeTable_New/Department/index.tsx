import React, { useRef } from 'react';
import { PlusOutlined, EllipsisOutlined } from '@ant-design/icons';
import { Button, Tag, Space, Menu, Dropdown, notification } from 'antd';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import request from 'umi-request';
import { departmentItem } from './data.js';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { history } from 'umi';
// import { DeleteDoctor } from './service';

function getInfoUrl(record: departmentItem) {
  return `/TimeTable_Change/manage/${record.department}`;
}

const columns: ProColumns<departmentItem>[] = [
  {
    dataIndex: 'index',
    valueType: 'indexBorder',
    width: 48,
  },
  {
    title: '主科室',
    dataIndex: 'main_department',
    copyable: true,
    ellipsis: true,
    // tip: '标题过长会自动收缩',
    // formItemProps: {
    //   rules: [
    //     {
    //       required: true,
    //       message: '此项为必填项',
    //     },
    //   ],
    // },
  },
  {
    title: '次科室',
    key: 'department',
    dataIndex: 'department',
    copyable: true,
    ellipsis: true,
    // valueType: 'string',
    // sorter: true,
    hideInSearch: false,
  },
  {
    title: '操作',
    valueType: 'option',
    key: 'option',
    render: (text, record, _, action) => [
      <Link className="to" to={{pathname: getInfoUrl(record)}} key="view">查看{record.department}排班</Link>,
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

const Department = () => {
  const actionRef = useRef<ActionType>();
  return (
    <ProTable<departmentItem>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      request={async (params = {}, sort, filter) => {
        return request<{
          data: departmentItem[];
        }>('/api/TimeTable_Change/getDepartment', {
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
      rowKey="department"
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
      headerTitle="科室列表"
      toolBarRender={() => [
        // <Button key="button" icon={<PlusOutlined />} type="primary">
        //   新建
        // </Button>,
        // <Dropdown key="menu" overlay={menu}>
        //   <Button>
        //     <EllipsisOutlined />
        //   </Button>
        // </Dropdown>,
      ]}
    />
  );
};

export default Department;