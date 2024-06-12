const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const priority = {
  HIGH: 1,
  MEDIUM: 2,
  LOW: 3,
  LOWEST: 4,
  NONE: 5,
}

const groceryItems = [
  {
    name: 'Apples',
    quantity: 0,
    priority: priority.HIGH,
  },
  {
    name: 'Bananas',
    quantity: 0,
    priority: priority.HIGH,
  },
  {
    name: 'Bread',
    quantity: 0,
    priority: priority.MEDIUM,
  },
  {
    name: 'Milk',
    quantity: 0,
    priority: priority.LOW,
  },
  {
    name: 'Eggs',
    quantity: 0,
    priority: priority.LOWEST,
  },
  {
    name: 'Lettuce',
    quantity: 0,
    priority: priority.NONE,
  },
  {
    name: 'Tomato',
    quantity: 0,
    priority: priority.LOW,
  },
  {
    name: 'Potatoes',
    quantity: 0,
    priority: priority.MEDIUM,
  },
  {
    name: 'Cheese',
    quantity: 0,
    priority: priority.HIGH,
  },
  {
    name: 'Carrots',
    quantity: 0,
    priority: priority.MEDIUM,
  },
  {
    name: 'Onions',
    quantity: 0,
    priority: priority.LOW,
  },
  {
    name: 'Chicken',
    quantity: 0,
    priority: priority.HIGH,
  },
  {
    name: 'Beef',
    quantity: 0,
    priority: priority.HIGH,
  },
  {
    name: 'Fish',
    quantity: 0,
    priority: priority.HIGH,
  },
  {
    name: 'Yogurt',
    quantity: 0,
    priority: priority.MEDIUM,
  },
  {
    name: 'Cereal',
    quantity: 0,
    priority: priority.LOW,
  },
  {
    name: 'Rice',
    quantity: 0,
    priority: priority.NONE,
  },
  {
    name: 'Pasta',
    quantity: 0,
    priority: priority.NONE,
  },
  {
    name: 'Spinach',
    quantity: 0,
    priority: priority.LOW,
  },
  {
    name: 'Butter',
    quantity: 0,
    priority: priority.LOWEST,
  },
];

async function main() {
  await prisma.user.upsert({
    where: { email: 'testuser@example.com' },
    update: {},
    create: {
      email: 'testuser@example.com',
      password: 'testpassword',
    },
  })

  await Promise.all(groceryItems.map(item => prisma.groceryItem.create({ data: item })))
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async e => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
