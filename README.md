 <div align="center">
  <h2>Javascript Scanner Detection</h2>
  <blockquote>Library To Detect Keyboard Based Scanners For The Browser</blockquote>
  <img src="https://travis-ci.org/asaf050/js-scanner-detection.svg?branch=master" />
</div>

## 📦 Getting Started

```
npm i js-scanner-detection
```

## 💎 Example Usage

```js
import 'ScannerDetector' from 'ScannerDetector'
let onComplete = (barcode)=>{
  // Do stuff with the barcode
  console.log(barcode)
}
let options = {
  onComplete:onComplete
}
let scannerDetector = new ScannerDetector(options)
```

## ✅ Options

```js
{
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
```
