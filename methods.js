const mongoose = require('mongoose');
const issue = require('./models/issue.js');

exports.addIssue = (req,res) => {
  issue.create({
    "project" : req.params.project,
    "issue_title" : req.body.issue_title,
    "issue_text" : req.body.issue_text,
    "created_by" : req.body.created_by,
    "assigned_to" : req.body.assigned_to,
    "status_text" : req.body.status_text,
  }, 
    (err,issue) => {
      if(err) return;
      res.json({
        "_id" : issue._id,
        "issue_title" : issue.issue_title,
        "issue_text" : issue.issue_text,
        "created_by" : issue.created_by,
        "assigned_to" : issue.assigned_to,
        "status_text" : issue.status_text,
        "created_on" : issue.created_on.toISOString(),
        "updated_on" : issue.updated_on.toISOString(),
        "open" : issue.open,
      });
  })
}

exports.updateIssue = (req,res) => {
  issue.findById(req.body.id, (err,issue) => {
    if(err) res.send("could not update " + req.body.id);
    issue.issue_title = !req.body.issue_title ? issue.issue_title : req.body.issue_title;
    issue.issue_text = !req.body.issue_text ? issue.issue_text : req.body.issue_title;
    issue.created_by = !req.body.created_by ? issue.created_by : req.body.created_by;
    issue.assigned_to = !req.body.created_by ? issue.assigned_to : req.body.assigned_to;
    issue.status_text = !req.body.status_text ? issue.status_text : req.body.status_text;
    issue.open = req.body.closed === 'closed' ? false : true;
    issue.updated_on = Date.now();
    issue.save();
    res.send("successfully updated " + req.body.id);
  })
}

exports.deleteIssue = (req,res) => {
  issue.deleteOne({_id : req.body.id}, (err) =>{
    if(err) res.send("could not delete " + req.body.id);
    res.send("deleted" + req.body.id);
  })
}


exports.getIssue = (req,res) => {
  //res.send("testing");
  issue.find({"project" : req.params.project}, (err,project) => {
    if(err || project.length == 0) res.send("Project " + req.params.project + " could not be found.");
    //console.log(req.query);
    if(Object.keys(req.query).length === 0) {
      const output = project.map(issue => ({
        "_id" : issue._id,
        "issue_title" : issue.issue_title,
        "issue_text" : issue.issue_text,
        "created_by" : issue.created_by,
        "assigned_to" : issue.assigned_to,
        "status_text" : issue.status_text,
        "created_on" : issue.created_on.toISOString(),
        "updated_on" : issue.updated_on.toISOString(),
        "open" : issue.open,
      }));
      res.send(output);
    }
    else{
      let query = {project : req.params.project};
      for(let i in req.query) query[i] = req.query[i];
      issue.find(query, (err,issues) => {
        if(err || issues.length == 0) return res.send("No issues found for " + req.params.project);
        const output = issues.map(issue => ({
          "_id" : issue._id,
          "issue_title" : issue.issue_title,
          "issue_text" : issue.issue_text,
          "created_by" : issue.created_by,
          "assigned_to" : issue.assigned_to,
          "status_text" : issue.status_text,
          "created_on" : issue.created_on.toISOString(),
          "updated_on" : issue.updated_on.toISOString(),
          "open" : issue.open,
        }));
        return res.send(output);
      })
    }
  })
}

