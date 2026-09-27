import * as THREE from './vendor/three/three.module.min.js';
const canvas=document.querySelector('#aura-canvas');
const fallback=document.querySelector('#lamp-fallback');
const help=document.querySelector('#scene-help');
const reduceMotion=matchMedia('(prefers-reduced-motion: reduce)');
let renderer;
try { renderer=new THREE.WebGLRenderer({canvas,alpha:true,antialias:true,powerPreference:'low-power'}); }
catch(error){ help.textContent='Static product preview · 3D requires WebGL'; document.querySelectorAll('.aura-controls button,.aura-controls input').forEach(e=>e.disabled=true); }
if(renderer){
 renderer.setPixelRatio(Math.min(devicePixelRatio,1.7));
 renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFShadowMap;
 renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.2;
 const scene=new THREE.Scene();
 const camera=new THREE.PerspectiveCamera(32,1,.1,100);camera.position.set(4.5,3.0,6.5);camera.lookAt(0,1.3,0);
 const ambient=new THREE.HemisphereLight(0xfff4dc,0x768174,2.4);scene.add(ambient);
 const key=new THREE.DirectionalLight(0xfff5e4,4);key.position.set(-3,6,5);key.castShadow=true;key.shadow.mapSize.set(1024,1024);key.shadow.camera.left=-4;key.shadow.camera.right=4;key.shadow.camera.top=5;key.shadow.camera.bottom=-4;key.shadow.normalBias=.03;scene.add(key);
 const fill=new THREE.DirectionalLight(0xc5d5e7,1.6);fill.position.set(4,2,-2);scene.add(fill);
 const group=new THREE.Group();scene.add(group);group.rotation.y=-.45;
 const finish=new THREE.MeshStandardMaterial({color:0xc5bda7,metalness:.22,roughness:.32});
 const brass=new THREE.MeshStandardMaterial({color:0x9f8554,metalness:.35,roughness:.38});
 const diffuser=new THREE.MeshStandardMaterial({color:0xffe5af,emissive:0xffcf80,emissiveIntensity:.7,roughness:.7});
 const mesh=(geo,mat,x,y,z)=>{const obj=new THREE.Mesh(geo,mat);obj.position.set(x,y,z);obj.castShadow=true;obj.receiveShadow=true;group.add(obj);return obj;};
 mesh(new THREE.CylinderGeometry(.65,.7,.12,64),finish,0,.12,0);
 mesh(new THREE.CylinderGeometry(.57,.65,.035,64),brass,0,.055,0);
 mesh(new THREE.CylinderGeometry(.08,.11,1.55,32),brass,0,.92,0).receiveShadow=false;
 mesh(new THREE.CylinderGeometry(.105,.105,.38,32),finish,0,.35,0);
 // A continuous spun-metal dome, made from a lathed profile.
 const points=[];for(let i=0;i<=36;i++){const t=i/36*Math.PI/2;points.push(new THREE.Vector2(Math.max(.002,Math.sin(t)*1.04),2.53-(1-Math.cos(t))*.7));}
 points.push(new THREE.Vector2(1.04,1.78),new THREE.Vector2(.99,1.78));
 for(let i=36;i>=0;i--){const t=i/36*Math.PI/2;points.push(new THREE.Vector2(Math.max(.002,Math.sin(t)*.99),2.48-(1-Math.cos(t))*.65));}
 mesh(new THREE.LatheGeometry(points.reverse(),80),finish,0,0,0);
 mesh(new THREE.CylinderGeometry(.985,.985,.028,64),diffuser,0,1.79,0);
 mesh(new THREE.TorusGeometry(1.015,.018,12,80),brass,0,1.79,0).rotation.x=Math.PI/2;
 mesh(new THREE.SphereGeometry(.095,24,16),brass,0,2.56,0).scale.set(1,.33,1);
 // A small tactile switch and cloth-covered cable make rotation meaningful.
 mesh(new THREE.CylinderGeometry(.038,.038,.04,24),brass,.39,.21,.22);
 const cablePath=new THREE.CatmullRomCurve3([new THREE.Vector3(0,.08,-.57),new THREE.Vector3(.35,.06,-.92),new THREE.Vector3(.65,.045,-1.1),new THREE.Vector3(.9,.035,-1.6)]);
 mesh(new THREE.TubeGeometry(cablePath,40,.017,8,false),new THREE.MeshStandardMaterial({color:0x454d3d,roughness:1}),0,0,0);
 const ground=new THREE.Mesh(new THREE.PlaneGeometry(200,200),new THREE.ShadowMaterial({color:0x283020,opacity:.12}));ground.rotation.x=-Math.PI/2;ground.receiveShadow=true;scene.add(ground);
 const glowCanvas=document.createElement('canvas');glowCanvas.width=glowCanvas.height=128;
 const ctx=glowCanvas.getContext('2d');const gradient=ctx.createRadialGradient(64,64,5,64,64,64);
 gradient.addColorStop(0,'rgba(255,207,117,.95)');gradient.addColorStop(.4,'rgba(255,207,117,.4)');gradient.addColorStop(1,'rgba(255,207,117,0)');ctx.fillStyle=gradient;ctx.fillRect(0,0,128,128);
 const pool=new THREE.Mesh(new THREE.PlaneGeometry(4.8,4.8),new THREE.MeshBasicMaterial({map:new THREE.CanvasTexture(glowCanvas),transparent:true,opacity:.65,depthWrite:false}));pool.rotation.x=-Math.PI/2;pool.position.y=.012;scene.add(pool);
 const glow=new THREE.PointLight(0xffbf65,8,5,2);glow.position.set(0,1.62,0);scene.add(glow);
 let angle=-.45,targetAngle=angle,drag=false,lastX=0,auto=false,inView=true,lastTime=0,frame;
 const draw=()=>renderer.render(scene,camera);
 function resize(){const r=canvas.getBoundingClientRect();if(!r.width||!r.height)return;renderer.setSize(r.width,r.height,false);camera.aspect=r.width/r.height;if(r.width<450)camera.position.set(3.5,2.7,7.2);else camera.position.set(4.5,3,6.5);camera.lookAt(0,1.3,0);camera.updateProjectionMatrix();draw();}
 new ResizeObserver(resize).observe(canvas);resize();fallback.hidden=true;
 function tick(time){frame=undefined;if(!inView||document.hidden)return;const dt=Math.min((time-lastTime)/1000,.04);lastTime=time;if(auto&&!reduceMotion.matches&&!drag)targetAngle+=dt*.3;angle+=(targetAngle-angle)*.16;group.rotation.y=angle;draw();if(auto&&!reduceMotion.matches||Math.abs(targetAngle-angle)>.0005)frame=requestAnimationFrame(tick);}
 function schedule(){if(!frame){lastTime=performance.now();frame=requestAnimationFrame(tick);}}
 canvas.addEventListener('pointerdown',e=>{drag=true;lastX=e.clientX;canvas.setPointerCapture(e.pointerId);canvas.classList.add('dragging');});
 canvas.addEventListener('pointermove',e=>{if(!drag)return;targetAngle+=(e.clientX-lastX)*.012;lastX=e.clientX;schedule();});
 const end=()=>{drag=false;canvas.classList.remove('dragging');};canvas.addEventListener('pointerup',end);canvas.addEventListener('pointercancel',end);
 canvas.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();targetAngle+=(e.key==='ArrowLeft'?-.25:.25);schedule();}});
 const colours={ivory:[0xc5bda7,'Warm ivory'],graphite:[0x334544,'Deep graphite'],clay:[0xb7745c,'Terracotta']};
 document.querySelectorAll('[data-finish]').forEach(b=>b.addEventListener('click',()=>{const [colour,name]=colours[b.dataset.finish];finish.color.setHex(colour);document.querySelector('#finish-name').textContent=name;document.querySelectorAll('[data-finish]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));draw();}));
 document.querySelector('#light-level').addEventListener('input',e=>{const value=Number(e.target.value)/100;diffuser.emissiveIntensity=value*1.4;glow.intensity=value*12;pool.material.opacity=value;document.querySelector('#light-value').textContent=e.target.value+'%';draw();});
 document.querySelector('#rotate-toggle').addEventListener('click',e=>{auto=!auto;e.currentTarget.setAttribute('aria-pressed',String(auto));e.currentTarget.textContent=auto?'Pause rotation':'Auto-rotate';schedule();});
 document.querySelector('#reset-view').addEventListener('click',()=>{targetAngle=-.45;schedule();});
 document.querySelector('#scene-mode').addEventListener('click',e=>{const evening=e.currentTarget.getAttribute('aria-pressed')!=='true';e.currentTarget.setAttribute('aria-pressed',String(evening));e.currentTarget.textContent=evening?'Daylight':'Evening light';ambient.intensity=evening?.4:2.4;key.intensity=evening?.7:4;fill.intensity=evening?.4:1.6;draw();});
 new IntersectionObserver(entries=>{inView=entries[0].isIntersecting;if(inView)schedule();else if(frame){cancelAnimationFrame(frame);frame=undefined;}},{threshold:.01}).observe(canvas);
 document.addEventListener('visibilitychange',()=>{if(!document.hidden)schedule();});reduceMotion.addEventListener('change',schedule);
 canvas.addEventListener('webglcontextlost',e=>{e.preventDefault();fallback.hidden=false;help.textContent='Product preview · Refresh to restore 3D';if(frame)cancelAnimationFrame(frame);});
 draw();
}
