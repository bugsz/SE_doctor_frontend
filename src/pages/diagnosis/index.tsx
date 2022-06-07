import ProForm, { ProFormTextArea } from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Descriptions, Divider } from 'antd';
import type { FC } from 'react';
import { useParams, useRequest } from 'umi';
import type { patientInfoType } from './data';
import { deletePatient, queryPatientInfo, uploadDiagnosis } from './service';
import styles from './style.less';
import { useState } from 'react';

interface IParam {
  id?: string;
}

const Diagnosis: FC = (props) => {
  // const { loading: patientInfoLoading, data: patientInfo } = useRequest({
  //   url: '/api/doctor/patient_info/get',
  //   method: 'GET',
  //   params: useParams<IParam>(),
  // });
  const [patientInfo, setPatientInfo] = useState<patientInfoType>();

  const id = props.match.params.id;
  const get = async () => {
    console.log(id)
    await queryPatientInfo(id).then((res) => {
      console.log(res)
      setPatientInfo(res)
    })
  }

  const { loading: patientInfoLoading} = useRequest(
    get
  //   queryPatientInfo, {
  //   defaultParams: [useParams<IParam>()],
  //   onSuccess: (res) => {
  //     console.log(res);
  //     console.log("Success")
  //   }
  // }
  );

  // const patientInfo = _patientInfo!;

  // console.log(useParams<IParam>());
  console.log(patientInfoLoading);
  console.log(patientInfo);

  const renderPatientInfo = (item: patientInfoType) => {
    //console.log(item)
    return (
      <Card loading={patientInfoLoading}>
        {!patientInfoLoading ? (
          <Descriptions title="患者信息">
            <Descriptions.Item label="姓名">{item.name}</Descriptions.Item>
            <Descriptions.Item label="性别">{item.gender}</Descriptions.Item>
            <Descriptions.Item label="年龄">{item.age}</Descriptions.Item>
            <Descriptions.Item label="电话">{item.phone}</Descriptions.Item>
          </Descriptions>
        ) : (null) }
        {!patientInfoLoading ? (
          <Card type="inner" title="患者病史">
            {item.history?.map((str, index) => {
              const title_str = `病史${index + 1}`;
              // TODO: 病史可以用更复杂的对象数组来表示，现在是单纯字符串数组
              return (
                <div>
                  <Descriptions style={{ marginBottom: 16 }} title={title_str} key={index}>
                    <Descriptions.Item label="描述">{str}</Descriptions.Item>
                  </Descriptions>
                  <Divider style={{ margin: '16px 0' }} />
                </div>
              );
            })}
          </Card>
        ) : (null)}
      </Card>
    );
  }

  return (
    <PageContainer>
      {patientInfoLoading ? <></> : renderPatientInfo(patientInfo)}
      <Card title="诊断意见" className={styles.activeCard}>
        <ProForm
          onFinish={async (values) => {
            deletePatient({ id: patientInfo.id });
            uploadDiagnosis({
              patient_id: patientInfo.id,
              patient_name: patientInfo.name,
              date: new Date().toDateString(),
              content: values.diagnosis,
            });
          }}
        >
          <ProFormTextArea
            label="目标描述"
            width="xl"
            name="diagnosis"
            rules={[
              {
                required: true,
                message: '请输入诊断意见',
              },
            ]}
            placeholder="请输入诊断意见"
          />
        </ProForm>
      </Card>
    </PageContainer>
  );
};

export default Diagnosis;
