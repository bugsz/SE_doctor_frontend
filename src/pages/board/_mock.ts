import type { Request, Response } from 'express';
import moment from 'moment';
import type { DataItem, OfflineDataType, SearchDataType } from './data.d';

// mock data
const visitData: DataItem[] = [];
const beginDay = new Date().getTime();

const fakeY = [7, 5, 4, 2, 4, 7, 5, 6, 5, 9, 6, 3, 1, 5, 3, 6, 5];
for (let i = 0; i < fakeY.length; i += 1) {
  visitData.push({
    x: moment(new Date(beginDay + 1000 * 60 * 60 * 24 * i)).format('YYYY-MM-DD'),
    y: fakeY[i],
  });
}

const visitData2: DataItem[] = [];
const fakeY2 = [1, 6, 4, 8, 3, 7, 2];
for (let i = 0; i < fakeY2.length; i += 1) {
  visitData2.push({
    x: moment(new Date(beginDay + 1000 * 60 * 60 * 24 * i)).format('YYYY-MM-DD'),
    y: fakeY2[i],
  });
}

const salesData: DataItem[] = [];
for (let i = 0; i < 12; i += 1) {
  salesData.push({
    x: `${i + 1}月`,
    y: Math.floor(Math.random() * 1000) + 200,
  });
}
const searchData: SearchDataType[] = [];
for (let i = 0; i < 50; i += 1) {
  searchData.push({
    index: i + 1,
    keyword: `搜索关键词-${i}`,
    count: Math.floor(Math.random() * 1000),
    range: Math.floor(Math.random() * 100),
    status: Math.floor((Math.random() * 10) % 2),
  });
}

const offlineData: OfflineDataType[] = [];
for (let i = 0; i < 10; i += 1) {
  offlineData.push({
    name: `Stores ${i}`,
    cvr: Math.ceil(Math.random() * 9) / 10,
  });
}
const offlineChartData: DataItem[] = [];
for (let i = 0; i < 20; i += 1) {
  offlineChartData.push({
    x: new Date().getTime() + 1000 * 60 * 30 * i,
    y1: Math.floor(Math.random() * 100) + 10,
    y2: Math.floor(Math.random() * 100) + 10,
  });
}

const titles = [
  'Alipay',
  'Angular',
  'Ant Design',
  'Ant Design Pro',
  'Bootstrap',
  'React',
  'Vue',
  'Webpack',
];
const avatars = [
  'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png', // Alipay
  'https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png', // Angular
  'https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png', // Ant Design
  'https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png', // Ant Design Pro
  'https://gw.alipayobjects.com/zos/rmsportal/siCrBXXhmvTQGWPNLBow.png', // Bootstrap
  'https://gw.alipayobjects.com/zos/rmsportal/kZzEzemZyKLKFsojXItE.png', // React
  'https://gw.alipayobjects.com/zos/rmsportal/ComBAopevLwENQdKWiIn.png', // Vue
  'https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png', // Webpack
];

const avatars2 = [
  'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
  'https://gw.alipayobjects.com/zos/rmsportal/cnrhVkzwxjPwAaCfPbdc.png',
  'https://gw.alipayobjects.com/zos/rmsportal/gaOngJwsRYRaVAuXXcmB.png',
  'https://gw.alipayobjects.com/zos/rmsportal/ubnKSIfAJTxIgXOKlciN.png',
  'https://gw.alipayobjects.com/zos/rmsportal/WhxKECPNujWoWEFNdnJE.png',
  'https://gw.alipayobjects.com/zos/rmsportal/jZUIxmJycoymBprLOUbT.png',
  'https://gw.alipayobjects.com/zos/rmsportal/psOgztMplJMGpVEqfcgF.png',
  'https://gw.alipayobjects.com/zos/rmsportal/ZpBqSxLxVEXfcUNoPKrz.png',
  'https://gw.alipayobjects.com/zos/rmsportal/laiEnJdGHVOhJrUShBaJ.png',
  'https://gw.alipayobjects.com/zos/rmsportal/UrQsqscbKEpNuJcvBZBu.png',
];

const getNotice = (_: Request, res: Response) => {
  res.json({
    data: [
      {
        id: 'xxx1',
        title: titles[0],
        logo: avatars[0],
        description: '那是一种内在的东西，他们到达不了，也无法触及的',
        date: new Date(),
        member: '科学搬砖组',
        href: '',
        memberLink: '',
      },
      {
        id: 'xxx2',
        title: titles[1],
        logo: avatars[1],
        description: '希望是一个好东西，也许是最好的，好东西是不会消亡的',
        date: new Date('2017-07-24'),
        member: '全组都是吴彦祖',
        href: '',
        memberLink: '',
      },
      {
        id: 'xxx3',
        title: titles[2],
        logo: avatars[2],
        description: '城镇中有那么多的酒馆，她却偏偏走进了我的酒馆',
        date: new Date(),
        member: '中二少女团',
        href: '',
        memberLink: '',
      },
      {
        id: 'xxx4',
        title: titles[3],
        logo: avatars[3],
        description: '那时候我只会想自己想要什么，从不想自己拥有什么',
        date: new Date('2017-07-23'),
        member: '程序员日常',
        href: '',
        memberLink: '',
      },
      {
        id: 'xxx5',
        title: titles[4],
        logo: avatars[4],
        description: '凛冬将至',
        date: new Date('2017-07-23'),
        member: '高逼格设计天团',
        href: '',
        memberLink: '',
      },
      {
        id: 'xxx6',
        title: titles[5],
        logo: avatars[5],
        description: '生命就像一盒巧克力，结果往往出人意料',
        date: new Date('2017-07-23'),
        member: '骗你来学计算机',
        href: '',
        memberLink: '',
      },
    ],
  });
};

