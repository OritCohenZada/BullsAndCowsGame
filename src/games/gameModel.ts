import mongoose, { Document, Schema,ObjectId } from 'mongoose';
const autoIncrement = require('mongoose-sequence')(mongoose); 

export interface IGuess {
    guessNumbers: number[], 
    bulls: number,
    pgias: number,
    createdAt: Date

}

export interface IGame extends Document {
  _id: ObjectId,
  playerId: ObjectId,
  secretCode: number[],         
  attempts: IGuess[];
  status: 'in-progress' | 'won' | 'lost' | 'ended',
  maxAttempts: number,
  winner: boolean,      
  createdAt: Date

}

const guessSchema = new Schema<IGuess>(
  {
    guessNumbers: { type: [Number], required: true },
    bulls:{ type:Number, required: true },
    pgias: { type: Number, required: true},
    createdAt:{ type: Date, default:Date.now},
  },
  { _id: false } 
);

const gameSchema = new Schema<IGame>(
  {
    _id: { type: Number, required: true },
    playerId: {type: Number, required: true, ref: 'Player'  },
    secretCode: { type: [Number], required: true }, 
    attempts:  { type:[guessSchema], default: [] },
    status: {type: String, default: 'in-progress'},
    maxAttempts: { type: Number, default:10 },
    winner: { type: Boolean, default:false },      
    createdAt:{ type: Date, default:Date.now},
  
  },

  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      transform: (_doc, ret) => {
        delete ret._id;
        return ret;
      }
    }
  }
);

gameSchema.plugin(autoIncrement, { inc_field: '_id' });

export const Game = mongoose.model<IGame>('Game', gameSchema);
export const Guess= mongoose.model<IGuess>('Guess', guessSchema);


