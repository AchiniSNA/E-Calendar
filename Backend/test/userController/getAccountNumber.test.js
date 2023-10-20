const userController = require('../../Controllers/userController'); // Import your function
const User = require('../../Models/userModel'); // Import your User model
// Mock the User model
jest.mock('../../Models/userModel', () => {
  return {
    findOne: jest.fn(),
  };
});

describe('getAccountNumber', () => {
  it('should respond with success: true and the account number when the user is found', async () => {
    const req = {
      params: {
        username: 'existingUsername',
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock the User.findOne to return a user with an account number
    User.findOne.mockResolvedValue({ username: 'existingUsername', account_number: '1234567890' });

    await userController.getAccountNumber(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ success: true, accountNumber: '1234567890' });
  });

  it('should respond with a 404 status code when the user is not found', async () => {
    const req = {
      params: {
        username: 'nonexistentUsername',
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock the User.findOne to return null, indicating no user found
    User.findOne.mockResolvedValue(null);

    await userController.getAccountNumber(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ success: false, message: 'User not found' });
  });

  it('should handle errors and respond with a 500 status code', async () => {
    const req = {
      params: {
        username: 'existingUsername',
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Create a custom mock for console.error
    const consoleErrorMock = jest.fn();
    const originalConsoleError = console.error;
    console.error = consoleErrorMock;

    // Mock the User.findOne to throw an error
    const error = new Error('Database error');
    User.findOne.mockRejectedValue(error);

    await userController.getAccountNumber(req, res);

    // Assert that the custom console.error mock was called with the expected message
    expect(consoleErrorMock).toHaveBeenCalledWith('Error retrieving user:', error);

    // Restore the original console.error function
    console.error = originalConsoleError;

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Internal Server Error' });
  });
});
