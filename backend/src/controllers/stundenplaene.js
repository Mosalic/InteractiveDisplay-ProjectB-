import Stundenplan from '../models/stundenplaene';

export const postStundenplan = (req, res, next) => {
  const stundenplan = new Stundenplan(req.body);
  stundenplan.save(req.body, (err, doc) => {
    if(err === null){
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.end("added");
    } else {
      res.writeHead(500, {'Content-Type': 'text/html'});
      res.end(`${err}`);
    }
  });
};

export const getStundenplan = (req, res, next) => {
  Stundenplan.find((err, doc) => {
    if(err === null){
      res.json({data: {stundenplaene: doc}});
      res.end("found");
    }
  });
};

export const putStundenplan = (req, res, next) => {
  // console.log(req.body);
  Stundenplan.findOneAndUpdate(
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
  })
};

export const getStundenplanById = (req, res, next) => {
  Stundenplan.find({ "id" : req.params.id }, (err, doc) => {
    if(err === null){
      res.json({data: {stundenplan: doc[0]}});
      res.end("found");
    } else {
      res.writeHead(500, {'Content-Type': 'text/html'});
      res.end(`${err}`);
    }
  });
};

export const deleteStundenplan = (req, res, next) => {
  Stundenplan.remove({ "id" : req.params.id}, (err, doc) => {
    if(err === null){
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.end("deleted");
    } else {
      res.writeHead(500, {'Content-Type': 'text/html'});
      res.end(`${err}`);
    }
  })
};
