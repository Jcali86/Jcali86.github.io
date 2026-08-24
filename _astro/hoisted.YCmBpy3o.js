let to=null;function la(){to?.();const e=document.documentElement;let t=0;const o=()=>{e.classList.add("is-scrolling"),t&&clearTimeout(t),t=window.setTimeout(()=>e.classList.remove("is-scrolling"),180)};window.addEventListener("scroll",o,{passive:!0}),to=()=>{window.removeEventListener("scroll",o),t&&clearTimeout(t),e.classList.remove("is-scrolling")}}document.addEventListener("astro:page-load",la);let Je=null;function Eo(){Je?.(),Je=null;const e=new AbortController,{signal:t}=e,o=()=>{const R=window.getComputedStyle(document.documentElement).getPropertyValue("--top-nav-clearance");return Number.parseFloat(R)||112};let a=-1,i=0;const l=document.querySelector(".hero-mark"),m=document.documentElement,u=document.querySelector(".top-nav"),f=window.matchMedia("(prefers-reduced-motion: reduce)");let p=0,v=1,h=112,S=!1,b=!1,_=-1/0;const L=()=>{if(!l||f.matches)return;const R=performance.now();if(R-_<1500)return;_=R;const C=u?.getBoundingClientRect();if(!C)return;const F=C.bottom-4;[.5,.16,.84].forEach((w,d)=>{const ve=C.left+C.width*w;window.setTimeout(()=>{window.dispatchEvent(new CustomEvent("waxup:water-impulse",{detail:{x:ve,y:F,radius:84,strength:.135}}))},d*85)})},A=()=>{u&&(u.classList.add("nav-shine"),window.setTimeout(()=>u.classList.remove("nav-shine"),1200))},B=R=>{m.style.setProperty("--nav-progress",R.toFixed(4));const C=R>=.5;document.body.classList.toggle("nav-logo-docked",C),b&&C&&!S&&(L(),A()),S=C,b=!0},W=R=>{let C=0;for(;R;)C+=R.offsetTop,R=R.offsetParent;return C},V=()=>{h=o(),p=l?W(l):0,v=l?.offsetHeight||1},Q=()=>{if(!l){B(1);return}const R=h,C=p-window.scrollY,F=v;let w=(R-C)/(F*.8);w<0?w=0:w>1&&(w=1),B(w)},Z=()=>{const R=window.scrollY;R!==a&&(a=R,Q()),i=window.requestAnimationFrame(Z)};i=window.requestAnimationFrame(Z);const $=()=>{V(),a=-1};window.addEventListener("resize",$,{passive:!0,signal:t}),document.addEventListener("visibilitychange",()=>{document.hidden||(V(),a=-1)},{signal:t});let X=null;const N=document.querySelector(".hero-intro");N&&"ResizeObserver"in window&&(X=new ResizeObserver(()=>{V(),a=-1}),X.observe(N)),V(),Q(),Je=()=>{window.cancelAnimationFrame(i),e.abort(),X?.disconnect(),document.body.classList.remove("nav-logo-docked")}}document.addEventListener("astro:page-load",Eo);document.readyState!=="loading"&&Eo();const ca="waxup-weather-v1";function ha(e){if(!e||typeof e!="object")return!1;const t=e,o=typeof t.weatherCode=="number"?t.weatherCode:null;if(o!==null&&(o>=51&&o<=67||o>=80&&o<=86||o>=95&&o<=99))return!0;const a=typeof t.precipitation=="number"?t.precipitation:null;return a!==null&&a>.1}function it(){const e=document.documentElement,o=(new URLSearchParams(window.location.search).get("navWeather")||"").toLowerCase();if(o){const a=["storm","rain","rainy","cloudy","wet"],i=["splash","sun","sunny","clear","sunrise"];if(a.includes(o)){e.dataset.navWeather="rain";return}if(i.includes(o)){e.dataset.navWeather="clear";return}}try{const a=window.sessionStorage?.getItem(ca);if(a){const i=JSON.parse(a);if(ha(i?.data)){e.dataset.navWeather="rain";return}e.dataset.navWeather="clear";return}}catch{}e.dataset.navWeather="clear"}document.addEventListener("astro:page-load",it);window.addEventListener("waxup:weather-updated",it);document.readyState!=="loading"&&it();document.addEventListener("click",e=>{e.target?.closest("[data-nav-weather-cycle]")&&window.dispatchEvent(new CustomEvent("waxup:cycle-water"))});const oo="waxup-water-surface",da="(prefers-reduced-motion: reduce)",ua="(pointer: coarse)",ao="waxup:water-choreography",no="waxup:shore-choreography",ro="waxup:water-impulse",io="waxup:page-calm",Oe="waxup-water-mood-v1",O=[{id:"tropical-glass",value:0},{id:"bay-fog",value:1},{id:"marine-layer",value:2},{id:"sunbreak",value:3},{id:"rain",value:2}],fa=new Map([["tropical","tropical-glass"],["glass","tropical-glass"],["teal","tropical-glass"],["bay","bay-fog"],["fog","bay-fog"],["foggy","bay-fog"],["grey","bay-fog"],["gray","bay-fog"],["marine","marine-layer"],["overcast","marine-layer"],["pacific","marine-layer"],["sun","sunbreak"],["clear","sunbreak"]]);function so(e){if(!e)return null;const t=e.toLowerCase().trim(),o=fa.get(t)||t;return O.find(a=>a.id===o)||null}function ma(e,t){if(!e)return null;try{return e.getItem(t)}catch{return null}}function Ke(e,t,o){if(e)try{e.setItem(t,o)}catch{}}function lo(e){try{return window[e]}catch{return null}}function pa(){const e=new URLSearchParams(window.location.search),t=so(e.get("water")||e.get("waterMood")),o=lo("sessionStorage");if(lo("localStorage"),t)return Ke(o,Oe,t.id),t;if(e.has("rain")){const l=O.find(m=>m.id==="rain");if(l)return Ke(o,Oe,l.id),l}const a=so(ma(o,Oe));if(a)return a;const i=O.find(l=>l.id==="tropical-glass")||O[0];return Ke(o,Oe,i.id),i}const co="waxup-weather-v1",wa=10*60*1e3,Ro="waxup-geo-v1",va=10*60*1e3;function So(){try{const e=window.sessionStorage?.getItem(Ro);if(e){const t=JSON.parse(e);if(t&&typeof t.ts=="number"&&Date.now()-t.ts<va&&Number.isFinite(t.lat)&&Number.isFinite(t.lon))return{lat:t.lat,lon:t.lon}}}catch{}return null}function Lo(e,t){try{window.sessionStorage?.setItem(Ro,JSON.stringify({ts:Date.now(),lat:e,lon:t}))}catch{}}function Ao(){const e=new URLSearchParams(window.location.search).get("geo");if(!e)return{off:!1,coords:null};if(e==="off")return{off:!0,coords:null};const t=e.split(","),o=Number(t[0]),a=Number(t[1]);return t.length===2&&Number.isFinite(o)&&Number.isFinite(a)&&o>=-90&&o<=90&&a>=-180&&a<=180?{off:!1,coords:{lat:o,lon:a}}:{off:!1,coords:null}}async function ko(e,{force:t=!1}={}){if(!t)try{const o=window.sessionStorage?.getItem(co);if(o){const a=JSON.parse(o),i=a&&typeof a.ts=="number"&&Date.now()-a.ts<wa,l=!e||a?.data?.source==="browser-geo";if(i&&l)return a.data}}catch{}try{const o=e?`/api/weather?lat=${encodeURIComponent(e.lat)}&lon=${encodeURIComponent(e.lon)}`:"/api/weather",a=await fetch(o,{credentials:"omit"});if(!a.ok)return null;const i=await a.json();try{window.sessionStorage?.setItem(co,JSON.stringify({ts:Date.now(),data:i}))}catch{}try{window.dispatchEvent(new CustomEvent("waxup:weather-updated",{detail:i}))}catch{}return i}catch{return null}}function st(e){if(!e)return!1;const t=e.weatherCode;return typeof t=="number"&&(t>=51&&t<=67||t>=80&&t<=86||t>=95&&t<=99)||typeof e.precipitation=="number"&&e.precipitation>.1}function ot(e){return typeof e!="number"?3:e===51||e===53?1:e===55||e===56||e===57||e===61?2:e===63?3:e===65?4:e===66||e===67?3:e===80?2:e===81?3:e===82?5:e===95?4:e===96||e===99?5:3}function ga(e){const t=a=>O.find(i=>i.id===a)||O[0];if(st(e))return t("rain");const o=e?.weatherCode;if(typeof o=="number"){if(o===45||o===48)return t("bay-fog");if(o===3)return t("marine-layer");if(o===2)return t("tropical-glass");if(o===0||o===1)return t("sunbreak")}return t("tropical-glass")}async function ba(){const e=new URLSearchParams(window.location.search);if(e.get("water")||e.get("waterMood")||e.has("rain"))return null;const t=O.find(l=>l.id==="rain");if(!t)return null;if(e.get("simulateRain")==="1")return{mood:t,intensity:3};const o=Ao(),a=o.coords||So();o.coords&&Lo(o.coords.lat,o.coords.lon);const i=await ko(a);return st(i)?{mood:t,intensity:ot(i.weatherCode)}:null}const ho=`
    attribute vec2 a_position;

    varying vec2 v_uv;

    void main() {
      v_uv = a_position * 0.5 + 0.5;
      gl_Position = vec4(a_position, 0.0, 1.0);
    }
  `,ya=`
    precision highp float;

    uniform sampler2D u_state;
    uniform vec2 u_texel;
    uniform vec2 u_pointer;
    uniform float u_aspect;
    uniform float u_strength;
    uniform float u_radius;
    uniform vec4 u_phone;
    uniform vec4 u_choreo;
    uniform vec2 u_tilt;
    // Post-ride settle (0..1). When a fired wave completes, the ride's
    // leftover energy keeps sloshing in the height field — and under the
    // relief shading that residue reads as a mishmash of drifting light.
    // For ~1.5 s after completion the damping tightens so the sea swallows
    // the leftovers and settles back to the resting calm.
    uniform float u_calm;
    // Raindrop batch — up to MAX_DROPS independent impulses per sim step.
    // xy = UV position, z = UV radius, w = strength. Rain used to ride the
    // single pointer channel, which (a) capped it at one merged drop per
    // rendered frame and (b) yanked the pointer-ripple source to a random
    // spot on every spawn. A dedicated array lets a dense shower land many
    // simultaneous small drops while the pointer keeps its own impulse.
    uniform vec4 u_drops[8];
    uniform int u_dropCount;

    varying vec2 v_uv;

    float readHeight(vec2 uv) {
      return texture2D(u_state, uv).r * 2.0 - 1.0;
    }

    float roundedRectSdf(vec2 point, vec2 halfSize, float radius) {
      vec2 q = abs(point) - halfSize + vec2(radius);
      return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - radius;
    }

    void main() {
      vec4 state = texture2D(u_state, v_uv);
      float current = state.r * 2.0 - 1.0;
      float previous = state.g * 2.0 - 1.0;

      // Discrete wave equation. The red channel is the current height field;
      // the green channel carries the previous frame so the texture can
      // ping-pong without a third render target.
      float north = readHeight(v_uv + vec2(0.0, u_texel.y));
      float south = readHeight(v_uv - vec2(0.0, u_texel.y));
      float east = readHeight(v_uv + vec2(u_texel.x, 0.0));
      float west = readHeight(v_uv - vec2(u_texel.x, 0.0));
      // Anisotropic propagation so ripples stay circular in SCREEN space
      // regardless of viewport aspect. With uniform UV propagation the
      // wavefront stretches into an ellipse matching the viewport (e.g.
      // vertically elongated on iPhone portrait, where one UV-y unit
      // covers ~2× the screen pixels of one UV-x unit). Scaling per-axis
      // wave speed by aspect² compensates: faster UV propagation in the
      // dimension that has fewer screen pixels per UV unit, so the two
      // axes produce equal screen-distance per simulation step.
      //   alphaX + alphaY = 1.0 by construction → identical total energy /
      // CFL profile to the previous (sum * 0.5 - previous) formulation,
      // so dynamics and stability are unchanged.
      float aspect2 = u_aspect * u_aspect;
      float invDenom = 1.0 / (1.0 + aspect2);
      float alphaX = invDenom;
      float alphaY = aspect2 * invDenom;
      float next = (alphaX * (east + west) + alphaY * (north + south) - previous) *
        mix(0.989, 0.952, u_calm);

      // Pointer impulse — Laplacian-of-Gaussian (Mexican hat) profile.
      // Positive crest at center, deep negative ring at r ≈ 0.79*radius,
      // soft outer shoulder. This is the analytically correct seed for
      // concentric ring propagation in a 2D wave equation: the negative
      // ring becomes the first outward-moving crest, the wave equation
      // reflects the central rebound back outward as a second crest,
      // and so on — multi-ring "depth" structure falls out for free.
      vec2 pointerDelta = vec2((v_uv.x - u_pointer.x) * u_aspect, v_uv.y - u_pointer.y);
      float r2 = dot(pointerDelta, pointerDelta) / max(u_radius * u_radius, 0.00001);
      float pointerFalloff = (1.0 - r2 * 1.6) * exp(-r2 * 1.2);
      next += pointerFalloff * u_strength;

      // Raindrop impulses — same Mexican-hat profile as the pointer, one per
      // queued drop. The loop bound is constant (GLSL ES 1.00 requirement);
      // the break on u_dropCount keeps the cost proportional to the actual
      // batch, and the sim texture is only 256² on phones, so even a full
      // 8-drop frame is a trivial add.
      for (int i = 0; i < 8; i++) {
        if (i >= u_dropCount) break;
        vec4 drop = u_drops[i];
        vec2 dropDelta = vec2((v_uv.x - drop.x) * u_aspect, v_uv.y - drop.y);
        float dropR2 = dot(dropDelta, dropDelta) / max(drop.z * drop.z, 0.00001);
        next += (1.0 - dropR2 * 1.6) * exp(-dropR2 * 1.2) * drop.w;
      }

      // Device tilt — ambient bias with a deadzone. Three iterations of
      // reducing the coefficient (0.055 → 0.014 → 0.008) still left it
      // perceptible at rest, because the wave equation accumulates even
      // tiny per-frame forces into a visible steady-state slope. The
      // deadzone fixes that by zeroing the contribution for small tilt
      // magnitudes — holding the phone still or barely moving it
      // produces NO water response. Above ~0.10 normalized magnitude,
      // the gate ramps in smoothly so intentional tilts > ~15° still
      // drive a visible slosh.
      float tiltMag = length(u_tilt);
      float tiltGate = smoothstep(0.10, 0.20, tiltMag);
      vec2 tiltEff = u_tilt * tiltGate;
      float tiltField = tiltEff.x * (v_uv.x - 0.5) + tiltEff.y * (v_uv.y - 0.5);
      next += tiltField * 0.004;

      float stageInfluence = clamp(u_choreo.y, 0.0, 1.0);
      float velocity = clamp(u_choreo.z, -1.0, 1.0);
      float velocityAmount = min(abs(velocity), 1.0);
      float waveTravel = clamp(u_choreo.w, 0.0, 1.0);
      float waveEnvelope = sin(waveTravel * 3.14159265);
      float hasPhone = step(0.01, u_phone.z * u_phone.w);

      // Cheap phone geometry — hoisted so the ambient swell's hull gate and
      // the bow-wake block below can read it without recomputing.
      float phoneLeft = u_phone.x;
      float phoneRight = u_phone.x + u_phone.z;
      float phoneTop = 1.0 - u_phone.y;
      float phoneBottom = 1.0 - (u_phone.y + u_phone.w);
      float phoneCenterX = phoneLeft + u_phone.z * 0.5;
      float phoneCenterY = (phoneTop + phoneBottom) * 0.5;
      float trailingEdge = velocity >= 0.0 ? phoneBottom : phoneTop;
      float leadingEdge = velocity >= 0.0 ? phoneTop : phoneBottom;

      // The phone's wake / hull / pressure field — a big pile of exp,
      // smoothstep and sin per pixel — contributes nothing unless the phone
      // is on-screen AND the stage is scroll-active. u_phone / u_choreo are
      // uniforms, so this branch is COHERENT across every fragment: the GPU
      // skips the whole block for free wherever the phone isn't influencing
      // the water (hero, rain at the top, footer, scrolled past the stage).
      bool phoneActive = hasPhone > 0.5 && stageInfluence > 0.001;
      if (phoneActive) {
        vec2 hullPoint = vec2((v_uv.x - phoneCenterX) * u_aspect, v_uv.y - phoneCenterY);
        vec2 hullHalf = vec2(max(u_phone.z * u_aspect * 0.5, 0.001), max(u_phone.w * 0.5, 0.001));
        float hullRadius = min(hullHalf.x, hullHalf.y) * 0.18;
        float hullSdf = roundedRectSdf(hullPoint, hullHalf, hullRadius);
        float hullInside = (1.0 - smoothstep(-0.014, 0.020, hullSdf)) * hasPhone * stageInfluence;
        float hullOutside = smoothstep(-0.006, 0.020, hullSdf);
        float hullRim = (1.0 - smoothstep(0.0, 0.052, abs(hullSdf))) * hullOutside * hasPhone * stageInfluence;
        float sideBand = (1.0 - smoothstep(0.0, 0.115, abs(v_uv.x - phoneLeft))) +
          (1.0 - smoothstep(0.0, 0.115, abs(v_uv.x - phoneRight)));
        float verticalInside = smoothstep(phoneBottom - 0.08, phoneBottom + 0.12, v_uv.y) *
          (1.0 - smoothstep(phoneTop - 0.12, phoneTop + 0.08, v_uv.y));
        float trailingBand = 1.0 - smoothstep(0.0, 0.15, abs(v_uv.y - trailingEdge));
        float leadingBand = 1.0 - smoothstep(0.0, 0.12, abs(v_uv.y - leadingEdge));
        float widthBand = 1.0 - smoothstep(u_phone.z * 0.16, u_phone.z * 0.82, abs(v_uv.x - phoneCenterX));
        float wakeSigned = sin((v_uv.y - trailingEdge) * 42.0 + v_uv.x * 12.0);
        float entrySigned = sin((v_uv.y - leadingEdge) * 34.0 - v_uv.x * 8.0);
        // Surfboard-grade displacement — the hull pushes real volume when
        // scrolling, not a faint shimmer.
        next += hasPhone * stageInfluence * velocityAmount * (
          sideBand * verticalInside * 0.0065 +
          trailingBand * widthBand * wakeSigned * 0.0095 -
          leadingBand * widthBand * entrySigned * 0.0026
        );

        // Treat the phone as a solid hull in the simulation texture. The phone
        // itself sits above this canvas, but damping the height field inside its
        // rounded rect prevents broad waves from numerically passing straight
        // through the hidden area. The bright rim/pressure terms become the
        // water that piles up at the physical edge.
        float hullFlow = clamp(0.22 + velocityAmount * 0.28 + waveEnvelope * 0.18, 0.0, 0.78);
        float leadingPressure = exp(-pow((v_uv.y - leadingEdge) / 0.050, 2.0)) *
          (1.0 - smoothstep(u_phone.z * 0.44, u_phone.z * 0.74, abs(v_uv.x - phoneCenterX))) *
          hullOutside * hasPhone * stageInfluence;
        float sidePressure = sideBand * verticalInside * hullOutside * hasPhone * stageInfluence;
        next = mix(next, current * 0.66, hullInside * 0.92);
        next += (hullRim * 0.005 + leadingPressure * 0.016 + sidePressure * 0.002) * hullFlow;
        next -= leadingPressure * 0.003 * (1.0 - velocityAmount);
      }

      // Primary swell as a tall height-field bump (bell curve, not a flat
      // band). Pushed hard into the simulation so the wave equation
      // propagates it with real volume — the render shader's normal-based
      // lighting then paints the depth naturally instead of looking like
      // a horizontal reflection stripe. Lateral noise wobbles the wave
      // line so it doesn't read as a straight ruler edge.
      // The energy envelope replaces the symmetric sin: the wave builds,
      // peaks ~40% through the ride, then bleeds energy into the sandbank
      // and dies before the bottom of the stage.
      float waveEnergy = waveEnvelope * (1.0 - waveTravel * 0.5);
      float broadWaveY = 0.92 - waveTravel * 0.78;
      // Crest line drawn in the ambient swell train's family: long,
      // low-frequency curvature plus a slight oblique tilt — not the old
      // busy double-wiggle, which read as a different system arriving.
      // MUST stay identical to the render shader's broadNoiseR: the sim's
      // height bump and the lit crest ride one line.
      float broadNoiseLateral = sin(v_uv.x * 3.2 + waveTravel * 2.0) * 0.055 +
        sin(v_uv.x * 7.9 - waveTravel * 3.2) * 0.020 +
        (v_uv.x - 0.5) * 0.045;
      float waveOffset = (v_uv.y - broadWaveY + broadNoiseLateral) * 9.0;
      float broadWave = exp(-waveOffset * waveOffset);
      // Trough sits behind the crest — surface dips before returning. The
      // bright-dark pair is what gives the wave depth under the
      // normal-based lighting in the render shader.
      float troughOffset = (v_uv.y - broadWaveY + broadNoiseLateral - 0.085) * 6.5;
      float broadTrough = -exp(-troughOffset * troughOffset) * 0.7;
      float broadNoise = sin(v_uv.x * 10.0 + v_uv.y * 3.0);
      float waveHitsHull = hasPhone * stageInfluence *
        (1.0 - smoothstep(0.0, 0.22, abs(broadWaveY - leadingEdge)));
      float hullWaveGate = mix(1.0, smoothstep(u_phone.z * 0.45, u_phone.z * 0.78, abs(v_uv.x - phoneCenterX)), waveHitsHull * 0.88);
      next += (broadWave + broadTrough) * (0.034 + broadNoise * 0.006) * waveEnergy * hullWaveGate;

      // Bow wake — large-vessel Kelvin pattern: a churning apex at the
      // phone's leading edge with two divergent arms spreading outward,
      // plus a darker trough trailing each arm. The apex carries the most
      // displaced water; arms taper as they reach away from the bow.
      // Ambient baseline — even with no scroll, the phone is sitting in
      // water, so the bow always has a tiny constant displacement so the
      // visual doesn't collapse to nothing between active moments.
      // Phone-only — same coherent uniform branch as the hull block above,
      // so the GPU skips this whole bow/lower-surge field (the heaviest pile
      // of exp/pow/sin in the sim) whenever the phone isn't active.
      if (phoneActive) {
      float bowAmbient = stageInfluence * 0.018;
      float waveContact = 1.0 - smoothstep(0.0, 0.14, abs(broadWaveY - leadingEdge));
      float bowMotion = clamp(bowAmbient + velocityAmount * 0.16 + waveEnvelope * waveContact * 0.18, 0.0, 0.42);
      float bowDirSign = velocity >= 0.0 ? -1.0 : 1.0;
      float bowLateral = max(abs(v_uv.x - phoneCenterX) - u_phone.z * 0.45, 0.0);
      // Two divergent arms — inner main + outer secondary
      float bowLineA = leadingEdge + bowDirSign * bowLateral * 0.52;
      float bowLineB = leadingEdge + bowDirSign * bowLateral * 0.86;
      float bowDistA = abs(v_uv.y - bowLineA);
      float bowDistB = abs(v_uv.y - bowLineB);
      float bowArmA = exp(-bowDistA * bowDistA * 340.0);
      float bowArmB = exp(-bowDistB * bowDistB * 460.0) * 0.55;
      float bowExtent = exp(-bowLateral * 3.4);
      // Heavy apex churn at the bow itself — wide, soft bell.
      float apexDx = (v_uv.x - phoneCenterX) * 1.4;
      float apexDy = (v_uv.y - leadingEdge);
      float bowApex = exp(-(apexDx * apexDx + apexDy * apexDy) * 55.0);
      // Trough trailing the inner arm so the wake has shadow under
      // the crest, not just a bright line.
      float bowTroughDist = abs(v_uv.y - (bowLineA - bowDirSign * 0.026));
      float bowTrough = -exp(-bowTroughDist * bowTroughDist * 600.0) * bowExtent * 0.5;
      float bowOsc = sin(bowLateral * 44.0 - waveTravel * 6.2) * 0.5 + 0.5;
      next += hasPhone * stageInfluence * bowMotion * (
        (bowArmA + bowArmB) * bowExtent * (0.40 + bowOsc * 0.22) * 0.010 +
        bowApex * 0.012 +
        bowTrough * 0.006
      );

      // Broken wake edges behind the bow. Keep this edge-based rather than a
      // filled V; a filled mask flashes as a geometric triangle while
      // scrolling, which breaks the water illusion.
      float behindLead = max(0.0, (leadingEdge - v_uv.y) * bowDirSign);
      float vWidthHere = behindLead * 0.55 + u_phone.z * 0.45;
      float vEdgeDist = abs(abs(v_uv.x - phoneCenterX) - vWidthHere);
      float wakeEdge = exp(-vEdgeDist * vEdgeDist * 520.0) *
        smoothstep(0.0, 0.026, behindLead);
      float washDecay = exp(-behindLead * 3.6);
      float washChurn = sin(v_uv.x * 38.0 + v_uv.y * 26.0 - waveTravel * 9.0) * 0.5 + 0.5;
      float brokenWake = wakeEdge * washDecay * (0.38 + smoothstep(0.48, 0.98, washChurn) * 0.62);
      next += hasPhone * stageInfluence * bowMotion * brokenWake * 0.0006;

      // Lower bow surge — the phone is visually fixed, so this reads as water
      // piling up at the bottom edge before spilling around the hull. It is a
      // narrow crescent, not a filled mask, to avoid the old oval/triangle
      // artifacts while still giving the phone a more physical tidal push.
      float lowerDy = phoneBottom - v_uv.y;
      float lowerReach = smoothstep(0.0, 0.016, lowerDy) * (1.0 - smoothstep(0.14, 0.30, lowerDy));
      float lowerX = abs(v_uv.x - phoneCenterX);
      float lowerNormX = lowerX / max(u_phone.z * 0.50, 0.001);
      float lowerCurve = phoneBottom - 0.020 - lowerNormX * lowerNormX * 0.050 +
        sin(v_uv.x * 24.0 + waveTravel * 4.0) * 0.006;
      float lowerCrest = exp(-pow((v_uv.y - lowerCurve) / 0.026, 2.0)) *
        (1.0 - smoothstep(0.40, 1.18, lowerNormX)) * lowerReach;
      float lowerTrough = exp(-pow((v_uv.y - (lowerCurve - 0.052)) / 0.040, 2.0)) *
        (1.0 - smoothstep(0.32, 1.22, lowerNormX)) * lowerReach;
      float lowerArmLine = phoneBottom - 0.038 - max(lowerX - u_phone.z * 0.28, 0.0) * 0.46;
      float lowerArm = exp(-pow((v_uv.y - lowerArmLine) / 0.019, 2.0)) *
        smoothstep(u_phone.z * 0.24, u_phone.z * 0.58, lowerX) *
        (1.0 - smoothstep(u_phone.z * 0.58, u_phone.z * 1.12, lowerX)) *
        lowerReach;
      float lowerBowMotion = clamp(stageInfluence * (0.035 + velocityAmount * 0.60 + waveEnvelope * velocityAmount * 0.18), 0.0, 0.62);
      next += hasPhone * lowerBowMotion * (
        lowerCrest * 0.034 +
        lowerArm * 0.017 -
        lowerTrough * 0.013
      );
      }

      gl_FragColor = vec4(next * 0.5 + 0.5, current * 0.5 + 0.5, 0.0, 1.0);
    }
  `,xa=`
    precision highp float;

    uniform sampler2D u_state;
    uniform vec2 u_texel;
    uniform vec2 u_resolution;
    uniform float u_time;
    uniform float u_mood;
    uniform float u_moodTo;
    uniform float u_moodBlend;
    uniform vec4 u_phone;
    uniform vec4 u_choreo;
    // Footer shore-break: (bandTop, bandHeight, influence, surge) — band in
    // viewport-normalized CSS coordinates (top-down), influence eased in
    // frame(), surge set when a fired wave completes its ride (~2 s decay).
    uniform vec4 u_shore;
    // ?shoredebug — hot waterline overlay for harness screenshots.
    uniform float u_shoreDebug;
    // Copy-legibility calm, 0 = full drama → 1 = calm. Narrows the water's
    // VALUE range under long-form copy (relief/trough/swell shadow gains,
    // glitter, exposure compression, edge vignette floor, breaker apron) so
    // text stays readable. Value-only — hue and palette untouched. Not the
    // sim's u_calm (post-ride damping); this one never touches the sim.
    uniform float u_pageCalm;

    varying vec2 v_uv;

    const vec3 c_shadow = vec3(0.004, 0.106, 0.157);
    const vec3 c_deep = vec3(0.004, 0.216, 0.267);
    const vec3 c_lagoon = vec3(0.012, 0.486, 0.490);
    const vec3 c_shallow = vec3(0.031, 0.639, 0.620);
    const vec3 c_sun = vec3(0.761, 0.259, 0.102);
    const vec3 c_caustic = vec3(0.718, 1.0, 0.957);
    const vec3 c_electric = vec3(0.475, 0.980, 0.969);

    float readHeight(vec2 uv) {
      return texture2D(u_state, uv).r * 2.0 - 1.0;
    }

    // Pick a palette colour for a discrete mood value (0=tropical-glass,
    // 1=bay-fog, 2=marine-layer/rain, 3=sunbreak). This is the original
    // step-function; the cross-fade wrapper below blends two evaluations.
    vec3 moodColorAt(float m, vec3 tropical, vec3 bayFog, vec3 marineLayer, vec3 sunbreak) {
      if (m < 0.5) {
        return tropical;
      }

      if (m < 1.5) {
        return bayFog;
      }

      if (m < 2.5) {
        return marineLayer;
      }

      return sunbreak;
    }

    // Cross-fade between the "from" mood (u_mood) and the "to" mood (u_moodTo)
    // by u_moodBlend (0..1). When u_moodBlend is 0 the GPU output is identical
    // to the original hard-cut behaviour, so every existing instant mood path
    // (applyMood / cycle / weather) is unchanged. The weather cinematic eases
    // u_moodBlend 0→1 to dissolve smoothly between weather states.
    vec3 moodColor(vec3 tropical, vec3 bayFog, vec3 marineLayer, vec3 sunbreak) {
      vec3 fromCol = moodColorAt(u_mood, tropical, bayFog, marineLayer, sunbreak);
      if (u_moodBlend <= 0.0) {
        return fromCol;
      }
      vec3 toCol = moodColorAt(u_moodTo, tropical, bayFog, marineLayer, sunbreak);
      return mix(fromCol, toCol, u_moodBlend);
    }

    float moodFloatAt(float m, float tropical, float bayFog, float marineLayer, float sunbreak) {
      if (m < 0.5) {
        return tropical;
      }

      if (m < 1.5) {
        return bayFog;
      }

      if (m < 2.5) {
        return marineLayer;
      }

      return sunbreak;
    }

    float moodFloat(float tropical, float bayFog, float marineLayer, float sunbreak) {
      float fromVal = moodFloatAt(u_mood, tropical, bayFog, marineLayer, sunbreak);
      if (u_moodBlend <= 0.0) {
        return fromVal;
      }
      float toVal = moodFloatAt(u_moodTo, tropical, bayFog, marineLayer, sunbreak);
      return mix(fromVal, toVal, u_moodBlend);
    }

    float hash(vec2 p) {
      vec3 p3 = fract(vec3(p.xyx) * 0.1031);
      p3 += dot(p3, p3.yzx + 33.33);
      return fract((p3.x + p3.y) * p3.z);
    }

    float noise(vec2 p) {
      vec2 i = floor(p);
      vec2 f = fract(p);
      vec2 u = f * f * (3.0 - 2.0 * f);
      return mix(
        mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
        mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
        u.y
      );
    }

    // LOW_Q is #define'd into this source on low-power touch devices (see
    // initGl). The branches are preprocessor-time, so the cheap path carries
    // zero runtime cost: two noise octaves instead of three, and one fewer
    // glitter octave. The water reads slightly softer, which suits the
    // lower render DPR those devices already get.
    float oceanNoise(vec2 p) {
      float low = noise(p);
      float mid = noise(p * 2.17 + low * 1.8);
    #ifdef LOW_Q
      return low * 0.62 + mid * 0.38;
    #else
      float high = noise(p * 4.41 - mid * 1.2);
      return low * 0.52 + mid * 0.31 + high * 0.17;
    #endif
    }

    float roundedRectSdf(vec2 point, vec2 halfSize, float radius) {
      vec2 q = abs(point) - halfSize + vec2(radius);
      return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - radius;
    }

    // Micro-facet driver for the sun-glitter pass (which replaced the old
    // brokenCaustic/causticField strand web — that painted a fixed light
    // net UNDER the water: pool floor, not sea surface). baseSlope is the
    // real surface gradient — sim ripples, the traveling swell, the hero
    // bands — so every spark rides water that actually moves. Two drifting
    // single-octave slope fields add the wind-blown micro texture that
    // makes a sea sparkle; their domain is compressed in y and sheared a
    // touch so facets come out as long, wind-streaked flecks rather than
    // round confetti. The fields slide against each other, so facets churn
    // and sparks live and die on the slopes instead of forming a fixed net.
    // Cost: 3 noise() calls (2 on LOW_Q) vs the old web's ~27 (~14 LOW_Q).
    float glintFacet(vec2 uv, vec2 baseSlope, vec3 halfDir) {
      vec2 gp = vec2(uv.x + uv.y * 0.18, uv.y);
      // Facet scale sets the perceived ALTITUDE: tiny dense glints read as
      // sea from an airliner; these cell sizes (~60-90 px flecks on
      // desktop) put the camera at drone height — a hundred feet up, low
      // enough that each glint has visible shape and the field breathes
      // slowly instead of shimmering like static.
      // All three fields FLOW DOWN THE SCREEN — the same top-to-bottom
      // direction the fired waves and the hero swell bands travel — so the
      // glitter reads as light on water that is rolling toward the viewer,
      // not a texture drifting on its own. Screen-space speeds (offset
      // rate / y-scale): ~0.034, 0.042 and 0.040 uv/s — bracketing the
      // hero swell's 0.034 uv/s roll. The small RATE differences between
      // the fields (plus tiny opposing x drifts) are what make facets
      // churn and sparks live and die; identical rates would slide the
      // pattern rigidly.
      float sx = noise(gp * vec2(21.0, 48.0) + vec2(u_time * 0.05, u_time * 1.63)) - 0.5;
      float sy = noise(gp * vec2(24.7, 55.3) + vec2(41.7 - u_time * 0.04, 9.3 + u_time * 2.32)) - 0.5;
    #ifndef LOW_Q
      // A finer, faster octave adds the small pops that make the glitter
      // path fizz — kept LOW in the mix: too much fine ripple is exactly
      // what reads as "seen from a plane" instead of a big rolling sea.
      // LOW_Q drops it: fewer, larger, slower sparks — same look family.
      sx += (noise(gp * vec2(46.0, 100.0) + vec2(71.3 - u_time * 0.08, u_time * 4.0)) - 0.5) * 0.42;
    #endif
      // The sim slope keeps sparks riding real ripples/swell, but stays a
      // MINOR, soft-saturated ingredient: the sim texture is NEAREST-
      // filtered, so an unbounded multiplier turns its texel grid into
      // blocky flashes wherever the traveling wave steepens the field —
      // the rational falloff lets small ripples tilt facets fully while
      // steep wave faces stop sweeping the facet across the whole
      // highlight cone.
      vec2 simSlope = baseSlope * (0.45 / (1.0 + dot(baseSlope, baseSlope) * 1.6));
      vec3 facet = normalize(vec3(simSlope + vec2(sx, sy * 0.62) * 1.05, 1.0));
      return max(dot(facet, halfDir), 0.0);
    }

    void main() {
      float aspect = u_resolution.x / max(u_resolution.y, 1.0);
      // Portrait texture scale (Jules 2026-07-04: the open-water ripples
      // and ride foam read far LARGER than the footer's shore foam — out
      // of sync). Ambient/breaker texture domains are sized in aspect-
      // corrected units, so a portrait phone (~0.46 aspect) fits ~4x
      // fewer cells across its width than desktop. texScale tightens the
      // TEXTURE fields on narrow screens; the shore block (the reference
      // scale), the hull geometry (tied to the phone silhouette), and
      // the sim-locked crest line stay untouched.
      // Portrait end 1.6 → 1.4 (2026-07-12, Jules: phone frames read as
      // "too many black wave ripples — a bathtub"). 1.4 keeps most of the
      // foam-scale sync the 1.6 bought while letting ripple cells breathe
      // on a 375px frame. TUNE 1.35–1.45 from on-device screenshots.
      float texScale = mix(1.4, 1.0, smoothstep(0.75, 1.35, aspect));
      float stageProgress = clamp(u_choreo.x, 0.0, 1.0);
      float stageInfluence = clamp(u_choreo.y, 0.0, 1.0);
      float scrollVelocity = clamp(u_choreo.z, -1.0, 1.0);
      float velocityAmount = min(abs(scrollVelocity), 1.0);
      float waveTravel = clamp(u_choreo.w, 0.0, 1.0);
      float waveEnvelope = sin(waveTravel * 3.14159265);

      float center = readHeight(v_uv);
      float east = readHeight(v_uv + vec2(u_texel.x, 0.0));
      float west = readHeight(v_uv - vec2(u_texel.x, 0.0));
      float north = readHeight(v_uv + vec2(0.0, u_texel.y));
      float south = readHeight(v_uv - vec2(0.0, u_texel.y));

      float phoneLeft = u_phone.x;
      float phoneRight = u_phone.x + u_phone.z;
      float phoneTop = 1.0 - u_phone.y;
      float phoneBottom = 1.0 - (u_phone.y + u_phone.w);
      float phoneCenterX = phoneLeft + u_phone.z * 0.5;
      float hasPhone = step(0.01, u_phone.z * u_phone.w);
      float phoneCenterY = (phoneTop + phoneBottom) * 0.5;
      float trailingEdge = scrollVelocity >= 0.0 ? phoneBottom : phoneTop;
      float leadingEdge = scrollVelocity >= 0.0 ? phoneTop : phoneBottom;
      // Keep in sync with the sim shader's broadWaveY / waveEnergy.
      float broadWaveY = 0.92 - waveTravel * 0.78;
      float waveEnergyR = waveEnvelope * (1.0 - waveTravel * 0.5);
      float waveContactR = 1.0 - smoothstep(0.0, 0.14, abs(broadWaveY - leadingEdge));

      // Same coherent uniform branch as the sim shader: every phone term
      // below is already multiplied to zero by hasPhone * stageInfluence
      // when the phone isn't influencing the water, so skipping the math
      // entirely changes nothing visually — but this pass runs at full
      // viewport resolution (~8x the sim texture's pixel count), so on the
      // hero / rain / footer sections it's the single biggest GPU saving.
      bool phoneActive = hasPhone > 0.5 && stageInfluence > 0.001;

      // Phone-gated fields that feed the shared water pass. Defaults are
      // their exact no-phone values.
      float sideContact = 0.0;
      float trailingWake = 0.0;
      float leadingPush = 0.0;
      float wakeLift = 0.0;
      float phoneMicroY = 0.0;
      vec2 phoneFlow = vec2(0.0);
      float hullWaveMask = 1.0;

      if (phoneActive) {
        sideContact = (
          1.0 - smoothstep(0.0, 0.12, abs(v_uv.x - phoneLeft)) +
          1.0 - smoothstep(0.0, 0.12, abs(v_uv.x - phoneRight))
        ) * smoothstep(phoneBottom - 0.06, phoneBottom + 0.16, v_uv.y) *
          (1.0 - smoothstep(phoneTop - 0.18, phoneTop + 0.08, v_uv.y));
        float phoneWidthBand = 1.0 - smoothstep(u_phone.z * 0.22, u_phone.z * 0.9, abs(v_uv.x - phoneCenterX));
        trailingWake = (1.0 - smoothstep(0.0, 0.18, abs(v_uv.y - trailingEdge))) * phoneWidthBand;
        leadingPush = (1.0 - smoothstep(0.0, 0.12, abs(v_uv.y - leadingEdge))) * phoneWidthBand;
        phoneMicroY = hasPhone * stageInfluence * velocityAmount * (trailingWake - leadingPush * 0.35) * 0.012;
        phoneFlow = vec2(
          (smoothstep(0.0, 0.13, abs(v_uv.x - phoneLeft)) - smoothstep(0.0, 0.13, abs(v_uv.x - phoneRight))) * 0.004,
          -scrollVelocity * trailingWake * 0.018
        ) * hasPhone * stageInfluence * velocityAmount;
        wakeLift = hasPhone * stageInfluence * velocityAmount *
          (trailingWake * 0.070 + sideContact * 0.030 + leadingPush * 0.016);
        hullWaveMask = mix(
          1.0,
          smoothstep(u_phone.z * 0.43, u_phone.z * 0.82, abs(v_uv.x - phoneCenterX)),
          hasPhone * stageInfluence * waveContactR * 0.92
        );
      }

      // QW10: same coherent-uniform-branch pattern as phoneActive above —
      // stageInfluence is a uniform (u_choreo.y), identical across every
      // pixel in this draw call, so the branch is coherent (no per-pixel
      // divergence cost). When the phone stage has fully taken over
      // (stageInfluence ~1) heroSwell's (1.0 - stageInfluence) factor
      // already crushes it toward zero, so skipping the oceanNoise() call
      // — the most expensive term here — saves work without a visible
      // change, mirroring the phone-term skip above.
      float heroSwell = 0.0;
      if (stageInfluence < 0.999) {
        // Band count tracks the drone-height framing: a handful of broad
        // swells in view, not an airliner's field of ridges.
        heroSwell = (1.0 - stageInfluence) *
          smoothstep(0.52, 0.92, sin(v_uv.y * 5.0 * texScale + oceanNoise(v_uv * 1.6 * texScale + vec2(0.0, u_time * 0.026)) * 2.4 + u_time * 0.17) * 0.5 + 0.5);
      }

      // The ocean's base structure — an ambient SWELL TRAIN. Without it
      // the surface is statistically random, which reads as chop seen
      // from altitude, not a sea: a real ocean is a few long, gently
      // bent crest lines crossing the whole frame together. Two
      // incommensurate sine sets (a dominant train + a softer oblique
      // secondary) travel down-screen at the shared ~0.034 uv/s swell
      // speed; the low-frequency lane noise bends the lines away from
      // ruler-straightness (and is reused for the wind lanes below — no
      // extra noise cost). The train's SLOPE joins the surface normal,
      // so the sheen shades broad lit faces with dark backs — and since
      // the same normal biases the glitter facets, the sparkle gathers
      // along the lit faces of the same lines. The light draws the wave
      // shape; that organization is what makes it one large ocean.
      vec2 waterUv = vec2((v_uv.x - 0.5) * aspect + 0.5, v_uv.y);
      float laneNoise = noise(vec2(waterUv.x * 1.7, waterUv.y * 4.0) * texScale + vec2(u_time * 0.008, u_time * 0.04));
      float swellBend = laneNoise - 0.5;
      // Hoisted from the glitter block: the lane field also patches the
      // swell-tone deepening below, so shading and sparkle share one wind.
      // Wide thresholds (0.22-0.86): a tighter street edge printed a
      // traceable boundary line along the lane contours (Jules' "nonsense
      // lines" report) — the transition must be too gradual to follow.
      float windLane = smoothstep(0.22, 0.86, laneNoise);
      float swellPh1 = (v_uv.y * 16.0 + waterUv.x * 1.3) * texScale + swellBend * 3.0 - u_time * 0.55;
      float swellPh2 = (v_uv.y * 9.0 - waterUv.x * 0.8) * texScale + swellBend * 1.8 - u_time * 0.34;
      float swellSlopeY = cos(swellPh1) * 0.052 + cos(swellPh2) * 0.036;

      // Height gradients become normals for the water surface. A tiny
      // procedural wavelet layer is added here so untouched water stays
      // alive without constantly injecting energy into the simulation.
      float slow = u_time * 0.052;
      // Both micro-wavelet phases advance so the pattern drifts DOWN the
      // screen with the swell (the microY term used to run upstream).
      float microX = sin((v_uv.x * 11.0 + v_uv.y * 3.0) + slow) * 0.009;
      float microY = cos((v_uv.y * 14.0 - v_uv.x * 2.4) + slow * 0.86) * 0.009 +
        swellSlopeY +
        heroSwell * 0.018 +
        phoneMicroY;
      vec3 normal = normalize(vec3(
        -((east - west) * aspect * 4.8 + microX),
        -((north - south) * 4.8 + microY),
        1.0
      ));

      // One slow light source drifts over roughly a minute. The warmth is
      // intentionally tiny; teal water and cyan-white sun-glitter carry
      // this pass, while the brand/logo own the warmer notes.
      float drift = u_time * 0.104719755;
      vec3 lightDir = normalize(vec3(
        0.42 + sin(drift) * 0.28,
        0.24 + cos(drift * 0.87) * 0.18,
        0.72
      ));
      float light = max(dot(normal, lightDir), 0.0);

      vec2 framed = vec2((v_uv.x - 0.5) * aspect, v_uv.y - 0.42);
      float centerGlow = 1.0 - smoothstep(0.0, 0.86, length(framed));
      float verticalLift = smoothstep(0.04, 0.92, v_uv.y);
      vec3 moodShadow = moodColor(c_shadow, vec3(0.016, 0.075, 0.090), vec3(0.012, 0.106, 0.118), vec3(0.012, 0.102, 0.149));
      vec3 moodDeep = moodColor(c_deep, vec3(0.055, 0.151, 0.176), vec3(0.024, 0.188, 0.224), vec3(0.012, 0.251, 0.329));
      vec3 moodLagoon = moodColor(c_lagoon, vec3(0.176, 0.329, 0.341), vec3(0.039, 0.361, 0.376), vec3(0.031, 0.451, 0.486));
      vec3 moodShallow = moodColor(c_shallow, vec3(0.455, 0.557, 0.549), vec3(0.231, 0.545, 0.518), vec3(0.184, 0.667, 0.647));
      vec3 moodCaustic = moodColor(c_caustic, vec3(0.718, 0.820, 0.800), vec3(0.620, 0.906, 0.843), vec3(0.780, 1.0, 0.960));
      vec3 moodElectric = moodColor(c_electric, vec3(0.380, 0.780, 0.750), vec3(0.360, 0.863, 0.816), c_electric);

      vec3 water = mix(moodShadow, moodDeep, smoothstep(0.0, 0.42, v_uv.y));
      water = mix(water, moodLagoon, verticalLift * moodFloat(0.38, 0.22, 0.30, 0.34) + centerGlow * moodFloat(0.18, 0.08, 0.12, 0.15));
      water = mix(water, moodShallow, centerGlow * moodFloat(0.10, 0.035, 0.060, 0.085));
      // The swell train prints into the body tone as well — broad lit
      // faces, shaded backs (≤ ~9% swing, negative slope = the sunward
      // face, matching where the sparkle gathers). This makes the wave
      // lines readable even between sparks: the SHAPE of the sea, not
      // just its glitter. The extra max() term deepens only the shaded
      // backs a touch further (value-only, no hue change) — patched by
      // the wind-lane field so it reads as weather over the water, not
      // parallel stripes (uniform deepening made the bands read LAYERED).
      water *= 1.0 - swellSlopeY * mix(1.05, 0.72, u_pageCalm) -
        max(swellSlopeY, 0.0) * mix(0.45, 0.28, u_pageCalm) * (0.45 + windLane * 0.55);
      // Relief shading — the missing SHADOWS (Jules: waves have height,
      // light makes shadows; additive glints over a flat tone read as
      // light painted on a plate). The sim height field's slopes shade
      // TWO-SIDED against the light azimuth: faces toward the sun lift,
      // back faces drop into real shadow — so pointer rings, rain drops
      // and the fired wave get relief, not just sparkle. Reuses the four
      // height taps already fetched (zero new samples). Micro/swell/hero
      // slopes are EXCLUDED: the swell train prints its own tone above,
      // and double-printing re-invites the layered-band read. Soft
      // saturation keeps steep faces from clipping through.
      vec2 simGrad = vec2(-(east - west) * aspect, -(north - south)) * 4.8;
      float relief = dot(simGrad, normalize(lightDir.xy));
      relief = relief / (1.0 + abs(relief));
      // Tier base gains (value-only — the perf-tier branches are untouched):
      // phones render the same shading math denser (portrait texScale +
      // small frames + low DPR), so the dark ripple backs stack into the
      // "bathtub" read Jules flagged 2026-07-12. Touch tiers start from a
      // lighter base; u_pageCalm eases both toward the calm floor. TUNE.
#if defined(TOUCH_Q) || defined(LOW_Q)
      const float RELIEF_GAIN = 0.50;
      const float TROUGH_GAIN = 0.22;
#else
      const float RELIEF_GAIN = 0.62;
      const float TROUGH_GAIN = 0.30;
#endif
      water *= 1.0 + relief * mix(RELIEF_GAIN, 0.40, u_pageCalm);
      // Depth cue: troughs sit LOW and hold shadow regardless of slope
      // direction — height below the rest plane darkens.
      water *= 1.0 - clamp(-center, 0.0, 1.0) * mix(TROUGH_GAIN, 0.18, u_pageCalm);

      float crest = smoothstep(0.012, 0.105, abs(center));
      // Gentle domain warp only. The glitter's light-bending now happens
      // physically (sim slope inside glintFacet), so this inherited warp
      // is just texture drift — at the old 0.050 strength the normal flip
      // across the traveling wave's trailing ripples FOLDED the sampled
      // fields, which read as thin dark crease lines along the swell.
      vec2 refractedUv = waterUv + normal.xy * vec2(0.026, 0.018) + center * vec2(0.032, 0.020) + phoneFlow;
      float foamLift = smoothstep(0.070, 0.180, abs(center)) * moodFloat(0.07, 0.035, 0.052, 0.062);
      // Crest highlight only on the leading face of the swell — the side
      // facing the direction of travel — and a soft trough shadow behind
      // it. The light/dark asymmetry is what makes the band read as a
      // moving wave with mass instead of a flat pool reflection.
      // (Computed before the glitter block so the sparkle can gather on
      // the lit face of the traveling wave.)
      // Same crest-line curve as the sim shader's broadNoiseLateral (long
      // swell-family bend + oblique tilt) — keep the two in lockstep.
      float broadNoiseR = sin(v_uv.x * 3.2 + waveTravel * 2.0) * 0.055 +
        sin(v_uv.x * 7.9 - waveTravel * 3.2) * 0.020 +
        (v_uv.x - 0.5) * 0.045;
      float waveOffsetR = (v_uv.y - broadWaveY + broadNoiseR) * 7.5;
      float broadWaveR = exp(-waveOffsetR * waveOffsetR);
      float waveAhead = smoothstep(0.0, 0.06, broadWaveY - v_uv.y + broadNoiseR);
      float waveBehind = smoothstep(0.0, 0.10, v_uv.y - broadWaveY + broadNoiseR);
      float crestHighlight = broadWaveR * waveAhead * waveEnergyR;
      float troughShadow = broadWaveR * waveBehind * waveEnergyR;
      // Modest flat lift — the crest's brightness now comes mostly from
      // the sparkle that gathers on its face (glitter's crest boost) and
      // the whitewash, matching how the rest of the ocean carries light,
      // instead of a smooth painted band.
      float bigWaveLift = crestHighlight * 0.058 * hullWaveMask;

      // ---- Ocean sun-glitter ------------------------------------------
      // A reflection model, not a painted texture: the sun's image sits at
      // a spot on the surface (wandering with the same drift as lightDir,
      // so shading and glitter never disagree), and the dazzle concentrates
      // in an elliptical path around it, stretched along the sun azimuth —
      // bright near the reflection, settling to scattered sparks away from
      // it. Each spark is a wave facet (glintFacet: sim normal + wind-
      // streaked micro slopes) that mirrors the sun to the straight-down
      // viewer, so the light rides ripples, swells and the fired wave
      // instead of floating beneath them.
      vec3 halfDir = normalize(lightDir + vec3(0.0, 0.0, 1.0));
      vec2 sunUv = vec2(0.64, 0.66) + vec2(sin(drift) * 0.085, cos(drift * 0.87) * 0.055);
      vec2 sunAzim = normalize(lightDir.xy);
      vec2 sunRel = waterUv - sunUv;
      float alongSun = dot(sunRel, sunAzim);
      float acrossSun = dot(sunRel, vec2(-sunAzim.y, sunAzim.x));
      // Hovering-height framing: the pool fills more of the frame than it
      // would from altitude, edges soft.
      float sunPath = exp(-(alongSun * alongSun * 2.0 + acrossSun * acrossSun * 5.2));

      // Slow wind lanes — busy sparkle streets and calm dark streets, so
      // the field never reads as an even net. windLane is hoisted next to
      // laneNoise above (it now also patches the swell-tone deepening).
      float laneMix = 0.30 + 0.70 * windLane;

      float facetDot = glintFacet(refractedUv * texScale, normal.xy, halfDir);
      // Distance runs the DENSITY, not just the brightness: near the sun
      // the knee drops so whole families of facets catch; far away only a
      // near-perfect mirror flashes — dazzle by the source, a stray spark
      // or two out in the dark. The crest term gathers extra dazzle on the
      // lit forward face of the traveling wave.
      // Far-from-pool knee eased 0.9960 -> 0.9950 and the floor raised
      // (0.06 -> 0.12 below): the old values left the half of a WIDE
      // viewport away from the sun pool dead flat (Jules' report) — a
      // real sea twinkles sparsely everywhere, it is never featureless.
      float knee = mix(0.9950, 0.974, sunPath * sunPath);
      // Wide top edge on purpose: most sparks sit PARTIALLY lit, so they
      // read as translucent glints on the surface rather than opaque
      // confetti — the water's own colour carries through them.
      float spark = smoothstep(knee, 0.9992, facetDot);
      float glitterLift = spark * (0.12 + sunPath * 0.88) * laneMix *
        (1.0 + crestHighlight * 1.15) *
        moodFloat(0.26, 0.035, 0.08, 0.30);
      // Second tier: rare near-perfect mirrors flash brightest inside the
      // pool — the scattered stars that keep a quiet dazzle. One extra
      // smoothstep on the value already in hand.
      glitterLift += smoothstep(0.9980, 0.9995, facetDot) * sunPath * laneMix *
        moodFloat(0.18, 0.02, 0.05, 0.22);
      // Under copy the dazzle steps back — bright sparks behind white text
      // are the other half of the legibility problem (dark troughs being
      // the first). Value-only trim; the sparkle vocabulary is unchanged.
      glitterLift *= mix(1.0, 0.65, u_pageCalm);

      // Broad low luster riding the swell faces between sparks — the soft
      // "sun on the sea" sheen (replaces the old flat lightCaustic term).
      // No extra noise: it re-reads the smooth surface normal against the
      // same half-vector. Exponent stays MODERATE on purpose: a tighter
      // lobe draws hard bright/dark boundaries along the sim wave's
      // trailing ripples, which read as thin contour wires on the swell.
      float sheen = pow(max(dot(normal, halfDir), 0.0), 12.0);
      float sheenLift = sheen * (0.55 + sunPath * 0.45) * (0.72 + centerGlow * 0.28) *
        moodFloat(0.042, 0.024, 0.031, 0.045);

      // A small warm glint keeps the brand sunrise present without turning
      // the surrounding water into a moving sunset wash.
      float warmGlint = pow(smoothstep(0.78, 1.0, light), 6.6) * verticalLift * moodFloat(0.010, 0.002, 0.004, 0.008);

      // Ambient foam residuals — open water is never perfectly clean. A
      // band-pass on the SAME laneNoise sample (zero new noise) traces a
      // thin iso-contour on the lane boundaries. The dashing must produce
      // REAL GAPS: the old 0.62+0.38cos floor never let a strand break,
      // so the iso-contour read as one continuous drawn line (Jules'
      // "nonsense lines"). Two incommensurate phases gate segments hard —
      // short foam dashes, not curves. Below glitter prominence.
      float laneStrand = smoothstep(0.545, 0.575, laneNoise) - smoothstep(0.575, 0.605, laneNoise);
      float strandDash = smoothstep(0.25, 0.80, 0.5 + 0.5 * cos(swellPh1 + laneNoise * 6.0)) *
        (0.45 + 0.55 * cos(swellPh2 * 0.7 + laneNoise * 11.0));
      float residualLift = laneStrand * max(strandDash, 0.0) * moodFloat(0.032, 0.015, 0.021, 0.028);

      vec3 color = water;
      color += moodCaustic * residualLift;
      color += moodCaustic * sheenLift;
      // Sparks stay mostly the water's own caustic teal with only a lean
      // toward the breaker foam's near-white — translucent lit water, not
      // white paint. (Was 0.72 white; pulled back for subtlety.)
      color += mix(moodCaustic, vec3(0.93, 0.98, 0.97), 0.52) * glitterLift;
      color += moodElectric * crest * moodFloat(0.052, 0.026, 0.038, 0.047);
      color += moodCaustic * foamLift;
      color += moodCaustic * (wakeLift * 0.58 + bigWaveLift);
      // Trough shadow gives the wave depth — subtle subtractive band on
      // the back side of the crest so the swell looks like it has mass.
      color *= mix(1.0, 0.86, troughShadow * 0.22);

      // Breaking crest + churning whitewash REGION (Ocean refs 01/08/15:
      // clumpy cauliflower crest, wide marbled wash dissolving into lace,
      // near-black water around the foam). Coherent uniform branch — zero
      // cost between waves. Four oceanNoise fields (two plain on LOW_Q).
      // Foam BRIGHTNESS scales with waveEnergyR (dead at the sandbank);
      // wash REACH grows with waveTravel — the wave dies into its own
      // spreading foam field.
      // The extra waveEnergyR gate skips the whole block once the ride is
      // spent (< 1.5% foam brightness): the last stretch of travel used to
      // pay the block's full price for invisible output.
      if (waveTravel > 0.001 && waveTravel < 0.999 && waveEnergyR > 0.015) {
        // Break early — on phones the crest spends mid-ride hidden behind
        // the device.
        float breakAmount = smoothstep(0.06, 0.28, waveTravel);
        // fingerNoise displaces the FOAM's crest distance only (the sim's
        // height crest keeps the shared broadNoiseLateral line — the two
        // shaders must stay in lockstep). patchNoise is the coarse second
        // foam scale and the marble-warp source.
      #if defined(LOW_Q) || defined(TOUCH_Q)
        // Pure-trig stand-ins (zero noise cost): the crest displacement
        // must break the full-width line on this tier too — a smooth
        // parallel band is what reads as LAYERS, at any quality.
        // TOUCH_Q joins this path (2026-07-03): the marbled tier's extra
        // 3 oceanNoise pushed ride frames over the phone budget — judder.
        float fingerNoise = 0.5 + sin(v_uv.x * 6.1 * texScale + waveTravel * 2.7) * 0.18 +
          sin(v_uv.x * 2.3 * texScale - waveTravel * 1.9) * 0.14;
        float patchNoise = 0.5 + sin((v_uv.x * 3.4 + v_uv.y * 2.2) * texScale + u_time * 0.05) * 0.22;
      #else
        // Late-ride LOD: once waveEnergyR drops under 0.22 the foam is too
        // dim for its marbling to read — fall back to the LOW_Q trig
        // stand-ins (uniform-derived condition, coherent branch; if/else
        // rather than ternary so the noise genuinely isn't evaluated).
        // Halves the block's noise cost for the tail of every ride — the
        // wave finishing at the bottom of the screen is exactly where the
        // stage-end pile-up (ride + hull + shore branches together) hurt.
        float fingerNoise;
        float patchNoise;
        if (waveEnergyR > 0.22) {
          fingerNoise = oceanNoise(vec2(v_uv.x * 5.3 * texScale + 7.1, waveTravel * 1.6 + u_time * 0.11));
          patchNoise = oceanNoise(vec2(v_uv.x * 3.1, v_uv.y * 2.5) * texScale + vec2(0.0, waveTravel * 1.2 + u_time * 0.05));
        } else {
          fingerNoise = 0.5 + sin(v_uv.x * 6.1 * texScale + waveTravel * 2.7) * 0.18 +
            sin(v_uv.x * 2.3 * texScale - waveTravel * 1.9) * 0.14;
          patchNoise = 0.5 + sin((v_uv.x * 3.4 + v_uv.y * 2.2) * texScale + u_time * 0.05) * 0.22;
        }
      #endif
        // Signed distance down the face from the crest line, displaced at
        // TWO scales (fingers + broad lobes) so no foam boundary crosses
        // the frame as one coherent line — the single-scale ±0.03 wobble
        // still read as parallel LAYERS. patchNoise varies in y too, so a
        // column can cross foam-dark-foam: boundaries interpenetrate like
        // the refs instead of stacking.
        float faceDist = broadWaveY - v_uv.y - broadNoiseR +
          (fingerNoise - 0.5) * 0.07 + (patchNoise - 0.5) * 0.09;
        float behindDist = -faceDist;
        // Spilling lip — the -u_time term advects clumps down-face in the
        // wave's own frame.
        float lipBand = exp(-pow((faceDist - 0.018) / 0.045, 2.0));
        // LOW_Q: single-octave noise() — rides are exactly where the
        // low-power tier must shed work.
      #ifdef LOW_Q
        float cascadeNoise = noise(vec2(v_uv.x * 20.0, faceDist * 12.0) * texScale + vec2(0.0, -u_time * 1.2));
      #else
        float cascadeNoise = oceanNoise(vec2(v_uv.x * 20.0, faceDist * 12.0) * texScale + vec2(0.0, -u_time * 1.2));
      #endif
        float cascade = smoothstep(0.34, 0.62, cascadeNoise);
        // Low base + heavy clump weight: broken white chunks, not a
        // uniform pale stripe.
        float lipFoam = lipBand * (0.15 + cascade * 0.85) * breakAmount;
        // Cauliflower cores — the patch-noise gate groups them into
        // MASSES along the crest instead of even speckle.
        float coreBand = exp(-pow((faceDist - 0.010) / 0.038, 2.0));
        float cores = coreBand * smoothstep(0.60, 0.82, cascadeNoise) *
          smoothstep(0.30, 0.72, patchNoise) * breakAmount;
        // Trailing whitewash — a REGION: churn trails ~0.35 uv behind the
        // crest and the reach grows through the ride. The decay rate is
        // patch-modulated so the trail's fade-out edge wanders instead of
        // ending on a readable horizontal line.
        float washReach = mix(3.0, 2.3, waveTravel) * (0.75 + patchNoise * 0.5);
        float matDecay = exp(-max(behindDist, 0.0) * washReach) * step(0.0, behindDist);
      #if defined(LOW_Q) || defined(TOUCH_Q)
        float matField = noise(vec2(v_uv.x * 10.5, v_uv.y * 4.0) * texScale + vec2(0.0, waveTravel * 2.0 + u_time * 0.18));
      #else
        float matField;
        if (waveEnergyR > 0.22) {
          // Marbled mat, COMBED along the travel direction (Ocean refs
          // 05/12: the churn behind a front streams down-face in long
          // drainage filaments, not round curds) — cells ~2.6x taller
          // than wide, and the warp leans on x so the streaks bend
          // without re-curling. Remixed with the patch field for the
          // two-scale read.
          vec2 marbleWarp = vec2(patchNoise - 0.5, (fingerNoise - 0.5) * 0.5) * 2.2;
          float matNoise = oceanNoise(vec2(v_uv.x * 10.5, v_uv.y * 4.0) * texScale + vec2(0.0, waveTravel * 2.0 + u_time * 0.18) + marbleWarp);
          matField = matNoise * 0.66 + patchNoise * 0.34;
        } else {
          // Spent-foam tail (late-ride LOD): one plain sample, same comb.
          matField = noise(vec2(v_uv.x * 10.5, v_uv.y * 4.0) * texScale + vec2(0.0, waveTravel * 2.0 + u_time * 0.18));
        }
      #endif
        // Dissolving bubble-lace — erosion threshold RISES behind the
        // crest; the band-pass fringe under it is the bright cell-edge
        // lace at the island boundaries.
        float dissolve = smoothstep(0.0, 0.46, behindDist) * (0.6 + waveTravel * 0.4);
        float laceTh = 0.30 + dissolve * 0.32;
        float matBody = smoothstep(laceTh, laceTh + 0.17, matField);
        float laceFringe = smoothstep(laceTh - 0.11, laceTh - 0.02, matField) -
          smoothstep(laceTh - 0.02, laceTh + 0.09, matField);
        float washGrow = 0.60 + waveTravel * 0.55;
        float washMat = (matBody * 0.72 + laceFringe * 0.50) * matDecay * washGrow * breakAmount;
        // Pitching shadow under the tumbling clumps — cascade-modulated so
        // it shadows the foam chunks, not a uniform bar across the frame.
        float lipShadow = exp(-pow((faceDist - 0.075) / 0.034, 2.0)) *
          (0.35 + cascade * 0.65) * breakAmount;
        // Foam tongues thrown ahead of the lip — streaks of cascade churn
        // reaching into the dark apron, so foam and dark interpenetrate.
        float faceStreaks = smoothstep(0.58, 0.82, cascadeNoise) *
          exp(-max(faceDist, 0.0) * 5.5) * step(0.0, faceDist) * breakAmount;

        float foamGate = waveEnergyR * hullWaveMask;
        vec3 foamColor = mix(moodCaustic, vec3(0.93, 0.98, 0.97), 0.75);
        // Ride-time value drama: a SMOOTH darkening field (apron ahead +
        // churn zone behind); the additive foam carries ALL texture, so
        // the read is bright-foam-on-dark-water. Do NOT noise-gate this —
        // that inverts into dark holes punched in the lit band. Gated by
        // waveEnergyR + breakAmount: ambient exposure untouched.
        // The apron keeps a smooth core (bright-foam-on-dark still needs
        // the dark) but its strength breathes with the cascade texture —
        // dark tongues between the faceStreaks, not a flat dark stratum.
        float aheadZone = smoothstep(-0.05, 0.06, faceDist) * exp(-max(faceDist, 0.0) * 3.4) *
          (0.60 + (1.0 - cascade) * 0.40);
        // Under copy the apron keeps its shape but not its full depth —
        // near-black sweeping behind body text every ambient cadence was
        // the core of the 2026-07-12 legibility report. Foam still reads
        // white-on-dark; the dark just stops short of ink-black there.
        float dramaDarken = waveEnergyR * (aheadZone * 0.58 + matDecay * 0.34) * breakAmount *
          mix(1.0, 0.78, u_pageCalm);
        color *= mix(1.0, 0.78, lipShadow * foamGate * 0.6);
        color *= 1.0 - dramaDarken;
        color += foamColor * (lipFoam * 0.55 + faceStreaks * 0.20 + washMat * 0.50) * foamGate;
        color += mix(moodCaustic, vec3(0.97, 0.995, 0.99), 0.9) * cores * foamGate;
      }

      // ---- Footer shore-break ------------------------------------------
      // Beach refs 01/08/14: run-up / retreat wash cycle, looping forever,
      // decoupled from scroll. ShoreArrival publishes the band; its mask
      // feather keeps this canvas faintly alive deep into the section
      // (fully opaque art only past ~84%), so the waterline (bandT
      // ~0.24-0.44, surged ~0.56) rides down INTO the footer photo's
      // froth band and melts there: deepFade thins the lace the further
      // a run-up carries, so the photo's static froth reads as where the
      // live wash settles — one continuous shore (Jules 2026-07-03 ×2).
      // Coherent uniform branch: zero cost unless the footer is near.
      // Budget: 2 noise fields (1 plain on LOW_Q: no sheets, solid edge).
      if (u_shore.z > 0.001) {
        float shoreTopUv = 1.0 - u_shore.x;
        float shoreH = max(u_shore.y, 0.001);
        float bandT = (shoreTopUv - v_uv.y) / shoreH;
        // Spatial early-out (2026-07-03 perf review): bandMask is exactly
        // 0 outside (-0.04, 0.98), but every fragment above the band —
        // 60-100% of the viewport while the shore is arming — was still
        // paying the full 2-noise-field interior for zero output. bandT
        // is a pure function of v_uv.y, so the branch is screen-space
        // contiguous: warps outside the band skip coherently.
        if (bandT > -0.045 && bandT < 0.985) {
        float bandMask = smoothstep(-0.04, 0.03, bandT) * (1.0 - smoothstep(0.80, 0.98, bandT));

        // Run-up cycle — two incommensurate pulses (~7 s / ~11 s): the
        // waterline surges onto the sand and pulls back, never exactly
        // repeating. A completed ride sets u_shore.w (surge): the next
        // run-up digs deeper — the fired wave ARRIVES at the beach.
        // runVel = analytic derivative; retreat gates the lace erosion.
        // Wave→foam life cycle (Jules 2026-07-04: the foam must be
        // ORGANICALLY CREATED — a wave comes in, dissipates into foam,
        // and repeats; a standalone oscillating line reads static no
        // matter how it is dimmed). One ~7 s cycle, everything driven by
        // the same phase clock so the actors stay synchronized:
        //   ph 0.05-0.44  an incoming swell front crosses the shallows
        //   ph 0.40-0.56  it lands — the wash runs up fast, foam BLOOMS
        //   ph 0.58-1.00  slow retreat: foam dies into lace and residue,
        //                 which lingers until the next wave arrives
        // A per-cycle hash varies each wave's reach ±22%, so the
        // repetition never reads mechanical.
        float phT = u_time / 7.0;
        float ph = fract(phT);
        float cyc = floor(phT);
        float vary = 0.78 + 0.44 * fract(sin(cyc * 12.9898) * 43758.5453);
        // runHold: the foam's landed position — it does NOT follow the
        // retreat (Jules 2026-07-04: the receding line read as the foam
        // "moving backwards"; real foam dissolves where it landed while
        // only the water pulls back). runUp still recedes and drives the
        // water-side terms (milk, wet zone, residue bounds).
        float runHold = smoothstep(0.40, 0.56, ph);
        float runUp = runHold * (1.0 - smoothstep(0.60, 1.0, ph));
        float retreat = smoothstep(0.60, 0.80, ph);
        // Foam is born at landing and dies IN PLACE — fully gone by
        // ph 0.96, so the position reset at the cycle wrap is invisible.
        // Between waves only the residue terms remain.
        float lineLife = smoothstep(0.38, 0.50, ph) * (1.0 - smoothstep(0.70, 0.96, ph));
        float runReach = (0.20 + u_shore.w * 0.12) * vary;
        // Lobed waterline (Beach 08) — laneNoise-drifted x-sines, zero
        // new noise.
        float lobes = sin(waterUv.x * 9.0 + laneNoise * 5.0) * 0.016 +
          sin(waterUv.x * 4.3 - laneNoise * 3.0 + 1.3) * 0.024;
        // Short-band anchor (Jules' iPhone report: the line floated "out
        // of place" mid-water): the mobile ShoreArrival section is only
        // ~0.3-0.4 viewport tall, which left the waterline hovering far
        // above the footer photo's froth with bare water around it. On
        // short bands the line sits proportionally deeper, hugging the
        // sand transition; desktop bands (~0.8+) are unaffected.
        float wlBase = 0.24 + (1.0 - smoothstep(0.30, 0.55, shoreH)) * 0.08 +
          swellBend * 0.07 + lobes;
        float wl = wlBase + runUp * runReach;
        float wlFoam = wlBase + runHold * runReach;
        float wlMax = wlBase + runReach;
        float toSand = bandT - wl;
        // Foam-edge distance — measured from the HELD landing line, not
        // the receding waterline.
        float toFoam = bandT - wlFoam;

        // The incoming wave itself — a swell front traveling the shallows
        // toward the sand during the approach leg. The foam below is BORN
        // when this lands (lineLife opens as frontT reaches wl): the
        // wave dissipates into foam, pure trig, zero new noise.
        float frontT = mix(wl - 0.50, wl - 0.02, smoothstep(0.04, 0.44, ph));
        float frontOn = smoothstep(0.02, 0.10, ph) * (1.0 - smoothstep(0.40, 0.47, ph));
        float frontFace = exp(-pow((bandT - frontT) / 0.045, 2.0)) * frontOn;
        float frontCrest = exp(-pow((bandT - frontT + 0.028) / 0.030, 2.0)) * frontOn;

        // One lace field shared by the waterline edge and the residue.
        // TOUCH_Q joins the single-octave path (2026-07-03 footer perf
        // plan): the 3-octave lace was 2 extra noise evals per fragment
        // across the whole footer band on phones. Unlike LOW_Q, TOUCH_Q
        // keeps the wash sheets and the lacy (non-solid) edge thresholds.
      #if defined(LOW_Q) || defined(TOUCH_Q)
        float shoreLace = noise(vec2(waterUv.x * 11.0, bandT * 6.0 - u_time * 0.10));
      #else
        float shoreLace = oceanNoise(vec2(waterUv.x * 11.0, bandT * 6.0 - u_time * 0.10));
      #endif

        // Water side — milky sediment shallows + wash sheets advected
        // shoreward (down-screen, with the ocean's flow).
        float shallowMilk = smoothstep(wl - 0.48, wl, bandT) * (1.0 - smoothstep(wl, wl + 0.02, bandT));
      #ifdef LOW_Q
        float sheets = 0.0;
      #else
        float sheetNoise = noise(vec2(waterUv.x * 4.6 + swellBend * 2.0, bandT * 3.2 - u_time * 0.24));
        float sheets = (smoothstep(0.52, 0.66, sheetNoise) - smoothstep(0.66, 0.82, sheetNoise)) *
          smoothstep(wl - 0.55, wl - 0.04, bandT) * (1.0 - smoothstep(wl - 0.04, wl, bandT));
      #endif

        // Waterline — foam-lace line, eroding (rising threshold) on
        // retreat. Tight + near-white so it reads as FOAM through the
        // feather, in the footer photo's static-lace family.
        // Wider than the original hairline: this is a FOAM WAVE with body,
        // not a pencil stroke (Jules 2026-07-04).
        float edgeBand = exp(-pow(toFoam / (0.030 + u_shore.w * 0.012), 2.0));
        float edgeTh = 0.28 + retreat * 0.20;
        // The deeper the cycle carries the line, the thinner and more
        // dissolved it arrives — a run-up spends itself crossing the
        // sand, so it melts into the photo's froth instead of landing
        // there at full brightness.
        // End-dissolve, not depth-dimming (Jules: the foam wave must stay
        // VISIBLE through its travel and end INTO the footer image). The
        // old deepFade dimmed the line across its whole range, which —
        // stacked with the mask feather — erased it on phones. Now the
        // wave holds full strength and dissolves only over its deepest
        // reach, right where the photo's froth begins.
        float deepFade = 1.0 - smoothstep(0.44, 0.62, wlFoam) * 0.60;
        // Leading bright core — a thin crisp front riding the line's
        // seaward edge. The lace alone read as a weak smear (no spine);
        // real wash fronts carry a bright leading rim ahead of the foam.
        float edgeCore = exp(-pow((toFoam + 0.008) / 0.011, 2.0));
      #if defined(LOW_Q)
        // Single-octave noise thresholds into big patches, not lace —
        // run a mostly-SOLID thin edge and suppress residue instead.
        float edgeLace = edgeBand * (0.55 + smoothstep(edgeTh, edgeTh + 0.30, shoreLace) * 0.45);
        float residueW = 0.12;
      #elif defined(TOUCH_Q)
        // Phone tier (Jules' iPhone report: "weak and out of place"):
        // thresholding the SMOOTH single-octave field through the desktop
        // formula made neither lace nor a solid line — a featureless
        // smear. Rebuild the texture from trig granules (zero noise
        // cost): fine animated foam speckle along the line, over a firmer
        // solid base.
        float grain = 0.5 + 0.5 * sin(waterUv.x * 140.0 + shoreLace * 24.0 + u_time * 0.8);
        float edgeLace = edgeBand * (0.30 +
          smoothstep(edgeTh, edgeTh + 0.26, shoreLace) * 0.40 +
          grain * grain * 0.28);
        float residueW = 0.20;
      #else
        float edgeLace = edgeBand * (0.22 + smoothstep(edgeTh, edgeTh + 0.24, shoreLace) * 0.78);
        float residueW = 0.30;
      #endif

        // Sand side — wet sheen to the high-water mark + drying residue
        // eroding with height above the current line (higher = drier).
        // At full run-up the exposed band collapses; retreat re-opens it.
        float wetZone = smoothstep(0.0, 0.03, toSand) *
          (1.0 - smoothstep(wlMax - wl, wlMax - wl + 0.10, toSand));
        float resT = clamp(toSand / max(wlMax - wl, 0.001), 0.0, 1.0);
        float resTh = 0.34 + resT * 0.30 + retreat * 0.06;
        float residue = smoothstep(resTh, resTh + 0.16, shoreLace) * wetZone;

        // Composite — moodFloat weights: fog/rain dim the shore like
        // every other foam term; exposure + fog grading apply below.
        float shoreGate = u_shore.z * bandMask * moodFloat(1.0, 0.40, 0.60, 0.95);
        // The incoming swell: a shaded mass with a lit crest, visibly
        // traveling toward the sand before each foam bloom.
        color *= 1.0 - frontFace * 0.06 * u_shore.z * bandMask;
        color += moodCaustic * frontCrest * 0.08 * shoreGate;
        color += moodCaustic * shallowMilk * 0.07 * shoreGate;
        color += moodCaustic * sheets * 0.14 * shoreGate;
        color += mix(moodCaustic, vec3(0.95, 0.99, 0.98), 0.9) *
          (edgeLace * 0.70 + edgeCore * 0.30) * lineLife * deepFade * shoreGate;
        color += moodCaustic * wetZone * 0.045 * shoreGate;
        color += moodCaustic * residue * residueW * deepFade * shoreGate;

        if (u_shoreDebug > 0.5) {
          color = mix(color, vec3(1.0, 0.15, 0.35), exp(-pow(toFoam / 0.006, 2.0)) * u_shore.z);
        }
        } // end band early-out
      }

      // Per-mood exposure — the "drama" curve. Sunny moods are pushed brighter
      // and cloudy moods pulled darker, so the cinematic (and live weather)
      // swings hard between sunlit open water and a dark storm. moodFloat ties
      // it into the cross-fade so the exposure eases between states. Applied to
      // the BASE water only — BEFORE the phone hull / bow glow below — so it
      // doesn't amplify the phone's hull rim into a visible rectangle.
      // Args: (tropical-glass, bay-fog, marine-layer/rain, sunbreak).
      // Under copy the exposure compresses 40% toward neutral — lifts
      // marine-layer's dark floor and trims sunbreak's glare so one ink
      // color can pass contrast in every mood. Hues stay per-mood.
      float moodExposure = moodFloat(1.32, 0.95, 0.90, 1.28);
      color *= mix(moodExposure, mix(moodExposure, 1.0, 0.4), u_pageCalm);

      // The whole hull / bow-wake / lower-tidal field — the heaviest pile of
      // exp/pow/oceanNoise in this shader — only matters while the phone is
      // riding the water. Coherent uniform branch: every fragment takes the
      // same path, so the GPU skips it all for free when inactive.
      if (phoneActive) {
        vec2 hullPoint = vec2((v_uv.x - phoneCenterX) * aspect, v_uv.y - phoneCenterY);
        vec2 hullHalf = vec2(max(u_phone.z * aspect * 0.5, 0.001), max(u_phone.w * 0.5, 0.001));
        float hullRadius = min(hullHalf.x, hullHalf.y) * 0.18;
        float hullSdf = roundedRectSdf(hullPoint, hullHalf, hullRadius);
        float hullOutside = smoothstep(-0.006, 0.020, hullSdf);
        float hullRim = (1.0 - smoothstep(0.0, 0.052, abs(hullSdf))) * hullOutside * hasPhone * stageInfluence;
        float hullShadow = (1.0 - smoothstep(0.0, 0.135, hullSdf)) * hullOutside * hasPhone * stageInfluence;
        float waveSplitSide = (
          exp(-pow((v_uv.x - (phoneLeft - u_phone.z * 0.10)) / 0.055, 2.0)) +
          exp(-pow((v_uv.x - (phoneRight + u_phone.z * 0.10)) / 0.055, 2.0))
        ) * broadWaveR * waveEnvelope * waveContactR * hasPhone * stageInfluence;
        float hullFlow = clamp(0.26 + velocityAmount * 0.24 + waveEnvelope * waveContactR * 0.22, 0.0, 0.82);
        float hullLeadingPressure = exp(-pow((v_uv.y - leadingEdge) / 0.056, 2.0)) *
          (1.0 - smoothstep(u_phone.z * 0.43, u_phone.z * 0.76, abs(v_uv.x - phoneCenterX))) *
          hullOutside * hasPhone * stageInfluence;
        float hullSidePressure = sideContact * hullOutside * hasPhone * stageInfluence;

        color *= mix(1.0, 0.72, hullShadow * 0.22 + hullLeadingPressure * 0.08);
        color += moodCaustic * (hullRim * 0.070 + hullLeadingPressure * 0.090 + waveSplitSide * 0.050) * hullFlow;
        color += moodElectric * (hullSidePressure * 0.030 + waveSplitSide * 0.028) * hullFlow;
        color += moodElectric * (sideContact * hasPhone * stageInfluence * velocityAmount * 0.018);

        // Idle gate (2026-07-03 stage-end perf review): during the arrival
        // dwell velocityAmount decays to ~0 and the wave leaves hull
        // contact, so the whole Kelvin wake + lower-tidal field below is
        // multiplied to < 0.5% output — yet it was the heaviest stretch of
        // this shader (an oceanNoise + ~18 exp/pow per fragment),
        // running the entire time the user sits at the stage end. Both
        // operands are uniform-derived (coherent branch). The hull
        // rim/shadow/pressure above stay on — they are the visible idle
        // presence; the wake earns its cost only when something moves.
        if (velocityAmount > 0.015 || waveEnvelope * waveContactR > 0.01) {
        // Bow wake — ship-scale Kelvin pattern. Two divergent arms +
        // heavy apex churn at the bow itself + foam shoulders behind the
        // inner arm. Reads as a large vessel cutting water, not a thin
        // highlight on the surface.
        float bowAmbientR = stageInfluence * 0.018;
        float bowMotionR = clamp(bowAmbientR + velocityAmount * 0.16 + waveEnvelope * waveContactR * 0.16, 0.0, 0.38);
        float bowDirR = scrollVelocity >= 0.0 ? -1.0 : 1.0;
        float bowLatR = max(abs(v_uv.x - phoneCenterX) - u_phone.z * 0.45, 0.0);
        // Two arms — inner main + outer divergent
        float bowLineRA = leadingEdge + bowDirR * bowLatR * 0.52;
        float bowLineRB = leadingEdge + bowDirR * bowLatR * 0.86;
        float bowDistRA = abs(v_uv.y - bowLineRA);
        float bowDistRB = abs(v_uv.y - bowLineRB);
        float bowArmRA = exp(-bowDistRA * bowDistRA * 260.0);
        float bowArmRB = exp(-bowDistRB * bowDistRB * 360.0) * 0.62;
        float bowExtentR = exp(-bowLatR * 3.4);
        float bowGlow = hasPhone * stageInfluence * bowMotionR * (bowArmRA + bowArmRB) * bowExtentR;
        // Apex churn — large bell at the bow with caustic boil texture.
        float apexDxR = (v_uv.x - phoneCenterX) * 1.4;
        float apexDyR = (v_uv.y - leadingEdge);
        float bowApexR = exp(-(apexDxR * apexDxR + apexDyR * apexDyR) * 48.0) *
          hasPhone * stageInfluence * bowMotionR;
        // Foam shoulders behind the inner arm.
        float bowFoamDist = abs(v_uv.y - (bowLineRA - bowDirR * 0.022));
        float bowFoam = exp(-bowFoamDist * bowFoamDist * 480.0) * bowExtentR *
          hasPhone * stageInfluence * bowMotionR;
        float bowFoam2Dist = abs(v_uv.y - (bowLineRA - bowDirR * 0.058));
        float bowFoam2 = exp(-bowFoam2Dist * bowFoam2Dist * 220.0) * bowExtentR *
          hasPhone * stageInfluence * bowMotionR;
        // Trough shadow trailing the inner arm — dark band that gives the
        // wake mass instead of a flat outline.
        float bowTroughDistR = abs(v_uv.y - (bowLineRA - bowDirR * 0.030));
        float bowTroughR = exp(-bowTroughDistR * bowTroughDistR * 360.0) * bowExtentR *
          hasPhone * stageInfluence * bowMotionR;
        // Side-spray near the bow corners — broken caustic patches that fade
        // outward from the phone, only when motion is high.
        float bowCornerDist = length(vec2(
          (v_uv.x - phoneCenterX) * 1.3,
          (v_uv.y - leadingEdge) * 0.9
        ));
        float bowSplash = (1.0 - smoothstep(u_phone.z * 0.55, u_phone.z * 1.25, bowCornerDist)) *
          smoothstep(u_phone.z * 0.48, u_phone.z * 0.6, bowCornerDist) *
          hasPhone * stageInfluence * bowMotionR;
        // Broken wake edges behind the bow. Avoid filling the V interior:
        // that creates the visible triangle/plate behind the phone while
        // scrolling. The edge-only field still reads as displaced water.
        float behindLeadR = max(0.0, (leadingEdge - v_uv.y) * bowDirR);
        float vWidthHereR = behindLeadR * 0.55 + u_phone.z * 0.45;
        float vEdgeDistR = abs(abs(v_uv.x - phoneCenterX) - vWidthHereR);
        float wakeEdgeR = exp(-vEdgeDistR * vEdgeDistR * 460.0) *
          smoothstep(0.0, 0.030, behindLeadR);
        float washDecayR = exp(-behindLeadR * 3.2);
        float washTexture = sin(v_uv.x * 32.0 + v_uv.y * 22.0 - waveTravel * 9.0) * 0.5 + 0.5;
        float bowWash = hasPhone * stageInfluence * bowMotionR * wakeEdgeR * washDecayR *
          (0.32 + smoothstep(0.48, 0.98, washTexture) * 0.68);

        // The visible "tidal" pile-up at the bottom of the fixed phone. This is
        // intentionally crescent-shaped and broken by noise so it feels like
        // water meeting an object at the surface, not a decorative halo.
        float lowerDyR = phoneBottom - v_uv.y;
        float lowerReachR = smoothstep(0.0, 0.016, lowerDyR) * (1.0 - smoothstep(0.15, 0.32, lowerDyR));
        float lowerXR = abs(v_uv.x - phoneCenterX);
        float lowerNormXR = lowerXR / max(u_phone.z * 0.50, 0.001);
        float lowerBreakup = oceanNoise(vec2(v_uv.x * 9.0, v_uv.y * 7.0 + waveTravel * 1.7));
        float lowerCurveR = phoneBottom - 0.022 - lowerNormXR * lowerNormXR * 0.055 +
          (lowerBreakup - 0.5) * 0.012;
        float lowerTidalCrest = exp(-pow((v_uv.y - lowerCurveR) / 0.027, 2.0)) *
          (1.0 - smoothstep(0.34, 1.16, lowerNormXR)) * lowerReachR *
          (0.62 + lowerBreakup * 0.52);
        float lowerTidalFoam = exp(-pow((v_uv.y - (lowerCurveR + 0.010)) / 0.013, 2.0)) *
          (1.0 - smoothstep(0.30, 1.05, lowerNormXR)) * lowerReachR *
          smoothstep(0.38, 0.86, lowerBreakup);
        float lowerTidalShadow = exp(-pow((v_uv.y - (lowerCurveR - 0.060)) / 0.048, 2.0)) *
          (1.0 - smoothstep(0.24, 1.18, lowerNormXR)) * lowerReachR;
        float lowerArmLineR = phoneBottom - 0.040 - max(lowerXR - u_phone.z * 0.27, 0.0) * 0.48;
        float lowerTidalArms = exp(-pow((v_uv.y - lowerArmLineR) / 0.019, 2.0)) *
          smoothstep(u_phone.z * 0.22, u_phone.z * 0.54, lowerXR) *
          (1.0 - smoothstep(u_phone.z * 0.56, u_phone.z * 1.14, lowerXR)) *
          lowerReachR * (0.42 + lowerBreakup * 0.58);
        float lowerBowMotionR = clamp(hasPhone * stageInfluence * (0.045 + velocityAmount * 0.50 + waveEnvelope * velocityAmount * 0.16), 0.0, 0.68);

        color += moodElectric * bowGlow * 0.018;
        color += moodCaustic * bowApexR * 0.045;
        color += moodCaustic * bowFoam * 0.040;
        color += moodCaustic * bowFoam2 * 0.025;
        color += moodElectric * bowSplash * 0.015;
        color += moodCaustic * bowWash * 0.010;
        color *= mix(1.0, 0.84, lowerTidalShadow * lowerBowMotionR * 0.20);
        color += moodCaustic * lowerTidalCrest * lowerBowMotionR * 0.105;
        color += moodElectric * lowerTidalArms * lowerBowMotionR * 0.032;
        color += moodCaustic * lowerTidalFoam * lowerBowMotionR * 0.092;
        // Trough shadow under the bow inner arm — gives the wake mass.
        color *= mix(1.0, 0.92, bowTroughR * 0.18);
        } // end idle gate (bow wake + lower tidal)
      }

      color += c_sun * warmGlint;

      float fogAmount = moodFloat(0.0, 0.22, 0.10, 0.04) * (0.34 + verticalLift * 0.45) * (1.0 - centerGlow * 0.16);
      vec3 fogColor = moodColor(vec3(0.0), vec3(0.550, 0.612, 0.600), vec3(0.350, 0.490, 0.480), vec3(0.400, 0.580, 0.590));
      color = mix(color, fogColor, fogAmount);

      // Keep the edges calm so the component can sit behind any page without
      // fighting foreground content. (0.74 -> 0.70 in the reference pass:
      // the refs' open sea holds a deeper resting value range at the frame
      // edges — value only, hue untouched.)
      float edgeShade = smoothstep(0.0, 0.22, v_uv.x) *
        smoothstep(1.0, 0.78, v_uv.x) *
        smoothstep(0.0, 0.20, v_uv.y) *
        smoothstep(1.0, 0.76, v_uv.y);
      // Vignette floor lifts under copy: on a phone the darkened border is
      // a large fraction of the frame, and it stacked with the trough
      // shadows into the bathtub read. Full 0.70 drama returns outside
      // calm bands.
      color *= mix(mix(0.70, 0.82, u_pageCalm), 1.0, edgeShade);

      gl_FragColor = vec4(color, 1.0);
    }
  `;function uo(e,t,o){const a=e.createShader(t);if(!a)throw new Error("Unable to create water shader.");if(e.shaderSource(a,o),e.compileShader(a),!e.getShaderParameter(a,e.COMPILE_STATUS)){const i=e.getShaderInfoLog(a)||"Unknown shader compile error.";throw e.deleteShader(a),new Error(i)}return a}function fo(e,t,o){const a=uo(e,e.VERTEX_SHADER,t),i=uo(e,e.FRAGMENT_SHADER,o),l=e.createProgram();if(!l)throw new Error("Unable to create water shader program.");if(e.attachShader(l,a),e.attachShader(l,i),e.linkProgram(l),e.deleteShader(a),e.deleteShader(i),!e.getProgramParameter(l,e.LINK_STATUS)){const m=e.getProgramInfoLog(l)||"Unknown shader link error.";throw e.deleteProgram(l),new Error(m)}return l}function _a(e,t=O[0]){const o=window.matchMedia(ua).matches,a=o&&((navigator.hardwareConcurrency||8)<=4||(navigator.deviceMemory||8)<=4),i=o||a?256:512,l=o?1e3/30:1e3/60,m=4,u=1400,f=8e3,p=6e3,v=14e3,h=8e3,S=new URLSearchParams(window.location.search).has("nowater");let b=t,_=t,L=0,A=0,B=0,W=0,V=0,Q=3;const Z={1:{rate:8,radiusMin:4,radiusSpan:5,strengthMin:.028,strengthSpan:.045,bias:2.4,gust:0},2:{rate:44,radiusMin:4,radiusSpan:5,strengthMin:.03,strengthSpan:.04,bias:2.2,gust:.15},3:{rate:20,radiusMin:5,radiusSpan:9,strengthMin:.05,strengthSpan:.1,bias:2.4,gust:.2},4:{rate:26,radiusMin:7,radiusSpan:12,strengthMin:.07,strengthSpan:.11,bias:2,gust:.35},5:{rate:32,radiusMin:9,radiusSpan:13,strengthMin:.09,strengthSpan:.12,bias:1.7,gust:.5}},$=8,X=new Float32Array($*4);let N=0;function R(n,s,c,x){if(N>=$)return;const y=N*4;X[y]=P(n/Math.max(window.innerWidth,1)),X[y+1]=1-P(s/Math.max(window.innerHeight,1)),X[y+2]=pt(c),X[y+3]=x,N+=1}function C(n){const s=Math.pow(Math.random(),n.bias),c=window.innerHeight/i*1.6;return{radius:Math.max(n.radiusMin+s*n.radiusSpan,c),strength:n.strengthMin+s*n.strengthSpan}}const F=document.createElement("canvas"),w={x:.5,y:.5,move:0,impulse:0,radius:32,tiltX:0,tiltY:0},d={stageProgress:0,stageInfluence:0,scrollVelocity:0,waveTravel:0,waveActive:!1,phone:{x:.5,y:.5,width:0,height:0}},ve=new URLSearchParams(window.location.search),Bo=ve.get("shore")==="off",Ho=ve.has("shoredebug")?1:0,g={top:3,height:0,docTop:NaN,heightPx:0,influence:0,targetInfluence:0,surge:0,surgeTarget:0},ut=ve.get("pagecalm"),Re=ut==="0"?0:ut==="1"?1:null,ze=e.hasAttribute("data-page-calm")?1:0,ee={docTop:NaN,heightPx:0,influence:0};let ft=!1,de=Re!==null?Re:ze,Se=de,ge=0,Le=0;function be(n){document.documentElement.classList.toggle("is-riding",n)}let r=null,j=0,ue=0,ne=1,re=1,Ae=null,M=null,D=null,ie=null,te=null,se=null,ye=!1,ke=!1;const zo=e.hasAttribute("data-ambient");let fe=0,H=0,Xe=typeof window<"u"?window.innerWidth:0,Ge=-1,Ye=-1;const T={},E={};F.setAttribute("aria-hidden","true"),F.className="water-canvas",e.textContent="",e.append(F);function Ce(){Ne(),qe(),e.textContent="",e.dataset.fallback="true";const n=document.createElement("div");n.className="water-fallback",n.dataset.waterFallback="",e.append(n)}function mt(n,s){w.x=Math.min(Math.max(n/Math.max(window.innerWidth,1),0),1),w.y=1-Math.min(Math.max(s/Math.max(window.innerHeight,1),0),1)}function pt(n){return n/Math.max(window.innerHeight,1)}function P(n,s=0,c=1){return Math.min(Math.max(Number.isFinite(n)?n:s,s),c)}function wt(n,s,c,x){mt(n,s),w.radius=c,w.move=Math.max(w.move,x)}function Me(n,s,c,x){mt(n,s),w.radius=c,w.impulse=Math.max(w.impulse,x)}function vt(n,s){const c=r.createTexture(),x=r.createFramebuffer();if(!c||!x)throw new Error("Unable to create water render target.");r.bindTexture(r.TEXTURE_2D,c),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MAG_FILTER,r.NEAREST),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_S,r.CLAMP_TO_EDGE),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_T,r.CLAMP_TO_EDGE),r.texImage2D(r.TEXTURE_2D,0,r.RGBA,n,n,0,r.RGBA,s,null),r.bindFramebuffer(r.FRAMEBUFFER,x),r.framebufferTexture2D(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,c,0);const y=r.checkFramebufferStatus(r.FRAMEBUFFER)===r.FRAMEBUFFER_COMPLETE;return{texture:c,framebuffer:x,complete:y}}function De(n){!r||!n||(r.deleteTexture(n.texture),r.deleteFramebuffer(n.framebuffer))}function gt(n){const s=vt(i,n),c=vt(i,n);if(!(s.complete&&c.complete))return De(s),De(c),!1;te=s,se=c;for(const y of[te,se])r.bindFramebuffer(r.FRAMEBUFFER,y.framebuffer),r.viewport(0,0,i,i),r.clearColor(.5,.5,0,1),r.clear(r.COLOR_BUFFER_BIT);return!0}function Xo(){const n=r.getExtension("OES_texture_half_float"),s=r.getExtension("EXT_color_buffer_half_float");return n&&s?n.HALF_FLOAT_OES:r.UNSIGNED_BYTE}function Go(){T.state=r.getUniformLocation(M,"u_state"),T.texel=r.getUniformLocation(M,"u_texel"),T.pointer=r.getUniformLocation(M,"u_pointer"),T.aspect=r.getUniformLocation(M,"u_aspect"),T.strength=r.getUniformLocation(M,"u_strength"),T.radius=r.getUniformLocation(M,"u_radius"),T.phone=r.getUniformLocation(M,"u_phone"),T.choreo=r.getUniformLocation(M,"u_choreo"),T.tilt=r.getUniformLocation(M,"u_tilt"),T.calm=r.getUniformLocation(M,"u_calm"),T.drops=r.getUniformLocation(M,"u_drops"),T.dropCount=r.getUniformLocation(M,"u_dropCount"),T.position=r.getAttribLocation(M,"a_position"),E.state=r.getUniformLocation(D,"u_state"),E.texel=r.getUniformLocation(D,"u_texel"),E.resolution=r.getUniformLocation(D,"u_resolution"),E.time=r.getUniformLocation(D,"u_time"),E.mood=r.getUniformLocation(D,"u_mood"),E.moodTo=r.getUniformLocation(D,"u_moodTo"),E.moodBlend=r.getUniformLocation(D,"u_moodBlend"),E.phone=r.getUniformLocation(D,"u_phone"),E.choreo=r.getUniformLocation(D,"u_choreo"),E.shore=r.getUniformLocation(D,"u_shore"),E.shoreDebug=r.getUniformLocation(D,"u_shoreDebug"),E.pageCalm=r.getUniformLocation(D,"u_pageCalm"),E.position=r.getAttribLocation(D,"a_position")}function bt(n){r.bindBuffer(r.ARRAY_BUFFER,ie),r.enableVertexAttribArray(n),r.vertexAttribPointer(n,2,r.FLOAT,!1,0,0)}function Pe(){const n=Math.min(window.devicePixelRatio||1,a?1:o?1.25:1.5);ne=Math.max(Math.floor(window.innerWidth*n),1),re=Math.max(Math.floor(window.innerHeight*n),1),(F.width!==ne||F.height!==re)&&(F.width=ne,F.height=re)}function Yo(){H=0,Pe()}function yt(){const n=window.innerWidth;if(n!==Xe){Xe=n,H&&(window.clearTimeout(H),H=0),Pe();return}H&&window.clearTimeout(H),H=window.setTimeout(Yo,180)}function xt(){Xe=window.innerWidth,H&&(window.clearTimeout(H),H=0),Pe()}function qo(n,s){r.bindFramebuffer(r.FRAMEBUFFER,se.framebuffer),r.viewport(0,0,i,i),r.useProgram(M),bt(T.position),r.activeTexture(r.TEXTURE0),r.bindTexture(r.TEXTURE_2D,te.texture),r.uniform2f(T.pointer,w.x,w.y),r.uniform1f(T.aspect,window.innerWidth/Math.max(window.innerHeight,1)),r.uniform1f(T.strength,n),r.uniform1f(T.radius,s),r.uniform4f(T.phone,d.phone.x,d.phone.y,d.phone.width,d.phone.height),r.uniform4f(T.choreo,d.stageProgress,d.stageInfluence,d.scrollVelocity,d.waveTravel),r.uniform2f(T.tilt,w.tiltX,w.tiltY),r.uniform1f(T.calm,ge),N>0&&r.uniform4fv(T.drops,X),r.uniform1i(T.dropCount,N),r.drawArrays(r.TRIANGLE_STRIP,0,4),N=0;const c=te;te=se,se=c}function Vo(n){r.bindFramebuffer(r.FRAMEBUFFER,null),r.viewport(0,0,ne,re),r.useProgram(D),bt(E.position),r.activeTexture(r.TEXTURE0),r.bindTexture(r.TEXTURE_2D,te.texture),(ne!==Ge||re!==Ye)&&(r.uniform2f(E.resolution,ne,re),Ge=ne,Ye=re),r.uniform1f(E.time,n),r.uniform1f(E.mood,_.value),r.uniform1f(E.moodTo,b.value),r.uniform1f(E.moodBlend,L),r.uniform4f(E.phone,d.phone.x,d.phone.y,d.phone.width,d.phone.height),r.uniform4f(E.choreo,d.stageProgress,d.stageInfluence,d.scrollVelocity,d.waveTravel),r.uniform4f(E.shore,g.top,g.height,g.influence,g.surge),r.uniform1f(E.pageCalm,de),r.drawArrays(r.TRIANGLE_STRIP,0,4)}function Qo(n){const s=B>0;let c=0;if(b.id==="rain"?c=s&&_.id!=="rain"?L:1:s&&_.id==="rain"&&(c=1-L),c<=.001)return;const x=Z[Q]??Z[3];V+=n*.001;const y=1+x.gust*Math.sin(V*.43)*Math.sin(V*.127+2.1),I=x.rate*y*c;W+=n;const ae=1e3/Math.max(I,.001);for(;W>=ae&&N<$;){W-=ae;const U=Math.random()*window.innerWidth,me=Math.random()*window.innerHeight,{radius:pe,strength:_e}=C(x);R(U,me,pe,_e)}W=Math.min(W,ae)}function Fe(n){if(document.hidden||ye||ke||!r){j=0;return}if(S){j=window.requestAnimationFrame(Fe);return}const c=g.influence>.5&&d.stageInfluence<.05&&!d.waveActive?Math.max(l,1e3/30):l;if(c>0&&ue&&n-ue<c){j=window.requestAnimationFrame(Fe);return}const x=n*.001,y=ue?Math.min((n-ue)*.001,.05):.016;if(ue=n,Qo(y*1e3),B>0){A+=y;const U=Math.min(A/B,1);L=U*U*(3-2*U),U>=1&&(_=b,L=0,B=0)}if(d.waveActive&&(d.waveTravel+=y/m,d.waveTravel>=1&&(d.waveActive=!1,d.waveTravel=0,g.influence>.05&&(g.surgeTarget=1),Le=1,be(!1))),Le*=Math.pow(.02,y/1.6),ge+=(Le-ge)*Math.min(1,y*7),ge<.001&&Le<.001&&(ge=0),Number.isFinite(g.docTop)&&g.heightPx>0){const U=Math.max(window.innerHeight,1);g.top=P((g.docTop-window.scrollY)/U,-2,3),g.height=P(g.heightPx/U,0,3)}if(g.influence+=(g.targetInfluence-g.influence)*Math.min(1,y*5),g.influence<.001&&g.targetInfluence===0&&(g.influence=0),g.surgeTarget*=Math.pow(.03,y/2),g.surge+=(g.surgeTarget-g.surge)*Math.min(1,y*6),g.surge<.001&&g.surgeTarget<.001&&(g.surge=0),Re===null){let U=0;if(Number.isFinite(ee.docTop)&&ee.heightPx>0){const me=Math.max(window.innerHeight,1),pe=(ee.docTop-window.scrollY)/me,_e=pe+ee.heightPx/me;U=P(Math.min(.5-pe,_e-.5)/.5)*ee.influence}Se=Math.max(ze,U),de+=(Se-de)*Math.min(1,y*1.25),Math.abs(Se-de)<.001&&(de=Se)}const I=Math.min(w.move+w.impulse,.22),ae=pt(w.radius);qo(I,ae),Vo(x),w.move*=Math.pow(.035,y/.3),w.impulse*=Math.pow(.01,y/.1),d.scrollVelocity*=Math.pow(.03,y/.72),j=window.requestAnimationFrame(Fe)}function J(){!j&&!document.hidden&&!ye&&!ke&&r&&(ue=0,j=window.requestAnimationFrame(Fe))}function Ne(){j&&(window.cancelAnimationFrame(j),j=0)}function _t(){if(fe=0,ye)return;!document.hidden&&!d.waveActive&&d.stageInfluence<.05&&(d.waveActive=!0,d.waveTravel=.001,be(!0),J());const n=ze===1||ft;fe=window.setTimeout(_t,(n?v:f)+Math.random()*(n?h:p))}function qe(){r&&(De(te),De(se),ie&&r.deleteBuffer(ie),M&&r.deleteProgram(M),D&&r.deleteProgram(D),te=null,se=null,ie=null,M=null,D=null,r=null)}function Tt(){if(r=F.getContext("webgl",{alpha:!1,antialias:!1,depth:!1,stencil:!1,powerPreference:"high-performance",preserveDrawingBuffer:!1}),!r)return!1;if(Ae=Xo(),M=fo(r,ho,ya),D=fo(r,ho,(a?`#define LOW_Q 1
`:o?`#define TOUCH_Q 1
`:"")+xa),ie=r.createBuffer(),!ie)throw new Error("Unable to create water vertex buffer.");if(r.bindBuffer(r.ARRAY_BUFFER,ie),r.bufferData(r.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),r.STATIC_DRAW),!gt(Ae)&&(Ae=r.UNSIGNED_BYTE,!gt(Ae)))throw new Error("Unable to initialize water render targets.");Go();const n=1/i;return r.useProgram(M),r.uniform1i(T.state,0),r.uniform2f(T.texel,n,n),r.useProgram(D),r.uniform1i(E.state,0),r.uniform2f(E.texel,n,n),r.uniform1f(E.shoreDebug,Ho),Ge=-1,Ye=-1,Pe(),e.removeAttribute("data-fallback"),!0}function Et(n){wt(n.clientX,n.clientY,35,.0092)}let Rt=0;function St(n){performance.now()-Rt<650||Me(n.clientX,n.clientY,o?52:46,.115)}function Lt(n){const s=n.changedTouches[0];s&&(Rt=performance.now(),Me(s.clientX,s.clientY,58,.105))}function At(n){if(a)return;const s=n.changedTouches[0];s&&wt(s.clientX,s.clientY,48,.01)}function kt(){w.move=Math.min(w.move,.018)}const $o=24,Ct=3.6,jo=220,K={requested:!1,granted:!1};let Mt=0;const Jo=new URLSearchParams(window.location.search).get("debug")==="motion",Ie={coarse:o,hasReqPerm:typeof DeviceOrientationEvent<"u"&&typeof DeviceOrientationEvent.requestPermission=="function",permState:"idle",lastError:null,lastTilt:null,eventCount:0,geoSupported:"geolocation"in navigator,geoState:"idle"};let G=null,oe=null,Dt=0;function Pt(n,s){n.innerHTML="";const c=document.createElement("span");c.className="hero-pill-iris",c.setAttribute("aria-hidden","true");const x=document.createElement("span");x.className="hero-pill-label",x.textContent=s,n.append(c,x)}function Ft(n,s){const c=n?.querySelector(".hero-pill-label");c&&(c.textContent=s)}function Ko(){o&&(G=document.createElement("button"),G.type="button",G.className="waxup-motion-chip hero-pill",Pt(G,"Tilt Water"),G.addEventListener("click",n=>{n.preventDefault(),window.dispatchEvent(new CustomEvent("waxup:user-took-control",{detail:{source:"motion"}})),Gt(!0)},{passive:!1}),(document.querySelector(".hero-actions")||document.body).appendChild(G),Nt())}function Nt(){!Jo||oe||(oe=document.createElement("div"),oe.className="waxup-motion-debug",document.body.appendChild(oe),Wt())}function Zo(){G?.remove(),G=null,oe?.remove(),oe=null}function It(n){Ft(G,n)}function Ot(){G&&(G.classList.add("is-hidden"),window.setTimeout(()=>G?.remove(),700))}function z(n){Object.assign(Ie,n);const s=performance.now();s-Dt<250&&n.lastTilt||(Dt=s,Wt())}function Wt(){if(!oe)return;const n=Ie,s=Math.round(window.scrollY),c=document.body.classList.contains("nav-logo-docked");oe.textContent=[`coarse pointer: ${n.coarse}`,`has requestPerm: ${n.hasReqPerm}`,`permission state: ${n.permState}`,`geo: ${n.geoState} (supported: ${n.geoSupported})`,`events received: ${n.eventCount}`,`last tilt: ${n.lastTilt?`${n.lastTilt[0].toFixed(2)}, ${n.lastTilt[1].toFixed(2)}`:"none yet"}`,`scrollY: ${s}`,`nav-logo-docked: ${c}`,n.lastError?`error: ${n.lastError}`:""].filter(Boolean).join(`
`)}function Ut(n){return Math.tanh(n/$o)}const Bt=8;let le=0,Ve=0,Qe=0;function Ht(n){if(n.beta===null||n.gamma===null)return;if(le<Bt){Ve=(Ve*le+n.beta)/(le+1),Qe=(Qe*le+n.gamma)/(le+1),le+=1,w.tiltX=0,w.tiltY=0,Ie.eventCount+=1,z({lastTilt:[0,0],permState:`calibrating ${le}/${Bt}`});return}const s=n.gamma-Qe,c=n.beta-Ve,x=Ut(s),y=-Ut(c),I=.04;w.tiltX+=(x-w.tiltX)*I,w.tiltY+=(y-w.tiltY)*I,Ie.eventCount+=1,z({lastTilt:[w.tiltX,w.tiltY],permState:"granted"})}function zt(n){const s=n.acceleration;if(!s)return;const c=s.x||0,x=s.y||0,y=s.z||0,I=Math.sqrt(c*c+x*x+y*y),ae=performance.now();if(I<=Ct||ae-Mt<jo)return;Mt=ae;const U=I>0?-(c/I):0,me=I>0?x/I:0,pe=window.innerWidth*Math.min(Math.max(.5+U*.42,.05),.95),_e=window.innerHeight*Math.min(Math.max(.5+me*.42,.05),.95),sa=Math.min(I-Ct,6);Me(pe,_e,150,Math.min(.018+sa*.008,.07))}function Xt(){K.granted||(K.granted=!0,window.addEventListener("deviceorientation",Ht,k),window.addEventListener("devicemotion",zt,k))}function ea(){K.granted&&(K.granted=!1,window.removeEventListener("deviceorientation",Ht,k),window.removeEventListener("devicemotion",zt,k))}function Gt(n){if(K.requested||!o){z({permState:K.requested?"requested-skip":"no-coarse-pointer"});return}if(typeof DeviceOrientationEvent<"u"&&typeof DeviceOrientationEvent.requestPermission=="function"){if(!n){z({permState:"awaiting-gesture"});return}K.requested=!0,z({permState:"asking"}),DeviceOrientationEvent.requestPermission().then(c=>{z({permState:c}),c==="granted"?(Xt(),Ot()):It("Motion off")}).catch(c=>{z({permState:"error",lastError:String(c?.message||c)}),K.requested=!1,It("Tap to retry")});return}K.requested=!0,Xt(),Ot(),z({permState:"auto-granted-non-ios"})}const xe={requested:!1,done:!1};let Y=null,ce=0,Yt=!1;function $e(){Yt||(Yt=!0,Ko(),Gt(!1))}function ta(){const n=Ao();return!(n.off||n.coords||!("geolocation"in navigator)||!navigator.geolocation||!window.isSecureContext||So())}function oa(){if(Nt(),!ta()){$e();return}Y=document.createElement("button"),Y.type="button",Y.className="waxup-geo-chip hero-pill",Pt(Y,"Active Weather"),Y.addEventListener("click",n=>{n.preventDefault(),na()},{passive:!1}),(document.querySelector(".hero-actions")||document.body).appendChild(Y),z({geoState:"idle"}),$e()}function je(n){Ft(Y,n)}function qt(n){if(ce&&(window.clearTimeout(ce),ce=0),Y){const s=Y;Y=null,s.classList.add("is-hidden"),window.setTimeout(()=>s.remove(),700)}$e()}function aa(){ce&&(window.clearTimeout(ce),ce=0),Y?.remove(),Y=null}function na(){xe.requested||(xe.requested=!0,window.dispatchEvent(new CustomEvent("waxup:user-took-control",{detail:{source:"geo"}})),je("Locating…"),z({geoState:"asking"}),navigator.geolocation.getCurrentPosition(n=>{xe.done=!0;const s=Math.round(n.coords.latitude*100)/100,c=Math.round(n.coords.longitude*100)/100;Lo(s,c),z({geoState:`granted ${s},${c}`}),ko({lat:s,lon:c},{force:!0}),qt()},n=>{const s=n&&n.code;s===1?(xe.done=!0,z({geoState:"denied"}),je("Location off"),ce=window.setTimeout(()=>qt(),3500)):(xe.requested=!1,z({geoState:s===2?"unavailable":"timeout"}),je("Tap to retry"))},{enableHighAccuracy:!1,timeout:8e3,maximumAge:10*60*1e3}))}function Vt(n){const s=n.detail||{};Number.isFinite(s.docTop)&&Number.isFinite(s.heightPx)?(g.docTop=s.docTop,g.heightPx=Math.max(s.heightPx,0)):Number.isFinite(s.top)&&Number.isFinite(s.height)&&(g.docTop=NaN,g.top=P(s.top,-2,3),g.height=P(s.height,0,3)),g.targetInfluence=P(s.influence),J()}function Qt(n){const s=n.detail||{};Number.isFinite(s.docTop)&&Number.isFinite(s.heightPx)&&(ee.docTop=s.docTop,ee.heightPx=Math.max(s.heightPx,0)),ee.influence=P(s.influence),ft=!0,J()}function $t(n){const s=n.detail||{},c=s.phone||{};d.stageProgress=P(s.stageProgress),d.stageInfluence=P(s.stageInfluence),d.scrollVelocity=P(s.scrollVelocity,-1,1),d.phone.x=P(c.x,-1,2),d.phone.y=P(c.y,-1,2),d.phone.width=P(c.width,0,2),d.phone.height=P(c.height,0,2),Number.isFinite(s.waveTravel)?(d.waveActive=!1,d.waveTravel=P(s.waveTravel),be(!1)):P(s.waveKick)>.2&&(!d.waveActive||d.waveTravel>.55)&&(d.waveActive=!0,d.waveTravel=.001,be(!0)),J()}function jt(n){const s=n.detail||{},c=Number(s.x),x=Number(s.y);if(!Number.isFinite(c)||!Number.isFinite(x))return;const y=Number.isFinite(s.radius)?s.radius:70,I=Number.isFinite(s.strength)?s.strength:.12;Me(c,x,y,I),J()}function Jt(){if(document.hidden){Ne();return}J()}function Kt(){J()}function Zt(n){n.preventDefault(),ke=!0,Ne(),qe()}function eo(){if(!ye){ke=!1;try{Tt()?J():Ce()}catch(n){console.error("WaterSurface failed to restore WebGL.",n),Ce()}}}const k={passive:!0};function ra(){window.addEventListener("resize",yt,k),window.addEventListener("orientationchange",xt,k),document.addEventListener("mousemove",Et,k),document.addEventListener("click",St,k),document.addEventListener("touchstart",Lt,k),document.addEventListener("touchmove",At,k),document.addEventListener("touchend",kt,k),document.addEventListener("visibilitychange",Jt),window.addEventListener("pageshow",Kt,k),window.addEventListener(ao,$t),window.addEventListener(ro,jt),Bo||window.addEventListener(no,Vt),Re===null&&window.addEventListener(io,Qt),F.addEventListener("webglcontextlost",Zt),F.addEventListener("webglcontextrestored",eo),new URLSearchParams(window.location.search).has("waterChips")&&oa()}function ia(){H&&(window.clearTimeout(H),H=0),window.removeEventListener("resize",yt,k),window.removeEventListener("orientationchange",xt,k),document.removeEventListener("mousemove",Et,k),document.removeEventListener("click",St,k),document.removeEventListener("touchstart",Lt,k),document.removeEventListener("touchmove",At,k),document.removeEventListener("touchend",kt,k),document.removeEventListener("visibilitychange",Jt),window.removeEventListener("pageshow",Kt,k),window.removeEventListener(ao,$t),window.removeEventListener(ro,jt),window.removeEventListener(no,Vt),window.removeEventListener(io,Qt),F.removeEventListener("webglcontextlost",Zt),F.removeEventListener("webglcontextrestored",eo),ea(),aa(),Zo()}try{ra(),Tt()?(J(),zo&&(fe=window.setTimeout(_t,u))):Ce()}catch(n){console.error("WaterSurface failed to initialize WebGL.",n),Ce()}return{destroy(){ye=!0,fe&&(window.clearTimeout(fe),fe=0),Ne(),ia(),qe(),F.remove(),be(!1)},setMood(n){n&&(b=n,_=n,L=0,A=0,B=0,W=0)},transitionToMood(n,s){if(n){if(!(s>0)){b=n,_=n,L=0,A=0,B=0,W=0;return}_=L>=.5?b:_,b=n,L=0,A=0,B=s,W=0}},setRainIntensity(n){const s=Math.round(Number(n));Number.isFinite(s)&&(Q=Math.max(1,Math.min(5,s)))}}}class Ta extends HTMLElement{connectedCallback(){if(this.waterMood=pa(),this.baseMood=this.waterMood,this.dataset.waterMood=this.waterMood.id,this.weatherUpdatedHandler=a=>this.applyWeatherUpdate(a?.detail),window.addEventListener("waxup:weather-updated",this.weatherUpdatedHandler),this.cycleWaterHandler=()=>this.cycleWaterMood(),window.addEventListener("waxup:cycle-water",this.cycleWaterHandler),this.motionQuery=window.matchMedia(da),this.motionHandler=()=>this.syncMotionPreference(),this.motionQuery.addEventListener?this.motionQuery.addEventListener("change",this.motionHandler):this.motionQuery.addListener(this.motionHandler),this.syncMotionPreference(),this.waterMood.id==="rain"){const a=new URLSearchParams(window.location.search),i=a.get("rainIntensity")??a.get("rain");if(i!==null&&i!==""){const l=Number.parseInt(i,10);Number.isFinite(l)&&l>=1&&l<=5&&(this.dataset.rainIntensity=String(l),this.surface?this.surface.setRainIntensity?.(l):this.pendingRainIntensity=l)}}const t=()=>{ba().then(a=>{a&&!this.cinematicActive&&this.applyMood(a.mood,a.intensity)}).catch(()=>{})},o=()=>{"requestIdleCallback"in window?window.requestIdleCallback(t,{timeout:2e3}):t()};document.readyState==="complete"?o():window.addEventListener("load",o,{once:!0})}disconnectedCallback(){this.motionQuery&&this.motionHandler&&(this.motionQuery.removeEventListener?this.motionQuery.removeEventListener("change",this.motionHandler):this.motionQuery.removeListener(this.motionHandler)),this.weatherUpdatedHandler&&window.removeEventListener("waxup:weather-updated",this.weatherUpdatedHandler),this.cycleWaterHandler&&window.removeEventListener("waxup:cycle-water",this.cycleWaterHandler),this.cancelPendingSurfaceInit(),this.destroySurface()}applyMood(t,o){t&&(this.waterMood=t,this.dataset.waterMood=t.id,typeof o=="number"?(this.dataset.rainIntensity=String(o),this.surface?this.surface.setRainIntensity?.(o):this.pendingRainIntensity=o):(delete this.dataset.rainIntensity,this.pendingRainIntensity=null),this.surface?.setMood?.(t))}cinematicTo(t,o,a){if(!this.surface)return;const i=O.find(l=>l.id===t);i&&(typeof a=="number"&&this.surface.setRainIntensity?.(a),this.surface.transitionToMood?.(i,o))}applyWeatherUpdate(t){if(this.cinematicActive&&!(t&&t.source==="browser-geo"))return;const o=new URLSearchParams(window.location.search);if(!(o.get("water")||o.get("waterMood")||o.has("rain")||o.get("simulateRain")==="1")){if(t&&t.source==="browser-geo"){const a=ga(t);a.id==="rain"?this.applyMood(a,ot(t.weatherCode)):(this.baseMood=a,this.applyMood(a));return}if(st(t)){const a=O.find(i=>i.id==="rain");a&&this.applyMood(a,ot(t.weatherCode))}else this.applyMood(this.baseMood||O[0])}}cycleWaterMood(){const t=O.findIndex(a=>a.id===this.waterMood?.id),o=O[(t+1)%O.length];o.id==="rain"?this.applyMood(o,3):(this.baseMood=o,this.applyMood(o))}syncMotionPreference(){if(this.motionQuery.matches){this.cancelPendingSurfaceInit(),this.destroySurface(),this.dataset.reducedMotion="true",this.innerHTML='<div class="water-fallback" data-water-fallback></div>';return}delete this.dataset.reducedMotion,!this.surface&&!this.surfaceInitPending&&this.scheduleSurfaceInit()}scheduleSurfaceInit(){this.surfaceInitPending=!0;const t=()=>{this._surfaceInitRaf=0,this.surfaceInitPending=!1,!(!this.isConnected||this.surface||this.motionQuery.matches)&&(this.surface=_a(this,this.waterMood||O[0]),this.pendingRainIntensity!=null&&(this.surface.setRainIntensity?.(this.pendingRainIntensity),this.pendingRainIntensity=null))};this._surfaceInitRaf=window.requestAnimationFrame(()=>{this._surfaceInitRaf=window.requestAnimationFrame(t)})}cancelPendingSurfaceInit(){this._surfaceInitRaf&&(window.cancelAnimationFrame(this._surfaceInitRaf),this._surfaceInitRaf=0),this.surfaceInitPending=!1}destroySurface(){this.surface&&(this.surface.destroy(),this.surface=null)}}customElements.get(oo)||customElements.define(oo,Ta);let Ze=null;function Ea(){Ze?.(),Ze=null;const e=document.getElementById("perf-hud");if(!e)return;const t=new URLSearchParams(window.location.search);if(!t.has("perfhud")){e.hidden=!0;return}e.hidden=!1;const o=t.has("noblur");document.documentElement.classList.toggle("perf-no-blur",o);const a=e.querySelector("[data-fps]"),i=e.querySelector("[data-frame]"),l=e.querySelector("[data-state]"),m=e.querySelector("[data-env]"),u=e.querySelector("[data-mode]"),f=[t.has("nowater")?"water:off":"",o?"blur:off":""].filter(Boolean).join(" · ");f&&(u.textContent=f,u.hidden=!1);const p=90,v=new Float32Array(p);let h=0,S=0,b=0,_=0,L=0,A=0;const B=()=>{e.classList.add("is-scrolling"),A&&clearTimeout(A),A=window.setTimeout(()=>e.classList.remove("is-scrolling"),160)},W=()=>{m.textContent=`dpr ${window.devicePixelRatio||1} · w${window.innerWidth}`},V=Q=>{if(b&&(v[S]=Q-b,S=(S+1)%p,h<p&&h++),b=Q,Q-_>=250&&h){_=Q;let Z=0,$=0;for(let R=0;R<h;R++){const C=v[R];Z+=C,C>$&&($=C)}const X=Z/h,N=Math.round(1e3/X);a.textContent=`${N} fps`,i.textContent=`frame ${X.toFixed(0)} / ${$.toFixed(0)} ms`,l.textContent=e.classList.contains("is-scrolling")?"SCROLLING":"idle",e.classList.toggle("fps-ok",N>=50),e.classList.toggle("fps-warn",N>=30&&N<50),e.classList.toggle("fps-bad",N<30)}L=window.requestAnimationFrame(V)};W(),window.addEventListener("scroll",B,{passive:!0}),window.addEventListener("resize",W,{passive:!0}),L=window.requestAnimationFrame(V),Ze=()=>{L&&cancelAnimationFrame(L),A&&clearTimeout(A),window.removeEventListener("scroll",B),window.removeEventListener("resize",W)}}document.addEventListener("astro:page-load",Ea);const mo="[data-reveal]",Ra="[data-reveal-group]",po=".cta-pill, .hero-pill, .nav-dock-item, .icon-cell",Sa="(prefers-reduced-motion: reduce)";let et=null;function at(){et?.(),et=null;const e=window.matchMedia(Sa).matches,t=new AbortController,{signal:o}=t;let a=null;const i=Array.from(document.querySelectorAll(mo));if(e||!("IntersectionObserver"in window))for(const l of i)l.classList.add("is-revealed");else if(i.length){for(const l of document.querySelectorAll(Ra)){let m=0;for(const u of l.querySelectorAll(mo))u.style.setProperty("--wx-reveal-delay",`${Math.min(m,7)*75}ms`),m+=1}a=new IntersectionObserver(l=>{for(const m of l)m.isIntersecting&&(m.target.classList.add("is-revealed"),a?.unobserve(m.target))},{threshold:.12,rootMargin:"0px 0px -8% 0px"});for(const l of i)l.classList.contains("is-revealed")||a.observe(l)}if(!e){const l=new WeakMap;let m=0;const u=(f,p,v,h,S)=>{const b=performance.now();b-m<110||b-(l.get(f)??-1/0)<650||(m=b,l.set(f,b),window.dispatchEvent(new CustomEvent("waxup:water-impulse",{detail:{x:p,y:v,radius:h,strength:S}})))};window.matchMedia("(hover: hover) and (pointer: fine)").matches&&document.addEventListener("pointerover",f=>{const p=f.target?.closest?.(po);p&&(f.relatedTarget&&p.contains(f.relatedTarget)||u(p,f.clientX,f.clientY,44,.035))},{passive:!0,signal:o}),document.addEventListener("focusin",f=>{const p=f.target?.closest?.(po);if(!p||!f.target.matches(":focus-visible"))return;const v=p.getBoundingClientRect();u(p,v.left+v.width/2,v.top+v.height/2,48,.045)},{passive:!0,signal:o})}et=()=>{t.abort(),a?.disconnect(),a=null}}document.readyState!=="loading"?at():document.addEventListener("DOMContentLoaded",at,{once:!0});document.addEventListener("astro:page-load",at);const we="data-astro-transition-persist";function La(e){for(const t of document.scripts)for(const o of e.scripts)if(!o.hasAttribute("data-astro-rerun")&&(!t.src&&t.textContent===o.textContent||t.src&&t.type===o.type&&t.src===o.src)){o.dataset.astroExec="";break}}function Aa(e){const t=document.documentElement,o=[...t.attributes].filter(({name:a})=>(t.removeAttribute(a),a.startsWith("data-astro-")));[...e.documentElement.attributes,...o].forEach(({name:a,value:i})=>t.setAttribute(a,i))}function ka(e){for(const t of Array.from(document.head.children)){const o=Da(t,e);o?o.remove():t.remove()}document.head.append(...e.head.children)}function Ca(e,t){t.replaceWith(e);for(const o of t.querySelectorAll(`[${we}]`)){const a=o.getAttribute(we),i=e.querySelector(`[${we}="${a}"]`);i&&(i.replaceWith(o),i.localName==="astro-island"&&Pa(o)&&!Fa(o,i)&&(o.setAttribute("ssr",""),o.setAttribute("props",i.getAttribute("props"))))}}const Ma=()=>{const e=document.activeElement;if(e?.closest(`[${we}]`)){if(e instanceof HTMLInputElement||e instanceof HTMLTextAreaElement){const t=e.selectionStart,o=e.selectionEnd;return()=>tt({activeElement:e,start:t,end:o})}return()=>tt({activeElement:e})}else return()=>tt({activeElement:null})},tt=({activeElement:e,start:t,end:o})=>{e&&(e.focus(),(e instanceof HTMLInputElement||e instanceof HTMLTextAreaElement)&&(typeof t=="number"&&(e.selectionStart=t),typeof o=="number"&&(e.selectionEnd=o)))},Da=(e,t)=>{const o=e.getAttribute(we),a=o&&t.head.querySelector(`[${we}="${o}"]`);if(a)return a;if(e.matches("link[rel=stylesheet]")){const i=e.getAttribute("href");return t.head.querySelector(`link[rel=stylesheet][href="${i}"]`)}return null},Pa=e=>{const t=e.dataset.astroTransitionPersistProps;return t==null||t==="false"},Fa=(e,t)=>e.getAttribute("props")===t.getAttribute("props"),Na=e=>{La(e),Aa(e),ka(e);const t=Ma();Ca(e.body,document.body),t()},Ia="astro:before-preparation",Oa="astro:after-preparation",Wa="astro:before-swap",Ua="astro:after-swap",Ba=e=>document.dispatchEvent(new Event(e));class Co extends Event{from;to;direction;navigationType;sourceElement;info;newDocument;signal;constructor(t,o,a,i,l,m,u,f,p,v){super(t,o),this.from=a,this.to=i,this.direction=l,this.navigationType=m,this.sourceElement=u,this.info=f,this.newDocument=p,this.signal=v,Object.defineProperties(this,{from:{enumerable:!0},to:{enumerable:!0,writable:!0},direction:{enumerable:!0,writable:!0},navigationType:{enumerable:!0},sourceElement:{enumerable:!0},info:{enumerable:!0},newDocument:{enumerable:!0,writable:!0},signal:{enumerable:!0}})}}class Ha extends Co{formData;loader;constructor(t,o,a,i,l,m,u,f,p,v){super(Ia,{cancelable:!0},t,o,a,i,l,m,u,f),this.formData=p,this.loader=v.bind(this,this),Object.defineProperties(this,{formData:{enumerable:!0},loader:{enumerable:!0,writable:!0}})}}class za extends Co{direction;viewTransition;swap;constructor(t,o){super(Wa,void 0,t.from,t.to,t.direction,t.navigationType,t.sourceElement,t.info,t.newDocument,t.signal),this.direction=t.direction,this.viewTransition=o,this.swap=()=>Na(this.newDocument),Object.defineProperties(this,{direction:{enumerable:!0},viewTransition:{enumerable:!0},swap:{enumerable:!0,writable:!0}})}}async function Xa(e,t,o,a,i,l,m,u,f){const p=new Ha(e,t,o,a,i,l,window.document,m,u,f);return document.dispatchEvent(p)&&(await p.loader(),p.defaultPrevented||(Ba(Oa),p.navigationType!=="traverse"&&lt({scrollX,scrollY}))),p}function Ga(e,t){const o=new za(e,t);return document.dispatchEvent(o),o.swap(),o}const Ya=history.pushState.bind(history),We=history.replaceState.bind(history),lt=e=>{history.state&&(history.scrollRestoration="manual",We({...history.state,...e},""))},ct=!!document.startViewTransition,ht=()=>!!document.querySelector('[name="astro-view-transitions-enabled"]'),Mo=(e,t)=>e.pathname===t.pathname&&e.search===t.search;let q,he,Be;const Do=e=>document.dispatchEvent(new Event(e)),Po=()=>Do("astro:page-load"),qa=()=>{let e=document.createElement("div");e.setAttribute("aria-live","assertive"),e.setAttribute("aria-atomic","true"),e.className="astro-route-announcer",document.body.append(e),setTimeout(()=>{let t=document.title||document.querySelector("h1")?.textContent||location.pathname;e.textContent=t},60)},wo="data-astro-transition-persist",vo="data-astro-transition",nt="data-astro-transition-fallback";let go,Te=0;history.state?(Te=history.state.index,scrollTo({left:history.state.scrollX,top:history.state.scrollY})):ht()&&(We({index:Te,scrollX,scrollY},""),history.scrollRestoration="manual");async function Va(e,t){try{const o=await fetch(e,t),i=(o.headers.get("content-type")??"").split(";",1)[0].trim();return i!=="text/html"&&i!=="application/xhtml+xml"?null:{html:await o.text(),redirected:o.redirected?o.url:void 0,mediaType:i}}catch{return null}}function Fo(){const e=document.querySelector('[name="astro-view-transitions-fallback"]');return e?e.getAttribute("content"):"animate"}function Qa(){let e=Promise.resolve();for(const t of document.getElementsByTagName("script")){if(t.dataset.astroExec==="")continue;const o=t.getAttribute("type");if(o&&o!=="module"&&o!=="text/javascript")continue;const a=document.createElement("script");a.innerHTML=t.innerHTML;for(const i of t.attributes){if(i.name==="src"){const l=new Promise(m=>{a.onload=a.onerror=m});e=e.then(()=>l)}a.setAttribute(i.name,i.value)}a.dataset.astroExec="",t.replaceWith(a)}return e}const No=(e,t,o,a,i)=>{const l=Mo(t,e),m=document.title;document.title=a;let u=!1;if(e.href!==location.href&&!i)if(o.history==="replace"){const f=history.state;We({...o.state,index:f.index,scrollX:f.scrollX,scrollY:f.scrollY},"",e.href)}else Ya({...o.state,index:++Te,scrollX:0,scrollY:0},"",e.href);if(document.title=m,Be=e,l||(scrollTo({left:0,top:0,behavior:"instant"}),u=!0),i)scrollTo(i.scrollX,i.scrollY);else{if(e.hash){history.scrollRestoration="auto";const f=history.state;location.href=e.href,history.state||(We(f,""),l&&window.dispatchEvent(new PopStateEvent("popstate")))}else u||scrollTo({left:0,top:0,behavior:"instant"});history.scrollRestoration="manual"}};function $a(e){const t=[];for(const o of e.querySelectorAll("head link[rel=stylesheet]"))if(!document.querySelector(`[${wo}="${o.getAttribute(wo)}"], link[rel=stylesheet][href="${o.getAttribute("href")}"]`)){const a=document.createElement("link");a.setAttribute("rel","preload"),a.setAttribute("as","style"),a.setAttribute("href",o.getAttribute("href")),t.push(new Promise(i=>{["load","error"].forEach(l=>a.addEventListener(l,i)),document.head.append(a)}))}return t}async function bo(e,t,o,a,i){async function l(f){function p(b){const _=b.effect;return!_||!(_ instanceof KeyframeEffect)||!_.target?!1:window.getComputedStyle(_.target,_.pseudoElement).animationIterationCount==="infinite"}const v=document.getAnimations();document.documentElement.setAttribute(nt,f);const S=document.getAnimations().filter(b=>!v.includes(b)&&!p(b));return Promise.allSettled(S.map(b=>b.finished))}if(i==="animate"&&!o.transitionSkipped&&!e.signal.aborted)try{await l("old")}catch{}const m=document.title,u=Ga(e,o.viewTransition);No(u.to,u.from,t,m,a),Do(Ua),i==="animate"&&(!o.transitionSkipped&&!u.signal.aborted?l("new").finally(()=>o.viewTransitionFinished()):o.viewTransitionFinished())}function ja(){return q?.controller.abort(),q={controller:new AbortController}}async function Io(e,t,o,a,i){const l=ja();if(!ht()||location.origin!==o.origin){l===q&&(q=void 0),location.href=o.href;return}const m=i?"traverse":a.history==="replace"?"replace":"push";if(m!=="traverse"&&lt({scrollX,scrollY}),Mo(t,o)&&(e!=="back"&&o.hash||e==="back"&&t.hash)){No(o,t,a,document.title,i),l===q&&(q=void 0);return}const u=await Xa(t,o,e,m,a.sourceElement,a.info,l.controller.signal,a.formData,f);if(u.defaultPrevented||u.signal.aborted){l===q&&(q=void 0),u.signal.aborted||(location.href=o.href);return}async function f(h){const S=h.to.href,b={signal:h.signal};if(h.formData){b.method="POST";const A=h.sourceElement instanceof HTMLFormElement?h.sourceElement:h.sourceElement instanceof HTMLElement&&"form"in h.sourceElement?h.sourceElement.form:h.sourceElement?.closest("form");b.body=A?.attributes.getNamedItem("enctype")?.value==="application/x-www-form-urlencoded"?new URLSearchParams(h.formData):h.formData}const _=await Va(S,b);if(_===null){h.preventDefault();return}if(_.redirected){const A=new URL(_.redirected);if(A.origin!==h.to.origin){h.preventDefault();return}h.to=A}if(go??=new DOMParser,h.newDocument=go.parseFromString(_.html,_.mediaType),h.newDocument.querySelectorAll("noscript").forEach(A=>A.remove()),!h.newDocument.querySelector('[name="astro-view-transitions-enabled"]')&&!h.formData){h.preventDefault();return}const L=$a(h.newDocument);L.length&&!h.signal.aborted&&await Promise.all(L)}async function p(){if(he&&he.viewTransition){try{he.viewTransition.skipTransition()}catch{}try{await he.viewTransition.updateCallbackDone}catch{}}return he={transitionSkipped:!1}}const v=await p();if(u.signal.aborted){l===q&&(q=void 0);return}if(document.documentElement.setAttribute(vo,u.direction),ct)v.viewTransition=document.startViewTransition(async()=>await bo(u,a,v,i));else{const h=(async()=>{await Promise.resolve(),await bo(u,a,v,i,Fo())})();v.viewTransition={updateCallbackDone:h,ready:h,finished:new Promise(S=>v.viewTransitionFinished=S),skipTransition:()=>{v.transitionSkipped=!0,document.documentElement.removeAttribute(nt)}}}v.viewTransition?.updateCallbackDone.finally(async()=>{await Qa(),Po(),qa()}),v.viewTransition?.finished.finally(()=>{v.viewTransition=void 0,v===he&&(he=void 0),l===q&&(q=void 0),document.documentElement.removeAttribute(vo),document.documentElement.removeAttribute(nt)});try{await v.viewTransition?.updateCallbackDone}catch(h){const S=h;console.log("[astro]",S.name,S.message,S.stack)}}async function yo(e,t){await Io("forward",Be,new URL(e,location.href),t??{})}function Ja(e){if(!ht()&&e.state){location.reload();return}if(e.state===null)return;const t=history.state,o=t.index,a=o>Te?"forward":"back";Te=o,Io(a,Be,new URL(location.href),{},t)}const xo=()=>{history.state&&(scrollX!==history.state.scrollX||scrollY!==history.state.scrollY)&&lt({scrollX,scrollY})};{if(ct||Fo()!=="none")if(Be=new URL(location.href),addEventListener("popstate",Ja),addEventListener("load",Po),"onscrollend"in window)addEventListener("scrollend",xo);else{let e,t,o,a;const i=()=>{if(a!==history.state?.index){clearInterval(e),e=void 0;return}if(t===scrollY&&o===scrollX){clearInterval(e),e=void 0,xo();return}else t=scrollY,o=scrollX};addEventListener("scroll",()=>{e===void 0&&(a=history.state?.index,t=scrollY,o=scrollX,e=window.setInterval(i,50))},{passive:!0})}for(const e of document.getElementsByTagName("script"))e.dataset.astroExec=""}const Oo=new Set,Ue=new WeakSet;let rt,Wo,_o=!1;function Ka(e){_o||(_o=!0,rt??=e?.prefetchAll,Wo??=e?.defaultStrategy??"hover",Za(),en(),tn(),an())}function Za(){for(const e of["touchstart","mousedown"])document.body.addEventListener(e,t=>{Ee(t.target,"tap")&&He(t.target.href,{ignoreSlowConnection:!0})},{passive:!0})}function en(){let e;document.body.addEventListener("focusin",a=>{Ee(a.target,"hover")&&t(a)},{passive:!0}),document.body.addEventListener("focusout",o,{passive:!0}),dt(()=>{for(const a of document.getElementsByTagName("a"))Ue.has(a)||Ee(a,"hover")&&(Ue.add(a),a.addEventListener("mouseenter",t,{passive:!0}),a.addEventListener("mouseleave",o,{passive:!0}))});function t(a){const i=a.target.href;e&&clearTimeout(e),e=setTimeout(()=>{He(i)},80)}function o(){e&&(clearTimeout(e),e=0)}}function tn(){let e;dt(()=>{for(const t of document.getElementsByTagName("a"))Ue.has(t)||Ee(t,"viewport")&&(Ue.add(t),e??=on(),e.observe(t))})}function on(){const e=new WeakMap;return new IntersectionObserver((t,o)=>{for(const a of t){const i=a.target,l=e.get(i);a.isIntersecting?(l&&clearTimeout(l),e.set(i,setTimeout(()=>{o.unobserve(i),e.delete(i),He(i.href)},300))):l&&(clearTimeout(l),e.delete(i))}})}function an(){dt(()=>{for(const e of document.getElementsByTagName("a"))Ee(e,"load")&&He(e.href)})}function He(e,t){e=e.replace(/#.*/,"");const o=t?.ignoreSlowConnection??!1;if(nn(e,o))if(Oo.add(e),document.createElement("link").relList?.supports?.("prefetch")&&t?.with!=="fetch"){const a=document.createElement("link");a.rel="prefetch",a.setAttribute("href",e),document.head.append(a)}else fetch(e,{priority:"low"})}function nn(e,t){if(!navigator.onLine||!t&&Uo())return!1;try{const o=new URL(e,location.href);return location.origin===o.origin&&(location.pathname!==o.pathname||location.search!==o.search)&&!Oo.has(e)}catch{}return!1}function Ee(e,t){if(e?.tagName!=="A")return!1;const o=e.dataset.astroPrefetch;return o==="false"?!1:t==="tap"&&(o!=null||rt)&&Uo()?!0:o==null&&rt||o===""?t===Wo:o===t}function Uo(){if("connection"in navigator){const e=navigator.connection;return e.saveData||/2g/.test(e.effectiveType)}return!1}function dt(e){e();let t=!1;document.addEventListener("astro:page-load",()=>{if(!t){t=!0;return}e()})}function rn(){const e=document.querySelector('[name="astro-view-transitions-fallback"]');return e?e.getAttribute("content"):"animate"}function To(e){return e.dataset.astroReload!==void 0}(ct||rn()!=="none")&&(document.addEventListener("click",e=>{let t=e.target;if(e.composed&&(t=e.composedPath()[0]),t instanceof Element&&(t=t.closest("a, area")),!(t instanceof HTMLAnchorElement)&&!(t instanceof SVGAElement)&&!(t instanceof HTMLAreaElement))return;const o=t instanceof HTMLElement?t.target:t.target.baseVal,a=t instanceof HTMLElement?t.href:t.href.baseVal,i=new URL(a,location.href).origin;To(t)||t.hasAttribute("download")||!t.href||o&&o!=="_self"||i!==location.origin||e.button!==0||e.metaKey||e.ctrlKey||e.altKey||e.shiftKey||e.defaultPrevented||(e.preventDefault(),yo(a,{history:t.dataset.astroHistory==="replace"?"replace":"auto",sourceElement:t}))}),document.addEventListener("submit",e=>{let t=e.target;if(t.tagName!=="FORM"||e.defaultPrevented||To(t))return;const o=t,a=e.submitter,i=new FormData(o,a),l=typeof o.action=="string"?o.action:o.getAttribute("action"),m=typeof o.method=="string"?o.method:o.getAttribute("method");let u=a?.getAttribute("formaction")??l??location.pathname;const f=a?.getAttribute("formmethod")??m??"get";if(f==="dialog"||location.origin!==new URL(u,location.href).origin)return;const p={sourceElement:a??o};if(f==="get"){const v=new URLSearchParams(i),h=new URL(u);h.search=v.toString(),u=h.toString()}else p.formData=i;e.preventDefault(),yo(u,p)}),Ka({prefetchAll:!0}));
