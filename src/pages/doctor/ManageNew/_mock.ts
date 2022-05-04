const getDoctor = async (req, res) => {
  // const searchBy = req.searchBy;
  // const searchValue = req.query.searchValue;
  const searchName = req.query.name;
  const searchDep = req.query.department;

  const doctorData: doctorItem[] = [
    {
      id: "D1",
      name: "cyh",
      department: "口腔科",
      position: "主任医师",
      moreUrl: "/api/user/D1/info",
    },
    {
      id: "D2",
      name: "sz",
      department: "外科",
      position: "砖家",
      moreUrl: "/api/user/D2/info",
    },
    {
      id: "D3",
      name: "cdh",
      department: "内科",
      position: "主治医师",
      moreUrl: "/api/user/D3/info",
    }
  ]

  // console.log(req)
  // console.log(searchName, searchDep);
  let finalData: doctorItem[] = doctorData;
  if (searchName) finalData = finalData.filter(item => item.name.includes(searchName));
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

export default {
  "GET /api/doctor/get": getDoctor,
};