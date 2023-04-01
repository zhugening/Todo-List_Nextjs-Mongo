import { Schema, models, model } from 'mongoose';

const TrackingSchema = new Schema({
    dateUpdate: String,
    text: String,
    person: String
})

const workSchema = new Schema({
    claim_no: String,
    contract_no: String,
    egat_sn: String,
    claim_booking: String,
    device_no: String,
    equipment: String,
    status: String,
    responsibility: String,
    date: String,
    update: [TrackingSchema]
});

const Works = models.work || model("work", workSchema)

export default Works;
