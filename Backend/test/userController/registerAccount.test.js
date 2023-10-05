const User = require('../../Models/userModel');
const validate  = User.validate;
const userController = require('../../Controllers/userController');

jest.mock('../../Models/userModel', () => {
  return {
    findOne: jest.fn(),
    create: jest.fn(),
  };
});

jest.mock('../../Models/userModel', () => {
  return {
    validate: jest.fn(),
  };
});

describe('registerAccount', () => {
  it('should create a new account and respond with a 200 status code when registration is successful', async () => {
    const req = {
      body: {
        username: 'newUsername',
        password: 'newPassword',
        account_number: '1234567890',
        branch: 'Sample Branch',
        name: 'John Doe',
        phone_number: '123-456-7890',
        email: 'john@example.com',
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock User.findOne to return null, indicating the username is not taken
    User.findOne.mockResolvedValue(null);

    // Mock User.create to return the created user
    const createdUser = {
      ...req.body,
      _id: 'someUserId',
    };
    User.create.mockResolvedValue(createdUser);

    // Mock the validate function to return no error
    validate.mockReturnValue({ error: null });

    await userController.registerAccount(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ success: true, account: createdUser });
  });

  it('should respond with a 400 status code and an error message when validation fails', async () => {
    const req = {
      body: {
        // Missing required fields
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock the validate function to return an error
    const validationError = new Error('Validation error');
    validate.mockReturnValue({ error: validationError });

    await userController.registerAccount(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: validationError.message,
    });
  });

  it('should respond with a 410 status code when the username already exists', async () => {
    const req = {
      body: {
        username: 'existingUsername',
        password: 'newPassword',
        account_number: '1234567890',
        branch: 'Sample Branch',
        name: 'John Doe',
        phone_number: '123-456-7890',
        email: 'john@example.com',
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    // Mock User.findOne to return a user, indicating the username is already taken
    User.findOne.mockResolvedValue({ username: 'existingUsername' });

    await userController.registerAccount(req, res);

    expect(res.status).toHaveBeenCalledWith(410);
    expect(res.send).toHaveBeenCalledWith('User already exists');
  });

  it('should handle errors and respond with a 500 status code', async () => {
    const req = {
      body: {
        username: 'newUsername',
        password: 'newPassword',
        account_number: '1234567890',
        branch: 'Sample Branch',
        name: 'John Doe',
        phone_number: '123-456-7890',
        email: 'john@example.com',
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock User.findOne to return null, indicating the username is not taken
    User.findOne.mockResolvedValue(null);
// Mock User.create to throw an error
User.create.mockRejectedValue(new Error('Registration error'));

await userController.registerAccount(req, res);

expect(console.error).toHaveBeenCalledWith('Registration error:', expect.any(Error));
expect(res.status).toHaveBeenCalledWith(500);
expect(res.json).toHaveBeenCalledWith({ success: false, message: 'Internal Server Error' });
});
});
