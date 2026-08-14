import {
  ManualWebhookTrigger,
  CustomTriggerSetupResponse,
  TriggerPayloadValidationOption,
  ISetupTriggerResponseContext,
  IPayloadValidationContext,
  IProviderIdContext,
  IProfileConfigContext,
} from '@useparagon/core/triggers/customTrigger';
import { InputResultMap } from '@useparagon/integrations/hubspot';
import sharedInputs from '../inputs';

/**
 * "Contact First Name Updated" custom trigger
 */
export default class extends ManualWebhookTrigger<
  'APP',
  'default',
  InputResultMap
> {
  /**
   * This property is maintained by Paragon. Do not edit this property.
   */
  readonly id = '614c4451-7651-42cb-a5f3-c2b0d6162dd5';

  /**
   * define whether trigger is app level or user level
   */
  readonly triggerLevel = 'APP';

  /**
   * The name of the custom trigger
   */
  name = 'Contact First Name Updated';

  /**
   * The description of custom trigger
   */
  description = "Triggers when contact's first name is updated";

  /**
   * for app level trigger,
   * we need a way to map payload data to paragon connected user
   */
  mapPayload = {
    providerId: (context: IProviderIdContext) =>
      `${context.webhookRequest.body.portalId}`,
  };

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
