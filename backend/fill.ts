import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // User 1
  const user1 = await prisma.user.create({
    data: {
      name: 'Sophia Brown',
      email: 'sophia.brown@example.com',
      image: null,
    },
  })

  await prisma.userInfo.create({
    data: {
      userId: user1.id,
      skills: 'Git, Backend, DevOps, DBMS, OOP',
      // other fields null or default
    },
  })

  // User 2
  const user2 = await prisma.user.create({
    data: {
      name: 'Alice Perez',
      email: 'alice.perez@example.com',
      image: null,
    },
  })

  await prisma.userInfo.create({
    data: {
      userId: user2.id,
      skills: 'ML/DS, API, DSA, Cloud, DevOps',
      // other fields null or default
    },
  })

  // User 3
  const user3 = await prisma.user.create({
    data: {
      name: 'Eve Davis',
      email: 'eve.davis@example.com',
      image: null,
    },
  })

  await prisma.userInfo.create({
    data: {
      userId: user3.id,
      skills: 'DevOps, Backend, API, DBMS, ML/DS',
      // other fields null or default
    },
  })

  // User 4
  const user4 = await prisma.user.create({
    data: {
      name: 'Quinn Rodriguez',
      email: 'quinn.rodriguez@example.com',
      image: null,
    },
  })

  await prisma.userInfo.create({
    data: {
      userId: user4.id,
      skills: 'WebDev, API, OOP, ML/DS, DBMS',
      // other fields null or default
    },
  })

  // User 5
  const user5 = await prisma.user.create({
    data: {
      name: 'Eve Harris',
      email: 'eve.harris@example.com',
      image: null,
    },
  })

  await prisma.userInfo.create({
    data: {
      userId: user5.id,
      skills: 'DBMS, ML/DS, API, DSA, WebDev, OOP',
      // other fields null or default
    },
  })

  // User 6
  const user6 = await prisma.user.create({
    data: {
      name: 'Riley Rodriguez',
      email: 'riley.rodriguez@example.com',
      image: null,
    },
  })

  await prisma.userInfo.create({
    data: {
      userId: user6.id,
      skills: 'Cloud, DevOps, DBMS, Backend, DSA',
      // other fields null or default
    },
  })

  // User 7
  const user7 = await prisma.user.create({
    data: {
      name: 'Paul Martinez',
      email: 'paul.martinez@example.com',
      image: null,
    },
  })

  await prisma.userInfo.create({
    data: {
      userId: user7.id,
      skills: 'ML/DS, Backend, DBMS, DSA, OOP, Cloud',
      // other fields null or default
    },
  })

  // User 8
  const user8 = await prisma.user.create({
    data: {
      name: 'Wendy Martinez',
      email: 'wendy.martinez@example.com',
      image: null,
    },
  })

  await prisma.userInfo.create({
    data: {
      userId: user8.id,
      skills: 'Backend, DBMS, API, WebDev, ML/DS',
      // other fields null or default
    },
  })

  // User 9
  const user9 = await prisma.user.create({
    data: {
      name: 'Sophia Clark',
      email: 'sophia.clark@example.com',
      image: null,
    },
  })

  await prisma.userInfo.create({
    data: {
      userId: user9.id,
      skills: 'WebDev, OOP, DevOps, DBMS, Cloud, ML/DS',
      // other fields null or default
    },
  })

  // User 10
  const user10 = await prisma.user.create({
    data: {
      name: 'Uma Robinson',
      email: 'uma.robinson@example.com',
      image: null,
    },
  })

  await prisma.userInfo.create({
    data: {
      userId: user10.id,
      skills: 'ML/DS, WebDev, Backend, DBMS, Cloud',
      // other fields null or default
    },
  })

  // User 11
  const user11 = await prisma.user.create({
    data: {
      name: 'Kara Rodriguez',
      email: 'kara.rodriguez@example.com',
      image: null,
    },
  })

  await prisma.userInfo.create({
    data: {
      userId: user11.id,
      skills: 'OOP, DSA, Backend, API, DevOps',
      // other fields null or default
    },
  })

  // User 12
  const user12 = await prisma.user.create({
    data: {
      name: 'Xander Hernandez',
      email: 'xander.hernandez@example.com',
      image: null,
    },
  })

  await prisma.userInfo.create({
    data: {
      userId: user12.id,
      skills: 'Git, DBMS, Backend, ML/DS, OOP, WebDev',
      // other fields null or default
    },
  })

  // User 13
  const user13 = await prisma.user.create({
    data: {
      name: 'Eve Lee',
      email: 'eve.lee@example.com',
      image: null,
    },
  })

  await prisma.userInfo.create({
    data: {
      userId: user13.id,
      skills: 'API, Cloud, WebDev, DevOps, DBMS, OOP',
      // other fields null or default
    },
  })

  // User 14
  const user14 = await prisma.user.create({
    data: {
      name: 'Victor Moore',
      email: 'victor.moore@example.com',
      image: null,
    },
  })

  await prisma.userInfo.create({
    data: {
      userId: user14.id,
      skills: 'ML/DS, API, DevOps, WebDev, DBMS, OOP',
      // other fields null or default
    },
  })

  // User 15
  const user15 = await prisma.user.create({
    data: {
      name: 'Olivia Thomas',
      email: 'olivia.thomas@example.com',
      image: null,
    },
  })

  await prisma.userInfo.create({
    data: {
      userId: user15.id,
      skills: 'DSA, DBMS, WebDev, OOP, DevOps',
      // other fields null or default
    },
  })

  // User 16
  const user16 = await prisma.user.create({
    data: {
      name: 'Xander Perez',
      email: 'xander.perez@example.com',
      image: null,
    },
  })

  await prisma.userInfo.create({
    data: {
      userId: user16.id,
      skills: 'ML/DS, DBMS, API, Backend, Git, Cloud',
      // other fields null or default
    },
  })

  // User 17
  const user17 = await prisma.user.create({
    data: {
      name: 'Olivia Rodriguez',
      email: 'olivia.rodriguez@example.com',
      image: null,
    },
  })

  await prisma.userInfo.create({
    data: {
      userId: user17.id,
      skills: 'DBMS, DevOps, Git, API, OOP',
      // other fields null or default
    },
  })

  // User 18
  const user18 = await prisma.user.create({
    data: {
      name: 'Ivy Brown',
      email: 'ivy.brown@example.com',
      image: null,
    },
  })

  await prisma.userInfo.create({
    data: {
      userId: user18.id,
      skills: 'API, WebDev, Cloud, DSA, OOP, DevOps',
      // other fields null or default
    },
  })

  // User 19
  const user19 = await prisma.user.create({
    data: {
      name: 'Olivia Harris',
      email: 'olivia.harris@example.com',
      image: null,
    },
  })

  await prisma.userInfo.create({
    data: {
      userId: user19.id,
      skills: 'DevOps, DBMS, Git, API, OOP',
      // other fields null or default
    },
  })

  // User 20
  const user20 = await prisma.user.create({
    data: {
      name: 'Olivia Martin',
      email: 'olivia.martin@example.com',
      image: null,
    },
  })

  await prisma.userInfo.create({
    data: {
      userId: user20.id,
      skills: 'WebDev, OOP, ML/DS, Git, API',
      // other fields null or default
    },
  })

  console.log('Seeded 20 users with skills')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })