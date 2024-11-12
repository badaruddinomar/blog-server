import { faker } from '@faker-js/faker';
import User from '../models/user.model';

// Function to generate a fake user
function generateFakeUser() {
  return {
    name: faker.name.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password({ length: 10 }),
    avatar: faker.image.avatar(),
  };
}

export async function generateFakeUsers(count = 10) {
  const fakeUsers = Array.from({ length: count }, generateFakeUser);

  try {
    await User.insertMany(fakeUsers);
    console.log(`${count} fake users saved to MongoDB`);
  } catch (error) {
    console.error('Error saving users:', error);
  }
}
