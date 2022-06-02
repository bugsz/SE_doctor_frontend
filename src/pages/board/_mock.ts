import type { Request, Response } from 'express';
// import moment from 'moment';

// mock data

const avatars = [
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
            avatar: avatars[0],
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
            avatar: avatars[1],
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
            avatar: avatars[2],
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
            avatar: avatars[4],
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
            avatar: avatars[3],
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
            avatar: avatars[5],
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
  // 'GET  /api/announce/get': getAnnounce,
};
