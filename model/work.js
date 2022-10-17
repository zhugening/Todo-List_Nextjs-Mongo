import { Schema, models, model } from 'mongoose';

const workSchema = new Schema({
    name: String,
    text: String,
    date: String,
    responsibility: String,
    status: String
});

const Works = models.work || model("work", workSchema)

export default Works;