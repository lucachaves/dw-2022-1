import express from "express";

import { processText } from "./lib/text.js";

const router = express.Router();

router.post("/util/text/:action", (req, res) => {
  const action = req.params.action;

  const input = req.body.input;

  const result = {
    action,
    input,
    output: processText(input, action),
  };

  res.json(result);
});

// 404 handler
app.use((req, res, next) => {
  res.status(404).send("Content not found!");
});

// Error handler
app.use((err, req, res, next) => {
  // console.error(err.stack);
  res.status(500).send("Something broke!");
});

export default router;
