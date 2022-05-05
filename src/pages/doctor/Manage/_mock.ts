const getDoctor = async (req, res) => {
  const doctorData: doctorItem[] = [
    {
      doctor_id: "1",
      doctor_name: "cxz",
      department: "zju",
      role: "doctor",
      moreUrl: "123.xyz",
    },
    {
      doctor_id: "2",
      doctor_name: "sz",
      department: "sjtu",
      role: "nurse",
      moreUrl: "123.xyz",
    }
  ]

  const result = {
    success: true,
    data: doctorData,
  }
  return res.json(result);
}

export default {
  "GET /api/doctor/get": getDoctor,
};