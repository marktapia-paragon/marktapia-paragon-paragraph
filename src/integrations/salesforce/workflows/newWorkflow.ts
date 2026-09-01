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
  ISalesforceIntegration,
} from '@useparagon/integrations/salesforce';

import personaMeta from '../../../persona.meta';
import sharedInputs from '../inputs';

/**
 * New Workflow Workflow implementation
 */
export default class extends Workflow<
  ISalesforceIntegration,
  IPersona<typeof personaMeta>,
  InputResultMap
> {
  /**
   * Define workflow steps and orchestration.
   */
  define(
    integration: ISalesforceIntegration,
    context: IContext<InputResultMap>,
    connectUser: IConnectUser<IPersona<typeof personaMeta>>,
  ) {
    const triggerStep = integration.triggers.recordCreated({
      recordsFilterFormula: undefined,
      recordType: 'Contact',
    });

    const functionStep = new FunctionStep({
      autoRetry: false,
      description: 'Random Number Generator',
      code: function yourFunction(parameters, libraries) {
        return Math.ceil(Math.random() * 30); // 1–30s
      },
      parameters: {},
    });

    const delayStep = new DelayStep({
      unit: 'SECONDS',
      value: functionStep.output.result,
      description: 'description',
    });

    const requestStep = new RequestStep({
      autoRetry: false,
      continueWorkflowOnError: false,
      description: 'description',
      url: `https://example.com`,
      method: 'GET',
      params: {},
      headers: {},
    });

    triggerStep
      .nextStep(functionStep)
      .nextStep(delayStep)
      .nextStep(requestStep);

    /**
     * Pass all steps used in the workflow to the `.register()`
     * function. The keys used in this function must remain stable.
     */
    return this.register({ triggerStep, functionStep, delayStep, requestStep });
  }

  /**
   * The name of the workflow, used in the Dashboard and Connect Portal.
   */
  name: string = 'New Workflow';

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
  readonly id: string = 'ee07ab21-b9f9-485f-b5b3-7ff8eadc9dc7';
}
