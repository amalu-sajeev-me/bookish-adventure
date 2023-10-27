import 'module-alias/register';
import '@bin/config';
import { LoggerAdapter } from '@adapters/logger.adapter';
import { EnvironmentUtil } from '@utils/EnvironmentUtil';
import { container } from 'tsyringe';
import { Server } from './server';

(function main() {
    // write your code here
    const scream = container.resolve(LoggerAdapter);
    const environment = EnvironmentUtil.getCurrentEnvironment();
    scream.info('hello world', environment);
    const server = container.resolve(Server);
    server.start();
})();