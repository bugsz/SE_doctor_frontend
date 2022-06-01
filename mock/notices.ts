import { Request, Response } from 'express';

const getNotices = (req: Request, res: Response) => {
  res.json({
    data: [
      {
        id: '000000001',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
        title: '你收到了 14 份新周报',
        datetime: '2022-06-01',
        type: 'notification',
      },
      // {
      //   id: '000000002',
      //   avatar: 'https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png',
      //   title: '',
      //   datetime: '2017-08-08',
      //   type: 'notification',
      // },
      {
        id: '000000003',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/kISTdvpyTAhtGxpovNWd.png',
        title: '大家记得健康打卡（来自 值班群）',
        datetime: '2022-05-28',
        read: true,
        type: 'notification',
      },
      // {
      //   id: '000000004',
      //   avatar: 'https://gw.alipayobjects.com/zos/rmsportal/GvqBnKhFgObvnSGkDsje.png',
      //   title: '左侧图标用于区分不同的类型',
      //   datetime: '2017-08-07',
      //   type: 'notification',
      // },
      {
        id: '000000005',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
        title: '下午2点将会进行系统维护，请做好准备',
        datetime: '2022-05-29',
        type: 'notification',
      },
      {
        id: '000000006',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
        title: '王宜平 回复了你',
        description: '记得帮忙去查一下房',
        datetime: '2022-05-29',
        type: 'message',
        clickClose: true,
      },
      // {
      //   id: '000000007',
      //   avatar: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
      //   title: '朱偏右 回复了你',
      //   description: '这种模板用于提醒谁与你发生了互动，左侧放『谁』的头像',
      //   datetime: '2017-08-07',
      //   type: 'message',
      //   clickClose: true,
      // },
      {
        id: '000000008',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
        title: '管理员1 回复了你',
        description: '好的，我晚上帮你改一下',
        datetime: '2022-06-01',
        type: 'message',
        clickClose: true,
      },
      {
        id: '000000009',
        title: '查房',
        description: '晚上8：00去三楼查房',
        extra: '马上到期',
        status: 'urgent',
        type: 'event',
      },
      {
        id: '000000010',
        title: '交报告',
        description: '晚上10：00之前交一份查房报告',
        extra: '未开始',
        status: 'todo',
        type: 'event',
      },
      // {
      //   id: '000000011',
      //   title: '信息安全考试',
      //   description: '指派竹尔于 2017-01-09 前完成更新并发布',
      //   extra: '已耗时 8 天',
      //   status: 'doing',
      //   type: 'event',
      // },
      // {
      //   id: '000000012',
      //   title: 'ABCD 版本发布',
      //   description: '冠霖提交于 2017-01-06，需在 2017-01-07 前完成代码变更任务',
      //   extra: '进行中',
      //   status: 'processing',
      //   type: 'event',
      // },
    ],
  });
};

export default {
  'GET /api/notices': getNotices,
};
