pragma solidity ^0.4.17;

contract Election {
    
    //add candidate info
    //vote count info
    //fetch candidate info
//model a candidate
    struct Candidate {
        uint id;
        string name;
        uint votecount;
    }
    //store accounts that have voted
    mapping (address => bool) public voters;
    //store the candidates
    mapping(uint => Candidate) public candidates;
    //store candidates count
    //use a counter cash to determine the number of candidates in the mapping
    uint public candidatesCount;

    
    function addCandidate (string _name) private {
        //increment candidate count
        candidatesCount ++;
        candidates[candidatesCount] = Candidate (candidatesCount,_name, 0);
    }
    function Election () public {
        addCandidate("Candidate 1");
        addCandidate("Candidate 2");    
    }
    function vote (uint _candidateId) public {
        //record that the voter has voted
        require(!voters[msg.sender ]);
        //require a valid candidate
        require(_candidateId > 0 && _candidateId <= candidatesCount);
        //voter votes only once
        voters[msg.sender] = true;
        //update candidate vote count
        candidates[_candidateId].votecount++;
    }
} 