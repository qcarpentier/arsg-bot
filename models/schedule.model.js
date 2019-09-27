const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const scheduleSchema = new Schema(
  {
    grade: {
      type: String,
      unique: true,
      required: true
    },
    day: {
      type: String,
      required: true
    },
    hour1: {
      type: String,
    },
    hour2: {
      type: String,
    },
    hour3: {
      type: String,
    },
    hour4: {
      type: String,
    },
    hour5: {
      type: String,
    },
    hour6: {
      type: String,
    },
    hour7: {
      type: String,
    },
    hour8: {
      type: String,
    }
  },
  {
    timestamps: true
  }
);

const Schedule = mongoose.model("Schedule", scheduleSchema);

module.exports = Schedule;
