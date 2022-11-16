import { startStandaloneServer } from "@apollo/server/standalone";
import { ApolloServer } from "@apollo/server";

const listapersonas = [
  {
    nombre: "Nombre 1",
    direccion: "Dirección 1",
    telefono: "Telefono 1",
  },
  {
    nombre: "Nombre 2",
    direccion: "Dirección 2",
    telefono: "Telefono 2",
  },
  {
    nombre: "Nombre 3",
    direccion: "Dirección 3",
    telefono: "Telefono 3",
  },
  {
    nombre: "Nombre 4",
    direccion: "Dirección 4",
    telefono: "Telefono 4",
  },
];

//Definimos las estructuras y consultas a realizar

const typeDefs = `#graphql

type Persona{
 nombre:String
 direccion:String
 telefono:String
}

type Response{
  status: String
}

type Query{
cuantasPersonas:Int
todaslasPersonas:[Persona]
buscarPersona(nombre:String):Persona!
agregarPersona(nombre:String,direccion:String,telefono:String):Response
actualizarPersona(buscar:String,nombre:String,direccion:String,telefono:String):Response
eliminarPersona(nombre:String):Response
}
`;
// Resolver las consultas

const resolvers = {
  Query: {
    cuantasPersonas: () => listapersonas.length,
    todaslasPersonas: () => listapersonas,
    buscarPersona: (roots, args) => {
      const { nombre } = args;
      return listapersonas.find((persona) => persona.nombre === nombre);
    },
    agregarPersona: (roots, args) => {
      const { nombre, direccion, telefono } = args;
      listapersonas.push({
        nombre,
        direccion,
        telefono,
      });
      return { status: "OK" };
    },
    actualizarPersona: (roots, args) => {
      const { buscar, nombre, direccion, telefono } = args;
      const persona = listapersonas.find(
        (persona) => persona.nombre === buscar
      );
      persona.nombre = nombre;
      persona.direccion = direccion;
      persona.telefono = telefono;
      return { status: "ok" };
    },
    eliminarPersona: (roots, args) => {
      const { nombre } = args;
      const index = listapersonas.findIndex(
        (persona) => persona.nombre === nombre
      );
      listapersonas.splice(index, 1);
      return { status: "OK" };
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Servidor corriendo en : ${url}`);
