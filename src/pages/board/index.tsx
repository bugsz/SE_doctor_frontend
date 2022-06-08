import { PageContainer } from '@ant-design/pro-layout';
import { Avatar, Card, Col, List, Row, Skeleton, Statistic } from 'antd';
import moment from 'moment';
import type { FC } from 'react';
import { Link, useModel, useRequest } from 'umi';
import EditableLinkGroup from './components/EditableLinkGroup';
import type { AnnounceType } from './data';
import { queryAnnounce } from './service';
import styles from './style.less';

const links = [
  {
    title: '查看排班',
    href: '/timetable',
  },
  {
    title: '叫号',
    href: '/patient_register',
  },
];

const PageHeaderContent: FC<{ currentUser: API.CurrentUser }> = ({ currentUser }) => {
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
          {currentUser.name}医生，祝你开心每一天！
        </div>
        {/* <div>
          {currentUser.title} |{currentUser.group}
        </div> */}
      </div>
    </div>
  );
};

const ExtraContent: FC<{ currentUser: API.CurrentUser }> = ({ currentUser }) => {
  const loading = currentUser && Object.keys(currentUser).length;

  if (!loading) {
    return <Skeleton avatar paragraph={{ rows: 1 }} active />;
  }

  return (
    <div className={styles.extraContent}>
      <div className={styles.statItem}>
        <Statistic title={moment().format('yyyy年MM月D日')} value={moment().format('dddd')} />
      </div>
      <div className={styles.statItem}>
        <Statistic title="科室" value={currentUser.department} />
      </div>
    </div>
  );
};

const Board: FC = () => {
  const { loading: announceLoading, data: data } = useRequest(queryAnnounce);

  const { currentUser: currentUser } = useModel('@@initialState', (ret) => ret.initialState)!;

  if (currentUser === undefined) {
    throw 'current user undefined?';
  }
  console.log(currentUser);

  const announce = data?.announce;

  const renderAnnounce = (item: AnnounceType) => {
    const events = item.content;

    return (
      <List.Item key={item.id}>
        <List.Item.Meta
          avatar={<Avatar src={item.poster.avatar} />}
          title={
            <span>
              <a className={styles.title}>{item.title}</a>
              &nbsp;
              <br></br><br></br>
              <div className={styles.event} dangerouslySetInnerHTML={{ __html: events }} />
              {/* <span className={styles.event}>{parser.parseFromString(events)}</span> */}
            </span>
          }
          description={
            <span className={styles.datetime} title={item.date}>
              {moment(item.date).format('yyyy年MM月DD日 HH:mm')}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 由
              <span className={styles.username}>{item.poster.name}</span>
              发布
            </span>
          }
        />
      </List.Item>
    );
  };

  return (
    <PageContainer
      content={<PageHeaderContent currentUser={currentUser} />}
      extraContent={<ExtraContent currentUser={currentUser} />}
    >
      <Row gutter={24}>
        <Col xl={16} lg={24} md={24} sm={24} xs={24}>
          <Card
            bodyStyle={{ padding: 0 }}
            bordered={false}
            className={styles.activeCard}
            title="医院信息"
            loading={announceLoading}
          >
            <List<AnnounceType>
              loading={announceLoading}
              renderItem={(item) => renderAnnounce(item)}
              dataSource={announce}
              className={styles.activitiesList}
              size="large"
            />
          </Card>
        </Col>
        <Col xl={8} lg={24} md={24} sm={24} xs={24}>
          <Card
            style={{ marginBottom: 24 }}
            title="便捷导航"
            bordered={false}
            bodyStyle={{ padding: 0 }}
          >
            <EditableLinkGroup links={links} linkElement={Link} />
          </Card>
        </Col>
      </Row>
    </PageContainer>
  );
};

export default Board;
