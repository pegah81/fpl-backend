import mongoose, { Schema } from 'mongoose';
import { substitution,objId } from '../types/types';
import { IFeed } from '../interface/feed.interface';

const feedSchema = new Schema<IFeed>(
    {
        managerId:{
            type:mongoose.Types.ObjectId,
            ref:"Manager"
        },
        points:{
            type:Number
        },
        substitutions:[
            {
                in:{
                    type:mongoose.Types.ObjectId,
                    ref:"Player"
                },
                out:{
                    type:mongoose.Types.ObjectId,
                    ref:"Player"
                }
            }
        ],
        // substitutions:{
        //     type:Array<substitution>,
        //     default:[]
        // },
        event:{
            type:mongoose.Types.ObjectId,
            ref:"Event"
        }
    },
    { 
        versionKey: false 
    }
);

const Feed = mongoose.model("Feed", feedSchema);

export = Feed;
