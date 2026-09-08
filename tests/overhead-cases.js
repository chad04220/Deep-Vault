(async () => {
  engine = new BABYLON.NullEngine({ renderWidth: 1280, renderHeight: 720, textureSize: 512 });
  canvas = $('stage');
  initPreview = () => {};
  showPreview = () => {};
  showDetail = () => {};
  refreshInv = () => {};
  await loadLevel(4, null, 8122, null, true);
  player.pos.set(64, GROUND, 64);
  player.yaw = 0;
  player.vel.set(0, 0, 0);
  player.moveSpeedNow = 0;
  player.rollT = -1;
  player.rig.root.rotation.set(0, 0, 0);
  player.rig.root.position.copyFrom(player.pos);

  let hitCases = 0;
  for (const key of ['longsword', 'greatsword', 'spear']) {
    player.gear.weapon = makeItem('weapon', 4, 3, key);
    player.gear.offhand = null;
    renderEquip(player);
    for (const yaw of [0, .8, 2.1]) for (const pitch of [-1.15, -1.42]) {
      player.yaw = yaw;
      player.rig.root.rotation.y = yaw;
      player.aimPitch = pitch;
      const offset = BABYLON.Vector3.TransformNormal(V3(0, 0, -.45), BABYLON.Matrix.RotationY(yaw));
      const target = makeEntity('bat', player.pos.add(offset));
      // Entity construction resets Y to its authored flight height.
      target.pos.y = 3.5;
      target.passive = false;
      target.rig.root.position.copyFrom(target.pos);
      for (let combo = 0; combo < 3; combo++) {
        const a = player.rig.anim;
        a.combo = combo;
        a.atkT = .1;
        a.atkStyle = player.stats.style;
        a.phase = 1;
        a.hitSet = new Set();
        a.prevPts = null;
        a.propHitSet = new Set();
        a.propPrev = null;
        let hits = 0;
        for (let j = 0; j <= 30; j++) {
          a.phaseT = j / 30;
          updateRig(player, 0);
          sweepHit(player, [target], () => hits++);
        }
        assert(hits === 1, key + ' overhead yaw ' + yaw + ' pitch ' + pitch + ' combo ' + combo + ' hits ' + hits);
        hitCases++;
      }
      killNode(target.rig.root);
      G.enemies = G.enemies.filter(q => q !== target);
    }
  }
  console.log('OVERHEAD passed', hitCases);

  let poses = 0, maxGrip = 0, jointError = 0, maxRangedAngle = 0;
  for (const kind of Object.keys(WEAPONS)) {
    const item = makeItem('weapon', 5, 3, kind);
    if (!['bow', 'crossbow'].includes(item.def.shape) && !['longsword', 'greatsword', 'spear'].includes(kind)) continue;
    player.gear.weapon = item;
    player.gear.offhand = null;
    renderEquip(player);
    const r = player.rig;
    for (const yaw of [0, .8, 2.1])
    for (const pitch of [-1.42, -1.15, -.4, 0, .4, .95])
    for (const combo of [0, 1, 2])
    for (const phase of [0, 1, 2])
    for (let j = 0; j <= 10; j++) {
      player.yaw = yaw;
      r.root.rotation.y = yaw;
      player.aimPitch = pitch;
      r.anim.combo = combo;
      r.anim.atkT = .1;
      r.anim.atkStyle = player.stats.style;
      r.anim.phase = phase;
      r.anim.phaseT = j / 10;
      updateRig(player, 0);
      r.hitNode.computeWorldMatrix(true);
      for (const limb of Object.values(r.chains)) {
        for (const [upper, lower, length] of [[limb.upper, limb.lower, limb.l1], [limb.lower, limb.end, limb.l2]]) {
          const error = Math.abs(BABYLON.Vector3.Distance(upper.getAbsolutePosition(), lower.getAbsolutePosition()) - length);
          assert(Number.isFinite(error));
          jointError = Math.max(jointError, error);
        }
      }
      if (item.hands === 2 && item.def.shape !== 'bow' && r.weaponMeta.grip2) {
        const target = BABYLON.Vector3.TransformCoordinates(V3(...r.weaponMeta.grip2), r.hitNode.getWorldMatrix());
        const error = BABYLON.Vector3.Distance(target, r.nodes.handL.getAbsolutePosition());
        maxGrip = Math.max(maxGrip, error);
        assert(error < .025, 'support hand ' + kind + ' ' + pitch + ' phase ' + phase + ' t ' + j / 10 + ' error ' + error);
      }
      if (['bow', 'crossbow'].includes(item.def.shape) && phase === 1 && j === 5) {
        const forward = BABYLON.Vector3.TransformNormal(V3(0, 0, -1), r.hitNode.getWorldMatrix()).normalize();
        const expected = BABYLON.Vector3.TransformNormal(V3(0, -Math.sin(pitch), -Math.cos(pitch)), r.root.getWorldMatrix()).normalize();
        const angle = Math.acos(clamp(BABYLON.Vector3.Dot(forward, expected), -1, 1));
        maxRangedAngle = Math.max(maxRangedAngle, angle);
        assert(angle < .0001, 'ranged axis ' + kind + ' ' + pitch + ' error ' + angle);
      }
      poses++;
    }
  }
  console.log('POSES passed', poses, 'jointError', jointError, 'supportGrip', maxGrip, 'rangedAngle', maxRangedAngle);
  engine.dispose();
})().catch(error => {
  console.error(error.stack);
  process.exitCode = 1;
});
