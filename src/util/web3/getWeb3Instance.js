import Web3 from 'web3'

export const WEB3_INITIALIZED = 'WEB3_INITIALIZED'

let getWeb3 = new Promise(function(resolve, reject) {
  console.log("this is being called")
  // Wait for loading completion to avoid race conditions with web3 injection timing.
  window.addEventListener('load', function(dispatch) {
    var results
    var web3

    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof web3 !== 'undefined') {
      // Use Mist/MetaMask's provider.
      web3 = new Web3(web3.currentProvider)

      results = {
        web3Instance: web3
      }

      console.log('Injected web3 detected.');


      resolve(results)

    } else {

      // Fallback to localhost if no web3 injection.

      var provider = new Web3.providers.HttpProvider('http://localhost:8545')

      web3 = new Web3(provider)

      results = {
        web3Instance: web3
      }

      console.log('No web3 instance injected, using Local web3.');

      resolve(results)
    }

    // TODO: Error checking.
  })
})

export default getWeb3
