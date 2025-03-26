# TechMate Chatbot Integration Guide

This guide provides clear instructions on how to integrate and configure the TechMate Chatbot on your website.

---

## Client Script Integration

Add the following script to your HTML file, ideally just before the closing `</body>` tag.

```html
<script src="YOUR_CDN_LINK/techmate-chatbot.js"></script>
<script>
  TechMateChatbot.init({
    identifier: 'USER_IDENTIFIER',         // Required: Unique identifier for the user or session.
    elementId: 'YOUR_CONTAINER_ID',        // Optional: ID of the container where the chatbot should appear. Defaults to <body>.
    showWidget: false,                     // Optional: Show the widget on page load. Defaults to false.
    theme: 'purple',                       // Optional: Theme color. Options: 'purple', 'red', 'green', 'blue'.
    notificationDelay: null                // Optional: Controls notification timing (see below for details).
  })
  .then((message) => console.log(message))   // Optional: Logs a success message after initialization.
  .catch((error) => console.error(error));   // Optional: Logs an error if initialization fails.
</script>
```

---

## Configuration Parameters

| Parameter            | Type                          | Required | Description                                                                                                                                 |
|----------------------|-------------------------------|----------|---------------------------------------------------------------------------------------------------------------------------------------------|
| `identifier`         | String                        | Yes      | Unique ID for the user or session. Essential for user-specific data and conversation history.                                               |
| `elementId`          | String                        | No       | HTML element ID where the chatbot will be appended. If omitted, it defaults to the `<body>`.                                                |
| `showWidget`         | Boolean                       | No       | Determines if the widget should be visible on page load. `false` by default.                                                               |
| `theme`              | String                        | No       | Defines the chatbot’s theme color. Available options: `'purple'`, `'red'`, `'green'`, `'blue'`. Defaults to `'purple'`.                    |
| `notificationDelay`  | Number / null / undefined     | No       | Controls the notification timing behavior. Detailed explanation below.                                                                     |

---

## Notification Delay Options

| Value                | Behavior                                                                                                            |
|----------------------|---------------------------------------------------------------------------------------------------------------------|
| `null`               | Notification shows immediately on first render. If closed, it will not reappear.                                    |
| `undefined` (omit)   | Default behavior. Notification appears after 3 seconds on first load. If closed, it reappears after 10 seconds.     |
| Number (in seconds)  | Custom delay. Notification shows after 3 seconds on first load. If closed, it reappears after the specified delay.  |
| `1111`               | Disables notifications completely. No notifications will appear at any time.                                       |

---

## Notification Timing Behavior Explained

### `null`
- Displays the notification immediately on first render.
- Once closed, it does not reappear.
- Recommended for one-time notifications.

### `undefined`
- Standard behavior.
- Shows the notification after 3 seconds.
- If the user closes it, it will reappear after 10 seconds.
- Ideal if you want persistent gentle reminders.

### Custom Number
- Shows notification after 3 seconds initially.
- If closed, it will reappear after the provided delay (in seconds).
- Example: `notificationDelay: 20` means it reappears after 20 seconds.
- Useful for custom timing control.

### `1111`
- Completely disables notifications.
- No initial notification, no repeat reminders.

---


## Implementation Notes

- Provide a valid `USER_IDENTIFIER` to maintain user session context.
- If using a custom container, ensure `YOUR_CONTAINER_ID` matches an existing element in your HTML.
- The script communicates with the chatbot iframe using `postMessage`.
- The script manages CSS styling and window resizing automatically.
- If the specified `elementId` does not exist, the chatbot defaults to the `<body>` container.

---


# Chatbot Widget 

## Technologies Used

- **React.js** for building user interfaces.
- **Tailwind CSS** (global and modular) for styling.
- **Redux** for state management.
- **Axois** for handling API requests.

## Installation

To get started with **TechMate-Chatbot**, clone the repository and install the required dependencies:

```bash
git clone https://github.com/Codem-3/TechMate-Chatbot.git
cd TechMate-Chatbot
npm install
npm run dev
```

- Visit `http://localhost:5173` to see the project in action.
- Create .env file `export VITE_API_BASE_URL=`.
- Change the CHATBOT_URL in script.js to `http://localhost:5173` to enable developer mode.
- Run your website and see chatbot

---

## Project Structure

The project follows a well-organized folder structure for scalability and maintainability:

