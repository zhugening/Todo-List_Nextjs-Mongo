import { Schema, models, model } from 'mongoose';

const workSchema = new Schema({
    claim_no: String,
    contract_no: String,
    egat_sn: String,
    claim_booking: String,
    device_no: String,
    equipment: String,
    status: String,
    responsibility: String,
    date: String
});

const Works = models.work || model("work", workSchema)

export default Works;


// const workSchema = new Schema({
//     name: String,
//     text: String,
//     date: String,
//     responsibility: String,
//     status: String
// });
