
import React, { useState, useRef, useLayoutEffect } from 'react';
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
import { ListDoctorDetails, UpdateDoctorInfo } from './service';
import styles from './style.less';

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

const Edit = (props) => {
  const id = props.match.params.id
  const {
    data: currentUser,
    run: refreshCurrent,
    loading,
  } = useRequest(() => {
    return ListDoctorDetails(id);
  });

  const [initConfig, setInitConfig] = useState({
    mode: 'inline',
  });
  const dom = useRef();

  const resize = () => {
    requestAnimationFrame(() => {
      if (!dom.current) {
        return;
      }

      let mode = 'inline';
      const { offsetWidth } = dom.current;

      if (dom.current.offsetWidth < 641 && offsetWidth > 400) {
        mode = 'horizontal';
      }

      if (window.innerWidth < 768 && offsetWidth > 400) {
        mode = 'horizontal';
      }

      setInitConfig({ ...initConfig, mode: mode });
    });
  };

  useLayoutEffect(() => {
    if (dom.current) {
      window.addEventListener('resize', resize);
      resize();
    }

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, [dom.current]);

  const getAvatarURL = () => {
    if (currentUser) {
      if (currentUser.photo) {
        return currentUser.photo;
      }

      const url = 'https://i.loli.net/2021/10/27/kJWcOx3RA6GwFEV.jpg';
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

export default Edit;