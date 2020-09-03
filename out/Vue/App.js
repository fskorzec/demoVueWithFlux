"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Channel_1 = __importDefault(require("../Stores/Channel"));
const User_1 = __importDefault(require("../Stores/User"));
const Message_1 = __importDefault(require("../Stores/Message"));
const ChatApp_1 = __importDefault(require("../Stores/ChatApp"));
Vue.component('channels', {
    template: `
  <div class="globalContainer">
      <div class="channelItem" v-for="channel in channels">
        <div class="header">  
          <h3>{{channel.name}}</h3>
          <div v-for="user in channel.users">
            User  {{ user.name }} is in the channel
          </div>
        </div>
        <hr />
        <h4>Messages in {{channel.name}}</h4>
        <div v-for="msg in channel.messages">
          <span :class="['msg_' + msg.author]">{{msg.userName}}: {{msg.body}}</span>
        </div>
      </div>
  </div>
  `,
    props: ["channels"]
});
const vueApp = new Vue({
    el: "#app",
    data: {
        channels: []
    },
    mounted: function () {
        /**
         * Here is WHERE you need to subscribe to receive data
         */
        ChatApp_1.default.subscribeTo.All(state => {
            this.channels = state.channels;
        });
        setTimeout(() => {
            fakeData();
        }, 200);
    }
});
/**
 * FAKE SERVER DATA SIMULATION
 */
function fakeData() {
    /**
     * FAKE data to show how propagate data to the dispatcher when the websocket emits data
     */
    const actions = [];
    actions.push(() => Channel_1.default.actions.action_AddChannel({
        id: 1,
        name: "Channel 1"
    }));
    actions.push(() => Channel_1.default.actions.action_AddChannel({
        id: 2,
        name: "Channel 2"
    }));
    actions.push(() => {
        User_1.default.actions.action_AddUser({
            id: 1,
            name: "User 1"
        });
        User_1.default.actions.action_AddUser({
            id: 2,
            name: "User 2"
        });
        User_1.default.actions.action_AddUser({
            id: 3,
            name: "User 3"
        });
    });
    actions.push(() => User_1.default.actions.action_AddUserToChannel({ userId: 1, channelId: 1 }));
    actions.push(() => User_1.default.actions.action_AddUserToChannel({ userId: 2, channelId: 1 }));
    actions.push(() => Message_1.default.actions.action_AddMessage({
        timestamp: new Date().getTime(),
        id: 0,
        author: 1,
        channel: 1,
        body: "Hello user 2"
    }));
    actions.push(() => User_1.default.actions.action_AddUserToChannel({ userId: 2, channelId: 2 }));
    actions.push(() => User_1.default.actions.action_AddUserToChannel({ userId: 3, channelId: 2 }));
    actions.push(() => Message_1.default.actions.action_AddMessage({
        timestamp: new Date().getTime(),
        id: 1,
        author: 2,
        channel: 1,
        body: "Hello user 1"
    }));
    actions.push(() => {
        Message_1.default.actions.action_AddMessage({
            timestamp: new Date().getTime(),
            id: 2,
            author: 2,
            channel: 2,
            body: "Hello User 3 !!"
        });
        Message_1.default.actions.action_AddMessage({
            timestamp: new Date().getTime(),
            id: 2,
            author: 1,
            channel: 1,
            body: "Say hello to user 3 for me"
        });
    });
    actions.push(() => Message_1.default.actions.action_AddMessage({
        timestamp: new Date().getTime(),
        id: 3,
        author: 2,
        channel: 2,
        body: "User 1 say hello to you"
    }));
    actions.push(() => Message_1.default.actions.action_AddMessage({
        timestamp: new Date().getTime(),
        id: 4,
        author: 3,
        channel: 2,
        body: "Hello user 2, thanks !"
    }));
    actions.push(() => Message_1.default.actions.action_RemoveChannel({ channelId: 2 }));
    actions.push(() => Message_1.default.actions.action_RemoveChannel({ channelId: 1 }));
    actions.push(() => setTimeout(() => {
        fakeData();
    }, 200));
    actions.forEach((_, i) => {
        setTimeout(() => {
            actions.shift()();
        }, (200 * i));
    });
}
