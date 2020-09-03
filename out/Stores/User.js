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
Object.defineProperty(exports, "__esModule", { value: true });
const shadow_flux_1 = require("shadow-flux");
const actions = {
    /**
     * In order to automatically call a method
     * the method should be named action{ActionType}
     *
     * So to handle the _AddUser action, you need to create a method named action_AddUser
     */
    action_AddUser(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            this.nextState({
                users: [...this.getState().users, Object.assign(Object.assign({}, payload), { channels: [] })]
            });
        });
    },
    action_AddUserToChannel(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const newState = this.getState();
            newState.users.filter(_ => _.id === payload.userId)[0].channels.push(payload.channelId);
            this.nextState(newState);
        });
    },
    action_RemoveUser(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            this.nextState({
                users: this.getState().users.filter(_ => _.id !== payload.userId)
            });
            ;
        });
    },
    action_RemoveChannel(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            this.getState().users.forEach(_ => {
                if (_.channels.indexOf(payload.channelId) !== -1) {
                    _.channels = _.channels.filter(_ => _ !== payload.channelId);
                }
            });
            this.nextState(this.getState());
        });
    },
};
exports.default = shadow_flux_1.registerStore({
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            this.nextState({
                users: []
            });
        });
    },
    actions
});
