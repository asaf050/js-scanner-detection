import ScannerDetection from './../lib'
class App {
  constructor() {
    let onComplete = function (s) {
      console.log('onComplete', s)
      console.log(this.focusedElement.tagName)
      document.getElementById('scannerInput').value = s
    }
    let onError = e => {
      console.log('onError', `Not a valid scanning`)
    }
    let onReceive = e => {
      console.log('onReceive', e)
    }
    this.scanner = new ScannerDetection({ onComplete, onError, onReceive })
  }
}

export default App
