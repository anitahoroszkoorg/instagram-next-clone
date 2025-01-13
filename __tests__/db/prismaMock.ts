export const prismaMock = {
  user: {
    findUnique: jest.fn(),
    update: jest.fn(),
  },
  $disconnect: jest.fn(),
};

export const PrismaClientMock = jest.fn(() => prismaMock);
jest.mock("@prisma/client", () => ({
  PrismaClient: PrismaClientMock,
}));
