import {useState} from 'react';

export default () => {
    const [department, setDepartment] = useState(["口腔科","骨科","肛肠科","普通外科"])
    return department
}

/*
    options={[
                {
                    value: '口腔科',
                    label: '口腔科',
                },
                {
                    value: "骨科",
                    label: "骨科",
                },
                {
                    value: '肛肠科',
                    label: '肛肠科',
                },
                {
                    value: "普通外科",
                    label: "普通外科",
                },
                {
                    value: '呼吸内科',
                    label: '呼吸内科',
                },
                {
                    value: "传染科",
                    label: "传染科",
                },
                {
                    value: '心血管科',
                    label: '心血管科',
                },
                {
                    value: "消化内科",
                    label: "消化内科",
                },
            ]}

        options={[
                  {
                    value: "专家",
                    label: "专家",
                  },
                  {
                    value: '主任医师',
                    label: '主任医师',
                  },
                  {
                    value: "主治医师",
                    label: "主治医师",
                  },
                ]}
*/