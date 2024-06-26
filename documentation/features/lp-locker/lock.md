---
layout:
  title:
    visible: true
  description:
    visible: false
  tableOfContents:
    visible: true
  outline:
    visible: true
  pagination:
    visible: true
---

# Lock

The user flow below describes how Proxyswap LPLocker contract is implemented.

1. User creates a new LP position through the Pools tab in the website. Refer [here](https://proxyswap-vocs.vercel.app/lock-contract) to learn how to create a new LP position.\

2. Once user has the LP Position created, he will go to the "Lock LP" page of the website\

3. He will click "New LP Lock"\

4. He will then be brought to a new section wherein he will:\

   * Choose which LP position he wants to lock (as he may have multiple)\

   * Enter duration - in terms of years, months, days, hours, minutes, seconds\

   * Clicks "Create Lock" button\

   * He then will confirm a transaction to create the LP lock contract instance via wallet extension\

   * Once transaction is approved and LP lock created, he then will need to confirm an "Approve" transaction that allows Proxyswap to "spend" his LP position NFT\

   * After approval transaction is successful, he then will need to confirm another "safeTransfer()" transaction to transfer the LP Position NFT into the lock contract.
