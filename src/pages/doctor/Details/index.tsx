import request from 'umi-request';
import { useRequest } from 'umi';
import styles from './style.less';

import React, { useState } from 'react';
import { Radio, Switch, Space, Descriptions, message, Avatar, Card, Row, Col } from 'antd';
import type { ProFieldFCMode } from '@ant-design/pro-utils';

import { ListDoctorDetails, ListDoctorSchedule } from "../service";
import {GridContent, PageContainer, RouteContext } from "@ant-design/pro-layout";

import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';


const description = (currentDoctor) => {
    return (
            <Descriptions className={styles.headerList} column={2}>
            <Descriptions.Item label="姓名">{currentDoctor.name}</Descriptions.Item>
            <Descriptions.Item label="工号">{currentDoctor.doctor_id}</Descriptions.Item>
            <Descriptions.Item label="性别">{currentDoctor.gender} </Descriptions.Item>
            <Descriptions.Item label="年龄">{currentDoctor.age} </Descriptions.Item>
            <Descriptions.Item label="职位">{currentDoctor.position} </Descriptions.Item>
            <Descriptions.Item label="科室">{currentDoctor.dept_id} </Descriptions.Item>

            </Descriptions>
    //    </Card>

    //     <Card cover={<img src={currentDoctor.photo}/>} />


    //     {/* <Avatar className={styles.avatarHolder} src={currentDoctor.photo} /> */}
        
    // </>
    )
};

const avatar = (currentDoctor) => {
    const photo = 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png'
    return (
        <img className={styles.moreInfo} src={photo} />
        // <Avatar className={styles.moreInfo} src={currentDoctor.photo}/>
    );
}

const Details: FC = (props) => {
  const [state, setState] = useState<ProFieldFCMode>('read');
  const [plain, setPlain] = useState<boolean>(false);
  const [tabStatus, setTabStatus] = useState({
    tabActiveKey: 'schedule',
  });
  const [currentDoctor, setCurrentDoctor] = useState({});
  const [currentSchedule, setCurrentSchedule] = useState([]);
  const [tableListDataSource, setTableListDataSource] = useState([]);


  // const id = props.match.params.id;


  const createScheduleList = () => {
    setTableListDataSource([]);
    let dataSource = []
    const schedule = currentSchedule
    for (let i = 0; i < schedule.length; i += 1) {
      dataSource.push({
        name: currentDoctor ? currentDoctor.name : '未知',
        department: currentDoctor ? currentDoctor.dept_id : '未知',
        schedule: transform(schedule[i]),
        availability: schedule[i].availability,
      });
    }
    console.log(dataSource)
    setTableListDataSource(dataSource)
  };

  const getSchedule = async () => {
    // console.log(loadingProject);
    await ListDoctorSchedule(props.match.params.id).then((res) => {
      console.log(res)
      const schedule = Array.from(res.data.arrangement_list);
      setCurrentSchedule(schedule);
      console.log(schedule);
    });
  }

  const getDetail = async () => {
    console.log(loadingProject);
    await ListDoctorDetails(props.match.params.id)
      .then((res) => {
        console.log(res);
        setCurrentDoctor(res.data);
      })
  };

  // const get = async () => {
  //   getSchedule()
  //   getDetail()
  // }

  const { run: refreshCurrent, loading: loadingProject } = useRequest(getDetail, {
    onError: (error, param) => {
      message.error({
        duration: 4,
        content: '获取医生详情失败，请稍后重试',
      });
    },
  });

  const { loading: loadingSchedule } = useRequest(getSchedule, {
    onError: (error, param) => {
      message.error({
        duration: 4,
        content: '获取排班信息失败，请稍后重试',
      });
    }},
  );

  const transform = (item) => {
    let time_str, date_str;
    if (item.time == "morning") 
      time_str = "上午";
    else if (item.time == "afternoon")
      time_str = "下午";
    else if (item.time == "evening")
      time_str = "晚上"
    else time_str = item.time
    // switch (item.time) {
    //   case "morning":
    //     time_str = '上午';
    //     break;
    //   case "afternoon":
    //     time_str = '下午';
    //     break;
    //   case "night":
    //     time_str = '晚上';
    //     break;
    //   default:
    //     time_str = '未知';
    //     break;
    // }

    date_str = item.schedule_id;
    return date_str + ' ' + time_str;
  };

  const schedule = (
    //{
    <>
      {loadingSchedule ? null : currentSchedule.length === 0 ? (
        <div>暂无排班</div>
      ) : (
        currentSchedule.map((item, index) => {
          return (
            <div key={index}>
              <p>{transform(item)}</p>
            </div>
          );
        })
      )}
    </>
  );

  

  const scheduleList = (
    <ProTable<any>
      columns={[
        {
          dataIndex: 'name',
          title: '姓名',
        },
        {
          dataIndex: 'department',
          title: '部门',
        },
        {
          dataIndex: 'schedule',
          title: '时间',
        },
        {
          title: '余量',
          dataIndex: 'availability',
        },
      ]}
      request={(params, sorter, filter) => {
        // 表单搜索项会从 params 传入，传递给后端接口。
        console.log(params, sorter, filter);
        createScheduleList();
        return Promise.resolve({
          data: tableListDataSource,
          success: true,
          total: tableListDataSource.length,
        });
      }}
      rowKey="outUserNo"
      pagination={{
        showQuickJumper: true,
      }}
      toolBarRender={false}
      search={false}
    />
  );

  const content = {
      schedule: scheduleList
  };
  const onTabChange = (tabActiveKey) => {
      setTabStatus({ ...tabStatus, tabActiveKey });
  }



  return (
    <>
      {loadingProject || loadingSchedule ? null : (
        <PageContainer
          className={styles.pageHeader}
          title={'基本信息'}
          content={description(currentDoctor)}
          tabActiveKey={tabStatus.tabActiveKey}
          onTabChange={onTabChange}
          extraContent={avatar(currentDoctor)}
          tabList={[
            {
              key: 'schedule',
              tab: '排班',
            },
          ]}
        >
          {content[tabStatus.tabActiveKey]}
          {/* <Space>
        <Radio.Group onChange={(e) => setState(e.target.value as ProFieldFCMode)} value={state}>
          <Radio value="read">只读</Radio>
          <Radio value="edit">编辑</Radio>
        </Radio.Group>
        简约模式
        <Switch checked={plain} onChange={(checked) => setPlain(checked)} />
      </Space>
      <br />
      <br /> */}

      
    </PageContainer>
    )}
    </>
    
  );
};

export default Details;
