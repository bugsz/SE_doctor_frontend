import ProForm, { ProFormSelect, ProFormText } from '@ant-design/pro-form';
import { DatePicker, notification } from 'antd';
import moment, { Moment } from 'moment';
import React, { ReactNode } from 'react';
import { Location, useLocation } from 'umi';
import { scheduleItem } from '../../data';
import { UpdateDoctorInfo } from '../../service';
import styles from './BaseView.less';

const validatorPhone = (rule: any, value: string[], callback: (message?: string) => void) => {
  if (!value[0]) {
    callback('Please input your area code!');
  }
  if (!value[1]) {
    callback('Please input your phone number!');
  }
  callback();
};
// // 头像组件 方便以后独立，增加裁剪之类的功能
// const AvatarView = ({ avatar }: { avatar: string }) => (
//   <>
//     <div className={styles.avatar_title}>头像</div>
//     <div className={styles.avatar}>
//       <img src={avatar} alt="avatar" />
//     </div>
//     <Upload showUploadList={false}>
//       <div className={styles.button_view}>
//         <Button>
//           <UploadOutlined />
//           更换头像
//         </Button>
//       </div>
//     </Upload>
//   </>
// );

interface BaseViewProps {
  id?: string;
  children?: ReactNode;
}
const BaseView: React.FC<BaseViewProps> = ({ id, children }) => {
  // const id = props.id;
  // const {
  //   data: currentUser,
  //   run: refreshCurrent,
  //   loading,
  // } = useRequest(() => {
  //   return ListDoctorDetails(id);
  // });

  // const getAvatarURL = () => {
  //   if (currentUser) {
  //     if (currentUser.photo) {
  //       return currentUser.photo;
  //     }
  //     const url = 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png';
  //     return url;
  //   }
  //   return '';
  // };

  let curr_date = '';

  const location = useLocation() as Location & {
    query: { date: string; name: string; time: string; doc_id: string; department: string };
  };
  console.log(location.query);

  const onDateChange = (date: Moment | null, dateString: string) => {
    curr_date = dateString.replace(/[-_]/g, '');
    console.log(curr_date);
  };

  const handleFinish = async (values: scheduleItem) => {
    console.log(values);
    try {
      const msg = await UpdateDoctorInfo({
        schedule_id: curr_date,
        time: values.time,
        department: location.query.department,
        doctor_id: location.query.doc_id,
      });
      if (msg.status === 100) {
        notification.success({
          duration: 4,
          description: '个人信息更新成功',
          message: '更新成功',
        });
        window.history.back();
      } else {
        notification.error({
          duration: 4,
          message: '更新失败',
          description: msg.msg || '更新错误，未知错误类型',
        });
      }
    } catch (error) {
      notification.error({
        duration: 4,
        message: '更新失败',
        description: '请求失败，请稍后重新尝试',
      });
    }
  };

  return (
    <div className={styles.baseView}>
      {
        <>
          <div className={styles.left}>
            <ProForm
              layout="vertical"
              onFinish={handleFinish}
              submitter={{
                resetButtonProps: {
                  style: {
                    display: 'none',
                  },
                },
                submitButtonProps: {
                  children: '更新基本信息',
                },
              }}
              hideRequiredMark
            >
              <DatePicker
                onChange={onDateChange}
                picker="date"
                defaultPickerValue={moment(location.query.date)}
              />
              <br></br>
              <br></br>
              <ProFormSelect
                width="xs"
                options={[
                  {
                    value: '上午',
                    label: '上午',
                  },
                  {
                    value: '下午',
                    label: '下午',
                  },
                  {
                    value: '晚上',
                    label: '晚上',
                  },
                ]}
                name="time"
                label="时间段"
                rules={[
                  {
                    required: true,
                    message: '请选择排班时间段!',
                  },
                ]}
                initialValue={location.query.time}
              />
              <ProFormText
                width="md"
                name="name"
                label="医生"
                rules={[
                  {
                    required: true,
                    message: '请输入值班医生!',
                  },
                ]}
                initialValue={location.query.name}
              />
            </ProForm>
          </div>
          {/* <div className={styles.right}>
            <AvatarView avatar={getAvatarURL()} />
          </div> */}
        </>
      }
    </div>
  );
};

export default BaseView;
