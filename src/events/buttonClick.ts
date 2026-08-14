import { IEventInit } from '@useparagon/core/event';

export type EventSchema = {
  buttonTitle: 'string';
  buttonCounter: 4;
};

const event: IEventInit<EventSchema> = {
  /**
   *  name of event
   */
  name: 'Button Click',

  /**
   * schema of event payload
   */
  schema: {
    buttonTitle: 'string',
    buttonCounter: 4,
  },
};

export default event;
