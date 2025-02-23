import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { User } from "../../users/schemas/user.schema";

@Schema({
    timestamps: true
})

export class Tasks{
    @Prop()
    title : string;

    @Prop()
    description : string;

    @Prop()
    category : string;

    @Prop()
    completed : boolean;

    @Prop()
    user : User
}

export const TasksSchema = SchemaFactory.createForClass(Tasks);