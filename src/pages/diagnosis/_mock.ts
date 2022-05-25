import type { Request, Response } from 'express';
import { SectionType } from './data.d';
// import moment from 'moment';

// mock data

// const avatars = [
//   'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
//   'https://gw.alipayobjects.com/zos/rmsportal/cnrhVkzwxjPwAaCfPbdc.png',
//   'https://gw.alipayobjects.com/zos/rmsportal/gaOngJwsRYRaVAuXXcmB.png',
//   'https://gw.alipayobjects.com/zos/rmsportal/ubnKSIfAJTxIgXOKlciN.png',
//   'https://gw.alipayobjects.com/zos/rmsportal/WhxKECPNujWoWEFNdnJE.png',
//   'https://gw.alipayobjects.com/zos/rmsportal/jZUIxmJycoymBprLOUbT.png',
//   'https://gw.alipayobjects.com/zos/rmsportal/psOgztMplJMGpVEqfcgF.png',
//   'https://gw.alipayobjects.com/zos/rmsportal/ZpBqSxLxVEXfcUNoPKrz.png',
//   'https://gw.alipayobjects.com/zos/rmsportal/laiEnJdGHVOhJrUShBaJ.png',
//   'https://gw.alipayobjects.com/zos/rmsportal/UrQsqscbKEpNuJcvBZBu.png',
// ];

const getPatientInfo = (_: Request, res: Response) => {
  res.json({
    status: 200,
    msg: 'success',
    data: {
      id: 'D1',
      name: '张三',
      gender: '男',
      age: 24,
      phone: '88888888',
      appoint_date: new Date('2022-05-22'),
      section: SectionType.Afternoon,
      department: '肛肠科',
      history: ['这是病史1', '这是病史2'],
    },
  });
};

export default {
  'GET  /api/doctor/patient_info/get': getPatientInfo,
};
