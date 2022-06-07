// export type Member = {
//   avatar: string;
//   name: string;
//   id: string;
// };

// export type BasicListItemDataType = {
//   id: string;
//   owner: string;
//   title: string;
//   avatar: string;
//   cover: string;
//   status: 'normal' | 'exception' | 'active' | 'success';
//   percent: number;
//   logo: string;
//   href: string;
//   body?: any;
//   updatedAt: number;
//   createdAt: number;
//   subDescription: string;
//   description: string;
//   activeUser: number;
//   newUser: number;
//   star: number;
//   like: number;
//   message: number;
//   content: string;
//   members: Member[];
// };

// export type scheduleItem = {
//   date: string;
//   section: string;
//   doctor: string;
//   moreUrl: string;
// };

export type scheduleItem = {
  /// raw data from backend
  date: string;
  time: string; // [morning, afternoon, evening]
  doctor_id: string;
  depart_id: string;
  quota: number;

  /// calculated by frontend...
  doctor_name: string;
};

export type DoctorDetailType = {
  doctor_id: string,
  name: string,
  gender: string,
  age: number,
  dept_id: string,
  position: string,
  password: string,
  intro: string,
  photo: string, // photo link
};
