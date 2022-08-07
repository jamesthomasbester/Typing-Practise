const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const profileSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Must match an email address!'],
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  avatar: {
    path: String,
  },
  analytics: [
    {
      character: String,
      fields: {
          count: Number,
          latency: Number,
          incorrect: Number,
          correct: Number,
      }
  },
  ],
  friends: [
    {
      name: String,
      email: String,

    }
  ],
  wpm: {
    type: Number
  },
  data: [
    {
        character: String,
        fields: {
            count: Number,
            latency: Number,
            incorrect: Number,
            correct: Number,
        }
    },
]
});

// set up pre-save middleware to create password
profileSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// compare the incoming password with the hashed password
profileSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const Profile = model('Profile', profileSchema);

module.exports = Profile;
