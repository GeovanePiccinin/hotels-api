import { GraphQLBoolean, GraphQLInt } from "graphql";
import Hotel from "../types/Hotel.js";
import HotelInput from "../types/HotelInput.js";
import HotelResolver from "../resolvers/hotel.resolver.js";

const hotelMutation = {
  createHotel: {
    type: Hotel,
    args: {
      hotel: {
        name: "hotel",
        type: HotelInput,
      },
    },
    resolve(_, args) {
      return HotelResolver.createHotel(args.hotel);
    },
  },
  deleteHotel: {
    type: GraphQLBoolean,
    args: {
      id: {
        name: "id",
        type: GraphQLInt,
      },
    },
    resolve(_, args) {
      HotelResolver.deleteHotel(args.id);
    },
  },
  updateHotel: {
    type: Hotel,
    args: {
      hotel: {
        name: "hotel",
        type: HotelInput,
      },
    },
  },
};

export default hotelMutation;
