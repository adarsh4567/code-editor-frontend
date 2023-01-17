import {io} from 'socket.io-client';
import { url } from './url';

export const initSocket = async => {   // initialize the socket in the client
    const options = {
        transports: ['websocket'],
        'force new connection': true,
        reconnectionAttempts: 'Infinity',
        timeout: 10000,
    }
    return io(url, options);   // connect to the backend url
}