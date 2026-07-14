"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server");
server_1.app.listen(server_1.port, () => {
    console.log(`Octofit Tracker backend listening on port ${server_1.port}`);
    console.log(`API base URL: ${server_1.baseUrl}`);
});
