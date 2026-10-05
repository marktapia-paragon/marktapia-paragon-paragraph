import { IContext } from '@useparagon/core/execution';
import {
  Workflow,
  CronStep,
  DelayStep,
  EventStep,
  FunctionStep,
  ConditionalStep,
  FanOutStep,
  ResponseStep,
  RequestStep,
  IntegrationEnabledStep,
  UnselectedStep,
  EndpointStep,
  IntegrationRequestStep,
  ICustomIntegration,
  CustomTriggerStep,
} from '@useparagon/core';
import { IPersona } from '@useparagon/core/persona';
import * as Operators from '@useparagon/core/operator';
import { ConditionalInput } from '@useparagon/core/steps/library/conditional';
import { IConnectUser, IPermissionContext } from '@useparagon/core/user';
import {
  createInputs,
  InputResultMap,
  ISlackIntegration,
} from '@useparagon/integrations/slack';

import personaMeta from '../../../persona.meta';
import sharedInputs from '../inputs';

/**
 * Mock Test Events Workflow implementation
 */
export default class extends Workflow<
  ISlackIntegration,
  IPersona<typeof personaMeta>,
  InputResultMap
> {
  /**
   * Define workflow steps and orchestration.
   */
  define(
    integration: ISlackIntegration,
    context: IContext<InputResultMap>,
    connectUser: IConnectUser<IPersona<typeof personaMeta>>,
  ) {
    const triggerStep = integration.triggers.channelMessagePosted({
      objectMapping: ``,
    });

    const mockPayloadStep = new FunctionStep({
      autoRetry: false,
      description: 'Mock Payload',
      code: function yourFunction(parameters, libraries) {
        var myPayload = {
          ts: '1682576941.441499',
          team: 'mock-team-id',
          text: '<@U02T23UL0R1> has joined the channel',
          type: 'message',
          user: 'U02T23UL0R1',
          files: [],
          blocks: [
            {
              type: 'rich_text',
              block_id: 'mock-block-id',
              elements: [
                {
                  type: 'rich_text_section',
                  elements: [
                    {
                      text: 'mock-text',
                      type: 'text',
                    },
                  ],
                },
              ],
            },
          ],
          upload: false,
          channel: 'C0C4YA6AMM1',
          subtype: 'channel_join',
          event_ts: '1682576941.441499',
          channel_type: 'channel',
          client_msg_id: 'mock-client-msg-id',
          event_context: 'mock-event-context',
          display_as_bot: false,
        };

        return parameters.payload;
      },
      parameters: { payload: triggerStep.output.result },
    });

    const actionStep = integration.actions.sendMessage(
      {
        channel: `${mockPayloadStep.output.result.channel}`,
        message: `Received a DM!`,
        botName: ``,
      },
      {
        autoRetry: false,
        continueWorkflowOnError: false,
        description: 'Send Message to Channel',
      },
    );

    triggerStep.nextStep(mockPayloadStep).nextStep(actionStep);

    /**
     * Pass all steps used in the workflow to the `.register()`
     * function. The keys used in this function must remain stable.
     */
    return this.register({ triggerStep, mockPayloadStep, actionStep });
  }

  /**
   * The name of the workflow, used in the Dashboard and Connect Portal.
   */
  name: string = 'Mock Test Events';

  /**
   * A user-facing description of the workflow shown in the Connect Portal.
   */
  description: string = 'Add a user-facing description of this workflow';

  /**
   * Define workflow-level User Settings. For integration-level User
   * Settings, see ../config.ts.
   * https://docs.useparagon.com/connect-portal/workflow-user-settings
   */
  inputs = createInputs({});

  /**
   * If set to true, the workflow will appear as enabled by default once
   * a user connects their account to the integration.
   * https://docs.useparagon.com/connect-portal/displaying-workflows#default-to-enabled
   */
  defaultEnabled: boolean = false;

  /**
   * If set to true, the workflow will be hidden from all users from the
   * Connect Portal.
   * https://docs.useparagon.com/connect-portal/displaying-workflows#hide-workflow-from-portal-for-all-users
   */
  hidden: boolean = false;

  /**
   * You can restrict the visibility of this workflow to specific users
   * with Workflow Permissions.
   * https://docs.useparagon.com/connect-portal/workflow-permissions
   */
  definePermissions(
    connectUser: IPermissionContext<IPersona<typeof personaMeta>>,
  ): ConditionalInput | undefined {
    return undefined;
  }

  /**
   * This property is maintained by Paragon. Do not edit this property.
   */
  readonly id: string = 'e1b3b5fe-920f-4204-9851-29e5a476fbc0';
}
