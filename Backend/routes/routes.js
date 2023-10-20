const express = require("express");
const router = express.Router();
var Cors = require("cors");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const eventController = require("../Controllers/eventController");
const userController = require("../Controllers/userController");
const calendarControler = require("../Controllers/calendarController");
const appointmentController = require("../Controllers/appointmentController");
const reminderController = require("../Controllers/reminderController");

/**
 * @swagger
 * components:
 *      schemas:
 *          user:
 *              properties:
 *                  username:
 *                      type: 'string'
 *                  password:
 *                      type : 'string'
 *                  account_number:
 *                      type : 'string'
 *                  branch:
 *                      type : 'string'
 *                  name:
 *                      type : 'string'
 *                  phone_number:
 *                      type : 'string'
 *                  email:
 *                      type : 'string'
 *                  google_calendar:
 *                      type : 'string'
 *                  apple_calendar:
 *                      type : 'string'
 *                  time_zone:
 *                      type: 'string'
 *          event:
 *              properties:
 *                  calendar_id:
 *                      type : "array"
 *                  username:
 *                      type : 'string'
 *                  title:
 *                      type : 'string'
 *                  date:
 *                      type : 'string'
 *                  description:
 *                      type : 'string'
 *                  recurring:
 *                      type : 'string'
 *                  notification:
 *                      type : 'string'
 *                  image:
 *                      type : 'string'
 *                  icon:
 *                      type: 'string'
 *                  Synchronize:
 *                      type: 'array'
 *                  time_zone:
 *                      type: 'string'
 *                  startTime:
 *                      type: 'string'
 *                  finishTime:
 *                      type: 'string'
 *                  color:
 *                      type: 'string'
 *          reminder:
 *              properties:
 *                  calendar_id:
 *                      type : 'string'
 *                  title:
 *                      type : 'string'
 *                  date:
 *                      type : 'string'
 *                  description:
 *                      type : 'string'
 *                  recurring:
 *                      type : 'string'
 *                  time_zone:
 *                      type: 'string'
 *                  time:
 *                      type: 'string'
 *                  username:
 *                      type: 'string'
 *          appointment:
 *              properties:
 *                  calendar_id:
 *                      type : 'array'
 *                  title:
 *                      type : 'string'
 *                  date:
 *                      type : 'string'
 *                  description:
 *                      type : 'string'
 *                  recurring:
 *                      type : 'string'
 *                  notification:
 *                      type: 'string'
 *                  image:
 *                      type: 'string'
 *                  icon:
 *                      type: 'string'
 *                  synchronize:
 *                      type: 'array'
 *                  time_zone:
 *                      type: 'string'
 *                  startTime:
 *                      type: 'string'
 *                  finishTime:
 *                      type: 'string'
 *                  username:
 *                      type: 'string'
 *                  color:
 *                      type: 'string'
 *          calendar:
 *              properties:
 *                  username:
 *                      type: 'string'
 *                  account_number:
 *                      type: 'string'
 *                  access:
 *                      type: 'array'
 *                  name:
 *                      type: 'string'
 */

