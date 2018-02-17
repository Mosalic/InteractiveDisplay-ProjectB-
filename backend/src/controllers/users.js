import User from '../models/users';
import jwt from 'jsonwebtoken';

export const getUser = (req, res, next) => {
  User.find({username: req.body.username, password: req.body.password}, (err, doc) => {
    // jwt.verify(req.headers.authorization, 'shhhhh', function(err, decoded) {
    //   console.log(err) // bar
    // });
    // console.log(req.headers);
    if(err === null && doc.length !== 0){
      var token = jwt.sign({ role: doc.role }, 'shhhhh', { expiresIn: '1h' } );
      console.log(token);
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
