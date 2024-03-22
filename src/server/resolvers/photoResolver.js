import Photo from '../models/photoModel.js';

const photoResolver = {
  Query: {
    photos: async () => {
      const photos = await Photo.find();
      return photos;
    },
  }
};

export default photoResolver;
