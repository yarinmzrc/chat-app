import React, { useState, useContext, useEffect } from "react";
import { io } from "socket.io-client";
import { SocketContextType } from "../interfaces/interfaces";

const SocketContext = React.createContext<SocketContextType | null>(null);

export function useSocket() {
  return useContext(SocketContext);
}

interface SocketProviderProps {
  id: string;
  children?: React.ReactNode;
}

export function SocketProvider({ id, children }: SocketProviderProps) {
  const [socket, setSocket] = useState<any>();

  const fetchSocket = async () => {
    const newSocket = await io("http://127.0.0.1:5000", {
      query: { id },
    });
    setSocket(newSocket);
    return () => newSocket.close();
  };

  useEffect(() => {
    fetchSocket();
  }, [id]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
}
