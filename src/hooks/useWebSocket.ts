// useWebSocket.js
import { useEffect, useState } from 'react';

export const useWebSocket = (url: string) => {
  const [data, setData] = useState('');

  useEffect(() => {
    const socket = new WebSocket(url);

    socket.onmessage = event => {
      const newData = JSON.parse(event.data);
      setData(newData);
    };
    return () => {
      socket.close();
    };
  }, [url]);
  return data;
};
