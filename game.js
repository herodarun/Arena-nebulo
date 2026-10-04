const _0x37194f=_0x2c82;(function(_0x1abf23,_0x2b47bf){const _0x4e2ba1=_0x2c82,_0x1785ec=_0x1abf23();while(!![]){try{const _0x524038=-parseInt(_0x4e2ba1(0x207))/0x1+-parseInt(_0x4e2ba1(0x307))/0x2*(-parseInt(_0x4e2ba1(0x2fb))/0x3)+parseInt(_0x4e2ba1(0x336))/0x4*(parseInt(_0x4e2ba1(0x322))/0x5)+-parseInt(_0x4e2ba1(0x377))/0x6+-parseInt(_0x4e2ba1(0x357))/0x7*(parseInt(_0x4e2ba1(0x1b7))/0x8)+parseInt(_0x4e2ba1(0x222))/0x9*(parseInt(_0x4e2ba1(0x1e7))/0xa)+parseInt(_0x4e2ba1(0x1d9))/0xb;if(_0x524038===_0x2b47bf)break;else _0x1785ec['push'](_0x1785ec['shift']());}catch(_0x3dc95d){_0x1785ec['push'](_0x1785ec['shift']());}}}(_0x29f4,0xc4d64));const renderCanvas=document[_0x37194f(0x23e)](_0x37194f(0x334)),canvas={width:window.innerWidth,height:window.innerHeight,getBoundingClientRect(){return renderCanvas.getBoundingClientRect();}},ctx=renderCanvas.getContext('2d',{alpha:false,desynchronized:true}),backdropCanvas=document.createElement('canvas'),backdropCtx=backdropCanvas.getContext('2d',{alpha:false});
let backdropFrame=0;
function resizeCanvas(){
    canvas.width=Math.max(1,window.innerWidth||1);
    canvas.height=Math.max(1,window.innerHeight||1);
    const renderScale=typeof getCanvasRenderScale==='function'?getCanvasRenderScale():1;
    renderCanvas.width=Math.max(1,Math.round(canvas.width*renderScale));
    renderCanvas.height=Math.max(1,Math.round(canvas.height*renderScale));
    ctx.setTransform(renderCanvas.width/canvas.width,0,0,renderCanvas.height/canvas.height,0,0);
    const backdropScale=(typeof getGraphicsPreset==='function'?getGraphicsPreset().backdropScale:1)*renderScale;
    backdropCanvas.width=Math.max(1,Math.round(canvas.width*backdropScale));
    backdropCanvas.height=Math.max(1,Math.round(canvas.height*backdropScale));
    backdropFrame=0;
}
resizeCanvas(),window[_0x37194f(0x265)](_0x37194f(0x214),resizeCanvas);class SoundManager{constructor(){const _0x295991=_0x37194f;this[_0x295991(0x1ea)]=null,this[_0x295991(0x25e)]=null,this['musicGain']=null,this[_0x295991(0x225)]=![],this[_0x295991(0x26e)]=_0x295991(0x232),this[_0x295991(0x257)]=0x0,this[_0x295991(0x2d3)]=null;}[_0x37194f(0x2a9)](){const _0x56732d=_0x37194f;if(this[_0x56732d(0x1ea)])return;this[_0x56732d(0x1ea)]=new(window[(_0x56732d(0x28b))]||window[(_0x56732d(0x37d))])(),this[_0x56732d(0x25e)]=this['ctx'][_0x56732d(0x30d)](),this[_0x56732d(0x25e)][_0x56732d(0x255)][_0x56732d(0x266)]=0.85,this[_0x56732d(0x25e)][_0x56732d(0x246)](this[_0x56732d(0x1ea)]['destination']),this['musicGain']=this[_0x56732d(0x1ea)][_0x56732d(0x30d)](),this['musicGain']['gain'][_0x56732d(0x266)]=0.6,this[_0x56732d(0x1e8)][_0x56732d(0x246)](this[_0x56732d(0x25e)]),this[_0x56732d(0x2f8)]();}[_0x37194f(0x22e)](){const _0x4e763a=_0x37194f;return this[_0x4e763a(0x225)]=!this[_0x4e763a(0x225)],this['masterGain']&&(this[_0x4e763a(0x25e)][_0x4e763a(0x255)]['value']=this[_0x4e763a(0x225)]?0x0:0.85),this[_0x4e763a(0x225)];}[_0x37194f(0x2c3)](_0x2b74c9){const _0x5c2b95=_0x37194f;if(this[_0x5c2b95(0x26e)]===_0x2b74c9)return;this[_0x5c2b95(0x26e)]=_0x2b74c9,this['step']=0x0;}[_0x37194f(0x2f8)](){const _0x3a08a=_0x37194f;if(this[_0x3a08a(0x2d3)])clearInterval(this[_0x3a08a(0x2d3)]);const _0x3963e2={'A1':0x37,'C2':65.41,'D2':73.42,'E2':82.41,'F2':87.31,'G2':0x62,'A2':0x6e,'C3':130.81,'D3':146.83,'E3':164.81,'G3':0xc4,'A3':0xdc,'C4':261.63,'D4':293.66,'E4':329.63,'G4':0x188,'A4':0x1b8,'C5':523.25,'D5':587.33,'E5':659.25,'F5':698.46,'G5':783.99},_0x2685a5={'menu':{'bass':[_0x3963e2['A1'],null,_0x3963e2['A1'],null,_0x3963e2['F2'],null,_0x3963e2['G2'],null,_0x3963e2['A1'],null,_0x3963e2['C2'],null,_0x3963e2['F2'],null,_0x3963e2['E2'],null],'arp':[_0x3963e2['A3'],_0x3963e2['C4'],_0x3963e2['E4'],_0x3963e2['G4'],_0x3963e2['E4'],_0x3963e2['C4'],_0x3963e2['D4'],_0x3963e2['E4'],_0x3963e2['A3'],_0x3963e2['C4'],_0x3963e2['E4'],_0x3963e2['A4'],_0x3963e2['G4'],_0x3963e2['E4'],_0x3963e2['C4'],_0x3963e2['B3']],'type':_0x3a08a(0x21a)},'gameplay':{'bass':[_0x3963e2['A1'],_0x3963e2['A1'],_0x3963e2['C2'],_0x3963e2['A1'],_0x3963e2['D2'],_0x3963e2['A1'],_0x3963e2['E2'],_0x3963e2['G2'],_0x3963e2['A1'],_0x3963e2['A1'],_0x3963e2['C2'],_0x3963e2['A1'],_0x3963e2['G2'],_0x3963e2['E2'],_0x3963e2['D2'],_0x3963e2['C2']],'arp':[_0x3963e2['A3'],_0x3963e2['C4'],_0x3963e2['E4'],_0x3963e2['A4'],_0x3963e2['E4'],_0x3963e2['C4'],_0x3963e2['G3'],_0x3963e2['C4'],_0x3963e2['D4'],_0x3963e2['G4'],_0x3963e2['D4'],_0x3963e2['C4'],_0x3963e2['E4'],_0x3963e2['G4'],_0x3963e2['E4'],_0x3963e2['C4']],'kick':[0x1,0x0,0x0,0x0,0x1,0x0,0x0,0x0,0x1,0x0,0x0,0x0,0x1,0x0,0x1,0x0],'type':'sawtooth'},'boss':{'bass':[_0x3963e2['A1'],_0x3963e2['A1'],_0x3963e2['F2'],_0x3963e2['F2'],_0x3963e2['G2'],_0x3963e2['G2'],_0x3963e2['E2'],_0x3963e2['E2']],'arp':[_0x3963e2['A4'],_0x3963e2['D5'],_0x3963e2['C5'],_0x3963e2['D5'],_0x3963e2['F5'],_0x3963e2['D5'],_0x3963e2['C5'],_0x3963e2['G4']],'kick':[0x1,0x1,0x0,0x1,0x1,0x0,0x1,0x1],'type':_0x3a08a(0x32b)},'gameover':{'bass':[_0x3963e2['A1'],null,null,null,_0x3963e2['F2'],null,null,null],'arp':[_0x3963e2['E4'],_0x3963e2['C4'],_0x3963e2['A3'],null,_0x3963e2['D4'],_0x3963e2['C4'],_0x3963e2['A3'],null],'type':'triangle'}},_0x45b743=0x87;this['musicInterval']=setInterval(()=>{const _0xeca6d6=_0x3a08a;if(!this['ctx']||this['muted'])return;const _0x522ee6=this[_0xeca6d6(0x1ea)][_0xeca6d6(0x1af)],_0x28c28f=_0x2685a5[this[_0xeca6d6(0x26e)]]||_0x2685a5[_0xeca6d6(0x1cd)],_0x22af11=_0x28c28f[_0xeca6d6(0x2e4)]?_0x28c28f[_0xeca6d6(0x2e4)][this[_0xeca6d6(0x257)]%_0x28c28f['bass'][_0xeca6d6(0x1bf)]]:null;if(_0x22af11){const _0x4d1c01=this['ctx'][_0xeca6d6(0x203)](),_0x131485=this[_0xeca6d6(0x1ea)][_0xeca6d6(0x30d)]();_0x4d1c01['type']=_0x28c28f['type']||_0xeca6d6(0x32b),_0x4d1c01[_0xeca6d6(0x2e1)]['value']=_0x22af11;const _0xa2ee00=this[_0xeca6d6(0x1ea)][_0xeca6d6(0x31e)]();_0xa2ee00['type']=_0xeca6d6(0x2d1),_0xa2ee00[_0xeca6d6(0x2e1)]['setValueAtTime'](this[_0xeca6d6(0x26e)]===_0xeca6d6(0x2e0)?0x384:0x1c2,_0x522ee6),_0x131485['gain'][_0xeca6d6(0x1ca)](0.3,_0x522ee6),_0x131485[_0xeca6d6(0x255)][_0xeca6d6(0x212)](0.001,_0x522ee6+0.12),_0x4d1c01['connect'](_0xa2ee00),_0xa2ee00[_0xeca6d6(0x246)](_0x131485),_0x131485[_0xeca6d6(0x246)](this[_0xeca6d6(0x1e8)]),_0x4d1c01[_0xeca6d6(0x2c0)](_0x522ee6),_0x4d1c01[_0xeca6d6(0x210)](_0x522ee6+0.13);}const _0x4732dc=_0x28c28f[_0xeca6d6(0x1ee)]?_0x28c28f[_0xeca6d6(0x1ee)][this['step']%_0x28c28f[_0xeca6d6(0x1ee)][_0xeca6d6(0x1bf)]]:null;if(_0x4732dc){const _0x196ef7=this[_0xeca6d6(0x1ea)][_0xeca6d6(0x203)](),_0x42675a=this[_0xeca6d6(0x1ea)][_0xeca6d6(0x30d)]();_0x196ef7[_0xeca6d6(0x2f5)]=this[_0xeca6d6(0x26e)]===_0xeca6d6(0x2e0)?_0xeca6d6(0x32b):_0xeca6d6(0x21a),_0x196ef7[_0xeca6d6(0x2e1)]['value']=_0x4732dc,_0x42675a['gain'][_0xeca6d6(0x1ca)](0.18,_0x522ee6),_0x42675a[_0xeca6d6(0x255)]['exponentialRampToValueAtTime'](0.001,_0x522ee6+0.14),_0x196ef7['connect'](_0x42675a),_0x42675a['connect'](this[_0xeca6d6(0x1e8)]),_0x196ef7[_0xeca6d6(0x2c0)](_0x522ee6),_0x196ef7['stop'](_0x522ee6+0.15);}if(_0x28c28f[_0xeca6d6(0x206)]&&_0x28c28f[_0xeca6d6(0x206)][this[_0xeca6d6(0x257)]%_0x28c28f[_0xeca6d6(0x206)]['length']]){const _0x29c47b=this[_0xeca6d6(0x1ea)][_0xeca6d6(0x203)](),_0x4095e9=this[_0xeca6d6(0x1ea)][_0xeca6d6(0x30d)]();_0x29c47b[_0xeca6d6(0x2f5)]='sine',_0x29c47b['frequency']['setValueAtTime'](0x82,_0x522ee6),_0x29c47b[_0xeca6d6(0x2e1)][_0xeca6d6(0x212)](0x1e,_0x522ee6+0.08),_0x4095e9[_0xeca6d6(0x255)][_0xeca6d6(0x1ca)](0.45,_0x522ee6),_0x4095e9[_0xeca6d6(0x255)][_0xeca6d6(0x212)](0.001,_0x522ee6+0.08),_0x29c47b[_0xeca6d6(0x246)](_0x4095e9),_0x4095e9[_0xeca6d6(0x246)](this[_0xeca6d6(0x1e8)]),_0x29c47b[_0xeca6d6(0x2c0)](_0x522ee6),_0x29c47b[_0xeca6d6(0x210)](_0x522ee6+0.09);}this[_0xeca6d6(0x257)]++;},_0x45b743);}[_0x37194f(0x224)](){const _0x582c30=_0x37194f;if(!this[_0x582c30(0x1ea)]||this[_0x582c30(0x225)])return;const _0x54fb66=this[_0x582c30(0x1ea)][_0x582c30(0x203)](),_0x8e2b07=this[_0x582c30(0x1ea)][_0x582c30(0x30d)]();_0x54fb66[_0x582c30(0x2f5)]=_0x582c30(0x32a),_0x54fb66['frequency'][_0x582c30(0x1ca)](0x320,this[_0x582c30(0x1ea)][_0x582c30(0x1af)]),_0x54fb66[_0x582c30(0x2e1)]['exponentialRampToValueAtTime'](0x64,this['ctx']['currentTime']+0.1),_0x8e2b07[_0x582c30(0x255)]['setValueAtTime'](0.2,this['ctx']['currentTime']),_0x8e2b07[_0x582c30(0x255)][_0x582c30(0x212)](0.01,this[_0x582c30(0x1ea)][_0x582c30(0x1af)]+0.1),_0x54fb66[_0x582c30(0x246)](_0x8e2b07),_0x8e2b07[_0x582c30(0x246)](this[_0x582c30(0x25e)]),_0x54fb66[_0x582c30(0x2c0)](),_0x54fb66[_0x582c30(0x210)](this['ctx']['currentTime']+0.1);}[_0x37194f(0x2ca)](){const _0x470644=_0x37194f;if(!this[_0x470644(0x1ea)]||this[_0x470644(0x225)])return;const _0x3d98a2=this[_0x470644(0x1ea)][_0x470644(0x1c0)]*0.5,_0x1859ff=this[_0x470644(0x1ea)][_0x470644(0x22c)](0x1,_0x3d98a2,this[_0x470644(0x1ea)][_0x470644(0x1c0)]),_0x3d2377=_0x1859ff[_0x470644(0x338)](0x0);for(let _0x581af1=0x0;_0x581af1<_0x3d98a2;_0x581af1++){_0x3d2377[_0x581af1]=Math[_0x470644(0x2d6)]()*0x2-0x1;}const _0x12bb31=this[_0x470644(0x1ea)][_0x470644(0x2fe)]();_0x12bb31['buffer']=_0x1859ff;const _0x3e89e9=this[_0x470644(0x1ea)]['createBiquadFilter']();_0x3e89e9[_0x470644(0x2f5)]=_0x470644(0x2d1),_0x3e89e9[_0x470644(0x2e1)]['setValueAtTime'](0x3e8,this[_0x470644(0x1ea)][_0x470644(0x1af)]),_0x3e89e9[_0x470644(0x2e1)]['exponentialRampToValueAtTime'](0x64,this['ctx']['currentTime']+0.5);const _0x149692=this[_0x470644(0x1ea)][_0x470644(0x30d)]();_0x149692[_0x470644(0x255)]['setValueAtTime'](0.5,this[_0x470644(0x1ea)][_0x470644(0x1af)]),_0x149692[_0x470644(0x255)]['exponentialRampToValueAtTime'](0.01,this['ctx'][_0x470644(0x1af)]+0.5),_0x12bb31[_0x470644(0x246)](_0x3e89e9),_0x3e89e9[_0x470644(0x246)](_0x149692),_0x149692[_0x470644(0x246)](this[_0x470644(0x25e)]),_0x12bb31['start']();}['playOrb'](){const _0x2de601=_0x37194f;if(!this['ctx']||this[_0x2de601(0x225)])return;const _0x38f429=this[_0x2de601(0x1ea)][_0x2de601(0x1af)];[0x1b8,0x22a,0x293][_0x2de601(0x32c)]((_0x42e5cf,_0x1c7e71)=>{const _0xdf5407=_0x2de601,_0x1c147f=this['ctx']['createOscillator'](),_0xcf5d44=this['ctx'][_0xdf5407(0x30d)]();_0x1c147f[_0xdf5407(0x2f5)]=_0xdf5407(0x21a),_0x1c147f[_0xdf5407(0x2e1)]['value']=_0x42e5cf,_0xcf5d44[_0xdf5407(0x255)][_0xdf5407(0x1ca)](0x0,_0x38f429+_0x1c7e71*0.05),_0xcf5d44[_0xdf5407(0x255)][_0xdf5407(0x285)](0.2,_0x38f429+_0x1c7e71*0.05+0.02),_0xcf5d44[_0xdf5407(0x255)]['exponentialRampToValueAtTime'](0.01,_0x38f429+_0x1c7e71*0.05+0.2),_0x1c147f[_0xdf5407(0x246)](_0xcf5d44),_0xcf5d44[_0xdf5407(0x246)](this[_0xdf5407(0x25e)]),_0x1c147f[_0xdf5407(0x2c0)](_0x38f429+_0x1c7e71*0.05),_0x1c147f[_0xdf5407(0x210)](_0x38f429+_0x1c7e71*0.05+0.2);});}[_0x37194f(0x2b0)](){const _0x1ca7cf=_0x37194f;if(!this['ctx']||this['muted'])return;const _0x7bcf80=this[_0x1ca7cf(0x1ea)][_0x1ca7cf(0x203)](),_0x25645a=this[_0x1ca7cf(0x1ea)][_0x1ca7cf(0x30d)]();_0x7bcf80[_0x1ca7cf(0x2f5)]=_0x1ca7cf(0x359),_0x7bcf80[_0x1ca7cf(0x2e1)][_0x1ca7cf(0x1ca)](0x12c,this[_0x1ca7cf(0x1ea)][_0x1ca7cf(0x1af)]),_0x7bcf80[_0x1ca7cf(0x2e1)][_0x1ca7cf(0x212)](0x32,this[_0x1ca7cf(0x1ea)][_0x1ca7cf(0x1af)]+0.3),_0x25645a[_0x1ca7cf(0x255)][_0x1ca7cf(0x1ca)](0.3,this[_0x1ca7cf(0x1ea)][_0x1ca7cf(0x1af)]),_0x25645a['gain'][_0x1ca7cf(0x212)](0.01,this[_0x1ca7cf(0x1ea)][_0x1ca7cf(0x1af)]+0.3),_0x7bcf80[_0x1ca7cf(0x246)](_0x25645a),_0x25645a[_0x1ca7cf(0x246)](this['masterGain']),_0x7bcf80[_0x1ca7cf(0x2c0)](),_0x7bcf80[_0x1ca7cf(0x210)](this[_0x1ca7cf(0x1ea)][_0x1ca7cf(0x1af)]+0.3);}[_0x37194f(0x233)](){const _0x35b115=_0x37194f;if(!this[_0x35b115(0x1ea)]||this['muted'])return;const _0x3bf61d=this[_0x35b115(0x1ea)][_0x35b115(0x203)](),_0x4ab545=this['ctx'][_0x35b115(0x30d)]();_0x3bf61d[_0x35b115(0x2f5)]=_0x35b115(0x21a),_0x3bf61d['frequency'][_0x35b115(0x1ca)](0xc8,this['ctx'][_0x35b115(0x1af)]),_0x3bf61d[_0x35b115(0x2e1)][_0x35b115(0x212)](0x320,this[_0x35b115(0x1ea)][_0x35b115(0x1af)]+1.5),_0x4ab545[_0x35b115(0x255)][_0x35b115(0x1ca)](0x0,this[_0x35b115(0x1ea)][_0x35b115(0x1af)]),_0x4ab545[_0x35b115(0x255)][_0x35b115(0x285)](0.2,this[_0x35b115(0x1ea)][_0x35b115(0x1af)]+0.75),_0x4ab545[_0x35b115(0x255)][_0x35b115(0x285)](0x0,this['ctx'][_0x35b115(0x1af)]+1.5),_0x3bf61d[_0x35b115(0x246)](_0x4ab545),_0x4ab545[_0x35b115(0x246)](this[_0x35b115(0x25e)]),_0x3bf61d[_0x35b115(0x2c0)](),_0x3bf61d[_0x35b115(0x210)](this[_0x35b115(0x1ea)][_0x35b115(0x1af)]+1.5);}[_0x37194f(0x1d5)](){const _0x37799c=_0x37194f;if(!this[_0x37799c(0x1ea)]||this[_0x37799c(0x225)])return;const _0x5f3d6a=this['ctx'][_0x37799c(0x1af)];for(let _0x57947f=0x0;_0x57947f<0x3;_0x57947f++){const _0x38ce52=this[_0x37799c(0x1ea)][_0x37799c(0x203)](),_0x2706ab=this[_0x37799c(0x1ea)]['createGain']();_0x38ce52[_0x37799c(0x2f5)]=_0x37799c(0x32b),_0x38ce52['frequency'][_0x37799c(0x266)]=0x64,_0x2706ab[_0x37799c(0x255)][_0x37799c(0x1ca)](0.2,_0x5f3d6a+_0x57947f*0.5),_0x2706ab[_0x37799c(0x255)][_0x37799c(0x212)](0.01,_0x5f3d6a+_0x57947f*0.5+0.4),_0x38ce52[_0x37799c(0x246)](_0x2706ab),_0x2706ab[_0x37799c(0x246)](this[_0x37799c(0x25e)]),_0x38ce52[_0x37799c(0x2c0)](_0x5f3d6a+_0x57947f*0.5),_0x38ce52['stop'](_0x5f3d6a+_0x57947f*0.5+0.4);}}[_0x37194f(0x306)](){const _0x1ed5ab=_0x37194f;if(!this['ctx']||this[_0x1ed5ab(0x225)])return;const _0x5ad3d2=this['ctx'][_0x1ed5ab(0x203)](),_0x49c1bc=this[_0x1ed5ab(0x1ea)][_0x1ed5ab(0x30d)]();_0x5ad3d2[_0x1ed5ab(0x2f5)]='triangle',_0x5ad3d2['frequency'][_0x1ed5ab(0x1ca)](0x12c,this[_0x1ed5ab(0x1ea)][_0x1ed5ab(0x1af)]),_0x5ad3d2[_0x1ed5ab(0x2e1)]['exponentialRampToValueAtTime'](0x32,this[_0x1ed5ab(0x1ea)][_0x1ed5ab(0x1af)]+0x2),_0x49c1bc[_0x1ed5ab(0x255)][_0x1ed5ab(0x1ca)](0.3,this[_0x1ed5ab(0x1ea)][_0x1ed5ab(0x1af)]),_0x49c1bc[_0x1ed5ab(0x255)][_0x1ed5ab(0x285)](0x0,this[_0x1ed5ab(0x1ea)]['currentTime']+0x2),_0x5ad3d2[_0x1ed5ab(0x246)](_0x49c1bc),_0x49c1bc[_0x1ed5ab(0x246)](this['masterGain']),_0x5ad3d2[_0x1ed5ab(0x2c0)](),_0x5ad3d2[_0x1ed5ab(0x210)](this['ctx'][_0x1ed5ab(0x1af)]+0x2);}}const sounds=new SoundManager(),STATE={'MENU':_0x37194f(0x232),'PLAYING':_0x37194f(0x381),'PAUSED':_0x37194f(0x2e2),'GAME_OVER':_0x37194f(0x2c5)};let gameState=STATE[_0x37194f(0x1b2)],gameMode='1P',score=0x0,kills=0x0,combo=0x1,maxCombo=0x1,comboTimer=0x0,wave=0x1,shields=0x3,maxShields=0x3,bestScore=parseInt(localStorage[_0x37194f(0x30c)]('nebulaDriftBest')||'0'),screenShake=0x0,screenShakeAngle=0x0,gameTime=0x0,waveTimer=0x0,waveDuration=0x4b0,difficultyMult=0x1,isCalmPeriod=![],calmTimer=0x0,activePowerup=null,powerupTimer=0x0,powerupMaxTime=0x0;class NetworkManager{constructor(){const _0x33cc7e=_0x37194f;this['ws']=null,this[_0x33cc7e(0x1f5)]=null,this[_0x33cc7e(0x2c9)]=null,this[_0x33cc7e(0x247)]=null,this['mode']='peer',this[_0x33cc7e(0x241)]=![],this[_0x33cc7e(0x21b)]=![],this['roomCode']='',this['myClientId']='nebula_'+Math[_0x33cc7e(0x2d6)]()[_0x33cc7e(0x1d2)](0x24)[_0x33cc7e(0x329)](0x2,0x9),this[_0x33cc7e(0x282)]=0x0,this['_pingInterval']=null,this[_0x33cc7e(0x35c)]=0x0,this[_0x33cc7e(0x271)]=0x5,this[_0x33cc7e(0x242)]=null,this['_wsUrl']='',this[_0x33cc7e(0x2e5)]=null,this['_onStatusChange']=null,this[_0x33cc7e(0x305)]=[],this[_0x33cc7e(0x2f7)]=0x0,this[_0x33cc7e(0x2ec)]=null,this[_0x33cc7e(0x248)]={'iceServers':[{'urls':_0x33cc7e(0x2dd)},{'urls':_0x33cc7e(0x33d)},{'urls':_0x33cc7e(0x1e1)},{'urls':_0x33cc7e(0x2fd)},{'urls':'stun:global.stun.twilio.com:3478'}]};}['setCallbacks'](_0x1bcdc0,_0x318087){const _0x592ff9=_0x37194f;this[_0x592ff9(0x2e5)]=_0x1bcdc0,this[_0x592ff9(0x29c)]=_0x318087;}[_0x37194f(0x1e4)](_0x29724c,_0x3b1cbd){const _0xd9f1df=_0x37194f;if(this['_onStatusChange'])this[_0xd9f1df(0x29c)](_0x29724c,_0x3b1cbd);}[_0x37194f(0x35f)](){const _0x5e14c4=_0x37194f;this[_0x5e14c4(0x1b5)]='peer',this[_0x5e14c4(0x241)]=!![],this[_0x5e14c4(0x1e4)]('connecting',_0x5e14c4(0x33f)),this['_destroyPeer']();const _0x1afa6d='ND-'+Math['floor'](0x3e8+Math[_0x5e14c4(0x2d6)]()*0x2328);try{this[_0x5e14c4(0x1f5)]=new Peer(_0x5e14c4(0x1f9)+_0x1afa6d,{'config':this['_iceConfig'],'debug':0x0});}catch(_0x20a039){this[_0x5e14c4(0x1e4)]('disconnected',_0x5e14c4(0x36c));return;}const _0x2d6343=setTimeout(()=>{const _0x34d7dd=_0x5e14c4;!this[_0x34d7dd(0x314)]&&(this[_0x34d7dd(0x1e4)]('disconnected',_0x34d7dd(0x23a)),this[_0x34d7dd(0x1d3)]());},0x1f40);this[_0x5e14c4(0x1f5)]['on']('open',()=>{const _0x5c4d1f=_0x5e14c4;clearTimeout(_0x2d6343),this['roomCode']=_0x1afa6d,this['_updateStatus']('waiting',_0x5c4d1f(0x23b)+_0x1afa6d+_0x5c4d1f(0x383));}),this['peer']['on']('connection',_0x3776a6=>{const _0x3d21f8=_0x5e14c4;this[_0x3d21f8(0x2c9)]=_0x3776a6,this[_0x3d21f8(0x1be)](),this[_0x3d21f8(0x1e4)](_0x3d21f8(0x1e3),_0x3d21f8(0x308)),this[_0x3d21f8(0x21b)]=!![];}),this['peer']['on'](_0x5e14c4(0x23d),_0x8af651=>{const _0x1ee6ce=_0x5e14c4;clearTimeout(_0x2d6343);const _0x132fe9=_0x8af651[_0x1ee6ce(0x2f5)]===_0x1ee6ce(0x1e2)?'ID\x20занят,\x20пересоздайте':_0x8af651['message']||_0x8af651[_0x1ee6ce(0x2f5)];this['_updateStatus'](_0x1ee6ce(0x2f4),'🔴\x20'+_0x132fe9);}),this[_0x5e14c4(0x1f5)]['on'](_0x5e14c4(0x2f4),()=>{const _0x24e40d=_0x5e14c4;if(this[_0x24e40d(0x21b)])return;this[_0x24e40d(0x1e4)](_0x24e40d(0x1f6),_0x24e40d(0x374));try{this['peer'][_0x24e40d(0x2ac)]();}catch(_0x4bb572){}});}[_0x37194f(0x370)](_0x356abd){const _0x3b4e56=_0x37194f;this[_0x3b4e56(0x1b5)]=_0x3b4e56(0x1f5),this[_0x3b4e56(0x241)]=![],this['roomCode']=_0x356abd[_0x3b4e56(0x274)](),this[_0x3b4e56(0x1e4)](_0x3b4e56(0x1f6),'🟡\x20Подключение\x20к\x20'+_0x356abd+_0x3b4e56(0x25a)),this[_0x3b4e56(0x1d3)]();try{this[_0x3b4e56(0x1f5)]=new Peer(undefined,{'config':this['_iceConfig'],'debug':0x0});}catch(_0x27f4b3){this[_0x3b4e56(0x1e4)]('disconnected',_0x3b4e56(0x36c));return;}const _0x8996dc=setTimeout(()=>{const _0x4b408c=_0x3b4e56;this['_updateStatus'](_0x4b408c(0x2f4),_0x4b408c(0x23a)),this[_0x4b408c(0x1d3)]();},0x1f40);this['peer']['on'](_0x3b4e56(0x28c),()=>{const _0x119de5=_0x3b4e56;clearTimeout(_0x8996dc),this[_0x119de5(0x373)](_0x356abd);}),this[_0x3b4e56(0x1f5)]['on'](_0x3b4e56(0x23d),_0x3c87f2=>{const _0x4bd615=_0x3b4e56;clearTimeout(_0x8996dc);const _0x26faff=_0x3c87f2[_0x4bd615(0x2f5)]===_0x4bd615(0x303)?_0x4bd615(0x323):_0x4bd615(0x2f3)+(_0x3c87f2[_0x4bd615(0x2ef)]||_0x3c87f2[_0x4bd615(0x2f5)]);this['_updateStatus'](_0x4bd615(0x2f4),_0x26faff);});}['_destroyPeer'](){const _0x3f09f1=_0x37194f;this[_0x3f09f1(0x2ec)]&&(clearTimeout(this[_0x3f09f1(0x2ec)]),this[_0x3f09f1(0x2ec)]=null);if(this[_0x3f09f1(0x2c9)]){try{this[_0x3f09f1(0x2c9)][_0x3f09f1(0x2f0)]();}catch(_0xb48888){}this[_0x3f09f1(0x2c9)]=null;}if(this[_0x3f09f1(0x1f5)]){try{this[_0x3f09f1(0x1f5)][_0x3f09f1(0x362)]();}catch(_0x1e9bb5){}this[_0x3f09f1(0x1f5)]=null;}}[_0x37194f(0x373)](_0x49f69f){const _0x38c3b0=_0x37194f,_0x492c67='nebuladrift-'+_0x49f69f[_0x38c3b0(0x274)]();this[_0x38c3b0(0x2c9)]=this[_0x38c3b0(0x1f5)][_0x38c3b0(0x246)](_0x492c67,{'reliable':![],'serialization':_0x38c3b0(0x345)}),this['_setupPeerConn'](),this[_0x38c3b0(0x2ec)]=setTimeout(()=>{const _0x4a4e98=_0x38c3b0;!this[_0x4a4e98(0x21b)]&&this[_0x4a4e98(0x1e4)](_0x4a4e98(0x2f4),_0x4a4e98(0x2b4));},0x2710);}[_0x37194f(0x1be)](){const _0x217b54=_0x37194f;this[_0x217b54(0x2c9)]['on'](_0x217b54(0x28c),()=>{const _0x373c28=_0x217b54;this[_0x373c28(0x2ec)]&&(clearTimeout(this['_peerConnectTimer']),this['_peerConnectTimer']=null),this['isConnected']=!![],this[_0x373c28(0x1e4)](_0x373c28(0x1e3),_0x373c28(0x27e)),this[_0x373c28(0x1b4)]();}),this[_0x217b54(0x2c9)]['on']('data',_0x1ef5c4=>{const _0x56f405=_0x217b54;if(!_0x1ef5c4)return;if(_0x1ef5c4[_0x56f405(0x208)]!==undefined){if(this[_0x56f405(0x2c9)]&&this[_0x56f405(0x2c9)]['open'])this[_0x56f405(0x2c9)][_0x56f405(0x2f9)]({'_pong':_0x1ef5c4[_0x56f405(0x208)]});return;}if(_0x1ef5c4[_0x56f405(0x287)]!==undefined){this['pingMs']=Date['now']()-_0x1ef5c4['_pong'];return;}if(this[_0x56f405(0x2e5)])this[_0x56f405(0x2e5)](_0x1ef5c4);}),this['peerConn']['on'](_0x217b54(0x2f0),()=>{const _0x5126ff=_0x217b54;this[_0x5126ff(0x2f6)](),this[_0x5126ff(0x21b)]&&(this[_0x5126ff(0x21b)]=![],this['_updateStatus'](_0x5126ff(0x2f4),_0x5126ff(0x229)),!this[_0x5126ff(0x241)]&&this[_0x5126ff(0x35c)]<this[_0x5126ff(0x271)]?(this[_0x5126ff(0x35c)]++,showReconnectBanner(!![],this[_0x5126ff(0x35c)],this['_maxReconnects']),this[_0x5126ff(0x242)]=setTimeout(()=>{const _0x333f3b=_0x5126ff;this['_updateStatus'](_0x333f3b(0x1f6),_0x333f3b(0x20e)+this[_0x333f3b(0x35c)]+'/'+this[_0x333f3b(0x271)]+_0x333f3b(0x2d5)),this['_doPeerConnect'](this[_0x333f3b(0x314)]);},0x5dc)):showReconnectBanner(![]));}),this[_0x217b54(0x2c9)]['on'](_0x217b54(0x23d),_0x2c3f8a=>{const _0x2fee81=_0x217b54;this[_0x2fee81(0x1e4)]('disconnected',_0x2fee81(0x1c4)+(_0x2c3f8a[_0x2fee81(0x2ef)]||_0x2c3f8a));});}['_startPeerPing'](){const _0x375064=_0x37194f;this[_0x375064(0x2f6)](),this['_pingInterval']=setInterval(()=>{const _0x171f27=_0x375064;this[_0x171f27(0x2c9)]&&this[_0x171f27(0x2c9)]['open']&&this[_0x171f27(0x2c9)][_0x171f27(0x2f9)]({'_ping':Date[_0x171f27(0x269)]()});},0x3e8);}[_0x37194f(0x1c1)](){const _0x21312c=_0x37194f;this['mode']=_0x21312c(0x1e9),this[_0x21312c(0x241)]=!![];const _0x58574e='ND-'+Math[_0x21312c(0x344)](0x3e8+Math[_0x21312c(0x2d6)]()*0x2328);this[_0x21312c(0x314)]=_0x58574e,this[_0x21312c(0x1e4)](_0x21312c(0x1f6),_0x21312c(0x2b3)),this[_0x21312c(0x315)](()=>{const _0x1850d6=_0x21312c,_0x33ea63='nebuladrift/rooms/'+_0x58574e+'/stream';this['mqttClient'][_0x1850d6(0x352)](_0x33ea63,_0x4a3fda=>{const _0x2f4ac2=_0x1850d6;if(_0x4a3fda)return this[_0x2f4ac2(0x1e4)](_0x2f4ac2(0x2f4),'🔴\x20Ошибка\x20подписки:\x20'+_0x4a3fda);this[_0x2f4ac2(0x1e4)](_0x2f4ac2(0x2a3),_0x2f4ac2(0x1b8)+_0x58574e+'\x20—\x20ожидание\x20игрока!');});});}[_0x37194f(0x1ed)](_0x55bbcd){const _0x134d51=_0x37194f;this['mode']=_0x134d51(0x1e9),this['isHost']=![],this[_0x134d51(0x314)]=_0x55bbcd[_0x134d51(0x274)](),this['_updateStatus'](_0x134d51(0x1f6),_0x134d51(0x1d8)+_0x55bbcd+_0x134d51(0x25a)),this['_connectMqtt'](()=>{const _0x307c4a=_0x134d51,_0x27cd3b=_0x307c4a(0x26c)+_0x55bbcd+_0x307c4a(0x36e);this[_0x307c4a(0x247)][_0x307c4a(0x352)](_0x27cd3b,_0x997e17=>{const _0x393553=_0x307c4a;if(_0x997e17)return this[_0x393553(0x1e4)](_0x393553(0x2f4),'🔴\x20Ошибка\x20подписки:\x20'+_0x997e17);this[_0x393553(0x21b)]=!![],this[_0x393553(0x1e4)](_0x393553(0x1e3),_0x393553(0x284)+_0x55bbcd),this[_0x393553(0x2f9)]({'type':_0x393553(0x1b1),'clientId':this[_0x393553(0x341)]});});});}[_0x37194f(0x315)](_0x399d9c){const _0x4a2e51=_0x37194f;if(this[_0x4a2e51(0x247)])try{this[_0x4a2e51(0x247)][_0x4a2e51(0x1ad)]();}catch(_0x414bc7){}const _0x20728c=[_0x4a2e51(0x26b),_0x4a2e51(0x200),'wss://test.mosquitto.org:8081'];let _0x5af193=0x0;const _0xead46=_0x4b7ec5=>{const _0x31afd4=_0x4a2e51;if(_0x4b7ec5>=_0x20728c[_0x31afd4(0x1bf)]){this[_0x31afd4(0x1e4)]('disconnected',_0x31afd4(0x1c5));return;}this[_0x31afd4(0x1e4)](_0x31afd4(0x1f6),_0x31afd4(0x302)+(_0x4b7ec5+0x1)+_0x31afd4(0x31f)),this[_0x31afd4(0x247)]=mqtt['connect'](_0x20728c[_0x4b7ec5],{'clientId':this['myClientId']+'_'+_0x4b7ec5,'keepalive':0xf,'connectTimeout':0x1770,'reconnectPeriod':0x0});const _0x384617=setTimeout(()=>{const _0x3ce41a=_0x31afd4;try{this[_0x3ce41a(0x247)][_0x3ce41a(0x1ad)]();}catch(_0x4c3e53){}_0xead46(_0x4b7ec5+0x1);},0x1b58);this[_0x31afd4(0x247)]['on'](_0x31afd4(0x246),()=>{const _0x57301d=_0x31afd4;clearTimeout(_0x384617),_0x5af193=_0x4b7ec5,this[_0x57301d(0x2cd)]();if(_0x399d9c)_0x399d9c();}),this['mqttClient']['on'](_0x31afd4(0x2ef),(_0x5669f5,_0x156239)=>{const _0x1abb91=_0x31afd4;try{const _0x4b8bb9=JSON['parse'](_0x156239['toString']());if(_0x4b8bb9['_senderId']===this[_0x1abb91(0x341)])return;if(_0x4b8bb9[_0x1abb91(0x2f5)]===_0x1abb91(0x1b1)&&this['isHost']){this['isConnected']=!![],this[_0x1abb91(0x1e4)](_0x1abb91(0x1e3),_0x1abb91(0x201));return;}if(_0x4b8bb9[_0x1abb91(0x208)]!==undefined){if(this['isHost'])this[_0x1abb91(0x2f9)]({'_pong':_0x4b8bb9[_0x1abb91(0x208)],'targetId':_0x4b8bb9['_senderId']});return;}if(_0x4b8bb9[_0x1abb91(0x287)]!==undefined&&_0x4b8bb9[_0x1abb91(0x1c6)]===this['myClientId']){this[_0x1abb91(0x282)]=Date[_0x1abb91(0x269)]()-_0x4b8bb9['_pong'];return;}if(this[_0x1abb91(0x2e5)])this[_0x1abb91(0x2e5)](_0x4b8bb9);}catch(_0x9b385){}}),this[_0x31afd4(0x247)]['on'](_0x31afd4(0x23d),_0x42f93c=>{const _0x3fd1b8=_0x31afd4;clearTimeout(_0x384617);try{this[_0x3fd1b8(0x247)][_0x3fd1b8(0x1ad)]();}catch(_0x32e851){}_0xead46(_0x4b7ec5+0x1);}),this[_0x31afd4(0x247)]['on']('close',()=>{const _0x239517=_0x31afd4;this['isConnected']&&this[_0x239517(0x1b5)]===_0x239517(0x1e9)&&(this[_0x239517(0x21b)]=![],this[_0x239517(0x1e4)](_0x239517(0x2f4),_0x239517(0x1bd)));});};_0xead46(0x0);}[_0x37194f(0x2cd)](){const _0x8431ed=_0x37194f;this[_0x8431ed(0x2f6)](),this[_0x8431ed(0x2da)]=setInterval(()=>{const _0x28074e=_0x8431ed;this[_0x28074e(0x247)]&&this[_0x28074e(0x247)][_0x28074e(0x1e3)]&&!this[_0x28074e(0x241)]&&this['send']({'_ping':Date[_0x28074e(0x269)]()});},0x3e8);}['connectWS'](_0x3e7170,_0x123623,_0xae684,_0x1c8eca){const _0x3222b1=_0x37194f;this[_0x3222b1(0x1b5)]='ws',this[_0x3222b1(0x241)]=_0x1c8eca,this['roomCode']=_0xae684,this[_0x3222b1(0x2bc)]=_0x3222b1(0x2be)+_0x3e7170+':'+_0x123623,this[_0x3222b1(0x35c)]=0x0,this['_connectWS']();}['_connectWS'](){const _0x4eb5d8=_0x37194f;try{this['_updateStatus'](_0x4eb5d8(0x1f6),_0x4eb5d8(0x20f)),this['ws']=new WebSocket(this[_0x4eb5d8(0x2bc)]),this['ws']['onopen']=()=>{const _0x331db1=_0x4eb5d8;this[_0x331db1(0x35c)]=0x0,this[_0x331db1(0x241)]?this['ws'][_0x331db1(0x2f9)](JSON[_0x331db1(0x235)]({'type':_0x331db1(0x211)})):this['ws'][_0x331db1(0x2f9)](JSON[_0x331db1(0x235)]({'type':_0x331db1(0x2ce),'roomCode':this[_0x331db1(0x314)]})),this[_0x331db1(0x25b)]();},this['ws']['onmessage']=_0x1b4ae1=>{const _0x2a991d=_0x4eb5d8;try{const _0x3aff8c=JSON['parse'](_0x1b4ae1[_0x2a991d(0x355)]);this[_0x2a991d(0x300)](_0x3aff8c);}catch(_0x1ee135){}},this['ws']['onclose']=()=>{const _0x4e6b4a=_0x4eb5d8;this[_0x4e6b4a(0x2f6)](),this[_0x4e6b4a(0x21b)]&&(this[_0x4e6b4a(0x21b)]=![],this[_0x4e6b4a(0x1e4)](_0x4e6b4a(0x2f4),_0x4e6b4a(0x229)),this['_tryReconnectWS']());},this['ws']['onerror']=()=>{const _0x34ca13=_0x4eb5d8;this[_0x34ca13(0x1e4)](_0x34ca13(0x2f4),_0x34ca13(0x32f));};}catch(_0x42f86e){this[_0x4eb5d8(0x1e4)](_0x4eb5d8(0x2f4),_0x4eb5d8(0x310)+_0x42f86e[_0x4eb5d8(0x2ef)]);}}[_0x37194f(0x300)](_0x4dd108){const _0x21dc99=_0x37194f;switch(_0x4dd108[_0x21dc99(0x2f5)]){case _0x21dc99(0x29e):this['roomCode']=_0x4dd108[_0x21dc99(0x314)],this[_0x21dc99(0x241)]=!![],this[_0x21dc99(0x1e4)]('waiting','🟡\x20Код:\x20'+_0x4dd108['roomCode']+_0x21dc99(0x348));break;case _0x21dc99(0x1eb):this[_0x21dc99(0x21b)]=!![],this['isHost']=_0x4dd108['role']===_0x21dc99(0x369),this[_0x21dc99(0x314)]=_0x4dd108[_0x21dc99(0x314)],this[_0x21dc99(0x1e4)]('connected',_0x21dc99(0x356)+_0x4dd108[_0x21dc99(0x314)]+'\x20('+(this[_0x21dc99(0x241)]?_0x21dc99(0x23f):'КЛИЕНТ')+')');break;case _0x21dc99(0x332):this['isConnected']=!![],this[_0x21dc99(0x1e4)](_0x21dc99(0x1e3),_0x21dc99(0x304));break;case _0x21dc99(0x27a):this[_0x21dc99(0x21b)]=![],this['_updateStatus'](_0x21dc99(0x2f4),_0x21dc99(0x2ba));break;case _0x21dc99(0x2f1):if(this[_0x21dc99(0x2e5)])this[_0x21dc99(0x2e5)](_0x4dd108[_0x21dc99(0x355)]);break;case _0x21dc99(0x37e):this['pingMs']=Date[_0x21dc99(0x269)]()-_0x4dd108['t'];break;case _0x21dc99(0x2a1):if(this['ws']&&this['ws'][_0x21dc99(0x256)]===WebSocket['OPEN'])this['ws']['send'](JSON['stringify']({'type':_0x21dc99(0x221)}));break;case _0x21dc99(0x23d):this[_0x21dc99(0x1e4)](_0x21dc99(0x2f4),_0x21dc99(0x2f3)+_0x4dd108['message']);break;}}[_0x37194f(0x25b)](){const _0x526888=_0x37194f;this[_0x526888(0x2f6)](),this[_0x526888(0x2da)]=setInterval(()=>{const _0x6d53c2=_0x526888;if(this['ws']&&this['ws']['readyState']===WebSocket['OPEN'])this['ws']['send'](JSON[_0x6d53c2(0x235)]({'type':_0x6d53c2(0x1b9),'t':Date[_0x6d53c2(0x269)]()}));},0x3e8);}[_0x37194f(0x2f6)](){const _0x2d57ad=_0x37194f;this['_pingInterval']&&(clearInterval(this[_0x2d57ad(0x2da)]),this[_0x2d57ad(0x2da)]=null);}[_0x37194f(0x37b)](){const _0x3fb3d2=_0x37194f;if(this['_reconnectAttempts']>=this[_0x3fb3d2(0x271)]){this['_updateStatus'](_0x3fb3d2(0x2f4),_0x3fb3d2(0x209)),showReconnectBanner(![]);return;}this[_0x3fb3d2(0x35c)]++,showReconnectBanner(!![],this[_0x3fb3d2(0x35c)],this['_maxReconnects']),this[_0x3fb3d2(0x1e4)](_0x3fb3d2(0x1f6),_0x3fb3d2(0x20e)+this[_0x3fb3d2(0x35c)]+'/'+this['_maxReconnects']+_0x3fb3d2(0x2d5)),this['_reconnectTimer']=setTimeout(()=>this[_0x3fb3d2(0x1ff)](),0x7d0);}[_0x37194f(0x2f9)](_0x225b80){const _0x29badb=_0x37194f;if(this[_0x29badb(0x1b5)]===_0x29badb(0x1f5)){if(this['peerConn']&&this[_0x29badb(0x2c9)][_0x29badb(0x28c)])this[_0x29badb(0x2c9)][_0x29badb(0x2f9)](_0x225b80);}else{if(this[_0x29badb(0x1b5)]===_0x29badb(0x1e9)){if(this[_0x29badb(0x247)]&&this[_0x29badb(0x247)][_0x29badb(0x1e3)]&&this[_0x29badb(0x314)]){const _0x5ae980='nebuladrift/rooms/'+this['roomCode']+_0x29badb(0x36e);_0x225b80[_0x29badb(0x279)]=this[_0x29badb(0x341)],this[_0x29badb(0x247)]['publish'](_0x5ae980,JSON[_0x29badb(0x235)](_0x225b80));}}else{if(this['mode']==='ws'){if(this['ws']&&this['ws'][_0x29badb(0x256)]===WebSocket[_0x29badb(0x30a)])this['ws'][_0x29badb(0x2f9)](JSON['stringify']({'type':_0x29badb(0x2f1),'data':_0x225b80}));}}}}[_0x37194f(0x327)](_0x2a159f,_0x43f0a2){const _0x1bdbdc=_0x37194f;this[_0x1bdbdc(0x2f7)]++;if(this[_0x1bdbdc(0x2f7)]%_0x43f0a2===0x0)this[_0x1bdbdc(0x2f9)](_0x2a159f);}[_0x37194f(0x368)](){const _0x526ab9=_0x37194f;this[_0x526ab9(0x2f6)]();this[_0x526ab9(0x242)]&&(clearTimeout(this['_reconnectTimer']),this['_reconnectTimer']=null);this[_0x526ab9(0x2ec)]&&(clearTimeout(this[_0x526ab9(0x2ec)]),this[_0x526ab9(0x2ec)]=null);this['_destroyPeer']();if(this[_0x526ab9(0x247)]){try{this[_0x526ab9(0x247)][_0x526ab9(0x1ad)]();}catch(_0x2112fd){}this[_0x526ab9(0x247)]=null;}if(this['ws']){try{this['ws'][_0x526ab9(0x2f0)]();}catch(_0xad9666){}this['ws']=null;}this[_0x526ab9(0x21b)]=![],this[_0x526ab9(0x241)]=![],this['roomCode']='',this[_0x526ab9(0x282)]=0x0,this[_0x526ab9(0x35c)]=0x0;}}const netManager=new NetworkManager();let isNetHost=![],netPlayerRole=0x1,netConnType=_0x37194f(0x1f5),lastNetClientInput=null;const mode1PBtn=document[_0x37194f(0x23e)](_0x37194f(0x21c)),mode2PBtn=document[_0x37194f(0x23e)]('mode2P'),modeNetBtn=document[_0x37194f(0x23e)](_0x37194f(0x2c2)),controls1P=document['getElementById'](_0x37194f(0x366)),controls2P=document['getElementById']('controls2P'),netPanel=document[_0x37194f(0x23e)](_0x37194f(0x2c1));mode1PBtn['addEventListener'](_0x37194f(0x2b2),()=>{const _0xbf6d33=_0x37194f;gameMode='1P',mode1PBtn[_0xbf6d33(0x238)]['add'](_0xbf6d33(0x37c)),mode2PBtn[_0xbf6d33(0x238)][_0xbf6d33(0x2d9)](_0xbf6d33(0x37c)),modeNetBtn[_0xbf6d33(0x238)][_0xbf6d33(0x2d9)](_0xbf6d33(0x37c)),controls1P['classList'][_0xbf6d33(0x2d9)]('hidden'),controls2P[_0xbf6d33(0x238)][_0xbf6d33(0x278)](_0xbf6d33(0x22a)),netPanel[_0xbf6d33(0x238)][_0xbf6d33(0x278)]('hidden'),document['getElementById'](_0xbf6d33(0x25c))[_0xbf6d33(0x238)][_0xbf6d33(0x278)]('hidden'),document[_0xbf6d33(0x23e)](_0xbf6d33(0x22f))[_0xbf6d33(0x2cc)]='ЭНЕРГИЯ';}),mode2PBtn[_0x37194f(0x265)](_0x37194f(0x2b2),()=>{const _0x5e9a6c=_0x37194f;gameMode='2P',mode2PBtn['classList'][_0x5e9a6c(0x278)](_0x5e9a6c(0x37c)),mode1PBtn[_0x5e9a6c(0x238)][_0x5e9a6c(0x2d9)](_0x5e9a6c(0x37c)),modeNetBtn[_0x5e9a6c(0x238)][_0x5e9a6c(0x2d9)](_0x5e9a6c(0x37c)),controls2P['classList'][_0x5e9a6c(0x2d9)](_0x5e9a6c(0x22a)),controls1P[_0x5e9a6c(0x238)][_0x5e9a6c(0x278)](_0x5e9a6c(0x22a)),netPanel[_0x5e9a6c(0x238)][_0x5e9a6c(0x278)](_0x5e9a6c(0x22a)),document[_0x5e9a6c(0x23e)](_0x5e9a6c(0x25c))['classList'][_0x5e9a6c(0x2d9)]('hidden'),document[_0x5e9a6c(0x23e)](_0x5e9a6c(0x22f))['innerText']=_0x5e9a6c(0x25f);}),modeNetBtn[_0x37194f(0x265)](_0x37194f(0x2b2),()=>{const _0x38f776=_0x37194f;gameMode=_0x38f776(0x36b),modeNetBtn[_0x38f776(0x238)][_0x38f776(0x278)](_0x38f776(0x37c)),mode1PBtn['classList'][_0x38f776(0x2d9)](_0x38f776(0x37c)),mode2PBtn[_0x38f776(0x238)][_0x38f776(0x2d9)]('active'),controls1P[_0x38f776(0x238)][_0x38f776(0x2d9)](_0x38f776(0x22a)),controls2P[_0x38f776(0x238)][_0x38f776(0x278)](_0x38f776(0x22a)),netPanel[_0x38f776(0x238)][_0x38f776(0x2d9)](_0x38f776(0x22a)),document['getElementById']('p2EnergyBox')[_0x38f776(0x238)][_0x38f776(0x2d9)](_0x38f776(0x22a)),document['getElementById'](_0x38f776(0x22f))[_0x38f776(0x2cc)]=_0x38f776(0x25f);});const _tabCloud=document[_0x37194f(0x23e)](_0x37194f(0x1cf)),_tabWS=document[_0x37194f(0x23e)](_0x37194f(0x28d)),_tabPeer=document[_0x37194f(0x23e)](_0x37194f(0x353)),_tabContentCloud=document[_0x37194f(0x23e)](_0x37194f(0x326)),_tabContentWS=document[_0x37194f(0x23e)](_0x37194f(0x1f4)),_tabContentPeer=document[_0x37194f(0x23e)](_0x37194f(0x2c6));function _showTab(_0x12316c){const _0x3c6134=_0x37194f;[_tabPeer,_tabCloud,_tabWS]['forEach'](_0x3d6ca9=>_0x3d6ca9&&_0x3d6ca9[_0x3c6134(0x238)][_0x3c6134(0x2d9)](_0x3c6134(0x37c))),[_tabContentPeer,_tabContentCloud,_tabContentWS][_0x3c6134(0x32c)](_0x49b749=>_0x49b749&&_0x49b749[_0x3c6134(0x238)][_0x3c6134(0x278)](_0x3c6134(0x22a)));if(_0x12316c===_0x3c6134(0x1f5)){netConnType=_0x3c6134(0x1f5);if(_tabPeer)_tabPeer[_0x3c6134(0x238)][_0x3c6134(0x278)](_0x3c6134(0x37c));if(_tabContentPeer)_tabContentPeer[_0x3c6134(0x238)][_0x3c6134(0x2d9)](_0x3c6134(0x22a));}else{if(_0x12316c===_0x3c6134(0x1e9)){netConnType=_0x3c6134(0x1e9);if(_tabCloud)_tabCloud[_0x3c6134(0x238)][_0x3c6134(0x278)](_0x3c6134(0x37c));if(_tabContentCloud)_tabContentCloud[_0x3c6134(0x238)][_0x3c6134(0x2d9)](_0x3c6134(0x22a));}else{if(_0x12316c==='ws'){netConnType='ws';if(_tabWS)_tabWS[_0x3c6134(0x238)][_0x3c6134(0x278)]('active');if(_tabContentWS)_tabContentWS['classList'][_0x3c6134(0x2d9)](_0x3c6134(0x22a));}}}}function _0x2c82(_0x4f55aa,_0x4cc2d3){_0x4f55aa=_0x4f55aa-0x1ad;const _0x29f48b=_0x29f4();let _0x2c82f4=_0x29f48b[_0x4f55aa];return _0x2c82f4;}if(_tabPeer)_tabPeer[_0x37194f(0x265)](_0x37194f(0x2b2),()=>_showTab(_0x37194f(0x1f5)));function _0x29f4(){const _0x508c7=['step','arc','restartGame','...','_startPing','p2EnergyBox','cloudHostBtn','masterGain','P1\x20ЭНЕРГИЯ','min','opacity','lineTo','mousemove','shadowColor','addEventListener','value','orb','netStatus','now','Переподключение\x20(','wss://broker.emqx.io:8084/mqtt','nebuladrift/rooms/','rgba(255,\x2068,\x2068,\x200.3)','musicMode','pulse','score-glow','_maxReconnects','combo-border','p2EnergyFill','toUpperCase','laser','enemies','#ff4444','add','_senderId','player_left','Escape','phase','text','🟢\x20СОЕДИНЕНИЕ\x20УСТАНОВЛЕНО!\x20P2P\x20прямое\x20⚡','pulsePhase','energy','damageVignette','pingMs','offsetHeight','🟢\x20Cloud:\x20подключён\x20к\x20комнате\x20','linearRampToValueAtTime','finalKills','_pong','CLIENT_INPUT','name','nebula','AudioContext','open','tabWS','clientX','wsCopyCodeBtn','#ff2ecb','boostSpeed','bold\x2010px\x20Orbitron','save','powerupTimer','center','#ff2222','maxHp','ShiftLeft','secondaryColor','waveAnnounce','#ffaa22','_onStatusChange','#4a3a5c','room_created','comboTimer','translate','heartbeat','netStatusHud','waiting','textAlign','🔴\x20Введите\x20код\x20комнаты!','friction','rgba(100,\x20200,\x20255,\x200.3)','mousedown','init','hud','setItem','reconnect','maxRadius','stroke','wave','playShieldHit','restartBtn','click','🟡\x20Подключение\x20к\x20Cloud\x20WSS...','🔴\x20Хост\x20не\x20отвечает.\x20Проверь\x20код\x20или\x20попробуй\x20Cloud\x20WSS\x20☁️','life','burst','rgba(255,\x20120,\x2030,\x20','color','<div\x20class=\x22shield-icon\x20','🔴\x20Игрок\x20отключился','trim','_wsUrl','#0f0','ws://','particle','start','netPanel','modeNet','setMusicMode','push','gameover','tabContentPeer','cos','pulseSpeed','peerConn','playExplosion','maxSpeed','innerText','_startCloudPing','join_room','floatingText','ЗАМЕДЛЕНИЕ','lowpass','transparent','musicInterval','scoreValue',')...','random','finalCombo','rapid','remove','_pingInterval','splice','hostBtn','stun:stun.l.google.com:19302','ceil','innerHeight','boss','frequency','paused','\x20СБИТ!\x20🆘','bass','_onData','speed','flash-white','shadowBlur','comboValue','wsRoomCode','createLinearGradient','_peerConnectTimer','#00d4ff','powerupName','message','close','game_data','downed','🔴\x20','disconnected','type','_stopPing','_netFrameCounter','startMusicLoop','send','fillText','9pFKlrT','powerupFill','stun:stun.cloudflare.com:3478','createBufferSource','toLowerCase','_handleWSMessage','explosion','🟡\x20Cloud\x20WSS\x20(попытка\x20','peer-unavailable','🟢\x20Игрок\x202\x20подключился!','_sendQueue','playGameOver','293456emdMTn','🟢\x20Игрок\x202\x20подключился!\x20Можно\x20начинать!','closePath','OPEN','#ffffff','getItem','createGain','#00ffff','bold\x2012px\x20Orbitron','🔴\x20Не\x20удалось\x20подключиться:\x20','connectWS','code','abs','roomCode','_connectMqtt','status-dot\x20','muteBtn','#ff0000','mine','cloudJoinInput','#000','isCalmPeriod','shift','createBiquadFilter','/3)...','preventDefault','#804000','885170VKklEK','🔴\x20Хост\x20не\x20найден.\x20Проверь\x20код\x20комнаты.','joinInput','ВЗРЫВ\x20ЩИТА','tabContentCloud','trySend','spawnTimer','substring','square','sawtooth','forEach','bossFill','keydown','🔴\x20Ошибка\x20подключения\x20к\x20серверу','filter','rotation','player_joined','--ms','gameCanvas','addColorStop','32ghBRvF','sound','getChannelData','wsJoinIpInput','#ff6644','alpha','playOrb','stun:stun1.l.google.com:19302','invincible','🟡\x20Создание\x20комнаты\x20(P2P)...','strokeStyle','myClientId','mouseup','#00ff88','floor','json','kills','#6e5a80','\x20—\x20ожидание\x20игрока...','_lerpAlpha','bestScore','targetY','#666','magnet','bossWarning','layer','bossDisplay','maxLife','subscribe','tabPeer','3000','data','🟢\x20Подключён:\x20','7KuOtVn','reconnectText','triangle','find','serverIpDisplay','_reconnectAttempts','waveAnnounceNum','width','connectPeerHost','screenFlash','PLAYING','destroy','\x22></div>','joinBtn','wsHostBtn','controls1P','cloudRoomDisplay','disconnect','host','\x20🛡️','NET','🔴\x20PeerJS\x20недоступен,\x20попробуйте\x20Cloud\x20WSS','size','/stream','arrowup','connectPeerClient','fillRect','PAUSED','_doPeerConnect','🟡\x20Переподключение\x20к\x20PeerJS...','energyFill','КОД\x20СКОПИРОВАН!\x20📋','8435904wdXyxE','pauseOverlay','globalAlpha','flash-color','_tryReconnectWS','active','webkitAudioContext','pong','wsJoinPortInput','shieldIcons','playing','beginPath','\x20—\x20жди\x20игрока!','🔴\x20Введите\x20IP-адрес\x20хоста!','asteroid','end','enter','currentTime','activePowerup','_cloud_join','MENU','copyCodeBtn','_startPeerPing','mode','NumpadDecimal','9462536PolgcR','🟢\x20Cloud\x20комната:\x20','ping','rgba(180,\x20160,\x20210,\x200.5)','rotate','serverInfo','🔴\x20Cloud\x20WSS\x20разорван','_setupPeerConn','length','sampleRate','connectCloudHost','className','accel','🔴\x20P2P\x20ошибка:\x20','🔴\x20Все\x20Cloud\x20WSS\x20брокеры\x20недоступны.\x20Используйте\x20PeerJS\x20P2P!','targetId','vertices','atan2','targetX','setValueAtTime','cloudJoinBtn','reconnectBanner','gameplay','#ff6600','tabCloud','nebulaDriftBest','isShooting','toString','_destroyPeer','#ff0055','playBossWarning','twinklePhase','writeText','🟡\x20Вход\x20в\x20Cloud\x20комнату\x20','23355420RGXNdO','button','font','P_SYNC','lost','#5c3a4e','\x20🔋','#aa00ff','stun:stun2.l.google.com:19302','unavailable-id','connected','_updateStatus','#ffc800','http://<ваш-IP>:','159710UumlWL','musicGain','cloud','ctx','room_joined','#64c8ff','connectCloudClient','arp','shootCooldown','arrowright','shootRate','МАГНИТ','restore','tabContentWS','peer','connecting','keyup','clipboard','nebuladrift-','animation','ПУЛЕМЁТ','moveTo','wsJoinCodeInput','powerupMaxTime','_connectWS','wss://broker.hivemq.com:8884/mqtt','🟢\x20Cloud:\x20Игрок\x202\x20подключился!','КЛИЕНТ','createOscillator','lasers','slowmo','kick','792254tTXuMe','_ping','🔴\x20Не\x20удалось\x20переподключиться','pingValue','#ff7700','events','УСИЛЕНИЕ','🟡\x20Переподключение\x20(','🟡\x20Подключение\x20к\x20серверу...','stop','create_room','exponentialRampToValueAtTime','angle','resize','lifetime','powerupDisplay','isBoosting','#7b2ff7','fill','sine','isConnected','mode1P','powerupLabel','#f00','killsValue','lineWidth','heartbeat_ack','117aEKCtE','shockwave','playLaser','muted','fillStyle','arrowdown','boostColor','🔴\x20Соединение\x20разорвано','hidden','setCallbacks','createBuffer','rotSpeed','toggleMute','p1Label','gameOver','cloudCopyCodeBtn','menu','playWaveStart','max','stringify','ShiftRight','0.8','classList','height','🔴\x20PeerJS\x20сервер\x20не\x20отвечает.\x20Используйте\x20Cloud\x20WSS\x20☁️','🟢\x20Код:\x20','hypot','error','getElementById','ХОСТ','startBtn','isHost','_reconnectTimer','innerHTML','none','#fff','connect','mqttClient','_iceConfig','startGame','radius','trail','wsPortInput','style','finalScore','key','map','ПРИШЁЛ\x20НА\x20ПОМОЩЬ!\x20❤️','waveStart','finalWave','sin','gain','readyState'];_0x29f4=function(){return _0x508c7;};return _0x29f4();}if(_tabCloud)_tabCloud['addEventListener'](_0x37194f(0x2b2),()=>_showTab(_0x37194f(0x1e9)));if(_tabWS)_tabWS['addEventListener']('click',()=>_showTab('ws'));netManager[_0x37194f(0x22b)](handleNetData,(_0x364c1c,_0x4273bb)=>{const _0xb1c218=_0x37194f,_0x2edeb3=document[_0xb1c218(0x23e)](_0xb1c218(0x268));if(_0x2edeb3)_0x2edeb3[_0xb1c218(0x2cc)]=_0x4273bb;const _0x52a4d8=document[_0xb1c218(0x23e)]('netDot');_0x52a4d8&&(_0x52a4d8[_0xb1c218(0x1c2)]=_0xb1c218(0x316)+(_0x364c1c===_0xb1c218(0x1e3)?_0xb1c218(0x1e3):_0x364c1c===_0xb1c218(0x1f6)||_0x364c1c==='waiting'?_0xb1c218(0x1f6):_0xb1c218(0x2f4))),_0x364c1c==='connected'&&(isNetHost=netManager['isHost'],netPlayerRole=isNetHost?0x1:0x2,showReconnectBanner(![]));});const _cloudHostBtn=document[_0x37194f(0x23e)](_0x37194f(0x25d)),_cloudCopyCodeBtn=document['getElementById'](_0x37194f(0x231)),_cloudJoinBtn=document['getElementById'](_0x37194f(0x1cb));if(_cloudHostBtn)_cloudHostBtn[_0x37194f(0x265)](_0x37194f(0x2b2),()=>{const _0x2f5dfe=_0x37194f;netManager[_0x2f5dfe(0x1c1)]();const _0x3b9539=setInterval(()=>{const _0x281693=_0x2f5dfe;if(netManager[_0x281693(0x314)]){clearInterval(_0x3b9539);const _0x372725=document[_0x281693(0x23e)](_0x281693(0x367)),_0x2e8b3f=document[_0x281693(0x23e)]('cloudRoomCode');if(_0x372725)_0x372725[_0x281693(0x238)][_0x281693(0x2d9)](_0x281693(0x22a));if(_0x2e8b3f)_0x2e8b3f[_0x281693(0x2cc)]=netManager[_0x281693(0x314)];}},0xc8);});if(_cloudCopyCodeBtn)_cloudCopyCodeBtn[_0x37194f(0x265)]('click',()=>{const _0x21ef54=_0x37194f;navigator['clipboard'][_0x21ef54(0x1d7)](netManager[_0x21ef54(0x314)]),showFloatingText(canvas[_0x21ef54(0x35e)]/0x2,canvas['height']/0x2,_0x21ef54(0x376),_0x21ef54(0x1ec));});if(_cloudJoinBtn)_cloudJoinBtn[_0x37194f(0x265)]('click',()=>{const _0x7b50be=_0x37194f,_0x44f7d4=document[_0x7b50be(0x23e)](_0x7b50be(0x31a)),_0xfc8bcb=_0x44f7d4?_0x44f7d4[_0x7b50be(0x266)][_0x7b50be(0x2bb)]()[_0x7b50be(0x274)]():'';if(!_0xfc8bcb)return;netManager[_0x7b50be(0x1ed)](_0xfc8bcb);});const _wsHostBtn=document[_0x37194f(0x23e)](_0x37194f(0x365));if(_wsHostBtn)_wsHostBtn[_0x37194f(0x265)]('click',()=>{const _0x386b1d=_0x37194f,_0x19b897=document[_0x386b1d(0x23e)](_0x386b1d(0x24c))[_0x386b1d(0x266)][_0x386b1d(0x2bb)]()||_0x386b1d(0x354),_0x5017ca='localhost';netManager[_0x386b1d(0x311)](_0x5017ca,_0x19b897,'',!![]);const _0x331896=setInterval(()=>{const _0x28098a=_0x386b1d;netManager[_0x28098a(0x314)]&&(clearInterval(_0x331896),document['getElementById']('wsRoomDisplay')['classList']['remove']('hidden'),document[_0x28098a(0x23e)](_0x28098a(0x2ea))[_0x28098a(0x2cc)]=netManager[_0x28098a(0x314)],document[_0x28098a(0x23e)](_0x28098a(0x1bc))[_0x28098a(0x238)][_0x28098a(0x2d9)](_0x28098a(0x22a)),document[_0x28098a(0x23e)](_0x28098a(0x35b))['innerText']=_0x28098a(0x1e6)+_0x19b897);},0xc8);});const _wsCopyCodeBtn=document[_0x37194f(0x23e)](_0x37194f(0x28f));if(_wsCopyCodeBtn)_wsCopyCodeBtn[_0x37194f(0x265)](_0x37194f(0x2b2),()=>{const _0x4244dc=_0x37194f;navigator[_0x4244dc(0x1f8)][_0x4244dc(0x1d7)](netManager[_0x4244dc(0x314)]),showFloatingText(canvas['width']/0x2,canvas[_0x4244dc(0x239)]/0x2,_0x4244dc(0x376),_0x4244dc(0x1ec));});const _wsJoinBtn=document[_0x37194f(0x23e)]('wsJoinBtn');if(_wsJoinBtn)_wsJoinBtn['addEventListener'](_0x37194f(0x2b2),()=>{const _0x115a8b=_0x37194f,_0x5a44c4=document['getElementById'](_0x115a8b(0x339))['value'][_0x115a8b(0x2bb)](),_0x5260d3=document[_0x115a8b(0x23e)](_0x115a8b(0x37f))['value'][_0x115a8b(0x2bb)]()||'3000',_0x3bfee7=document['getElementById'](_0x115a8b(0x1fd))[_0x115a8b(0x266)][_0x115a8b(0x2bb)]()[_0x115a8b(0x274)]();if(!_0x5a44c4){document['getElementById'](_0x115a8b(0x268))['innerText']=_0x115a8b(0x384);return;}if(!_0x3bfee7){document[_0x115a8b(0x23e)](_0x115a8b(0x268))['innerText']=_0x115a8b(0x2a5);return;}netManager[_0x115a8b(0x311)](_0x5a44c4,_0x5260d3,_0x3bfee7,![]);});const _hostBtn=document[_0x37194f(0x23e)](_0x37194f(0x2dc));if(_hostBtn)_hostBtn[_0x37194f(0x265)](_0x37194f(0x2b2),()=>{const _0x440ccc=_0x37194f;netManager[_0x440ccc(0x35f)]();const _0xb9876d=setInterval(()=>{const _0x587380=_0x440ccc;netManager[_0x587380(0x314)]&&(clearInterval(_0xb9876d),document[_0x587380(0x23e)]('roomDisplay')[_0x587380(0x238)][_0x587380(0x2d9)](_0x587380(0x22a)),document['getElementById'](_0x587380(0x314))['innerText']=netManager[_0x587380(0x314)]);},0xc8);});const _copyCodeBtn=document[_0x37194f(0x23e)](_0x37194f(0x1b3));if(_copyCodeBtn)_copyCodeBtn['addEventListener'](_0x37194f(0x2b2),()=>{const _0xb7a8e=_0x37194f;navigator['clipboard'][_0xb7a8e(0x1d7)](netManager[_0xb7a8e(0x314)]),showFloatingText(canvas['width']/0x2,canvas[_0xb7a8e(0x239)]/0x2,_0xb7a8e(0x376),_0xb7a8e(0x1ec));});const _joinBtn=document['getElementById'](_0x37194f(0x364));if(_joinBtn)_joinBtn[_0x37194f(0x265)](_0x37194f(0x2b2),()=>{const _0x4dfb36=_0x37194f,_0x28bedf=document['getElementById'](_0x4dfb36(0x324))['value'][_0x4dfb36(0x2bb)]()[_0x4dfb36(0x274)]();if(!_0x28bedf)return;netManager[_0x4dfb36(0x370)](_0x28bedf);});function showReconnectBanner(_0x3ab192,_0x3017e1,_0x15f839){const _0x17bb50=_0x37194f,_0x71b5a3=document['getElementById'](_0x17bb50(0x1cc));_0x3ab192?(_0x71b5a3[_0x17bb50(0x238)][_0x17bb50(0x2d9)]('hidden'),document[_0x17bb50(0x23e)](_0x17bb50(0x358))[_0x17bb50(0x2cc)]=_0x17bb50(0x26a)+_0x3017e1+'/'+_0x15f839+_0x17bb50(0x2d5)):_0x71b5a3[_0x17bb50(0x238)][_0x17bb50(0x278)](_0x17bb50(0x22a));}function handleNetData(_0x290841){const _0x5e15d1=_0x37194f;if(!_0x290841||!_0x290841[_0x5e15d1(0x2f5)])return;if(_0x290841.type==='UPGRADE_PAUSE'&&!isNetHost){showNetworkUpgradeWait(_0x290841.level);return;}if(_0x290841.type==='UPGRADE_RESUME'&&!isNetHost){hideNetworkUpgradeWait();return;}if(_0x290841[_0x5e15d1(0x2f5)]==='CLIENT_INPUT'&&isNetHost)lastNetClientInput={'dx':_0x290841['dx']||0x0,'dy':_0x290841['dy']||0x0,'angle':_0x290841[_0x5e15d1(0x213)]||0x0,'isShooting':!!_0x290841[_0x5e15d1(0x1d1)],'isBoosting':!!_0x290841[_0x5e15d1(0x217)]};else{if(_0x290841[_0x5e15d1(0x2f5)]===_0x5e15d1(0x1dc)&&!isNetHost){const _0x586461=players[0x0],_0x37a2d9=Math[_0x5e15d1(0x23c)](_0x586461['x']-_0x290841['p1']['x'],_0x586461['y']-_0x290841['p1']['y']),_0x350fd7=_0x37a2d9>0x50?0x1:0.4;_0x586461[_0x5e15d1(0x1c9)]=_0x290841['p1']['x'],_0x586461['targetY']=_0x290841['p1']['y'],_0x586461[_0x5e15d1(0x349)]=_0x350fd7,_0x586461['vx']=_0x290841['p1']['vx']||0x0,_0x586461['vy']=_0x290841['p1']['vy']||0x0,_0x586461[_0x5e15d1(0x213)]=_0x290841['p1']['angle'],_0x586461[_0x5e15d1(0x280)]=_0x290841['p1'][_0x5e15d1(0x280)],_0x586461[_0x5e15d1(0x2f2)]=_0x290841['p1'][_0x5e15d1(0x2f2)],_0x586461[_0x5e15d1(0x33e)]=_0x290841['p1'][_0x5e15d1(0x33e)]||0x0,_0x586461[_0x5e15d1(0x2e6)]=_0x290841['p1'][_0x5e15d1(0x2e6)]||0x0;const _0x38ed47=players[0x1],_0x3df8ee=Math[_0x5e15d1(0x23c)](_0x38ed47['x']-_0x290841['p2']['x'],_0x38ed47['y']-_0x290841['p2']['y']);_0x3df8ee>0x3c||_0x38ed47['x']<0x0||_0x38ed47['y']<0x0?(_0x38ed47['x']=_0x290841['p2']['x'],_0x38ed47['y']=_0x290841['p2']['y'],_0x38ed47['vx']=_0x290841['p2']['vx']||0x0,_0x38ed47['vy']=_0x290841['p2']['vy']||0x0):(_0x38ed47['x']=lerp(_0x38ed47['x'],_0x290841['p2']['x'],0.3),_0x38ed47['y']=lerp(_0x38ed47['y'],_0x290841['p2']['y'],0.3)),_0x38ed47[_0x5e15d1(0x280)]=_0x290841['p2'][_0x5e15d1(0x280)],_0x38ed47[_0x5e15d1(0x2f2)]=_0x290841['p2']['downed'];}else{if(_0x290841[_0x5e15d1(0x2f5)]==='HOST_STATE'&&!isNetHost){score=_0x290841['score'],wave=_0x290841[_0x5e15d1(0x2af)],shields=_0x290841['shields'],maxShields=_0x290841['maxShields']||3,experience=_0x290841['experience']||0,pilotLevel=_0x290841['level']||1,kills=_0x290841[_0x5e15d1(0x346)],combo=_0x290841['combo'],comboTimer=_0x290841[_0x5e15d1(0x29f)]||0x0,activePowerup=_0x290841[_0x5e15d1(0x1b0)]||null,powerupTimer=_0x290841[_0x5e15d1(0x294)]||0x0,powerupMaxTime=_0x290841[_0x5e15d1(0x1fe)]||0x0,gameTime=_0x290841['gameTime']||0x0,isCalmPeriod=_0x290841[_0x5e15d1(0x31c)]||![];refreshExperienceHud();const _0xb722c0=players[0x0];_0xb722c0[_0x5e15d1(0x1c9)]=_0x290841['p1']['x'],_0xb722c0[_0x5e15d1(0x34b)]=_0x290841['p1']['y'],_0xb722c0['vx']=_0x290841['p1']['vx']||0x0,_0xb722c0['vy']=_0x290841['p1']['vy']||0x0,_0xb722c0['angle']=_0x290841['p1']['angle'],_0xb722c0[_0x5e15d1(0x280)]=_0x290841['p1'][_0x5e15d1(0x280)],_0xb722c0[_0x5e15d1(0x2f2)]=_0x290841['p1'][_0x5e15d1(0x2f2)];const _0x18874f=players[0x1];_0x18874f['energy']=_0x290841['p2'][_0x5e15d1(0x280)],_0x18874f[_0x5e15d1(0x2f2)]=_0x290841['p2'][_0x5e15d1(0x2f2)],[_0xb722c0,_0x18874f]['forEach'](_0x99f798=>{const _0x36d5ff=_0x5e15d1;if(_0x99f798[_0x36d5ff(0x37c)]&&!_0x99f798[_0x36d5ff(0x2f2)]&&_0x99f798[_0x36d5ff(0x2e6)]>0.5){_0x99f798['trail']['push']({'x':_0x99f798['x'],'y':_0x99f798['y'],'life':0x1e});if(_0x99f798[_0x36d5ff(0x24b)][_0x36d5ff(0x1bf)]>0x3c)_0x99f798[_0x36d5ff(0x24b)][_0x36d5ff(0x31d)]();}_0x99f798['trail']=_0x99f798[_0x36d5ff(0x24b)][_0x36d5ff(0x330)](_0x4268ed=>{const _0x33c63b=_0x36d5ff;return _0x4268ed[_0x33c63b(0x2b5)]--,_0x4268ed[_0x33c63b(0x2b5)]>0x0;});}),asteroids=(_0x290841['asteroids']||[])[_0x5e15d1(0x250)](_0x3defa8=>{const _0x882156=_0x5e15d1;if(!_0x3defa8[_0x882156(0x1c7)]||_0x3defa8['vertices']['length']===0x0){const _0x388967=[],_0x5ba482=0x8;for(let _0x34ac10=0x0;_0x34ac10<_0x5ba482;_0x34ac10++){const _0x2d9bae=_0x34ac10/_0x5ba482*Math['PI']*0x2;_0x388967['push']({'x':Math[_0x882156(0x2c7)](_0x2d9bae)*_0x3defa8[_0x882156(0x24a)]*(0.7+Math[_0x882156(0x2d6)]()*0.6),'y':Math['sin'](_0x2d9bae)*_0x3defa8[_0x882156(0x24a)]*(0.7+Math[_0x882156(0x2d6)]()*0.6)});}_0x3defa8[_0x882156(0x1c7)]=_0x388967;}return _0x3defa8;}),enemies=_0x290841[_0x5e15d1(0x276)]||[],orbs=_0x290841['orbs']||[],lasers=_0x290841[_0x5e15d1(0x204)]||[],powerups=_0x290841['powerups']||[];if(_0x290841[_0x5e15d1(0x2e0)])boss=_0x290841['boss'],document[_0x5e15d1(0x23e)]('bossDisplay')['classList'][_0x5e15d1(0x2d9)]('hidden'),document[_0x5e15d1(0x23e)](_0x5e15d1(0x32d))['style']['width']=boss['hp']/boss[_0x5e15d1(0x297)]*0x64+'%';else{if(boss)document[_0x5e15d1(0x23e)](_0x5e15d1(0x350))[_0x5e15d1(0x238)]['add'](_0x5e15d1(0x22a));boss=null;}_0x290841[_0x5e15d1(0x20c)]&&_0x290841[_0x5e15d1(0x20c)][_0x5e15d1(0x32c)](_0x2da5af=>{const _0x4aaef8=_0x5e15d1;if(_0x2da5af['type']===_0x4aaef8(0x301))spawnExplosion(_0x2da5af['x'],_0x2da5af['y'],_0x2da5af[_0x4aaef8(0x36d)]);else{if(_0x2da5af[_0x4aaef8(0x2f5)]===_0x4aaef8(0x337)){if(_0x2da5af[_0x4aaef8(0x289)]===_0x4aaef8(0x275))sounds[_0x4aaef8(0x224)]();else{if(_0x2da5af[_0x4aaef8(0x289)]==='explosion')sounds[_0x4aaef8(0x2ca)]();else{if(_0x2da5af[_0x4aaef8(0x289)]===_0x4aaef8(0x267))sounds['playOrb']();else{if(_0x2da5af[_0x4aaef8(0x289)]==='shieldHit')sounds[_0x4aaef8(0x2b0)]();else{if(_0x2da5af[_0x4aaef8(0x289)]===_0x4aaef8(0x252))sounds[_0x4aaef8(0x233)]();else{if(_0x2da5af[_0x4aaef8(0x289)]===_0x4aaef8(0x34e))sounds[_0x4aaef8(0x1d5)]();}}}}}}else{if(_0x2da5af[_0x4aaef8(0x2f5)]==='floatingText')showFloatingText(_0x2da5af['x'],_0x2da5af['y'],_0x2da5af[_0x4aaef8(0x27d)],_0x2da5af[_0x4aaef8(0x2b8)]);else{if(_0x2da5af[_0x4aaef8(0x2f5)]==='musicMode')sounds[_0x4aaef8(0x2c3)](_0x2da5af[_0x4aaef8(0x1b5)]);else{if(_0x2da5af['type']===_0x4aaef8(0x29a))announceWave(_0x2da5af[_0x4aaef8(0x2af)]);else _0x2da5af[_0x4aaef8(0x2f5)]===_0x4aaef8(0x230)&&gameOver();}}}}}),_0x290841[_0x5e15d1(0x1b0)]?(document[_0x5e15d1(0x23e)](_0x5e15d1(0x216))['classList']['remove']('hidden'),document[_0x5e15d1(0x23e)](_0x5e15d1(0x21d))[_0x5e15d1(0x2cc)]=_0x290841[_0x5e15d1(0x2ee)]||_0x5e15d1(0x20d)):document['getElementById']('powerupDisplay')[_0x5e15d1(0x238)][_0x5e15d1(0x278)]('hidden');}}}}let netEvents=[];function pushNetEvent(_0x1ea1e9){const _0x390ce6=_0x37194f;gameMode===_0x390ce6(0x36b)&&isNetHost&&netEvents[_0x390ce6(0x2c4)](_0x1ea1e9);}const keys={};let mouseX=0x0,mouseY=0x0,mouseDown=![],mouseRightDown=![];window[_0x37194f(0x265)](_0x37194f(0x32e),_0x518f17=>{const _0x4413f2=_0x37194f;sounds[_0x4413f2(0x2a9)](),keys[_0x518f17[_0x4413f2(0x24f)][_0x4413f2(0x2ff)]()]=!![],keys[_0x518f17['code']]=!![];if(_0x518f17['key']===_0x4413f2(0x27b)&&gameState===STATE[_0x4413f2(0x361)])gameState=STATE['PAUSED'],document[_0x4413f2(0x23e)](_0x4413f2(0x378))[_0x4413f2(0x238)][_0x4413f2(0x2d9)]('hidden');else _0x518f17['key']===_0x4413f2(0x27b)&&gameState===STATE[_0x4413f2(0x372)]&&(gameState=STATE[_0x4413f2(0x361)],document['getElementById'](_0x4413f2(0x378))['classList'][_0x4413f2(0x278)]('hidden'));}),window[_0x37194f(0x265)](_0x37194f(0x1f7),_0x2e706b=>{const _0xdef4e3=_0x37194f;keys[_0x2e706b[_0xdef4e3(0x24f)][_0xdef4e3(0x2ff)]()]=![],keys[_0x2e706b[_0xdef4e3(0x312)]]=![];}),window[_0x37194f(0x265)](_0x37194f(0x263),_0x4ecd17=>{const _0x4aad99=_0x37194f;mouseX=_0x4ecd17[_0x4aad99(0x28e)],mouseY=_0x4ecd17['clientY'];}),window[_0x37194f(0x265)](_0x37194f(0x2a8),_0x2d61d2=>{const _0x5d45ad=_0x37194f;sounds[_0x5d45ad(0x2a9)]();if(_0x2d61d2[_0x5d45ad(0x1da)]===0x0)mouseDown=!![];if(_0x2d61d2[_0x5d45ad(0x1da)]===0x2)mouseRightDown=!![];}),window[_0x37194f(0x265)](_0x37194f(0x342),_0x3b2a0c=>{const _0x386b49=_0x37194f;if(_0x3b2a0c['button']===0x0)mouseDown=![];if(_0x3b2a0c[_0x386b49(0x1da)]===0x2)mouseRightDown=![];}),window['addEventListener']('contextmenu',_0x59aac5=>_0x59aac5[_0x37194f(0x320)]()),document[_0x37194f(0x23e)](_0x37194f(0x317))[_0x37194f(0x265)]('click',()=>{const _0x211a6c=_0x37194f,_0x298deb=sounds[_0x211a6c(0x22e)]();document[_0x211a6c(0x23e)](_0x211a6c(0x317))[_0x211a6c(0x2cc)]=_0x298deb?'🔇':'🔊';});function rand(_0x1ea40a,_0x279ed8){const _0x4ce5a9=_0x37194f;return Math[_0x4ce5a9(0x2d6)]()*(_0x279ed8-_0x1ea40a)+_0x1ea40a;}function randInt(_0x19a3de,_0x317ff1){const _0x1d293d=_0x37194f;return Math[_0x1d293d(0x344)](rand(_0x19a3de,_0x317ff1));}function dist(_0x1870fa,_0x1dce6c){const _0x5d8cdf=_0x37194f;return Math[_0x5d8cdf(0x23c)](_0x1870fa['x']-_0x1dce6c['x'],_0x1870fa['y']-_0x1dce6c['y']);}function lerp(_0x155075,_0x1d8a37,_0x27fc1b){return _0x155075+(_0x1d8a37-_0x155075)*_0x27fc1b;}function clamp(_0x2185e8,_0x46d2c9,_0x69278d){const _0x8a4bd6=_0x37194f;return Math[_0x8a4bd6(0x234)](_0x46d2c9,Math[_0x8a4bd6(0x260)](_0x69278d,_0x2185e8));}const players=[{'id':0x1,'name':'P1','active':!![],'downed':![],'x':0x0,'y':0x0,'vx':0x0,'vy':0x0,'angle':-Math['PI']/0x2,'speed':0x0,'maxSpeed':0x6,'boostSpeed':0xa,'accel':0.25,'friction':0.97,'radius':0x10,'trail':[],'invincible':0x0,'shootCooldown':0x0,'shootRate':0xf,'energy':0x64,'color':'#64c8ff','secondaryColor':'#00d4ff','boostColor':'#00d4ff'},{'id':0x2,'name':'P2','active':![],'downed':![],'x':0x0,'y':0x0,'vx':0x0,'vy':0x0,'angle':-Math['PI']/0x2,'speed':0x0,'maxSpeed':0x6,'boostSpeed':0xa,'accel':0.25,'friction':0.97,'radius':0x10,'trail':[],'invincible':0x0,'shootCooldown':0x0,'shootRate':0xf,'energy':0x64,'color':_0x37194f(0x20b),'secondaryColor':'#ff0055','boostColor':_0x37194f(0x1d4)}];let stars=[],nebulaBlobs=[],asteroids=[],shards=[],orbs=[],particles=[],explosions=[],floatingTexts=[],lasers=[],enemies=[],powerups=[],boss=null;const COLORS={'trail':[_0x37194f(0x2ed),_0x37194f(0x218),_0x37194f(0x290)],'orb':[_0x37194f(0x343),_0x37194f(0x2ed),_0x37194f(0x1e5),_0x37194f(0x290)],'asteroid':[_0x37194f(0x29d),'#5c4a6e',_0x37194f(0x347)],'nebula':[{'r':0x14,'g':0xa,'b':0x3c},{'r':0x3c,'g':0xa,'b':0x28},{'r':0xa,'g':0x1e,'b':0x3c},{'r':0x28,'g':0x5,'b':0x32}],'particle':[_0x37194f(0x33a),_0x37194f(0x29b),'#ffdd44','#ff2ecb',_0x37194f(0x2ed)]};function initStars(){
    stars = [];
    const count = getGraphicsPreset().starCount;
    for (let index = 0; index < count; index += 1) {
        stars.push({
            x: rand(0, canvas.width),
            y: rand(0, canvas.height),
            size: rand(0.5, 2.5),
            brightness: rand(0.3, 1),
            layer: randInt(1, 4),
            twinklePhase: rand(0, Math.PI * 2),
            twinkleSpeed: rand(0.01, 0.05)
        });
    }
}
function initNebula(){
    nebulaBlobs = [];
    const count = getGraphicsPreset().nebulaCount;
    for (let index = 0; index < count; index += 1) {
        nebulaBlobs.push({
            x: rand(0, canvas.width),
            y: rand(0, canvas.height),
            radius: rand(150, 400),
            color: COLORS.nebula[index % COLORS.nebula.length],
            alpha: rand(0.03, 0.075),
            vx: rand(-0.15, 0.15),
            vy: rand(-0.15, 0.15),
            phase: rand(0, Math.PI * 2),
            pulseSpeed: rand(0.003, 0.008)
        });
    }
}
function spawnAsteroid(_0xf7c2e5,_0x433cd3,_0x281202){const _0x5d70e3=_0x37194f,_0x308489=0x64;_0xf7c2e5=_0xf7c2e5!==undefined?_0xf7c2e5:rand(0x0,0x1)>0.5?rand(-_0x308489,canvas[_0x5d70e3(0x35e)]+_0x308489):rand(0x0,0x1)>0.5?-_0x308489:canvas['width']+_0x308489,_0x433cd3=_0x433cd3!==undefined?_0x433cd3:_0xf7c2e5<0x0||_0xf7c2e5>canvas[_0x5d70e3(0x35e)]?rand(-_0x308489,canvas[_0x5d70e3(0x239)]+_0x308489):rand(0x0,0x1)>0.5?-_0x308489:canvas['height']+_0x308489;const _0x47188a=rand(canvas[_0x5d70e3(0x35e)]*0.2,canvas['width']*0.8),_0x534501=rand(canvas['height']*0.2,canvas[_0x5d70e3(0x239)]*0.8),_0x11222f=Math['atan2'](_0x534501-_0x433cd3,_0x47188a-_0xf7c2e5),_0x1c41c6=rand(0x1,2.5)*difficultyMult,_0x2c496b=_0x281202||rand(0x16,0x37),_0x3a5698=[],_0x46f444=randInt(0x7,0xb);for(let _0x2c2a3a=0x0;_0x2c2a3a<_0x46f444;_0x2c2a3a++){const _0x37e696=_0x2c2a3a/_0x46f444*Math['PI']*0x2;_0x3a5698[_0x5d70e3(0x2c4)]({'x':Math['cos'](_0x37e696)*_0x2c496b*rand(0.7,1.3),'y':Math[_0x5d70e3(0x254)](_0x37e696)*_0x2c496b*rand(0.7,1.3)});}asteroids[_0x5d70e3(0x2c4)]({'x':_0xf7c2e5,'y':_0x433cd3,'vx':Math[_0x5d70e3(0x2c7)](_0x11222f)*_0x1c41c6,'vy':Math['sin'](_0x11222f)*_0x1c41c6,'radius':_0x2c496b,'rotation':0x0,'rotSpeed':rand(-0.02,0.02),'vertices':_0x3a5698,'color':COLORS[_0x5d70e3(0x385)][randInt(0x0,0x3)],'hp':Math[_0x5d70e3(0x2de)](_0x2c496b/0x14),'maxHp':Math['ceil'](_0x2c496b/0x14)});}function spawnAsteroidShards(_0x4d268e,_0x1f75f9){const _0x1bdadf=_0x37194f,_0x22e155=randInt(0x5,0x8);for(let _0xc49c83=0x0;_0xc49c83<_0x22e155;_0xc49c83++){const _0x11ea2d=_0xc49c83/_0x22e155*Math['PI']*0x2+rand(-0.2,0.2),_0x30b6de=rand(2.5,6.5),_0x4e14f6=_0x4d268e['radius']*rand(0.2,0.45),_0x17d119=randInt(0x4,0x6),_0x6619fb=[];for(let _0x3a4a94=0x0;_0x3a4a94<_0x17d119;_0x3a4a94++){const _0x436db5=_0x3a4a94/_0x17d119*Math['PI']*0x2;_0x6619fb['push']({'x':Math[_0x1bdadf(0x2c7)](_0x436db5)*_0x4e14f6*rand(0.6,1.2),'y':Math[_0x1bdadf(0x254)](_0x436db5)*_0x4e14f6*rand(0.6,1.2)});}shards['push']({'x':_0x4d268e['x']+Math[_0x1bdadf(0x2c7)](_0x11ea2d)*(_0x4d268e[_0x1bdadf(0x24a)]*0.3),'y':_0x4d268e['y']+Math['sin'](_0x11ea2d)*(_0x4d268e[_0x1bdadf(0x24a)]*0.3),'vx':_0x4d268e['vx']*0.4+Math[_0x1bdadf(0x2c7)](_0x11ea2d)*_0x30b6de+(_0x1f75f9?_0x1f75f9['x']*0.2:0x0),'vy':_0x4d268e['vy']*0.4+Math['sin'](_0x11ea2d)*_0x30b6de+(_0x1f75f9?_0x1f75f9['y']*0.2:0x0),'radius':_0x4e14f6,'vertices':_0x6619fb,'rotation':rand(0x0,Math['PI']*0x2),'rotSpeed':rand(-0.1,0.1),'color':_0x4d268e['color'],'life':randInt(0x28,0x50),'maxLife':0x50});}}function spawnOrb(_0x548f9e,_0x4f1d8d){const _0x4f3d8b=_0x37194f;orbs['push']({'x':_0x548f9e||rand(0x3c,canvas['width']-0x3c),'y':_0x4f1d8d||rand(0x3c,canvas[_0x4f3d8b(0x239)]-0x3c),'radius':0xc,'phase':rand(0x0,Math['PI']*0x2),'color':COLORS[_0x4f3d8b(0x267)][randInt(0x0,0x4)],'type':randInt(0x0,0x4),'pulsePhase':rand(0x0,Math['PI']*0x2),'lifetime':0x258});}function spawnPowerup(_0x23f24f,_0xc7420b){const _0x50fc19=_0x37194f,_0x4db83f=[{'id':_0x50fc19(0x34d),'color':_0x50fc19(0x1e5),'name':_0x50fc19(0x1f2)},{'id':_0x50fc19(0x205),'color':'#00d4ff','name':_0x50fc19(0x2d0)},{'id':_0x50fc19(0x2d8),'color':_0x50fc19(0x277),'name':_0x50fc19(0x1fb)},{'id':_0x50fc19(0x2b6),'color':'#ffffff','name':_0x50fc19(0x325)}],_0x2d331c=_0x4db83f[randInt(0x0,_0x4db83f['length'])];powerups[_0x50fc19(0x2c4)]({'x':_0x23f24f,'y':_0xc7420b,'type':_0x2d331c['id'],'color':_0x2d331c[_0x50fc19(0x2b8)],'name':_0x2d331c['name'],'radius':0xf,'lifetime':0x258,'angle':0x0});}function spawnEnemy(){const _0x4e4a38=_0x37194f,_0x48afe7=0x64,_0x3da1ec=rand(0x0,0x1)>0.5?rand(-_0x48afe7,canvas[_0x4e4a38(0x35e)]+_0x48afe7):rand(0x0,0x1)>0.5?-_0x48afe7:canvas[_0x4e4a38(0x35e)]+_0x48afe7,_0x40885f=_0x3da1ec<0x0||_0x3da1ec>canvas[_0x4e4a38(0x35e)]?rand(-_0x48afe7,canvas[_0x4e4a38(0x239)]+_0x48afe7):rand(0x0,0x1)>0.5?-_0x48afe7:canvas['height']+_0x48afe7;wave>=0x5&&rand(0x0,0x1)>0.6?enemies['push']({'x':_0x3da1ec,'y':_0x40885f,'type':_0x4e4a38(0x26f),'radius':0x19,'hp':0x2,'angle':0x0,'shockwave':0x0}):enemies[_0x4e4a38(0x2c4)]({'x':_0x3da1ec,'y':_0x40885f,'type':_0x4e4a38(0x319),'radius':0xf,'hp':0x1,'vx':0x0,'vy':0x0});}function spawnBoss(){const _0x372cea=_0x37194f;boss={'x':canvas['width']/0x2,'y':-0x64,'vx':0x0,'vy':0.5,'radius':0x50,'hp':0x1e+wave*0x5,'maxHp':0x1e+wave*0x5,'angle':0x0,'spawnTimer':0x0},sounds[_0x372cea(0x1d5)](),sounds['setMusicMode']('boss'),document[_0x372cea(0x23e)](_0x372cea(0x350))['classList'][_0x372cea(0x2d9)]('hidden'),pushNetEvent({'type':'sound','name':_0x372cea(0x34e)}),pushNetEvent({'type':_0x372cea(0x26e),'mode':_0x372cea(0x2e0)});}function spawnParticles(x, y, color, count, speed, life){
    const preset = getGraphicsPreset();
    if (preset.skipTrailParticles && count === 1 && gameTime % 2 !== 0) return;

    const scaledCount = Math.max(0, Math.round(count * preset.particleScale));
    const room = Math.max(0, preset.particleCap - particles.length);
    const particleCount = Math.min(scaledCount, room);
    for (let index = 0; index < particleCount; index += 1) {
        const angle = rand(0, Math.PI * 2);
        const particleSpeed = rand(speed * 0.3, speed);
        const particleLife = life || rand(20, 50);
        const particleMaxLife = life || rand(20, 50);
        particles.push({
            x,
            y,
            vx: Math.cos(angle) * particleSpeed,
            vy: Math.sin(angle) * particleSpeed,
            radius: rand(1, 4),
            color: color || COLORS.particle[randInt(0, COLORS.particle.length - 1)],
            life: particleLife,
            maxLife: particleMaxLife,
            friction: 0.97
        });
    }
}
function spawnExplosion(_0x3be749,_0x24f6a9,_0x2faa02){const _0x23dcce=_0x37194f;explosions[_0x23dcce(0x2c4)]({'x':_0x3be749,'y':_0x24f6a9,'radius':0x0,'maxRadius':_0x2faa02||0x3c,'life':0x1e,'maxLife':0x1e}),spawnParticles(_0x3be749,_0x24f6a9,null,0x19,0x5,0x28),screenShake=_0x2faa02/0x4,screenShakeAngle=rand(0x0,Math['PI']*0x2),sounds['playExplosion'](),flashScreen(_0x23dcce(0x2e7));}function flashScreen(_0x364efb){const _0x47338b=_0x37194f,_0x145c37=document[_0x47338b(0x23e)](_0x47338b(0x360));_0x145c37['className']='screen-flash\x20'+_0x364efb,_0x145c37[_0x47338b(0x24d)]['opacity']=_0x47338b(0x237),setTimeout(()=>_0x145c37['style'][_0x47338b(0x261)]='0',0x32);}function showFloatingText(_0x127899,_0x1a33c2,_0x2d5d17,_0x19bae0){const _0x1bcab3=_0x37194f;floatingTexts[_0x1bcab3(0x2c4)]({'x':_0x127899,'y':_0x1a33c2,'text':_0x2d5d17,'color':_0x19bae0||_0x1bcab3(0x245),'life':0x3c,'maxLife':0x3c,'vy':-0x2});}function updatePlayers(){const _0x1ae103=_0x37194f;if(gameState!==STATE['PLAYING'])return;const _0x17adcb=gameMode==='NET'&&!isNetHost,_0x569043=players[0x0];if(_0x569043['active']&&!_0x569043['downed']&&!_0x17adcb){let _0x46e8a1=0x0,_0x192a5b=0x0;if(keys['w'])_0x192a5b-=0x1;if(keys['s'])_0x192a5b+=0x1;if(keys['a'])_0x46e8a1-=0x1;if(keys['d'])_0x46e8a1+=0x1;const _0x5d1dcb=keys[_0x1ae103(0x298)]||keys[_0x1ae103(0x31d)],_0x58072c=_0x5d1dcb&&_0x569043[_0x1ae103(0x280)]>0x0?_0x569043[_0x1ae103(0x291)]:_0x569043['maxSpeed'],_0x2c7fcc=_0x5d1dcb&&_0x569043[_0x1ae103(0x280)]>0x0?_0x569043['accel']*1.8:_0x569043['accel'];if(_0x5d1dcb&&_0x569043['energy']>0x0)_0x569043['energy']=Math[_0x1ae103(0x234)](0x0,_0x569043[_0x1ae103(0x280)]-0.4);else{if(_0x46e8a1===0x0&&_0x192a5b===0x0)_0x569043[_0x1ae103(0x280)]=Math[_0x1ae103(0x260)](0x64,_0x569043[_0x1ae103(0x280)]+0.15);else _0x569043['energy']=Math[_0x1ae103(0x260)](0x64,_0x569043['energy']+0.05);}const _0x56605b=Math[_0x1ae103(0x23c)](_0x46e8a1,_0x192a5b);_0x56605b>0x0&&(_0x569043['vx']+=_0x46e8a1/_0x56605b*_0x2c7fcc,_0x569043['vy']+=_0x192a5b/_0x56605b*_0x2c7fcc);_0x569043[_0x1ae103(0x213)]=Math[_0x1ae103(0x1c8)](mouseY-_0x569043['y'],mouseX-_0x569043['x']),_0x569043['vx']*=_0x569043[_0x1ae103(0x2a6)],_0x569043['vy']*=_0x569043['friction'],_0x569043[_0x1ae103(0x2e6)]=Math[_0x1ae103(0x23c)](_0x569043['vx'],_0x569043['vy']);_0x569043[_0x1ae103(0x2e6)]>_0x58072c&&(_0x569043['vx']=_0x569043['vx']/_0x569043[_0x1ae103(0x2e6)]*_0x58072c,_0x569043['vy']=_0x569043['vy']/_0x569043[_0x1ae103(0x2e6)]*_0x58072c);_0x569043['x']+=_0x569043['vx'],_0x569043['y']+=_0x569043['vy'],wrapScreen(_0x569043);if(_0x569043[_0x1ae103(0x2e6)]>0.5){_0x569043[_0x1ae103(0x24b)][_0x1ae103(0x2c4)]({'x':_0x569043['x'],'y':_0x569043['y'],'life':0x1e});if(_0x569043[_0x1ae103(0x24b)][_0x1ae103(0x1bf)]>0x3c)_0x569043[_0x1ae103(0x24b)]['shift']();const _0x1f487e=_0x569043['x']-Math['cos'](Math[_0x1ae103(0x1c8)](_0x569043['vy'],_0x569043['vx']))*0x12,_0x4419b0=_0x569043['y']-Math[_0x1ae103(0x254)](Math['atan2'](_0x569043['vy'],_0x569043['vx']))*0x12;for(let _0x26d356=0x0;_0x26d356<(_0x5d1dcb?0x3:0x1);_0x26d356++){spawnParticles(_0x1f487e+rand(-0x4,0x4),_0x4419b0+rand(-0x4,0x4),_0x5d1dcb?_0x569043[_0x1ae103(0x228)]:_0x569043['secondaryColor'],0x1,_0x569043[_0x1ae103(0x2e6)]*0.6,rand(0xa,0x19));}}_0x569043[_0x1ae103(0x24b)]=_0x569043[_0x1ae103(0x24b)]['filter'](_0x2ae075=>{const _0x431412=_0x1ae103;return _0x2ae075[_0x431412(0x2b5)]--,_0x2ae075[_0x431412(0x2b5)]>0x0;});if(_0x569043[_0x1ae103(0x33e)]>0x0)_0x569043['invincible']--;if(_0x569043[_0x1ae103(0x1ef)]>0x0)_0x569043[_0x1ae103(0x1ef)]--;if((keys['\x20']||mouseDown)&&_0x569043[_0x1ae103(0x1ef)]<=0x0&&(_0x569043[_0x1ae103(0x280)]>=getShotEnergyCost()||activePowerup===_0x1ae103(0x2d8))){if(activePowerup!==_0x1ae103(0x2d8))_0x569043['energy']-=getShotEnergyCost();_0x569043[_0x1ae103(0x1ef)]=activePowerup==='rapid'?0x5:_0x569043[_0x1ae103(0x1f1)],sounds[_0x1ae103(0x224)](),lasers['push']({'x':_0x569043['x']+Math[_0x1ae103(0x2c7)](_0x569043['angle'])*0x14,'y':_0x569043['y']+Math[_0x1ae103(0x254)](_0x569043[_0x1ae103(0x213)])*0x14,'vx':Math['cos'](_0x569043[_0x1ae103(0x213)])*0xf,'vy':Math[_0x1ae103(0x254)](_0x569043['angle'])*0xf,'color':_0x569043[_0x1ae103(0x299)],'owner':0x1,'life':0x3c});}}const _0x474cc2=players[0x1];if(gameMode==='2P'&&_0x474cc2[_0x1ae103(0x37c)]&&!_0x474cc2['downed']){let _0x470e5d=0x0,_0x42ad3f=0x0;if(keys[_0x1ae103(0x36f)])_0x42ad3f-=0x1;if(keys[_0x1ae103(0x227)])_0x42ad3f+=0x1;if(keys['arrowleft'])_0x470e5d-=0x1;if(keys[_0x1ae103(0x1f0)])_0x470e5d+=0x1;const _0x3d4a4a=keys[_0x1ae103(0x236)]||keys[_0x1ae103(0x1b6)]||keys['o'],_0x599907=_0x3d4a4a&&_0x474cc2[_0x1ae103(0x280)]>0x0?_0x474cc2['boostSpeed']:_0x474cc2['maxSpeed'],_0x5855dc=_0x3d4a4a&&_0x474cc2['energy']>0x0?_0x474cc2[_0x1ae103(0x1c3)]*1.8:_0x474cc2[_0x1ae103(0x1c3)];if(_0x3d4a4a&&_0x474cc2[_0x1ae103(0x280)]>0x0)_0x474cc2[_0x1ae103(0x280)]=Math['max'](0x0,_0x474cc2[_0x1ae103(0x280)]-0.4);else{if(_0x470e5d===0x0&&_0x42ad3f===0x0)_0x474cc2[_0x1ae103(0x280)]=Math[_0x1ae103(0x260)](0x64,_0x474cc2[_0x1ae103(0x280)]+0.15);else _0x474cc2[_0x1ae103(0x280)]=Math[_0x1ae103(0x260)](0x64,_0x474cc2['energy']+0.05);}const _0x33ff9b=Math[_0x1ae103(0x23c)](_0x470e5d,_0x42ad3f);_0x33ff9b>0x0&&(_0x474cc2['vx']+=_0x470e5d/_0x33ff9b*_0x5855dc,_0x474cc2['vy']+=_0x42ad3f/_0x33ff9b*_0x5855dc,_0x474cc2[_0x1ae103(0x213)]=Math[_0x1ae103(0x1c8)](_0x42ad3f,_0x470e5d));_0x474cc2['vx']*=_0x474cc2[_0x1ae103(0x2a6)],_0x474cc2['vy']*=_0x474cc2['friction'],_0x474cc2[_0x1ae103(0x2e6)]=Math[_0x1ae103(0x23c)](_0x474cc2['vx'],_0x474cc2['vy']);_0x474cc2[_0x1ae103(0x2e6)]>_0x599907&&(_0x474cc2['vx']=_0x474cc2['vx']/_0x474cc2['speed']*_0x599907,_0x474cc2['vy']=_0x474cc2['vy']/_0x474cc2['speed']*_0x599907);_0x474cc2['x']+=_0x474cc2['vx'],_0x474cc2['y']+=_0x474cc2['vy'],wrapScreen(_0x474cc2);if(_0x474cc2[_0x1ae103(0x2e6)]>0.5){_0x474cc2[_0x1ae103(0x24b)][_0x1ae103(0x2c4)]({'x':_0x474cc2['x'],'y':_0x474cc2['y'],'life':0x1e});if(_0x474cc2[_0x1ae103(0x24b)][_0x1ae103(0x1bf)]>0x3c)_0x474cc2[_0x1ae103(0x24b)][_0x1ae103(0x31d)]();const _0x1c2fc5=_0x474cc2['x']-Math[_0x1ae103(0x2c7)](Math[_0x1ae103(0x1c8)](_0x474cc2['vy'],_0x474cc2['vx']))*0x12,_0x4e843e=_0x474cc2['y']-Math[_0x1ae103(0x254)](Math[_0x1ae103(0x1c8)](_0x474cc2['vy'],_0x474cc2['vx']))*0x12;for(let _0x4b32e1=0x0;_0x4b32e1<(_0x3d4a4a?0x3:0x1);_0x4b32e1++){spawnParticles(_0x1c2fc5+rand(-0x4,0x4),_0x4e843e+rand(-0x4,0x4),_0x3d4a4a?_0x474cc2[_0x1ae103(0x228)]:_0x474cc2['secondaryColor'],0x1,_0x474cc2['speed']*0.6,rand(0xa,0x19));}}_0x474cc2[_0x1ae103(0x24b)]=_0x474cc2[_0x1ae103(0x24b)][_0x1ae103(0x330)](_0x64bed8=>{const _0x380fb9=_0x1ae103;return _0x64bed8[_0x380fb9(0x2b5)]--,_0x64bed8[_0x380fb9(0x2b5)]>0x0;});if(_0x474cc2['invincible']>0x0)_0x474cc2[_0x1ae103(0x33e)]--;if(_0x474cc2[_0x1ae103(0x1ef)]>0x0)_0x474cc2['shootCooldown']--;const _0x180526=keys[_0x1ae103(0x1ae)]||keys['Numpad0']||mouseRightDown;if(_0x180526&&_0x474cc2['shootCooldown']<=0x0&&(_0x474cc2[_0x1ae103(0x280)]>=getShotEnergyCost()||activePowerup===_0x1ae103(0x2d8))){if(activePowerup!==_0x1ae103(0x2d8))_0x474cc2[_0x1ae103(0x280)]-=getShotEnergyCost();_0x474cc2[_0x1ae103(0x1ef)]=activePowerup===_0x1ae103(0x2d8)?0x5:_0x474cc2['shootRate'],sounds[_0x1ae103(0x224)](),lasers[_0x1ae103(0x2c4)]({'x':_0x474cc2['x']+Math[_0x1ae103(0x2c7)](_0x474cc2[_0x1ae103(0x213)])*0x14,'y':_0x474cc2['y']+Math[_0x1ae103(0x254)](_0x474cc2[_0x1ae103(0x213)])*0x14,'vx':Math[_0x1ae103(0x2c7)](_0x474cc2[_0x1ae103(0x213)])*0xf,'vy':Math[_0x1ae103(0x254)](_0x474cc2[_0x1ae103(0x213)])*0xf,'color':_0x474cc2['secondaryColor'],'owner':0x2,'life':0x3c});}}else{if(gameMode===_0x1ae103(0x36b)&&!isNetHost&&_0x474cc2['active']){let _0x23d839=0x0,_0x305a97=0x0;if(keys['w'])_0x305a97-=0x1;if(keys['s'])_0x305a97+=0x1;if(keys['a'])_0x23d839-=0x1;if(keys['d'])_0x23d839+=0x1;const _0x90b7c1=keys[_0x1ae103(0x298)]||keys['shift'],_0x4c7318=keys['\x20']||mouseDown,_0x7c4480=Math[_0x1ae103(0x1c8)](mouseY-_0x474cc2['y'],mouseX-_0x474cc2['x']),_0x3c2315=_0x90b7c1&&_0x474cc2[_0x1ae103(0x280)]>0x0?_0x474cc2[_0x1ae103(0x291)]:_0x474cc2[_0x1ae103(0x2cb)],_0x25c7dc=_0x90b7c1&&_0x474cc2[_0x1ae103(0x280)]>0x0?_0x474cc2[_0x1ae103(0x1c3)]*1.8:_0x474cc2[_0x1ae103(0x1c3)];if(_0x90b7c1&&_0x474cc2[_0x1ae103(0x280)]>0x0)_0x474cc2[_0x1ae103(0x280)]=Math[_0x1ae103(0x234)](0x0,_0x474cc2[_0x1ae103(0x280)]-0.4);else{if(_0x23d839===0x0&&_0x305a97===0x0)_0x474cc2[_0x1ae103(0x280)]=Math[_0x1ae103(0x260)](0x64,_0x474cc2[_0x1ae103(0x280)]+0.15);else _0x474cc2[_0x1ae103(0x280)]=Math[_0x1ae103(0x260)](0x64,_0x474cc2[_0x1ae103(0x280)]+0.05);}const _0xaef187=Math[_0x1ae103(0x23c)](_0x23d839,_0x305a97);_0xaef187>0x0&&(_0x474cc2['vx']+=_0x23d839/_0xaef187*_0x25c7dc,_0x474cc2['vy']+=_0x305a97/_0xaef187*_0x25c7dc);_0x474cc2[_0x1ae103(0x213)]=_0x7c4480,_0x474cc2['vx']*=_0x474cc2[_0x1ae103(0x2a6)],_0x474cc2['vy']*=_0x474cc2[_0x1ae103(0x2a6)],_0x474cc2['speed']=Math['hypot'](_0x474cc2['vx'],_0x474cc2['vy']);_0x474cc2[_0x1ae103(0x2e6)]>_0x3c2315&&(_0x474cc2['vx']=_0x474cc2['vx']/_0x474cc2[_0x1ae103(0x2e6)]*_0x3c2315,_0x474cc2['vy']=_0x474cc2['vy']/_0x474cc2['speed']*_0x3c2315);_0x474cc2['x']+=_0x474cc2['vx'],_0x474cc2['y']+=_0x474cc2['vy'],wrapScreen(_0x474cc2);if(_0x474cc2[_0x1ae103(0x2e6)]>0.5){_0x474cc2['trail'][_0x1ae103(0x2c4)]({'x':_0x474cc2['x'],'y':_0x474cc2['y'],'life':0x1e});if(_0x474cc2[_0x1ae103(0x24b)][_0x1ae103(0x1bf)]>0x3c)_0x474cc2[_0x1ae103(0x24b)]['shift']();const _0x2c945a=_0x474cc2['x']-Math['cos'](Math[_0x1ae103(0x1c8)](_0x474cc2['vy'],_0x474cc2['vx']))*0x12,_0x53c745=_0x474cc2['y']-Math[_0x1ae103(0x254)](Math[_0x1ae103(0x1c8)](_0x474cc2['vy'],_0x474cc2['vx']))*0x12;for(let _0x5c046e=0x0;_0x5c046e<(_0x90b7c1?0x3:0x1);_0x5c046e++){spawnParticles(_0x2c945a+rand(-0x4,0x4),_0x53c745+rand(-0x4,0x4),_0x90b7c1?_0x474cc2[_0x1ae103(0x228)]:_0x474cc2[_0x1ae103(0x299)],0x1,_0x474cc2[_0x1ae103(0x2e6)]*0.6,rand(0xa,0x19));}}_0x474cc2[_0x1ae103(0x24b)]=_0x474cc2[_0x1ae103(0x24b)][_0x1ae103(0x330)](_0xd8428c=>{const _0x207bee=_0x1ae103;return _0xd8428c[_0x207bee(0x2b5)]--,_0xd8428c[_0x207bee(0x2b5)]>0x0;});if(_0x474cc2[_0x1ae103(0x33e)]>0x0)_0x474cc2[_0x1ae103(0x33e)]--;if(_0x474cc2['shootCooldown']>0x0)_0x474cc2['shootCooldown']--;if(_0x4c7318&&_0x474cc2[_0x1ae103(0x1ef)]<=0x0&&(_0x474cc2[_0x1ae103(0x280)]>=getShotEnergyCost()||activePowerup===_0x1ae103(0x2d8))){if(activePowerup!==_0x1ae103(0x2d8))_0x474cc2[_0x1ae103(0x280)]-=getShotEnergyCost();_0x474cc2[_0x1ae103(0x1ef)]=activePowerup===_0x1ae103(0x2d8)?0x5:_0x474cc2[_0x1ae103(0x1f1)],sounds[_0x1ae103(0x224)](),lasers[_0x1ae103(0x2c4)]({'x':_0x474cc2['x']+Math[_0x1ae103(0x2c7)](_0x474cc2[_0x1ae103(0x213)])*0x14,'y':_0x474cc2['y']+Math[_0x1ae103(0x254)](_0x474cc2[_0x1ae103(0x213)])*0x14,'vx':Math[_0x1ae103(0x2c7)](_0x474cc2[_0x1ae103(0x213)])*0xf,'vy':Math[_0x1ae103(0x254)](_0x474cc2['angle'])*0xf,'color':_0x474cc2[_0x1ae103(0x299)],'owner':0x2,'life':0x3c});}_0x569043[_0x1ae103(0x1c9)]!==undefined&&(_0x569043['targetX']+=_0x569043['vx'],_0x569043['targetY']+=_0x569043['vy'],_0x569043['x']=lerp(_0x569043['x'],_0x569043['targetX'],0.35),_0x569043['y']=lerp(_0x569043['y'],_0x569043['targetY'],0.35),wrapScreen(_0x569043)),netManager['send']({'type':_0x1ae103(0x288),'dx':_0x23d839,'dy':_0x305a97,'angle':_0x7c4480,'isShooting':_0x4c7318,'isBoosting':_0x90b7c1});}}if(gameMode===_0x1ae103(0x36b)&&isNetHost&&_0x474cc2[_0x1ae103(0x37c)]&&!_0x474cc2[_0x1ae103(0x2f2)]){const _0x175da8=lastNetClientInput||{'dx':0x0,'dy':0x0,'angle':_0x474cc2[_0x1ae103(0x213)],'isShooting':![],'isBoosting':![]};let _0x3391bd=_0x175da8['dx'],_0x36d8d6=_0x175da8['dy'];const _0x21d4a9=_0x175da8['isBoosting'],_0x5ee374=_0x21d4a9&&_0x474cc2[_0x1ae103(0x280)]>0x0?_0x474cc2[_0x1ae103(0x291)]:_0x474cc2[_0x1ae103(0x2cb)],_0x387ced=_0x21d4a9&&_0x474cc2[_0x1ae103(0x280)]>0x0?_0x474cc2[_0x1ae103(0x1c3)]*1.8:_0x474cc2['accel'];if(_0x21d4a9&&_0x474cc2[_0x1ae103(0x280)]>0x0)_0x474cc2[_0x1ae103(0x280)]=Math[_0x1ae103(0x234)](0x0,_0x474cc2[_0x1ae103(0x280)]-0.4);else{if(_0x3391bd===0x0&&_0x36d8d6===0x0)_0x474cc2[_0x1ae103(0x280)]=Math[_0x1ae103(0x260)](0x64,_0x474cc2[_0x1ae103(0x280)]+0.15);else _0x474cc2[_0x1ae103(0x280)]=Math[_0x1ae103(0x260)](0x64,_0x474cc2[_0x1ae103(0x280)]+0.05);}const _0x58cb46=Math['hypot'](_0x3391bd,_0x36d8d6);_0x58cb46>0x0&&(_0x474cc2['vx']+=_0x3391bd/_0x58cb46*_0x387ced,_0x474cc2['vy']+=_0x36d8d6/_0x58cb46*_0x387ced);_0x474cc2[_0x1ae103(0x213)]=_0x175da8[_0x1ae103(0x213)],_0x474cc2['vx']*=_0x474cc2['friction'],_0x474cc2['vy']*=_0x474cc2['friction'],_0x474cc2[_0x1ae103(0x2e6)]=Math[_0x1ae103(0x23c)](_0x474cc2['vx'],_0x474cc2['vy']);_0x474cc2[_0x1ae103(0x2e6)]>_0x5ee374&&(_0x474cc2['vx']=_0x474cc2['vx']/_0x474cc2[_0x1ae103(0x2e6)]*_0x5ee374,_0x474cc2['vy']=_0x474cc2['vy']/_0x474cc2[_0x1ae103(0x2e6)]*_0x5ee374);_0x474cc2['x']+=_0x474cc2['vx'],_0x474cc2['y']+=_0x474cc2['vy'],wrapScreen(_0x474cc2);if(_0x175da8[_0x1ae103(0x1d1)]&&_0x474cc2[_0x1ae103(0x1ef)]<=0x0&&(_0x474cc2['energy']>=getShotEnergyCost()||activePowerup===_0x1ae103(0x2d8))){if(activePowerup!==_0x1ae103(0x2d8))_0x474cc2[_0x1ae103(0x280)]-=getShotEnergyCost();_0x474cc2[_0x1ae103(0x1ef)]=activePowerup==='rapid'?0x5:_0x474cc2['shootRate'],sounds[_0x1ae103(0x224)](),lasers[_0x1ae103(0x2c4)]({'x':_0x474cc2['x']+Math[_0x1ae103(0x2c7)](_0x474cc2[_0x1ae103(0x213)])*0x14,'y':_0x474cc2['y']+Math[_0x1ae103(0x254)](_0x474cc2[_0x1ae103(0x213)])*0x14,'vx':Math[_0x1ae103(0x2c7)](_0x474cc2['angle'])*0xf,'vy':Math[_0x1ae103(0x254)](_0x474cc2[_0x1ae103(0x213)])*0xf,'color':_0x474cc2[_0x1ae103(0x299)],'owner':0x2,'life':0x3c});}if(_0x474cc2['speed']>0.5){_0x474cc2[_0x1ae103(0x24b)][_0x1ae103(0x2c4)]({'x':_0x474cc2['x'],'y':_0x474cc2['y'],'life':0x1e});if(_0x474cc2[_0x1ae103(0x24b)][_0x1ae103(0x1bf)]>0x3c)_0x474cc2[_0x1ae103(0x24b)][_0x1ae103(0x31d)]();const _0x391cc4=_0x474cc2['x']-Math[_0x1ae103(0x2c7)](Math[_0x1ae103(0x1c8)](_0x474cc2['vy'],_0x474cc2['vx']))*0x12,_0x25ff0b=_0x474cc2['y']-Math['sin'](Math[_0x1ae103(0x1c8)](_0x474cc2['vy'],_0x474cc2['vx']))*0x12;for(let _0x45dd7e=0x0;_0x45dd7e<(_0x21d4a9?0x3:0x1);_0x45dd7e++){spawnParticles(_0x391cc4+rand(-0x4,0x4),_0x25ff0b+rand(-0x4,0x4),_0x21d4a9?_0x474cc2[_0x1ae103(0x228)]:_0x474cc2[_0x1ae103(0x299)],0x1,_0x474cc2[_0x1ae103(0x2e6)]*0.6,rand(0xa,0x19));}}_0x474cc2[_0x1ae103(0x24b)]=_0x474cc2[_0x1ae103(0x24b)][_0x1ae103(0x330)](_0x2e228d=>{const _0x266a48=_0x1ae103;return _0x2e228d[_0x266a48(0x2b5)]--,_0x2e228d[_0x266a48(0x2b5)]>0x0;});if(_0x474cc2[_0x1ae103(0x33e)]>0x0)_0x474cc2[_0x1ae103(0x33e)]--;if(_0x474cc2[_0x1ae103(0x1ef)]>0x0)_0x474cc2[_0x1ae103(0x1ef)]--;}if(gameMode===_0x1ae103(0x36b)&&isNetHost&&netManager[_0x1ae103(0x21b)]){const _0x2591d0=netManager['mode']==='cloud'?0x2:0x1;netManager[_0x1ae103(0x327)]({'type':_0x1ae103(0x1dc),'p1':{'x':_0x569043['x'],'y':_0x569043['y'],'vx':_0x569043['vx'],'vy':_0x569043['vy'],'angle':_0x569043[_0x1ae103(0x213)],'energy':_0x569043['energy'],'downed':_0x569043[_0x1ae103(0x2f2)],'invincible':_0x569043[_0x1ae103(0x33e)],'speed':_0x569043[_0x1ae103(0x2e6)]},'p2':{'x':_0x474cc2['x'],'y':_0x474cc2['y'],'vx':_0x474cc2['vx'],'vy':_0x474cc2['vy'],'angle':_0x474cc2[_0x1ae103(0x213)],'energy':_0x474cc2[_0x1ae103(0x280)],'downed':_0x474cc2[_0x1ae103(0x2f2)],'invincible':_0x474cc2[_0x1ae103(0x33e)],'speed':_0x474cc2[_0x1ae103(0x2e6)]}},_0x2591d0),netManager[_0x1ae103(0x327)]({'type':'HOST_STATE','score':score,'wave':wave,'shields':shields,'kills':kills,'combo':combo,'comboTimer':comboTimer,'experience':experience,'level':pilotLevel,'maxShields':maxShields,'gameTime':gameTime,'isCalmPeriod':isCalmPeriod,'activePowerup':activePowerup,'powerupTimer':powerupTimer,'powerupMaxTime':powerupMaxTime,'powerupName':activePowerup?document[_0x1ae103(0x23e)](_0x1ae103(0x21d))?.[_0x1ae103(0x2cc)]||'':'','p1':{'x':_0x569043['x'],'y':_0x569043['y'],'vx':_0x569043['vx'],'vy':_0x569043['vy'],'angle':_0x569043[_0x1ae103(0x213)],'energy':_0x569043['energy'],'downed':_0x569043['downed'],'invincible':_0x569043[_0x1ae103(0x33e)],'speed':_0x569043[_0x1ae103(0x2e6)]},'p2':{'x':_0x474cc2['x'],'y':_0x474cc2['y'],'vx':_0x474cc2['vx'],'vy':_0x474cc2['vy'],'angle':_0x474cc2['angle'],'energy':_0x474cc2[_0x1ae103(0x280)],'downed':_0x474cc2[_0x1ae103(0x2f2)],'invincible':_0x474cc2[_0x1ae103(0x33e)],'speed':_0x474cc2[_0x1ae103(0x2e6)]},'asteroids':asteroids['map'](_0x36ad3e=>({'x':_0x36ad3e['x'],'y':_0x36ad3e['y'],'vx':_0x36ad3e['vx'],'vy':_0x36ad3e['vy'],'radius':_0x36ad3e[_0x1ae103(0x24a)],'rotation':_0x36ad3e[_0x1ae103(0x331)],'rotSpeed':_0x36ad3e[_0x1ae103(0x22d)],'hp':_0x36ad3e['hp'],'maxHp':_0x36ad3e[_0x1ae103(0x297)],'color':_0x36ad3e[_0x1ae103(0x2b8)]})),'enemies':enemies['map'](_0x48f022=>({'x':_0x48f022['x'],'y':_0x48f022['y'],'type':_0x48f022[_0x1ae103(0x2f5)],'radius':_0x48f022[_0x1ae103(0x24a)],'hp':_0x48f022['hp'],'vx':_0x48f022['vx'],'vy':_0x48f022['vy'],'angle':_0x48f022[_0x1ae103(0x213)],'shockwave':_0x48f022[_0x1ae103(0x223)],'maxHp':_0x48f022['maxHp'],'state':_0x48f022['state'],'stateTimer':_0x48f022['stateTimer'],'aimAngle':_0x48f022['aimAngle'],'fireTimer':_0x48f022['fireTimer'],'dashSpeed':_0x48f022['dashSpeed'],'life':_0x48f022['life'],'maxLife':_0x48f022['maxLife'],'enemyProjectile':_0x48f022['enemyProjectile']})),'orbs':orbs[_0x1ae103(0x250)](_0x46ea6b=>({'x':_0x46ea6b['x'],'y':_0x46ea6b['y'],'type':_0x46ea6b[_0x1ae103(0x2f5)],'color':_0x46ea6b[_0x1ae103(0x2b8)],'radius':_0x46ea6b[_0x1ae103(0x24a)],'pulsePhase':_0x46ea6b['pulsePhase'],'lifetime':_0x46ea6b[_0x1ae103(0x215)]})),'lasers':lasers[_0x1ae103(0x250)](_0x28157d=>({'x':_0x28157d['x'],'y':_0x28157d['y'],'vx':_0x28157d['vx'],'vy':_0x28157d['vy'],'color':_0x28157d[_0x1ae103(0x2b8)],'owner':_0x28157d['owner'],'life':_0x28157d['life']})),'powerups':powerups[_0x1ae103(0x250)](_0x4d8f75=>({'x':_0x4d8f75['x'],'y':_0x4d8f75['y'],'type':_0x4d8f75[_0x1ae103(0x2f5)],'color':_0x4d8f75['color'],'name':_0x4d8f75['name'],'radius':_0x4d8f75[_0x1ae103(0x24a)],'lifetime':_0x4d8f75[_0x1ae103(0x215)],'angle':_0x4d8f75[_0x1ae103(0x213)]})),'boss':boss?{'x':boss['x'],'y':boss['y'],'radius':boss['radius'],'hp':boss['hp'],'maxHp':boss['maxHp'],'angle':boss['angle'],'kind':boss['kind'],'name':boss['name'],'tier':boss['tier'],'action':boss['action'],'actionTimer':boss['actionTimer'],'actionDuration':boss['actionDuration'],'targetX':boss['targetX'],'targetY':boss['targetY'],'aimAngle':boss['aimAngle'],'dashAngle':boss['dashAngle'],'fieldX':boss['fieldX'],'fieldY':boss['fieldY'],'fieldRadius':boss['fieldRadius'],'waveRadius':boss['waveRadius'],'waveMax':boss['waveMax'],'waveSpeed':boss['waveSpeed'],'waveHit1':boss['waveHit1'],'waveHit2':boss['waveHit2']}:null,'events':netEvents},0x4),netManager['_netFrameCounter']%0x4===0x0&&(netEvents=[]);}if((gameMode==='2P'||gameMode===_0x1ae103(0x36b))&&!_0x17adcb&&_0x569043[_0x1ae103(0x37c)]&&_0x474cc2[_0x1ae103(0x37c)]){if(_0x569043[_0x1ae103(0x2f2)]&&!_0x474cc2[_0x1ae103(0x2f2)]&&dist(_0x569043,_0x474cc2)<_0x569043[_0x1ae103(0x24a)]+_0x474cc2[_0x1ae103(0x24a)]+0xf)_0x569043[_0x1ae103(0x2f2)]=![],_0x569043['invincible']=0x78,_0x569043[_0x1ae103(0x280)]=0x32,showFloatingText(_0x569043['x'],_0x569043['y']-0x1e,_0x1ae103(0x251),_0x1ae103(0x343)),spawnExplosion(_0x569043['x'],_0x569043['y'],0x3c),pushNetEvent({'type':'floatingText','x':_0x569043['x'],'y':_0x569043['y']-0x1e,'text':_0x1ae103(0x251),'color':_0x1ae103(0x343)}),pushNetEvent({'type':'explosion','x':_0x569043['x'],'y':_0x569043['y'],'size':0x3c});else _0x474cc2[_0x1ae103(0x2f2)]&&!_0x569043['downed']&&dist(_0x569043,_0x474cc2)<_0x569043[_0x1ae103(0x24a)]+_0x474cc2[_0x1ae103(0x24a)]+0xf&&(_0x474cc2[_0x1ae103(0x2f2)]=![],_0x474cc2[_0x1ae103(0x33e)]=0x78,_0x474cc2[_0x1ae103(0x280)]=0x32,showFloatingText(_0x474cc2['x'],_0x474cc2['y']-0x1e,_0x1ae103(0x251),'#00ff88'),spawnExplosion(_0x474cc2['x'],_0x474cc2['y'],0x3c),pushNetEvent({'type':_0x1ae103(0x2cf),'x':_0x474cc2['x'],'y':_0x474cc2['y']-0x1e,'text':_0x1ae103(0x251),'color':_0x1ae103(0x343)}),pushNetEvent({'type':_0x1ae103(0x301),'x':_0x474cc2['x'],'y':_0x474cc2['y'],'size':0x3c}));}if(comboTimer>0x0){comboTimer--;if(comboTimer<=0x0)combo=0x1;}powerupTimer>0x0&&(powerupTimer--,powerupTimer<=0x0&&(activePowerup=null,document[_0x1ae103(0x23e)](_0x1ae103(0x216))[_0x1ae103(0x238)][_0x1ae103(0x278)]('hidden')));if(shields===0x1)document[_0x1ae103(0x23e)]('damageVignette')['classList']['remove'](_0x1ae103(0x22a));else document[_0x1ae103(0x23e)](_0x1ae103(0x281))[_0x1ae103(0x238)]['add']('hidden');if(combo>0x1)document['body'][_0x1ae103(0x238)]['add'](_0x1ae103(0x272));else document['body']['classList'][_0x1ae103(0x2d9)](_0x1ae103(0x272));}function wrapScreen(entity) {
    if (gameMode === '1P' && typeof constrainPlayerToWorld === 'function' &&
        constrainPlayerToWorld(entity)) {
        return;
    }

    const margin = 30;
    if (entity.x < -margin) entity.x = canvas.width + margin;
    if (entity.x > canvas.width + margin) entity.x = -margin;
    if (entity.y < -margin) entity.y = canvas.height + margin;
    if (entity.y > canvas.height + margin) entity.y = -margin;
}
function updateEntities(){const _0x1303b2=_0x37194f,_0x15e200=gameMode==='NET'&&!isNetHost,_0x3aa635=activePowerup===_0x1303b2(0x205),_0x5b0e48=_0x3aa635?0.3:0x1,_0x879f6e=players[_0x1303b2(0x35a)](_0x5c5c24=>_0x5c5c24['active']&&!_0x5c5c24[_0x1303b2(0x2f2)])||players[0x0];stars[_0x1303b2(0x32c)](_0x454c3a=>{const _0x2481dd=_0x1303b2;_0x454c3a[_0x2481dd(0x1d6)]+=_0x454c3a['twinkleSpeed'],_0x454c3a['x']-=_0x879f6e['vx']*(_0x454c3a['layer']*0.1),_0x454c3a['y']-=_0x879f6e['vy']*(_0x454c3a[_0x2481dd(0x34f)]*0.1);if(_0x454c3a['x']<0x0)_0x454c3a['x']+=canvas[_0x2481dd(0x35e)];if(_0x454c3a['x']>canvas['width'])_0x454c3a['x']-=canvas[_0x2481dd(0x35e)];if(_0x454c3a['y']<0x0)_0x454c3a['y']+=canvas[_0x2481dd(0x239)];if(_0x454c3a['y']>canvas[_0x2481dd(0x239)])_0x454c3a['y']-=canvas[_0x2481dd(0x239)];}),nebulaBlobs[_0x1303b2(0x32c)](_0xd3ebce=>{const _0x224930=_0x1303b2;_0xd3ebce['x']+=_0xd3ebce['vx'],_0xd3ebce['y']+=_0xd3ebce['vy'],_0xd3ebce[_0x224930(0x27c)]+=_0xd3ebce[_0x224930(0x2c8)];if(_0xd3ebce['x']<-_0xd3ebce[_0x224930(0x24a)])_0xd3ebce['x']=canvas['width']+_0xd3ebce[_0x224930(0x24a)];if(_0xd3ebce['x']>canvas['width']+_0xd3ebce[_0x224930(0x24a)])_0xd3ebce['x']=-_0xd3ebce['radius'];if(_0xd3ebce['y']<-_0xd3ebce[_0x224930(0x24a)])_0xd3ebce['y']=canvas[_0x224930(0x239)]+_0xd3ebce['radius'];if(_0xd3ebce['y']>canvas[_0x224930(0x239)]+_0xd3ebce[_0x224930(0x24a)])_0xd3ebce['y']=-_0xd3ebce[_0x224930(0x24a)];});if(_0x15e200){asteroids['forEach'](_0x25b5d0=>{const _0x47912a=_0x1303b2;_0x25b5d0['x']+=(_0x25b5d0['vx']||0x0)*_0x5b0e48,_0x25b5d0['y']+=(_0x25b5d0['vy']||0x0)*_0x5b0e48,_0x25b5d0[_0x47912a(0x331)]+=(_0x25b5d0['rotSpeed']||0x0)*_0x5b0e48;}),enemies[_0x1303b2(0x32c)](_0x4c0ea5=>{_0x4c0ea5['x']+=(_0x4c0ea5['vx']||0x0)*_0x5b0e48,_0x4c0ea5['y']+=(_0x4c0ea5['vy']||0x0)*_0x5b0e48;}),lasers[_0x1303b2(0x32c)](_0x5842cf=>{const _0xbbbb13=_0x1303b2;_0x5842cf['x']+=_0x5842cf['vx'],_0x5842cf['y']+=_0x5842cf['vy'],_0x5842cf[_0xbbbb13(0x2b5)]--,spawnParticles(_0x5842cf['x'],_0x5842cf['y'],_0x5842cf['color']||_0xbbbb13(0x30e),0x1,0x1,0xa);}),compactByPositiveField(lasers, 'life'),particles[_0x1303b2(0x32c)](_0x11a7ae=>{const _0x3e69a6=_0x1303b2;_0x11a7ae['x']+=_0x11a7ae['vx'],_0x11a7ae['y']+=_0x11a7ae['vy'],_0x11a7ae['vx']*=_0x11a7ae['friction'],_0x11a7ae['vy']*=_0x11a7ae['friction'],_0x11a7ae[_0x3e69a6(0x2b5)]--;}),compactByPositiveField(particles, 'life'),explosions[_0x1303b2(0x32c)](_0x4793ef=>{const _0x49522d=_0x1303b2;_0x4793ef[_0x49522d(0x2b5)]--,_0x4793ef[_0x49522d(0x24a)]=_0x4793ef['maxRadius']*(0x1-_0x4793ef['life']/_0x4793ef['maxLife']);}),compactByPositiveField(explosions, 'life'),shards[_0x1303b2(0x32c)](_0x28c048=>{const _0x52a51f=_0x1303b2;_0x28c048['x']+=_0x28c048['vx']*_0x5b0e48,_0x28c048['y']+=_0x28c048['vy']*_0x5b0e48,_0x28c048[_0x52a51f(0x331)]+=_0x28c048['rotSpeed']*_0x5b0e48,_0x28c048[_0x52a51f(0x2b5)]--;}),compactByPositiveField(shards, 'life'),floatingTexts[_0x1303b2(0x32c)](_0x24547e=>{const _0x99d3b=_0x1303b2;_0x24547e['y']+=_0x24547e['vy'],_0x24547e[_0x99d3b(0x2b5)]--;}),compactByPositiveField(floatingTexts, 'life'),orbs['forEach'](_0x5005f6=>{if(_0x5005f6['pulsePhase']!==undefined)_0x5005f6['pulsePhase']+=0.05;}),powerups[_0x1303b2(0x32c)](_0x57eef0=>{_0x57eef0['angle']+=0.05;});if(screenShake>0x0)screenShake*=0.85;if(screenShake<0.5)screenShake=0x0;return;}lasers[_0x1303b2(0x32c)](_0x48cea0=>{const _0x494545=_0x1303b2;_0x48cea0['x']+=_0x48cea0['vx'],_0x48cea0['y']+=_0x48cea0['vy'],_0x48cea0[_0x494545(0x2b5)]--,spawnParticles(_0x48cea0['x'],_0x48cea0['y'],_0x48cea0[_0x494545(0x2b8)]||_0x494545(0x30e),0x1,0x1,0xa);}),compactByPositiveField(lasers, 'life'),shards[_0x1303b2(0x32c)](_0xc3d24a=>{const _0x3d8f0a=_0x1303b2;_0xc3d24a['x']+=_0xc3d24a['vx']*_0x5b0e48,_0xc3d24a['y']+=_0xc3d24a['vy']*_0x5b0e48,_0xc3d24a[_0x3d8f0a(0x331)]+=_0xc3d24a[_0x3d8f0a(0x22d)]*_0x5b0e48,_0xc3d24a[_0x3d8f0a(0x2b5)]--;}),compactByPositiveField(shards, 'life'),asteroids[_0x1303b2(0x32c)](_0x29df93=>{const _0x275544=_0x1303b2;_0x29df93['x']+=_0x29df93['vx']*_0x5b0e48,_0x29df93['y']+=_0x29df93['vy']*_0x5b0e48,_0x29df93[_0x275544(0x331)]+=_0x29df93[_0x275544(0x22d)]*_0x5b0e48,orbs[_0x275544(0x32c)](_0x7a0af6=>{const _0x3cf6d0=_0x275544;if(dist(_0x29df93,_0x7a0af6)<0x96){const _0x471034=Math['atan2'](_0x29df93['y']-_0x7a0af6['y'],_0x29df93['x']-_0x7a0af6['x']);_0x29df93['vx']-=Math[_0x3cf6d0(0x2c7)](_0x471034)*0.02,_0x29df93['vy']-=Math[_0x3cf6d0(0x254)](_0x471034)*0.02;}});}),compactAsteroidsToViewport(),enemies['forEach'](_0x2ebf2f=>{const _0x1c016b=_0x1303b2;if(_0x2ebf2f[_0x1c016b(0x2f5)]===_0x1c016b(0x319)){const _0x2fc34e=players[_0x1c016b(0x35a)](_0x5c252e=>_0x5c252e[_0x1c016b(0x37c)]&&!_0x5c252e[_0x1c016b(0x2f2)])||players[0x0],_0x3186f1=Math[_0x1c016b(0x1c8)](_0x2fc34e['y']-_0x2ebf2f['y'],_0x2fc34e['x']-_0x2ebf2f['x']);_0x2ebf2f['vx']+=Math['cos'](_0x3186f1)*0.05*_0x5b0e48,_0x2ebf2f['vy']+=Math['sin'](_0x3186f1)*0.05*_0x5b0e48,_0x2ebf2f['vx']*=0.98,_0x2ebf2f['vy']*=0.98,_0x2ebf2f['x']+=_0x2ebf2f['vx'],_0x2ebf2f['y']+=_0x2ebf2f['vy'];}else{if(_0x2ebf2f[_0x1c016b(0x2f5)]===_0x1c016b(0x26f)){_0x2ebf2f['angle']+=0.02*_0x5b0e48,_0x2ebf2f[_0x1c016b(0x223)]+=0x2*_0x5b0e48;if(_0x2ebf2f[_0x1c016b(0x223)]>0x96)_0x2ebf2f[_0x1c016b(0x223)]=0x0;_0x2ebf2f['shockwave']>0x0&&_0x2ebf2f[_0x1c016b(0x223)]<0x96&&players[_0x1c016b(0x32c)](_0x469ccd=>{const _0x11d318=_0x1c016b;_0x469ccd[_0x11d318(0x37c)]&&!_0x469ccd[_0x11d318(0x2f2)]&&Math[_0x11d318(0x313)](dist(_0x2ebf2f,_0x469ccd)-_0x2ebf2f['shockwave'])<0xa&&hitPlayer(_0x469ccd);});}}});updateBoss(_0x5b0e48);orbs[_0x1303b2(0x32c)](_0x280236=>{const _0x4699ea=_0x1303b2;_0x280236['pulsePhase']+=0.05,_0x280236[_0x4699ea(0x215)]--;if(activePowerup===_0x4699ea(0x34d)){const _0x4ccc98=players[_0x4699ea(0x35a)](_0x32dadb=>_0x32dadb['active']&&!_0x32dadb[_0x4699ea(0x2f2)])||players[0x0],_0xf97d69=Math[_0x4699ea(0x1c8)](_0x4ccc98['y']-_0x280236['y'],_0x4ccc98['x']-_0x280236['x']);_0x280236['x']+=Math[_0x4699ea(0x2c7)](_0xf97d69)*0x8,_0x280236['y']+=Math[_0x4699ea(0x254)](_0xf97d69)*0x8;}}),compactByPositiveField(orbs, 'lifetime'),powerups[_0x1303b2(0x32c)](_0x2483ac=>{const _0x2842a9=_0x1303b2;_0x2483ac[_0x2842a9(0x213)]+=0.05,_0x2483ac[_0x2842a9(0x215)]--;}),compactByPositiveField(powerups, 'lifetime'),particles[_0x1303b2(0x32c)](_0x2adf7a=>{const _0x3764bc=_0x1303b2;_0x2adf7a['x']+=_0x2adf7a['vx'],_0x2adf7a['y']+=_0x2adf7a['vy'],_0x2adf7a['vx']*=_0x2adf7a[_0x3764bc(0x2a6)],_0x2adf7a['vy']*=_0x2adf7a[_0x3764bc(0x2a6)],_0x2adf7a['life']--;}),compactByPositiveField(particles, 'life'),explosions[_0x1303b2(0x32c)](_0x4a4f82=>{const _0x140676=_0x1303b2;_0x4a4f82['life']--,_0x4a4f82[_0x140676(0x24a)]=_0x4a4f82[_0x140676(0x2ad)]*(0x1-_0x4a4f82[_0x140676(0x2b5)]/_0x4a4f82[_0x140676(0x351)]);}),compactByPositiveField(explosions, 'life'),floatingTexts[_0x1303b2(0x32c)](_0x5c9be8=>{const _0x12bede=_0x1303b2;_0x5c9be8['y']+=_0x5c9be8['vy'],_0x5c9be8[_0x12bede(0x2b5)]--;}),compactByPositiveField(floatingTexts, 'life');if(screenShake>0x0)screenShake*=0.85;if(screenShake<0.5)screenShake=0x0;if(gameMode!=='NET'&&typeof updateEnemyEntities==='function')updateEnemyEntities(_0x5b0e48);}function hitPlayer(_0x3aa8e0){const _0x445d51=_0x37194f;if(_0x3aa8e0[_0x445d51(0x33e)]>0x0||_0x3aa8e0[_0x445d51(0x2f2)])return;shields--,_0x3aa8e0['invincible']=0x5a+getUpgradeRank('phase')*0xf,spawnExplosion(_0x3aa8e0['x'],_0x3aa8e0['y'],0x28),combo=0x1,comboTimer=0x0,sounds[_0x445d51(0x2b0)](),flashScreen('flash-color'),pushNetEvent({'type':'sound','name':'shieldHit'}),pushNetEvent({'type':_0x445d51(0x301),'x':_0x3aa8e0['x'],'y':_0x3aa8e0['y'],'size':0x28});if(gameMode==='2P'||gameMode===_0x445d51(0x36b)){shields<=0x1&&(_0x3aa8e0[_0x445d51(0x2f2)]=!![],showFloatingText(_0x3aa8e0['x'],_0x3aa8e0['y']-0x14,_0x3aa8e0[_0x445d51(0x289)]+_0x445d51(0x2e3),_0x445d51(0x277)),pushNetEvent({'type':'floatingText','x':_0x3aa8e0['x'],'y':_0x3aa8e0['y']-0x14,'text':_0x3aa8e0[_0x445d51(0x289)]+'\x20СБИТ!\x20🆘','color':_0x445d51(0x277)}));const _0x4b47f4=players[_0x445d51(0x330)](_0x19aef4=>_0x19aef4[_0x445d51(0x37c)]&&!_0x19aef4['downed'])[_0x445d51(0x1bf)];if(_0x4b47f4===0x0||shields<0x0)gameOver();}else{if(shields<0x0)gameOver();}}function checkCollisions(){const _0x237b54=_0x37194f;if(gameMode==='NET'&&!isNetHost)return;players[_0x237b54(0x32c)](_0x5a8dc0=>{const _0x46a422=_0x237b54;if(!_0x5a8dc0[_0x46a422(0x37c)]||_0x5a8dc0[_0x46a422(0x2f2)])return;[...asteroids,...enemies][_0x46a422(0x32c)](_0x4d2241=>{const _0x37bce5=_0x46a422;if(!(_0x4d2241['bossHazard']&&_0x4d2241['type']==='bossMine'&&_0x4d2241['armTimer']>0x0)&&dist(_0x5a8dc0,_0x4d2241)<_0x5a8dc0['radius']+_0x4d2241[_0x37bce5(0x24a)]*0.7){hitPlayer(_0x5a8dc0);const _0x3b8a8f=Math[_0x37bce5(0x1c8)](_0x5a8dc0['y']-_0x4d2241['y'],_0x5a8dc0['x']-_0x4d2241['x']);_0x5a8dc0['vx']=Math['cos'](_0x3b8a8f)*0x8,_0x5a8dc0['vy']=Math[_0x37bce5(0x254)](_0x3b8a8f)*0x8;}});if(boss&&dist(_0x5a8dc0,boss)<_0x5a8dc0[_0x46a422(0x24a)]+boss[_0x46a422(0x24a)]*0.8)hitPlayer(_0x5a8dc0);}),lasers[_0x237b54(0x32c)]((_0x3b9327,_0x483e4f)=>{const _0x124e7d=_0x237b54;let _0x31b6d0=![];asteroids['forEach']((_0x1b77bb,_0x1d7d58)=>{const _0x31817b=_0x2c82;if(_0x31b6d0)return;if(dist(_0x3b9327,_0x1b77bb)<_0x1b77bb['radius']){_0x31b6d0=!![],_0x1b77bb['hp']-=(1+getUpgradeRank('plasma'))*(_0x3b9327.damageMultiplier||1),spawnParticles(_0x3b9327['x'],_0x3b9327['y'],_0x1b77bb[_0x31817b(0x2b8)],0xa,0x2,0x14),spawnAsteroidShards(_0x1b77bb,{'x':_0x3b9327['vx'],'y':_0x3b9327['vy']});if(_0x1b77bb['hp']<=0x0){spawnExplosion(_0x1b77bb['x'],_0x1b77bb['y'],_0x1b77bb['radius']*1.5),pushNetEvent({'type':_0x31817b(0x301),'x':_0x1b77bb['x'],'y':_0x1b77bb['y'],'size':_0x1b77bb[_0x31817b(0x24a)]*1.5});if(_0x1b77bb[_0x31817b(0x24a)]>0x1e){for(let _0x4f4d3d=0x0;_0x4f4d3d<randInt(0x2,0x4);_0x4f4d3d++)spawnAsteroid(_0x1b77bb['x'],_0x1b77bb['y'],_0x1b77bb[_0x31817b(0x24a)]*0.5);}if(rand(0x0,0x1)>Math.max(0.15,0.7-getUpgradeRank('salvage')*0.08))spawnOrb(_0x1b77bb['x'],_0x1b77bb['y']);asteroids['splice'](_0x1d7d58,0x1),score+=0x19*combo,kills++,awardExperience(10);}}}),enemies[_0x124e7d(0x32c)]((_0x19d5bc,_0x496253)=>{const _0x4af754=_0x124e7d;if(_0x31b6d0||_0x19d5bc.enemyProjectile)return;if(dist(_0x3b9327,_0x19d5bc)<_0x19d5bc[_0x4af754(0x24a)]){_0x31b6d0=!![],_0x19d5bc['hp']-=(1+getUpgradeRank('plasma'))*(_0x3b9327.damageMultiplier||1);if(_0x19d5bc['hp']<=0x0){spawnExplosion(_0x19d5bc['x'],_0x19d5bc['y'],_0x19d5bc[_0x4af754(0x24a)]*0x2),pushNetEvent({'type':_0x4af754(0x301),'x':_0x19d5bc['x'],'y':_0x19d5bc['y'],'size':_0x19d5bc[_0x4af754(0x24a)]*0x2});if(rand(0x0,0x1)>Math.max(0.1,0.5-getUpgradeRank('salvage')*0.08))spawnOrb(_0x19d5bc['x'],_0x19d5bc['y']);enemies[_0x4af754(0x2db)](_0x496253,0x1),score+=0x32*combo,kills++,awardExperience(18);}}});if(boss&&!_0x31b6d0&&dist(_0x3b9327,boss)<boss[_0x124e7d(0x24a)]){_0x31b6d0=!![],boss['hp']-=(1+getUpgradeRank('plasma'))*(_0x3b9327.damageMultiplier||1),spawnParticles(_0x3b9327['x'],_0x3b9327['y'],'#ff4444',0xa,0x2,0x14),document[_0x124e7d(0x23e)]('bossFill')[_0x124e7d(0x24d)][_0x124e7d(0x35e)]=boss['hp']/boss[_0x124e7d(0x297)]*0x64+'%';if(boss['hp']<=0x0){const _0x417038=boss['x'],_0x3f9401=boss['y'];spawnExplosion(_0x417038,_0x3f9401,0x96),pushNetEvent({'type':_0x124e7d(0x301),'x':_0x417038,'y':_0x3f9401,'size':0x96}),score+=0x3e8*combo,kills++,awardExperience(75),boss=null,sounds[_0x124e7d(0x2c3)](_0x124e7d(0x1cd)),pushNetEvent({'type':_0x124e7d(0x26e),'mode':'gameplay'}),document[_0x124e7d(0x23e)](_0x124e7d(0x350))['classList'][_0x124e7d(0x278)](_0x124e7d(0x22a));for(let _0x3ea8ee=0x0;_0x3ea8ee<0x5;_0x3ea8ee++)spawnOrb(_0x417038+rand(-0x32,0x32),_0x3f9401+rand(-0x32,0x32));if(rand(0x0,0x1)>0.5)spawnPowerup(_0x417038,_0x3f9401);if(shields<maxShields)shields++;}}if(_0x31b6d0)lasers['splice'](_0x483e4f,0x1);}),players[_0x237b54(0x32c)](_0x4e4585=>{const _0xf987f6=_0x237b54;if(!_0x4e4585[_0xf987f6(0x37c)]||_0x4e4585[_0xf987f6(0x2f2)])return;orbs['forEach']((_0x4dc449,_0x49b3a1)=>{const _0x13344f=_0xf987f6;if(dist(_0x4e4585,_0x4dc449)<_0x4e4585[_0x13344f(0x24a)]+_0x4dc449['radius']+0x8+getUpgradeRank('magnet')*12){sounds[_0x13344f(0x33c)](),pushNetEvent({'type':_0x13344f(0x337),'name':'orb'});let _0x3b56d1=0x0,_0x1b072c='';switch(_0x4dc449['type']){case 0x0:_0x4e4585[_0x13344f(0x280)]=Math['min'](0x64,_0x4e4585[_0x13344f(0x280)]+0x23),_0x3b56d1=0x32*combo,_0x1b072c='+'+_0x3b56d1+'\x20⚡';break;case 0x1:_0x4e4585[_0x13344f(0x280)]=Math[_0x13344f(0x260)](0x64,_0x4e4585[_0x13344f(0x280)]+0x3c),_0x3b56d1=0x4b*combo,_0x1b072c='+'+_0x3b56d1+_0x13344f(0x1df);break;case 0x2:_0x3b56d1=0x64*combo,_0x1b072c='+'+_0x3b56d1+'\x20⭐';break;case 0x3:if(shields<maxShields)shields++;_0x3b56d1=0x96*combo,_0x1b072c='+'+_0x3b56d1+_0x13344f(0x36a);break;}score+=_0x3b56d1,combo++;if(combo>maxCombo)maxCombo=combo;comboTimer=Math.min(0x258,0xb4+combo*0x5+getUpgradeRank('combo')*30),showFloatingText(_0x4dc449['x'],_0x4dc449['y']-0x14,_0x1b072c,_0x4dc449['color']),pushNetEvent({'type':_0x13344f(0x2cf),'x':_0x4dc449['x'],'y':_0x4dc449['y']-0x14,'text':_0x1b072c,'color':_0x4dc449[_0x13344f(0x2b8)]}),spawnParticles(_0x4dc449['x'],_0x4dc449['y'],_0x4dc449[_0x13344f(0x2b8)],0xf,0x3,0x19),orbs[_0x13344f(0x2db)](_0x49b3a1,0x1),flashScreen(_0x13344f(0x37a));}}),powerups['forEach']((_0x5c5e64,_0x4f10d5)=>{const _0x5017a0=_0xf987f6;dist(_0x4e4585,_0x5c5e64)<_0x4e4585[_0x5017a0(0x24a)]+_0x5c5e64[_0x5017a0(0x24a)]+0xa+getUpgradeRank('magnet')*12&&(activePowerup=_0x5c5e64[_0x5017a0(0x2f5)],powerupTimer=powerupMaxTime=_0x5c5e64[_0x5017a0(0x2f5)]===_0x5017a0(0x34d)?0x1e0:_0x5c5e64[_0x5017a0(0x2f5)]==='slowmo'?0x12c:_0x5c5e64[_0x5017a0(0x2f5)]===_0x5017a0(0x2d8)?0x168:0x0,document[_0x5017a0(0x23e)]('powerupDisplay')['classList'][_0x5017a0(0x2d9)](_0x5017a0(0x22a)),document[_0x5017a0(0x23e)](_0x5017a0(0x21d))[_0x5017a0(0x2cc)]=_0x5c5e64['name'],_0x5c5e64[_0x5017a0(0x2f5)]===_0x5017a0(0x2b6)&&(spawnExplosion(_0x4e4585['x'],_0x4e4585['y'],0x12c),pushNetEvent({'type':'explosion','x':_0x4e4585['x'],'y':_0x4e4585['y'],'size':0x12c}),asteroids=asteroids[_0x5017a0(0x330)](_0x38cfad=>dist(_0x4e4585,_0x38cfad)>0x12c),enemies=enemies[_0x5017a0(0x330)](_0x320447=>dist(_0x4e4585,_0x320447)>0x12c)),showFloatingText(_0x5c5e64['x'],_0x5c5e64['y']-0x1e,_0x5c5e64[_0x5017a0(0x289)],_0x5c5e64['color']),pushNetEvent({'type':'floatingText','x':_0x5c5e64['x'],'y':_0x5c5e64['y']-0x1e,'text':_0x5c5e64[_0x5017a0(0x289)],'color':_0x5c5e64[_0x5017a0(0x2b8)]}),powerups['splice'](_0x4f10d5,0x1));});});}function spawnWaveLogic(){const _0x4081c3=_0x37194f;if(gameMode===_0x4081c3(0x36b)&&!isNetHost)return;if(isCalmPeriod){calmTimer--;if(calmTimer<=0x0){isCalmPeriod=![],waveTimer=0x0,wave++,difficultyMult=0x1+(wave-0x1)*0.15,announceWave(wave),pushNetEvent({'type':_0x4081c3(0x29a),'wave':wave});if(wave%0x5===0x0)spawnBoss();}return;}waveTimer++;if(!boss&&waveTimer%Math[_0x4081c3(0x234)](0xf,0x3c-wave*0x2)===0x0){if(rand(0x0,0x1)>0.8)spawnEnemy();else spawnAsteroid();}if(waveTimer%Math[_0x4081c3(0x234)](0x3c,0x96-wave*0x5)===0x0)spawnOrb();if(waveTimer%0x258===0x0&&rand(0x0,0x1)>0.5)spawnPowerup(rand(0x64,canvas['width']-0x64),rand(0x64,canvas[_0x4081c3(0x239)]-0x64));waveTimer>=waveDuration&&!boss&&(isCalmPeriod=!![],calmTimer=0x78);}function draw(){
    const preset = getGraphicsPreset();
    drawBackdrop();
    ctx.globalAlpha = 1;
    ctx.save();
    if (isCameraWorldActive()) {
        ctx.translate(-cameraX, -cameraY);
        drawCameraWorldBoundary();
    }
    if (boss && typeof drawBossPlanetBackground === 'function') drawBossPlanetBackground();

    players.forEach((player) => {
        if (!player.active || player.downed) return;
        const trail = player.trail || [];
        const start = Math.max(1, trail.length - preset.trailPoints);
        for (let index = start; index < trail.length; index += 1) {
            const point = trail[index];
            const previous = trail[index - 1];
            const intensity = point.life / 30;
            ctx.strokeStyle = player.color;
            ctx.globalAlpha = intensity * (preset.laserGlow ? 0.6 : 0.42);
            ctx.lineWidth = intensity * (preset.laserGlow ? 5 : 3.8);
            ctx.beginPath();
            ctx.moveTo(previous.x, previous.y);
            ctx.lineTo(point.x, point.y);
            ctx.stroke();
        }
    });
    ctx.globalAlpha = 1;

    drawLaserBeams();
    drawShards();
    drawAsteroids();
    drawEnemies();
    drawBossProjectiles();
    if (boss) drawBoss();
    drawOrbs();
    drawPowerups();
    drawPlayers();
    if (typeof drawRunAbilityEffects === 'function') drawRunAbilityEffects();
    drawParticles();
    drawExplosions();
    drawFloatingTexts();
    ctx.restore();
    drawRadar();
}
function drawPlayers(){
    const quality = getGraphicsPreset();
    players.forEach((player) => {
        if (!player.active) return;
        ctx.save();
        ctx.translate(player.x, player.y);

        if (player.downed) {
            const pulse = 1 + Math.sin(gameTime * 0.1) * 0.08;
            ctx.beginPath();
            ctx.arc(0, 0, 18 * pulse, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(24, 12, 36, 0.72)';
            ctx.fill();
            ctx.strokeStyle = player.color || '#ff769f';
            ctx.lineWidth = 1.5;
            ctx.stroke();
            ctx.setLineDash([2, 5]);
            ctx.beginPath();
            ctx.arc(0, 0, 24 * pulse, 0, Math.PI * 2);
            ctx.strokeStyle = 'rgba(255, 198, 226, 0.65)';
            ctx.lineWidth = 1;
            ctx.stroke();
            ctx.setLineDash([]);
            ctx.fillStyle = '#fff5fb';
            ctx.font = '700 8px Orbitron, sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText('SOS', 0, 3);
            ctx.restore();
            return;
        }

        if (player.invincible > 0 && Math.floor(player.invincible / 4) % 2 === 0) {
            ctx.restore();
            return;
        }

        ctx.rotate(player.angle || 0);
        const primary = player.color || '#64c8ff';
        const accent = player.secondaryColor || primary;
        const boost = player.boostColor || accent;
        const speed = player.speed || 0;

        if (speed > 0.5) {
            const plumeLength = 5 + Math.min(speed, player.boostSpeed || 10) * 1.1;
            ctx.beginPath();
            ctx.moveTo(-12, -3.1);
            ctx.lineTo(-12 - plumeLength, 0);
            ctx.lineTo(-12, 3.1);
            ctx.closePath();
            if (quality.gradientMaterials) {
                const plume = ctx.createLinearGradient(-12, 0, -12 - plumeLength, 0);
                plume.addColorStop(0, 'rgba(235, 250, 255, 0.96)');
                plume.addColorStop(0.18, boost);
                plume.addColorStop(1, 'rgba(40, 170, 255, 0)');
                ctx.fillStyle = plume;
            } else {
                ctx.globalAlpha = 0.62;
                ctx.fillStyle = boost;
            }
            ctx.fill();

            if (quality.gradientMaterials) {
                ctx.globalAlpha = 0.82;
                ctx.beginPath();
                ctx.moveTo(-12, -1.2);
                ctx.lineTo(-12 - plumeLength * 0.58, 0);
                ctx.lineTo(-12, 1.2);
                ctx.closePath();
                ctx.fillStyle = '#f4fcff';
                ctx.fill();
            }
            ctx.globalAlpha = 1;
        }

        let wingGradient = null;
        if (quality.gradientMaterials) {
            wingGradient = ctx.createLinearGradient(-10, -15, 8, 0);
            wingGradient.addColorStop(0, 'rgba(10, 20, 39, 0.98)');
            wingGradient.addColorStop(0.62, accent);
            wingGradient.addColorStop(1, 'rgba(220, 242, 255, 0.92)');
        }
        ctx.fillStyle = wingGradient || accent;
        ctx.globalAlpha = 0.88;
        ctx.beginPath();
        ctx.moveTo(6, -3);
        ctx.lineTo(-3, -14);
        ctx.lineTo(-11, -13);
        ctx.lineTo(-8, -4);
        ctx.lineTo(-12, -2);
        ctx.closePath();
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(6, 3);
        ctx.lineTo(-3, 14);
        ctx.lineTo(-11, 13);
        ctx.lineTo(-8, 4);
        ctx.lineTo(-12, 2);
        ctx.closePath();
        ctx.fill();
        ctx.globalAlpha = 1;

        ctx.strokeStyle = 'rgba(225, 243, 255, 0.38)';
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.moveTo(3, -4);
        ctx.lineTo(-6, -10.5);
        ctx.moveTo(3, 4);
        ctx.lineTo(-6, 10.5);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(23, 0);
        ctx.lineTo(10, -3.4);
        ctx.lineTo(4, -8);
        ctx.lineTo(-5, -8);
        ctx.lineTo(-9, -5);
        ctx.lineTo(-15, -4);
        ctx.lineTo(-17, -2);
        ctx.lineTo(-17, 2);
        ctx.lineTo(-15, 4);
        ctx.lineTo(-9, 5);
        ctx.lineTo(-5, 8);
        ctx.lineTo(4, 8);
        ctx.lineTo(10, 3.4);
        ctx.closePath();
        let hull = null;
        if (quality.gradientMaterials) {
            hull = ctx.createLinearGradient(-17, 0, 23, 0);
            hull.addColorStop(0, '#17253a');
            hull.addColorStop(0.28, primary);
            hull.addColorStop(0.72, '#a8c9e2');
            hull.addColorStop(1, '#f4fbff');
        }
        ctx.fillStyle = hull || primary;
        ctx.fill();
        ctx.strokeStyle = 'rgba(231, 246, 255, 0.9)';
        ctx.lineWidth = 1.2;
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(16, 0);
        ctx.lineTo(5, -1.45);
        ctx.lineTo(-7, -1.8);
        ctx.lineTo(-10, 0);
        ctx.lineTo(-7, 1.8);
        ctx.lineTo(5, 1.45);
        ctx.closePath();
        ctx.fillStyle = 'rgba(242, 251, 255, 0.24)';
        ctx.fill();

        ctx.beginPath();
        ctx.ellipse(4.5, 0, 5.1, 2.35, 0, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(6, 18, 36, 0.96)';
        ctx.fill();
        ctx.strokeStyle = 'rgba(201, 241, 255, 0.95)';
        ctx.lineWidth = 0.9;
        ctx.stroke();
        ctx.beginPath();
        ctx.ellipse(5.3, -0.65, 2.4, 0.65, -0.18, Math.PI, Math.PI * 2);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.78)';
        ctx.lineWidth = 0.75;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(-12.2, 0, 2.15, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(5, 13, 25, 0.95)';
        ctx.fill();
        ctx.beginPath();
        ctx.arc(-12.2, 0, 1.05, 0, Math.PI * 2);
        ctx.fillStyle = boost;
        ctx.fill();

        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(19, 0, 1.25, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = accent;
        ctx.beginPath();
        ctx.arc(-8.4, -11.5, 1.15, 0, Math.PI * 2);
        ctx.arc(-8.4, 11.5, 1.15, 0, Math.PI * 2);
        ctx.fill();

        if (gameMode === '2P' || gameMode === 'NET') {
            ctx.fillStyle = player.color;
            ctx.font = '700 9px Orbitron, sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(player.name, 0, -22);
        }
        ctx.restore();
    });
}
function drawAsteroids(){
    const quality = getGraphicsPreset();
    asteroids.forEach((asteroid) => {
        const vertices = asteroid.vertices || [];
        const radius = asteroid.radius || 20;
        ctx.save();
        ctx.translate(asteroid.x, asteroid.y);
        ctx.rotate(asteroid.rotation || 0);

        ctx.beginPath();
        if (vertices.length > 2) {
            vertices.forEach((point, index) => {
                if (index === 0) ctx.moveTo(point.x, point.y);
                else ctx.lineTo(point.x, point.y);
            });
        } else {
            ctx.arc(0, 0, radius, 0, Math.PI * 2);
        }
        ctx.closePath();
        ctx.fillStyle = asteroid.color || '#514b67';
        ctx.fill();

        if (quality.surfaceDetail) {
            ctx.save();
            ctx.clip();
            const surfaceShade = ctx.createRadialGradient(-radius * 0.38, -radius * 0.42, radius * 0.04, 0, 0, radius * 1.3);
            surfaceShade.addColorStop(0, 'rgba(226, 238, 255, 0.32)');
            surfaceShade.addColorStop(0.45, 'rgba(132, 154, 190, 0.08)');
            surfaceShade.addColorStop(1, 'rgba(4, 6, 18, 0.68)');
            ctx.fillStyle = surfaceShade;
            ctx.fillRect(-radius * 1.3, -radius * 1.3, radius * 2.6, radius * 2.6);
            ctx.restore();
        }

        if (quality.surfaceDetail && vertices.length > 3) {
            for (let i = 0; i < vertices.length; i += 2) {
                const pointA = vertices[i];
                const pointB = vertices[(i + 1) % vertices.length];
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.lineTo(pointA.x, pointA.y);
                ctx.lineTo(pointB.x, pointB.y);
                ctx.closePath();
                ctx.fillStyle = i % 4 === 0 ? 'rgba(198, 220, 255, 0.12)' : 'rgba(7, 10, 25, 0.16)';
                ctx.fill();
            }

            ctx.beginPath();
            ctx.moveTo(vertices[0].x, vertices[0].y);
            ctx.lineTo(vertices[1].x, vertices[1].y);
            ctx.strokeStyle = 'rgba(228, 240, 255, 0.36)';
            ctx.lineWidth = 1;
            ctx.stroke();
        }

        const craterRadius = Math.max(1.4, radius * 0.085);
        ctx.beginPath();
        ctx.ellipse(-radius * 0.22, -radius * 0.16, craterRadius, craterRadius * 0.68, -0.35, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(4, 8, 20, 0.58)';
        ctx.lineWidth = 1.35;
        ctx.stroke();
        ctx.beginPath();
        ctx.ellipse(-radius * 0.25, -radius * 0.2, craterRadius * 0.7, craterRadius * 0.38, -0.35, Math.PI * 1.08, Math.PI * 1.86);
        ctx.strokeStyle = 'rgba(226, 239, 255, 0.2)';
        ctx.lineWidth = 0.85;
        ctx.stroke();

        const damage = Math.max(0, Math.min(1, 1 - asteroid.hp / (asteroid.maxHp || 1)));
        if (damage > 0.04) {
            ctx.beginPath();
            ctx.moveTo(-radius * 0.48, -radius * 0.13);
            ctx.lineTo(-radius * 0.08, radius * 0.04);
            ctx.lineTo(radius * 0.12, radius * 0.43);
            ctx.moveTo(-radius * 0.08, radius * 0.04);
            ctx.lineTo(radius * 0.28, -radius * 0.31);
            ctx.strokeStyle = 'rgba(255, 139, 104, ' + (0.25 + damage * 0.65) + ')';
            ctx.lineWidth = 1 + damage * 0.8;
            ctx.stroke();
        }

        ctx.beginPath();
        if (vertices.length > 2) {
            vertices.forEach((point, index) => {
                if (index === 0) ctx.moveTo(point.x, point.y);
                else ctx.lineTo(point.x, point.y);
            });
        } else {
            ctx.arc(0, 0, radius, 0, Math.PI * 2);
        }
        ctx.closePath();
        ctx.strokeStyle = 'rgba(199, 217, 246, 0.55)';
        ctx.lineWidth = 1.15;
        ctx.stroke();
        ctx.restore();
    });
}
function drawShards(){const _0x1652f6=_0x37194f;shards[_0x1652f6(0x32c)](_0x452c11=>{const _0x46fb29=_0x1652f6,_0x24e375=_0x452c11[_0x46fb29(0x2b5)]/_0x452c11[_0x46fb29(0x351)];ctx[_0x46fb29(0x293)](),ctx[_0x46fb29(0x2a0)](_0x452c11['x'],_0x452c11['y']),ctx[_0x46fb29(0x1bb)](_0x452c11[_0x46fb29(0x331)]),ctx[_0x46fb29(0x379)]=_0x24e375,ctx['beginPath'](),_0x452c11[_0x46fb29(0x1c7)][_0x46fb29(0x32c)]((_0x1e9cc0,_0x2c20f5)=>_0x2c20f5===0x0?ctx[_0x46fb29(0x1fc)](_0x1e9cc0['x'],_0x1e9cc0['y']):ctx[_0x46fb29(0x262)](_0x1e9cc0['x'],_0x1e9cc0['y'])),ctx[_0x46fb29(0x309)](),ctx[_0x46fb29(0x226)]=_0x452c11[_0x46fb29(0x2b8)]||_0x46fb29(0x29d),ctx[_0x46fb29(0x219)](),ctx['strokeStyle']='rgba(255,\x20150,\x2050,\x20'+_0x24e375*0.7+')',ctx[_0x46fb29(0x220)]=0x1,ctx[_0x46fb29(0x2ae)](),ctx[_0x46fb29(0x1f3)]();}),ctx['globalAlpha']=0x1;}function drawEnemies(){
    enemies.forEach((enemy) => {
        ctx.save();
        ctx.translate(enemy.x, enemy.y);

        if (enemy.type === 'mine') {
            ctx.beginPath();
            ctx.arc(0, 0, enemy.radius, 0, Math.PI * 2);
            ctx.fillStyle = '#ff2222';
            ctx.fill();

            ctx.beginPath();
            ctx.arc(0, 0, enemy.radius * 1.38, 0, Math.PI * 2);
            ctx.strokeStyle = 'rgba(255, 70, 70, 0.42)';
            ctx.lineWidth = 1.2;
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(0, 0, enemy.radius * 0.4, 0, Math.PI * 2);
            ctx.fillStyle = '#ffffff';
            ctx.fill();
        } else if (enemy.type === 'pulse') {
            ctx.rotate(enemy.angle);
            ctx.beginPath();
            for (let i = 0; i < 8; i++) {
                const angle = i / 8 * Math.PI * 2;
                const radius = enemy.radius * (i % 2 === 0 ? 1 : 0.5);
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;
                if (i === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.closePath();
            ctx.fillStyle = '#aa00ff';
            ctx.fill();

            ctx.beginPath();
            ctx.arc(0, 0, enemy.radius * 0.18, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(247, 224, 255, 0.9)';
            ctx.fill();

            if (enemy.shockwave > 0) {
                ctx.beginPath();
                ctx.arc(0, 0, enemy.shockwave, 0, Math.PI * 2);
                ctx.strokeStyle = `rgba(170, 0, 255, ${Math.max(0, 1 - enemy.shockwave / 150)})`;
                ctx.lineWidth = 2;
                ctx.stroke();
            }
        }

        ctx.restore();
    });
}
function drawBoss(){
    const quality = getGraphicsPreset();
    const radius = boss.radius || 36;
    const rotation = boss.rotation || 0;
    const pulse = 1 + Math.sin(gameTime * 0.12) * 0.045;

    ctx.save();
    ctx.translate(boss.x, boss.y);

    if (quality.surfaceDetail) {
        ctx.save();
        ctx.rotate(-rotation * 0.55);
        ctx.setLineDash([3, 6]);
        ctx.beginPath();
        ctx.arc(0, 0, radius * 1.36, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(255, 91, 92, 0.48)';
        ctx.lineWidth = 1.3;
        ctx.stroke();
        ctx.setLineDash([]);
        for (let i = 0; i < 6; i++) {
            const angle = i / 6 * Math.PI * 2;
            ctx.beginPath();
            ctx.arc(Math.cos(angle) * radius * 1.36, Math.sin(angle) * radius * 1.36, 2.2, 0, Math.PI * 2);
            ctx.fillStyle = i % 2 ? '#ff794e' : '#ffe1a4';
            ctx.fill();
        }
        ctx.restore();
    }

    ctx.rotate(rotation);
    ctx.beginPath();
    for (let i = 0; i < 12; i++) {
        const angle = i / 12 * Math.PI * 2;
        const pointRadius = radius * (i % 2 === 0 ? 1 : 0.79);
        const x = Math.cos(angle) * pointRadius;
        const y = Math.sin(angle) * pointRadius;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    }
    ctx.closePath();
    let armor = null;
    if (quality.gradientMaterials) {
        armor = ctx.createRadialGradient(-radius * 0.28, -radius * 0.35, radius * 0.05, 0, 0, radius * 1.1);
        armor.addColorStop(0, '#f77b64');
        armor.addColorStop(0.38, '#823951');
        armor.addColorStop(1, '#201a31');
    }
    ctx.fillStyle = armor || '#823951';
    ctx.fill();
    ctx.strokeStyle = 'rgba(255, 150, 126, 0.92)';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.62, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(255, 182, 128, 0.42)';
    ctx.lineWidth = 1.3;
    ctx.stroke();
    for (let i = 0; i < 6; i++) {
        const angle = i / 6 * Math.PI * 2;
        ctx.beginPath();
        ctx.moveTo(Math.cos(angle) * radius * 0.56, Math.sin(angle) * radius * 0.56);
        ctx.lineTo(Math.cos(angle) * radius * 0.83, Math.sin(angle) * radius * 0.83);
        ctx.strokeStyle = 'rgba(255, 193, 146, 0.48)';
        ctx.lineWidth = 1.5;
        ctx.stroke();
    }

    let core = null;
    if (quality.gradientMaterials) {
        core = ctx.createRadialGradient(-radius * 0.11, -radius * 0.16, 1, 0, 0, radius * 0.38 * pulse);
        core.addColorStop(0, '#fff8d3');
        core.addColorStop(0.24, '#ffab52');
        core.addColorStop(0.64, '#ff4d42');
        core.addColorStop(1, '#681a53');
    }
    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.38 * pulse, 0, Math.PI * 2);
    ctx.fillStyle = core || '#ff7048';
    ctx.fill();
    ctx.strokeStyle = 'rgba(255, 227, 185, 0.88)';
    ctx.lineWidth = 1.2;
    ctx.stroke();

    for (let i = 0; i < 4; i++) {
        const angle = i / 4 * Math.PI * 2 + rotation * 0.4;
        const x = Math.cos(angle) * radius * 0.52;
        const y = Math.sin(angle) * radius * 0.52;
        ctx.beginPath();
        ctx.arc(x, y, radius * 0.085, 0, Math.PI * 2);
        ctx.fillStyle = '#ff914f';
        ctx.fill();
        ctx.strokeStyle = 'rgba(255, 231, 180, 0.72)';
        ctx.lineWidth = 1;
        ctx.stroke();
    }
    ctx.restore();
}
function drawOrbs(){
    const quality = getGraphicsPreset();
    orbs.forEach((orb) => {
        const phase = orb.pulsePhase || 0;
        const pulse = 1 + Math.sin(phase) * 0.12;
        const radius = (orb.radius || 12) * pulse;
        const fade = orb.lifetime < 120 ? Math.max(0, orb.lifetime / 120) : 1;

        ctx.save();
        ctx.translate(orb.x, orb.y);
        if (!quality.orbOrbit) {
            ctx.globalAlpha = fade;
            ctx.beginPath();
            ctx.arc(0, 0, radius, 0, Math.PI * 2);
            ctx.fillStyle = orb.color || '#72f3ff';
            ctx.fill();
            ctx.strokeStyle = 'rgba(226, 246, 255, 0.62)';
            ctx.lineWidth = 0.9;
            ctx.stroke();
            ctx.globalAlpha = fade * 0.78;
            ctx.beginPath();
            ctx.arc(-radius * 0.24, -radius * 0.26, Math.max(1.2, radius * 0.18), 0, Math.PI * 2);
            ctx.fillStyle = '#ffffff';
            ctx.fill();
            ctx.restore();
            return;
        }
        ctx.globalAlpha = fade * 0.42;
        ctx.save();
        ctx.rotate(phase * 0.35);
        ctx.scale(1, 0.42);
        ctx.beginPath();
        ctx.arc(0, 0, radius * 1.65, 0, Math.PI * 2);
        ctx.strokeStyle = orb.color;
        ctx.lineWidth = 1.1;
        ctx.stroke();
        ctx.restore();

        ctx.globalAlpha = fade * 0.25;
        ctx.save();
        ctx.rotate(-phase * 0.2);
        ctx.scale(1, 0.24);
        ctx.beginPath();
        ctx.arc(0, 0, radius * 1.42, 0, Math.PI * 2);
        ctx.strokeStyle = '#eaf8ff';
        ctx.lineWidth = 0.8;
        ctx.stroke();
        ctx.restore();

        const sphere = ctx.createRadialGradient(-radius * 0.3, -radius * 0.34, radius * 0.04, 0, 0, radius * 1.08);
        sphere.addColorStop(0, '#ffffff');
        sphere.addColorStop(0.16, orb.color);
        sphere.addColorStop(0.62, orb.color);
        sphere.addColorStop(1, '#18213a');
        ctx.globalAlpha = fade;
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, Math.PI * 2);
        ctx.fillStyle = sphere;
        ctx.fill();
        ctx.strokeStyle = 'rgba(226, 246, 255, 0.72)';
        ctx.lineWidth = 0.9;
        ctx.stroke();

        ctx.globalAlpha = fade * 0.88;
        ctx.beginPath();
        ctx.ellipse(-radius * 0.28, -radius * 0.34, radius * 0.2, radius * 0.11, -0.5, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
        const satelliteAngle = gameTime * 0.045 + phase;
        for (let i = 0; i < 2; i++) {
            const angle = satelliteAngle + i * Math.PI;
            ctx.beginPath();
            ctx.arc(Math.cos(angle) * radius * 1.45, Math.sin(angle) * radius * 0.58, Math.max(1.2, radius * 0.12), 0, Math.PI * 2);
            ctx.fillStyle = i === 0 ? '#f4fcff' : orb.color;
            ctx.fill();
        }
        ctx.restore();
    });
}

function drawPowerups(){
    const quality = getGraphicsPreset();
    powerups.forEach((powerup) => {
        const radius = powerup.radius || 10;
        const fade = powerup.lifetime < 120 ? Math.max(0, powerup.lifetime / 120) : 1;

        ctx.save();
        ctx.translate(powerup.x, powerup.y);
        ctx.rotate(powerup.angle || 0);
        if (!quality.powerupDetail) {
            ctx.globalAlpha = fade;
            ctx.beginPath();
            ctx.moveTo(0, -radius * 1.12);
            ctx.lineTo(radius * 0.88, 0);
            ctx.lineTo(0, radius * 1.12);
            ctx.lineTo(-radius * 0.88, 0);
            ctx.closePath();
            ctx.fillStyle = powerup.color || '#ffcc55';
            ctx.fill();
            ctx.strokeStyle = 'rgba(243, 250, 255, 0.72)';
            ctx.lineWidth = 1;
            ctx.stroke();
            ctx.restore();
            return;
        }
        ctx.globalAlpha = fade * 0.5;
        ctx.save();
        ctx.scale(1, 0.4);
        ctx.beginPath();
        ctx.arc(0, 0, radius * 1.72, 0, Math.PI * 2);
        ctx.strokeStyle = powerup.color;
        ctx.lineWidth = 1.1;
        ctx.stroke();
        ctx.restore();

        ctx.globalAlpha = fade;
        ctx.beginPath();
        ctx.moveTo(0, -radius * 1.12);
        ctx.lineTo(radius * 0.88, 0);
        ctx.lineTo(0, radius * 1.12);
        ctx.lineTo(-radius * 0.88, 0);
        ctx.closePath();
        const gem = ctx.createLinearGradient(-radius, -radius, radius, radius);
        gem.addColorStop(0, '#fff7dc');
        gem.addColorStop(0.24, powerup.color);
        gem.addColorStop(0.72, powerup.color);
        gem.addColorStop(1, '#20203b');
        ctx.fillStyle = gem;
        ctx.fill();
        ctx.strokeStyle = 'rgba(243, 250, 255, 0.9)';
        ctx.lineWidth = 1.1;
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, -radius * 0.82);
        ctx.lineTo(radius * 0.22, 0);
        ctx.lineTo(0, radius * 0.14);
        ctx.lineTo(-radius * 0.12, -radius * 0.04);
        ctx.closePath();
        ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(0, radius * 0.14);
        ctx.lineTo(radius * 0.7, 0);
        ctx.lineTo(0, radius * 0.9);
        ctx.closePath();
        ctx.fillStyle = 'rgba(5, 11, 27, 0.28)';
        ctx.fill();

        ctx.beginPath();
        ctx.arc(0, 0, radius * 0.13, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
        ctx.restore();
    });
}
function drawParticles(){const _0x470f32=_0x37194f;particles[_0x470f32(0x32c)](_0x7c506=>{const _0x17d084=_0x470f32;ctx[_0x17d084(0x379)]=_0x7c506[_0x17d084(0x2b5)]/_0x7c506[_0x17d084(0x351)],ctx[_0x17d084(0x226)]=_0x7c506['color'],ctx[_0x17d084(0x382)](),ctx[_0x17d084(0x258)](_0x7c506['x'],_0x7c506['y'],_0x7c506[_0x17d084(0x24a)],0x0,Math['PI']*0x2),ctx[_0x17d084(0x219)]();}),ctx[_0x470f32(0x379)]=0x1;}function drawExplosions(){
    const quality = getGraphicsPreset();
    explosions.forEach((explosion) => {
        const fade = Math.max(0, explosion.life / explosion.maxLife);
        const radius = Math.max(1, explosion.radius || 0);
        const phase = gameTime * 0.025;

        ctx.save();
        ctx.globalAlpha = fade * 0.22;
        ctx.beginPath();
        ctx.arc(explosion.x, explosion.y, radius * 0.72, 0, Math.PI * 2);
        ctx.fillStyle = '#ff9c45';
        ctx.fill();

        ctx.globalAlpha = fade * 0.88;
        ctx.beginPath();
        ctx.arc(explosion.x, explosion.y, radius, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(255, 130, 55, 0.94)';
        ctx.lineWidth = 1.2 + fade * 1.5;
        ctx.stroke();

        ctx.globalAlpha = fade * 0.62;
        ctx.beginPath();
        ctx.arc(explosion.x, explosion.y, radius * 0.68, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(255, 226, 154, 0.92)';
        ctx.lineWidth = Math.max(0.8, fade * 2.2);
        ctx.stroke();

        ctx.globalAlpha = fade * 0.72;
        for (let i = 0; i < quality.explosionSpokes; i++) {
            const angle = phase + i / quality.explosionSpokes * Math.PI * 2;
            const inner = radius * (0.76 + (i % 2) * 0.05);
            const outer = radius * (1.02 + (i % 2) * 0.12);
            ctx.beginPath();
            ctx.moveTo(explosion.x + Math.cos(angle) * inner, explosion.y + Math.sin(angle) * inner);
            ctx.lineTo(explosion.x + Math.cos(angle) * outer, explosion.y + Math.sin(angle) * outer);
            ctx.strokeStyle = i % 2 ? '#ffb25e' : '#fff0bd';
            ctx.lineWidth = i % 2 ? 1 : 1.6;
            ctx.stroke();
        }

        ctx.globalAlpha = fade * 0.86;
        ctx.beginPath();
        ctx.arc(explosion.x, explosion.y, Math.max(1.3, radius * 0.13), 0, Math.PI * 2);
        ctx.fillStyle = '#fff7d8';
        ctx.fill();
        ctx.restore();
    });
}
function drawFloatingTexts(){const _0x4c501c=_0x37194f;floatingTexts[_0x4c501c(0x32c)](_0x5e92f6=>{const _0x5ea3d2=_0x4c501c;ctx['globalAlpha']=_0x5e92f6[_0x5ea3d2(0x2b5)]/_0x5e92f6['maxLife'],ctx[_0x5ea3d2(0x226)]=_0x5e92f6[_0x5ea3d2(0x2b8)],ctx[_0x5ea3d2(0x1db)]='bold\x2018px\x20Orbitron',ctx[_0x5ea3d2(0x2a4)]=_0x5ea3d2(0x295),ctx[_0x5ea3d2(0x2fa)](_0x5e92f6[_0x5ea3d2(0x27d)],_0x5e92f6['x'],_0x5e92f6['y']);}),ctx[_0x4c501c(0x379)]=0x1;}function drawRadar(){
    const radius = 52;
    const centerX = canvas.width - radius - 18;
    const centerY = canvas.height - radius - 18;
    const reference = players[0] || { x: 0, y: 0 };
    const scale = radius / Math.max(1, canvas.width / 2);

    ctx.save();
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(3, 10, 24, 0.78)';
    ctx.fill();
    ctx.save();
    ctx.clip();

    ctx.strokeStyle = 'rgba(107, 177, 220, 0.2)';
    ctx.lineWidth = 0.8;
    for (const ring of [radius * 0.34, radius * 0.67]) {
        ctx.beginPath();
        ctx.arc(centerX, centerY, ring, 0, Math.PI * 2);
        ctx.stroke();
    }
    ctx.beginPath();
    ctx.moveTo(centerX - radius, centerY);
    ctx.lineTo(centerX + radius, centerY);
    ctx.moveTo(centerX, centerY - radius);
    ctx.lineTo(centerX, centerY + radius);
    ctx.stroke();

    const sweepAngle = gameTime * 0.035;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(centerX + Math.cos(sweepAngle) * radius, centerY + Math.sin(sweepAngle) * radius);
    ctx.strokeStyle = 'rgba(83, 245, 229, 0.72)';
    ctx.lineWidth = 1.1;
    ctx.stroke();

    const plot = (object, color, dotRadius) => {
        const x = centerX + (object.x - reference.x) * scale;
        const y = centerY + (object.y - reference.y) * scale;
        const dx = x - centerX;
        const dy = y - centerY;
        if (dx * dx + dy * dy > (radius - 2) * (radius - 2)) return;
        ctx.beginPath();
        ctx.arc(x, y, dotRadius, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
    };

    players.forEach((player) => {
        if (player.active && !player.downed) plot(player, player.color || '#dff8ff', 2.3);
    });
    asteroids.forEach((asteroid) => plot(asteroid, '#a8b5cb', 1.35));
    enemies.forEach((enemy) => plot(enemy, '#ff5b65', 1.8));
    orbs.forEach((orb) => plot(orb, orb.color || '#72f3ff', 1.8));
    if (boss) {
        const x = centerX + (boss.x - reference.x) * scale;
        const y = centerY + (boss.y - reference.y) * scale;
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(Math.PI / 4);
        ctx.fillStyle = '#ff9a52';
        ctx.fillRect(-2.5, -2.5, 5, 5);
        ctx.restore();
    }
    ctx.restore();

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(124, 224, 255, 0.68)';
    ctx.lineWidth = 1.2;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(centerX, centerY, 2.2, 0, Math.PI * 2);
    ctx.fillStyle = '#e9fbff';
    ctx.fill();
    ctx.restore();
}
let displayScore=0x0;function updateUI(){const _0x509670=_0x37194f;if(displayScore<score)displayScore+=Math[_0x509670(0x2de)]((score-displayScore)*0.1);document[_0x509670(0x23e)](_0x509670(0x2d4))[_0x509670(0x2cc)]=displayScore;if(displayScore>bestScore&&bestScore>0x0)document[_0x509670(0x23e)]('scoreValue')[_0x509670(0x238)][_0x509670(0x278)](_0x509670(0x270));document[_0x509670(0x23e)](_0x509670(0x2e9))[_0x509670(0x2cc)]='x'+combo,document[_0x509670(0x23e)](_0x509670(0x21f))['innerText']=kills,document['getElementById']('waveValue')[_0x509670(0x2cc)]=wave,document[_0x509670(0x23e)](_0x509670(0x375))[_0x509670(0x24d)]['width']=players[0x0][_0x509670(0x280)]+'%';(gameMode==='2P'||gameMode===_0x509670(0x36b))&&(document['getElementById'](_0x509670(0x273))['style'][_0x509670(0x35e)]=players[0x1][_0x509670(0x280)]+'%');activePowerup&&(document[_0x509670(0x23e)](_0x509670(0x2fc))['style']['width']=powerupTimer/powerupMaxTime*0x64+'%');let _0x5ef361='';for(let _0x403e20=0x0;_0x403e20<maxShields;_0x403e20++)_0x5ef361+=_0x509670(0x2b9)+(_0x403e20>=shields?_0x509670(0x1dd):'')+_0x509670(0x363);document['getElementById'](_0x509670(0x380))[_0x509670(0x243)]=_0x5ef361;if(gameMode==='NET'){const _0x108f6a=document['getElementById'](_0x509670(0x20a));if(_0x108f6a){const _0x101341=netManager[_0x509670(0x282)];_0x108f6a['innerText']=_0x101341>0x0?_0x101341+'ms':_0x509670(0x333),_0x108f6a['style'][_0x509670(0x2b8)]=_0x101341<0x32?_0x509670(0x343):_0x101341<0x64?'#ffcc00':_0x509670(0x277);}}}function announceWave(_0x4a17c9){const _0x37c95c=_0x37194f;sounds[_0x37c95c(0x233)](),pushNetEvent({'type':_0x37c95c(0x337),'name':_0x37c95c(0x252)});const _0x1e0fcc=document[_0x37c95c(0x23e)](_0x37c95c(0x29a));document['getElementById'](_0x37c95c(0x35d))[_0x37c95c(0x2cc)]=_0x4a17c9,_0x1e0fcc[_0x37c95c(0x238)][_0x37c95c(0x2d9)](_0x37c95c(0x22a)),_0x1e0fcc[_0x37c95c(0x24d)][_0x37c95c(0x1fa)]=_0x37c95c(0x244),_0x1e0fcc[_0x37c95c(0x283)],_0x1e0fcc[_0x37c95c(0x24d)][_0x37c95c(0x1fa)]=null,setTimeout(()=>_0x1e0fcc[_0x37c95c(0x238)][_0x37c95c(0x278)](_0x37c95c(0x22a)),0x7d0);}function gameLoop(){const _0x4bf9e7=_0x37194f;gameState===STATE[_0x4bf9e7(0x361)]&&(gameTime++,updatePlayers(),updateEntities(),checkCollisions(),spawnWaveLogic(),updateUI()),gameState===STATE[_0x4bf9e7(0x361)]&&(ctx[_0x4bf9e7(0x293)](),screenShake>0x0&&ctx[_0x4bf9e7(0x2a0)](Math[_0x4bf9e7(0x2c7)](screenShakeAngle)*screenShake,Math[_0x4bf9e7(0x254)](screenShakeAngle)*screenShake),draw(),ctx[_0x4bf9e7(0x1f3)]()),requestAnimationFrame(gameLoop);}window[_0x37194f(0x249)]=function(){const _0x1c4cc4=_0x37194f;sounds[_0x1c4cc4(0x2a9)](),sounds[_0x1c4cc4(0x2c3)]('gameplay'),gameMode==='NET'&&pushNetEvent({'type':'musicMode','mode':_0x1c4cc4(0x1cd)}),gameState=STATE['PLAYING'],document[_0x1c4cc4(0x23e)]('startScreen')['classList'][_0x1c4cc4(0x278)]('hidden'),document['getElementById'](_0x1c4cc4(0x2aa))[_0x1c4cc4(0x238)][_0x1c4cc4(0x2d9)](_0x1c4cc4(0x22a)),document.getElementById('xpHud').classList.remove('hidden'),gameMode===_0x1c4cc4(0x36b)?(document[_0x1c4cc4(0x23e)](_0x1c4cc4(0x2a2))[_0x1c4cc4(0x238)][_0x1c4cc4(0x2d9)](_0x1c4cc4(0x22a)),document[_0x1c4cc4(0x23e)]('netRoleLabel')['innerText']=isNetHost?_0x1c4cc4(0x23f):_0x1c4cc4(0x202)):document['getElementById'](_0x1c4cc4(0x2a2))[_0x1c4cc4(0x238)][_0x1c4cc4(0x278)](_0x1c4cc4(0x22a)),resetGame(),announceWave(0x1);},window[_0x37194f(0x259)]=function(){const _0x7fbb3=_0x37194f;document[_0x7fbb3(0x23e)]('gameOverScreen')[_0x7fbb3(0x238)][_0x7fbb3(0x278)](_0x7fbb3(0x22a)),document['getElementById'](_0x7fbb3(0x2d4))[_0x7fbb3(0x238)][_0x7fbb3(0x2d9)](_0x7fbb3(0x270)),startGame();},document[_0x37194f(0x23e)](_0x37194f(0x240))[_0x37194f(0x265)](_0x37194f(0x2b2),()=>window.startGame()),document[_0x37194f(0x23e)](_0x37194f(0x2b1))['addEventListener'](_0x37194f(0x2b2),restartGame);function resetGame(){resetRunProgression();const _0x44895a=_0x37194f;score=0x0,displayScore=0x0,combo=0x1,maxCombo=0x1,wave=0x1,shields=0x3,kills=0x0,gameTime=0x0,waveTimer=0x0,difficultyMult=0x1,activePowerup=null,boss=null,document['getElementById']('bossDisplay')[_0x44895a(0x238)][_0x44895a(0x278)]('hidden'),netEvents=[],players[0x0]['x']=canvas[_0x44895a(0x35e)]/(gameMode!=='1P'?0x3:0x2),players[0x0]['y']=canvas['height']/0x2,players[0x0]['vx']=0x0,players[0x0]['vy']=0x0,players[0x0][_0x44895a(0x24b)]=[],players[0x0][_0x44895a(0x33e)]=0x0,players[0x0][_0x44895a(0x280)]=0x64,players[0x0][_0x44895a(0x37c)]=!![],players[0x0]['downed']=![];gameMode!=='1P'?(players[0x1]['x']=canvas[_0x44895a(0x35e)]/0x3*0x2,players[0x1]['y']=canvas[_0x44895a(0x239)]/0x2,players[0x1]['vx']=0x0,players[0x1]['vy']=0x0,players[0x1][_0x44895a(0x24b)]=[],players[0x1][_0x44895a(0x33e)]=0x0,players[0x1][_0x44895a(0x280)]=0x64,players[0x1]['active']=!![],players[0x1][_0x44895a(0x2f2)]=![],document['getElementById']('p2EnergyBox')[_0x44895a(0x238)][_0x44895a(0x2d9)]('hidden')):(players[0x1][_0x44895a(0x37c)]=![],document[_0x44895a(0x23e)]('p2EnergyBox')[_0x44895a(0x238)][_0x44895a(0x278)](_0x44895a(0x22a)));asteroids=[],shards=[],orbs=[],particles=[],explosions=[],floatingTexts=[],lasers=[],enemies=[],powerups=[],initStars(),initNebula(),backdropFrame=0;if(gameMode!==_0x44895a(0x36b)||isNetHost){for(let _0xc586d4=0x0;_0xc586d4<0x5;_0xc586d4++)spawnAsteroid();}}function gameOver(){cancelUpgradePresentation();const _0x2f0ea4=_0x37194f;sounds['playGameOver'](),sounds[_0x2f0ea4(0x2c3)]('gameover'),pushNetEvent({'type':_0x2f0ea4(0x230)}),pushNetEvent({'type':_0x2f0ea4(0x26e),'mode':_0x2f0ea4(0x2c5)}),gameState=STATE['GAME_OVER'],score>bestScore&&(bestScore=score,localStorage[_0x2f0ea4(0x2ab)](_0x2f0ea4(0x1d0),bestScore)),document[_0x2f0ea4(0x23e)](_0x2f0ea4(0x24e))[_0x2f0ea4(0x2cc)]=score,document[_0x2f0ea4(0x23e)](_0x2f0ea4(0x253))[_0x2f0ea4(0x2cc)]=wave,document['getElementById'](_0x2f0ea4(0x2d7))[_0x2f0ea4(0x2cc)]='x'+maxCombo,document[_0x2f0ea4(0x23e)](_0x2f0ea4(0x286))[_0x2f0ea4(0x2cc)]=kills,document[_0x2f0ea4(0x23e)](_0x2f0ea4(0x34a))[_0x2f0ea4(0x2cc)]=bestScore,document['getElementById']('gameOverScreen')[_0x2f0ea4(0x238)][_0x2f0ea4(0x2d9)](_0x2f0ea4(0x22a));}; // Started by graphics-settings.js after the optimized loop is installed.
// Experience progression and upgrade draft.
const UPGRADE_CARDS = [
    { id: 'rapid', icon: '⚡', title: 'Импульсный разгон', description: 'Перезарядка оружия короче на 2 кадра.' },
    { id: 'plasma', icon: '✦', title: 'Плазменное ядро', description: 'Каждый лазерный луч наносит на 1 урон больше.' },
    { id: 'hyperdrive', icon: '➤', title: 'Гипердвигатель', description: 'Скорость и ускорение кораблей выше на 8%.' },
    { id: 'efficiency', icon: '◈', title: 'Ионный конденсатор', description: 'Каждый выстрел тратит на 18% меньше энергии.' },
    { id: 'shield', icon: '⬡', title: 'Дополнительный щит', description: 'Максимум щитов и текущий запас увеличиваются на 1.' },
    { id: 'magnet', icon: '◎', title: 'Гравитационный магнит', description: 'Сферы и бонусы подбираются с большего расстояния.' },
    { id: 'combo', icon: '∞', title: 'Стабилизатор комбо', description: 'Окно для продолжения серии увеличивается на 0,5 сек.' },
    { id: 'reactor', icon: '☼', title: 'Опытный реактор', description: 'За уничтожение целей начисляется на 25% больше опыта.' },
    { id: 'salvage', icon: '✧', title: 'Протокол утилизации', description: 'Обломки чаще оставляют энергетические сферы.' },
    { id: 'phase', icon: '⟡', title: 'Фазовая броня', description: 'После попадания неуязвимость длится на 15 кадров дольше.' },
    { id: 'shockwave', icon: '◉', title: 'Сверхзвуковая ударная волна', description: 'Активка: отталкивает врагов и астероиды. Ранги расширяют радиус и сокращают перезарядку.', category: 'active', maxRank: 5 },
    { id: 'phaseDash', icon: '➤', title: 'Фазовый рывок', description: 'Активка: быстрый рывок по курсу с короткой неуязвимостью.', category: 'active', maxRank: 3 },
    { id: 'spreadshot', icon: '✣', title: 'Расщепление луча', description: 'Пассивка: добавляет лучи веером; каждый луч наносит 50% урона.', category: 'passive', maxRank: 4 },
    { id: 'orbitalDefense', icon: '✦', title: 'Орбитальные обломки', description: 'Пассивка: астероиды вращаются вокруг корабля и отбрасывают задетые цели. До 9 штук.', category: 'passive', maxRank: 9 },
    { id: 'maneuvering', icon: '⟲', title: 'Манёвренный корпус', description: 'Пассивка: каждый ранг уменьшает инерцию и делает управление отзывчивее.', category: 'passive', maxRank: 5 },
    { id: 'ironWill', icon: '⬡', title: 'Железная воля', description: 'Пассивка · один раз за забег: переживает смертельное попадание, возвращая 1 щит.', category: 'passive', maxRank: 1 }
];

let experience = 0;
let pilotLevel = 1;
let pendingUpgradePicks = 0;
let upgradeChoiceOpen = false;
let networkUpgradePaused = false;
let upgradeLevels = Object.create(null);

function experienceForNextLevel(level) {
    return 100 + Math.max(0, level - 1) * 45;
}

function getUpgradeRank(id) {
    const runRank = upgradeLevels[id] || 0;
    const hangarRank = typeof getHangarUpgradeRank === 'function' ? getHangarUpgradeRank(id) : 0;
    return runRank + hangarRank;
}

function getShotEnergyCost() {
    const hangarMultiplier = typeof getHangarShotCostMultiplier === 'function'
        ? getHangarShotCostMultiplier()
        : 1;
    return Math.max(0.6, 2 * Math.pow(0.82, getUpgradeRank('efficiency')) * hangarMultiplier);
}

function refreshExperienceHud() {
    const fill = document.getElementById('xpFill');
    const track = fill && fill.parentElement;
    const levelLabel = document.getElementById('xpLevel');
    const amountLabel = document.getElementById('xpAmount');
    if (!fill || !track || !levelLabel || !amountLabel) return;

    const needed = experienceForNextLevel(pilotLevel);
    const progress = Math.min(100, Math.max(0, (experience / needed) * 100));
    fill.style.width = `${progress}%`;
    track.setAttribute('aria-valuenow', String(Math.round(progress)));
    levelLabel.textContent = `УРОВЕНЬ ${pilotLevel}`;
    amountLabel.textContent = `${experience} / ${needed} XP`;
}

function sendUpgradeNetworkMessage(type) {
    if (gameMode === 'NET' && isNetHost && netManager && netManager.isConnected) {
        netManager.send({ type, level: pilotLevel });
    }
}

function awardExperience(baseAmount) {
    if (gameMode === 'NET' && !isNetHost) return;

    const multiplier = 1 + getUpgradeRank('reactor') * 0.25;
    experience += Math.max(1, Math.round(baseAmount * multiplier));

    while (experience >= experienceForNextLevel(pilotLevel)) {
        experience -= experienceForNextLevel(pilotLevel);
        pilotLevel += 1;
        if (pilotLevel % 2 === 0) pendingUpgradePicks += 1;
    }

    refreshExperienceHud();
    if (pendingUpgradePicks > 0 && !upgradeChoiceOpen) openUpgradeDraft();
}

function getAvailableUpgradeCards() {
    const campaignAbilitiesEnabled = campaignActive && gameMode === '1P';
    return UPGRADE_CARDS.filter((card) => {
        if (card.category && !campaignAbilitiesEnabled) return false;
        if (card.maxRank && (upgradeLevels[card.id] || 0) >= card.maxRank) return false;
        if (card.id === 'rapid') return players.some((player) => player.shootRate > 5);
        if (card.id === 'shield') return maxShields < 10;
        if (card.id === 'salvage') return getUpgradeRank('salvage') < 8;
        if (card.id === 'combo') return getUpgradeRank('combo') < 12;
        return true;
    });
}

function shuffledUpgradeCards() {
    const cards = getAvailableUpgradeCards().slice();
    for (let index = cards.length - 1; index > 0; index -= 1) {
        const swapIndex = Math.floor(Math.random() * (index + 1));
        [cards[index], cards[swapIndex]] = [cards[swapIndex], cards[index]];
    }

    const draft = cards.slice(0, 3);
    if (campaignActive && gameMode === '1P') {
        ['active', 'passive'].forEach((category, categoryIndex) => {
            if (!cards.some((card) => card.category === category) || draft.some((card) => card.category === category)) return;
            const replacement = cards.find((card) => card.category === category && !draft.includes(card));
            let slot = categoryIndex === 0 ? 2 : 1;
            if (draft[slot] && draft[slot].category && draft[slot].category !== category) slot = categoryIndex === 0 ? 1 : 2;
            draft[slot] = replacement;
        });
    }
    return draft;
}

function renderUpgradeDraft() {
    const overlay = document.getElementById('upgradeOverlay');
    const choiceView = document.getElementById('upgradeChoiceView');
    const waitView = document.getElementById('upgradeWait');
    const cardsContainer = document.getElementById('upgradeCards');
    const title = document.getElementById('upgradeTitle');
    const subtitle = document.getElementById('upgradeSubtitle');
    if (!overlay || !choiceView || !waitView || !cardsContainer || !title || !subtitle) return;

    overlay.classList.remove('hidden');
    overlay.setAttribute('aria-hidden', 'false');
    choiceView.classList.remove('hidden');
    waitView.classList.add('hidden');
    title.textContent = `УРОВЕНЬ ${pilotLevel}`;
    subtitle.textContent = pendingUpgradePicks > 1
        ? `Выбери карту — осталось выборов: ${pendingUpgradePicks}`
        : 'Выбери одну из трёх карт';
    cardsContainer.replaceChildren();

    shuffledUpgradeCards().forEach((card, index) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'upgrade-card';
        button.style.setProperty('--card-index', String(index));
        button.setAttribute('aria-label', `${card.title}. ${card.description}`);

        const icon = document.createElement('span');
        icon.className = 'upgrade-card-icon';
        icon.setAttribute('aria-hidden', 'true');
        icon.textContent = card.icon;

        const rank = document.createElement('span');
        rank.className = 'upgrade-card-rank';
        const rankLabel = card.category === 'active' ? 'АКТИВКА' : card.category === 'passive' ? 'ПАССИВКА' : 'УСИЛЕНИЕ';
        rank.textContent = `${rankLabel} · РАНГ ${(upgradeLevels[card.id] || 0) + 1}`;
        if (card.category) button.classList.add(`upgrade-card-${card.category}`);

        const cardTitle = document.createElement('span');
        cardTitle.className = 'upgrade-card-title';
        cardTitle.textContent = card.title;

        const description = document.createElement('span');
        description.className = 'upgrade-card-description';
        description.textContent = card.description;

        const pick = document.createElement('span');
        pick.className = 'upgrade-card-pick';
        pick.textContent = 'ВЫБРАТЬ КАРТУ →';

        button.append(icon, rank, cardTitle, description, pick);
        button.addEventListener('click', () => chooseUpgrade(card.id));
        cardsContainer.appendChild(button);
    });
}

function openUpgradeDraft() {
    if (pendingUpgradePicks <= 0 || upgradeChoiceOpen || gameState === STATE.GAME_OVER) return;
    upgradeChoiceOpen = true;
    if (gameState === STATE.PLAYING) gameState = STATE.PAUSED;
    sendUpgradeNetworkMessage('UPGRADE_PAUSE');
    renderUpgradeDraft();
}

function applyUpgrade(id) {
    switch (id) {
        case 'rapid':
            players.forEach((player) => {
                player.shootRate = Math.max(5, player.shootRate - 2);
            });
            break;
        case 'hyperdrive':
            players.forEach((player) => {
                player.maxSpeed *= 1.08;
                player.boostSpeed *= 1.08;
                player.accel *= 1.08;
            });
            break;
        case 'shield':
            maxShields = Math.min(10, maxShields + 1);
            shields = Math.min(maxShields, shields + 1);
            break;
        case 'maneuvering':
            if (campaignActive && gameMode === '1P' && players[0]) {
                players[0].friction = Math.max(0.9, 0.99 - (upgradeLevels.maneuvering || 0) * 0.018);
            }
            break;
        // Plasma, energy, magnet, combo, reactor, salvage, phase armor and
        // run abilities are read by their combat systems through upgradeLevels.
    }
}

function chooseUpgrade(id) {
    if (!upgradeChoiceOpen || !UPGRADE_CARDS.some((card) => card.id === id)) return;

    upgradeLevels[id] = (upgradeLevels[id] || 0) + 1;
    applyUpgrade(id);
    if (typeof refreshRunAbilityHud === 'function') refreshRunAbilityHud();
    pendingUpgradePicks = Math.max(0, pendingUpgradePicks - 1);
    refreshExperienceHud();

    if (pendingUpgradePicks > 0) {
        renderUpgradeDraft();
        return;
    }

    upgradeChoiceOpen = false;
    const overlay = document.getElementById('upgradeOverlay');
    if (overlay) {
        overlay.classList.add('hidden');
        overlay.setAttribute('aria-hidden', 'true');
    }
    if (gameState !== STATE.GAME_OVER) gameState = STATE.PLAYING;
    if (typeof refreshRunAbilityHud === 'function') refreshRunAbilityHud();
    sendUpgradeNetworkMessage('UPGRADE_RESUME');
}

function showNetworkUpgradeWait(level) {
    networkUpgradePaused = true;
    gameState = STATE.PAUSED;
    const overlay = document.getElementById('upgradeOverlay');
    const choiceView = document.getElementById('upgradeChoiceView');
    const waitView = document.getElementById('upgradeWait');
    const waitTitle = waitView && waitView.querySelector('h2');
    if (!overlay || !choiceView || !waitView) return;

    if (waitTitle && level) waitTitle.textContent = `ПИЛОТ ВЫБИРАЕТ УСИЛЕНИЕ · УР. ${level}`;
    overlay.classList.remove('hidden');
    overlay.setAttribute('aria-hidden', 'false');
    choiceView.classList.add('hidden');
    waitView.classList.remove('hidden');
}

function hideNetworkUpgradeWait() {
    networkUpgradePaused = false;
    const overlay = document.getElementById('upgradeOverlay');
    const choiceView = document.getElementById('upgradeChoiceView');
    const waitView = document.getElementById('upgradeWait');
    if (overlay) {
        overlay.classList.add('hidden');
        overlay.setAttribute('aria-hidden', 'true');
    }
    if (choiceView) choiceView.classList.remove('hidden');
    if (waitView) waitView.classList.add('hidden');
    if (gameState === STATE.PAUSED) gameState = STATE.PLAYING;
}

function cancelUpgradePresentation() {
    if (upgradeChoiceOpen) sendUpgradeNetworkMessage('UPGRADE_RESUME');
    upgradeChoiceOpen = false;
    networkUpgradePaused = false;
    pendingUpgradePicks = 0;
    const overlay = document.getElementById('upgradeOverlay');
    const choiceView = document.getElementById('upgradeChoiceView');
    const waitView = document.getElementById('upgradeWait');
    if (overlay) {
        overlay.classList.add('hidden');
        overlay.setAttribute('aria-hidden', 'true');
    }
    if (choiceView) choiceView.classList.remove('hidden');
    if (waitView) waitView.classList.add('hidden');
}

function resetRunProgression() {
    cancelUpgradePresentation();
    experience = 0;
    pilotLevel = 1;
    pendingUpgradePicks = 0;
    upgradeLevels = Object.create(null);
    maxShields = 3;
    shields = 3;
    players.forEach((player) => {
        player.maxSpeed = 6;
        player.boostSpeed = 10;
        player.accel = 0.25;
        player.shootRate = 15;
        player.friction = 0.97;
    });
    if (typeof resetRunAbilityState === 'function') resetRunAbilityState();
    refreshExperienceHud();
}

document.addEventListener('keydown', (event) => {
    if ((upgradeChoiceOpen || networkUpgradePaused) && event.key === 'Escape') {
        event.preventDefault();
        event.stopImmediatePropagation();
    }
}, true);


function drawBackdrop(){
    const quality = getGraphicsPreset();
    const scale = quality.backdropScale * getCanvasRenderScale();
    const bitmapWidth = Math.max(1, Math.round(canvas.width * scale));
    const bitmapHeight = Math.max(1, Math.round(canvas.height * scale));

    if (backdropCanvas.width !== bitmapWidth || backdropCanvas.height !== bitmapHeight) {
        backdropCanvas.width = bitmapWidth;
        backdropCanvas.height = bitmapHeight;
        backdropFrame = 0;
    }
    backdropCtx.setTransform(scale, 0, 0, scale, 0, 0);

    if (backdropFrame++ % quality.backdropInterval === 0) {
        const background = backdropCtx;
        const width = canvas.width;
        const height = canvas.height;
        const maxSide = Math.max(width, height);
        background.globalAlpha = 1;
        background.fillStyle = '#040711';
        background.fillRect(0, 0, width, height);

        const ambient = background.createRadialGradient(width * 0.53, height * 0.44, 0, width * 0.53, height * 0.44, maxSide * 0.82);
        ambient.addColorStop(0, 'rgba(28, 28, 82, 0.28)');
        ambient.addColorStop(0.42, 'rgba(12, 30, 65, 0.13)');
        ambient.addColorStop(1, 'rgba(3, 6, 18, 0)');
        background.fillStyle = ambient;
        background.fillRect(0, 0, width, height);

        nebulaBlobs.forEach((blob) => {
            const pulse = 1 + Math.sin(blob.phase) * 0.2;
            const radius = blob.radius * pulse;
            const gradient = background.createRadialGradient(blob.x, blob.y, 0, blob.x, blob.y, radius);
            const strength = blob.alpha * 1.5 * quality.nebulaStrength;
            gradient.addColorStop(0, 'rgba(' + blob.color.r + ', ' + blob.color.g + ', ' + blob.color.b + ', ' + strength + ')');
            gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
            background.fillStyle = gradient;
            background.fillRect(blob.x - radius, blob.y - radius, radius * 2, radius * 2);
        });

        stars.forEach((star) => {
            const alpha = star.brightness * (0.5 + 0.5 * Math.sin(star.twinklePhase));
            background.globalAlpha = alpha;
            background.fillStyle = star.size > 2 ? '#e4f7ff' : '#ffffff';
            background.beginPath();
            background.arc(star.x, star.y, star.size, 0, Math.PI * 2);
            background.fill();

            if (quality.starCrosses && star.size > 2.1 && alpha > 0.65) {
                background.globalAlpha = alpha * 0.3;
                background.strokeStyle = '#91d9ff';
                background.lineWidth = 0.7;
                background.beginPath();
                background.moveTo(star.x - star.size * 2.4, star.y);
                background.lineTo(star.x + star.size * 2.4, star.y);
                background.moveTo(star.x, star.y - star.size * 2.4);
                background.lineTo(star.x, star.y + star.size * 2.4);
                background.stroke();
            }
        });

        const vignette = background.createRadialGradient(width * 0.5, height * 0.47, Math.min(width, height) * 0.18, width * 0.5, height * 0.47, maxSide * 0.83);
        vignette.addColorStop(0, 'rgba(1, 3, 12, 0)');
        vignette.addColorStop(0.62, 'rgba(1, 3, 12, 0.12)');
        vignette.addColorStop(1, 'rgba(1, 2, 9, 0.58)');
        background.globalAlpha = 1;
        background.fillStyle = vignette;
        background.fillRect(0, 0, width, height);
    }

    ctx.globalAlpha = 1;
    ctx.drawImage(backdropCanvas, 0, 0, canvas.width, canvas.height);
}
function drawLaserBeams(){
    const quality = getGraphicsPreset();
    lasers.forEach((laser) => {
        const color = laser.color || '#00ffff';
        const startX = laser.x - laser.vx;
        const startY = laser.y - laser.vy;

        ctx.save();
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(laser.x, laser.y);
        ctx.lineTo(startX, startY);

        if (quality.laserGlow) {
            ctx.globalAlpha = 0.2;
            ctx.strokeStyle = color;
            ctx.lineWidth = 8;
            ctx.stroke();
            ctx.globalAlpha = 0.95;
            ctx.strokeStyle = '#eafcff';
            ctx.lineWidth = 2.1;
        } else {
            ctx.globalAlpha = 0.78;
            ctx.strokeStyle = color;
            ctx.lineWidth = 2.4;
        }
        ctx.stroke();
        ctx.restore();
    });
}
