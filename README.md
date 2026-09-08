# Deepvault: The Hollow Crown

An expanded Babylon.js voxel action RPG inspired by the supplied Deepvault dungeon crawler.

## GitHub Pages

This repository contains Deepvault v9 · Tempest Arsenal. The complete game is in `dist/`, including Babylon.js and all procedural game systems. No dependency installation or build is needed.

The Pages workflow publishes `dist/` automatically after a push to `main`. In repository Settings → Pages, choose **GitHub Actions** as the source. If the first workflow ran before Pages was enabled, rerun **Publish Deepvault to GitHub Pages** from Actions.

Saves are local to each website origin. To bring an existing expedition from the previous hosted game or offline edition, use **Pause → Export save**, then **Pause → Import save** on GitHub Pages.

## Run

Open `dist/index.html` in a current desktop browser, or serve the `dist` directory with any static web server. The separately delivered single-file edition can be opened directly. Babylon.js is bundled; gameplay, artwork, particles, and sound require no network connection.

Every expedition uses one universal Wayfarer who can equip all weapons and armor. Start with a sword, shield, greatsword, and longbow, with three ready-to-switch builds.

## Contents

- Three procedural dungeon floors, followed by a dedicated abomination arena that unlocks the Shattered Wilds: an endless procedural world with twelve biomes, streamed terrain, escalating waves, regional camps, and abomination gates every tenth wave.
- 29 wildlife species, 57 regular enemy types, 12 elite profiles, and 18 bosses (including six abominations). Crowned hunters enter every third survival wave; abominations take precedence every tenth wave.
- 75 weapon types and 24 armor collections across six armor slots, with three/five-piece set bonuses, six rarities, material tiers, randomized affixes, and visible equipment.
- Combo melee, directional guard, stamina, dodge invulnerability, perfect guards, bows, crossbows, elemental staves, and a runic pulse.
- Detailed trees, bamboo, reeds, cacti, giant fungi, carts, urns, crates, ruins, mineral pools, upward-opening chests, warm/cold lighting, localized shadows, luminous flora, particles, projectile trails, and generated audio.
- Exploration objectives, gold, equipment tempering, elixir purchases, selling spare gear, shard-funded shrine improvements, and a field journal.
- Local autosave, manual saves, JSON save export/import, adjustable graphics/audio, touch controls, and standard gamepad input.

## Articulation and merchant update

- Reauthored character anatomy and all original weapon models at finer voxel resolution, including separate fingers, layered armor, articulated pauldrons, wrist cuffs, greaves, boots, rivets, blade edges, wrapped grips, and luminous ornament.
- Separate shoulder/elbow/wrist and hip/knee/ankle joints. Fixed-length two-link limbs, planted feet, mirrored hands, independent head/spine movement, and two-handed grip constraints.
- Three melee combo poses, overhead strikes, thrusts, heavy slams, shield guard/recoil, aimed bow draw/release, crossbow recoil, staff casting, stagger, collapse, and a blended full-body dodge roll.
- Species-specific idle/forage, trot/gallop, flee, bite/lunge, powered flight/gliding, jointed wing tips, alternating arachnid gait, blob squash/blink, hurt, and death movement. Merchant gestures blend between presentation poses.
- No inventory slot cap and no potion stack cap; 48 gear items per display page. **Sell spare gear** preserves equipped items, all health potions, locked items, and anything saved in shared equipment or a build.
- Sable appears in the arrival room of every floor, marked by a gold map diamond once his location is explored. Each floor offers 66–78 high-level Legendary/Mythic items across all weapon styles and armor slots, with repeatable health potion purchases. Stock, purchases, and prices persist in saves.

## Beyond the Crown update

