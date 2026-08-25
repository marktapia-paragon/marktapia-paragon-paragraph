import { IIntegrationConfig } from '@useparagon/core/integration';

import { default as NewWorkflow } from './workflows/newWorkflow';

/**
 * configuration for a netsuite
 */
const config: IIntegrationConfig = {
  description: 'Sync purchase orders with NetSuite',
  overviewText: `Connect to your NetSuite ERP system to manage your vendors and purchase orders in NetSuite. Increase your team’s productivity by keeping your NetSuite ERP system up to date - without manual data entry.
    
Our NetSuite integration enables you to:
  
• Create or update purchase orders in NetSuite automatically
• Sync vendor information between your app and NetSuite`,
  showWatermark: false,
  workflowDisplayOrder: [NewWorkflow],
};

export default config;
