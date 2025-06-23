import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
  email : {
    type : String,
    required : true,
    unique : true
  },
  firstName : {
    type : String,
    required : true
  },
  lastName : {
    type : String,
    required : true
  },
  password : {
    type : String,
    required : true
  }
});

const User = mongoose.model('User', userSchema);
export default User