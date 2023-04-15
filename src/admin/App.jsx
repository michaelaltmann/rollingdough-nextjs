// in src/admin/App.jsx
import * as React from "react";
import { Admin, Resource, ListGuesser, EditGuesser } from "react-admin";
import jsonServerProvider from "ra-data-json-server";
import simpleRestProvider from "ra-data-simple-rest";
import { Edit, SimpleForm, TextInput, SelectInput } from "react-admin";

const dataProvider = simpleRestProvider("/api/rest");
//jsonServerProvider("https://jsonplaceholder.typicode.com");

const App = () => (
  <Admin dataProvider={dataProvider}>
    <Resource name="bakery" list={ListGuesser} edit={EditGuesser} />
  </Admin>
);

export default App;
