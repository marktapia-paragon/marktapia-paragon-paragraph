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
import event from '../../../events/buttonClick';

/**
 * Testing App Event Workflow implementation
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
    const triggerStep = new EventStep(event);

    const functionStep = new FunctionStep({
      autoRetry: false,
      description: 'Javascript Output',
      code: function yourFunction(parameters, libraries) {
        return `You pressed the ${parameters.buttonTitle} button ${parameters.buttonCounter} times!`;
      },
      parameters: {
        buttonTitle: triggerStep.output.buttonTitle,
        buttonCounter: triggerStep.output.buttonCounter,
      },
    });

    const responseStep = new ResponseStep({
      description: 'description',
      statusCode: 200,
      responseType: 'JSON',
      body: { status: 'ok', output: functionStep.output.result },
    });

    triggerStep.nextStep(functionStep).nextStep(responseStep);

    /**
     * Pass all steps used in the workflow to the `.register()`
     * function. The keys used in this function must remain stable.
     */
    return this.register({ triggerStep, functionStep, responseStep });
  }

  /**
   * The name of the workflow, used in the Dashboard and Connect Portal.
   */
  name: string = 'Testing App Event';

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
  readonly id: string = '6cc02248-6c77-4370-aa12-d61732e6e7ea';
}
