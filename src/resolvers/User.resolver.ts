import { Resolver, Query } from 'type-graphql';

@Resolver()
export class UserResolver {
    @Query(_ => String)
    sayHello() {
        return 'hello world';
    }
}