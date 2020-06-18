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
exports.messageActions = exports.MessageStore = void 0;
const Flux = __importStar(require("shadow-flux"));
class MessageStore extends Flux.BaseStore {
    constructor() {
        super(...arguments);
        // Method that will be triggered when the action <_AddMessage> is dispatched
        this.action_AddMessage = function (payload) {
            return __awaiter(this, void 0, void 0, function* () {
                this.nextState(current => {
                    var _a;
                    (_a = current.messages) === null || _a === void 0 ? void 0 : _a.push(payload);
                    return current; // keeping ref so can be modified outside the store, be carefull
                });
                this.emit();
            });
        };
        /**
         * This store can handle action that were defined for the User store too
         * Each store can handle an action, so an action is not made for only one store
         */
        this.action_RemoveUser = function (payload) {
            return __awaiter(this, void 0, void 0, function* () {
                this.nextState(current => {
                    current.messages = current.messages.filter(_ => _.author !== payload.userId);
                    return current; // keeping ref so can be modified outside the store, be carefull
                });
                this.emit();
            });
        };
        this.action_RemoveMessage = function (payload) {
            return __awaiter(this, void 0, void 0, function* () {
                this.nextState(current => {
                    current.messages = current.messages.filter(_ => _.id !== payload.messageId);
                    return current; // keeping ref so can be modified outside the store, be carefull
                });
                this.emit();
            });
        };
        this.action_RemoveChannel = function (payload) {
            return __awaiter(this, void 0, void 0, function* () {
                this.nextState(current => {
                    current.messages = current.messages.filter(_ => _.channel !== payload.channelId);
                    return current; // keeping ref so can be modified outside the store, be carefull
                });
                this.emit();
            });
        };
    }
    initState() {
        this.nextState({
            messages: []
        });
    }
}
exports.MessageStore = MessageStore;
/**
 * Here we expose methods that wrap sending action to the dispatcher
 */
exports.messageActions = {
    addMessage(message) {
        message.timestamp = performance.now();
        this.sendAction("_AddMessage", message);
    },
    removeMessage(messageId) {
        this.sendAction({
            type: "_RemoveMessage",
            messageId
        });
    }
};
