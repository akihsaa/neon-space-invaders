import test from 'node:test';import assert from 'node:assert/strict';import {clamp,makeFormation,hitTest,nextScore,isGameOver} from '../game-logic.js';
test('clamp keeps player within boundaries',()=>{assert.equal(clamp(-10,0,100),0);assert.equal(clamp(120,0,100),100);assert.equal(clamp(55,0,100),55)});
test('formation creates requested number of enemies',()=>{assert.equal(makeFormation(3,7).length,21);assert.equal(makeFormation(2,4).length,8)});
test('formation enemies are alive and top rows score more',()=>{const e=makeFormation(3,2);assert.ok(e.every(x=>x.alive));assert.ok(e[0].points>e[2].points)});
test('collision detects overlap but not separated objects',()=>{assert.equal(hitTest({x:0,y:0,width:10,height:10},{x:5,y:5,width:10,height:10}),true);assert.equal(hitTest({x:0,y:0,width:10,height:10},{x:20,y:20,width:5,height:5}),false)});
test('score increases only by nonnegative points',()=>{assert.equal(nextScore(100,20),120);assert.equal(nextScore(100,-5),100)});
test('game ends at zero lives',()=>{assert.equal(isGameOver(0),true);assert.equal(isGameOver(2),false)});
