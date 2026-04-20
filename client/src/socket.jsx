import {io} from 'socket.io-client'

export const initSocket = async () => {
  const option = {
    forceNew: true,
    reconnectionAttempts: Infinity,
    timeout: 10000,
    transports: ['websocket'],
  }

  return io("https://coderoom-3.onrender.com");

}