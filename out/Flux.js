"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageActions = exports.userActions = exports.channelActions = exports.subscriber = void 0;
const Flux = __importStar(require("shadow-flux"));
const Channel_1 = require("./Stores/Channel");
Object.defineProperty(exports, "channelActions", { enumerable: true, get: function () { return Channel_1.channelActions; } });
const User_1 = require("./Stores/User");
Object.defineProperty(exports, "userActions", { enumerable: true, get: function () { return User_1.userActions; } });
const Message_1 = require("./Stores/Message");
Object.defineProperty(exports, "messageActions", { enumerable: true, get: function () { return Message_1.messageActions; } });
const ChatApp_1 = require("./Stores/ChatApp");
// We need to instanciate one Dispatcher for the whole Application
const dispatcher = new Flux.Dispatcher();
// We have to expose a way to subscribe and publish
// So the Subscriber will decorate teh Dispatcher to expose only what teh app needs
const subscriber = new Flux.Subscriber(dispatcher);
exports.subscriber = subscriber;
// We instanciate all the stores here
const channelStore = new Channel_1.ChannelStore(); // Server data will be stored here
const userStore = new User_1.UserStore(); // Server data will be stored here
const messageStore = new Message_1.MessageStore(); // Server data will be stored here
const chatAppStore = new ChatApp_1.ChatAppStore(); // This store will Handle the Application data
// Here we have to register all stores, with a custom ID to identify each one
dispatcher.register(channelStore, "CHANNEL");
dispatcher.register(userStore, "USER");
dispatcher.register(messageStore, "MESSAGE");
dispatcher.register(chatAppStore, "APP");
// This part is not mandatory, it is just a simple trick for the demo to 
// Allows all action to be executed with the Subscriber context as the THIS context
[Channel_1.channelActions, User_1.userActions, Message_1.messageActions].forEach(_ => {
    for (const i in _) {
        _[i] = _[i].bind(subscriber);
    }
});
