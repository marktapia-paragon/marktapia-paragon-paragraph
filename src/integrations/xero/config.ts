import { IIntegrationConfig } from '@useparagon/core/integration';

import { default as NewWorkflow } from './workflows/newWorkflow';

/**
 * configuration for a xero
 */
const config: IIntegrationConfig = {
  description: 'Sync payments with Xero',
  overviewText: `Connect your Xero account to create or update your customers, invoices, or payments in Xero. Grow your business faster by keeping your Xero account up to date - without manual data entry.
 
Our Xero integration enables you to:
        
• Automatically create or update payments or invoices in Xero
• Sync customers, payments, or invoices from Xero
• Receive updates when payments are made in Xero`,
  showWatermark: false,
  workflowDisplayOrder: [NewWorkflow],
};

export default config;
