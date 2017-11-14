export class Sprint
{
    sprintId: String;
    start_date: Date;
    end_date: Date;
    team_member: [{
        user_id: Number, 
        user_name: String,
        performance_chart_url: String
    }];
    stories: [{
        story_id: Number,
        story_name: String,
        story_hours: Number,
        task : [{
            task_id: Number,
            expected_hours: Number,
            user_id: Number,
            daily_progress:[{
                date: Date,
                work_done:Number
            }],
            status: String
        }]
    }];
    burndown_img_url: String;
    task_performance_img_url: String;
    best_performance_img_url: String;
    sprint_status_img_url:String;

}

