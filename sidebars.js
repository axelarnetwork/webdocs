/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  // tutorialSidebar: [{type: 'autogenerated', dirName: '.'}],

  // But you can create a sidebar manually
  tutorialSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Developer',
      link: {type: 'doc', id: 'dev'},
      items: [
        'dev/gmp',
        {
          type: 'category',
          label: 'CLI',
          link: {type: 'doc', id: 'dev/cli'},
          items: [
            'dev/cli/ust-to-evm',
            'dev/cli/ust-from-evm',
            'dev/cli/axl-to-evm',
            'dev/cli/axl-from-evm',
          ],
        },
        {
          type: 'category',
          label: 'Network Design',
          link: {type: 'doc', id: 'dev/design'},
          items: [
            'dev/design/contracts',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Node operator',
      items: [
        'node/join',
        'node/join-genesis',
        'node/basic',
        'node/keyring',
      ],
    },
    {
      type: 'category',
      label: 'Validator',
      items: [
        {
          type: 'category',
          label: 'Setup',
          items: [
            'validator/setup/overview',
            'validator/setup/vald-tofnd',
            'validator/setup/backup',
            'validator/setup/register-broadcaster',
            'validator/setup/stake-axl',
            'validator/setup/health-check',
            'validator/setup/manual',
          ],
        },
        {
          type: 'category',
          label: 'Support external chains',
          items: [
            'validator/external-chains/overview',
            'validator/external-chains/avalanche',
            'validator/external-chains/ethereum',
            'validator/external-chains/fantom',
            'validator/external-chains/moonbeam',
            'validator/external-chains/polygon',
          ],
        },
        // Hide this section until the pages are updated and refreshed 
        // {
        //   type: 'category',
        //   label: 'Troubleshoot',
        //   items: [
        //     'validator/troubleshoot/recovery',
        //     'validator/troubleshoot/startup',
        //     'validator/troubleshoot/leave',
        //     'validator/troubleshoot/unjail',
        //     'validator/troubleshoot/missed-too-many-blocks',
        //   ],
        // },
      ],
    },
    {
      type: 'category',
      label: 'Resources',
      link: {type: 'doc', id: 'resources'},
      items: [
        {
          type: 'category',
          label: 'Mainnet',
          link: {type: 'doc', id: 'resources/mainnet'},
          items: [
            {
              type: 'doc',
              id: 'resources/mainnet/upgrade',
              label: 'Upgrade', // sidebar label
            },
            
          ],
        },
        {
          type: 'category',
          label: 'Testnet',
          link: {type: 'doc', id: 'resources/testnet'},
          items: [
            {
              type: 'doc',
              id: 'resources/testnet/upgrade',
              label: 'Upgrade', // sidebar label
            },
            
          ],
        },
        'resources/satellite',
        'resources/metamask',
      ],
    },
    'bug-bounty',
  ],

  controllerSidebar: [
    {
      type: 'category',
      label: 'Controller',
      link: {type: 'doc', id: 'controller'},
      items: [
        'controller/add-evm-chain',
        'controller/deploy-token',    
      ],
    },
  ],
};

module.exports = sidebars;
