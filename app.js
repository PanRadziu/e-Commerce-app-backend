// var createError = require('http-errors');
// var express = require('express');
// var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

// var app = express();

// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import {addProduct, editProduct, deleteProduct, getProducts, getProduct, registerUser, loginUser} from './database.js';

const app = express()
app.use(cors());
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));

// // pobieranie wszystkich przedmiotów
// app.get('/items', async (req, res) => {
//   const items = await getItems();
//   res.send(items);
// });
// // pobieranie przedmiotu po id
// app.get('/items/:id', async (req, res) => {
//   const id = req.params.id;
//   const item = await getItem(id);
//   res.send(item);
// });
// //dodawanie przedmiotu
// app.post("/items", async (req, res) => {
//   const { nazwa, cena, opis } = req.body;
//   const item = await createItem(nazwa, cena, opis);
//   res.status(201).send(item);
// })

app.post("/api/registerUser", async (req, res) => {
  const { Imie, Nazwisko, Email, Haslo } = req.body;
  try {
    const result = await registerUser(Imie, Nazwisko, Email, Haslo);
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

app.post("/api/loginUser", async (req, res) => {
  const { Email } = req.body;
  try {
    const result = await loginUser(Email);
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Nie ma takiego użytkownika" });
  }
});

app.get("/api/getProducts", async (req, res) => {
  try {
    const result = await getProducts();
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

app.get("/api/getProduct/:id", async (req, res) => {
  try{
    const id = req.params.id;
    const item = await getProduct(id);
    res.send(item);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

app.post("/api/addProduct", async (req, res) => {
  const { NazwaProduktu, OpisProduktu, Cena, Dostepnosc, KategoriaID, ZdjecieProduktu } = req.body;
  try {
    const Product = await addProduct(NazwaProduktu, OpisProduktu, Cena, Dostepnosc, KategoriaID, ZdjecieProduktu);
    res.send(Product);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

app.put("/api/editProduct/:id", async (req, res) => {
  const id = req.params.id;
  const { NazwaProduktu, OpisProduktu, Cena, Dostepnosc, KategoriaID, ZdjecieProduktu } = req.body;
  try {
    const result = await editProduct(id, NazwaProduktu, OpisProduktu, Cena, Dostepnosc, KategoriaID, ZdjecieProduktu);
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

app.delete("/api/deleteProduct/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const result = await deleteProduct(id);
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});




// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(3000, () => console.log('Listening on port 3000'));

// module.exports = app;
