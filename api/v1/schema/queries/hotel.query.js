import { GraphQLList, GraphQLInt } from "graphql";
import Hotel from "../types/Hotel.js";
import HotelResolver from "../resolvers/hotel.resolver.js";

const hotelQueries = {
  getHotels: {
    type: new GraphQLList(Hotel),
    resolve: () => HotelResolver.getHotels(),
  },
  getHotel: {
    type: Hotel,
    args: {
      id: {
        name: "id",
        type: GraphQLInt,
      },
    },
    resolve: (_, args) => HotelResolver.getHotel(args.id),
  },
};

export default hotelQueries;