- Chest lids pivot upward around the rear edge. Both wings and articulated wing tips flap together through a mirrored hierarchy, preserving front-to-back orientation at every heading.
- Weapon silhouettes include thrusting blades, curved swords, double axes, polearms, hammers, tridents, bows, crossbows, and elemental staves. Thrusting blades use thrust animations; the repeating crossbow fires a three-bolt burst. New armor families have different helmets, trim, segmented shapes, motifs, and bonuses. Auto-equip includes set bonuses in its score.
- Wildlife includes birds, foxes, deer, boars, reptiles, insects, crustaceans, and burrowing animals. Enemy variants add faction armor, fangs, horns, frills, shells, machinery, crystals, and fungal growth. Abominations have articulated secondary arms and heads that settle during death.
- Elite and boss mechanics include delayed lightning, fire fans, frost volleys, brood summons, bone wards, root circles, void blinks, quakes, healing, venom fields, and solar lines. Boss health thresholds accelerate attacks. Ground rings warn before impacts; stunned enemies cannot cast specials.
- Melee, projectiles, and runic pulse can cut foliage and break timber, pottery, bone, and suitable mineral formations. Destruction removes matching obstacles and produces physical debris. Ordinary containers commonly hold modest equipment, coins, or potions; a separate very rare roll can yield Legendary or Mythic equipment. Broken objects stay broken after saving and streaming.
- The Cinder Crucible's abomination guards the dungeon exit after the three-floor campaign. Outside, waves scale enemy counts and strength, mix biome rosters, introduce crowned hunters, and track all spawned and pending opponents before awarding completion. Every tenth wave requires an abomination kill before opening the next region. Regional gates move the refuge and its merchant, forge, and shrine.
- Outdoor terrain streams in 32-metre chunks: 25 nearby chunks on High/Ultra, nine on Performance. The ground now forms seeded hills, valleys, ridges and shallow glades, with vegetation, paths, mineral pools, ruins, colors and ecology varying by biome. Unloaded loot sleeps until the player returns, while active wave enemies continue pursuing.

## Armory and market update

- All held weapon instances rotate 45° clockwise around the grip when viewed from above. Ranged aim compensates at the wrist, and bow draw hands, string nocks, arrows, and release points share the same weapon frame. Shields retain their orientation.
- Sable uses the same equipment window as the player: stock/satchel tabs, Everything/Upgrades/Weapons/Shields/Armor/Elixirs categories, paginated item cells, a rotating 3D preview, and individual buying/selling. Equipped items and health potions are protected from sale. Bulk selling remains available in the player's satchel.
- Comparisons calculate the complete replacement loadout, including two-handed shield removal, shield absorption/stamina cost, and gained/lost set bonuses. Category and item focus survive redraws for keyboard/controller navigation. Trades and leaving the merchant save progress.
- Items now use deterministic level/rarity budgets. Weapon damage is normalized by attack rate, critical stats, and multi-bolt bursts. Armor families preserve their health/armor proportions at a shared reference protection budget. Affixes receive bounded budgets and percentage caps. At equal item level and tempering, rarity bands have strictly increasing rated power; higher item levels and build/set synergy can still outweigh rarity.
- Existing equipment is migrated without rerolling identities, appearance, affix types, or tempering. Repeated loads cannot compound upgrades. New and restored items share one balance revision.

## Cinder Crucible update

- The minimap starts dark. A nine-meter radius reveals terrain as you travel, with stone walls blocking discovery. Explored terrain and static landmarks remain known; enemies only appear within current nearby sight. Exploration is saved in compact 2 m cells and survives outdoor chunk unloading and regional travel.
- The campaign is three procedural dungeon floors, then one hand-built final arena. The Furnace That Walks must die before the passage to survival opens.
- A 43 m combat ring, molten lava moat, two stone causeways, outer refuge walkway, twelve buttresses, high arches, a 22–28 m vault, and a suspended luminous crown. Fitted basalt tiles, concentric metal inlays, animated lava, rising embers, blue motes, warm lava lights, and cool overhead light define the arena.
- The arena includes Sable, a forge, a shrine, supplies and four chests. Lava inflicts periodic environmental damage; shields cannot block it. Stone bridges are safe. Static architecture is batched by material.

## One Wayfarer, three builds