const getAnnounce = (_: Request, res: Response) => {
  res.json({
    status: 200,
    msg: 'success',
    data: {
      return_count: 6,
      announce: [
        {
          id: 'trend-1',
          date: new Date(),
          title: '这是一个标题',
          poster: {
            name: '曲丽丽',
            avatar: avatars2[0],
          },
          content: `这是一个一个一个公告这是一个公告这是一个公告这是一个公告这是一个公
        告这是一个公告这是一个公告这是一个公告这是一个公告这是一个公告这是一个公告这是一
        个公告这是一个公告这是一个公告这是一个公告这是一个公告这是一个公告这是一个公告这
        是一个公告这是一个公告这是一个公告这是一个公告这是一个公告这是一个公告这是一个公
        告这是一个公告这是一个公告这是一个公告这是一个公告这是一个公告这是一个公告这是一
        个公告这是一个公告这是一个公告这是一个公告这是一个公告这是一个公告这是一个公告`,
        },
        {
          id: 'trend-2',
          date: new Date(),
          poster: {
            name: '付小小',
            avatar: avatars2[1],
          },
          content: `这是一个一个一个公告这是一个公告这是一个公告这是一个公告这是一个公
          告这是一个公告这是一个公告这是一个公告这是一个公告这是一个公告这是一个公告这是一
          个公告这是一个公告这是一个公告这是一个公告这是一个公告这是一个公告这是一个公告这
          是一个公告这是一个公告这是一个公告这是一个公告这是一个公告这是一个公告这是一个公
          告这是一个公告这是一个公告这是一个公告这是一个公告这是一个公告这是一个公告这是一
          个公告这是一个公告这是一个公告这是一个公告这是一个公告这是一个公告这是一个公告`,
        },
        {
          id: 'trend-3',
          date: new Date(),
          poster: {
            name: '林东东',
            avatar: avatars2[2],
          },
          content: `这是一个一个一个公告这是一个公告这是一个公告这是一个公告这是一个公
          告这是一个公告这是一个公告这是一个公告这是一个公告这是一个公告这是一个公告这是一
          个公告这是一个公告这是一个公告这是一个公告这是一个公告这是一个公告这是一个公告这
          是一个公告这是一个公告这是一个公告这是一个公告这是一个公告这是一个公告这是一个公
          告这是一个公告这是一个公告这是一个公告这是一个公告这是一个公告这是一个公告这是一
          个公告这是一个公告这是一个公告这是一个公告这是一个公告这是一个公告这是一个公告`,
        },
        {
          id: 'trend-4',
          date: new Date(),
          poster: {
            name: '周星星',
            avatar: avatars2[4],
          },
          content: `这是一个一个一个公告这是一个公告这是一个公告这是一个公告这是一个公
          告这是一个公告这是一个公告这是一个公告这是一个公告这是一个公告这是一个公告这是一
          个公告这是一个公告这是一个公告这是一个公告这是一个公告这是一个公告这是一个公告这
          是一个公告这是一个公告这是一个公告这是一个公告这是一个公告这是一个公告这是一个公
          告这是一个公告这是一个公告这是一个公告这是一个公告这是一个公告这是一个公告这是一
          个公告这是一个公告这是一个公告这是一个公告这是一个公告这是一个公告这是一个公告`,
        },
        {
          id: 'trend-5',
          date: new Date('2022-05-22 12:00'),
          poster: {
            name: '朱偏右',
            avatar: avatars2[3],
          },
          content: `这是一个一个一个公告这是一个公告这是一个公告这是一个公告这是一个公
          告这是一个公告这是一个公告这是一个公告这是一个公告这是一个公告这是一个公告这是一
          个公告这是一个公告这是一个公告这是一个公告这是一个公告这是一个公告这是一个公告这
          是一个公告这是一个公告这是一个公告这是一个公告这是一个公告这是一个公告这是一个公
          告这是一个公告这是一个公告这是一个公告这是一个公告这是一个公告这是一个公告这是一
          个公告这是一个公告这是一个公告这是一个公告这是一个公告这是一个公告这是一个公告`,
        },
        {
          id: 'trend-6',
          date: new Date(),
          poster: {
            name: '乐哥',
            avatar: avatars2[5],
          },
          content: `这是一个一个一个公告这是一个公告这是一个公告这是一个公告这是一个公
          告这是一个公告这是一个公告这是一个公告这是一个公告这是一个公告这是一个公告这是一
          个公告这是一个公告这是一个公告这是一个公告这是一个公告这是一个公告这是一个公告这
          是一个公告这是一个公告这是一个公告这是一个公告这是一个公告这是一个公告这是一个公
          告这是一个公告这是一个公告这是一个公告这是一个公告这是一个公告这是一个公告这是一
          个公告这是一个公告这是一个公告这是一个公告这是一个公告这是一个公告这是一个公告`,
        },
      ],
    },
  });
};

export default {
  'GET  /api/project/notice': getNotice,
  'GET  /api/announce/get': getAnnounce,
};
