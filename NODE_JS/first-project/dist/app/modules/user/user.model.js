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
const mongoose_1 = require("mongoose");
const config_1 = __importDefault(require("../../config"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const userSchema = new mongoose_1.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    needsPasswordChange: {
        type: Boolean,
        default: true,
    },
    role: {
        type: String,
        enum: ['admin', 'faculty', 'student'],
    },
    status: {
        type: String,
        enum: ['in-progress', 'blocked'],
        default: 'in-progress',
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });
// * pre save meddleware/ hook : will work on careate() or save()
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const password = this.password;
        const saltRounds = Number(config_1.default.bcrypt_salt_rounds);
        const salt = yield bcrypt_1.default.genSalt(saltRounds);
        const hashedPassword = yield bcrypt_1.default.hash(password, salt);
        this.password = hashedPassword;
        next();
    });
});
// set empty string
userSchema.post('save', function (data, next) {
    data.password = '';
    next();
});
const User = (0, mongoose_1.model)('User', userSchema);
exports.default = User;
