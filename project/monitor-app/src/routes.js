import express from 'express';

import Hosts from './models/Hosts.js';
import Users from './models/Users.js';

import { getHostLatency } from './lib/network.js';

const router = express.Router();

router.get('/users', (req, res) => {
  const users = Users.readAll();

  res.json(users);
});

router.post('/users', async (req, res) => {
  const user = req.body;

  delete user.confirmationPassword;

  const newUser = await Users.create(user);

  delete newUser.password;

  res.status(201).json(newUser);
});

router.get('/hosts', (req, res) => {
  const hosts = Hosts.readAll();

  res.json(hosts);
});

router.post('/hosts', (req, res) => {
  const host = req.body;

  const newHost = Hosts.create(host);

  res.status(201).json(newHost);
});

router.put('/hosts/:id', (req, res) => {
  const id = req.params.id;

  const host = req.body;

  const newHost = Hosts.update(host, id);

  res.json(newHost);
});

router.delete('/hosts/:id', (req, res) => {
  const id = req.params.id;

  Hosts.remove(id);

  res.status(204).send();
});

router.get('/hosts/:hostId/times', async (req, res) => {
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
