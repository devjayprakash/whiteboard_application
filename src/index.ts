import { randomUUID } from 'crypto';
import { Server } from 'socket.io';

interface Room {
  roomName: string;
  room_id: string;
}

const io = new Server({
  cors: {
    origin: '*',
  },
});

const rooms: Room[] = [
  {
    roomName: 'room1',
    room_id: 'test',
  },
];

io.on('connection', (socket) => {
  console.log('new connection made', socket.id);

  socket.emit('rooms', rooms);

  socket.on('disconnect', () => {
    console.log('disconnected', socket.id);
  });

  socket.on('create_room', (roomName) => {
    rooms.push({
      roomName,
      room_id: randomUUID(),
    });
    io.emit('rooms', rooms);
  });

  socket.on('join_room', (room_id: string) => {
    const room = rooms.find((room) => room.room_id === room_id);
    if (room) {
      socket.join(room_id);
    }
  });

  socket.on('state_change', ({ state, room_id }) => {
    socket.broadcast.to(room_id).emit('state_change', state);
  });
});

io.listen(3000);
console.log('server started on port 3000');
