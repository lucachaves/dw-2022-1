import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const saltRounds = Number(process.env.SALT);

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

import { isAuthenticated } from './middleware/auth.js';

import { getHostLatency } from './lib/network.js';

const router = express.Router();

router.get('/', (req, res) => res.redirect('/hosts.html'));

router.get('/users', isAuthenticated, async (req, res) => {
  const users = await prisma.user.findMany();

  res.json(users);
});

router.post('/users', async (req, res) => {
  const data = req.body;

  delete data.confirmationPassword;

  const hash = await bcrypt.hash(data.password, saltRounds);

  data.password = hash;

  const newUser = await prisma.user.create({ data });

  res.status(201).json(newUser);
});

router.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    const { id: userId, password: hash } = user;

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
  const hosts = await prisma.host.findMany();

  res.json(hosts);
});

router.post('/hosts', isAuthenticated, async (req, res) => {
  const data = req.body;

  const newHost = await prisma.host.create({
    data,
  });

  res.status(201).json(newHost);
});

router.put('/hosts/:id', isAuthenticated, async (req, res) => {
  const id = Number(req.params.id);

  const data = req.body;

  const newHost = await prisma.host.update({
    where: {
      id: Number(id),
    },
    data,
  });

  res.json(newHost);
});

router.delete('/hosts/:id', isAuthenticated, async (req, res) => {
  const id = Number(req.params.id);

  await prisma.host.deleteMany({
    where: {
      id,
    },
  });

  res.status(204).send();
});

router.get('/hosts/:hostId/times', isAuthenticated, async (req, res) => {
  const id = Number(req.params.hostId);

  const count = req.query.count;

  const host = await prisma.host.findFirst({
    where: {
      id,
    },
  });

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
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

export default router;
