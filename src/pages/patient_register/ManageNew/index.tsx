import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Button, DatePicker } from 'antd';
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import request from 'umi-request';
import type { patientItem } from './data.d';

function getPatientInfoUrl(record: patientItem) {
  return `/doctor/diagnosis/${record.patient_id}`;
}

const columns: ProColumns<patientItem>[] = [
  {
    dataIndex: 'index',
    valueType: 'indexBorder',
    width: 48,
  },
  {
    title: '姓名',
    dataIndex: 'patient_name',
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
    title: '预约时间段',
    dataIndex: 'register_time',
    // valueType: 'string',
    // hideInTable: true,
    hideInSearch: true,
  },
  {
    title: '操作',
    valueType: 'option',
    key: 'option',
    render: (text, record, _, action) => [
      <Link className="to" to={{ pathname: getPatientInfoUrl(record) }}>
        <Button type="primary" key="primary">
          叫号
        </Button>
      </Link>,
    ],
  },
];

let curr_date = '';
const tmp_depart = 'abcd';

function onChange(date, dateString) {
  console.log(date, dateString);
  curr_date = dateString;
}

const ManageNew = () => {
  const actionRef = useRef<ActionType>();
  return (
    <div>
      <DatePicker onChange={onChange} picker="day" />,
      <ProTable<patientItem>
        columns={columns}
        actionRef={actionRef}
        cardBordered
        // TODO: add current user's department; current date
        request={async (params = { date: curr_date, department: tmp_depart }, sort, filter) => {
          //params = {date : curr_date, department : tmp_depart}
          // console.log(sort, filter);
          // console.log(params);
          // console.log(params.name);
          return request<{
            data: patientItem[];
          }>('/api/register/get', {
            params,
          });
        }}
        editable={{
          type: 'single',
        }}
        columnsState={{
          persistenceKey: 'pro-table-singe-demos',
          persistenceType: 'localStorage',
          onChange(value) {
            console.log('value: ', value);
          },
        }}
        rowKey="patient_id"
        search={false}
        pagination={{
          pageSize: 5,
          onChange: (page) => console.log(page),
        }}
        dateFormatter="string"
        headerTitle="患者挂号名单"
      />
    </div>
  );
};

export default ManageNew;
