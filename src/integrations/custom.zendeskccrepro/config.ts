import {
  ICustomIntegrationConfig,
  createConfigInputs,
  credentials,
} from '@useparagon/core/integration';

/**
 * define inputs here which are used in custom integration config
 */
export const inputs = createConfigInputs({
  zendesk_subdomain: {
    id: '90af7cf9-9d40-4578-9a95-7edf18e36a01',
    type: 'text',
    title: 'Zendesk Subdomain',
    subtitle:
      'Your Zendesk subdomain, i.e. the "your-account" in https://your-account.zendesk.com',
    placeholder: 'your-account',
    suffixLabel: '.zendesk.com',
  },
});

/**
 * custom integration config
 */
const config: ICustomIntegrationConfig = {
  name: 'Zendesk CC Repro',

  description:
    'Custom Zendesk OAuth Client Credentials (repro for issue 10222)',
  accentColor: '#000000',
  overviewText: '',
  showWatermark: false,
  workflowDisplayOrder: [],

  authenticationType: 'oauth_client_credential',
  accessTokenUrl: `https://${inputs.zendesk_subdomain}.zendesk.com/oauth/tokens`,
  includeClientIdAndSecrets: true,
  apiBaseUrl: `https://${inputs.zendesk_subdomain}.zendesk.com/api/v2/`,
  testEndpointPath: `users/me.json`,

  scopes: `users:read users:write tickets:read tickets:write`,
  authorization: {
    type: 'bearer',
    token: `${credentials.oauthAccessToken}`,
  },
};
export default config;
