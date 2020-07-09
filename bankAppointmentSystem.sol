// Copyright (c) Manav Aggarwal
// All Rights Reserved

//Swarm: bzz-raw://149324c9564d57a8cd4ba7ba398c519aa3062bc4b8fcfaa1ac1d096271e1a893

pragma solidity >=0.4.21 <0.7.0;

contract Bank {

    struct Appointment {
        uint bankId;
        string branch;
        string timeSlot;
        string visitorName;
        bool isBooked;
    }
    
    struct Document {
        string signature;
        bool exists;
    }
    
    address[] public addressIndices;
    mapping(address => Appointment) public appointments;
    mapping(address => Document) public documentSigs;

    
    // Returns the number of people already waiting for given bank Id, branch, and time slot
    function viewWaitingTimes(uint _bankId, string memory _branch, string memory _timeSlot) public view returns (uint) {
        uint waitingTime = 0;
        for(uint i = 0; i < addressIndices.length; i++) {
            address currAddress = addressIndices[i];
            uint currBankId = appointments[currAddress].bankId;
            string memory currBranch = appointments[currAddress].branch;
            string memory currTimeSlot = appointments[currAddress].timeSlot;
            if (currBankId == _bankId && keccak256(bytes(currBranch)) == keccak256(bytes(_branch)) && keccak256(bytes(currTimeSlot)) == keccak256(bytes(_timeSlot))) {
                waitingTime++;
            }
        }
        return waitingTime;
    }
    
     //Creates an appointment for the given visitor and bank with the given branch and time slot.
    function createAppointment(string memory _visitorName, uint _bankId, string memory _branch, string memory _timeSlot) public {
        address visitorAddress = msg.sender;
        require(appointments[visitorAddress].isBooked != true, "The visitor already has appointment");
        require(bytes(_visitorName).length > 0, "Visitor's name is required!");
        require(_bankId > 0, "Please input the correct _bankId");
        appointments[visitorAddress].bankId = _bankId;
        appointments[visitorAddress].branch = _branch;
        appointments[visitorAddress].timeSlot = _timeSlot;
        appointments[visitorAddress].visitorName = _visitorName;
        appointments[visitorAddress].isBooked = true;
        addressIndices.push(visitorAddress);
    }
    
    //Cancels appointment for sender
    function cancelAppointment() public {
        address visitorAddress = msg.sender;
        Appointment memory item = appointments[visitorAddress];
        require(item.isBooked==true, "The vistor does not have appointment");
        for(uint i = 0; i < addressIndices.length; i++){
            if(addressIndices[i] == visitorAddress){
                addressIndices[i] = addressIndices[addressIndices.length - 1];
                delete addressIndices[addressIndices.length - 1];
                break;
            }
        }
        delete appointments[visitorAddress];
    }
    
    //Returns bankId, branch, timeSlot if exists for sender. 0, "", "" otherwise.
    function checkAppointment() public view returns (uint, string memory, string memory) {
        address visitorAddress = msg.sender;
        if (appointments[visitorAddress].isBooked) {
            return (appointments[visitorAddress].bankId, appointments[visitorAddress].branch, appointments[visitorAddress].timeSlot);
        } else {
            return (0, "", "");
        }
    }
    
    //Puts a signature associated to the sender
    function putSignature(string memory signature) public {
        address visitorAddress = msg.sender;
        require( documentSigs[visitorAddress].exists != true, "Document already exists!");
        documentSigs[visitorAddress].signature = signature;
        documentSigs[visitorAddress].exists = true;
    }
    
    //Returns signature of stored document of the sender
    function getSignature() public view returns (string memory) {
        address visitorAddress = msg.sender;
        require(documentSigs[visitorAddress].exists == true, "Document does not exist!");
        return documentSigs[visitorAddress].signature;
    }
    
    //Returns true if document exists for sender. false, otherwise
    function checkDocument() public view returns (bool) {
        address visitorAddress = msg.sender;
        return documentSigs[visitorAddress].exists;
    }
    
    //Recovers an address from given parameters
    function verifyHash(bytes32 h, uint8 v, bytes32 r, bytes32 s) public pure returns (address) {
        address addr = ecrecover(h, v, r, s);
        return addr;
    }
}