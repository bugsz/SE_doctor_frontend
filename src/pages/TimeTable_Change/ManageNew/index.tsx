import { ArrowLeftOutlined, PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Button, notification } from 'antd';
import moment from 'moment';
import React, { FC, useRef } from 'react';
import { Link } from 'react-router-dom';
import { history, request, useParams } from 'umi';
import { DoctorDetailType, scheduleItem } from '../data.js';
import { DeleteSchedule, ListSchedule } from '../service';

function getInfoUrl(record: scheduleItem) {
  return `/TimeTable_Change/details`;
}

function getDeleteUrl(record: scheduleItem) {
  return `${record.date}/delete`;
}

function getEditUrl(record: scheduleItem) {
  return `/TimeTable_Change/edit/${record.date}`;
}

const deleteSchedule = async (id: string) => {
  try {
    const msg = await DeleteSchedule({ id });
    if (msg.status === 'success') {
      notification.success({
        duration: 4,
        description: '删除成功',
        message: '删除成功',
      });
      history.push('/doctors');
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
};

const columns: ProColumns<scheduleItem>[] = [
  {
    dataIndex: 'index',
    valueType: 'indexBorder',
    width: 48,
  },
  {
    title: '日期',
    dataIndex: 'date',
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
    title: '时间段',
    key: 'section',
    dataIndex: 'time',
    // valueType: 'string',
    // sorter: true,
    hideInSearch: true,
  },
  {
    title: '医生',
    key: 'doctor',
    dataIndex: 'doctor_name',
    copyable: true,
    // valueType: 'string',
    // sorter: true,
    // hideInSearch: true,
  },
  {
    title: '操作',
    valueType: 'option',
    key: 'option',
    render: (text, record, _, action) => [
      <Link className="to" to={{ pathname: getInfoUrl(record) }} key="view">
        查看
      </Link>,
      <Link
        className="to"
        to={{
          pathname: '/TimeTable_Change/edit',
          query: {
            name: record.doctor_name,
            date: record.raw_date,
            time: record.time,
            doc_id: record.doctor_id,
          },
        }}
        key="view"
      >
        编辑
      </Link>,

      <a
        href={getDeleteUrl(record)}
        target="_blank"
        rel="noopener noreferrer"
        key="view"
        onClick={(e) => {
          e.preventDefault();
          deleteSchedule(record.date);
        }}
      >
        删除
      </a>,
    ],
  },
];

interface IParam {
  department: string;
}

let department: string;

const ManageNew: FC = () => {
  const actionRef = useRef<ActionType>();
  department = useParams<IParam>().department;

  return (
    <ProTable<scheduleItem>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      request={async (params = {}, sort, filter) => {
        const response = await ListSchedule({ ...params, dept_id: department }).then(
          async (res: { data: scheduleItem[]; status: number; msg: string }) => {
            console.log(res.data);

            let _data_promise = await res.data.map(async (item) => {
              /// re-format date string...
              item.raw_date = item.date;
              item.date = moment(item.date).format('yyyy年MM月DD日');

              /// calculate doctor name...
              let doctor_detail: { data: DoctorDetailType; status: number; msg: string } =
                await request('/api/doctor/details', {
                  method: 'GET',
                  params: { doctor_id: item.doctor_id },
                });

              item.doctor_name = doctor_detail.data.name;

              console.log(item);

              return item;
            });

            let _data: scheduleItem[] = [];

            for (let i = 0; i < _data_promise.length; i = i + 1) {
              _data.push(await _data_promise[i]);
            }

            const result = {
              data: _data,
              total: _data.length,
              status: res.status == 100,
              pageSize: 20,
            };
            return result;
          },
        );
        return Promise.resolve(response);
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
      rowKey="date"
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
      headerTitle="排班列表"
      toolBarRender={() => [
        <Button
          key="button"
          icon={<ArrowLeftOutlined />}
          type="primary"
          onClick={() => {
            history.push('/TimeTable_Change');
          }}
        >
          返回科室列表
        </Button>,
        <Button
          key="button"
          icon={<PlusOutlined />}
          type="primary"
          onClick={() => {
            history.push('/TimeTable_Change/new');
          }}
        >
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

export default ManageNew;
