const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  status: { type: String, default: 'Todo' },
  due_date: { type: Date, required: true },
  priority: { type: String, required: true }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    versionKey: false,
    transform: (doc, ret) => {
      ret.id = ret._id.toString();
      delete ret._id;
    }
  }
});

module.exports = mongoose.model('Task', taskSchema);
