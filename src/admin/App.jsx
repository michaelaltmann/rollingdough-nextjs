// in src/admin/App.jsx
import * as React from "react";
import { Admin, Resource, ListGuesser, EditGuesser } from "react-admin";
import { dataProvider } from "ra-data-simple-prisma";

const dp = dataProvider("/api/admin");
//const dataProvider = simpleRestProvider("/api/rest");
//jsonServerProvider("https://jsonplaceholder.typicode.com");

const App = () => (
  <Admin dataProvider={dp}>
    <Resource name="bakery" list={ListGuesser} edit={EditGuesser} />
  </Admin>
);

export default App;
