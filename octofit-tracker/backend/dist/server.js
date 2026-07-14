"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.baseUrl = exports.port = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const database_1 = __importDefault(require("./config/database"));
const users_1 = __importDefault(require("./routes/users"));
const teams_1 = __importDefault(require("./routes/teams"));
const activities_1 = __importDefault(require("./routes/activities"));
const leaderboard_1 = __importDefault(require("./routes/leaderboard"));
const workouts_1 = __importDefault(require("./routes/workouts"));
const app = (0, express_1.default)();
exports.app = app;
const port = Number(process.env.PORT || 8000);
exports.port = port;
// Codespaces-aware base URL
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : `http://localhost:${port}`;
exports.baseUrl = baseUrl;
app.use(express_1.default.json());
app.get('/api/health', (_request, response) => {
    response.json({ status: 'ok', databaseReadyState: database_1.default.readyState, baseUrl });
});
// Mount API routes
app.use('/api/users', users_1.default);
app.use('/api/teams', teams_1.default);
app.use('/api/activities', activities_1.default);
app.use('/api/leaderboard', leaderboard_1.default);
app.use('/api/workouts', workouts_1.default);
