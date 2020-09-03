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
    action_AddMessage(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            this.nextState({
                messages: [...this.getState().messages, payload]
            });
        });
    },
    /**
     * This store can handle action that were defined for the User store too
     * Each store can handle an action, so an action is not made for only one store
     */
    action_RemoveUser(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            this.nextState({
                messages: this.getState().messages.filter(_ => _.author !== payload.userId)
            });
        });
    },
    action_RemoveMessage(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            this.nextState({
                messages: this.getState().messages.filter(_ => _.id !== payload.messageId)
            });
        });
    },
    action_RemoveChannel(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            this.nextState({
                messages: this.getState().messages.filter(_ => _.channel !== payload.channelId)
            });
        });
    }
};
exports.default = shadow_flux_1.registerStore({
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            this.nextState({
                messages: []
            });
        });
    },
    actions
});
