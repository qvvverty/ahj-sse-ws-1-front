fetch('http://localhost:7070/', {
  method: 'POST',
  body: 'some_user_name',
  // body: prompt('username'),
})
  .then((response) => {
    if (response.ok) {
      // console.log('Aaa!');
      const socket = new WebSocket('ws://localhost:7070/');
      return socket;
    }
  })
  .then((socket) => {
    // console.log(res);
    socket.addEventListener('open', (event) => {
      // console.log(event);
      socket.send('something');
    });

    socket.addEventListener('message', (event) => {
      // console.log(event.data);
      console.log(JSON.parse(event.data));
    });
  });
