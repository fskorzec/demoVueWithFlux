import * as Flux    from "shadow-flux";
import ChannelStore, { TChannel } from "./Channel";
import UserStore, { TUser } from "./User";
import MessageStore, { TMessage } from "./Message";
import {BaseStore, registerStore, withEvents, TAwaitFor, TActionReturn} from "shadow-flux";


export interface IChatAppState {
  channels : Array<TFullChannel>;
}

export type TFullChannel = TChannel & { users: Array<TUser>; messages: Array<TMessage> };

const actions = {
  async dispatchHandler(this: BaseStore<IChatAppState>, payload, For: TAwaitFor) {
    console.log(payload)
    // We use the await For to tell the dispatcher that we want all the other stores
    // To proceed before us, so we can use the result of their state here
    // The data is always up to date for us
    // await For(UserStore.id, MessageStore.id, ChannelStore.id);
    console.log(payload)

    const channels = ChannelStore.getState().channels                                           ;
    const users    = UserStore.getState().users                                                 ;
    const messages = MessageStore.getState().messages.sort((a, b) => a.timestamp - b.timestamp) ;

    const newState = {
      channels: channels.map((c: TFullChannel) => {
        c.messages = messages.filter(m => m.channel === c.id).map(m => {
          return {
            ...m,
            userName: users.filter(u => u.id === m.author)[0].name
          }
        });
        c.users = users.filter(u => u.channels.indexOf(c.id) !== -1);
        return c;
      })
    };

    this.nextState(newState);
  }
}

export default registerStore<IChatAppState, typeof actions, any>({
  async init(this: BaseStore<IChatAppState>) {
    this.nextState({
      channels : []
    });
  },
  actions
})