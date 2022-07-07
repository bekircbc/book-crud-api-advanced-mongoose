import mongoose from "mongoose";
import { Book } from "../models/Book.js";
import axios from "axios";

mongoose.connect("mongodb://localhost/bookapi");

console.log("connected to mongoose");

const url = "https://edwardtanguay.netlify.app/share/books.json";

//für importing book data to mongo

// const book = new Book({
//   title: "tttimported",
//   description: "dddimported",
//   numberOfPages: 555,
// });
// await book.save();

//getting rawbookdata from edward's book.json

const rawBooks = (await axios.get(url)).data;

for (const rawBook of rawBooks) {
  console.log(`processing ${rawBook.title}...`);
  const book = new Book({
    title: rawBook.title,
    description: rawBook.description,
    numberOfPages: Number(rawBook.totalpages),
    language: rawBook.language,
    imageUrl: `http://edwardtanguay.netlify.app/share/images/books/${rawBook.idcode}.png`,
    buyUrl: rawBook.buyUrl,
  });
  await book.save();
}

console.log("imported completed");
process.exit(1);

//for adding data to mongoose schreib //npm run import//
