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

# Range Orders

{% hint style="info" %}
The content below is based on the Uniswap V3 Range Orders Concept page located [here](https://docs.uniswap.org/concepts/protocol/range-orders).
{% endhint %}

Customizable liquidity positions, along with single-sided asset provisioning, allow for a new style of swapping with automated market makers: the range order.

In typical order book markets, anyone can easily set a limit order: to buy or sell an asset at a specific predetermined price, allowing the order to be filled at an indeterminate time in the future.

With Uniswap V3, one can approximate a limit order by providing a single asset as liquidity within a specific range. Like traditional limit orders, range orders may be set with the expectation they will execute at some point in the future, with the target asset available for withdrawal after the spot price has crossed the full range of the order.

Unlike some markets where limit orders may incur fees, the range order maker generates fees while the order is filled. This is due to the range order technically being a form of liquidity provisioning rather than a typical swap.

## Possibilities of Range orders[​](https://docs.uniswap.org/concepts/protocol/range-orders#possibilities-of-range-orders) <a href="#possibilities-of-range-orders" id="possibilities-of-range-orders"></a>

The nature of AMM design makes some styles of limit orders possible, while others cannot be replicated. The following are four examples of range orders and their traditional counterparts; the first two are possible, the second two are not.

> One important distinction: range orders, unlike traditional limit orders, will be **unfilled** if the spot price crosses the given range and then reverses to recross in the opposite direction before the target asset is withdrawn. While you will be earning LP fees during this time, if the goal is to exit fully in the desired destination asset, you will need to keep an eye on the order and either manually remove your liquidity when the order has been filled or use a third party position manager service to withdraw on your behalf.

### Take-Profit Order <a href="#take-profit-orders" id="take-profit-orders"></a>

[https://docs.uniswap.org/concepts/protocol/range-orders#take-profit-orders](https://docs.uniswap.org/concepts/protocol/range-orders#take-profit-orders)[​](https://docs.uniswap.org/concepts/protocol/range-orders#take-profit-orders)

***

### Buy Limit Orders[​](https://docs.uniswap.org/concepts/protocol/range-orders#buy-limit-orders) <a href="#buy-limit-orders" id="buy-limit-orders"></a>

[https://docs.uniswap.org/concepts/protocol/range-orders#buy-limit-orders](https://docs.uniswap.org/concepts/protocol/range-orders#buy-limit-orders)

***

### Buy Stop Orders[​](https://docs.uniswap.org/concepts/protocol/range-orders#buy-stop-orders) <a href="#buy-stop-orders" id="buy-stop-orders"></a>

[https://docs.uniswap.org/concepts/protocol/range-orders#buy-stop-orders](https://docs.uniswap.org/concepts/protocol/range-orders#buy-stop-orders)

***

### Stop-Loss Orders[​](https://docs.uniswap.org/concepts/protocol/range-orders#stop-loss-orders) <a href="#stop-loss-orders" id="stop-loss-orders"></a>

[https://docs.uniswap.org/concepts/protocol/range-orders#stop-loss-orders](https://docs.uniswap.org/concepts/protocol/range-orders#stop-loss-orders)

***

## Fees[​](https://docs.uniswap.org/concepts/protocol/range-orders#fees) <a href="#fees" id="fees"></a>

[https://docs.uniswap.org/concepts/protocol/range-orders#fees](https://docs.uniswap.org/concepts/protocol/range-orders#fees)
