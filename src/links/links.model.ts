import * as mongoose from 'mongoose';

export const LinkSchema = new mongoose.Schema({
  white_label_host: { 
    type: String, 
    required: true 
  },
  white_label_secret: { 
    type: String, 
    required: true 
  },
  count: { 
    type: Number, 
    default:0 
  },
},
{ timestamps: true }
);

export interface Links extends mongoose.Document {
  id: string;
  white_label_host: string;
  white_label_secret: string;
  count: number;
}