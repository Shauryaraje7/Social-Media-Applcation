# Social Media Chat Application

A React Native–based social media chat app with a Node.js/Express backend and MongoDB database. This mobile app lets users register, log in, and interact through posts and messages. It provides a feed of user posts (with like and comment features) and a real-time chat interface for messaging friends. The backend stores user data, posts, and comments in MongoDB, a popular NoSQL document database.

## Key Features

* **User Authentication:** Secure sign-up and login with password hashing and token-based auth.
* **Post Feed:** Users can create posts and browse a main feed of content from others (text, images, etc.).
* **Likes & Comments:** Engage with posts by liking and commenting on them.
* **Real-time Chat:** Instant messaging between users in real time, enabling conversations alongside the social feed.
* **Profile Management:** Each user has a profile page; users can update their personal information and profile picture.

## Technologies Used

* **React Native:** Cross-platform framework for building native mobile apps on Android and iOS.
* **Node.js & Express.js:** Backend runtime and web framework for building the API server.
* **MongoDB:** NoSQL document database for storing app data (users, posts, comments).
* **Additional:** JavaScript (ES6+), React Navigation for screen routing, and Axios (or fetch) for HTTP requests.

## Installation

Follow these steps to set up and run the app locally:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Shauryaraje7/Social-Media-Applcation.git
   cd Social-Media-Applcation
   ```

2. **Backend setup:**

   * Navigate to the `BACKEND` directory: `cd BACKEND`.
   * Install dependencies: `npm install` (or `yarn install`).
   * **Configure MongoDB:** Create a `.env` file in `BACKEND` and add your MongoDB connection string. For example:

     ```bash
     MONGO_URI='mongo+srv://<USERNAME>:<PASSWORD>@<HOST>/<DATABASE>?retryWrites=true&w=majority'
     ```

     (Replace `<USERNAME>`, `<PASSWORD>`, `<HOST>`, and `<DATABASE>` with your MongoDB Atlas or local cluster details.)
   * Start the backend server: `npm start` (or `node server.js`).

3. **Frontend (React Native) setup:**

   * Return to the project root: `cd ..`.
   * Install app dependencies: `npm install` (or `yarn`).
   * Start the Metro bundler:

     ```bash
 npx react-native run-android

     ```

     (This launches React Native’s Metro server.)

4. **Run the app on a device/emulator:**

   * **Android:** In a new terminal (with Metro still running), execute:

     ```bash
     npm run android
     ```

     This builds the app and runs it on an Android emulator or connected device.
   * **iOS (Mac only):** Ensure CocoaPods are installed by running `cd ios && pod install`. Then run:

     ```bash
     npm run ios
     ```

     to build and launch the app on the iOS Simulator.

## Configuring the MongoDB Connection

In the `BACKEND/.env` file, set the `MONGO_URI` to point to your MongoDB database. This string should include your credentials and database name. For example:

```bash
MONGO_URI=mongodb+srv://user123:myPassword@cluster0.mongodb.net/myDatabase?retryWrites=true&w=majority
```

This ensures the server can connect to MongoDB. After setting `MONGO_URI`, restart the backend server so it picks up the change.

## Usage

* **Launch the App:** Open the app on your device or emulator after installation completes.
* **Sign Up / Sign In:** On first launch, register a new account or log in with existing credentials.
* **Browsing the Feed:** Once signed in, the main feed screen displays posts from all users. Scroll to view more posts.
* **Liking & Commenting:** Tap the heart (♥) icon on a post to like it. Tap the comment (💬) icon to open the comment view; enter text and submit to comment.
* **Chat:** Switch to the “Chat” tab (or screen) to see your message list. Tap a conversation to send and receive messages in real time.
* **Profile:** Access your profile screen to update your personal info or change your profile picture.

## Contributing

Contributions are welcome! If you find a bug or want to add a feature, feel free to open an issue or submit a pull request. Please fork the repository, create a feature branch, and ensure your code follows existing style and passes any lint checks. For substantial changes, it’s recommended to open an issue first to discuss your ideas. Refer to a [CONTRIBUTING.md](CONTRIBUTING.md) template if available.

## License

This project is licensed under the MIT License – see the [LICENSE](LICENSE) file for details. You are free to use, modify, and distribute this software under the terms of this license.

## Screenshots

### 📱 Login/Feed Screen
![Login/Feed Screen](https://github.com/Shauryaraje7/Social-Media-Applcation/blob/main/ios/WhatsApp%20Image%202025-06-08%20at%2002.31.03.jpeg?raw=true)

### 💬 Chat Screen
![Chat Screen](https://github.com/Shauryaraje7/Social-Media-Applcation/blob/main/ios/WhatsApp%20Image%202025-06-08%20at%2002.33.56.jpeg?raw=true)

