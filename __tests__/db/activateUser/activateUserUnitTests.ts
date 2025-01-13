import { activateUser } from "@/app/db/activateUser";
import {
  UserDoesntExistError,
  UserIsAlreadyActiveError,
} from "@/app/db/errors";
import { prismaMock } from "../prismaMock";

describe("activateUser", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should throw UserDoesntExistError if the user does not exist", async () => {
    prismaMock.user.findUnique.mockResolvedValue(null);
    await expect(activateUser("non-existent-id")).rejects.toThrow(
      UserDoesntExistError,
    );

    expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
      where: { user_id: "non-existent-id" },
      select: { is_active: true },
    });
  });

  it("should throw UserIsAlreadyActiveError if the user is already active", async () => {
    prismaMock.user.findUnique.mockResolvedValue({ is_active: true });

    await expect(activateUser("active-user-id")).rejects.toThrow(
      UserIsAlreadyActiveError,
    );
    expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
      where: { user_id: "active-user-id" },
      select: { is_active: true },
    });
  });

  it("should update the user to be active if the user is not active", async () => {
    prismaMock.user.findUnique.mockResolvedValue({ is_active: false });
    prismaMock.user.update.mockResolvedValue({
      user_id: "inactive-user-id",
      is_active: true,
    });

    const result = await activateUser("inactive-user-id");

    expect(result).toEqual({ user_id: "inactive-user-id", is_active: true });
    expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
      where: { user_id: "inactive-user-id" },
      select: { is_active: true },
    });
    expect(prismaMock.user.update).toHaveBeenCalledWith({
      where: { user_id: "inactive-user-id" },
      data: { is_active: true },
    });
  });

  it("should always disconnect from the database", async () => {
    prismaMock.user.findUnique.mockResolvedValue(null);
    try {
      await activateUser("any-id");
    } catch (e) {
      expect(prismaMock.$disconnect).toHaveBeenCalled();
    }
  });
});
