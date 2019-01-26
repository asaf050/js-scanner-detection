import { assert } from 'chai';
import ScannerDetection from '../index';
console.log(typeof ScannerDetection)
describe('Awesome test.', () => {
  it('should be function', () => {
    assert(typeof ScannerDetection === 'function', 'Not a function');
  });
  it('should have 100ms timeBeforeScanTest', () => {
    let scannerDetection =  new ScannerDetection({});
    assert(scannerDetection.options.timeBeforeScanTest === 100, 'Not good parameter');
  });
  it('should have 15ms avgTimeByChar', () => {
    let scannerDetection =  new ScannerDetection({avgTimeByChar:15});
    assert(scannerDetection.options.avgTimeByChar === 15, 'Not good parameter');
  });
});
