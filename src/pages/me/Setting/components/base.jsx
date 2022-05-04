import React from 'react';
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
import { queryCurrent } from '../service';
import { updateInfo } from '../service';
import styles from './BaseView.less';

const AvatarView = ({ avatar }) => (
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

const BaseView = () => {
  const {
    data: currentUser,
    run: refreshCurrent,
    loading,
  } = useRequest(() => {
    return queryCurrent();
  });

  const getAvatarURL = () => {
    if (currentUser) {
      if (currentUser.avatar) {
        return currentUser.avatar;
      }

      const url = 'https://i.loli.net/2021/10/27/kJWcOx3RA6GwFEV.jpg';
      return url;
    }

    return '';
  };

  const handleFinish = async (values) => {
    console.log(values);
    try {
      const msg = await updateInfo(values);
      if (msg.status === 'success') {
        notification.success({
          duration: 4,
          description: '个人信息更新成功',
          message: '更新成功',
        });
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
                    message: '请输入您的年龄!',
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
                    message: '请输入您的年龄!',
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
                    message: '请输入您的年龄!',
                  },
                ]}
              />

              {/* <ProFormText
                name="userDepartment"
                label="部门"
                rules={[
                  {
                    required: true,
                    message: '请输入您的部门!',
                  },
                ]}
              >
                <Input className={styles.phone_number} />
              </ProFormText> */}


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
