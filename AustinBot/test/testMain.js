var chai = require("chai");
var expect = chai.expect;
var nock = require("nock");

var main = require("../main.js");
//Load mock data
var data = require("../mockData.json");

describe("testMain", function()
{
    //Mock service
    var mockService = nock("https://api.austinbot.com")
    .persist() // This will persist mock interception for lifetime of program.
    .get("/sprint")
    .reply(200, JSON.stringify(data.sprint) );

    //find the number of sprints
    describe('#findNumberOfSprints()', function(){
        // TEST CASE
        it('should be equal to 2', function(done) {
    
            main.findNumberOfSprints().then(function (results) 
            {   var sp_size = results.sprint_count;
                expect(sp_size).to.equal(2);
                
                // Call back to let mocha know that test case is done. Need this for asychronous operations.
                done();
            });
        });
    });
});