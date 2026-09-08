(async()=>{
 engine=new BABYLON.NullEngine({renderWidth:1280,renderHeight:720,textureSize:512});canvas=$('stage');
 initPreview=()=>{};showPreview=()=>{};showDetail=()=>{};const realRefresh=refreshInv;refreshInv=()=>{};
 await loadLevel(1,null,1234567,null,true);
 const p=player,r=p.rig;p.yaw=0;p.vel.set(0,0,0);p.moveSpeedNow=0;p.rollT=-1;r.root.rotation.set(0,0,0);r.root.position.copyFrom(p.pos);r.anim.atkT=-1;
 const rootLocal=n=>BABYLON.Vector3.TransformCoordinates(n.getAbsolutePosition(),BABYLON.Matrix.Invert(r.root.getWorldMatrix()));
 updateRig(p,0);
 for(const side of ['L','R']){const foot=rootLocal(r.nodes['foot'+side]);assert(Math.abs(foot.y-(-.24+.116))<.004,'idle feet planted '+side);}
 let gripMax=0,gripKind='',jointError=0,poseCount=0;
 for(const kind of Object.keys(WEAPONS)){
  p.gear.weapon=makeItem('weapon',5,3,kind);p.gear.offhand=null;r.anim.atkT=-1;renderEquip(p);
  if(p.gear.weapon.def.shape==='bow')assert(r.hitNode.parent===r.nodes.handL,'bow held by left hand');
  for(const combo of[0,1,2])for(const phase of[0,1,2])for(let j=0;j<=10;j++){
   r.anim.combo=combo;r.anim.atkT=.1;r.anim.atkStyle=p.stats.style;r.anim.phase=phase;r.anim.phaseT=j/10;p.aimPitch=(j-5)/12;updateRig(p,0);poseCount++;
   for(const c of Object.values(r.chains)){
    for(const [a,b,length]of[[c.upper,c.lower,c.l1],[c.lower,c.end,c.l2]]){
     const got=BABYLON.Vector3.Distance(a.getAbsolutePosition(),b.getAbsolutePosition());jointError=Math.max(jointError,Math.abs(got-length));
     assert(Number.isFinite(got),'finite joint '+kind);
    }
   }
   if(p.gear.weapon.hands===2&&p.gear.weapon.def.shape!=='bow'&&r.weaponMeta.grip2){const target=BABYLON.Vector3.TransformCoordinates(V3(...r.weaponMeta.grip2),r.hitNode.getWorldMatrix()),err=BABYLON.Vector3.Distance(target,r.nodes.handL.getAbsolutePosition());if(err>gripMax){gripMax=err;gripKind=kind+' combo '+combo+' phase '+phase+' t '+j/10;}}
  }
 }
 console.log('POSES',poseCount,'joint length error',jointError.toFixed(6),'max support grip error',gripMax.toFixed(4),gripKind);
 assert(jointError<.00001,'bone lengths constant');assert(gripMax<.025,'support hand remains connected across all attack phases');
 p.gear.weapon=makeItem('weapon',3,2,'crossbow');renderEquip(p);r.anim.atkT=.1;r.anim.atkStyle='shoot';r.anim.phase=1;r.anim.phaseT=.52;
 p.aimPitch=.5;updateRig(p,0);const fwd=BABYLON.Vector3.TransformNormal(V3(0,0,-1),r.hitNode.getWorldMatrix()).normalize();assert(fwd.y<-.3,'crossbow follows downward aim');
 p.gear.weapon=makeItem('weapon',3,2,'longbow');renderEquip(p);assert(r.bowString,'animated string exists');p.gear.weapon=makeItem('weapon',3,2,'longsword');renderEquip(p);assert(!r.bowString,'switching weapon removes string');
 r.anim.atkT=-1;r.anim.death=-1;p.aimPitch=0;
 let minHead=100;
 for(let j=0;j<=100;j++){p.rollT=.55*j/100;updateRig(p,0);const h=r.nodes.headN;h.computeWorldMatrix(true);for(const v of [[0,.40,0],[0,.2,-.18],[0,0,0]]){const point=BABYLON.Vector3.TransformCoordinates(V3(...v),h.getWorldMatrix());minHead=Math.min(minHead,point.y);}}
 p.rollT=-1;updateRig(p,0);console.log('ROLL minimum head height',minHead.toFixed(3),'terrain',GROUND-.25);assert(minHead>=GROUND-.25-.025,'roll head stays above floor');
 let variants=0;
 for(const key of Object.keys(BESTIARY)){
  if(key==='hero'||key==='waymerchant')continue;
  const e=makeEntity(key,roomCenterWorld(startRoom)),rr=e.rig;
  for(const state of ['idle','walk','flee','attack','hurt','dead']){
   e.moveSpeedNow=state==='walk'?2:state==='flee'?4:0;e.state=state==='flee'?'fleeing':'idle';e.vel=V3(0,0,-e.moveSpeedNow);rr.anim.death=state==='dead'?.5:-1;rr.anim.hurt=state==='hurt'?.6:0;rr.anim.atkT=state==='attack'?.1:-1;rr.anim.atkStyle=e.spec.atk?.style||'bite';rr.anim.phase=state==='attack'?1:3;rr.anim.phaseT=.5;
   for(let j=0;j<5;j++){e.pos.z-=e.moveSpeedNow/60;updateRig(e,1/60);for(const n of [rr.root,...rr.root.getDescendants()]){n.computeWorldMatrix(true);assert(n.getWorldMatrix().m.every(Number.isFinite),key+' '+state+' finite transform');}}variants++;
  }
  killNode(rr.root);G.enemies=G.enemies.filter(x=>x!==e);
 }
 console.log('CREATURE states',variants);
 player.pos.copyFrom(vendor.pos.add(V3(0,0,-1.6)));G.paused=false;G.invOpen=false;interact();assert(modalType==='vendor'&&G.pickupNow,'merchant interaction and manual loot flag');assert(TRADE.active&&G.invOpen&&inventoryItems().length===vendor.stock.filter(r=>!r.sold).length,'merchant shared inventory opens');

 assert(vendor&&vendor.stock.length>=60,'vendor exists');assert(vendor.stock.every(s=>s.item.rarity>=2),'all stock rare or better');assert(!G.enemies.includes(vendor),'merchant not hostile');
 const stock0=JSON.stringify(vendorRecord());p.gold=0;assert(!buyVendorItem(0)&&!vendor.stock[0].sold,'insufficient gold cannot buy');p.gold=100000;const before=p.gold,price=vendor.stock[0].price;assert(buyVendorItem(0)&&p.gold===before-price,'purchase subtracts exact price');assert(!buyVendorItem(0),'sold item cannot be bought twice');
 p.potions=27;assert(buyVendorPotion()&&p.potions===28,'potions unlimited');
 switchTradeSide('player');const equipped=p.gear.weapon;p.bag=Array.from({length:1205},()=>makeItem('head',1,0));p.bag.push(equipped);const gold0=p.gold,count=p.bag.length;const vendSave=makeSave();assert(validSave(vendSave),'save accepts >1000 gear and >9 potions');$('inv').style.display='block';G.invOpen=true;bagFilter='all';bagPage=0;realRefresh();assert($('bag').children.filter(c=>c.className?.startsWith('cell')).length===49,'inventory renders at most 48 gear plus potion stack');bagPage=999;realRefresh();assert(bagPage===25&&$('bagNext').disabled,'last page clamps correctly');$('inv').style.display='none';G.invOpen=false;
 const idBefore=ITEM_ID;assert(validSave(vendSave)&&ITEM_ID===idBefore,'validation has no item id side effect');const bad=JSON.parse(JSON.stringify(vendSave));delete bad.vendor.stock[0].item.colors;assert(!validSave(bad),'malformed vendor rejected');
 assert(sellAllUnequipped()>0&&p.bag.length===1&&p.bag[0]===equipped&&p.gear.weapon===equipped&&p.potions===28,'bulk sale protects equipment and potions');assert(p.gold>gold0,'bulk sale pays');assert(sellAllUnequipped()===0,'repeated bulk sale does not duplicate gold');
 const saved=makeSave(),savedStock=JSON.stringify(saved.vendor);await restoreSave(saved);assert(JSON.stringify(vendorRecord())===savedStock,'vendor purchase persists exactly');assert(player.potions===28,'potions survive restore');
 const legacy={...saved};delete legacy.vendor;assert(validSave(legacy),'old saves compatible');
 await loadLevel(2,playerCarry(),76543,null,true);assert(vendor&&vendorRecord().depth===2&&vendor.stock.every(s=>!s.sold),'next floor fresh stock');assert(JSON.stringify(vendorRecord())!==stock0,'random assortment changes');
 console.log('PASS: pose joints, weapon axes, all entity motion states, roll clearance, unlimited storage, safe bulk sale, vendor transactions, validation, stock persistence, legacy saves, new-floor merchant');engine.dispose();
})().catch(e=>{console.error(e.stack);process.exitCode=1;});
