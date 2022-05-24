import { patientItem } from "./data.d";

const getPatient = async (req, res) => {
  // const searchBy = req.searchBy;
  // const searchValue = req.query.searchValue;
  // const searchName = req.query.doctor_name;
  // const searchDep = req.query.department;
  const patientData: patientItem[] = [
    {
      patient_id: "D1",
      patient_name: "cyh",
      register_time: "12:00",
    },
    {
      patient_id: "D2",
      patient_name: "cyhh",
      register_time: "12:01",
    },
    {
      patient_id: "D3",
      patient_name: "cyhhhh",
      register_time: "12:02",
    }
  ]

  // console.log(req)
  // console.log(searchName, searchDep);
  let finalData: patientItem[] = patientData;
  // if (searchName) finalData = finalData.filter(item => item.doctor_name.includes(searchName));
  // if (searchDep) finalData = finalData.filter(item => item.department.includes(searchDep));

  // if(!searchBy || searchBy === "") finalData = doctorData;
  // else if(searchBy == "name") finalData = doctorData.filter(item => item.name.includes(searchValue));
  // else if(searchBy == "department") finalData = doctorData.filter(item => item.department.includes(searchValue));

  // console.log(finalData);

  const result = {
    data: finalData,
    success: true,
  }
  return res.json(result);
}

// const deleteDoctor = async (req, res) => {
//   const id = req.query.id;
//   console.log(id);
//   const result = {
//     status: 'success',
//     success: true,
//   }
//   return res.json(result);
// }


export default {
  "GET /api/register/get": getPatient,
  // "DELETE /api/doctor/delete": deleteDoctor,
};