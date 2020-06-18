import * as Flux from "shadow-flux";
import { TRemoveUserAction } from "./User";
import { TRemoveChannelAction } from "./Channel";

// Store state
export interface IMessageStoreState {
  messages: Array<TMessage>;
}

// Message definition
export type TMessage = {
  id        : number;
  timestamp : number;
  author    : number;
  channel   : number;
  body      : string;
}

// Actiosn definition
export type TAddMessageAction = {
  type: "_AddMessage"
} & TMessage;


export type TRemoveMessageAction = {
  type: "_RemoveMessage";
  messageId: number;
};

export class MessageStore extends Flux.BaseStore<IMessageStoreState> {
  protected initState(): void {
    this.nextState({
      messages: []
    })
  }

  // Method that will be triggered when the action <_AddMessage> is dispatched
  action_AddMessage: Flux.DispatchHandler = async function (this: MessageStore ,payload: TAddMessageAction)  {
    this.nextState(current => {
      current.messages?.push(payload);
      return current; // keeping ref so can be modified outside the store, be carefull
    });
    this.emit();
  };

  /**
   * This store can handle action that were defined for the User store too
   * Each store can handle an action, so an action is not made for only one store
   */
  action_RemoveUser: Flux.DispatchHandler = async function (this: MessageStore ,payload: TRemoveUserAction)  {
    this.nextState(current => {
      current.messages = current.messages.filter(_ => _.author !== payload.userId)
      return current; // keeping ref so can be modified outside the store, be carefull
    });
    this.emit();
  };

  action_RemoveMessage: Flux.DispatchHandler = async function (this: MessageStore ,payload: TRemoveMessageAction)  {
    this.nextState(current => {
      current.messages = current.messages.filter(_ => _.id !== payload.messageId)
      return current; // keeping ref so can be modified outside the store, be carefull
    });
    this.emit();
  };

  action_RemoveChannel: Flux.DispatchHandler = async function (this: MessageStore ,payload: TRemoveChannelAction)  {
    this.nextState(current => {
      current.messages = current.messages.filter(_ => _.channel !== payload.channelId);
      return current; // keeping ref so can be modified outside the store, be carefull
    });
    this.emit();
  };
}

/**
 * Here we expose methods that wrap sending action to the dispatcher
 */
export const messageActions = {
  addMessage(message: Partial<TMessage>): void {
    message.timestamp = performance.now();
    (<Flux.Subscriber>this).sendAction("_AddMessage", message);
  },
  removeMessage(messageId: number): void {
    (<Flux.Subscriber>this).sendAction({
      type: "_RemoveMessage",
      messageId
    } as TRemoveMessageAction);
  } 
}