import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Button, DatePicker } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import request from 'umi-request';
import type { patientItem } from './data.d';
import { GetDoctorId, GetPatientRegisterList } from './service';

function getPatientInfoUrl(record: patientItem) {
  return `/patient_register/diagnosis/${record.patient_id}`;
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
  curr_date = dateString.replace(/[-_]/g, "");
  console.log(curr_date);
}

const ManageNew = () => {
  const actionRef = useRef<ActionType>();
  const response_me_id = GetDoctorId({}).then(res => {
    return res.data.id;
  })
  console.log(response_me_id);

  return (
    <div>
      <DatePicker onChange={onChange} picker="day" />,
      <ProTable<patientItem>
        columns={columns}
        actionRef={actionRef}
        cardBordered
        // TODO: add current user's department; current date
        // request={async (params = { date: curr_date, doctor_id: response_me_id }, sort, filter) => {
        //   //params = {date : curr_date, department : tmp_depart}
        //   // console.log(sort, filter);
        //   // console.log(params);
        //   // console.log(params.name);
        //   return request<{
        //     data: patientItem[];
        //   }>('/api/register/get', {
        //     params,
        //   });
        params = { params }
        request= {
          async (params = {date: curr_date, doctor_id: response_me_id}, sort, filter) => {
            console.log(params)
            console.log()
            const response = await GetPatientRegisterList(params).then(res => {
              console.log(params)
              console.log(res.data)
              let item = []
              for(var i=0; i<res.data.length; i++){
                item[i].patient_id = res.data.patient_id;
                item[i].patient_name = res.data.name;
                item[i].register_time = res.data.time_slice;
              }
              return item;
            })
            return Promise.resolve(response)
          }
        }

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
