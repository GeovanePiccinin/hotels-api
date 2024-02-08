export const swaggerDoc = {
  openapi: "3.0.3",
  info: {
    title: "Swagger Hotels Platform - OpenAPI 3.0",
    description:
      "This is a sample Hotels Platform API Server based on the OpenAPI 3.0 specification.",
    version: "1.0.11",
  },
  servers: [
    {
      url: "http://localhost:3000/api/v1",
    },
  ],
  tags: [
    {
      name: "hotels",
      description: "Accsses to Hotels Platform",
    },
  ],
  paths: {
    "/hotels": {
      get: {
        tags: ["hotels"],
        summary: "Lists Hotels",
        description: "Return list of hotels using pagination",
        operationId: "findHotels",
        parameters: [
          {
            name: "sortby",
            in: "query",
            description: "defines column for sorting",
            required: false,
            explode: true,
            schema: {
              type: "string",
              default: "name",
            },
          },
          {
            name: "sort",
            in: "query",
            description: "defines sorting",
            required: false,
            explode: true,
            schema: {
              type: "string",
              default: "ASC",
              enum: ["ASC", "DESC"],
            },
          },
          {
            name: "page",
            in: "query",
            description: "defines page",
            required: false,
            explode: true,
            schema: {
              type: "integer",
              default: 1,
            },
          },
          {
            name: "limit",
            in: "query",
            description: "defines total records to be return",
            required: false,
            explode: true,
            schema: {
              type: "integer",
              default: 10,
            },
          },
        ],
        responses: {
          200: {
            description: "successful operation",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    count: {
                      type: "integer",
                      description: "The user ID.",
                    },
                    rows: {
                      type: "array",
                      items: {
                        $ref: "#/components/schemas/Hotel",
                      },
                    },
                  },
                },
              },
            },
          },
          400: {
            description: "Invalid status value",
          },
        },
        security: [
          {
            bearerAuth: ["write:Hotels", "read:Hotels"],
          },
        ],
      },
      post: {
        tags: ["hotels"],
        summary: "Add a new hotel to the store",
        description: "Add a new hotel to the store",
        operationId: "addHotel",
        requestBody: {
          description: "Create a new Hotel in the store",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Hotel",
              },
            },
            "application/xml": {
              schema: {
                $ref: "#/components/schemas/Hotel",
              },
            },
            "application/x-www-form-urlencoded": {
              schema: {
                $ref: "#/components/schemas/Hotel",
              },
            },
          },
          required: true,
        },
        responses: {
          201: {
            description: "Created",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Hotel",
                },
              },
              "application/xml": {
                schema: {
                  $ref: "#/components/schemas/Hotel",
                },
              },
            },
          },
          400: {
            description: "Invalid input",
          },
          422: {
            description: "Validation exception",
          },
        },
        security: [
          {
            bearerAuth: ["write:Hotels", "read:Hotels"],
          },
        ],
      },
    },
    "/hotels/{id}": {
      delete: {
        tags: ["hotels"],
        summary: "Deletes a hotel",
        description: "delete a hotel",
        operationId: "deleteHotel",
        parameters: [
          {
            name: "api_key",
            in: "header",
            description: "",
            required: false,
            schema: {
              type: "string",
            },
          },
          {
            name: "id",
            in: "path",
            description: "Hotel id to delete",
            required: true,
            schema: {
              type: "integer",
              format: "int64",
            },
          },
        ],
        responses: {
          400: {
            description: "Invalid hotel value",
          },
        },
        security: [
          {
            bearerAuth: ["write:hotels", "read:hotels"],
          },
        ],
      },
      put: {
        tags: ["hotels"],
        summary: "Update an existing hotel",
        description: "Update an existing hotel by Id",
        operationId: "updateHotel",
        parameters: [
          {
            name: "api_key",
            in: "header",
            description: "",
            required: false,
            schema: {
              type: "string",
            },
          },
          {
            name: "id",
            in: "path",
            description: "Hotel id to delete",
            required: true,
            schema: {
              type: "integer",
              format: "int64",
            },
          },
        ],
        requestBody: {
          description: "Update an existent hotel in the platform",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Hotel",
              },
            },
          },
          required: true,
        },
        responses: {
          204: {
            description: "Successful operation",
          },
          400: {
            description: "Invalid ID supplied",
          },
          404: {
            description: "Hotel not found",
          },
          422: {
            description: "Validation exception",
          },
        },
        security: [
          {
            bearerAuth: ["write:hotels", "read:hotels"],
          },
        ],
      },
    },
  },
  components: {
    schemas: {
      Hotel: {
        type: "object",
        properties: {
          id: {
            type: "integer",
            format: "int64",
            example: 10,
          },
          name: {
            type: "string",
            description: "Hotel name",
            example: "Hilton Palace",
          },
          address: {
            type: "string",
            description: "Hotel address",
            example: "1st Street",
          },
          phone: {
            type: "string",
            description: "Hotel phone",
            example: "(31) 3345-6789",
          },
          rating: {
            type: "integer",
            format: "int64",
            example: 4,
          },
        },
      },
    },
    requestBodies: {
      Hotel: {
        description: "Hotel object that needs to be added to the store",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Hotel",
            },
          },
        },
      },
    },
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
      api_key: {
        type: "apiKey",
        name: "api_key",
        in: "header",
      },
    },
  },
};
