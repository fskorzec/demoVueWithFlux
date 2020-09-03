/*import * as Flux                        from "shadow-flux"      ;
import { ChannelStore, channelActions } from "./Stores/Channel" ;
import { UserStore, userActions }       from "./Stores/User"    ;
import { MessageStore, messageActions } from "./Stores/Message" ;
import { ChatAppStore, IChatAppState }  from "./Stores/ChatApp" ;

// We need to instanciate one Dispatcher for the whole Application
const dispatcher = new Flux.Dispatcher();
// We have to expose a way to subscribe and publish
// So the Subscriber will decorate the Dispatcher to expose only what the app needs
const subscriber = new Flux.Subscriber(dispatcher);

// We instanciate all the stores here
const channelStore = new ChannelStore() ; // Server data will be stored here
const userStore    = new UserStore()    ; // Server data will be stored here
const messageStore = new MessageStore() ; // Server data will be stored here

const chatAppStore = new ChatAppStore() ; // This store will Handle the Application data

// Here we have to register all stores, with a custom ID to identify each one
dispatcher.register(channelStore , "CHANNEL");
dispatcher.register(userStore    , "USER");
dispatcher.register(messageStore , "MESSAGE");
dispatcher.register(chatAppStore , "APP");

// This part is not mandatory, it is just a simple trick for the demo to
// Allows all actione to be executed with the Subscriber context as the THIS context
[channelActions, userActions, messageActions].forEach(_ => {
  for(const i in _) {
    _[i] = _[i].bind(subscriber);
  }
});
*/
/**
 * Here we need to export only what can be consumed
 * The pattern implies that no store can be accessed directly
 *
 * So the subcriber will allow to retreive data through Subscription
 *
 * All actions are wrapped in actions methods to simplify the use
 */ /*
export {
 subscriber     ,
 channelActions ,
 userActions    ,
 messageActions ,
 IChatAppState
};

*/ 