/**
 * @swagger
 * tags:
 *  - name: event
 *    description: Everything about events
 *  - name: user
 *    description: Everything about users
 *  - name: reminder
 *    description: Everything about reminders
 *  - name: appointment
 *    description: Everything about appointment
 *  - name: calendar
 *    description: Everything about calendars
 * /event/getEvent/{event_id}:
 *   get:
 *     tags:
 *       - event
 *     summary: Get an event by event_id
 *     description: Retrieve an event from the database by specifying its event_id.
 *     operationId: getEvent
 *     parameters:
 *       - name: event_id
 *         in: path
 *         description: The ID of the event to retrieve
 *         required: true
 *         schema:
 *           $ref: '#components/schemas/event'
 *     responses:
 *       200:
 *         description: Event retrieved successfully.
 *       404:
 *         description: Event not found.
 *       500:
 *         description: Internal server error occurred.
* /event/createEvent:
 *   post:
 *     tags:
 *       - event
 *     summary: Create a new event
 *     description: Create a new event and save it in the database.
 *     operationId: createEvent
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/event'
 *     responses:
 *       200:
 *         description: Event created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/event'
 *       400:
 *         description: Bad request. Validation error in the request body.
 *       500:
 *         description: Internal server error occurred.
 * /event/updateEvent/{event_id}:
 *   put:
 *      tags:
 *          - event
 *      summary: Update an event
 *      description: This API is used to update an existing event in the database.
 *      parameters:
 *        - in: path
 *          name: event_id
 *          schema:
 *            type: string
 *          required: true
 *          description: Event ID to update.
 *      requestBody:
 *          description: Updated event data
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/event' # Assuming your schema is defined as 'Event'
 *      responses:
 *          200:
 *              description: Successful update.
 *          404:
 *              description: Event not found.
 *          500:
 *              description: Error while updating the event.
 * /event/deleteEvent/{event_id}:
 *   delete:
 *     tags:
 *       - event
 *     summary: Delete an event
 *     description: Delete an event from the database by specifying its event_id.
 *     operationId: deleteEvent
 *     parameters:
 *       - name: event_id
 *         in: path
 *         description: The ID of the event to delete
 *         required: true
 *         schema:
 *           type: 'string'
 *     responses:
 *       200:
 *         description: Event deleted successfully.
 *       404:
 *         description: Event not found.
 *       500:
 *         description: Internal server error occurred.
 * /event/getEventsByDate/{date}:
 *   get:
 *     tags:
 *       - event
 *     summary: Get events by date
 *     description: Retrieve events from the database for a specific date.
 *     operationId: getEventsByDate
 *     parameters:
 *       - name: date
 *         in: path
 *         description: The date in 'YYYY-MM-DD' format
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Events retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *       404:
 *         description: No events found for this date.
 *       500:
 *         description: Internal server error occurred.
 * /user/registerAccount:
 *   post:
 *     tags:
 *       - user
 *     summary: Register a new user account
 *     description: Create a new user account and save it in the database.
 *     operationId: registerAccount
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/user'
 *     responses:
 *       200:
 *         description: User account registered successfully.
 *       400:
 *         description: Bad request. Validation error in the request body.
 *       410:
 *         description: User already exists.
 *       500:
 *         description: Internal server error occurred.
 * /user/getUser/{username}:
 *   get:
 *     tags:
 *       - user
 *     summary: Get a user by username
 *     description: Retrieve a user from the database by specifying their username.
 *     operationId: getUser
 *     parameters:
 *       - name: username
 *         in: path
 *         description: The username of the user to retrieve
 *         required: true
 *         schema:
 *           $ref: '#components/schemas/user'
 *     responses:
 *       200:
 *         description: User retrieved successfully.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal server error occurred.
 * /user/loginAccount:
 *   post:
 *     tags:
 *       - user
 *     summary: User Login
 *     description: Authenticate a user by username and password.
 *     operationId: loginUser
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username of the user.
 *               password:
 *                 type: string
 *                 description: The user's password.
 *             example:
 *               username: string
 *               password: string
 *     responses:
 *       200:
 *         description: User logged in successfully.
 *       401:
 *         description: Incorrect password or user not found.
 *       500:
 *         description: Internal server error occurred.
 * /user/checkUniqueUsername:
 *   post:
 *     tags:
 *       - user
 *     summary: Unique username check
 *     description: Check whether the username is unique
 *     operationId: checkUniqueUsername
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username of the user.
 *             example:
 *               username: string
 *     responses:
 *       500:
 *         description: Internal server error occurred.
 * /reminder/createReminder:
 *   post:
 *      tags:
 *          - reminder
 *      summary: Insert new reminder
 *      description: This api is use to insert a new reminder into the database
 *      requestBody:
 *          description: Create a new reminder in the database
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/reminder'
 *      responses:
 *          200:
 *              description: Successful.
 *          400:
 *              description: content can not be empty.
 *          500:
 *              description: error while creating the model.
 * /reminder/editReminder/{reminder_id}:
 *   put:
 *      tags:
 *          - reminder
 *      summary: Edit an existing reminder
 *      description: This API is used to edit an existing reminder in the database.
 *      parameters:
 *        - in: path
 *          name: reminder_id
 *          schema:
 *            type: string
 *          required: true
 *          description: Reminder ID to edit.
 *      requestBody:
 *          description: Updated reminder data
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/reminder' # Assuming your schema is defined as 'Reminder'
 *      responses:
 *          200:
 *              description: Successful edit.
 *          404:
 *              description: Reminder not found.
 *          500:
 *              description: Error while editing the reminder.
 * /reminder/deleteReminder/{reminder_id}:
 *   delete:
 *     tags:
 *          - reminder
 *     summary: Delete a reminder
 *     description: Delete a reminder from the database by specifying its reminder_id.
 *     operationId: deleteReminder
 *     parameters:
 *       - name: reminder_id
 *         in: path
 *         description: The ID of the reminder to delete
 *         required: true
 *         schema:
 *           type: 'string'
 *     responses:
 *       200:
 *         description: Reminder deleted successfully.
 *       404:
 *         description: Reminder not found.
 *       500:
 *         description: Internal server error occurred.
 * /reminder/getReminder/{reminder_id}:
 *   get:
 *     tags:
 *          - reminder
 *     summary: Get a reminder by reminder_id
 *     description: Retrieve a reminder from the database by specifying its reminder_id.
 *     operationId: getReminder
 *     parameters:
 *       - name: reminder_id
 *         in: path
 *         description: The ID of the reminder to retrieve
 *         required: true
 *         schema:
 *           $ref: '#components/schemas/reminder'
 *     responses:
 *       200:
 *         description: Reminder retrieved successfully.
 *       404:
 *         description: Reminder not found.
 *       500:
 *         description: Internal server error occurred.
 * /reminder/getRemindersByDate/{date}:
 *   get:
 *     tags:
 *       - reminder
 *     summary: Get reminders by date
 *     description: Retrieve reminders from the database for a specific date.
 *     operationId: getRemindersByDate
 *     parameters:
 *       - name: date
 *         in: path
 *         description: The date in 'YYYY-MM-DD' format
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Reminders retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *       404:
 *         description: No reminders found for this date.
 *       500:
 *         description: Internal server error occurred.
 * /appointment/getAppointment/{appointment_id}:
 *   get:
 *     tags:
 *       - appointment
 *     summary: Get an appointment by appointment_id
 *     description: Retrieve an appointment from the database by specifying its appointment_id.
 *     operationId: getAppointment
 *     parameters:
 *       - name: appointment_id
 *         in: path
 *         description: The ID of the appointment to retrieve
 *         required: true
 *         schema:
 *           $ref: '#components/schemas/appointment'
 *     responses:
 *       200:
 *         description: Appointment retrieved successfully.
 *       404:
 *         description: Appointment not found.
 *       500:
 *         description: Internal server error occurred.
 * /appointment/createAppointment:
 *   post:
 *      tags:
 *       - appointment
 *      summary: Insert new appointment
 *      description: This api is use to insert a new appointment into the database
 *      requestBody:
 *          description: Create a new appointment in the database
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/appointment'
 *      responses:
 *          200:
 *              description: Successful.
 *          400:
 *              description: content can not be empty.
 *          500:
 *              description: error while creating the model.
 * /appointment/editAppointment/{appointment_id}:
 *   put:
 *      tags:
 *        - appointment
 *      summary: Edit an existing appointment
 *      description: This API is used to edit an existing appointment in the database.
 *      parameters:
 *        - in: path
 *          name: appointment_id
 *          schema:
 *            type: string
 *          required: true
 *          description: Appointment ID to edit.
 *      requestBody:
 *          description: Updated appointment data
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/appointment' # Assuming your schema is defined as 'Appointment'
 *      responses:
 *          200:
 *              description: Successful edit.
 *          404:
 *              description: Appointment not found.
 *          500:
 *              description: Error while editing the appointment.
 * /appointment/deleteAppointment/{appointment_id}:
 *   delete:
 *     tags:
 *       - appointment
 *     summary: Delete a appointment
 *     description: Delete a appointment from the database by specifying its appointment_id.
 *     operationId: deleteAppointment
 *     parameters:
 *       - name: appointment_id
 *         in: path
 *         description: The ID of the appointment to delete
 *         required: true
 *         schema:
 *           type: 'string'
 *     responses:
 *       200:
 *         description: Appointment deleted successfully.
 *       404:
 *         description: Appointment not found.
 *       500:
 *         description: Internal server error occurred.
 * /calendar/createCalendar:
 *   post:
 *      tags:
 *       - calendar
 *      summary: Insert new calendar
 *      description: This API is used to insert a new calendar into the database.
 *      requestBody:
 *          description: Create a new calendar in the database
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/calendar' # Assuming your schema is defined as 'Event'
 *      responses:
 *          200:
 *              description: Successful.
 *          400:
 *              description: Content can not be empty.
 *          500:
 *              description: Error while creating the model.
 * /calendar/getCalendar/{calendar_id}:
 *   get:
 *     tags:
 *       - calendar
 *     summary: Get a calendar by calendar_id
 *     description: Retrieve a calendar from the database by specifying its calendar_id.
 *     operationId: getCalendar
 *     parameters:
 *       - name: calendar_id
 *         in: path
 *         description: The ID of the calendar to retrieve
 *         required: true
 *         schema:
 *           $ref: '#components/schemas/appointment'
 *     responses:
 *       200:
 *         description: Calendar retrieved successfully.
 *       404:
 *         description: Calendar not found.
 *       500:
 *         description: Internal server error occurred.
 * /calendar/deleteCalendar/{calendar_id}:
 *   delete:
 *     tags:
 *       - calendar
 *     summary: Delete a calendar
 *     description: Delete a calendar from the database by specifying its calendar_id.
 *     operationId: deleteCalendar
 *     parameters:
 *       - name: calendar_id
 *         in: path
 *         description: The ID of the calendar to delete
 *         required: true
 *         schema:
 *           type: 'string'
 *     responses:
 *       200:
 *         description: Calendar deleted successfully.
 *       404:
 *         description: Calendar not found.
 *       500:
 *         description: Internal server error occurred.
 * /calendar/getUserCalendars/{username}:
 *   get:
 *     tags:
 *       - calendar
 *     summary: Get calendar IDs for a user
 *     description: Retrieve calendar IDs associated with a user by specifying their username.
 *     operationId: getUserCalendars
 *     parameters:
 *       - name: username
 *         in: path
 *         description: The username of the user to retrieve calendar IDs for
 *         required: true
 *         schema:
 *           type: 'string'
 *     responses:
 *       200:
 *         description: Calendar IDs retrieved successfully.
 *       404:
 *         description: No calendars found for this user.
 *       500:
 *         description: Internal server error occurred.
 * /user/getAccountNumber/{username}:
 *   get:
 *     tags:
 *       - user
 *     summary: Get user's account number
 *     description: Retrieve the account number associated with a specific user.
 *     operationId: getAccountNumber
 *     parameters:
 *       - name: username
 *         in: path
 *         description: The username of the user to retrieve the account number for
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User's account number retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 accountNumber:
 *                   type: string
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal server error occurred.
* /event/getAllEventsForUser/{username}:
 *   get:
 *     tags:
 *       - event
 *     summary: Get all events for a user
 *     description: Retrieve all events associated with a specific user.
 *     operationId: getAllEventsForUser
 *     parameters:
 *       - name: username
 *         in: path
 *         description: The username of the user to retrieve events for
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Events retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 events:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/event'
 *       404:
 *         description: No events found for this user.
 *       500:
 *         description: Internal server error occurred.
 * /reminder/getAllRemindersForUser/{username}:
 *   get:
 *     tags:
 *       - reminder
 *     summary: Get all reminders for a user
 *     description: Retrieve all reminders associated with a specific user.
 *     operationId: getAllRemindersForUser
 *     parameters:
 *       - name: username
 *         in: path
 *         description: The username of the user to retrieve reminders for
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Reminders retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 reminders:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/reminder'
 *       404:
 *         description: No reminders found for this user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       500:
 *         description: Internal server error occurred.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 error:
 *                   type: string
 * 
 * /appointment/getAllAppointmentsForUser/{username}:
 *   get:
 *     tags:
 *       - appointment
 *     summary: Get all appointments for a user
 *     description: Retrieve all appointments associated with a specific user.
 *     operationId: getAllAppointmentsForUser
 *     parameters:
 *       - name: username
 *         in: path
 *         description: The username of the user to retrieve appointments for
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Appointments retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 appointments:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/appointment'
 *       404:
 *         description: No appointments found for this user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       500:
 *         description: Internal server error occurred.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 * /user/{username}/events/{date}:
 *   get:
 *     tags:
 *       - event
 *     summary: Get events for a user by date
 *     description: Retrieve events associated with a specific user for a given date.
 *     operationId: getEventsForUserByDate
 *     parameters:
 *       - name: username
 *         in: path
 *         description: The username of the user to retrieve events for
 *         required: true
 *         schema:
 *           type: string
 *       - name: date
 *         in: path
 *         description:The date for which to retrieve events (format: YYYY-MM-DD)
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *     responses:
 *       200:
 *         description: Events retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/event'
 *       500:
 *         description: Internal server error occurred.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 * /event/getEventsByCalendarIds:
 *   get:
 *     tags:
 *       - event
 *     summary: Get events by calendar IDs
 *     description: Retrieve events associated with specific calendar IDs.
 *     operationId: getEventsByCalendarIds
 *     parameters:
 *       - in: query
 *         name: calendarIds
 *         description: Comma-separated list of calendar IDs
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Events retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 events:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/event'
 *       400:
 *         description: Bad request. Missing or invalid calendarIds parameter.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       404:
 *         description: No events found for the provided calendar IDs.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       500:
 *         description: Internal server error occurred.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 error:
 *                   type: string
 * /appointment/getAppointmentsByCalendarIds:
 *   get:
 *     tags:
 *       - appointment
 *     summary: Get appointments by calendar IDs
 *     description: Retrieve appointments associated with specific calendar IDs.
 *     operationId: getAppointmentsByCalendarIds
 *     parameters:
 *       - in: query
 *         name: calendarIds
 *         description: Comma-separated list of calendar IDs
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Appointments retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 appointments:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/appointment'
 *       400:
 *         description: Bad request. Missing or invalid calendarIds parameter.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       404:
 *         description: No appointments found for the provided calendar IDs.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       500:
 *         description: Internal server error occurred.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 error:
 *                   type: string
 */
