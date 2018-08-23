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
});