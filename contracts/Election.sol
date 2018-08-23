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
}