import * as Flux from "shadow-flux";

// Store state
export interface IChannelStoreState {
  channels: Array<TChannel>;
}

export class ChannelStore extends Flux.BaseStore<IChannelStoreState> {
  // Mandatory method to initialize the state
  protected initState(): void {
    this.nextState({
      channels: []
    })
  }

  // Method that will be triggered when the action <_AddChannel> is dispatched
  action_AddChannel: Flux.DispatchHandler = async function (this: ChannelStore ,payload: TAddChannelAction)  {
    this.nextState(current => {
      current.channels?.push(payload);
      return current; // keeping ref so can be modified outside the store, be carefull
    });
    this.emit();
  };

  action_RemoveChannel: Flux.DispatchHandler = async function (this: ChannelStore ,payload: TRemoveChannelAction)  {
    this.nextState(current => {
      current.channels = current.channels.filter(_ => _.id !== payload.channelId);
      return current; // keeping ref so can be modified outside the store, be carefull
    });
    this.emit();
  };
  
}

/**
 * Here some typing informations si TS can enforce type checking
 */
export type TChannel = {
  id    : number;
  name  : string;
}

export type TAddChannelAction = {
  type: "_AddChannel";
} & TChannel

export type TRemoveChannelAction = {
  type      : "_RemoveChannel";
  channelId : number;
}

/**
 * Here we expose methods that wrap sending action to the dispatcher
 */
export const channelActions = {
  addChannel(channel: Partial<TChannel>) {
    (<Flux.Subscriber>this).sendAction("_AddChannel", channel);
  },
  removeChannel(channelId: number) {
    (<Flux.Subscriber>this).sendAction({type:"_RemoveChannel", channelId} as TRemoveChannelAction);
  } 
}