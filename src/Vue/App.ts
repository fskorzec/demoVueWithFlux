import * as Flux        from "../Flux"           ;
import { TFullChannel } from "../Stores/ChatApp" ;
import { Subscriber }   from "shadow-flux"       ;
declare var Vue: any;

window["Flux"] = Flux;

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
     * Here is WHERE you need to subscribe to receive 
     */
    Flux.subscriber.subscribe<Flux.IChatAppState>("APP", state => {
      this.channels = state.channels;
    });

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
  actions.push(() => Flux.channelActions.addChannel({
    id: 1,
    name: "Channel 1"
  }));

  actions.push(() => Flux.channelActions.addChannel({
    id: 2,
    name: "Channel 2"
  }));

  actions.push(() => {
      Flux.userActions.addUser({
      id: 1,
      name: "User 1"
    });
    Flux.userActions.addUser({
      id: 2,
      name: "User 2"
    });
    Flux.userActions.addUser({
      id: 3,
      name: "User 3"
    });
  });

  actions.push(() => Flux.userActions.addUserToChannel(1, 1));
  actions.push(() => Flux.userActions.addUserToChannel(2, 1));

  actions.push(() => Flux.messageActions.addMessage({
    id: 0,
    author: 1,
    channel: 1,
    body: "Hello user 2"
  }));

  actions.push(() => Flux.userActions.addUserToChannel(2, 2));
  actions.push(() => Flux.userActions.addUserToChannel(3, 2));


  actions.push(() => Flux.messageActions.addMessage({
    id: 1,
    author: 2,
    channel: 1,
    body: "Hello user 1"
  }));

  actions.push(() => {
    Flux.messageActions.addMessage({
      id: 2,
      author: 2,
      channel: 2,
      body: "Hello User 3 !!"
    });

    Flux.messageActions.addMessage({
      id: 2,
      author: 1,
      channel: 1,
      body: "Say hello to user 3 for me"
    });
  });



  actions.push(() => Flux.messageActions.addMessage({
    id: 3,
    author: 2,
    channel: 2,
    body: "User 1 say hello to you"
  }));

  actions.push(() => Flux.messageActions.addMessage({
    id: 4,
    author: 3,
    channel: 2,
    body: "Hello user 2, thanks !"
  }));

  actions.push(() => Flux.channelActions.removeChannel(2));
  actions.push(() => Flux.channelActions.removeChannel(1));
  actions.push(() => setTimeout(() => {
    fakeData()
  }, 1000));
  
  actions.forEach((_, i) => {
    setTimeout(() => {
      actions.shift()();
    }, (1000 * i));
  })
}