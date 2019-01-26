import { defaults } from 'lodash'

class ScannerDetection {
  constructor (options) {
    if (!options) {
      options = {}
    }
    const defaultOptions = {
      onComplete: false, // Callback after detection of a successful scanning
      onError: false, // Callback after detection of a unsuccessful scanning
      onReceive: false, // Callback after receive a char
      timeBeforeScanTest: 100, // Wait duration (ms) after keypress event to check if scanning is finished
      avgTimeByChar: 30, // Average time (ms) between 2 chars. Used to do difference between keyboard typing and scanning
      minLength: 6, // Minimum length for a scanning
      endChar: [9, 13], // Chars to remove and means end of scanning
      stopPropagation: false, // Stop immediate propagation on keypress event
      preventDefault: false // Prevent default action on keypress event
    }
    this.options = defaults(options, defaultOptions)
    this.firstCharTime = 0
    this.lastCharTime = 0
    this.stringWriting = ''
    this.callIsScanner = false
    this.testTimer = false
    document.onkeydown = this.keypress.bind(this)
  }
  keypress (e) {
    if (this.options.stopPropagation) e.stopImmediatePropagation()
    if (this.options.preventDefault) e.preventDefault()

    if (this.firstCharTime && this.options.endChar.indexOf(e.which) !== -1) {
      e.preventDefault()
      e.stopImmediatePropagation()
      this.callIsScanner = true
    } else {
      this.stringWriting += String.fromCharCode(e.which)
      this.callIsScanner = false
    }

    if (!this.firstCharTime) {
      this.firstCharTime = e.timeStamp
    }
    this.lastCharTime = e.timeStamp

    if (this.testTimer) clearTimeout(this.testTimer)
    if (this.callIsScanner) {
      this.scannerDetectionTest()
      this.testTimer = false
    } else {
      this.testTimer = setTimeout(() => {
        this.scannerDetectionTest()
      }, this.options.timeBeforeScanTest)
    }

    if (this.options.onReceive) this.options.onReceive.call(this, e)
    this.trigger('scannerDetectionReceive', { evt: e })
  }
  trigger (options) {}
  scannerDetectionTest (s) {
    // If string is given, test it
    if (s) {
      this.firstCharTime = this.lastCharTime = 0
      this.stringWriting = s
    }
    // If all condition are good (length, time...), call the callback and re-initialize the plugin for next scanning
    // Else, just re-initialize
    if (
      this.stringWriting.length >= this.options.minLength &&
      this.lastCharTime - this.firstCharTime <
        this.stringWriting.length * this.options.avgTimeByChar
    ) {
      if (this.options.onComplete) {
        this.options.onComplete.call(this, this.stringWriting)
      }
      this.initScannerDetection()
      return true
    } else {
      if (this.options.onError) {
        this.options.onError.call(this, this.stringWriting)
      }
      this.initScannerDetection()
      return false
    }
  }
  initScannerDetection () {
    this.firstCharTime = 0
    this.stringWriting = ''
  }
}

export default ScannerDetection
