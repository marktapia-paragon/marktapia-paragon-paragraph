import {
  ICustomIntegrationConfig,
  createConfigInputs,
  credentials,
} from '@useparagon/core/integration';

/**
 * define inputs here which are used in custom integration config
 */
export const inputs = createConfigInputs({});

/**
 * custom integration config
 */
const config: ICustomIntegrationConfig = {
  name: 'Wrike',

  description: 'Test Wrike App',
  accentColor: '#000000',
  overviewText: '',
  showWatermark: false,
  workflowDisplayOrder: [],

  authenticationType: 'oauth',
  authorizationUrl: `https://login.wrike.com/oauth2/authorize/v4`,
  accessTokenUrl: `https://login.wrike.com/oauth2/token`,
  scopes: 'Default, wsReadWrite',
  includeClientIdAndSecrets: true,
  usePKCEInCodeExchange: false,
  apiBaseUrl: `https://app-us2.wrike.com/api/v4`,
  testEndpointPath: `contacts?me=true`,
  authorization: {
    type: 'bearer',
    token: `${credentials.oauthAccessToken}`,
  },

  requestOptions: {
    accessTokenOptions: {
      enabled: false,
      configuration: {
        bodyType: 'x-www-form-urlencoded',
        body: {
          client_id: `${credentials.clientId}`,
          client_secret: `${credentials.clientSecret}`,
          grant_type: 'authorization_code',
          code: `${credentials.authRequest.params.code}`,
        },
      },
    } /* NOTE: OAuth "state" is system-managed by Paragon. Do not edit or remove it. */,
    authorizationCodeOptions: {
      enabled: false,
      configuration: {
        queryParams: {
          client_id: `${credentials.clientId}`,
          redirect_uri: `${credentials.redirectUrl}`,
          response_type: 'code',
          scope: `${credentials.scope}`,
          state: '[Redirect State]',
        },
      },
    },
    refreshTokenOptions: {
      tokenUrl: `https://login.wrike.com/oauth2/token`,
      configuration: {
        bodyType: 'x-www-form-urlencoded',
        body: {
          client_id: `${credentials.clientId}`,
          client_secret: `${credentials.clientSecret}`,
          grant_type: 'refresh_token',
          refresh_token: `${credentials.savedCredentials.refresh_token}`,
        },
      },
    },
    saveCredentialsOptions: {
      credentialSchema: {
        access_token: `${credentials.tokenRequest.response.access_token}`,
        refresh_token: `${credentials.tokenRequest.response.refresh_token}`,
      },
      tokenType: {
        access_token: 'encryptedToken',
        refresh_token: 'encryptedToken',
      },
    },
  },
};
export default config;
