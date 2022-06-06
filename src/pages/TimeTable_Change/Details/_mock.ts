const getDoctorDetails = async (req, res) => {

  const searchDate = req.query.date ? req.query.date : "2022-5-25";
  console.log(searchDate);

  const doctorData: doctorItem[] = [
    {
      date: "2022-5-25",
      section: "下午",
      doctor: "cyh,wlx",
    },
    {
      date: "2022-5-25",
      section: "下午",
      doctor: "cyh,wlx",
    },
    {
      date: "2022-5-25",
      section: "下午",
      doctor: "cyh,wlx",
    },
    {
      date: "2022-5-25",
      section: "下午",
      doctor: "cyh,wlx",
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