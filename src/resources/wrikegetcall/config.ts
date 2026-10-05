import {
  UserLevelAPIResource,
  IResourceContext,
  UserLevelResourceRequestConfig,
  UserLevelResourceTestRequestConfig,
  UserLevelResourceAuthorizationConfig,
  UserProfileUIConfig,
} from '@useparagon/core';

/**
 * Wrike Get Call Resource implementation
 */
export default class extends UserLevelAPIResource {
  /**
   * This property is maintained by Paragon. Do not edit this property.
   */
  readonly id: string = 'a15d6b19-73c6-40dd-a7fa-4b411806d66d';

  /**
   * The name of the resource
   */
  name: string = 'Wrike Get Call';

  /**
   * defines config for http request
   */
  getRequestConfig(context: IResourceContext): UserLevelResourceRequestConfig {
    return {
      apiBaseUrl: `https://login.wrike.com/oauth2/authorize/v4`,
      authentication: { type: 'bearer', token: `${context.oauthAccessToken}` },
    };
  }

  /**
   * define test request config
   */
  getTestRequestConfig(
    context: IResourceContext,
  ): UserLevelResourceTestRequestConfig {
    return {
      url: `access_roles`,
      method: 'GET',
      params: {},
      headers: {},
    };
  }

  /**
   * define authorization config for resource connection
   */
  getAuthorizationConfig(
    context: IResourceContext,
  ): UserLevelResourceAuthorizationConfig {
    return {
      type: 'oauth',
      accessTokenUrl: `https://login.wrike.com/oauth2/token`,
      userInputs: ['access_token', 'refresh_token'],
      includeClientIdClientSecretInExchange: true,
    };
  }

  /**
   * define user profile config
   */
  getUserProfileConfig(
    context: IResourceContext,
  ): UserProfileUIConfig | undefined {
    return undefined;
  }
}
