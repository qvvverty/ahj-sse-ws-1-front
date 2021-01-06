const response = fetch('http://localhost:7070/', {
  method: 'POST',
  body: 'some_user_name',
});
response.then((res, rej) => {
  if (response.ok) {
    console.log('Aaa!');
  }
});

const socket = new WebSocket('ws://localhost:7070/');

socket.addEventListener('open', (event) => {
  console.log(event);
  // socket.send('something');
});

socket.addEventListener('message', (event) => {
  // console.log(event.data);
  console.log(JSON.parse(event.data));
});
