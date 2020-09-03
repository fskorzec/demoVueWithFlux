import {BaseStore, registerStore, withEvents, TAwaitFor, TActionReturn} from "shadow-flux";

// Store state
export interface IChannelStoreState {
  channels: Array<TChannel>;
}

const events = withEvents({
  All:""
});

const actions = {
  async action_AddChannel(this: BaseStore<IChannelStoreState>, payload: TAddChannelAction) {
    const newState = this.getState();
    newState.channels?.push(payload);
    this.nextState(newState);
  },
  async action_RemoveChannel(this: BaseStore<IChannelStoreState>, payload: TRemoveChannelAction)  {
    const newState = this.getState();
    newState.channels = this.getState().channels.filter(_ => _.id !== payload.channelId);
  }
}

export default registerStore<IChannelStoreState, typeof actions, typeof events>({
  init(this: BaseStore<IChannelStoreState>) {
    this.nextState({
      channels: []
    })
  },
  actions,
  events
})

/**
 * Here some typing informations si TS can enforce type checking
 */
export type TChannel = {
  id    : number;
  name  : string;
}

export type TAddChannelAction = {
} & TChannel

export type TRemoveChannelAction = {
  channelId : number;
}

