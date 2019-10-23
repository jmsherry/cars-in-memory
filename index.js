const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const uuid = require('uuid');
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json
app.use(bodyParser.json());

// Fake Data
let cars = [];

app.get('/api/cars', function(req, res){
  // console.log('API called');
  // res.send('Hi from the server!');
  res.json(cars);
});

app.post('/api/cars', function(req, res){
  console.log('data', req.body);
  const newCar = {
    ...req.body,
    id: uuid(),
  };
  cars = [...cars, newCar];
  res.sendStatus(201);
});

app.put('/api/cars/:id', function(req, res){
  const carToBeUpdatedId = req.params.id;
  const oldCar = cars.find(car => car.id === carToBeUpdatedId);
  const oldCarIndex = cars.findIndex(car => car.id === carToBeUpdatedId);

  const updatedCar = {
    ...oldCar,
    ...req.body,
  };

  cars = [
    ...cars.splice(0, oldCarIndex),
    updatedCar,
    ...cars.splice(oldCarIndex + 1)
  ];

  res.sendStatus(200);

});

app.delete('/api/cars/:id', function(req, res){
  const carToBeUpdatedId = req.params.id;
  const oldCarIndex = cars.findIndex(car => car.id === carToBeUpdatedId);
  console.log('cars', cars);
  cars = [
    ...cars.slice(0, oldCarIndex),
    ...cars.slice(oldCarIndex + 1)
  ];

  res.sendStatus(204);

});

// comment

app.listen(PORT, function(){
  console.log(`Server listening on port ${PORT}`);
});