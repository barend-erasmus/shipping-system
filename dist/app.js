"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const app = express();
app.route('*').all((request, response) => {
    response.status(404).json({
        message: `not_found`,
    });
});
app.listen(3000, () => {
    console.log(`listening on port 3000`);
});
//# sourceMappingURL=app.js.map