```
└── 📁TechMate-Chatbot
    └── 📁src
        └── 📁API
            └── axiosInstance.js
            └── techMateApi.js
        └── App.jsx
        └── 📁assets
            └── 📁images
                └── bot.webp
                └── congrats.webp
                └── email.webp
                └── emailOffer.webp
                └── Logo.webp
                └── phone.webp
                └── phoneOffer.webp
                └── phoneWhite.webp
        └── 📁components
            └── EmailLayout.jsx
            └── Footer.jsx
            └── Header.jsx
            └── Notifications.jsx
            └── PhoneLayout.jsx
            └── Query.jsx
            └── Questions.jsx
            └── Response.jsx
            └── Widget.jsx
        └── main.jsx
        └── 📁pages
            └── CongratulationsPage.jsx
            └── EmailPageForm1.jsx
            └── EmailPageForm2.jsx
            └── EmailPageForm3.jsx
            └── index.js
            └── MainPage.jsx
            └── NewsLetterPage.jsx
            └── PhonePageForm1.jsx
            └── PhonePageForm2.jsx
            └── PhonePageForm3.jsx
            └── StartPage.jsx
            └── SubmitPage.jsx
            └── WelcomePage.jsx
        └── 📁router
            └── index.jsx
        └── 📁store
            └── index.js
            └── 📁Slices
                └── chatbotApiSlice.js
                └── userSlice.js
        └── 📁styles
            └── global.css
        └── 📁utils
            └── functions.util.jsx
            └── icons.util.jsx
    └── .env.development
    └── .env.production
    └── .gitignore
    └── eslint.config.js
    └── index.html
    └── package-lock.json
    └── package.json
    └── postcss.config.js
    └── prettier.config.js
    └── README.md
    └── tailwind.config.js
    └── vite.config.js
```

## 🎨 Some Suggested Color Palettes

| Color Name   | Hex Code   |                       Preview                                    |
|-------------|-----------|--------------------------------------------------------------------|
| Dark Color  | `#000000` | ![#000000](https://placehold.co/15x15/000000/000000.png) `#000000` |
| Light Color | `#FFF`    | ![#FFF](https://placehold.co/15x15/FFF/FFF.png) `#FFF`             |
| Primary     | `#501AC8` | ![#501AC8](https://placehold.co/15x15/501AC8/501AC8.png) `#501AC8` |
| Hover       | `#B366CF` | ![#B366CF](https://placehold.co/15x15/B366CF/B366CF.png) `#B366CF` |
| Gradient    | `#1C064C` | ![#1C064C](https://placehold.co/15x15/1C064C/1C064C.png) `#1C064C` |
| Footer      | `#370E92` | ![#370E92](https://placehold.co/15x15/370E92/370E92.png) `#370E92` |

| Color Name   | Hex Code   |                       Preview                                    |
|-------------|-----------|--------------------------------------------------------------------|
| Dark Color  | `#FFF`    | ![#FFF](https://placehold.co/15x15/FFF/FFF.png) `#FFF`             |
| Light Color | `#000000` | ![#000000](https://placehold.co/15x15/000000/000000.png) `#000000` |
| Primary     | `#0D642F` | ![#0D642F](https://placehold.co/15x15/0D642F/0D642F.png) `#0D642F` |
| Hover       | `#7CB937` | ![#7CB937](https://placehold.co/15x15/7CB937/7CB937.png) `#7CB937` |
| Gradient    | `#03421C` | ![#03421C](https://placehold.co/15x15/03421C/03421C.png) `#03421C` |
| Footer      | `#508A0F` | ![#508A0F](https://placehold.co/15x15/508A0F/508A0F.png) `#508A0F` |

| Color Name   | Hex Code   |                       Preview                                    |
|-------------|-----------|--------------------------------------------------------------------|
| Dark Color  | `#000000` | ![#000000](https://placehold.co/15x15/000000/000000.png) `#000000` |
| Light Color | `#FFF`    | ![#FFF](https://placehold.co/15x15/FFF/FFF.png) `#FFF`             |
| Primary     | `#C7313D` | ![#C7313D](https://placehold.co/15x15/C7313D/C7313D.png) `#C7313D` |
| Hover       | `#E55640` | ![#E55640](https://placehold.co/15x15/E55640/E55640.png) `#E55640` |
| Gradient    | `#681017` | ![#681017](https://placehold.co/15x15/681017/681017.png) `#681017` |
| Footer      | `#9D2816` | ![#9D2816](https://placehold.co/15x15/9D2816/9D2816.png) `#9D2816` |

| Color Name   | Hex Code   |                       Preview                                    |
|-------------|-----------|--------------------------------------------------------------------|
| Dark Color  | `#000000` | ![#000000](https://placehold.co/15x15/000000/000000.png) `#000000` |
| Light Color | `#FFF`    | ![#FFF](https://placehold.co/15x15/FFF/FFF.png) `#FFF`             |
| Primary     | `#184A88` | ![#184A88](https://placehold.co/15x15/184A88/184A88.png) `#184A88` |
| Hover       | `#0077B6` | ![#0077B6](https://placehold.co/15x15/0077B6/0077B6.png) `#0077B6` |
| Gradient    | `#03045E` | ![#03045E](https://placehold.co/15x15/03045E/03045E.png) `#03045E` |
| Footer      | `#14577B` | ![#14577B](https://placehold.co/15x15/14577B/14577B.png) `#14577B` |
