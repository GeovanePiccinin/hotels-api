import { GraphQLObjectType, GraphQLString, GraphQLInt } from "graphql";

const Hotel = new GraphQLObjectType({
  name: "Hotel",
  fields: () => ({
    hotelId: {
      type: GraphQLInt,
    },
    name: {
      type: GraphQLString,
    },
    address: {
      type: GraphQLString,
    },
    phone: {
      type: GraphQLString,
    },
    rating: {
      type: GraphQLInt,
    },
  }),
});

export default Hotel;
