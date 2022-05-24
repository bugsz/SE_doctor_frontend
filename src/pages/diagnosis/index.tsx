import { PageContainer } from '@ant-design/pro-layout';
import { Avatar, Skeleton, Statistic } from 'antd';
import moment from 'moment';
import type { FC } from 'react';
import type { CurrentUser } from './data';
import styles from './style.less';

const PageHeaderContent: FC<{ currentUser: Partial<CurrentUser> }> = ({ currentUser }) => {
  const loading = currentUser && Object.keys(currentUser).length;
  if (!loading) {
    return <Skeleton avatar paragraph={{ rows: 1 }} active />;
  }
  return (
    <div className={styles.pageHeaderContent}>
      <div className={styles.avatar}>
        <Avatar size="large" src={currentUser.avatar} />
      </div>
      <div className={styles.content}>
        <div className={styles.contentTitle}>
          早安，
          {currentUser.name}医生 ，祝你开心每一天！
        </div>
        {/* <div>
          {currentUser.title} |{currentUser.group}
        </div> */}
      </div>
    </div>
  );
};

const ExtraContent: FC<Record<string, any>> = () => {
  moment.locale('zh-cn');

  return (
    <div className={styles.extraContent}>
      <div className={styles.statItem}>
        <Statistic title={moment().format('yyyy年MM月D日')} value={moment().format('dddd')} />
      </div>
      <div className={styles.statItem}>
        <Statistic title="科室" value={'口腔科'} />
      </div>
    </div>
  );
};

const Diagnosis: FC = () => {
  // const { loading: announceLoading, data: data } = useRequest(queryPatientInfo);

  // const announce = data?.announce;

  // const renderAnnounce = (item: patientInfoType) => {
  //   const events = item.content;
  //   return (
  //     <List.Item key={item.id}>
  //       <List.Item.Meta
  //         avatar={<Avatar src={item.poster.avatar} />}
  //         title={
  //           <span>
  //             <a className={styles.title}>{item.title}</a>
  //             &nbsp;
  //             <br></br>
  //             <span className={styles.event}>{events}</span>
  //           </span>
  //         }
  //         description={
  //           <span className={styles.datetime} title={item.date}>
  //             {moment(item.date).format('yyyy年MM月DD日 HH:mm')}
  //             &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 由
  //             <span className={styles.username}>{item.poster.name}</span>
  //             发布
  //           </span>
  //         }
  //       />
  //     </List.Item>
  //   );
  // };

  return (
    <PageContainer
      content={
        <PageHeaderContent
          currentUser={{
            avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
            name: 'sz',
            userid: '00000001',
            email: 'antdesign@alipay.com',
            // signature: '海纳百川，有容乃大',
            // title: '交互专家',
            // group: '蚂蚁金服－某某某事业群－某某平台部－某某技术部－UED',
          }}
        />
      }
      extraContent={<ExtraContent />}
    >
      {/* <Row gutter={24}>
        <Col xl={16} lg={24} md={24} sm={24} xs={24}>
          <Card
            bodyStyle={{ padding: 0 }}
            bordered={false}
            className={styles.activeCard}
            title="医院信息"
            loading={announceLoading}
          >
            <List<patientInfoType>
              loading={announceLoading}
              renderItem={(item) => renderAnnounce(item)}
              dataSource={announce}
              className={styles.activitiesList}
              size="large"
            />
          </Card>
        </Col>
      </Row> */}
    </PageContainer>
  );
};

export default Diagnosis;
