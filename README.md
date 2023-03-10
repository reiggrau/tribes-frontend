<img src="public/github_tribes_logo.png"></img>

# Browser Game & Social Network

<a href="https://tribes-the-game.onrender.com/" target="_blank">https://tribes-the-game.onrender.com/</a>

## Overview

This is a single-page application website made with React that allows users to sign in and play a 'choose-your-path' browser game.
The app also includes a functional lobby where users can find other users, befriend each other, and chat globally or privately.
At the game's prologue the player is asked a few questions, and the answers given determine the stats of the new character.

Note: The app is optimized for desktop full-screen.

## Features

-   Login & Registration forms
-   Forgotten password recovery via email
-   Lobby has a top navigation that allows the user to:
    -   View & edit personal profile
    -   Find other users by name
    -   View list of friends, as well as friendship requests
    -   Notification dot for new friendship requests
    -   Log out button
-   On the lower right corner is the button that toggles the chat, that allows the user to:
    -   Talk to everyone, in a common chat room.
    -   Talk to a specific friend on a channel only available for the two parties.
    -   View the login status of friends in real time, marked with a green dot next to their name
-   In the personal profile, the user can upload a profile picture as well as add a small biography
-   Users can also change their username and the account's linked email
-   The app includes background music (experimental)

## Technology

-   <p> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/c5378d6c2510ffa0b3e4475af95618a8048d6cf1/icons/javascript/javascript-plain.svg" alt="javascript" width="40" height="40"/> </a> &nbsp; <a href="https://aws.amazon.com" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/c5378d6c2510ffa0b3e4475af95618a8048d6cf1/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" alt="aws" width="40" height="40"/> </a> &nbsp; <a href="https://nodejs.org" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/c5378d6c2510ffa0b3e4475af95618a8048d6cf1/icons/nodejs/nodejs-original.svg" alt="nodejs" width="40" height="40"/> </a> &nbsp; <a href="https://expressjs.com" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/c5378d6c2510ffa0b3e4475af95618a8048d6cf1/icons/express/express-original.svg" alt="express" width="40" height="40"/> </a> &nbsp; <a href="https://www.postgresql.org" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/c5378d6c2510ffa0b3e4475af95618a8048d6cf1/icons/postgresql/postgresql-original-wordmark.svg" alt="postgresql" width="40" height="40"/> </a> &nbsp; <a href="https://socket.io/" target="_blank"> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/socketio/socketio-original.svg" alt="socket.io" width="40" height="40"/> </a> &nbsp; <a href="https://reactjs.org/" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/c5378d6c2510ffa0b3e4475af95618a8048d6cf1/icons/react/react-original-wordmark.svg" alt="react" width="40" height="40"/> </a> &nbsp; <a href="https://redux.js.org" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/c5378d6c2510ffa0b3e4475af95618a8048d6cf1/icons/redux/redux-original.svg" alt="redux" width="40" height="40"/> </a> &nbsp; </p>

-   JavaScript, AWS S3, Node.js, Express.js, PostgreSQL, Socket.IO, React & Redux

## Preview

**_Welcome Page_**
<img src="public/tribes_01.gif">

<p> The 'registration', 'login' and 'password recovery' forms are located in the title screen. Each of them is a React subcomponent.</p>

<p>The background is a <b>Far Cry Primal</b> wallpaper, photoshopped into multiple layers, and given to each one a lateral sway in order to achieve a parallax effect (the man, the mammoths, and the nearby mountains are each a different layer).</p>

<p>Primitive-themed music from the game <b>Dawn of Man</b> is added to enhance immersiveness.</p>

<br>

**_Lobby_**
<img src="public/tribes_02.gif">

<p>The main menu is also the lobby of the game. Here you can either create a new character (new game) or continue with an old one. All your progress is sent to the server and stored in the database.</p>

<br>

**_New Game_**
<img src="public/tribes_03.gif">

<p>The prologue is a succession of story text and questions, and a new character is created based on those questions. The user then is prompted to choose a name and an image file as their character portrait. A confirmation question is made in the end of the prologue.</p>

<br>

<img src="public/tribes_04.gif">

<p>The pace of the narration and background sound effects are carefully executed in order to make the character creation process an engaging and immersive experience.</p>

<br>

<img src="public/tribes_05.gif">

<br>

**_Tutorial_**
<img src="public/tribes_06.gif">

<p>There is also an 'inventory' component that is always visible to the player, and its contents are loaded and stored in the database at the beginning and ending of each 'quest'. There the player can also check their character's stats. Both items and stats determine the availability of choices through the story.</p>

<br>

**_User Profile_**
<img src="public/tribes_07.gif">

<p>The user profile can be completed with a user picture and a bio. The username and email can also be changed, provided that no other user is using them. The server checks this and send the client a warning if that's the case, indicating to them which is the conflicting field.</p>

<br>

**_Friends_**
<img src="public/tribes_08.gif">

<p>The 'friends' window show the user the current befriended players and the pending requests. Friendship requests can either be accepted here or in their user profile.</p>

<p>A red dot appears next to 'friends' if the user has received a new friendship request since their last session, or if they receive a new one during the current one.</p>

<br>

**_Chat_**
<img src="public/tribes_09.gif">

<p>The chat component has a global chat where every user can write to everyone, or personal chats between two users that are 'friends'. New messages are sent to online users in real-time using socket.io at the same time that are stored in the database.</p>

<p>A green dot appears next to friends that are online. This dot is also updated in real-time.</p>

<br>

<a href="https://tribes-the-game.onrender.com/" target="_blank">Try the app here</a>
