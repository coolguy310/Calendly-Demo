# Calendly

A simple appointment booking system, reminiscent of Calendly, but designed to allow users to book only one appointment on the platform.

## Prerequisites

- Ensure you have [Node.js](https://nodejs.org/) installed.
- The project uses [pnpm](https://pnpm.io/) as the package manager. If you don't have it installed, you can do so using `npm`:

  ```
  npm install -g pnpm
  ```

## Setup

1. **Clone the Repository**

   ```bash
   git clone
   cd calendly
   ```

2. **Install Dependencies**

   Using pnpm:

   ```bash
   pnpm install
   ```

3. **Setup Firebase Environment Variables**

   The project requires several environment variables related to Firebase. You'll need to obtain these details from the Firebase Console for your project.

   Create a `.env` file in the root directory of the project and add the following, filling in the appropriate values:

   ```bash
   VITE_API_KEY=your_firebase_api_key
   VITE_AUTH_Domain=your_firebase_auth_domain
   VITE_PROJECT_ID=your_firebase_project_id
   VITE_STORAGE_BUCKET=your_firebase_storage_bucket
   VITE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
   VITE_APP_ID=your_firebase_app_id
   ```

4. **Run the Project**

   To start the development server:

   ```bash
   pnpm run dev
   ```

## Firestore Data Model

To ensure the smooth operation of the application, your Firestore should have a collection structured as follows:

### Collection: bookings

_Description:_ This collection represents the booked appointments by users.

**Fields:**

- `userId`: String - Identifier for the user. Example: "U12345678".
- `day`: Number - Day of the month when the booking is made. Example: 23.
- `month`: Number - Month of the year when the booking is made, where 1 is January and 12 is December. Example: 8.
- `year`: Number - Year when the booking is made. Example: 2023.
- `start_time`: Timestamp - Start time of the booked appointment. Example: `Firestore.Timestamp.fromDate(new Date("2023-08-24T14:00:00Z"))`.
- `user_email`: E-mail of the user that booked the appointment.
- `end_time`: Timestamp - End time of the booked appointment. Example: `Firestore.Timestamp.fromDate(new Date("2023-08-24T15:00:00Z"))`.

**Note:** While the application can dynamically create collections and documents as needed, it's good practice to set up this structure beforehand if you're initializing your Firestore database.

Admin Dashboard password can be defined with the `VITE_ADMIN_DASHBOARD_PASSWORD` enviroment variable.
