import * as mongoose from 'mongoose';

export const TokenSchema = new mongoose.Schema({
    userId: String,
    token: String,
});