router.get("/event/getEvent/:event_id", eventController.getEvent);
router.get("/user/getUser/:username", userController.getUser);
router.get(
  "/reminder/getReminder/:reminder_id",
  reminderController.getReminder
);
router.get(
  "/appointment/getAppointment/:appointment_id",
  appointmentController.getAppointment
);
router.get("/calendar/getCalendar/:calendar_id", calendarControler.getCalendar);
router.post("/user/registerAccount", userController.registerAccount);
router.post("/event/createEvent", eventController.createEvent);
router.put("/event/updateEvent/:event_id", eventController.updateEvent);
router.post(
  "/appointment/createAppointment",
  appointmentController.createAppointment
);
router.put(
  "/appointment/editAppointment/:appointment_id",
  appointmentController.editAppointment
);
router.delete("/event/deleteEvent/:event_id", eventController.deleteEvent);
router.post("/reminder/createReminder", reminderController.createReminder);
router.put(
  "/reminder/editReminder/:reminder_id",
  reminderController.editReminder
);
router.delete(
  "/reminder/deleteReminder/:reminder_id",
  reminderController.deleteReminder
);
router.delete(
  "/appointment/deleteAppointment/:appointment_id",
  appointmentController.deleteAppointment
);
router.post("/calendar/createCalendar", calendarControler.createCalendar);
router.delete(
  "/calendar/deleteCalendar/:calendar_id",
  calendarControler.deleteCalendar
);
router.post("/user/loginAccount", Cors(), userController.loginAccount);
router.get(
  "/calendar/getUserCalendars/:username",
  calendarControler.getUserCalendars
);

router.post("/user/checkUniqueUsername", userController.checkUniqueUsername);

router.get("/event/getEventsByDate/:date", eventController.getEventsByDate);
router.get(
  "/reminder/getRemindersByDate/:date",
  reminderController.getRemindersByDate
);
router.get("/user/getAccountNumber/:username", userController.getAccountNumber);

router.get('/event/getAllEventsForUser/:username', eventController.getAllEventsForUser);

router.get('/reminder/getAllRemindersForUser/:username', reminderController.getAllRemindersForUser);

router.get('/appointment/getAllAppointmentsForUser/:username', appointmentController.getAllAppointmentsForUser);

router.get('/user/:username/events/:date', eventController.getEventsForUserByDate);

router.get('/event/getEventsByCalendarIds', eventController.getEventsByCalendarIds);

router.get('/appointment/getAppointmentsByCalendarIds', appointmentController.getAppointmentsByCalendarIds);

module.exports = router;
