const getDoctorDetails = async (req, res) => {

  const searchDate = req.query.date ? req.query.date : "2022-5-25";
  console.log(searchDate);

  const doctorData: doctorItem[] = [
    {
      date: "2022-5-25",
      department: "普通外科1",
    },
    {
      date: "2022-5-26",
      department: "普通外科2",
    },
    {
      date: "2022-5-27",
      department: "普通外科3",
    },
    {
      date: "2022-5-28",
      department: "普通外科4",
    }
  ]

  const finalData = doctorData.filter(item => (item.date === searchDate))[0];
  console.log(finalData);

  const result = {
    success: true,
    data: finalData,
  }
  return res.json(result);
}

export default {
  "GET /api/TimeTable_Change/details": getDoctorDetails,
};