- The role selector is removed. The same character can use every melee weapon, bow, crossbow, staff, shield, and armor collection.
- Three inventory build tabs: one-handed melee, two-handed melee, and ranged. Press **1**, **2**, or **3** to select a build, or **V** / the HUD build button to cycle ready builds. Editing a different tab does not change the active build until you choose **Use this build**.
- Builds store only explicitly assigned item IDs. Switching changes populated slots; blank slots keep currently worn gear, even when that gear came from another build. Shared equipment lets you equip a piece without pinning it to a build. Two-handed weapons stow the shield without applying its stats, and the shield returns with a compatible weapon.
- Select owned gear to lock or unlock it. Locks persist, and every selling path—including forge sales—protects locked items and saved build equipment. Clear a saved slot before selling its item. Locked or saved items cannot be dropped accidentally either.
- Active weapon changes cancel the previous attack's pose, hit sweep and guard while retaining recovery time. Swaps preserve item ownership, health and stamina. Auto-equip optimizes the current weapon style and still considers armor set bonuses.
- The camera sits 1.05 m over the right shoulder. Its entire angled boom, smoothing and shake are checked against walls and tall obstacles. Projectiles still originate at the weapon and follow the actual camera aim ray.

## Relics & Reckoning update

- Projectile segments resolve the first exact environmental or creature impact. Both hostile and player shots destroy breakable objects and stop on impact; enemies behind destroyed cover are safe from that same shot. Voxel terrain, raised chest lids, merchant furniture and the handmade arena architecture remain solid. Arches retain their openings, transparent light shafts are ignored, and large rotated trees are indexed across their entire visible bounds.
- Shots travel from the actual weapon muzzle toward the camera reticle's first target or surface. Broad off-reticle target snapping is removed. A hand-to-muzzle obstruction check prevents firing from the far side of cover. Repeating crossbows retain their three-bolt spread.
- Upward aim extends to 81 degrees. Attack poses rotate both wrists and weapon axes together, with elbow and support-hand constraints retained. All three melee combo attacks can reach flying enemies overhead; elevated hit detection tests the flying body's actual height and checks three-dimensional cover.
- Abomination base hit damage is 90% higher. Damaging special abilities receive a further 80% multiplier, making them 242% stronger than before. Other enemy damage is unchanged. Old abominations and their active special hazards migrate once without compounding on reload.
- Sable stocks 36 varied weapons and at least five options in each armor slot. Every offer is Legendary or Mythic, with item levels above the floor/player/equipped baseline. On 70% of seeded assortments he offers one or two complete six-piece armor collections, inspectable in the shared inventory and purchasable together for 15% off. Individual purchases remain available. Stock, set contents, sold flags and exact prices persist; older saves receive the expanded stock while keeping purchased equipment and currency.

## Wilder Horizons update

- Survival now has continuous elevation across its streamed terrain. A global 1 m grid supplies matching render triangles, collision heights and normals across chunk boundaries. Player and creature movement, foot placement, scenery, chests, loot, camp stations, portals, camera clearance and legacy saves follow the same surface. Projectiles intersect each crossed terrain triangle exactly, including shallow grazing hits; hills and tall cover obstruct enemy sight. Mineral films and attack warning rings follow the surface.
- A relic traveler visits after every third cleared survival wave. Three named brokers walk in, unpack their display and leave when the next wave starts. These visits extend the intermission to 100 seconds; trading pauses the timer. Press **N** or use **Begin next wave** when ready. The visitor is a violet minimap diamond and has a distance notice. Sable remains independently available at camp with his original stock.
- Travelers bring 78 Mythic offers: 36 weapon choices, five alternatives per armor slot and two complete six-piece collections. Their item levels greatly exceed normal floor wares and scale with waves, player level and owned equipment. Normal item balance and appearance remain intact. Purchases, sold flags, visitor progress and visit identity persist; reloading cannot refresh a visit's stock.
- Every XP award also enters a separate training bank while continuing normal level progression. Open **Skills** with **K**, the HUD button or the pause menu. Spend XP on movement speed, attack speed, damage, maximum health, recovery speed, stamina recovery, maximum stamina or critical chance. Rank costs rise as skills develop; all builds share the character's upgrades. Purchases preserve existing health and level progress. Training persists through floors, survival, saves and reloads. Older characters receive credit for previously earned level XP once.
- Projectile visuals are compact additive energy cores, with smaller bright centers and short fading particle wakes. Trails are bounded and quality-aware. Bow/crossbow/staff aiming, repeater bursts, damage and exact first-impact collisions are preserved.

## Tempest Arsenal update

