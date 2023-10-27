import 'reflect-metadata';
import { container } from 'tsyringe';
import { LoggerAdapter, PrimaryDBAdapter } from '../src/adapters';

container.registerSingleton('LoggerAdapter', LoggerAdapter);
container.registerSingleton('PrimaryDBAdapter', PrimaryDBAdapter);