import express from 'express';

import { processText } from './lib/text.js';

const router = express.Router();

router.post('/util/text/:action', (req, res) => {
  try {
    const action = req.params.action;

    const input = req.body.input;

    if (!input) {
      throw new Error('Request whithout input');
    }

    const output = processText(input, action);

    if (output) {
      const result = {
        action,
        input,
        output,
      };

      res.json(result);
    } else {
      throw new Error('Invalid action');
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// 404 handler
router.use((req, res, next) => {
  res.status(404).send('Content not found!');
});

// Error handler
router.use((err, req, res, next) => {
  // console.error(err.stack);
  res.status(500).send('Something broke!');
});

export default router;
