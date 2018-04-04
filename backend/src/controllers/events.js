import Events from '../models/events';
import jwt from 'jsonwebtoken';
import fs from 'fs';

export const getEvents = (req, res, next) => {
  Events.find((err, doc) => {
    if(err === null){
      res.json({events: doc});
      res.end("found");
    }
  });
};

export const postEvents = (req, res, next) => {
  jwt.verify(req.headers.authorization, 'shhhhh', (err, decoded) => {
    if(err === null) {
      const events = new Events(req.body);
      if (req.file != undefined){
        events.img = {data: fs.readFileSync(req.file.path), contentType: 'image/png'};
      }
      events.save(req.body, (err, doc) => {
        if(err === null){
          res.writeHead(200, {'Content-Type': 'text/html'});
          res.end("added");
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

export const putEvents = (req, res, next) => {
  jwt.verify(req.headers.authorization, 'shhhhh', (err, decoded) => {
    if(err === null) {
      Events.findOneAndUpdate(
        { "id" : req.params.id },
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

export const deleteEvents = (req, res, next) => {
  jwt.verify(req.headers.authorization, 'shhhhh', (err, decoded) => {
    if(err === null) {
      Events.remove({ "id" : req.params.id}, (err, doc) => {
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

export const putEventsImage = (req, res, next) => {
  jwt.verify(req.headers.authorization, 'shhhhh', (err, decoded) => {
    if(err === null) {
      Events.findOneAndUpdate(
        { "id" : req.params.id },
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
