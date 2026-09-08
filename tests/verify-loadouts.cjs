const {c,vm,fs}=require('./harness.cjs');
vm.runInContext(fs.readFileSync(require('path').join(__dirname,'loadout-cases.js'),'utf8'),c);
