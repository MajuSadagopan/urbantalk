import express from 'express';

const app = express();

app.use(express.static('public'));

app.get('/', (request, response) => {
  response.sendFile(__dirname + '/views/index.html');
});

// Simple in-memory store for now
var comments = [
  {name:'Daniel',comment:'This is great :)',latitude:43.6531,longitude:-79.3971},
]

// end point to retrieve in memory comments
app.get("/comments", function(request,response) {
  response.setHeader('Content-Type', 'application/json');
  response.send(JSON.stringify(comments));
})

// end point to submit comments back to store-- not in use at the moment
app.post("/comments", function(request,response){
  comments.push(request.query.comment);
  response.sendStatus(200);
})

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log(`Your app is listening on port ${listener.address().port}. 🚢`);
});
