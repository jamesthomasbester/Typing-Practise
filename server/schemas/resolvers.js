const { AuthenticationError } = require('apollo-server-express');
const { Profile, Data } = require('../models');
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
         return Profile.findOneAndUpdate(
        { _id: ObjectId(profileId) },
        {
          $push: { data }  
        },
        {
          new: true,
          runValidators: true,
          unique: true
        }
        )
    },
    updateCharacterData: async (parent, {profileId, data, }, context) => {
      const user = await Profile.findOne({ _id: profileId , })
      console.log(user.data)
      return user.data;
      if(!usersData){
        throw new AuthenticationError('No profile with this email found!');
      }

    //   return Profile.findOneAndUpdate(
    //  { _id: ObjectId(profileId) },
    //  {
    //    $push: { data }  
    //  },
    //  {
    //    new: true,
    //    runValidators: true,
    //    unique: true
    //  }
    //  )
 },
    
  },
};

module.exports = resolvers;
