import { createInputs } from '@useparagon/integrations/hubspot';

/**
 * define inputs here which can be used across workflows
 */
const integrationInputs = createInputs({
  deal_stage_1: {
    id: '87e91d62-6f25-4c13-9b80-134056b5234c',
    title: 'Deal Stage 1',
    tooltip: 'You must set at least 1 stage for your deal flows to pull data',
    required: false,
    type: 'deal_stage',
    fieldMappings: [],
  },
  deal_state_2: {
    id: '460439d1-a3d6-4eb6-b246-f68888ce49fa',
    title: 'Deal state 2',
    tooltip: '',
    required: false,
    type: 'custom_dropdown',
    key: 'deal-state-2',
    customDropdownOptions: [
      {
        label: 'Example Field 1',
        value: 'field-1',
      },
      {
        label: 'Example Field 2',
        value: 'field-2',
      },
    ],
  },
});

export default integrationInputs;
