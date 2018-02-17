import User from '../models/users';

export const getUser = (req, res, next) => {
  User.find({username: req.body.username, password: req.body.password}, (err, doc) => {
    if(err === null && doc.length !== 0){
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.end("foundUser");
    } else if(err === null && doc.length === 0){
      res.writeHead(400, {'Content-Type': 'text/html'});
      res.end("forbidden");
    } else {
      res.writeHead(500, {'Content-Type': 'text/html'});
      res.end(`${err}`);
    }
  })
};
