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
exports.channelActions = exports.ChannelStore = void 0;
const Flux = __importStar(require("shadow-flux"));
class ChannelStore extends Flux.BaseStore {
    constructor() {
        super(...arguments);
        // Method that will be triggered when the action <_AddChannel> is dispatched
        this.action_AddChannel = function (payload) {
            return __awaiter(this, void 0, void 0, function* () {
                this.nextState(current => {
                    var _a;
                    (_a = current.channels) === null || _a === void 0 ? void 0 : _a.push(payload);
                    return current; // keeping ref so can be modified outside the store, be carefull
                });
                this.emit();
            });
        };
        this.action_RemoveChannel = function (payload) {
            return __awaiter(this, void 0, void 0, function* () {
                this.nextState(current => {
                    current.channels = current.channels.filter(_ => _.id !== payload.channelId);
                    return current; // keeping ref so can be modified outside the store, be carefull
                });
                this.emit();
            });
        };
    }
    // Mandatory method to initialize the state
    initState() {
        this.nextState({
            channels: []
        });
    }
}
exports.ChannelStore = ChannelStore;
/**
 * Here we expose methods that wrap sending action to the dispatcher
 */
exports.channelActions = {
    addChannel(channel) {
        this.sendAction("_AddChannel", channel);
    },
    removeChannel(channelId) {
        this.sendAction({ type: "_RemoveChannel", channelId });
    }
};
