import io from 'socket.io-client';

const socket = io.connect('http://localhost:8080');

// const socket = io.connect(
//   'https://e416-2403-6200-89a6-d9c9-89e-505d-8564-cba2.ap.ngrok.io',
//   {
//     autoConnect: false,
//     extraHeaders: { ['ngrok-skip-browser-warning']: '*' }
//   }
// );

export default socket;
