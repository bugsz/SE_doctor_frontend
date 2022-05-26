import request from 'umi-request';
import { useRequest } from 'umi';
import styles from './style.less';

import React, { useState } from 'react';
import { Radio, Switch, Space, Descriptions, message, Avatar, Card, Row, Col } from 'antd';
import type { ProFieldFCMode } from '@ant-design/pro-utils';

import Field from '@ant-design/pro-field';
import { ListDoctorDetails } from "./service";
import {GridContent, PageContainer, RouteContext } from "@ant-design/pro-layout";


const description = (currentDoctor) => {
    return (
    // <div className="site-card-wrapper">
    //     <Row gutter={16}>
    //     <Col span={8}>
    //         <Card bordered={false}>
    //             <Descriptions className={styles.headerList} column={2}>
    //             <Descriptions.Item label="姓名">{currentDoctor.department}</Descriptions.Item>
    //             <Descriptions.Item label="性别">{currentDoctor.gender} </Descriptions.Item>
                
    //             <Descriptions.Item label="年龄">{currentDoctor.age} </Descriptions.Item>

    //             <Descriptions.Item label="职位">{currentDoctor.position} </Descriptions.Item>

    //             <Descriptions.Item label="科室">{currentDoctor.department} </Descriptions.Item>

    //             </Descriptions>
    //         </Card>
    //     </Col>
    //     <Col span={8}>
    //         <Card bordered={false} 
    //             cover={<img src={currentDoctor.photo}/>}
    //             className={styles.avatarHolder}
    //             style={{width: 90, height: 160}} />
    //     </Col>
    //     </Row>
    // </div>

    // <>
    //    <Card bordered={false}>
            <Descriptions className={styles.headerList} column={2}>
            <Descriptions.Item label="日期">{currentDoctor.date}</Descriptions.Item>
            <Descriptions.Item label="科室">{currentDoctor.department}</Descriptions.Item>
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

  // const id = props.match.params.id;
  const {
      data: currentDoctor,
      run: refreshCurrent,
      loading: loadingProject, 
  } = useRequest(
      () => {
    //   const doctor = ListDoctorDetails(props.match.params.id);
    //   console.log(id, doctor);
      return ListDoctorDetails(props.match.params.date);
    },
    {
        onSuccess: (data, param) => {
        if (!data) {
            message.error({
            duration: 4,
            content: '获取项目详情失败，请稍后重试',
            });
            return;
        }
        //注意修改当前的status状态
        // changeProjectStatus(data.type);
        },
        onError: (error, param) => {
        message.error({
            duration: 4,
            content: '获取项目详情失败，请稍后重试',
        });
        },
    },
  );


  const arrangement = ( 
    <h1>如果对排班有问题，请联系陈一航<p>qq邮箱：2503377821@qq.com</p></h1>

  );
  const content = {
      arrangement: arrangement
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
         //extraContent={avatar(currentDoctor)}
         tabList={[
             {
                 key: 'arrangement',
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