// ALLOW NEW OBJECT, NEW WINNER TAKES IT ALL = OVERWRITE OLD OBJECT
function parseDBrequestUpdateUniqueOne(request,response,dbName,keyName) {

    if (request.object.existed() ) {
        response.success(); //if it is and update, allow all
    }

    if (!request.object.get(keyName)) {
        response.error("Table: "+dbName+" must have key "+keyName+".");
    } else {
        var query = new Parse.Query(dbName);
        var keyVal = request.object.get(keyName);
        query.equalTo(keyName, keyVal);
        query.first({
            success: function(object) {
                if (object) {
                    //update
                    object.destroy();   //delete old object - we will replace it with a new one
                    response.success();
                } else {
                    response.success();
                }
            },
            error: function(error) {
                response.error("UNIQUE OCL: Could not validate uniqueness for this "+dbName+" object.");
            }
        });
    }
}

Parse.Cloud.beforeSave("Day", function(request, response) {
    parseDBrequestUpdateUniqueOne(request,response,"Day","date");
});

Parse.Cloud.define("hello", function(request, response) {
  response.success("Hello world!");
});
