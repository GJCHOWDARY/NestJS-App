import * as mongoose from 'mongoose';

export const LinkSchema = new mongoose.Schema({
  white_label_host: { 
    type: String, 
    unique: true,
    required: true 
  },
  white_label_secret: { 
    type: String, 
    required: true 
  },
  url: { 
    type: String, 
    default:'' 
  },
  url_hash: { 
    type: String, 
    default:'' 
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
  url: string;
  url_hash: string;
  count: number;
}