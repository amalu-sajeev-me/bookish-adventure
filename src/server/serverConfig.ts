import { ApolloServerOptions } from "@apollo/server";
import { resolvers } from "../resolvers";
import { buildSchema } from "type-graphql";
import { IApolloContext } from "../types/ApolloContext.type";

type GQLSchema = Required<ApolloServerOptions<IApolloContext>>['schema'];

export const generateServerConfig = async () => {
    const schema = (await buildSchema({
        resolvers,
    })) as unknown as GQLSchema;

    const serverConfig: ApolloServerOptions<IApolloContext> = {
        schema,
    };
    return { serverConfig };
};