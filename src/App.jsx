import "../src/assets/css/App.css";
import { useState, useEffect } from "react";
import imagen from "../src/assets/img/Colaboradores400.jpg";

// Importa la base de datos de los colaborares
import { BaseColaboradores } from "./components/Colaboradores";

export default function App() {
  // Crea un estado con los colaboradores importados
  // como valor inicial
  const [colaboradores, setColaboradores] = useState(BaseColaboradores);
  const [colaboradoresFiltrados, setColaboradoresFiltrados] =
    useState(BaseColaboradores);
  // Crear otras 2 estados: nombreColaborador, emailColaborador
  const [nombreColaborador, setNombreColaborador] = useState("");
  const [emailColaborador, setEmailColaborador] = useState("");
  const [search, setSearch] = useState("");

  // Crea una función que agregue un nuevo colaborador
  // Usando los estados del nombre y el email de los inputs
  const agregrarUsuario = () => {
    const nuevoColaborador = {
      id: 1,
      nombre: nombreColaborador,
      correo: emailColaborador,
    };
    // colaboradores.push(nuevoColaborador)
    setColaboradores([...colaboradores, nuevoColaborador]);
    setNombreColaborador("");
    setEmailColaborador("");
  };

  const filtrarColaboradores = () => {
    const colaboradoresFiltrados = colaboradores.filter((colaborador) => {
      return (
        colaborador.nombre.includes(search) ||
        colaborador.correo.includes(search)
      );
    });

    setColaboradoresFiltrados([...colaboradoresFiltrados]);
  };

  useEffect(() => {
    filtrarColaboradores();
  }, [search, colaboradores]);

  return (
    <div className="App">
      <main className="contenedor">
        <div className="encabezado">
          <img src={imagen} alt="" />
          <p>
            <h2>Desafío React</h2>
            <h3>Renderización - Colaboradores</h3>
          </p>
        </div>
        <hr />
        <nav>
          <span>Buscador</span>
          <input
            className="form-control buscador"
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar colaboradores"
          />
        </nav>

        <label className="mt-2 ">Nombre del colaborador:</label>
        <input
          className="form-control mb-1"
          onChange={(e) => setNombreColaborador(e.target.value)}
          value={nombreColaborador}
        />
        <label className="mt-1">Correo del colaborador:</label>
        <input
          className="form-control mb-2"
          onChange={(e) => setEmailColaborador(e.target.value)}
          value={emailColaborador}
        />
        {/* Agregar el evento onClick al botón que llame a la función agregarUsuario */}
        <button
          className="btn btn-primary mb-2"
          onClick={() => agregrarUsuario()}
        >
          Agregar
        </button>

        <table>
          <thead>
            <th className="col-4">Colaborador</th>
            <th className="col-4">E-mail</th>
          </thead>
          <tbody>
            {/* Renderizar dinámicamente 
      una lista con los datos de los colaboradores */}
            {colaboradoresFiltrados.map((colaborador) => {
              return (
                <tr>
                  <td>{colaborador.nombre}</td>
                  <td>{colaborador.correo}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </main>
    </div>
  );
}
