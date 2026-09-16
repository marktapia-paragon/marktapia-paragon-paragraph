import { createInputs } from '@useparagon/integrations/netsuite';

/**
 * define inputs here which can be used across workflows
 */
const integrationInputs = createInputs({
  test_value: {
    id: '786384a4-8844-49dd-b4f5-a37125c58a0d',
    title: 'Test Value',
    type: 'custom_field_mapping',
    objectName: 'testValue',
    mockObjectTypes: [
      {
        label: 'Contacts',
        value: 'contacts',
      },
      {
        label: 'Leads',
        value: 'leads',
      },
    ],
    mockIntegrationFields: [
      {
        label: 'First Name',
        value: 'first_name',
      },
      {
        label: 'Last Name',
        value: 'last_name',
      },
      {
        label: 'Email',
        value: 'email',
      },
    ],
    tooltip: '',
    required: true,
  },
});

export default integrationInputs;