- Press **U + I together** in gameplay, inventory, at a merchant, or over another menu to open developer controls. Either key order works. The overlay pauses combat and returns to the same underlying view when closed with U + I or Escape. I alone still opens Equipment on release; Tab opens it immediately.
- Add **10,000 gold**, travel to dungeon floors **1–3**, the **Cinder Crucible**, or **Survival**. Travel carries all equipment, builds and character upgrades, restores health, and regenerates the destination. The Mythic arsenal button grants nine locked items: a matching six-piece armor/shield set and one weapon for each build. All three builds are assigned, the one-handed set is equipped, and previously owned items remain in the satchel.
- **Reset game** in Equipment starts a fresh floor-one Wayfarer, resetting gear, currency, level, skills, world progress, combat records and settings. Before resetting, both the previous autosave and the current living expedition are preserved in **Saved expeditions**, available from Equipment, Pause and Title. Preserved saves have Restore and Export actions; subsequent autosaves do not overwrite them. If preservation fails, reset stops before changing the round. Restoring a preserved run also archives the current one.
- **Attack techniques** lead the **K / Skills** screen. Whirlwind changes the third consecutive melee attack into a full 360-degree spin with pivot steps, distinct gathering/release/recovery poses, weapon trails and existing edge/cover collision. Three ranks deal 135%, 160% and 190% weapon damage, once per struck enemy. The active arc retains enough time even with extreme attack-speed gear.
- Prismatic volley changes ranged attacks into a charged, braced release, adding two, four or six fan projectiles at 30%, 28% or 26% of weapon damage each. The central shot remains on the reticle; spread is relative to the actual firing direction, including steep aim. Existing repeater bolts remain. Every shot uses the same weapon muzzle, energy effects and first-impact collision.
- Both techniques cost **600 / 1,500 / 3,200 training XP** by rank, can be toggled, work across all compatible builds, and persist through travel and saves. Normal level XP is unchanged. Save validation accounts for character and attack purchases together, while older training saves remain compatible.

## Controls

| Action | Keyboard / mouse | Gamepad |
| --- | --- | --- |
| Move / look | WASD / mouse | Left / right stick |
| Attack / guard | Left / right mouse | RT / LT |
| Dodge | Space | A |
| Runic pulse | F | RB |
| Interact | E | Y |
| Elixir | Q | X |
| Sprint | Shift | Left stick click |
| Inventory | Tab or I | D-pad up |
| Optimize active build | R | D-pad right |
| Select build | 1 / 2 / 3 | Through Equipment |
| Cycle ready builds | V | HUD build button |
| Journal | J | Through menu |
| Character and attack skills | K | Through menu |
| Developer controls | U + I together | Keyboard shortcut |
| End caravan respite | N / HUD button | Wait for timer |
| Pause | Escape or P | Start |

On touch screens, use the left movement pad, drag the open game world to look, and use the action buttons. The right side remains available for aiming. Menus pause combat.

## Save behavior

Autosaves occur every 20 seconds during a live expedition, on descent, and when leaving or hiding an active game. Opening the title screen does not overwrite an existing expedition. Saves preserve item locks, shared equipment, three sparse builds, the active build, explored minimap cells, the floor, equipment, currency, perks, surviving enemies, open chests, dropped loot, merchant stock, sold items, material destruction, wave state, elite identities and scaling, regional gates, camps, and uncollected outdoor loot. Purchases and bulk sales save immediately. Older expedition saves remain compatible. Existing dungeon saves at depth four or deeper enter a fresh Cinder Crucible, retaining equipment, satchel, currency, perks, and uncollected ground loot. Existing survival saves retain their wave and difficulty. Older saves without exploration data reveal the area around the player. Inventory has no gameplay capacity limit; browser storage and device memory remain finite. A storage failure displays an export-save notice, including during autosave. Death offers the most recent saved state. Export a save before changing browser or moving the standalone HTML file, as browser-local storage is scoped to the page location.

## Source

