import express from "express";
import { createServer } from "http";
import bodyParser from "body-parser";
import cors from "cors";
import { ApolloServer } from "apollo-server-express";
import mongoose from "mongoose";
import { Recipe } from "./models/Recipie";
import { User } from "./models/User";
import jwt from "jsonwebtoken";
import { makeExecutableSchema } from "graphql-tools";
import { typeDefs } from "./schema";
import { resolvers } from "./resolvers";

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
});

const app = express();

const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true
}
app.use(cors(corsOptions));

const GRAPHQL_PORT = 4444;

// app.use(bodyParser.json());
//connect to database
mongoose
    .connect("mongodb://localhost:27017/react-recipies", { useNewUrlParser: true, useCreateIndex: true })
    .then(() => console.log("DB connected"))
    .catch(error => console.log(`Mongo DB error ${error}`));

const httpServer = createServer(app);

let server = new ApolloServer({
    schema,
    context: async ({ req, connection }) => {
        let currentUser;
        const token = req.headers["authorization"];
        if (token !== "null") {
            try {
                currentUser = await jwt.verify(token, process.env.SECRET);
                console.log(currentUser);
            } catch (error) {
                console.log(error);
            }

        }
        return {
            Recipe,
            User,
            currentUser
        }
    }
});

server.applyMiddleware({ app, path: "/graphql" });

httpServer.listen({ port: GRAPHQL_PORT }, () => {
    console.log(`server is listening on http://localhost:4444/graphql `);
});
