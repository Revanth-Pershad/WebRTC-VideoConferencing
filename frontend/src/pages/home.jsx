import React, { useState } from 'react';

function Home() {
  const [roomUrl, setRoomUrl] = useState('');

  const createNewRoom = () => {
    // Logic to create a new room
    console.log('Creating new room...');
  };

  const joinRoom = () => {
    // Logic to join the room specified by the roomUrl
    console.log('Joining room...', roomUrl);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-semibold mb-4 text-center text-gray-800">Video Conference</h1>
        <div className="mb-4">
          <button
            onClick={createNewRoom}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300 w-full"
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
            className="px-4 py-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>
        <button
          onClick={joinRoom}
          disabled={!roomUrl}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-300 w-full disabled:bg-green-200"
        >
          Join a Room
        </button>
      </div>
    </div>
  );
};

export default Home;