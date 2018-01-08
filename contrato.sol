pragma solidity ^0.4.18;

contract MyContract {
    /* Constructor */
    string name;
    uint age;
    address owner;
    
    event modifico(string);
    
    modifier onlyOwner{
        require(msg.sender == owner);
        _;
    }
    function MyContract() public {
        owner = msg.sender;        
    }
    function setName(string _name) onlyOwner public{
        name = _name;
        modifico("Se cambio el nombre con exito");
        
    }
    function getName()public constant returns(string){
        return (name);
    }
}