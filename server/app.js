const express = require("express");
const http = require("http");

const port = process.env.PORT || 4001;
const index = require("./routes/index");

const app = express();
app.use(index);

const server = http.createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: "http://140.113.121.234:3000",
  },
});

///rooms//

let rooms = [];
let mapSocketIdtoRoomId = {};
let mapSocketIdtoUserId = {};
let mapUserIdtoSocketId = {};

////functions//

let battle = (myId, oppoId) => {
    
  if (myId === oppoId) {
    return 0; //`平手~~~`;
  }
  else if ((myId+1)%3 === oppoId%3) {
    // dispatch(win());
    return 1; //`你贏了!`;
  }
  else {
    // dispatch(lose());
    return -1; //`你輸了...`;
  }
}

//io//

io.on("connection", (socket) => {
  console.log(`connected! ${socket.id}`);

  socket.on("message", (message) => {
    console.log(message.method);
    
    // login
    if (message.method === "login") {
      let sameRoom = rooms.find(room => room.roomId === message.roomId)?.users;
      if (!sameRoom) {
        rooms.push({
          roomId: message.roomId,
          users: [{
            id: message.id,
            lock: 0,
          }],
          pk: 0,
        });
        mapSocketIdtoRoomId[socket.id] = message.roomId;       
        mapSocketIdtoUserId[socket.id] = message.id;
        mapUserIdtoSocketId[message.id] = socket.id;
        socket.emit("login", {
          roomId: message.roomId,
          id: message.id,
        });
      }
      else if (sameRoom.length < 2) {
        rooms.find(room => room.roomId === message.roomId).users.push({
          id: message.id,
          lock: 0,
        });
        mapSocketIdtoRoomId[socket.id] = message.roomId;       
        mapSocketIdtoUserId[socket.id] = message.id;
        mapUserIdtoSocketId[message.id] = socket.id;

        socket.emit("login", {
          roomId: message.roomId,
          id: message.id,
        });
      }
      else {
        socket.emit("roomIsFull", "The room is full.");
      }
      console.log(rooms);
    }

    // choose & lock
    if (message.method === "lock") {
      let rm = rooms.find(room => room.roomId === mapSocketIdtoRoomId[socket.id]);
      let me, oppo;
      if (socket.id === mapUserIdtoSocketId[rm.users[0].id]) {
        me = rm.users[0];
        oppo = rm.users[1];
      }
      else {
        me = rm.users[1];
        oppo = rm.users[0];
      }
      let pks = rooms.find(room => room.roomId === mapSocketIdtoRoomId[socket.id]).pk;
      console.log(pks);
      if (!oppo || (pks !== 0)) {
        console.log("noOppo");
        socket.emit("noOppo", "Your opponent is offline now.");
        return;
      }
      rooms.find(room => room.roomId === mapSocketIdtoRoomId[socket.id]).users.find(user => user.id === mapSocketIdtoUserId[socket.id]).lock = message.locked;
      io.to(mapUserIdtoSocketId[oppo.id]).emit("message", {
        method: "oppoLock",
        oppoLock: message.locked,
      });

      if (me.lock !== 0 && oppo.lock !== 0) {
        io.to(mapUserIdtoSocketId[me.id]).emit("message", {
          method: "battleResult",
          battleResult: battle(me.lock, oppo.lock),
        });
        io.to(mapUserIdtoSocketId[oppo.id]).emit("message", {
          method: "battleResult",
          battleResult: battle(oppo.lock, me.lock),
        });
        rooms.find(room => room.roomId === mapSocketIdtoRoomId[socket.id]).pk = 0;
      }

    }

    if (message.method === "restart") {
      rooms.find(room => room.roomId === mapSocketIdtoRoomId[socket.id]).users.find(user => user.id === mapSocketIdtoUserId[socket.id]).lock = 0;
      rooms.find(room => room.roomId === mapSocketIdtoRoomId[socket.id]).pk += 1;
      if (rooms.find(room => room.roomId === mapSocketIdtoRoomId[socket.id]).pk === 2) {
        rooms.find(room => room.roomId === mapSocketIdtoRoomId[socket.id]).pk = 0;
      }
      let pks = rooms.find(room => room.roomId === mapSocketIdtoRoomId[socket.id]).pk;
      console.log(pks);
    }
  })

  socket.on("disconnect", () => {
    let i = rooms.find(room => room.roomId === mapSocketIdtoRoomId[socket.id])?.users.findIndex(user => user.roomId === mapSocketIdtoUserId[socket.id]);
    if (i) rooms.find(room => room.roomId === mapSocketIdtoRoomId[socket.id]).users.splice(i, 1);
    delete mapSocketIdtoRoomId[socket.id];       
    delete mapUserIdtoSocketId[mapSocketIdtoUserId[socket.id]];
    delete mapSocketIdtoUserId[socket.id];
    console.log("disconnected");
    console.log(rooms);
  })
})

server.listen(port, () => console.log(`Listening on port ${port}`));