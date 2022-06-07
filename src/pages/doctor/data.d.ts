export type DoctorItem = {
  doctor_id: string;
  name: string;
  gender: string;
  age: Number;
  dept_id: string;
  position: string;

  password: string;
  intro?: string;
  photo?: string;
};