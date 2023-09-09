import mongoose, {Schema} from 'mongoose';

const userModel = new Schema({
    user: String,
    pass: String,
    type: String,
});

const User = mongoose.model('users', userModel);

export default User;