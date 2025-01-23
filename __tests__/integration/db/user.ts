import { prisma } from "@/app/api/_base";
import { activateUser } from "@/app/db/activateUser";
import {
  UserDoesntExistError,
  UserIsAlreadyActiveError,
} from "@/app/db/errors";
import { addUser } from "@/app/db/users";

const testUser = {
  email: "test@email.com",
  password_hash: "123",
  username: "tester",
  full_name: "test test",
};

afterEach(async () => {
  const deleteUsers = prisma.user.deleteMany();
  await prisma.$transaction([deleteUsers]);
  await prisma.$disconnect();
});

it("Test new user is by default inactive and activating him", async () => {
  const newUser = await addUser(testUser);
  expect(newUser.is_active).toBe(false);
  const updatedUser = await activateUser(newUser.user_id);
  expect(updatedUser.is_active).toBe(true);
});

it("Test new user can't be activated twice", async () => {
  const newUser = await addUser(testUser);
  expect(newUser.is_active).toBe(false);
  await activateUser(newUser.user_id);
  await expect(activateUser(newUser.user_id)).rejects.toThrow(
    UserIsAlreadyActiveError,
  );
});

it("Test can't activate not existing user", async () => {
  await expect(activateUser("not-existing")).rejects.toThrow(
    UserDoesntExistError,
  );
});
