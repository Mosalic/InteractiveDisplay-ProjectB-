import Notes from '../models/notes';
import jwt from 'jsonwebtoken';
import fs from 'fs';
var ObjectId = require('mongodb').ObjectID;

export const getNotes = (req, res, next) => {
  Notes.find((err, doc) => {
    if(err === null){
      res.json({notes: doc});
      res.end("found");
    }
  });
};

export const postNotes = (req, res, next) => {
  const notes = new Notes(req.body);
  if (req.file != undefined){
    notes.img = {data: fs.readFileSync(req.file.path), contentType: 'image/png'};
  }
  notes.save(req.body, (err, doc) => {
    if(err === null){
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.end("added");
    } else {
      res.writeHead(500, {'Content-Type': 'text/html'});
      res.end(`${err}`);
    }
  });
};

export const putNotes = (req, res, next) => {
  jwt.verify(req.headers.authorization, 'shhhhh', (err, decoded) => {
    if(err === null) {
      Notes.findOneAndUpdate(
        { "_id" : ObjectId(req.params.id) },
        req.body,
      (err, doc) => {
        if(err === null){
          res.writeHead(200, {'Content-Type': 'text/html'});
          res.end("updated");
        } else {
          res.writeHead(500, {'Content-Type': 'text/html'});
          res.end(`${err}`);
        }
      });
    } else {
      res.writeHead(400, {'Content-Type': 'text/html'});
      res.end("forbidden");
    }
  });
};

export const deleteNotes = (req, res, next) => {
  jwt.verify(req.headers.authorization, 'shhhhh', (err, decoded) => {
    if(err === null) {
      Notes.remove({ "_id" : ObjectId(req.params.id)}, (err, doc) => {
        if(err === null){
          res.writeHead(200, {'Content-Type': 'text/html'});
          res.end("deleted");
        } else {
          res.writeHead(500, {'Content-Type': 'text/html'});
          res.end(`${err}`);
        }
      });
    } else {
      res.writeHead(400, {'Content-Type': 'text/html'});
      res.end("forbidden");
    }
  });
};

export const putNotesImage = (req, res, next) => {
  jwt.verify(req.headers.authorization, 'shhhhh', (err, decoded) => {
    if(err === null) {
      Notes.findOneAndUpdate(
        { "_id" : ObjectId(req.params.id) },
        { img: {data: fs.readFileSync(req.file.path), contentType: 'image/png'} },
      (err, doc) => {
        if(err === null){
          res.writeHead(200, {'Content-Type': 'text/html'});
          res.end("updated");
        } else {
          res.writeHead(500, {'Content-Type': 'text/html'});
          res.end(`${err}`);
        }
      });
    } else {
      res.writeHead(400, {'Content-Type': 'text/html'});
      res.end("forbidden");
    }
  });
};

export const deleteNotesImage = (req, res, next) => {
  jwt.verify(req.headers.authorization, 'shhhhh', (err, decoded) => {
    if(err === null) {
      Notes.findOneAndUpdate(
        { "_id" : ObjectId(req.params.id) },
        { $unset: { img: {} } },
      (err, doc) => {
        if(err === null){
          res.writeHead(200, {'Content-Type': 'text/html'});
          res.end("updated");
        } else {
          res.writeHead(500, {'Content-Type': 'text/html'});
          res.end(`${err}`);
        }
      });
    } else {
      res.writeHead(400, {'Content-Type': 'text/html'});
      res.end("forbidden");
    }
  });
};
