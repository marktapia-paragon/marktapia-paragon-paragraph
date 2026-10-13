import { IIntegrationConfig } from '@useparagon/core/integration';

import { default as NewWorkflow } from './workflows/newWorkflow';

/**
 * configuration for a quickbooks
 */
const config: IIntegrationConfig = {
  description: 'Sync payments with QuickBooks',
  overviewText: `Connect your QuickBooks Online account to create or update your customers, invoices, or payments in QuickBooks. Grow your business faster by keeping your QuickBooks account up to date - without manual data entry.  
         

Our QuickBooks integration enables you to:  
     

• Automatically create or update payments or invoices in QuickBooks  
• Sync customers, payments, or invoices from QuickBooks  
• Receive updates when payments are made in QuickBooks`,
  showWatermark: false,
  workflowDisplayOrder: [NewWorkflow],
};

export default config;
