var Election= artifacts.require("./Election.sol");

contract("Election",function(accounts){
    var electionInstance;
    //contract initialized with the correct number of candidates

    it("Candidates initialized with the value of 2",function(){
        return Election.deployed().then(function(instance){
            return instance.candidatesCount();
        }).then (function(count){
        assert.equal(count,2);
    });
    
    });


it("Check if the initialized candidate information are correct",function(){
    return Election.deployed().then(function(instance){
        electionInstance=instance;
        return electionInstance.candidates(1);
    }).then(function(candidate){
    assert.equal(candidate[0],1, "Correct candidate ID");
    assert.equal(candidate[1],"Candidate 1","correct candidate name");
    assert.equal(candidate[2],0, "Correct candidate vote count");
    return electionInstance.candidates(2);
    }).then(function(candidate){
    assert.equal(candidate[0],2,"Correct candidate ID");
    assert.equal(candidate[1],"Candidate 2","correct candidate name");
    assert.equal(candidate[2],0,"correct candidate vote count");
    });

    });

    it("Allows a voters vote to be counted", function(){
        return Election.deployed().then(function(instance){
            electionInstance=instance;
            candidateId=1;
            return electionInstance.vote(candidateId, {from: accounts[0]});
        }).then(function(receipt){
            assert.equal(receipt.logs.length,1,"an event was triggered");
            assert.equal(receipt.logs[0].event,"votedEvent","the event type is correct");
            assert.equal(receipt.logs[0].args._candidateId.toNumber(),candidateId,"the candidate Id is correct");
            return electionInstance.voters(accounts[0]);
        }).then(function(voted){
            assert(voted, "the voter was marked as voted");
            return electionInstance.candidates(candidateId);
        }).then(function(candidate){
            var voteCount=candidate[2];
            assert.equal(voteCount,1, "vote count incremented");
        })
        
    });

    it ("throws an exception for invalid candidate", function(){ 
        return Election.deployed().then(function(instance){
            electionInstance=instance;
            return electionInstance.vote(99, {from: accounts[1]})
        }).then(assert.fail).catch(function(error){
            assert(error.message.indexOf('revert') >= 0, "error message must contain revert");
            return electionInstance.candidates(1);
        }).then(function(candidate1){
            var voteCount=candidate1[2];
            assert.equal(voteCount,1,"candidate one did not receive any votes");
            return electionInstance.candidates(2);
        }).then(function(candidate2){
            var voteCount=candidate2[2];
            assert.equal(voteCount,0,"Candidate two did not receive any votes");
        });
    });
    it("throws an exception for double voting",function(){
        return Election.deployed().then(function(instance){
            electionInstance=instance;
            candidateId=2;
            electionInstance.vote(candidateId,{ from: accounts[2]});
            return electionInstance.candidates(candidateId);
        }).then(function(candidate){
            var voteCount=candidate[2];
            assert.equal(voteCount,1,"accepts first vote");
            return electionInstance.vote(candidateId,{from:accounts[2]});
        }).then(assert.fail).catch(function(error){
            assert(error.message.indexOf('revert') >= 0, "error message must contain revert");
            return electionInstance.candidates(1);
        }).then(function(candidate1){
            var voteCount=candidate1[2];
            assert.equal(voteCount,1,"candidate one did not receive any votes");
            return electionInstance.candidates(2);
        }).then(function(candidate2){
            var voteCount=candidate2[2];
            assert.equal(voteCount,1,"Candidate two did not receive any votes");
        });
    });
});