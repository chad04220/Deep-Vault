const {c,vm}=require('./harness.cjs');
const tests=`
(async()=>{
 engine=new BABYLON.NullEngine({renderWidth:1280,renderHeight:720,textureSize:512,deterministicLockstep:true,lockstepMaxSteps:4});canvas=$('stage');
 // Actual Babylon geometry, transforms, materials and simulation; no browser rendering.
 initPreview=()=>{}; showPreview=()=>{};showDetail=()=>{};refreshInv=()=>{};
 await loadLevel(1,null,1234567,null,true);
 assert(scene&&player&&rooms.length>4,'level created');assert(!loadingLevel&&G.running,'game starts');
 console.log('LEVEL',rooms.length,'rooms',G.enemies.length,'entities',G.crates.length,'chests',scene.meshes.length,'meshes');
 assert(world.chunks.every(m=>m.getTotalVertices()>0),'terrain geometry');
 assert(G.enemies.every(e=>Number.isFinite(e.pos.x)&&e.rig.parts.length>0),'creature geometry');
 assert(G.enemies.some(e=>e.passive),'peaceful wildlife');assert(G.bossRef?.spec.boss,'biome guardian');
 const index0=G.enemies[0].eid;const extra=makeEntity('skeleton',roomCenterWorld(startRoom));assert(extra.eid!==index0,'unique IDs');
 for(const [k,w]of Object.entries(WEAPONS)){const it=makeItem('weapon',4,3,k);const model=itemProto(it,scene);assert(model.getTotalVertices()>0,'weapon model '+k);assert(Number.isFinite(it.score),'weapon stats '+k);}
 for(const k of Object.keys(BESTIARY)){if(k==='hero')continue;const r=makeRig(k,scene);assert(r.parts.length>0,k+' rig');killNode(r.root);}
 console.log('CATALOG',Object.keys(WEAPONS).length,'weapons',Object.keys(BESTIARY).length-1,'creatures');
 SEED=321;let regular=0;for(let i=0;i<10000;i++)regular+=rollRarity(0);SEED=321;let lucky=0;for(let i=0;i<10000;i++)lucky+=rollRarity(24);assert(lucky>regular,'luck improves rarity');
 const a=makeItem('weapon',4,2,'greatsword');player.gear.weapon=a;player.gear.offhand=null;player.bag=[makeItem('offhand',6,3)];autoEquip();assert(player.gear.weapon,'auto-equip preserves weapon');assert(!(player.gear.weapon.hands===2&&player.gear.offhand),'two-hand constraint');
 player.bag=Array.from({length:60},()=>makeItem('head',1,0));spawnDrop(makeItem('head',2,1),player.pos);const dropCount=G.drops.length;updateDrops(.016);assert(G.drops.length===dropCount-1&&player.bag.length===61,'uncapped inventory pickup');
 player.potions=9;spawnDrop(null,player.pos,true);const potCount=G.drops.length;updateDrops(.016);assert(G.drops.length===potCount-1&&player.potions===10,'uncapped potion pickup');
 const p0=player.pos.clone();keys.w=true;for(let i=0;i<60;i++){G.time+=1/60;updatePlayer(1/60);resolveCollisions();}keys.w=false;assert(BABYLON.Vector3.Distance(p0,player.pos)>.2,'player moves');assert(clearPoint(player.pos.x,player.pos.z,player.radius),'movement stays inside dungeon');
 player.pos.copyFrom(roomCenterWorld(startRoom));computeStats(player);player.gold=150;RUN.shards=7;RUN.perks.force=2;const s=makeSave();assert(validSave(s),'valid save');assert(JSON.parse(JSON.stringify(s)).player.gear.weapon.kind===player.gear.weapon.kind,'serializable equipment');saveGame(true);assert(readSave().player.gold===150,'storage saved');
 const hp=player.hp,seed=G.levelSeed,layout=world.props.map(m=>[m.name,m.position.asArray(),m.rotation.asArray()]);await restoreSave(s);assert(G.running&&!loadingLevel,'restore completes');assert(player.gold===150&&RUN.shards===7,'currency preserved');assert(RUN.perks.force===2,'perks preserved');assert(G.levelSeed===seed,'seed preserved');assert(JSON.stringify(layout)===JSON.stringify(world.props.map(m=>[m.name,m.position.asArray(),m.rotation.asArray()])),'environment deterministic');assert(Math.abs(player.hp-hp)<.01,'health preserved');
 const cr=G.crates[0];player.pos.copyFrom(cr.pos);player.pos.x+=1.3;interact();assert(cr.open,'chest opens');updateCrates(.5);assert(cr.lid.rotation.x>0,'lid animates');
 const saveBefore=localStorage.getItem('deepvault.save.v2');G.saveEligible=false;assert(!saveGame(true),'title preview cannot save');assert(localStorage.getItem('deepvault.save.v2')===saveBefore,'existing save protected');G.saveEligible=true;
 const cash=player.gold;await loadLevel(2,playerCarry(),45678,null,true);assert(G.running&&!loadingLevel,'second floor starts');assert(G.depth===2&&player.gold===cash,'descent preserves money');assert(G.bossRef.key==='forgewarden','region guardian changes');
 player.pos.copyFrom(roomCenterWorld(startRoom));for(const p of destructibles.values())if(BABYLON.Vector3.Distance(p.pos,player.pos)<6)removeProp(p,true);indexBlockers();propIndex();const foe=makeEntity('skeleton',player.pos.add(new BABYLON.Vector3(0,0,-3.5)));foe.hp=500;foe.maxhp=500;rebuildBuckets();const from=player.pos.add(new BABYLON.Vector3(0,1,0)),to=foe.pos.add(new BABYLON.Vector3(0,.9,0));fireProjectile(from,to.subtract(from).normalize(),{speed:30,dmg:40,fromPlayer:true,color:'#8cdeff',element:'frost'});for(let i=0;i<30;i++)updateFX(1/60);assert(foe.hp<500,'player projectile hits enemy');assert(foe.status.chill>0,'frost effect applied');
 const beforeBossSpeed=G.bossRef.speed;G.bossRef.enraged=1;G.bossRef.status.chill=2;for(let i=0;i<20;i++)updateEnemy(G.bossRef,1/60);assert(Math.abs(G.bossRef.speed-beforeBossSpeed)<.0001,'boss chill does not compound');
 RUN.perks.vigor=3;computeStats(player);player.hp=player.maxhp;const vigorHp=player.hp;computeStats(player);assert(player.hp===vigorHp,'vigor health retained');
 const nonowned=makeItem('head',3,2);assert(equipItem(nonowned)===false,'sold/nonowned equipment rejected');
 const enemy=G.enemies.find(e=>!e.passive&&!e.boss&&!e.dead);enemy.aggro=.1;enemy.lastSeen=enemy.pos.clone();enemy.spec={...enemy.spec,sight:0};updateEnemy(enemy,.2);assert(enemy.aggro===0,'enemy memory expires');
 const t0=performance.now();for(let k=0;k<60;k++){G.time+=1/60;rebuildBuckets();updatePlayer(1/60);for(const e of G.enemies)updateEnemy(e,1/60);resolveCollisions();updateFX(1/60);}console.log('SIMULATION',Math.round(performance.now()-t0)+'ms / 60 steps');
 player.pos.copyFrom(roomCenterWorld(startRoom));player.hp=player.maxhp;player.stam=player.maxstam;player.rig.anim.atkT=-1;player.atkCd=0;player.rollT=-1;player.yaw=0;mouse.yaw=Math.PI;mouse.pitch=0;const sword=makeItem('weapon',4,1,'longsword');player.bag.push(sword);equipItem(sword);const meleeFoe=makeEntity('skeleton',player.pos.add(new BABYLON.Vector3(0,0,-1.15)));meleeFoe.hp=2000;meleeFoe.maxhp=2000;mouse.down=1;mouse.right=0;for(let k=0;k<100;k++){G.time+=1/60;updatePlayer(1/60);scene.render();}mouse.down=0;assert(meleeFoe.hp<2000,'animated swept melee lands');console.log('MELEE',Math.round(2000-meleeFoe.hp),'damage');
 for(const m of scene.meshes){if(m.getTotalVertices()){const p=m.getVerticesData(BABYLON.VertexBuffer.PositionKind);assert(p.every(Number.isFinite),'finite model '+m.name);}}
 console.log('PASS: generation, all model catalogs, rarity, equipment, unlimited inventory, potion stacking, movement, save/load, chest animation, descent, finite geometry');
 console.log('PASS: projectile damage, frost status, boss slow, vigor health, equipment ownership, finite aggro, save-preview protection, deterministic environment');engine.dispose();
})().catch(e=>{console.error(e.stack);process.exitCode=1;});`;
vm.runInContext(tests,c);
