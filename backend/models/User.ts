import { Schema, model, Document } from 'mongoose';

interface IUser extends Document {
    email: string,
    password: string
}

const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String }
});

const User = model<IUser>('user', userSchema); 
export default User
