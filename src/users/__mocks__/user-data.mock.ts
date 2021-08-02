import * as faker from 'faker';
import { User } from '../schemas/user.schema';

export const fakeUserData : User = {
    name : faker.name.findName(),
    username : faker.internet.userName(),
    password: faker.internet.password(),
    email: faker.internet.email(),
    orders: [faker.datatype.uuid(),faker.datatype.uuid()]
}