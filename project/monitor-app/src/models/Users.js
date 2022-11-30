import bcrypt from 'bcrypt';

const saltRounds = Number(process.env.SALT);

import prisma from '../database/index.js';

async function readAll() {
  const users = await prisma.host.findMany();

  return users;
}

async function read(id) {
  const user = await prisma.user.findFirst({
    where: {
      id,
    },
  });

  return user;
}

async function readByEmail(email) {
  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  return user;
}

async function create(user) {
  const hash = await bcrypt.hash(user.password, saltRounds);

  user.password = hash;

  const newHost = await prisma.user.create({
    data: user,
  });

  return newHost;
}

async function update(user, id) {
  const hash = await bcrypt.hash(user.password, saltRounds);

  user.password = hash;

  const newHost = await prisma.user.update({
    data: user,
    where: {
      id,
    },
  });

  return newHost;
}

async function remove(id) {
  await prisma.user.delete({
    where: {
      id,
    },
  });
}

export default {
  readAll,
  read,
  readByEmail,
  create,
  remove,
  update,
};
