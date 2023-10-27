import { getModelForClass, modelOptions, plugin, pre, prop } from "@typegoose/typegoose";
import mongooseTimeStamp from 'mongoose-timestamp';
import { IUserEntity } from "@types-local/entities/user.type";
import bcrypt from 'bcrypt';
@plugin(mongooseTimeStamp)
@pre<User>('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
})
@modelOptions({schemaOptions:{collection: 'users'}})
class User implements IUserEntity {

    @prop()
    public firstName!: string;

    @prop()
    public lastName!: string;

    @prop()
    public email!: string;

    @prop()
    public password!: string;
}

export const UserModel = getModelForClass(User);