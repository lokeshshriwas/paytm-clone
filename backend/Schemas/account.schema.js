import mongoose from 'mongoose';
const { Schema } = mongoose;

const accountSchema = new Schema({
  userId : {
    type : Schema.Types.ObjectId,
    ref : 'User',
    required : true
  },
  balance : {
    type : Number,
    required : true,
    default : 0
  },
});

const Account = mongoose.model('Account', accountSchema);
export default Account