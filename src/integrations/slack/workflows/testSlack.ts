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
 * Test Slack Workflow implementation
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

    const userCheckStep = new ConditionalStep({
      if: Operators.And(
        Operators.StringIsIn(triggerStep.output.result.user, [
          'U0BFJED194Z',
          'U0BFGGSFCCS',
        ]),
        Operators.StringExactlyMatches(
          triggerStep.output.result.channel,
          'C0BFGTUAD7X',
        ),
      ),
      description: 'User Check',
    });

    const copyCommentStep = integration.actions.sendMessage(
      {
        channel: `C0BFGTUAD7X`,
        message: `${triggerStep.output.result.text}`,
        botName: ``,
        botIcon: `:cat:`,
      },
      {
        autoRetry: false,
        continueWorkflowOnError: false,
        description: 'Copy Comment',
      },
    );

    const actionStep = undefined;

    const mapStep = new FanOutStep({
      description: 'description',
      iterator: [],
    });

    triggerStep
      .nextStep(userCheckStep.whenTrue(copyCommentStep))
      .nextStep(actionStep)
      .nextStep(mapStep);

    /**
     * Pass all steps used in the workflow to the `.register()`
     * function. The keys used in this function must remain stable.
     */
    return this.register({
      triggerStep,
      userCheckStep,
      copyCommentStep,
      actionStep,
      mapStep,
    });
  }

  /**
   * The name of the workflow, used in the Dashboard and Connect Portal.
   */
  name: string = 'Test Slack';

  /**
   * A user-facing description of the workflow shown in the Connect Portal.
   */
  description: string = 'Repeats whatever you post';

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
  readonly id: string = 'b8965552-f0d9-4eb5-9b4e-e61ecdcbd4e0';
}
