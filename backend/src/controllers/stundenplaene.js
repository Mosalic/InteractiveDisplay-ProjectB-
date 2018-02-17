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
      res.json({stundenplaene: doc});
      res.end("added");
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
