const userController = require('../../Controllers/userController'); // Assuming your function is in a separate file
const User = require('../../Models/userModel'); // Import your userModel
const mongoose = require('mongoose');

// Mock the User.findOne function
jest.mock('../../Models/userModel');

describe('checkUniqueUsername', () => {
  it('should return true for a unique username', async () => {
    // Mock the User.findOne function to return null (indicating a unique username)
    User.findOne.mockResolvedValue(null);

    const req = {
      body: {
        username: 'uniqueUsername',
      },
    };
    const res = {
      json: jest.fn(),
      status: jest.fn(),
    };

    await userController.checkUniqueUsername(req, res);

    expect(User.findOne).toHaveBeenCalledWith({ username: 'uniqueUsername' });
    expect(res.json).toHaveBeenCalledWith({ isUnique: true });
    expect(res.status).not.toHaveBeenCalled();
  });

  it('should return false for a non-unique username', async () => {
    // Mock the User.findOne function to return a user (indicating a non-unique username)
    User.findOne.mockResolvedValue({});

    const req = {
      body: {
        username: 'nonUniqueUsername',
      },
    };
    const res = {
      json: jest.fn(),
      status: jest.fn(),
    };

    await userController.checkUniqueUsername(req, res);

    expect(User.findOne).toHaveBeenCalledWith({ username: 'nonUniqueUsername' });
    expect(res.json).toHaveBeenCalledWith({ isUnique: false });
    expect(res.status).not.toHaveBeenCalled();
  });

  it('should handle errors by sending a 500 status response', async () => {
    // Mock the User.findOne function to throw an error
    User.findOne.mockRejectedValue(new Error('Database error'));

    const req = {
      body: {
        username: 'testUsername',
      },
    };
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(), // Mock the status function to allow chaining
    };

    await userController.checkUniqueUsername(req, res);

    expect(User.findOne).toHaveBeenCalledWith({ username: 'testUsername' });
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
  });
});

// Don't forget to reset the mock after each test
afterEach(() => {
  jest.resetAllMocks();
});
