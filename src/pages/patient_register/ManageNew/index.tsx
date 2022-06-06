import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Button, DatePicker } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import request from 'umi-request';
import type { patientItem } from './data.d';
import { GetDoctorId, GetPatientRegisterList } from './service';

function getPatientInfoUrl(record: patientItem) {
  return `/patient_register/diagnosis/${record.user_id}`;
}

const columns: ProColumns<patientItem>[] = [
  {
    dataIndex: 'index',
    valueType: 'indexBorder',
    width: 48,
  },
  {
    title: '姓名',
    dataIndex: 'user_id',
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
    dataIndex: 'time',
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
let curr_doctor_id = '';

function onChange(date, dateString) {
  curr_date = dateString.replace(/[-_]/g, "");
  console.log(curr_date);
}

const ManageNew = () => {
  const actionRef = useRef<ActionType>();
  const response_me_id = GetDoctorId({}).then(res => {
    curr_doctor_id = res.data.id;
    console.log(curr_doctor_id)
    return res.data.id;
  })

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
        request= {
          async (params = {date:curr_date, doctor_id: curr_doctor_id}, sort, filter) => {
            //let data = Object.assign(params, curr_date, response_me_id)
            console.log(curr_date)
            console.log(curr_doctor_id)
            const response = await GetPatientRegisterList({ ...params, time: curr_date, doctor_id: curr_doctor_id}).then(res => {
              console.log(res)
              // let item:patientItem[]
              // for(var i=0; i<res.data.length; i++){
              //   let tmp: patientItem = {patient_id:"0", patient_name:"0", register_time:"0"};
              //   tmp.patient_id = res.data.user_id[i];
              //   tmp.patient_name = res.data.name[i];
              //   tmp.register_time = res.data.time[i];
              //   console.log(tmp)
              //   item.push(tmp)
              // }
              // console.log(item)
              console.log(res.data)
              const result = {
                data: res.data,
                total: res.data.return_count,
                success: res.success,
                pageSize: res.pageSize,
                current: res.current,
              }
              return result;
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
        rowKey="user_id"
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
