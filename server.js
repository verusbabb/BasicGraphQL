const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const Person = require("./data/students.json");

console.log(Person[0]);

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type Query {
    hello: String
    allPersons: [Person!]! 
  }
  type Person{
    firstName: String
    lastName: String
    email: String
    password: String
    collegeId: String
  }
`);

// The root provides a resolver function for each API endpoint
const root = {
  hello: () => "Hello world!",
  allPersons: () => Person,
};

const app = express();
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);
app.listen(4000);
console.log("Running a GraphQL API server at http://localhost:4000/graphql");
