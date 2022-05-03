//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract ContactFactory {
    mapping(address => address) public ownerToContact;

    modifier OnlyNewRecord() {
        require(
            ownerToContact[msg.sender] == address(0),
            "You alredy leave your contact"
        );
        _;
    }

    function createContact(string memory _github, string memory _discord)
        public
        OnlyNewRecord
    {
        Contact contact = new Contact(msg.sender, _github, _discord);
        ownerToContact[msg.sender] = address(contact);
    }

    function createContact(string memory _github) public OnlyNewRecord {
        Contact contact = new Contact(msg.sender, _github, "");
        ownerToContact[msg.sender] = address(contact);
    }
}

contract Contact {
    string public github;
    string public discord;
    address public owner;

    constructor(
        address _owner,
        string memory _github,
        string memory _discord
    ) {
        owner = _owner;
        github = _github;
        discord = _discord;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "You are not the owner");
        _;
    }

    function setDiscord(string memory _discord) public onlyOwner {
        discord = _discord;
    }

    function setGithub(string memory _github) public onlyOwner {
        github = _github;
    }
}
