export type CurrentUser = {
  name: string;
  avatar: string;
  userid: string;
  notice: NoticeType[];
  email: string;
  signature: string;
  title: string;
  group: string;
  tags: TagType[];
  notifyCount: number;
  unreadCount: number;
  country: string;
  geographic: GeographicType;
  address: string;
  phone: string;
};

export type Member = {
  avatar: string;
  name: string;
  id: string;
};

export enum SectionType {
  Morning = 1,
  Afternoon = 2,
  Evening = 3,
}

export type patientInfoType = {
  id: string;
  name: string;
  gender: string;
  age: Number;
  phone: string;
  appoint_date: string;
  section: SectionType;
  department: string;
  photo?: string;
  history?: string[];
};

export type diagnosisType = {
  patient_id: string; //患者医保电子卡凭证卡号
  patient_name: string; //患者姓名
  depart_id?: string; //诊断科室
  doctor_id?: string; //给患者诊断的医生ID
  doctor_name?: string; //给患者诊断的医生姓名
  timestamp?: Date; //诊断日期
  diagnosis_message: string; //诊断信息（纯文本）
  medicine_message: string;
};
