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
  // console.log(req.body);
};
