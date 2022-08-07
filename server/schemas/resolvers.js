const { AuthenticationError } = require('apollo-server-express');
const { Profile } = require('../models');
const { signToken } = require('../utils/auth');
const { ObjectId } = require('mongodb');

const resolvers = {
  Query: {
    profiles: async () => {
      return Profile.find();
    },

    profile: async (parent, { profileId }) => {
      return Profile.findOne({ _id: profileId });
    },

    me: async (parent, args, context) => {
      if (context.user) {
        return Profile.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },

  Mutation: {
    addProfile: async (parent, { name, email, password }) => {
      const profile = await Profile.create({ name, email, password });
      const token = signToken(profile);

      return { token, profile };
    },
    login: async (parent, { email, password }) => {
      const profile = await Profile.findOne({ email });

      if (!profile) {
        throw new AuthenticationError('No profile with this email found!');
      }

      const correctPw = await profile.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect password!');
      }

      const token = signToken(profile);
      return { token, profile };
    },

    removeProfile: async (parent, args, context) => {
      if (context.user) {
        return Profile.findOneAndDelete({ _id: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    addCharacterData: async (parent, {profileId, data, }, context) => {
        console.log(data)
         return await Profile.findOneAndUpdate(
        { _id: ObjectId(profileId) },
        {
          $addToSet: { data: data }  
        },
        {
          new: true,
          runValidators: true,
          unique: true
        }
        )
    },
    getCharacterData: async (parent, {profileId}, context) => {
      const user = await Profile.findOne({ _id: profileId })
      console.log(user)
      return user;
    },
    updateCharacterData: async (parent, {profileId, data, }, context) => {
      const user = await Profile.findOne({ _id: profileId })
      console.log(user)
      return user;
 },
    
  },
};

module.exports = resolvers;
