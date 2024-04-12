import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';

function Meet() {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const peerConnections = useRef({});
  const localDataChannel = useRef(null);

  // Connect to the socket server when the component mounts
  useEffect(() => {
    const newSocket = io('http://localhost:8000');
    setSocket(newSocket);

    return () => {
      newSocket.close();
      Object.values(peerConnections.current).forEach(pc => pc.close());
    };
  }, []);

  // Setup WebRTC peer connection and data channel
  const setupWebRTC = (socket) => {
    socket.on('webrtc-offer', ({ from, offer }) => {
      const pc = createPeerConnection(from);
      pc.setRemoteDescription(new RTCSessionDescription(offer));
      pc.createAnswer()
        .then(answer => {
          pc.setLocalDescription(answer);
          socket.emit('webrtc-answer', { to: from, answer });
        })
        .catch(error => console.error(error));

      pc.ondatachannel = event => {
        setupDataChannel(event.channel);
      };
    });

    socket.on('webrtc-answer', ({ from, answer }) => {
      const pc = peerConnections.current[from];
      pc.setRemoteDescription(new RTCSessionDescription(answer));
    });

    socket.on('webrtc-ice-candidate', ({ from, candidate }) => {
      const pc = peerConnections.current[from];
      if (pc) {
        pc.addIceCandidate(new RTCIceCandidate(candidate));
      }
    });
  };

  const createPeerConnection = (partnerId) => {
    const pc = new RTCPeerConnection({
      iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
    });
    pc.onicecandidate = event => {
      if (event.candidate) {
        socket.emit('webrtc-ice-candidate', { to: partnerId, candidate: event.candidate.toJSON() });
      }
    };
    peerConnections.current[partnerId] = pc;
    return pc;
  };

  const setupDataChannel = (channel) => {
    localDataChannel.current = channel;
    channel.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMessages(prev => [...prev, data]);
    };
    channel.onopen = () => console.log('DataChannel opened');
    channel.onclose = () => console.log('DataChannel closed');
  };

  useEffect(() => {
    if (socket) {
      setupWebRTC(socket);
    }
  }, [socket]);

  const handleSendMessage = () => {
    if (localDataChannel.current && localDataChannel.current.readyState === 'open') {
      localDataChannel.current.send(JSON.stringify({ userName: "User", message }));
      setMessage('');
    }
  };

  const copyMeetLink = () => {
    const meetLink = window.location.href;
    navigator.clipboard.writeText(meetLink).then(() => {
      alert('Meet link copied to clipboard!');
    });
  };

  const leaveRoom = () => {
    if (socket) {
      socket.emit('leave-room', { userName: "User", roomId: "abc123" });
      window.location.href = '/';
    }
  };

  return (
    <div className="flex h-screen">
      <div className="flex-grow p-4">
        <div className="text-center text-gray-500">Video Grid Placeholder</div>
      </div>
      <div className="w-96 bg-gray-200 p-4 flex flex-col">
        <div className="flex-grow overflow-y-auto">
          {messages.map((msg, index) => (
            <div key={index}>{msg.userName}: {msg.message}</div>
          ))}
        </div>
        <div className="mt-4">
          <input
            type="text"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="px-4 py-2 w-full border rounded focus:outline-none"
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-white p-4 shadow-md flex justify-between">
        <button onClick={copyMeetLink} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300">
          Copy Meet Link
        </button>
        <button onClick={leaveRoom} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300">
          Leave Room
        </button>
      </div>
    </div>
  );
}

export default Meet;