`dist/index.html` retains the original meshing, animation, item, combat, and inventory foundation, with targeted corrections. `dist/expansion.js` contains the new region/model library, combat extensions, navigation, progression, save system, input, and lifecycle. `dist/articulation.js` contains the replacement anatomy/equipment models, inverse kinematics, pose animation, infinite satchel UI, and persistent merchants. `dist/menagerie.js` contains the expanded creature/equipment catalogs, morphology, set bonuses, and equipment scoring. `dist/frontier.js` contains materials, destruction, boss mechanics, streamed biomes, waves, and version-three persistence. `dist/market.js` contains grip-compatible trading UI, full replacement comparisons, rarity budgets, and item migration. `dist/crucible.js` contains the fixed finale, lava, vault lighting, compact persistent exploration, and campaign migration. `dist/loadouts.js` contains universal-character equipment, sparse loadouts, protected items, persistence and the shoulder-camera collision solver. `dist/combat.js` contains exact swept impacts, elevated hit volumes, premium collections and abomination damage migration. `dist/horizons.js` contains survival elevations, mastery progression, traveling merchants, energy rendering and their persistence. `dist/arsenal.js` adds developer controls, preserved save archives, reset, and purchased attack behavior/animation. `dist/expansion.css` and `dist/arsenal.css` provide the responsive interface. `dist/vendor/babylon.js` is Babylon.js 6.49.0; its Apache 2.0 license is included.

## Validation and release status

Validated with Babylon.js 6.49.0 NullEngine: dungeon generation, complete weapon and creature geometry, finite vertex data, unlimited inventory and potion stacking, equipment ownership/handedness, rarity probabilities, movement, projectile damage, elemental effects, enemy aggro, chest animation, health/perk recalculation, deterministic floor reconstruction, save/load, and descent.

Run `node tests/verify-game.cjs`, `node tests/verify-articulation.cjs`, `node tests/verify-frontier.cjs`, `node tests/verify-material-combat.cjs`, `node tests/verify-market.cjs`, `node tests/verify-crucible.cjs`, `node tests/verify-loadouts.cjs`, and `node tests/verify-combat.cjs` from the project directory. The focused suite samples 7,425 weapon/animation poses, 624 creature states, and 600 paired-wing poses. It checks joint lengths, two-handed grip placement, downward ranged aim, roll floor clearance, merchant UI rendering, pagination, transactions, more than 1,000 saved items, potion stacks beyond nine, merchant persistence, actual upward chest clearance, material loot distribution, destruction persistence, the dungeon exit, outdoor streaming, wave completion, abomination gates, elite restoration, quality changes, camp relocation, live projectile destruction, animated foliage cutting, and all 144 armor family-slot models.

The market suite additionally checks 21,024 generated items across all weapon types, armor families, rarities, and four level bands; real preview meshes; merchant transactions and pagination; save/tempering migration; and 675 aimed release poses.

This is a playable release candidate. Browser visual review, real controller/touch device testing, GPU profiling, and longer balance/soak testing are still needed before a commercial launch. Headless checks cannot verify the final lighting appearance or real-device frame rate.

The loadout suite checks repeated swaps without item loss, strict blank-slot retention, shared shields, inactive editing, keyboard switching, attack cancellation, all sale paths, old-role save migration, floor/arena/survival persistence, shoulder projection, camera collision and camera-ray projectile aiming.

The combat suite checks first-impact occlusion, high-speed hostile impacts on thin rotated geometry, wide canopy indexing, batched arena pillars, raised chest lids, transparent lighting, precise reticle convergence for bows/crossbows/staves/repeaters, muzzle obstruction, premium stock, atomic full-set purchases, exact save restoration and one-time abomination damage migration.

Run `node tests/verify-overhead.cjs` for 54 actual overhead melee hit cases and 26,730 full attack-pose samples, including extreme upward aim, all combo phases, fixed limb lengths, support grips and ranged release axes.

Run `node tests/verify-horizons.cjs` and `node tests/verify-terrain.cjs` for training ledger integrity, costs, regeneration, held-key handling, persistent character upgrades, independent camp/traveler stock, walking/table collision alignment, exact caravan transactions and restoration, departure cleanup, compact fading energy effects, shared terrain seams, 2,637 triangle height samples, 60 actual mesh/physics projectile comparisons and legacy terrain reprojection.

Run `node tests/verify-arsenal.cjs` and `node tests/verify-techniques.cjs` for both chord orders across seven contexts, inventory fallback, nine-item ownership and build protection, all five destinations, training spend validation, storage-quota reset cancellation, byte-exact preserved saves and restoration, full-circle weapon hits, complete technique poses, all ranged firing modes, steep-aim spread, reticle accuracy, and muzzle/cover impacts.
