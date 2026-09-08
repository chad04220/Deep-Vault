const {c,vm,fs}=require('./harness.cjs');
vm.runInContext(fs.readFileSync(require('path').join(__dirname,'technique-cases.js'),'utf8'),c);
