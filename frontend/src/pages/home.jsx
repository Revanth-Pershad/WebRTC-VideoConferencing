import React, { useState } from 'react';

function Home() {
  const [roomUrl, setRoomUrl] = useState('');
  const [username, setUsername] = useState('');

  const createNewRoom = () => {
    console.log('Creating new room...');
    // Logic to create a new room with the provided username
  };

  const joinRoom = () => {
    console.log('Joining room...', roomUrl);
    // Logic to join the room specified by the roomUrl with the provided username
  };

  const isJoinDisabled = !roomUrl || !username;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white shadow-md rounded-lg w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-4 text-center text-gray-800">Video Conference</h1>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="px-4 py-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-300 mb-2"
          />
          <button
            onClick={createNewRoom}
            disabled={!username}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300 w-full disabled:bg-blue-200"
          >
            Create New Room
          </button>
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Enter Room URL"
            value={roomUrl}
            onChange={(e) => setRoomUrl(e.target.value)}
            className="px-4 py-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-300 mb-2"
          />
          <button
            onClick={joinRoom}
            disabled={isJoinDisabled}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-300 w-full disabled:bg-green-200"
          >
            Join a Room
        </button>
        </div>
        <p className="text-center text-sm text-gray-500 mt-4">
          Welcome to the simplest way to connect. Enter a username, then create a new room to start a meeting or join an existing one.
        </p>
      </div>
    </div>
  );
}

export default Home;
