var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var sprintGlobalSchema = new Schema({
    velocity_graph_url: String,
    sprints_performance_comparison_graph: String,
    teamPerformance_graph_url: String
},{collection: "SprintGlobal"});

var SprintGlobal = mongoose.model('SprintGlobal', sprintGlobalSchema);
 module.exports = SprintGlobal;