import * as Flux from "shadow-flux";
import { TRemoveChannelAction } from "./Channel";
import {BaseStore, registerStore, withEvents, TAwaitFor, TActionReturn} from "shadow-flux";

// Store state
export interface IUserStoreState {
  users: Array<TUser & {
    channels: Array<number>;
  }>;
}

const actions = {
  /**
   * In order to automatically call a method
   * the method should be named action{ActionType}
   * 
   * So to handle the _AddUser action, you need to create a method named action_AddUser
   */
  async action_AddUser(this: BaseStore<IUserStoreState>,payload: TAddUserAction)  {
    this.nextState({
      users: [...this.getState().users, {...payload, channels: []}]
    });
  },

  async action_AddUserToChannel(this: BaseStore<IUserStoreState>,payload: TAddUserToChannelAction)  {
    const newState = this.getState();
    newState.users.filter(_ => _.id === payload.userId)[0].channels.push(payload.channelId);

    this.nextState(newState);
  },

  async action_RemoveUser(this: BaseStore<IUserStoreState>,payload: TRemoveUserAction)  {
    this.nextState({
      users: this.getState().users.filter(_ => _.id !== payload.userId)
    });;
  },

  async action_RemoveChannel(this: BaseStore<IUserStoreState>,payload: TRemoveChannelAction)  {
    this.getState().users.forEach(_ => {
      if (_.channels.indexOf(payload.channelId) !== -1) {
        _.channels = _.channels.filter(_ => _ !== payload.channelId);
      }
    })
    this.nextState(this.getState());
  },
}

export type TUser = {
  id    : number;
  name  : string;
}

export type TAddUserAction = {
} & TUser

export type TAddUserToChannelAction = {
  userId: number;
  channelId: number;
}

export type TRemoveUserAction = {
  userId: number;
}

export default registerStore<IUserStoreState, typeof actions, any>({
  async init(this: BaseStore<IUserStoreState>) {
    this.nextState({
      users: []
    })
  },
  actions
})