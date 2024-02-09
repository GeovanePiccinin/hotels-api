import { GraphQLSchema, GraphQLObjectType } from "graphql";
import HotelQuery from "./queries/hotel.query.js";
import HotelMutation from "./mutations/hotel.mutation.js";

const Schema = new GraphQLSchema({
  types: null,
  query: new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
      ...HotelQuery,
    },
  }),
  mutation: new GraphQLObjectType({
    name: "RootMutation",
    fields: {
      ...HotelMutation,
    },
  }),
});

export default Schema;
