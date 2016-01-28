Sherlock Wallet
===============

A wallet for the Bitcoin connoisseur.

Try it out: [https://sherlock.eordano.com](https://sherlock.eordano.com)

![screenshot](https://cloud.githubusercontent.com/assets/42750/12640805/c87b7cb4-c560-11e5-950c-855813c0b834.png)

## Motivation

This wallet is expected to be a swiss army knife for the bitcoin developer. Often, I need a wallet to debug a transaction, receive some small coins, test a transaction on testnet, evaluate a script, craft a transaction from a set of UTXOs, and I wanted to have a nice interface for it.

This app is a work in progress, and it relies heavily on the [bitcore library](https://github.com/bitpay/bitcore-lib) and [BlockCypher](http://www.blockcypher.com)'s API.

## Getting Started

Just clone the repo and install the necessary node modules:

```shell
$ git clone https://github.com/eordano/sherlock.git
$ cd sherlock
$ npm install       # may take a while...
$ npm start         # compile and launch
```

Then, browse to [http://localhost:3000/](http://localhost:3000/)

## Wishlist

Features I'll eventually code into this:

* Testnet support

* BIP32 (hierarchical deterministic keys) support
  Handling of private and public keys derived from a root hd key.

* Local storage of state
  Save the private keys in local storage (maybe encrypted) and retrieve them on initialization.

* Multisig address management

* Address management
  An easier way to handle addresses, multisigs, utxos associated with each address.

* Script evaluation
  Evaluate a script and debug the stack on each step of the execution.

* Transaction decoder
  A way to visualize a transaction easily and with all the data available.

* Blockchain explorer
  Explore blocks, fetch merkle proofs, navigate through transactions, blocks, addresses.

## Hacking

The folder structure should make it easy to understand where everything sits.

Some annotations on where stuff lives, to get started:

```
src
├── app                  # Contains most of the boilerplate code for the app
│   ├── routes
│   │   └── index.js     # Add here routes to new things
│   ├── styles
│   │   └── core.scss    # Custom css
│   └── views
│       └── sidebar.js   # Add more items to the sidebar here
├── blockchain
│   └── ...              # Blockchain related code (mostly BlockCypher interactions)
├── dashboard
├── index.html
├── keys                 # Key management section
├── main.js
├── redux
│   ├── definer.js       # Useful to trash action definition boilerplate
│   └── rootReducer.js   # Import and add new reducers here
├── txcreator            # Craft Transaction code
└── utxos                # Management of UTXOs handled by the wallet
```

## Acknowledgments

This project started as a way to test out the redux framework, and it is a fork of the [react-redux-starter-kit](https://github.com/davezuko/react-redux-starter-kit) by [davezuko](https://github.com/davezuko/react-redux-starter-kit).

For all things bitcoin, it uses the [bitcore library](https://github.com/bitpay/bitcore-lib) by BitPay, Inc.

## License

Licensed under the [MIT License](https://opensource.org/licenses/MIT)

## Copyright

© 2016 by Esteban Ordano <eordano@gmail.com>
