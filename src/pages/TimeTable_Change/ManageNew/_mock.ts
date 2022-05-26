const getDoctor = async (req, res) => {
  // const searchBy = req.searchBy;
  // const searchValue = req.query.searchValue;
  const searchName = req.query.department;
  const searchDep = req.query.department;

  const doctorData: doctorItem[] = [
    {
      date: "2022-5-25",
      department: "普通外科1",
      moreUrl: "/api/user/D1/info",
    },
    {
      date: "2022-5-26",
      department: "普通外科2",
      moreUrl: "/api/user/D2/info",
    },
    {
      date: "2022-5-27",
      department: "普通外科3",
      moreUrl: "/api/user/D3/info",
    },
    {
      date: "2022-5-28",
      department: "普通外科4",
      moreUrl: "/api/user/D3/info",
    }
  ]

  // console.log(req)
  // console.log(searchName, searchDep);
  let finalData: doctorItem[] = doctorData;
  if (searchName) finalData = finalData.filter(item => item.department.includes(searchName));
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
  "GET /api/TimeTable_Change/get": getDoctor,
  "DELETE /api/TimeTable_Change/delete": deleteDoctor,
};