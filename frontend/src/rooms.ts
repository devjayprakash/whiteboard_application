import { io } from 'socket.io-client';

const createBtn = document.getElementById('create_btn');
const room_name_ele = document.getElementById('name');
const room_list = document.getElementById('rooms');

let room_name = '';

interface Room {
  roomName: string;
  room_id: string;
}

const socket = io('http://localhost:3000');

socket.on('rooms', (rooms) => {
  room_list?.replaceChildren();

  if (rooms.length === 0) {
    const container = document.createElement('div');
    container.classList.add(
      'px-3',
      'py-2',
      'shadow-md',
      'flex',
      'justify-between'
    );
    const noRooms = document.createElement('p');
    noRooms.classList.add('text-xl', 'font-bold');
    noRooms.innerText = 'No rooms available';
    container.appendChild(noRooms);
    room_list?.appendChild(container);
  }

  rooms.forEach((room: Room) => {
    //create whatever html is above with .createElement
    const container = document.createElement('div');
    container.classList.add(
      'px-3',
      'py-2',
      'shadow-md',
      'flex',
      'justify-between'
    );
    const roomInfo = document.createElement('div');
    roomInfo.classList.add('flex', 'flex-col');
    const roomName = document.createElement('p');
    roomName.classList.add('text-xl', 'font-bold');
    const roomId = document.createElement('p');
    roomId.classList.add('text-sm', 'text-gray-500');
    const joinBtn = document.createElement('button');
    joinBtn.classList.add(
      'px-3',
      'py-2',
      'rounded-md',
      'bg-blue-500',
      'text-white',
      'font-bold'
    );

    joinBtn.addEventListener('click', () => {
      joinRoom(room.room_id);
    });

    roomName.innerText = room.roomName;
    roomId.innerText = room.room_id;
    joinBtn.innerText = 'Join';

    roomInfo.appendChild(roomName);
    roomInfo.appendChild(roomId);
    container.appendChild(roomInfo);
    container.appendChild(joinBtn);
    room_list?.appendChild(container);
  });
});

function joinRoom(room_id: string) {
  window.location.replace(`http://localhost:5173?room_id=${room_id}`);
}

room_name_ele?.addEventListener('change', (e) => {
  //@ts-ignore
  const value = e.target.value;
  room_name = value;
});

createBtn?.addEventListener('click', () => {
  if (room_name) {
    console.log('creating room');

    socket.emit('create_room', room_name, (res: any) => {
      console.log(res);
    });

    //@ts-ignore
    room_name_ele!.value = '';
  }
});
