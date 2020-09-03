"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Channel_1 = __importDefault(require("./Channel"));
const User_1 = __importDefault(require("./User"));
const Message_1 = __importDefault(require("./Message"));
const shadow_flux_1 = require("shadow-flux");
const actions = {
    dispatchHandler(payload, For) {
        return __awaiter(this, void 0, void 0, function* () {
            // We use the await For to tell the dispatcher that we want all the other stores
            // To proceed before us, so we can use the result of their state here
            // The data is always up to date for us
            // await For(UserStore.id, MessageStore.id, ChannelStore.id);
            yield For(Message_1.default.id, User_1.default.id, Channel_1.default.id);
            const channels = Channel_1.default.getState().channels;
            const users = User_1.default.getState().users;
            const messages = Message_1.default.getState().messages.sort((a, b) => a.timestamp - b.timestamp);
            const newState = {
                channels: channels.map((c) => {
                    c.messages = messages.filter(m => m.channel === c.id).map(m => {
                        return Object.assign(Object.assign({}, m), { userName: users.filter(u => u.id === m.author)[0].name });
                    });
                    c.users = users.filter(u => u.channels.indexOf(c.id) !== -1);
                    return c;
                })
            };
            this.nextState(newState);
        });
    }
};
exports.default = shadow_flux_1.registerStore({
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            this.nextState({
                channels: []
            });
        });
    },
    actions
});
