var express = require('express');       // imports the express library
var router = express.Router();          // Router object for routes

var friendModel = require('./models/friends-01');


//******************* */
router.put('/friends', function FriendsUpdateHandler(request,response) {
    friendModel.update( 
        request.body.id,
        request.body.birthDate,
        request.body.firstName,
        request.body.lastName,
        request.body.gender,
        request.body.phone, 
        function DoneUpdating(err, updateId){
            if (err){
                console.log("Some error updating");
                console.log(err);
                response.write("Error updating");
            }else{
                response.json({ updatedId: updateId });
            }
        } );
});

router.delete('/friends', function FriendsDeleteHandler(request, response) {
    friendModel.delete(request.params.id, function DoneGettingById(err, result, fields){
        if (err){
            console.log("Some error deleting");
            console.log(err);
            response.write("Error deleting");
        }else {
            console.log("Success deleting");
            console.log(err);
            response.write("Success deleting");
        }
    });
});
//******************** */

router.post('/friends', function FriendsPostHandler(request, response){
        friendModel.insert( 
            request.body.birthDate,
            request.body.firstName,
            request.body.lastName,
            request.body.gender,
            request.body.phone, 
            function DoneInserting(err, resultId){
                if (err){
                    console.log("Some error inserting");
                    console.log(err);
                    response.write("Error Inserting");
                }else{
                    response.json({ insertedId: resultId });
                }
            } );
});

router.get('/friends', function FriendsGetHandler(request, response){
    friendModel.getAll(function DoneGettingAll(err, result, fields){
        if (err) {
            console.log("Some error selecting all");
            console.log(err);
            response.write("Error Getting All");
        } else {
            console.log("Successfully retrieve all records (100)");
            response.json(result);
        }
    });
});

router.get('/:id', function FriendsGetByIdHandler(request, response){
    friendModel.findById(request.params.id, function DoneGettingById(err, result, fields){
        if (err){
            console.log("Some error finding by id");
            console.log(err);
            response.write("Error finding by id");
        }else {
            response.json(result);
        }
    });
});

router.get('/friends/:name', function FriendsGetByNameHandler(request, response){
    friendModel.findByName(request.params.name, function DoneGettingByName(err, result, fields){
        if (err){
            console.log("Some error finding by name");
            console.log(err);
            response.write("Error finding by name");
		} else {
			response.json(result);
		}
    });
});

module.exports = router;