const mongoose = require('mongoose');

const issue = new mongoose.Schema({
  project : String,
  issue_title : {type: String, required: true},
  issue_text : {type: String, required: true},
  created_by : {type: String, required: true},
  assign_to : {type: String, default: ""},
  status_text : {type: String, default: ""},
  created_on : {type: Date, default: Date.now()},
  updated_on : {type: Date, default: Date.now()},
  open : {type: Boolean, default: true}
});

module.exports = mongoose.model('issue', issue);