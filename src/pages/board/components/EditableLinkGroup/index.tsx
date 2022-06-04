import React, { createElement } from 'react';
import styles from './index.less';
import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';

export type EditableLink = {
  title: string;
  href: string;
  id?: string;
};

type EditableLinkGroupProps = {
  links: EditableLink[];
  linkElement: any;
};

// const EditableLinkGroup: React.FC<EditableLinkGroupProps> = (props) => {
//   const { links, linkElement } = props;
//   return (
//     <div className={styles.linkGroup}>
//       {links.map((link) =>
//         createElement(
//           linkElement,
//           {
//             key: `linkGroup-item-${link.id || link.title}`,
//             to: link.href,
//             href: link.href,
//           },
//           link.title,
//         ),
//       )}
//     </div>
//   );
// };

const EditableLinkGroup = (props) => {
  const { links } = props;
  return (
    <div className={styles.linkGroup}>
      {links.map((link) => (
        <Button
          style={{ marginLeft: 20 }}
          size="small"
          type="primary"
          ghost
          href={link.href}
          key={`linkGroup-item-${link.id || link.title}`}
        >
          <PlusOutlined /> {link.title}
        </Button>
      ))}
    </div>
  );
};

EditableLinkGroup.defaultProps = {
  links: [],
  linkElement: 'a',
};

export default EditableLinkGroup;
