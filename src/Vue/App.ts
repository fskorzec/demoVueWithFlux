import { TFullChannel } from "../Stores/ChatApp" ;
import ChannelStore     from "../Stores/Channel" ;
import UserStore        from "../Stores/User"    ;
import MessageStore     from "../Stores/Message" ;
import ChatAppStore     from "../Stores/ChatApp" ;

declare var Vue: any;

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
    channels: [] as TFullChannel[]
  },
  mounted: function () {
    /**
     * Here is WHERE you need to subscribe to receive data
     */
    ChatAppStore.subscribeTo.All(state => {
      this.channels = state.channels;
    })

    setTimeout(() => {
      fakeData();
    }, 1500);
  }
})


/**
 * FAKE SERVER DATA SIMULATION
 */
function fakeData() {
  /**
   * FAKE data to show how propagate data to the dispatcher when the websocket emits data
   */
  const actions = [];
  actions.push(() => ChannelStore.actions.action_AddChannel({
    id: 1,
    name: "Channel 1"
  }));

  actions.push(() => ChannelStore.actions.action_AddChannel({
    id: 2,
    name: "Channel 2"
  }));

  actions.push(() => {
      UserStore.actions.action_AddUser({
      id: 1,
      name: "User 1"
    });
    UserStore.actions.action_AddUser({
      id: 2,
      name: "User 2"
    });
    UserStore.actions.action_AddUser({
      id: 3,
      name: "User 3"
    });
  });

  actions.push(() => UserStore.actions.action_AddUserToChannel({userId: 1, channelId: 1}));
  actions.push(() =>UserStore.actions.action_AddUserToChannel({userId: 2, channelId: 1}));

  actions.push(() => MessageStore.actions.action_AddMessage({
    timestamp: new Date().getTime(),
    id: 0,
    author: 1,
    channel: 1,
    body: "Hello user 2"
  }));

  actions.push(() => UserStore.actions.action_AddUserToChannel({userId: 2, channelId: 2}));
  actions.push(() => UserStore.actions.action_AddUserToChannel({userId: 3, channelId: 2}));


  actions.push(() => MessageStore.actions.action_AddMessage({
    timestamp: new Date().getTime(),
    id: 1,
    author: 2,
    channel: 1,
    body: "Hello user 1"
  }));

  actions.push(() => {
    MessageStore.actions.action_AddMessage({
      timestamp: new Date().getTime(),
      id: 2,
      author: 2,
      channel: 2,
      body: "Hello User 3 !!"
    });

    MessageStore.actions.action_AddMessage({
      timestamp: new Date().getTime(),
      id: 2,
      author: 1,
      channel: 1,
      body: "Say hello to user 3 for me"
    });
  });



  actions.push(() => MessageStore.actions.action_AddMessage({
    timestamp: new Date().getTime(),
    id: 3,
    author: 2,
    channel: 2,
    body: "User 1 say hello to you"
  }));

  actions.push(() => MessageStore.actions.action_AddMessage({
    timestamp: new Date().getTime(),
    id: 4,
    author: 3,
    channel: 2,
    body: "Hello user 2, thanks !"
  }));

  actions.push(() => MessageStore.actions.action_RemoveChannel({channelId: 2}));
  actions.push(() => MessageStore.actions.action_RemoveChannel({channelId: 1}));
  actions.push(() => setTimeout(() => {
    fakeData()
  }, 1000));
  
  actions.forEach((_, i) => {
    setTimeout(() => {
      actions.shift()();
    }, (1000 * i));
  })
}