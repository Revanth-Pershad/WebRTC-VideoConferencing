import chat from './chat/chat.js';
import video from './video/video.js';

export default (io) => {
    chat(io);
    video(io);
};
