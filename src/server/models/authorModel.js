import { model } from 'mongoose';
import authorSchema from '../schemas/authorSchema.js';

const Author = model('Author', authorSchema, 'my_authors_collection');

export default Author;