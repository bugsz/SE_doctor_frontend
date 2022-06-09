const getDepartment = async (req, res) => {
  // const searchBy = req.searchBy;
  // const searchValue = req.query.searchValue;
  const searchName = req.query.main_department;
  const searchDep = req.query.department;

  const departmentData: departmentItem[] = [
    {
      main_department: "外科",
      department: "口腔科",
    },
    {
      main_department: "外科",
      department: "骨科",
    },
    {
      main_department: "外科",
      department: "肛肠科",
    },
    {
      main_department: "外科",
      department: "普通外科",
    },
    {
      main_department: "内科",
      department: "呼吸内科",
    },
    {
      main_department: "内科",
      department: "传染科",
    },
    {
      main_department: "内科",
      department: "心血管科",
    },
    {
      main_department: "内科",
      department: "消化内科",
    }
  ]

  // console.log(req)
  // console.log(searchName, searchDep);
  let finalData: departmentItem[] = departmentData;
  if (searchName) finalData = finalData.filter(item => item.main_department.includes(searchName));
  if (searchDep) finalData = finalData.filter(item => item.department.includes(searchDep));

  // if(!searchBy || searchBy === "") finalData = departmentData;
  // else if(searchBy == "name") finalData = departmentData.filter(item => item.name.includes(searchValue));
  // else if(searchBy == "department") finalData = departmentData.filter(item => item.department.includes(searchValue));

  // console.log(finalData);

  const result = {
    success: true,
    data: finalData,
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
  "GET /api/TimeTable_Change/getDepartment": getDepartment,
  // "DELETE /api/TimeTable_Change/delete": deleteDoctor,
};