pragma solidity ^0.8.0;
// SPDX-License-Identifier: Unlicensed

import "Transaction.sol";

contract PeerPalFactory {
    address tokenAddress = 0x0000000000000000000000000000000000000000;

    function createTransaction(uint amount) external {
        new PeerPalTransaction(tokenAddress, msg.sender, amount);
    }
}