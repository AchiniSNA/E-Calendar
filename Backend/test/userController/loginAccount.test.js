const userController = require('../../Controllers/userController'); // Import your function
const User = require('../../Models/userModel'); // Import your User model
const bcrypt = require('bcrypt');

// Mock the User model
jest.mock('../../Models/userModel', () => {
  return {
    findOne: jest.fn(),
  };
});

// Mock bcrypt's compare function
jest.mock('bcrypt', () => {
  return {
    compare: jest.fn(),
  };
});

describe('loginAccount', () => {
  it('should respond with success: true and user data when login is successful', async () => {
    const req = {
      body: {
        username: 'existingUsername',
        password: 'correctPassword',
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock the User.findOne to return a user
    User.findOne.mockResolvedValue({ username: 'existingUsername', password: 'hashedPassword' });

    // Mock bcrypt.compare to return true, indicating a correct password
    bcrypt.compare.mockResolvedValue(true);

    await userController.loginAccount(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ success: true, user: { username: 'existingUsername', password: 'hashedPassword' } });
  });

  it('should respond with a 404 status code when the user is not found', async () => {
    const req = {
      body: {
        username: 'nonexistentUsername',
        password: 'somePassword',
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock the User.findOne to return null, indicating no user found
    User.findOne.mockResolvedValue(null);

    await userController.loginAccount(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ success: false, message: 'User not found' });
  });

  it('should respond with a 401 status code when the password is incorrect', async () => {
    const req = {
      body: {
        username: 'existingUsername',
        password: 'incorrectPassword',
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock the User.findOne to return a user
    User.findOne.mockResolvedValue({ username: 'existingUsername', password: 'hashedPassword' });

    // Mock bcrypt.compare to return false, indicating an incorrect password
    bcrypt.compare.mockResolvedValue(false);

    await userController.loginAccount(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Incorrect password' });
  });

  it('should handle errors and respond with a 500 status code', async () => {
    const req = {
      body: {
        username: 'existingUsername',
        password: 'correctPassword',
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock the User.findOne to throw an error
    User.findOne.mockRejectedValue(new Error('Database error'));

    await userController.loginAccount(req, res);

    // expect(console.error).toHaveBeenCalledWith('Error retrieving user:', expect.any(Error));
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Internal Server Error' });
  });
});
