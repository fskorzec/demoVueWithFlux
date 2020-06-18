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
exports.userActions = exports.UserStore = void 0;
const Flux = __importStar(require("shadow-flux"));
class UserStore extends Flux.BaseStore {
    constructor() {
        super(...arguments);
        /**
         * In ordeer to automatically call a method
         * the method should be named action{ActionType}
         *
         * So to thandle the _AddUser action, you need to create a method named action_AddUser
         */
        this.action_AddUser = function (payload) {
            return __awaiter(this, void 0, void 0, function* () {
                this.nextState(current => {
                    var _a;
                    (_a = current.users) === null || _a === void 0 ? void 0 : _a.push(Object.assign(Object.assign({}, payload), { channels: [] }));
                    return current; // keeping ref so can be modified outside the store, be carefull
                });
                this.emit();
            });
        };
        this.action_AddUserToChannel = function (payload) {
            return __awaiter(this, void 0, void 0, function* () {
                this.nextState(current => {
                    current.users.filter(_ => _.id === payload.userId)[0].channels.push(payload.channelId);
                    return current; // keeping ref so can be modified outside the store, be carefull
                });
                this.emit();
            });
        };
        this.action_RemoveUser = function (payload) {
            return __awaiter(this, void 0, void 0, function* () {
                this.nextState(current => {
                    current.users = current.users.filter(_ => _.id !== payload.userId);
                    return current; // keeping ref so can be modified outside the store, be carefull
                });
                this.emit();
            });
        };
        this.action_RemoveChannel = function (payload) {
            return __awaiter(this, void 0, void 0, function* () {
                this.nextState(current => {
                    current.users.forEach(_ => {
                        if (_.channels.indexOf(payload.channelId) !== -1) {
                            _.channels = _.channels.filter(_ => _ !== payload.channelId);
                        }
                    });
                    return current; // keeping ref so can be modified outside the store, be carefull
                });
                this.emit();
            });
        };
    }
    initState() {
        this.nextState({
            users: []
        });
    }
}
exports.UserStore = UserStore;
/**
 * Here we expose methods that wrap sending action to the dispatcher
 */
exports.userActions = {
    addUser(user) {
        this.sendAction("_AddUser", user);
    },
    addUserToChannel(userId, channelId) {
        this.sendAction({ type: "_AddUserToChannel", userId, channelId });
    },
    removeUser(userId) {
        this.sendAction({
            type: "_RemoveUser",
            userId
        });
    }
};
