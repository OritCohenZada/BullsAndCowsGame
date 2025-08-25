import mongoose, { Document, Schema, ObjectId } from 'mongoose';



export interface IPlayer extends Document {
  _id: ObjectId
  name: string;
  password: string;
  gamesIds:ObjectId[];
  email: string;
  wins: number;
  createdAt: Date;
}

const playerSchema = new Schema<IPlayer>(
  {
    _id: { type: Number, required: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    gamesIds:{type:[Number],default:[]},
    wins: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now }
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      transform: (_doc, ret) => {
        delete ret.password;
        return ret;
      }
    }
  }
);


const updatePlayerSchema = new Schema<IPlayer>(
  {
    
    name: { type: String},
    password: { type: String },
    email: { type: String},

  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      transform: (_doc, ret) => {
        delete ret.password;
        return ret;
      }
    }
  }
);

export const Player = mongoose.model<IPlayer>('Player', playerSchema);