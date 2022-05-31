import React, { useRef } from 'react';
import { PlusOutlined, EllipsisOutlined } from '@ant-design/icons';
import { Button, Tag, Space, Menu, Dropdown, notification } from 'antd';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import request from 'umi-request';
import { doctorItem } from './data.js';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { history } from 'umi';
import { DeleteDoctor } from './service';

function getInfoUrl(record: doctorItem) {
  return `/doctor/details/${record.doctor_id}`;
}

function getDeleteUrl(record: doctorItem) {
  return `${record.doctor_id}/delete`;
}

function getEditUrl(record: doctorItem) {
  return `/doctor/edit/${record.doctor_id}`;
}


const deleteDoctor = async (id) => {
  try {
    const msg = await DeleteDoctor({ id });
    if (msg.status === 'success') {
      notification.success({
        duration: 4,
        description: '删除成功',
        message: '删除成功',
      });
      history.push("/doctors");
      // window.history.back();
      // window.location.reload();

    } else {
      notification.error({
        duration: 4,
        message: '删除失败',
        description: msg.msg || '删除错误，未知错误类型',
      });
    }
    // await refreshCurrent();
  } catch (error) {
    notification.error({
      duration: 4,
      message: '删除失败',
      description: '请求失败，请稍后重新尝试',
    });
  }
}

const columns: ProColumns<doctorItem>[] = [
  {
    dataIndex: 'index',
    valueType: 'indexBorder',
    width: 48,
  },
  {
    title: '姓名',
    dataIndex: 'doctor_name',
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
    key: 'doctor_id',
    dataIndex: 'doctor_id',
    // valueType: 'string',
    // sorter: true,
    hideInSearch: true,
  },

  {
    title: '部门',
    key: 'department',
    dataIndex: 'department',
    // valueType: 'string',
    // sorter: true,
    // hideInSearch: true,
  },
  {
    title: '职位',
    dataIndex: 'position',
    // valueType: 'string',
    // hideInTable: true,
    hideInSearch: true
  },
  {
    title: '操作',
    valueType: 'option',
    key: 'option',
    render: (text, record, _, action) => [
      <Link className="to" to={{pathname: getInfoUrl(record)}} key="view">查看</Link>,
      <Link className="to" to={{pathname: getEditUrl(record)}} key="view">编辑</Link>,
      
      <a href={getDeleteUrl(record)} target="_blank" rel="noopener noreferrer" key="view" onClick={
        (e) => {
          e.preventDefault();
          deleteDoctor(record.doctor_id);
        }
      }>
      删除
      </a>,
    ],
  },
];


// const menu = (
//   <Menu>
//     <Menu.Item key="1">1st item</Menu.Item>
//     <Menu.Item key="2">2nd item</Menu.Item>
//     <Menu.Item key="3">3rd item</Menu.Item>
//   </Menu>
// );

const Manage = () => {
  const actionRef = useRef<ActionType>();
  return (
    <ProTable<doctorItem>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      request={async (params = {}, sort, filter) => {
        // console.log(sort, filter);
        // console.log(params);
        // console.log(params.name);
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
      rowKey="doctor_id"
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
      headerTitle="医生列表"
      toolBarRender={() => [
        <Button key="button" icon={<PlusOutlined />} type="primary" onClick={() => {history.push("/doctor/new")}}>
          新建
        </Button>,
        // <Dropdown key="menu" overlay={menu}>
        //   <Button>
        //     <EllipsisOutlined />
        //   </Button>
        // </Dropdown>,
      ]}
    />
  );
};

export default Manage;