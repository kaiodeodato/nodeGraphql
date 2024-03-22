import { model } from 'mongoose';
import photoSchema from '../schemas/photoSchema.js';

const Photo = model('Photo', photoSchema, 'my_photos_collection');

export default Photo;