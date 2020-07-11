import * as mongoose from 'mongoose';

export const RequestSchema = new mongoose.Schema({
  user_agent: { 
    type: String, 
    required: true 
  },
  headers: { 
    type: Object, 
    required: true 
  },
  message: { 
    type: Object, 
    required: true 
  },
  ip: { 
    type: String, 
    required: true 
  },
  referrer: { 
    type: String, 
    required: true 
  },
  type: { 
    type: String, 
    default:'log'
  },
  method: { 
    type: String, 
    required: true 
  },
},
{ timestamps: true }
);

export interface Request extends mongoose.Document {
  id: string;
  headers: string;
  user_agent: string;
  ip: string;
  message: string;
  referrer: string;
  method: string;
  type: string;
  createdAt: Date;
}