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
