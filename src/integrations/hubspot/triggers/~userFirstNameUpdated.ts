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
 * "User First Name Updated" custom trigger
 */
export default class extends ApiEndpointWebhookTrigger<
  'USER',
  'default',
  InputResultMap
> {
  /**
   * This property is maintained by Paragon. Do not edit this property.
   */
  readonly id = '14678d6c-f0fb-4430-bdc4-56106f4d3dbd';

  /**
   * define whether trigger is app level or user level
   */
  readonly triggerLevel = 'USER';

  /**
   * The name of the custom trigger
   */
  name = 'User First Name Updated';

  /**
   * The description of custom trigger
   */
  description = 'Fires when user first name updated';

  /**
   * for app level trigger,
   * we need a way to map payload data to paragon connected user
   */
  mapPayload = undefined;

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
