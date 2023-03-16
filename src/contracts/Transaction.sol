pragma solidity ^0.8.0;
// SPDX-License-Identifier: Unlicensed

interface ERC20 {
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);

    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function transfer(address to, uint256 amount) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint256);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(
        address from,
        address to,
        uint256 amount
    ) external returns (bool);

    function name() external view returns (string memory);
    function symbol() external view returns (string memory);
    function decimals() external view returns (uint8);
}

contract PeerPalTransaction {
    address immutable seller;
    address immutable tokenAddress;
    uint immutable amount;
    address buyer;
    bool complete;

    event Deposit(address buyer, uint amount, uint timestamp);
    event Confirmation(uint amount, uint timestamp);
    event Cancellation(address buyer, uint amount, uint timestamp);

    constructor(address _tokenAddress, address _seller, uint _amount) {
        tokenAddress = _tokenAddress;
        seller = _seller;
        amount = _amount;
    }

    function currentStep() external view returns(uint) {
        if (buyer == address(0)) {
            return 0;
        } else if (!complete) {
            return 1;
        } else {
            return 2;
        }
    }

    function deposit() external {
        require(msg.sender != seller, "can't accept your own transaction");
        require(buyer == address(0), "the transaction amount was already deposited");

        buyer = msg.sender;
        ERC20(tokenAddress).transferFrom(msg.sender, address(this), amount);
        emit Deposit(buyer, amount, block.timestamp);
    }

    function confirm() external {
        require(!complete, "transaction already completed");
        require(msg.sender == buyer, "you're not a part of this transaction");

        ERC20(tokenAddress).transfer(seller, amount);
        complete = true;
        emit Confirmation(amount, block.timestamp);
    }

    function cancel() external {
        require(!complete, "transaction already completed");
        require(msg.sender == buyer, "you're not part of this transaction");

        ERC20(tokenAddress).transfer(buyer, amount);
        complete = true;
        emit Cancellation(buyer, amount, block.timestamp);
    }
}