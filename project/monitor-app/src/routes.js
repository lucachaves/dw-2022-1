import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import Hosts from './models/Hosts.js';
import Users from './models/Users.js';

import { isAuthenticated } from './middleware/auth.js';

import { getHostLatency } from './lib/network.js';

const router = express.Router();

router.get('/', (req, res) => res.redirect('/hosts.html'));

router.get('/users', isAuthenticated, async (req, res) => {
  const users = await Users.readAll();

  res.json(users);
});

router.post('/users', async (req, res) => {
  const user = req.body;

  delete user.confirmationPassword;

  const newUser = await Users.create(user);

  res.status(201).json(newUser);
});

router.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;

    const { id: userId, password: hash } = await Users.readByEmail(email);

    const match = await bcrypt.compare(password, hash);

    if (match) {
      const token = jwt.sign(
        { userId },
        process.env.SECRET,
        { expiresIn: 3600 } // 1h
      );

      res.json({ auth: true, token });
    } else {
      throw new Error('User not found');
    }
  } catch (error) {
    res.status(401).json({ error: 'User not found' });
  }
});

router.get('/hosts', isAuthenticated, async (req, res) => {
  const hosts = await Hosts.readAll();

  res.json(hosts);
});

router.post('/hosts', isAuthenticated, async (req, res) => {
  const host = req.body;

  const newHost = await Hosts.create(host);

  res.status(201).json(newHost);
});

router.put('/hosts/:id', isAuthenticated, async (req, res) => {
  const id = Number(req.params.id);

  const host = req.body;

  const newHost = await Hosts.update(host, id);

  res.json(newHost);
});

router.delete('/hosts/:id', isAuthenticated, async (req, res) => {
  const id = Number(req.params.id);

  Hosts.remove(id);

  res.status(204).send();
});

router.get('/hosts/:hostId/times', isAuthenticated, async (req, res) => {
  const hostId = Number(req.params.hostId);

  const host = await Hosts.read(hostId);

  const count = req.query.count;

  const { times } = await getHostLatency(host.address, count);

  res.json({
    times,
  });
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
