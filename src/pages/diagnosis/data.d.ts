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

export type HistoryType = {
  // TODO
};

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
  history?: HistoryType;
};
