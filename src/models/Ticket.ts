import mongoose from "mongoose";

const TicketSchema = new mongoose.Schema({
  client: {
    type: String,
    required: true
  },
  issue: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true,
    enum: ['open', 'closed']
  },
  deadline: {
    type: Date,
    default: Date.now
  }
});

export const TicketModel = mongoose.model("Tickets", TicketSchema);
