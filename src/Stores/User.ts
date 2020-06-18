import * as Flux from "shadow-flux";
import { TRemoveChannelAction } from "./Channel";

// Store state
export interface IUserStoreState {
  users: Array<TUser & {
    channels: Array<number>;
  }>;
}

export class UserStore extends Flux.BaseStore<IUserStoreState> {
  protected initState(): void {
    this.nextState({
      users: []
    })
  }

  /**
   * In ordeer to automatically call a method
   * the method should be named action{ActionType}
   * 
   * So to thandle the _AddUser action, you need to create a method named action_AddUser
   */
  action_AddUser: Flux.DispatchHandler = async function (this: UserStore ,payload: TAddUserAction)  {
    this.nextState(current => {
      current.users?.push({...payload, channels: []});
      return current; // keeping ref so can be modified outside the store, be carefull
    });
    this.emit();
  };

  action_AddUserToChannel: Flux.DispatchHandler = async function (this: UserStore ,payload: TAddUserToChannelAction)  {
    this.nextState(current => {
      current.users.filter(_ => _.id === payload.userId)[0].channels.push(payload.channelId);
      return current; // keeping ref so can be modified outside the store, be carefull
    });
    this.emit();
  };

  action_RemoveUser: Flux.DispatchHandler = async function (this: UserStore ,payload: TRemoveUserAction)  {
    this.nextState(current => {
      current.users = current.users.filter(_ => _.id !== payload.userId);
      return current; // keeping ref so can be modified outside the store, be carefull
    });
    this.emit();
  };

  action_RemoveChannel: Flux.DispatchHandler = async function (this: UserStore ,payload: TRemoveChannelAction)  {
    this.nextState(current => {
      current.users.forEach(_ => {
        if (_.channels.indexOf(payload.channelId) !== -1) {
          _.channels = _.channels.filter(_ => _ !== payload.channelId);
        }
      });
      return current; // keeping ref so can be modified outside the store, be carefull
    });
    this.emit();
  };
  
}

export type TUser = {
  id    : number;
  name  : string;
}

export type TAddUserAction = {
  type: "_AddUser";
} & TUser

export type TAddUserToChannelAction = {
  type: "_AddUserToChannel";
  userId: number;
  channelId: number;
}

export type TRemoveUserAction = {
  type: "_RemoveUser";
  userId: number;
}

/**
 * Here we expose methods that wrap sending action to the dispatcher
 */
export const userActions = {
  addUser(user: Partial<TUser>) {
    (<Flux.Subscriber>this).sendAction("_AddUser", user);
  },
  addUserToChannel(userId: number, channelId: number) {
    (<Flux.Subscriber>this).sendAction({type: "_AddUserToChannel", userId, channelId} as TAddUserToChannelAction);
  },
  removeUser(userId: number) {
    (<Flux.Subscriber>this).sendAction({
      type: "_RemoveUser", 
      userId
    } as TRemoveUserAction);
  } 
}