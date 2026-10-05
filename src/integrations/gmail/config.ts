import { IIntegrationConfig } from '@useparagon/core/integration';

/**
 * configuration for a gmail
 */
const config: IIntegrationConfig = {
  description: 'Send email with Gmail',
  overviewText: `Connect to your Gmail account to manage your emails and drafts in Gmail. Increase your team’s productivity by keeping your Gmail account up to date - without manual data entry. 
                
Our Gmail integration enables you to:  
          
• Send email and drafts from your Gmail account
• Read and extract data from incoming emails in your Gmail account inbox
• Receive notifications upon receiving mail in your Gmail account inbox`,
  showWatermark: false,
  workflowDisplayOrder: [],
};

export default config;
