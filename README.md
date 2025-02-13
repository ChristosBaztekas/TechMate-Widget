# Chatbot Widget V1

## Project Overview
A well-designed chatbot widget that you can integrate into any website, with the ability to customize its themes.

## How to Use (script.js)

Just integrate this script into your website.

   ```script
<script>
    // Define the variable isChatClosed
    let isChatClosed = false;

    // Create an iframe for the chatbot
    const chatbotIframe = document.createElement('iframe');
    chatbotIframe.src = 'https://tech-mate-chatbot.vercel.app';
    chatbotIframe.style.position = 'fixed';
    chatbotIframe.style.bottom = '10px';
    chatbotIframe.style.right = '10px';
    chatbotIframe.style.borderRadius = '16px';
    chatbotIframe.style.zIndex = '100000';
    chatbotIframe.style.minWidth = '431px';
    chatbotIframe.style.maxHeight = '588px';
    chatbotIframe.style.border = 'none'; // Remove any default borders
    chatbotIframe.style.transition = 'width 0.05s ease-in, height 0.05s ease-in';
    document.body.appendChild(chatbotIframe);

    // Listen for messages from the iframe
    window.addEventListener('message', (event) => {
        // Check the origin and message type
        if (event.origin !== 'https://tech-mate-chatbot.vercel.app' || event.data.type !== "chatbot-dimensions") return;

        const { width, height, isChatClosed: newIsChatClosed } = event.data;
        // Handle different window sizes and chat states
        if (window.innerWidth < 574 && !newIsChatClosed) {
            chatbotIframe.style.width = '100%';
            chatbotIframe.style.height = '100%';
            chatbotIframe.style.bottom = '0';
            chatbotIframe.style.right = '0';
            chatbotIframe.style.minWidth = 'auto';
            chatbotIframe.style.maxHeight = 'none';
            chatbotIframe.style.borderRadius = '0';
        } else if (window.innerWidth < 1150 && !newIsChatClosed) {
            chatbotIframe.style.width = '33%';
            chatbotIframe.style.height = '70%';
        } else if (width && height) {
            chatbotIframe.style.width = width;
            chatbotIframe.style.height = height;
        }
    });
</script>
   ```

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
- Change the source and origin in script.js to `http://localhost:5173` to enable developer mode.
- Run your webiste and see chatbot

---

## Project Structure

The project follows a well-organized folder structure for scalability and maintainability:

```
└── 📁src
    └── 📁API
        └── axiosInstance.js
        └── techMateApi.js
    └── 📁assets
        └── 📁images
            └── ChatLogo.jpg
            └── congrats.png
            └── email.png
            └── emailOffer.png
            └── Logo.png
            └── phone.png
            └── phoneOffer.png
            └── phoneWhite.png
    └── 📁components
        └── EmailLayout.jsx
        └── Footer.jsx
        └── Header.jsx
        └── Notifications.jsx
        └── PhoneLayout.jsx
        └── Query.jsx
        └── Questions.jsx
        └── Response.jsx
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
    └── App.jsx
    └── main.jsx
```

## Try Our Themes

To change the theme, go to `tailwind.config.js`.

```
/** @type {import("tailwindcss").Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        darkColor: "#000000",              -->  Default Dark Color
        lightColor: "#FFF",                -->  Default Light Color
        primaryColor: "#501AC8",           -->  Change Chatbot Theme
        hoverColor: "#B366CF",             -->  Change Chatbot Hover Theme
        gradientColor: "#1C064C",          -->  Change Chatbot Send Gradient Theme
        footerColor: "#370E92",            --> Change Footer Theme
      },
      borderRadius: {
        rad: "18px",                       --> Change Border Raduis
      },
      screens: {
        sm: "500px",
        vsm: "430px",
      },
      animation: {
        fadeIn: "fadeIn 0.5s ease-in",    --> Change message appears Animations
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0, transform: "translateY(20px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

```

## 🎨 Some Suggested Color Palettes From US


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

