import { useContext } from "react";
import { BandAdd } from "../components/BandAdd";
import { BandList } from "../components/BandList";
import { useSocket } from "../hooks/useSocket";
import { SocketContext } from "../context/SocketContext";


/* const connectSocketServer = () => {
  const socket = io('http://localhost:8080', {
    transports: ['websocket']
  });
  return socket;
} */

function HomePage() {

  const { online } = useContext(SocketContext);

  /* const [bands, setBands] = useState([]); */


  /* useEffect(() => {
    socket.on('current-bands', (bands) => {
      setBands(bands);
    });
  }, [socket]);


  const votar = (id) => {
    //* Emitir evento al backend, Evento de Votar por la Banda
    socket.emit('votar-banda', id);
  }

  const borrarBand = (id) => {
    //* Emitir evento al backend, Evento de Borrar Banda
    socket.emit('borrar-banda', id);
  }

  const cambiarNombre = (id, nombre) => {
    //* Emitir evento al backend, Evento de Cambiar El Nombre de la Banda
    socket.emit('cambiar-nombre-banda', { id, nombre });
  }

  const crearBanda = (nombre) => {
    socket.emit('crear-banda', nombre);
  }
 */
  return (
    <div className="container">
      <div className="alert">
        <p>
          Service status:
          {
            online
              ? <span className="text-success"> Online</span>
              : <span className="text-danger"> Offline</span>
          }
        </p>
      </div>

      <h1>BandsNames</h1>
      <hr />
      <div className="row">
        <div className="col-8">
          {/*  <BandList data={bands} votar={votar} borrar={borrarBand} cambiarNombre={cambiarNombre} /> */}
        </div>
        <div className="col-4">
          {/* <BandAdd crearBanda={crearBanda} /> */}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
