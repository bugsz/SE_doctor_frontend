const getDoctor = async (req, res) => {
  const doctorData: doctorItem[] = [
    {
      id: "1",
      name: "cxz",
      department: "zju",
      role: "doctor",
      moreUrl: "123.xyz",
    },
    {
      id: "2",
      name: "sz",
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