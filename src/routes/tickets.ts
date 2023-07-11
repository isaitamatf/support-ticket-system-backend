import express from "express";

import { TicketModel } from "../models";

const ticketsRoute = express.Router();

// GET TICKETS
ticketsRoute.get('/', async (req, res) => {
  try {
    const ticketsFound = await TicketModel.find();
    res.json(ticketsFound);
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
    const ticketSaved = await ticket.save();
    res.json(ticketSaved);
  } catch (error) {
    res.json({ message: error })
  }
});

// GET TICKET
ticketsRoute.get('/:ticketId', async (req, res) => {
  try {
    const ticketFound = await TicketModel.findById(req.params.ticketId);
    res.json(ticketFound);
  } catch (error) {
    res.json({ message: error })
  }
});

// DELETE TICKET
ticketsRoute.delete('/:ticketId', async (req, res) => {
  try {
    const ticketRemoved = await TicketModel.findOneAndRemove({
      _id: req.params.ticketId
    });
    res.json(ticketRemoved);
  } catch (error) {
    res.json({ message: error })
  }
});

// UPDATE TICKET
ticketsRoute.patch('/:ticketId', async (req, res) => {
  try {
    await TicketModel.findOneAndUpdate({
      _id: req.params.ticketId
    }, {
      $set: {
        title: req.body.title,
        issue: req.body.issue,
        status: req.body.status,
        deadline: req.body.deadline
      }
    });
    const ticketFound = await TicketModel.findById(req.params.ticketId);
    res.json(ticketFound);
  } catch (error) {
    res.json({ message: error })
  }
});

export { ticketsRoute };
