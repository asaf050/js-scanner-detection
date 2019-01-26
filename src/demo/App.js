import ScannerDetection from './../lib'
class App {
  constructor () {
    let onComplete = function (s) {
      console.log(s)
      document.getElementById('scannerInput').value = s
    }
    let onError = e => {
      console.log(`Not a valid scanning`)
    }
    let onReceive = e => {
      console.log(e)
    }
    new ScannerDetection({ onComplete, onError, onReceive })
  }
}

export default App
