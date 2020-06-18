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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatAppStore = void 0;
const Flux = __importStar(require("shadow-flux"));
class ChatAppStore extends Flux.BaseStore {
    constructor() {
        super(...arguments);
        /**
         * Here we will not use the strategy pattern to call action handler
         * We can use the global dispatch handle because we want to catch all actions
         */
        this.dispatchHandler = function (_, __, ___, For) {
            return __awaiter(this, void 0, void 0, function* () {
                // We used the await For to tell the dispatcher that we want all the other store
                // To proceed before us, so we can use the result of their state here
                // The data is always up to date for us
                yield For("USER", "MESSAGE", "CHANNEL");
                this.nextState(o => {
                    // Here we do the necessary stuff tto update teh data needed for the application
                    // This store ose is to handle all Application states
                    const channels = this.getStoreStateByToken("CHANNEL").channels;
                    const users = this.getStoreStateByToken("USER").users;
                    const messages = this.getStoreStateByToken("MESSAGE").messages.sort((a, b) => a.timestamp - b.timestamp);
                    return {
                        channels: channels.map((c) => {
                            c.messages = messages.filter(m => m.channel === c.id).map(m => {
                                return Object.assign(Object.assign({}, m), { userName: users.filter(u => u.id === m.author)[0].name });
                            });
                            c.users = users.filter(u => u.channels.indexOf(c.id) !== -1);
                            return c;
                        })
                    };
                });
                // Here we notify the client control that an update is ready, so the rendering can be updated
                this.emit();
            });
        };
    }
    initState() {
        this.nextState({
            channels: []
        });
    }
}
exports.ChatAppStore = ChatAppStore;
