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
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const config_json_1 = require("./config.json");
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
function start() {
    app.use(express_1.default.static(path_1.default.join(__dirname + '../../../public')));
    app.get('/', (req, res) => __awaiter(this, void 0, void 0, function* () {
        const html = yield fs_1.default.readFileSync('public/index.html', 'utf8');
        return res.send(html);
    }));
    app.listen(config_json_1.port, () => {
        console.log(`Easy Demon Challenge is now running locally at http://localhost:${config_json_1.port}`);
    });
}
exports.default = start;
