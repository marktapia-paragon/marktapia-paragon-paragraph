import {
  ApiEndpointWebhookTrigger,
  ICreateTriggerContext,
  ITeardownTriggerContext,
  ICreateTriggerSetup,
  ITeardownTriggerSetup,
  CustomTriggerSetupResponse,
  TriggerPayloadValidationOption,
  ISetupTriggerResponseContext,
  IPayloadValidationContext,
  IProfileConfigContext,
  IProviderIdContext,
} from '@useparagon/core/triggers/customTrigger';
import { InputResultMap } from '@useparagon/integrations/hubspot';
import sharedInputs from '../inputs';

/**
 * "Contact Created" custom trigger
 */
export default class extends ApiEndpointWebhookTrigger<
  'APP',
  'default',
  InputResultMap
> {
  /**
   * This property is maintained by Paragon. Do not edit this property.
   */
  readonly id = '87cdd0e8-1b9c-4b13-88d4-4a27cca6c24e';

  /**
   * define whether trigger is app level or user level
   */
  readonly triggerLevel = 'APP';

  /**
   * The name of the custom trigger
   */
  name = 'Contact Created';

  /**
   * The description of custom trigger
   */
  description = 'Triggers when contact created in Hubspot';

  /**
   * for app level trigger,
   * we need a way to map payload data to paragon connected user
   */
  mapPayload = {
    providerId: (context: IProviderIdContext) => ``,
  };

  /**
   * describe setup configuration of custom trigger
   * @param context
   * @returns
   */
  create(context: ICreateTriggerContext<InputResultMap>): ICreateTriggerSetup {
    return {
      method: 'POST',
      url: ``,
      bodyType: 'json',
      body: {},
      params: {},
      headers: {},
    };
  }

  /**
   * describe teardown configuration of custom trigger
   * @param context
   * @returns
   */
  teardown(
    context: ITeardownTriggerContext<InputResultMap>,
  ): ITeardownTriggerSetup {
    return {
      method: 'DELETE',
      url: ``,
      bodyType: 'json',
      body: {},
      params: {},
      headers: {},
    };
  }

  /**
   * setup response
   * @param context
   * @returns
   */
  setupResponse(
    context: ISetupTriggerResponseContext<InputResultMap>,
  ): CustomTriggerSetupResponse {
    return {
      type: 'RESPOND_WITH_200',
    };
  }

  /**
   * validate payload
   * @param context
   * @returns
   */
  validatePayload(
    context: IPayloadValidationContext<InputResultMap>,
  ): TriggerPayloadValidationOption {
    return {
      scheme: 'NONE',
    };
  }
}
