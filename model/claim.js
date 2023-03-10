import { Schema, models, model } from 'mongoose';

const claimSchema = new Schema({
    claim_no: String,
    contract_no: String,
    egat_sn: String,
    claim_booking: String,
    device_no: String,
    equipment: String,
    date: String,
    responsibility: String,
    status: String
});
const Claim = models.claim || model("claim", claimSchema)

export default Claim;
