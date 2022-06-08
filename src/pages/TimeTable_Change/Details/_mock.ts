const getDoctorDetails = async (req, res) => {

  const searchDate = req.query.date ? req.query.date : "2022-5-25";
  console.log(searchDate);

  const scheduleDetailData: scheduleDetailItem[] = [
    {
      date: "2022年06月01日 00:00",
      section: "morning",
      doctor: "Aoyang Yu",
    },
    {
      date: "1970年01月01日 13:37",
      section: "afternoon",
      doctor: "Aoyang Yu",
    },
    {
      date: "1970年01月01日 13:37",
      section: "morning",
      doctor: "Aoyang Yu",
    },
    {
      date: "1970年01月01日 13:37",
      section: "afternoon",
      doctor: "Aoyang Yu",
    },
    {
      date: "1970年01月01日 13:37",
      section: "afternoon",
      doctor: "Aoyang Yu",
    }
  ]

  const finalData = scheduleDetailData[0];
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