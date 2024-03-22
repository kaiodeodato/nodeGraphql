import { model } from 'mongoose';
import publisherSchema from '../schemas/publisherSchema.js';

const Publisher = model('Publisher', publisherSchema, 'my_publishers_collection');

export default Publisher;