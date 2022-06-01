import request from 'umi-request';
import { useRequest } from 'umi';
import styles from './style.less';

import React, { useState } from 'react';
import { Radio, Switch, Space, Descriptions, message, Avatar, Card, Row, Col } from 'antd';
import type { ProFieldFCMode } from '@ant-design/pro-utils';

import { ListDoctorDetails, ListDoctorSchedule } from "./service";
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
    return (
        <img className={styles.moreInfo} src={currentDoctor.photo} />
        // <Avatar className={styles.moreInfo} src={currentDoctor.photo}/>
    );
}

const Details = (props) => {
  const [state, setState] = useState<ProFieldFCMode>('read');
  const [plain, setPlain] = useState<boolean>(false);
  const [tabStatus, setTabStatus] = useState({
    tabActiveKey: 'arrangement',
  });
  const [currentDoctor, setCurrentDoctor] = useState({});
  const [currentSchedule, setCurrentSchedule] = useState([]);
  const [tableListDataSource, setTableListDataSource] = useState([]);

  // const id = props.match.params.id;


  const createScheduleList = () => {
    setTableListDataSource([])
    for (let i=0;i<currentSchedule.length;i+=1) {
      tableListDataSource.push({
        name: currentDoctor?currentDoctor.doctor_name:"未知",
        department: currentDoctor?currentDoctor.department:"未知",
        schedule: transform(currentSchedule[i]),
        availability: currentSchedule[i].availability,
      })
    }
    console.log(tableListDataSource)
  };

  const get = async () => {
    console.log(loadingProject)
    await ListDoctorDetails(props.match.params.id).then(res => {
      console.log(res);
      setCurrentDoctor(res.data);
    }).then(async () => {
      console.log(loadingProject)
      await ListDoctorSchedule(props.match.params.id).then(
        res => {
          const data = Array.from(res.data) 
          setCurrentSchedule(data)
          console.log(currentSchedule)
        })
    })
  };

  const {
      run: refreshCurrent,
      loading: loadingProject, 
  } = useRequest(get,
    {
        onError: (error, param) => {
        message.error({
            duration: 4,
            content: '获取项目详情失败，请稍后重试',
        });
        },
    },
  );

  const transform = (item) => {
    let time_str, date_str
    switch(item.time_id) {
      case 1:
        time_str = "上午"
        break
      case 2:
        time_str = "下午"
        break
      case 3:
        time_str = "晚上"
        break
      default:
        time_str = "未知"
        break
    }

    date_str = item.schedule_id
    return date_str + " " + time_str

  }

  const schedule = (
    //{
      <>{
        loadingProject ? (null) : (
          currentSchedule.length === 0 ? (<div>暂无排班</div>) :
          currentSchedule.map((item, index) => {
            return (
              
              <div key={index}>
                <p>{transform(item)}</p>
              </div>
            )
          })
        )
      }</>
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
          createScheduleList()
          return Promise.resolve({
            data: tableListDataSource,
            success: true,
          });
        }}
        rowKey="outUserNo"
        pagination={{
          showQuickJumper: true,
        }}
        toolBarRender={false}
        search={false}
      />
  )

  const content = {
      schedule: scheduleList
  };
  const onTabChange = (tabActiveKey) => {
      setTabStatus({ ...tabStatus, tabActiveKey });
  }



  return (
    <>
    {loadingProject ? null : (
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
             }
         ]}>
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