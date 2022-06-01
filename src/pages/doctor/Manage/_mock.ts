const getDoctor = async (req, res) => {
  // const searchBy = req.searchBy;
  // const searchValue = req.query.searchValue;
  const searchName = req.query.doctor_name;
  const searchDep = req.query.department;

  const doctorData: doctorItem[] = [
    {
      doctor_id: "D1",
      doctor_name: "cyh",
      department: "口腔科",
      position: "主任医师",
      moreUrl: "/api/user/D1/info",
    },
    {
      doctor_id: "D2",
      doctor_name: "sz",
      department: "外科",
      position: "砖家",
      moreUrl: "/api/user/D2/info",
    },
    {
      doctor_id: "D3",
      doctor_name: "cdh",
      department: "内科",
      position: "主治医师",
      moreUrl: "/api/user/D3/info",
    }
  ]

  // console.log(req)
  // console.log(searchName, searchDep);
  let finalData: doctorItem[] = doctorData;
  if (searchName) finalData = finalData.filter(item => item.doctor_name.includes(searchName));
  if (searchDep) finalData = finalData.filter(item => item.department.includes(searchDep));

  // if(!searchBy || searchBy === "") finalData = doctorData;
  // else if(searchBy == "name") finalData = doctorData.filter(item => item.name.includes(searchValue));
  // else if(searchBy == "department") finalData = doctorData.filter(item => item.department.includes(searchValue));

  // console.log(finalData);

  const result = {
    success: true,
    data: finalData,
  }
  return res.json(result);
}

const deleteDoctor = async (req, res) => {
  const id = req.query.id;
  console.log(id);
  const result = {
    status: 'success',
    success: true,
  }
  return res.json(result);
}



export default {
  // "GET /api/doctor/get": getDoctor,
  // "DELETE /api/doctor/delete": deleteDoctor,
  
};