pragma solidity ^0.8.0;
// SPDX-License-Identifier: Unlicensed

import "Transaction.sol";

contract PeerPalFactory {
    // GNOSIS Chiado
    address tokenAddress = 0xb106ed7587365a16b6691a3D4B2A734f4E8268a2;

    function createTransaction(uint amount) external {
        new PeerPalTransaction(tokenAddress, msg.sender, amount);
    }
}