import User from '../models/users';
import jwt from 'jsonwebtoken';

export const getUser = (req, res, next) => {
  User.find({username: req.body.username, password: req.body.password}, (err, doc) => {
    // jwt.verify(req.headers.authorization, 'shhhhh', function(err, decoded) {
    //   console.log(err) // bar
    // });
    // console.log(req.headers);
    if(err === null && doc.length !== 0){
      console.log(doc);
      var token = jwt.sign({ role: doc[0].role }, 'shhhhh', { expiresIn: '2h' } );
      // console.log(token);
      // res.writeHead(200, {'Content-Type': 'text/html'});
      res.json({token: token});
      res.end("foundUser");
    } else if(err === null && doc.length === 0){
      res.writeHead(400, {'Content-Type': 'text/html'});
      res.end("forbidden");
    } else {
      res.writeHead(500, {'Content-Type': 'text/html'});
      res.end(`${err}`);
    }
  });
};

export const postUser = (req, res, next) => {
  console.log('post');
  jwt.verify(req.headers.authorization, 'shhhhh', (err, decoded) => {
    if(err === null) {
      if(decoded.role === 1){
        const newUser = new User(req.body);
        newUser.save(req.body, (err, doc) => {
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
    } else {
      res.writeHead(400, {'Content-Type': 'text/html'});
      res.end("forbidden");
    }
  });
}

export const getUsers = (req, res, next) => {
  jwt.verify(req.headers.authorization, 'shhhhh', (err, decoded) => {
    if(err === null) {
      if(decoded.role === 1){
        User.find((err, doc) => {
          if(err === null){
            res.json({users: doc});
            res.end("found");
          }
        });
      } else {
        res.writeHead(400, {'Content-Type': 'text/html'});
        res.end("forbidden");
      }
    } else {
      res.writeHead(400, {'Content-Type': 'text/html'});
      res.end("forbidden");
    }
  });
}

export const deleteUser = (req, res, next) => {
  jwt.verify(req.headers.authorization, 'shhhhh', (err, decoded) => {
    if(err === null) {
      if(decoded.role === 1){
        User.remove({ "id" : req.params.id}, (err, doc) => {
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
    } else {
      res.writeHead(400, {'Content-Type': 'text/html'});
      res.end("forbidden");
    }
  });
}

export const updateUser = (req, res, next) => {
  jwt.verify(req.headers.authorization, 'shhhhh', (err, decoded) => {
    if(err === null) {
      if(decoded.role === 1){
        User.findOneAndUpdate(
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
    } else {
      res.writeHead(400, {'Content-Type': 'text/html'});
      res.end("forbidden");
    }
  });
}
