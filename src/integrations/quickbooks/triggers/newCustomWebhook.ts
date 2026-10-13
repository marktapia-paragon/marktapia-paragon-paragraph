import {
  ManualWebhookTrigger,
  CustomTriggerSetupResponse,
  TriggerPayloadValidationOption,
  ISetupTriggerResponseContext,
  IPayloadValidationContext,
  IProviderIdContext,
  IProfileConfigContext,
} from '@useparagon/core/triggers/customTrigger';
import { InputResultMap } from '@useparagon/integrations/quickbooks';
import sharedInputs from '../inputs';

/**
 * "New Custom Webhook" custom trigger
 */
export default class extends ManualWebhookTrigger<
  'APP',
  'default',
  InputResultMap
> {
  /**
   * This property is maintained by Paragon. Do not edit this property.
   */
  readonly id = 'f9298c6e-5d2b-4224-8136-2d793bab4433';

  /**
   * define whether trigger is app level or user level
   */
  readonly triggerLevel = 'APP';

  /**
   * The name of the custom trigger
   */
  name = 'New Custom Webhook';

  /**
   * The description of custom trigger
   */
  description = 'Trigger from any event supported by QuickBooks';

  /**
   * for app level trigger,
   * we need a way to map payload data to paragon connected user
   */
  mapPayload = {
    providerId: (context: IProviderIdContext) =>
      `${context.webhookRequest.body.eventNotifications['0'].realmId}`,
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
      scheme: 'CUSTOM',
      parameters: { webhookSecret: `1cb3dc74-0ba4-4aa6-a796-259d56557046` },
      code: function yourHMACfunction(parameters, libraries, request) {
        return libraries.crypto
          .createHmac('sha256', parameters.webhookSecret)
          .update(JSON.stringify(request.body))
          .digest();
      },
    };
  }
}
