import { io } from "socket.io-client";

const URL = "http://140.113.121.234:4001";
const socket = io(URL, { autoConnect: false });

socket.onAny((event, ...args) => {
  console.log(event, args);
});

export default socket;