import express from "express";

import { TicketModel } from "../models";

const ticketsRoute = express.Router();

// GET TICKETS
ticketsRoute.get('/', async (req, res) => {
  try {
    const tickets = await TicketModel.find();
    res.json(tickets);
  } catch (error) {
    res.json({ message: error })
  }
});

// POST TICKET
ticketsRoute.post('/', async (req, res) => {
  const ticket = new TicketModel({
    client: req.body.client,
    issue: req.body.issue,
    status: req.body.status,
    deadline: req.body.deadline
  })
  try {
    const savedTicket = await ticket.save();
    res.json(savedTicket);
  } catch (error) {
    res.json({ message: error })
  }
});

// GET TICKET
ticketsRoute.get('/:ticketId', async (req, res) => {
  try {
    const ticket = await TicketModel.findById(req.params.ticketId);
    res.json(ticket);
  } catch (error) {
    res.json({ message: error })
  }
});

// DELETE TICKET
ticketsRoute.delete('/:ticketId', async (req, res) => {
  try {
    const removedTicket = await TicketModel.findOneAndRemove({
      _id: req.params.ticketId
    });
    res.json(removedTicket);
  } catch (error) {
    res.json({ message: error })
  }
});

// UPDATE TICKET
ticketsRoute.patch('/:ticketId', async (req, res) => {
  try {
    const updatedTicket = await TicketModel.findOneAndUpdate({
      _id: req.params.ticketId
    }, {
      $set: {
        title: req.body.title,
        issue: req.body.issue,
        status: req.body.status,
        deadline: req.body.deadline
      }
    });
    res.json(updatedTicket);
  } catch (error) {
    res.json({ message: error })
  }
});

export { ticketsRoute };
