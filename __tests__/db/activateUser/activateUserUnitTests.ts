import { activateUser, dummyFunction } from '@/app/db/activateUser';
import { UserDoesntExistError, UserIsAlreadyActiveError } from '@/app/db/errors';
import { PrismaClient } from '@prisma/client';
import { render } from '@testing-library/react'
 
it('dummy', () => {
    expect(dummyFunction()).toBe(1); // toBe checks for strict equality (===)
})

jest.mock('@prisma/client', () => {
    const mPrisma = {
      user: {
        findUnique: jest.fn(),
        update: jest.fn(),
      },
      $disconnect: jest.fn(),
    };
    return {
      PrismaClient: jest.fn(() => mPrisma),
    };
  });
  
  const prisma = new PrismaClient();
  
  describe('activateUser', () => {
    afterEach(() => {
      jest.clearAllMocks(); // Clear mocks after each test
    });
  
    it('should throw UserDoesntExistError if the user does not exist', async () => {
      prisma.user.findUnique.mockResolvedValue(null); 

      await expect(activateUser('non-existent-id')).rejects.toThrow(UserDoesntExistError);

      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { user_id: 'non-existent-id' },
        select: { is_active: true },
      });
    });
  
    it('should throw UserIsAlreadyActiveError if the user is already active', async () => {
      prisma.user.findUnique.mockResolvedValue({ is_active: true }); // Simulate user is already active
  
      await expect(activateUser('active-user-id')).rejects.toThrow(UserIsAlreadyActiveError);
      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { user_id: 'active-user-id' },
        select: { is_active: true },
      });
    });
  
    it('should update the user to be active if the user is not active', async () => {
      prisma.user.findUnique.mockResolvedValue({ is_active: false }); // Simulate user is inactive
      prisma.user.update.mockResolvedValue({ user_id: 'inactive-user-id', is_active: true }); // Simulate successful activation
  
      const result = await activateUser('inactive-user-id');
  
      expect(result).toEqual({ user_id: 'inactive-user-id', is_active: true });
      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { user_id: 'inactive-user-id' },
        select: { is_active: true },
      });
      expect(prisma.user.update).toHaveBeenCalledWith({
        where: { user_id: 'inactive-user-id' },
        data: { is_active: true },
      });
    });
  
    it('should always disconnect from the database', async () => {
      prisma.user.findUnique.mockResolvedValue(null); // Simulate no user found
      try {
        await activateUser('any-id');
      } catch (e) {
        expect(prisma.$disconnect).toHaveBeenCalled(); // Ensure disconnect is always called
      }
    });
  });