import * as Flux    from "shadow-flux";
import { TChannel, IChannelStoreState, channelActions } from "./Channel";
import { TUser, IUserStoreState, userActions }    from "./User";
import { TMessage, IMessageStoreState, messageActions } from "./Message";

export interface IChatAppState {
  channels : Array<TFullChannel>;
}

export type TFullChannel = TChannel & { users: Array<TUser>; messages: Array<TMessage> };

export class ChatAppStore extends Flux.BaseStore<IChatAppState> {
  protected initState(): void {
    this.nextState({
      channels : []
    })
  }

  /**
   * Here we will not use the strategy pattern to call action handler
   * We use the global dispatch handle because we want to catch all actions
   */
  dispatchHandler: Flux.DispatchHandler = async function(this: ChatAppStore, _, __, ___, For) {
    // We use the await For to tell the dispatcher that we want all the other stores
    // To proceed before us, so we can use the result of their state here
    // The data is always up to date for us
    await For("USER", "MESSAGE", "CHANNEL");

    this.nextState(o => {
        // Here we do the necessary stuff to update the data needed the application
        // This store purpose is to handle all Application states
        const channels  = this.getStoreStateByToken<IChannelStoreState>("CHANNEL").channels;
        const users     = this.getStoreStateByToken<IUserStoreState>("USER").users;
        const messages  = this.getStoreStateByToken<IMessageStoreState>("MESSAGE").messages.sort((a, b) => a.timestamp - b.timestamp);
      
        return {
          channels: channels.map((c: TFullChannel) => {
            c.messages = messages.filter(m => m.channel === c.id).map(m => {
              return {
                ...m,
                userName: users.filter(u => u.id === m.author)[0].name
              }
            });
            c.users    = users.filter(u => u.channels.indexOf(c.id) !== -1);
            return c;
          })
        };
    });

    // Here we notify the client control that an update is ready, so the rendering can be updated
    this.emit();
  }
}