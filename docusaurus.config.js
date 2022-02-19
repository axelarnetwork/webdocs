// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Axelar Docs',
  tagline: 'Connecting Web3',
  url: 'https://docs.axelar.dev/',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon/favicon-32x32.png',
  // organizationName: 'axelarnetwork', // Usually your GitHub org/user name.
  // projectName: 'axelar-core', // Usually your repo name.

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl: 'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'Axelar Docs',
        logo: {
          alt: 'Axelar Docs',
          src: 'img/logo.png',
          srcDark: 'img/logo-dark.png'
        },
        items: [
          // {
          //   type: 'doc',
          //   docId: 'intro',
          //   position: 'left',
          //   label: 'Tutorial',
          // },
          // {
          //   href: 'https://github.com/facebook/docusaurus',
          //   label: 'GitHub',
          //   position: 'right',
          // },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Other',
            items: [
              {
                label: 'Bug bounty',
                to: '/bug-bounty',
              },
              {
                label: 'Terms of use',
                to: '/terms-of-use',
              },
            ],
          },
          {
            title: 'Links',
            items: [
              {
                label: 'Website',
                href: 'https://axelar.network/',
              },
              {
                label: 'Github',
                href: 'https://github.com/axelarnetwork',
              },
              {
                label: 'Blog',
                href: 'https://axelar.network/blog',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Twitter',
                href: 'https://twitter.com/axelarcore',
              },
              {
                label: 'Discord',
                href: 'https://discord.gg/aRZ3Ra6f7D',
              },
              {
                label: 'Telegram',
                href: 'https://t.me/axelarcommunity',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Axelar, Inc.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
