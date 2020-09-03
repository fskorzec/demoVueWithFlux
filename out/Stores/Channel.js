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
const events = shadow_flux_1.withEvents({
    All: ""
});
const actions = {
    action_AddChannel(payload) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const newState = this.getState();
            (_a = newState.channels) === null || _a === void 0 ? void 0 : _a.push(payload);
            this.nextState(newState);
        });
    },
    action_RemoveChannel(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const newState = this.getState();
            newState.channels = this.getState().channels.filter(_ => _.id !== payload.channelId);
        });
    }
};
exports.default = shadow_flux_1.registerStore({
    init() {
        this.nextState({
            channels: []
        });
    },
    actions,
    events
});
