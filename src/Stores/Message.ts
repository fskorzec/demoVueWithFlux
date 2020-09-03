import * as Flux from "shadow-flux";
import { TRemoveUserAction } from "./User";
import { TRemoveChannelAction } from "./Channel";
import {BaseStore, registerStore, withEvents, TAwaitFor, TActionReturn} from "shadow-flux";


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

// Actions definition
export type TAddMessageAction = {
} & TMessage;


export type TRemoveMessageAction = {
  messageId: number;
};

const actions = {
  async action_AddMessage(this: BaseStore<IMessageStoreState> ,payload: TAddMessageAction)  {
    this.nextState({
      messages: [...this.getState().messages, payload]
    });
  },

  /**
   * This store can handle action that were defined for the User store too
   * Each store can handle an action, so an action is not made for only one store
   */
  async action_RemoveUser(this: BaseStore<IMessageStoreState>,payload: TRemoveUserAction)  {
    this.nextState({
      messages: this.getState().messages.filter(_ => _.author !== payload.userId)
    });
  },
  async action_RemoveMessage(this: BaseStore<IMessageStoreState>,payload: TRemoveMessageAction)  {
    this.nextState({
      messages: this.getState().messages.filter(_ => _.id !== payload.messageId)
    });
  },
  async action_RemoveChannel(this: BaseStore<IMessageStoreState>,payload: TRemoveChannelAction)  {
    this.nextState({
      messages: this.getState().messages.filter(_ => _.channel !== payload.channelId)
    });
  }
}

export default registerStore<IMessageStoreState, typeof actions, any>({ 
  async init(this: BaseStore<IMessageStoreState>) {
    this.nextState({
      messages:[]
    });
  },  
  actions 
});
