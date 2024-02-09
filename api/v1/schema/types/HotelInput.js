import { GraphQLInputObjectType, GraphQLString, GraphQLInt } from "graphql";

const HotelInput = new GraphQLInputObjectType({
  name: "HotelInput",
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

export default HotelInput;
