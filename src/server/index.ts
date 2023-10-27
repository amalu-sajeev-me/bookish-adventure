import express from 'express';
import * as http from 'http';
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from '@apollo/server/express4';

import { generateServerConfig } from "./serverConfig";
import { inject, injectable, singleton } from 'tsyringe';
import { middlewares } from '../middlewares/express';
import { LoggerAdapter } from '@adapters/logger.adapter';
import { IApolloContext } from '../types/ApolloContext.type';

@singleton()
@injectable()
export class Server {
    public PORT = process.env.PORT || 3000;
    public app!: express.Application;
    public httpServer!: http.Server;
    public apolloServer!: ApolloServer<IApolloContext>;
    private isInitialized = false;
    private serverConfig!: Awaited<ReturnType<typeof generateServerConfig>>['serverConfig'];
    

    constructor(@inject(LoggerAdapter) public _scream: LoggerAdapter) {
        this.app = express();
        this.httpServer = http.createServer(this.app);
    }

    async initialize(): Promise<void> {
        if (this.isInitialized) throw new Error('server already initialized');
        const { serverConfig } = await generateServerConfig();
        this.serverConfig = serverConfig;
        this.apolloServer = new ApolloServer(this.serverConfig);
        this.isInitialized = true;
    }

    private applyMiddlewares() {
        this.app.use('/', ...middlewares, expressMiddleware(this.apolloServer));
    }

    private startListening() {
        const { PORT } = this;
        const serverStatusMessage = `server started listening to http://localhost:${PORT}`;
        this.app.listen(PORT, () => {
            this._scream.info(serverStatusMessage)
        });
    }

    async start() {
        await this.initialize();
        await this.apolloServer.start();
        this.applyMiddlewares();
        this.startListening();
    }
}