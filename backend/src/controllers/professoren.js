import Professor from '../models/professoren';
import jwt from 'jsonwebtoken';
import fs from 'fs';

export const postProfessoren = (req, res, next) => {
  jwt.verify(req.headers.authorization, 'shhhhh', (err, decoded) => {
    if(err === null) {
      const professor = new Professor(req.body);
      if (req.file != undefined){
        professor.img = {data: fs.readFileSync(req.file.path), contentType: 'image/png'};
      }
      professor.save(req.body, (err, doc) => {
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

export const getProfessoren = (req, res, next) => {
  Professor.find((err, doc) => {
    if(err === null){
      res.json({professoren: doc});
      res.end("found");
    }
  });
};

export const putProfessoren = (req, res, next) => {
  // console.log(req.body);
  jwt.verify(req.headers.authorization, 'shhhhh', (err, decoded) => {
    if(err === null) {
      Professor.findOneAndUpdate(
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

export const getProfessorenById = (req, res, next) => {
  Professor.find({ "id" : req.params.id }, (err, doc) => {
    if(err === null){
      res.json({professor: doc[0]});
      res.end("found");
    } else {
      res.writeHead(500, {'Content-Type': 'text/html'});
      res.end(`${err}`);
    }
  });
};

export const deleteProfessoren = (req, res, next) => {
  jwt.verify(req.headers.authorization, 'shhhhh', (err, decoded) => {
    if(err === null) {
      Professor.remove({ "id" : req.params.id}, (err, doc) => {
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
