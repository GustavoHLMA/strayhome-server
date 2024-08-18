// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract BasicCampaign {
    struct Campaign {
        address payable owner;
        string name;
        uint256 target;
        uint256 amountCollected;
        bool goalReached;
    }

    Campaign[] public campaigns;

    function createCampaign(string memory _name, uint256 _target) public {
        campaigns.push(Campaign({
            owner: payable(msg.sender),
            name: _name,
            target: _target,
            amountCollected: 0,
            goalReached: false
        }));
    }

    function donateToCampaign(uint256 _campaignId) public payable {
        Campaign storage campaign = campaigns[_campaignId];
        require(msg.value > 0, "Donation must be greater than 0");

        campaign.amountCollected += msg.value;

        if (campaign.amountCollected >= campaign.target) {
            campaign.goalReached = true;
            campaign.owner.transfer(campaign.amountCollected); // Transferência de fundos
        }
    }
}
