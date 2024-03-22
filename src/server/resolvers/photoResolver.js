import Photo from '../models/photoModel.js';

const photoResolver = {
  Query: {
    photos: async (_, { limit }) => {
      try {
        let photos;
        if (limit) {
          photos = await Photo.find().limit(limit)
        }else {
          photos = await Photo.find()
        }
        return photos
      } catch {
        throw new Error(`Failed to fetch photos: ${error.message}`);
      }
    }
  }
};

export default photoResolver;