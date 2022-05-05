import React, { ReactNode } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Input, Upload, message, notification } from 'antd';
import ProForm, {
  ProFormDependency,
  ProFormFieldSet,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-form';
import { useRequest } from 'umi';

import styles from './BaseView.less';
import { ListDoctorDetails, UpdateDoctorInfo } from '../service';

const validatorPhone = (rule: any, value: string[], callback: (message?: string) => void) => {
  if (!value[0]) {
    callback('Please input your area code!');
  }
  if (!value[1]) {
    callback('Please input your phone number!');
  }
  callback();
};
// 头像组件 方便以后独立，增加裁剪之类的功能
const AvatarView = ({ avatar }: { avatar: string }) => (
  <>
    <div className={styles.avatar_title}>头像</div>
    <div className={styles.avatar}>
      <img src={avatar} alt="avatar" />
    </div>
    <Upload showUploadList={false}>
      <div className={styles.button_view}>
        <Button>
          <UploadOutlined />
          更换头像
        </Button>
      </div>
    </Upload>
  </>
);

interface BaseViewProps {
  id?: string;
  children?: ReactNode;
}
const BaseView: React.FC<BaseViewProps> = ( {id, children} ) => {
  // const id = props.id;
  const {
    data: currentUser,
    run: refreshCurrent,
    loading,
  } = useRequest(() => {
    return ListDoctorDetails(id);
  });

  const getAvatarURL = () => {
    if (currentUser) {
      if (currentUser.photo) {
        return currentUser.photo;
      }
      const url = 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png';
      return url;
    }
    return '';
  };

  const handleFinish = async (values) => {
    console.log(values);
    try {
      const msg = await UpdateDoctorInfo(id, values);
      if (msg.status === 'success') {
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
      await refreshCurrent();
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
      {loading ? null : (
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
              initialValues={{ ...currentUser }}
              hideRequiredMark
            >
              <ProFormText
                width="md"
                name="doctor_name"
                label="姓名"
                rules={[
                  {
                    required: true,
                    message: '请输入您的姓名!',
                  },
                ]}
              />
              <ProFormText
                width="md"
                name="gender"
                label="性别"
                rules={[
                  {
                    required: true,
                    message: '请输入您的性别!',
                  },
                ]}
              />

              <ProFormText
                width="md"
                name="age"
                label="年龄"
                rules={[
                  {
                    required: true,
                    message: '请输入您的年龄!',
                  },
                ]}
              />

              <ProFormText
                width="md"
                name="department"
                label="科室"
                rules={[
                  {
                    required: true,
                    message: '请输入科室!',
                  },
                ]}
              />

              <ProFormText
                width="md"
                name="position"
                label="职位"
                rules={[
                  {
                    required: true,
                    message: '请输入职位!',
                  },
                ]}
              />

            <ProFormText
                width="md"
                name="doctor_id"
                label="工号"
                rules={[
                  {
                    required: true,
                    message: '请输入工号!',
                  },
                ]}
              />

            </ProForm>
          </div>
          <div className={styles.right}>
            <AvatarView avatar={getAvatarURL()} />
          </div>
        </>
      )}
    </div>
  );
};

export default BaseView;
