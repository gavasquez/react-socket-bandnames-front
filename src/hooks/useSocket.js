import { useEffect, useMemo, useState } from "react";
import io from "socket.io-client";

export const useSocket = (serverPath) => {
    //* Nuestro Socket http://localhost:8080
    const socket = useMemo(() => io(serverPath, {
        transports: ['websocket']
    }), [serverPath]);

    const [online, setOnline] = useState(false);

    useEffect(() => {
        socket.on('connect', () => {
            setOnline(true);
        });
    }, [socket]);

    useEffect(() => {

        socket.on("disconnect", () => {
            setOnline(false);
        });

    }, [socket]);

    return {
        socket,
        online,
    };

}
