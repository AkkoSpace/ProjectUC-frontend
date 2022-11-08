import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
const Footer: React.FC = () => {
  const defaultMessage = 'Design by Akko';
  const currentYear = new Date().getFullYear();
  return (
    <DefaultFooter
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: 'Akko',
          title: 'Akko Space',
          href: 'https://akko.space',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <GithubOutlined />,
          href: 'https://github.com/AkkoSpace',
          blankTarget: true,
        },
        {
          key: 'AkkoGitea' ,
          title: 'Akko\'s Gitea',
          href: 'https://git.akko.space',
          blankTarget: true,
        },
      ]}
    />
  );
};
export default Footer;
