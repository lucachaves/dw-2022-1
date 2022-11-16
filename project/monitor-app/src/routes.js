import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import Hosts from './models/Hosts.js';
import Users from './models/Users.js';

import { isAuthenticated } from './middleware/auth.js';

import { getHostLatency } from './lib/network.js';

const router = express.Router();

router.get('/', (req, res) => res.redirect('/hosts.html'));

router.get('/users', isAuthenticated, (req, res) => {
  const users = Users.readAll();

  res.json(users);
});

router.post('/users', async (req, res) => {
  const user = req.body;

  delete user.confirmationPassword;

  const newUser = await Users.create(user);

  // delete newUser.password;

  res.status(201).json(newUser);
});

router.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;

    const { id: userId, password: hash } = Users.readByEmail(email);

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

router.get('/hosts', isAuthenticated, (req, res) => {
  const hosts = Hosts.readAll();

  res.json(hosts);
});

router.post('/hosts', isAuthenticated, (req, res) => {
  const host = req.body;

  const newHost = Hosts.create(host);

  res.status(201).json(newHost);
});

router.put('/hosts/:id', isAuthenticated, (req, res) => {
  const id = req.params.id;

  const host = req.body;

  const newHost = Hosts.update(host, id);

  res.json(newHost);
});

router.delete('/hosts/:id', isAuthenticated, (req, res) => {
  const id = req.params.id;

  Hosts.remove(id);

  res.status(204).send();
});

router.get('/hosts/:hostId/times', isAuthenticated, async (req, res) => {
  const hostId = req.params.hostId;

  const host = Hosts.read(hostId);

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
