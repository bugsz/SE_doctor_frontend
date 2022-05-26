const UpdateDoctorInfo = async (req, res) => {
    const id = req.query.id;
    const data = req.body;
    console.log(id);
    console.log(data);
    const result = {
        success: true,
        status: 'success',
        // data: data,
    }
    return res.json(result);
}

export default {
    "POST /api/TimeTable_Change/update": UpdateDoctorInfo,
}