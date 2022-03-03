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
  favicon: 'img/axelar-favicon.svg',
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
        title: 'Axelar Network',
        logo: {
          alt: 'Axelar',
          src: 'img/logo.png',
          srcDark: 'img/logo-dark.png'
        },
        items: [
          {
            type: 'doc',
            docId: 'intro',
            position: 'left',
            label: 'Tutorial',
          },
          {
            href: 'https://github.com/facebook/docusaurus',
            label: 'GitHub',
            position: 'right',
          },
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
              {
                label: 'Community discussions',
                href: 'https://community.axelar.network',
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
      // Enable the Algolia search bar
      algolia: {
        appId: 'YOUR_APP_ID',
        apiKey: 'YOUR_SEARCH_API_KEY',
        indexName: 'YOUR_INDEX_NAME',
        contextualSearch: true,
  
        // Optional: Specify domains where the navigation should occur through window.location instead on history.push. Useful when our Algolia config crawls multiple documentation sites and we want to navigate with window.location.href to them.
        externalUrlRegex: 'external\\.com|domain\\.com',
  
        // Optional: Algolia search parameters
        searchParameters: {},
  
        // Optional: path for search page that enabled by default (`false` to disable it)
        searchPagePath: 'search',
  
        //... other Algolia params
      },
    }),
};

module.exports = config;
