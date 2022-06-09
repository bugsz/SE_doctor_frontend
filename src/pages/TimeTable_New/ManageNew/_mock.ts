const getSchedule = async (req, res) => {
  // const searchBy = req.searchBy;
  // const searchValue = req.query.searchValue;
  const searchName = req.query.date;
  const searchDep = req.query.doctor;

  const scheduleData: scheduleItem[] = [
    {
      date: "2022-5-25",
      section: "上午",
      doctor: "cyh,wlx",
      moreUrl: "/api/user/D1/info",
    },
    {
      date: "2022-5-25",
      section: "下午",
      doctor: "cyh,wlx,sz",
      moreUrl: "/api/user/D2/info",
    },
    {
      date: "2022-5-26",
      section: "下午",
      doctor: "cyh",
      moreUrl: "/api/user/D3/info",
    },
    {
      date: "2022-5-27",
      section: "上午",
      doctor: "wlx",
      moreUrl: "/api/user/D3/info",
    }
  ]

  // console.log(req)
  // console.log(searchName, searchDep);
  let finalData: scheduleItem[] = scheduleData;
  if (searchName) finalData = finalData.filter(item => item.date.includes(searchName));
  if (searchDep) finalData = finalData.filter(item => item.doctor == searchDep);

  // if(!searchBy || searchBy === "") finalData = scheduleData;
  // else if(searchBy == "name") finalData = scheduleData.filter(item => item.name.includes(searchValue));
  // else if(searchBy == "department") finalData = scheduleData.filter(item => item.department.includes(searchValue));

  // console.log(finalData);

  const result = {
    success: true,
    data: finalData,
  }
  return res.json(result);
}

const deleteSchedule = async (req, res) => {
  const id = req.query.id;
  console.log(id);
  const result = {
    status: 'success',
    success: true,
  }
  return res.json(result);
}


export default {
  "GET /api/TimeTable_Change/getSchedule": getSchedule,
  "DELETE /api/TimeTable_Change/deleteSchedule": deleteSchedule,
};