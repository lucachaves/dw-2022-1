import express, { NextFunction, Request, Response } from 'express';

import { processNumber } from './lib/number';
import { processText } from './lib/text';

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
    if (error instanceof Error) {
      res.status(400).send(error.message);
    }
  }
});

router.get('/util/number/:action', (req, res) => {
  try {
    const action = req.params.action;

    const input = String(req.query.input);

    if (!input) {
      throw new Error('Request whithout input');
    }

    const numbers = input.split(',').map((v) => Number(v));

    const output = processNumber(numbers, action);

    if (typeof output === 'undefined') {
      throw new Error('Invalid action');
    }

    if (isNaN(output)) {
      throw new Error('Invalid input');
    }

    const result = {
      action,
      input: numbers,
      output,
    };

    res.json(result);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send(error.message);
    }
  }
});

// 404 handler
router.use((req, res, next) => {
  res.status(404).send('Content not found!');
});

// Error handler
router.use((err: any, req: Request, res: Response, next: NextFunction) => {
  // console.error(err.stack);
  res.status(500).send('Something broke!');
});

export default router;
