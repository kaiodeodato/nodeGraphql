import { model } from 'mongoose';
import bookSchema from '../schemas/bookSchema.js';

const Book = model('Book', bookSchema, 'my_books_collection');

export default Book;