var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var sprintSchema = new Schema({
    sprintId: String,
    start_date: String,
    end_date: String,
    team_member: [{
        user_id: String, 
        user_name: String,
        performance_chart_url: String
    }],
    stories: [{
        story_id: String,
        story_name: String,
        story_hours: Number,
        task : [{
            task_id: String,
            expected_hours: Number,
            user_id: String,
            daily_progress:[{
                date: String,
                work_done:Number
            }],
            status: String
        }]
    }],
    burndown_img_url: String,
    task_performance_img_url: String,
    best_performance_img_url: String,
    sprint_status_img_url:String
},{collection: "SprintData"});

var Sprint = mongoose.model('SprintData', sprintSchema);
 module.exports = Sprint;
