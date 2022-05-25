const getDoctorDetails = async (req, res) => {

  const searchId = req.query.id ? req.query.id : "D1";
  console.log(searchId);

  const doctorData: doctorItem[] = [
    {
      doctor_id: "D1",
      doctor_name: "cyh",
      department: "口腔科",
      position: "主任医师",
      gender: "男",
      photo: "https://an.raynor.top/api/image/0/1943324752/desktop.jpg",
      age: 24,
    },
    // {
    //   doctor_id: "D2",
    //   doctor_name: "sz",
    //   department: "外科",
    //   position: "砖家",
    //   moreUrl: "/api/user/D2/info",
    // },
    // {
    //   doctor_id: "D3",
    //   doctor_name: "cdh",
    //   department: "内科",
    //   position: "主治医师",
    //   moreUrl: "/api/user/D3/info",
    // }
  ]

  const finalData = doctorData.filter(item => (item.doctor_id === searchId))[0];
  console.log(finalData);

  const result = {
    success: true,
    data: finalData,
  }
  return res.json(result);
}


const getDoctorSchedule = async (req, res) => {
  // console.log(req)
  const result = {
    success: true,
    data: [
      {
        schedule_id: "20220429",
        time_id: 1,
        availability: 50
      },
      {
        schedule_id: "20220430",
        time_id: 2,
        availability: 100
      }
    ]
  }

  return res.json(result)
}

export default {
  "GET /api/doctor/details": getDoctorDetails,
  "GET /api/doctor/schedule": getDoctorSchedule,
};