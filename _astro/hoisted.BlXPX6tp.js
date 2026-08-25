let za=null;const Nt=new WeakSet;let Ie=null;function Ya(e){if(Nt.has(e))return;const t=e.dataset.footerSandSrc;t&&(e.style.setProperty("--footer-sand-image",`url("${t.replace(/"/g,'\\"')}")`),e.dataset.footerSandLoaded="true",Nt.add(e))}function on(){const e=Array.from(document.querySelectorAll(".site-footer[data-footer-sand-src]")).filter(t=>!Nt.has(t));if(Ie?.disconnect(),Ie=null,!!e.length){if(!("IntersectionObserver"in window)){e.forEach(Ya);return}Ie=new IntersectionObserver(t=>{t.forEach(o=>{if(!o.isIntersecting)return;const s=o.target;Ya(s),Ie?.unobserve(s)})},{rootMargin:"900px 0px"}),e.forEach(t=>Ie?.observe(t))}}function nn(){za?.();const e=document.documentElement;let t=0;const o=()=>{e.classList.add("is-scrolling"),t&&clearTimeout(t),t=window.setTimeout(()=>e.classList.remove("is-scrolling"),180)};window.addEventListener("scroll",o,{passive:!0}),za=()=>{window.removeEventListener("scroll",o),t&&clearTimeout(t),e.classList.remove("is-scrolling")}}document.addEventListener("astro:page-load",()=>{nn(),on()});let kt=null;function fo(){kt?.(),kt=null;const e=new AbortController,{signal:t}=e,o=()=>{const E=window.getComputedStyle(document.documentElement).getPropertyValue("--top-nav-clearance");return Number.parseFloat(E)||112};let s=-1,l=0,d=0,y=!1,g=0;const w=.11;let v=0;const x=document.querySelector(".hero-mark"),f=document.documentElement,T=document.querySelector(".top-nav");let _=0,C=1,W=112,F=!1,he=!1;const ue=()=>{T&&(T.classList.add("nav-shine"),window.setTimeout(()=>T.classList.remove("nav-shine"),1200))},j=E=>{f.style.setProperty("--nav-progress",E.toFixed(4));const P=E>=.5;document.body.classList.toggle("nav-logo-docked",P),he&&P&&!F&&ue(),F=P,he=!0},Z=E=>{let P=0;for(;E;)P+=E.offsetTop,E=E.offsetParent;return P},ee=()=>{W=o(),_=x?Z(x):0,C=x?.offsetHeight||1},se=E=>{l=E,y||(d=E,y=!0,j(E))},fe=()=>{if(!x){se(1);return}const E=W,P=_-window.scrollY,B=C;let G=(E-P)/(B*1.5);G<0?G=0:G>1&&(G=1),se(G)},K=E=>{const P=window.scrollY;P!==s&&(s=P,fe());const B=l-d;if(Math.abs(B)>4e-4){const G=g?Math.min((E-g)/1e3,.1):.016;d+=B*(1-Math.exp(-G/w)),Math.abs(l-d)<=4e-4&&(d=l),j(d)}g=E,v=window.requestAnimationFrame(K)};v=window.requestAnimationFrame(K);const me=()=>{ee(),s=-1};window.addEventListener("resize",me,{passive:!0,signal:t}),document.addEventListener("visibilitychange",()=>{document.hidden||(ee(),s=-1)},{signal:t});let te=null;const Be=document.querySelector(".hero-intro");Be&&"ResizeObserver"in window&&(te=new ResizeObserver(()=>{ee(),s=-1}),te.observe(Be)),ee(),fe(),kt=()=>{window.cancelAnimationFrame(v),e.abort(),te?.disconnect(),document.body.classList.remove("nav-logo-docked")}}document.addEventListener("astro:page-load",fo);document.readyState!=="loading"&&fo();const sn="waxup-weather-v1";function rn(e){if(!e||typeof e!="object")return!1;const t=e,o=typeof t.weatherCode=="number"?t.weatherCode:null;if(o!==null&&(o>=51&&o<=67||o>=80&&o<=86||o>=95&&o<=99))return!0;const s=typeof t.precipitation=="number"?t.precipitation:null;return s!==null&&s>.1}function Ot(){const e=document.documentElement,o=(new URLSearchParams(window.location.search).get("navWeather")||"").toLowerCase();if(o){const s=["storm","rain","rainy","cloudy","wet"],l=["splash","sun","sunny","clear","sunrise"];if(s.includes(o)){e.dataset.navWeather="rain";return}if(l.includes(o)){e.dataset.navWeather="clear";return}}try{const s=window.sessionStorage?.getItem(sn);if(s){const l=JSON.parse(s);if(rn(l?.data)){e.dataset.navWeather="rain";return}e.dataset.navWeather="clear";return}}catch{}e.dataset.navWeather="clear"}document.addEventListener("astro:page-load",Ot);window.addEventListener("waxup:weather-updated",Ot);document.readyState!=="loading"&&Ot();document.addEventListener("click",e=>{e.target?.closest("[data-nav-weather-cycle]")&&window.dispatchEvent(new CustomEvent("waxup:cycle-water"))});const qa="waxup-water-surface",ln="(prefers-reduced-motion: reduce)",cn="(pointer: coarse)",Qa="waxup:water-choreography",Va="waxup:shore-choreography",Xa="waxup:water-impulse",Ja="waxup:page-calm",at="waxup-water-mood-v1",H=[{id:"tropical-glass",value:0},{id:"bay-fog",value:1},{id:"marine-layer",value:2},{id:"sunbreak",value:3},{id:"rain",value:2}],dn=new Map([["tropical","tropical-glass"],["glass","tropical-glass"],["teal","tropical-glass"],["bay","bay-fog"],["fog","bay-fog"],["foggy","bay-fog"],["grey","bay-fog"],["gray","bay-fog"],["marine","marine-layer"],["overcast","marine-layer"],["pacific","marine-layer"],["sun","sunbreak"],["clear","sunbreak"]]);function Ka(e){if(!e)return null;const t=e.toLowerCase().trim(),o=dn.get(t)||t;return H.find(s=>s.id===o)||null}function hn(e,t){if(!e)return null;try{return e.getItem(t)}catch{return null}}function Lt(e,t,o){if(e)try{e.setItem(t,o)}catch{}}function $a(e){try{return window[e]}catch{return null}}function un(){const e=new URLSearchParams(window.location.search),t=Ka(e.get("water")||e.get("waterMood")),o=$a("sessionStorage");if($a("localStorage"),t)return Lt(o,at,t.id),t;if(e.has("rain")){const d=H.find(y=>y.id==="rain");if(d)return Lt(o,at,d.id),d}const s=Ka(hn(o,at));if(s)return s;const l=H.find(d=>d.id==="tropical-glass")||H[0];return Lt(o,at,l.id),l}const ja="waxup-weather-v1",fn=10*60*1e3,mo="waxup-geo-v1",mn=10*60*1e3;function po(){try{const e=window.sessionStorage?.getItem(mo);if(e){const t=JSON.parse(e);if(t&&typeof t.ts=="number"&&Date.now()-t.ts<mn&&Number.isFinite(t.lat)&&Number.isFinite(t.lon))return{lat:t.lat,lon:t.lon}}}catch{}return null}function go(e,t){try{window.sessionStorage?.setItem(mo,JSON.stringify({ts:Date.now(),lat:e,lon:t}))}catch{}}function wo(){const e=new URLSearchParams(window.location.search).get("geo");if(!e)return{off:!1,coords:null};if(e==="off")return{off:!0,coords:null};const t=e.split(","),o=Number(t[0]),s=Number(t[1]);return t.length===2&&Number.isFinite(o)&&Number.isFinite(s)&&o>=-90&&o<=90&&s>=-180&&s<=180?{off:!1,coords:{lat:o,lon:s}}:{off:!1,coords:null}}async function vo(e,{force:t=!1}={}){if(!t)try{const o=window.sessionStorage?.getItem(ja);if(o){const s=JSON.parse(o),l=s&&typeof s.ts=="number"&&Date.now()-s.ts<fn,d=!e||s?.data?.source==="browser-geo";if(l&&d)return s.data}}catch{}try{const o=e?`/api/weather?lat=${encodeURIComponent(e.lat)}&lon=${encodeURIComponent(e.lon)}`:"/api/weather",s=await fetch(o,{credentials:"omit"});if(!s.ok)return null;const l=await s.json();try{window.sessionStorage?.setItem(ja,JSON.stringify({ts:Date.now(),data:l}))}catch{}try{window.dispatchEvent(new CustomEvent("waxup:weather-updated",{detail:l}))}catch{}return l}catch{return null}}function Ft(e){if(!e)return!1;const t=e.weatherCode;return typeof t=="number"&&(t>=51&&t<=67||t>=80&&t<=86||t>=95&&t<=99)||typeof e.precipitation=="number"&&e.precipitation>.1}function Ct(e){return typeof e!="number"?3:e===51||e===53?1:e===55||e===56||e===57||e===61?2:e===63?3:e===65?4:e===66||e===67?3:e===80?2:e===81?3:e===82?5:e===95?4:e===96||e===99?5:3}function pn(e){const t=s=>H.find(l=>l.id===s)||H[0];if(Ft(e))return t("rain");const o=e?.weatherCode;if(typeof o=="number"){if(o===45||o===48)return t("bay-fog");if(o===3)return t("marine-layer");if(o===2)return t("tropical-glass");if(o===0||o===1)return t("sunbreak")}return t("tropical-glass")}async function gn(){const e=new URLSearchParams(window.location.search);if(e.get("water")||e.get("waterMood")||e.has("rain"))return null;const t=H.find(d=>d.id==="rain");if(!t)return null;if(e.get("simulateRain")==="1")return{mood:t,intensity:3};const o=wo(),s=o.coords||po();o.coords&&go(o.coords.lat,o.coords.lon);const l=await vo(s);return Ft(l)?{mood:t,intensity:Ct(l.weatherCode)}:null}const Za=`
    attribute vec2 a_position;

    varying vec2 v_uv;

    void main() {
      v_uv = a_position * 0.5 + 0.5;
      gl_Position = vec4(a_position, 0.0, 1.0);
    }
  `,wn=`
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
        mix(0.987, 0.938, u_calm);

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

      // Scroll feeds the sim NOTHING: the fired wave + all hull/push reactions
      // are authored in the render shader. The sim carries only taps, cursor
      // ripples, rain and tilt, so the relief shading has no scroll swell to
      // paint as dark contour lines in open water.
      gl_FragColor = vec4(next * 0.5 + 0.5, current * 0.5 + 0.5, 0.0, 1.0);
    }
  `,vn=`
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
    // The one wave: (crestY bottom-up uv, energy 0..1, life s, span 0..1) —
    // anchoring + lifecycle live in the JS phase machine.
    uniform vec4 u_wave;
    // Floating UI rects (left, top, width, height — viewport-normalized,
    // top-down like u_phone): the nav bar and the hero wordmark hover above
    // the water and print soft sun shadows on it. Zero size = no shadow.
    uniform vec4 u_shadowNav;
    uniform vec4 u_shadowMark;
    // Wash ghost: (crestY — keeps traveling in JS, age s, energy at death,
    // life at death) — the dead wave's whitewash, painted with the live
    // wash vocabulary so the death frame is seamless.
    uniform vec4 u_wash;
    // Footer shore-break: (bandTop, bandHeight, influence, reach) — band in
    // viewport-normalized CSS coordinates (top-down), influence eased in
    // frame(); reach = this cycle's run-up depth, shaped in JS (a landing
    // wave boosts it).
    uniform vec4 u_shore;
    // JS-owned run-up cycle clock 0..1 (randomized period; a landing wave
    // retimes it so the arriving breaker IS the cycle).
    uniform float u_shorePhase;
    // Previous cycle's landed reach (0 = no previous front yet).
    uniform float u_shorePrev;
    // ?shoredebug — hot waterline overlay for harness screenshots.
    uniform float u_shoreDebug;
    // Copy-legibility calm, 0 = full drama → 1 = calm. Narrows the water's
    // VALUE range under long-form copy (relief/trough gains, glitter,
    // exposure compression, edge vignette floor, breaker apron) so text
    // stays readable. Value-only — hue and palette untouched. Not the
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

    // Lifecycle bands of the ONE crest from its on-screen position
    // (x = develop, y = spent, z = shallows) — shared by the live foam
    // block and the wash ghost so the two stay term-identical at death.
    vec3 lifeBands(float crestY) {
      float b = clamp((1.06 - crestY) * 0.96, 0.0, 1.0);
      return vec3(smoothstep(0.05, 0.32, b), smoothstep(0.62, 0.88, b), smoothstep(0.86, 0.99, b));
    }

    // BLUE pull streaks — the back of the wave drawn forward into the lip
    // (tight tall columns advecting toward the crest). One definition for
    // the live block and its ghost twin.
    float pullField(float behind, float clock, float ts) {
    #if defined(LOW_Q) || defined(TOUCH_Q)
      float pn = 0.5 + sin(v_uv.x * 30.0 * ts + sin(behind * 5.5 + clock * 1.4) * 2.2) * 0.30 +
        sin(v_uv.x * 9.3 * ts - (behind * 5.5 + clock * 1.4) * 3.1) * 0.22;
    #else
      float pn = noise(vec2(v_uv.x * 34.0, behind * 5.5 + clock * 1.4) * ts);
    #endif
      return (smoothstep(0.62, 0.82, pn) - smoothstep(0.82, 0.97, pn) * 0.5) *
        smoothstep(0.02, 0.07, behind) * exp(-max(behind - 0.07, 0.0) * 6.5);
    }

    // Foam coverage: saturating occlusion mass -> mix factor (exponential
    // shoulder — no clamp banding). Foam REPLACES the surface it covers
    // instead of glowing over it (Jules 2026-07-09: the rain rings sailed
    // untouched beneath additive foam — the layer read). Shared by the
    // live block and the wash ghost so the two cannot diverge (parity law).
    float foamCover(float m) { return 1.0 - exp(-m * 1.6); }

    // Hover shadow: the nav, wordmark and phone FLOAT above the ocean
    // (Jules 2026-07-06) — each prints one soft sun shadow on the surface,
    // offset with the light and bent by the ripples. Pure math, no noise.
    float hoverShadow(vec2 uv, vec4 rect, vec2 n, float aspect) {
      float hasRect = step(0.0005, rect.z * rect.w);
      vec2 center = vec2(rect.x + rect.z * 0.5, 1.0 - (rect.y + rect.w * 0.5));
      vec2 p = uv - center - vec2(-0.010, -0.026) + n * 0.016;
      p.x *= aspect;
      vec2 halfSize = vec2(rect.z * 0.5 * aspect, rect.w * 0.5);
      float r = min(min(halfSize.x, halfSize.y), 0.05);
      float d = roundedRectSdf(p, halfSize, r);
      return hasRect * (1.0 - smoothstep(-0.012, 0.06, d));
    }

    // Micro-facet driver for the sun-glitter pass (which replaced the old
    // brokenCaustic strand web — a FIXED light net UNDER the water: pool
    // floor, not sea surface; the new causticField below is additive,
    // motion-decohered filaments ON the surface, not that net). baseSlope is the
    // real surface gradient — sim ripples, the traveling swell, the hero
    // bands — so every spark rides water that actually moves. Two drifting
    // single-octave slope fields add the wind-blown micro texture that
    // makes a sea sparkle; their domain is compressed in y and sheared a
    // touch so facets come out as long, wind-streaked flecks rather than
    // round confetti. The fields slide against each other, so facets churn
    // and sparks live and die on the slopes instead of forming a fixed net.
    // Cost: 3 noise() calls (2 on LOW_Q) vs the old web's ~27 (~14 LOW_Q).
    // TOUCH_Q retune: slower fizz + wider/lower spark windows, gain-compensated so sparks live 3+ frames at 30 fps without raising total sparkle.
    #ifdef TOUCH_Q
      #define FIZZ_RATE 1.8
      #define SPARK_KNEE_FAR 0.994
      #define SPARK_KNEE_NEAR 0.972
      #define SPARK_TOP 0.9984
      #define SPARK2_LO 0.996
      #define SPARK2_HI 0.9988
      #define SPARK_GAIN 0.78
    #else
      #define FIZZ_RATE 4.0
      #define SPARK_KNEE_FAR 0.9972
      #define SPARK_KNEE_NEAR 0.982
      #define SPARK_TOP 0.9992
      #define SPARK2_LO 0.9986
      #define SPARK2_HI 0.9995
      #define SPARK_GAIN 1.0
    #endif
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
      sx += (noise(gp * vec2(46.0, 100.0) + vec2(71.3 - u_time * 0.08, u_time * FIZZ_RATE)) - 0.5) * 0.42;
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

    // Caustic field: sun through a moving surface -> broken bright filaments.
    // Ridge 1-abs(2n-1) keeps the zero in the valleys, so additive-safe (never
    // a dark line); warp keeps it organic (never a grid). Tiered 4/4/2 noise.
    // Returns the RAW unclamped filament field — no lobe envelope, no motion
    // decohere, no clamp: the call site owns those, so the same field can
    // also texture the foam bodies (one-living-ocean pass — the wash and the
    // resting light must read as one substance).
#ifndef CAUSTIC_OFF
    float causticRidge(float n, float s){ float r = 1.0 - abs(2.0 * n - 1.0); return pow(clamp(r, 0.0, 1.0), s); }
    float causticField(vec2 uvC, float t, float swell){
      // dens holds cell PIXEL size ~constant across widths (a fixed uv freq
      // balloons cells and washes the field out on wide desktops).
      float dens = clamp(u_resolution.y / 1250.0, 1.0, 2.2);
      vec2 flow = vec2(t * 0.010, t * 0.034) * dens;
      vec2 ridge = uvC * vec2(5.0, 2.3) * dens;
    #if defined(LOW_Q)
      vec2 warp = vec2(swell, swell * -0.7) * 1.4 * dens;
      vec2 p = ridge + warp + flow;
      float a = causticRidge(noise(p), 3.0);
      float b = causticRidge(noise(p * 2.05 + vec2(11.3, 3.1)), 4.2);
      return a * 1.05 + a * b * 0.55;
    #else
      // TOUCH_Q and full were byte-identical branches — deduped 2026-07-07
      // (the tier difference is scale math, not code).
      float w = noise(uvC * 2.3 - flow * 0.6);
      vec2 warp = (vec2(w, noise(uvC * 2.1 + 4.7 - flow)) - 0.5) * 0.9 * dens;
      vec2 p = ridge + warp + flow;
      float a = causticRidge(noise(p), 3.0);
      float b = causticRidge(noise(p * 2.05 + vec2(11.3, 3.1) - flow * 0.4), 4.2);
      return a * 1.05 + a * b * 0.55;
    #endif
    }
#endif

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
      // One-wave contract: JS owns anchoring + lifecycle; u_choreo.w selects
      // vocabulary (0 none, 1 band, 2 breaker, 3 breaker-riding).
      float waveVocab = u_choreo.w;
      float waveLife = max(u_wave.z, 0.0);

      float center = readHeight(v_uv);
    #ifdef SIM_DEBUG
      gl_FragColor = vec4(vec3(center * 0.5 + 0.5), 1.0);
      return;
    #endif
      float east = readHeight(v_uv + vec2(u_texel.x, 0.0));
      float west = readHeight(v_uv - vec2(u_texel.x, 0.0));
      float north = readHeight(v_uv + vec2(0.0, u_texel.y));
      float south = readHeight(v_uv - vec2(0.0, u_texel.y));

      // Crest line + energy arrive fully shaped from JS (doc/phone anchored —
      // a fling can never drag the wave; it reaches the beach, no open-water fade).
      float broadWaveY = u_wave.x;
      float waveEnergyR = clamp(u_wave.y, 0.0, 1.0);
      // The phone floats ABOVE the ocean (Jules 2026-07-06) — the water no
      // longer reacts to it; it only receives the hover shadow below. All
      // hull/push/bow interaction vocabulary removed.
      // span < 1: the crest + foam geometry shrink — loop/spent waves are
      // scaled twins of the full breaker.
      float waveSpanR = clamp(u_wave.w, 0.30, 1.0);

      // Clean resting sea (2026-07-04 Jules): the ambient swell trains,
      // the hero band field, and their tone-deepening printed persistent
      // dark crest lines that read as glassy unbroken waves alongside the
      // whitewash breaker ("the next wave would also have white water").
      // Removed — the fired white-water wave is the only wave; also drops
      // an oceanNoise eval on hero/footer fragments. laneNoise stays: the
      // wind lanes gate the glitter, and the shore reads swellBend.
      vec2 waterUv = vec2((v_uv.x - 0.5) * aspect + 0.5, v_uv.y);
      float laneNoise = noise(vec2(waterUv.x * 1.7, waterUv.y * 4.0) * texScale + vec2(u_time * 0.008, u_time * 0.04));
      float swellBend = laneNoise - 0.5;
      float windLane = smoothstep(0.22, 0.86, laneNoise);

      // Height gradients become normals for the water surface. A tiny
      // procedural wavelet layer is added here so untouched water stays
      // alive without constantly injecting energy into the simulation.
      float slow = u_time * 0.052;
      // Both micro-wavelet phases advance so the pattern drifts DOWN the
      // screen with the swell (the microY term used to run upstream).
      float microX = sin((v_uv.x * 11.0 + v_uv.y * 3.0) + slow) * 0.009;
      float microY = cos((v_uv.y * 14.0 - v_uv.x * 2.4) + slow * 0.86) * 0.009;
      // The wave IS the water (Jules 2026-07-06: it read as a layer rolling
      // over the scene). An analytic swell hump rides the crest line; its
      // SLOPE folds into the same normal every light path uses — so the
      // shading heaves, the caustics bend through the crest, and the glitter
      // gathers on the face as the wave passes. Pure math, zero new noise.
      float broadNoiseR = sin(v_uv.x * 3.2 + waveLife * 0.5) * 0.055 +
        sin(v_uv.x * 7.9 - waveLife * 0.8) * 0.020 +
        (v_uv.x - 0.5) * 0.045;
      float waveOffsetR = (v_uv.y - broadWaveY + broadNoiseR) * 7.5 / waveSpanR;
      float broadWaveR = exp(-waveOffsetR * waveOffsetR);
      // d/dy of the hump: positive slope on the face, negative behind.
      float waveSlope = 2.0 * waveOffsetR * broadWaveR * waveEnergyR * 0.052;
      vec3 normal = normalize(vec3(
        -((east - west) * aspect * 4.8 + microX),
        -((north - south) * 4.8 + microY + waveSlope),
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
      // Rings PUSH the foam: sim ripples crossing the wash warp the foam
      // mat's noise domain, so a passing ring visibly wiggles the marble/
      // lace edges — bidirectional coupling, one substance. Rational
      // saturation (glintFacet precedent): the sim texture is NEAREST-
      // filtered and an unbounded multiplier prints the texel grid. At
      // rest simGrad is ~0, so the foam is untouched. Shared by the live
      // block and the ghost twins (identical per-pixel at death — parity).
      vec2 ringWarp = simGrad * (0.35 / (1.0 + dot(simGrad, simGrad)));
      // APPLIED BELOW, after the aeration envelope exists: churned water
      // scatters, so ring/ripple relief dims inside the churn. Partial
      // damp only — the wake-settle heave lives in this same envelope and
      // must stay visible; the damp decays with the ghost, so relief
      // returns as the foam dissolves. Safe move: the water multiplies
      // commute (this one, depth, hover).
      // Depth cue: troughs sit LOW and hold shadow regardless of slope
      // direction — height below the rest plane darkens.
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
      water *= 1.0 - clamp(-center, 0.0, 1.0) * mix(TROUGH_GAIN, 0.18, u_pageCalm);
      // Floating-object shadows: nav + wordmark + phone hover above the
      // water; their shadows sit ON it — part of the scene, not chrome.
      float hover = hoverShadow(v_uv, u_shadowNav, normal.xy, aspect) * 0.13 +
        hoverShadow(v_uv, u_shadowMark, normal.xy, aspect) * 0.10 +
        hoverShadow(v_uv, u_phone, normal.xy, aspect) * 0.15;
      water *= 1.0 - min(hover, 0.20);

      float crest = smoothstep(0.012, 0.105, abs(center));
      // Gentle domain warp only. The glitter's light-bending now happens
      // physically (sim slope inside glintFacet), so this inherited warp
      // is just texture drift — at the old 0.050 strength the normal flip
      // across the traveling wave's trailing ripples FOLDED the sampled
      // fields, which read as thin dark crease lines along the swell.
      vec2 refractedUv = waterUv + normal.xy * vec2(0.026, 0.018) + center * vec2(0.032, 0.020);
      float foamLift = smoothstep(0.070, 0.180, abs(center)) * moodFloat(0.07, 0.035, 0.052, 0.062);
      // Crest highlight only on the leading face of the swell — the side
      // facing the direction of travel — and a soft trough shadow behind
      // it. The light/dark asymmetry is what makes the band read as a
      // moving wave with mass instead of a flat pool reflection.
      // (Computed before the glitter block so the sparkle can gather on
      // the lit face of the traveling wave.)
      // Wave deflection around the hull (device pass 2026-07-05: the breaker
      // crossed BEHIND the phone as one straight band — read as occlusion, not
      // displacement). As the wave sweeps over the phone it PILES against it
      // and parts around the sides: raise the crest over the phone's x-span,
      // tapering past its width, so the visible flanks angle up toward the
      // hull and the wave reads as wrapping the object. contact-gated, so it
      // only bends during the pass-over and is flat at rest. Every crest-
      // derived term below (highlight, lip, wash) inherits the bend coherently.
      // Pile-up peaks AT the phone's side edges (water stacking against the
      // hull) and decays outward across the VISIBLE flank, so the crest rises
      // toward the silhouette from either side regardless of the swell's own
      // tilt. (A center-weighted lift hid under the phone and left the flanks
      // following the raw swell — read as occlusion at some ride positions.)
      float waveAhead = smoothstep(0.0, 0.06, broadWaveY - v_uv.y + broadNoiseR);
      float waveBehind = smoothstep(0.0, 0.10, v_uv.y - broadWaveY + broadNoiseR);
      float crestHighlight = broadWaveR * waveAhead * waveEnergyR;
      float troughShadow = broadWaveR * waveBehind * waveEnergyR;
      // Modest flat lift — the crest's brightness now comes mostly from
      // the sparkle that gathers on its face (glitter's crest boost) and
      // the whitewash, matching how the rest of the ocean carries light,
      // instead of a smooth painted band.
      float bigWaveLift = crestHighlight * 0.058;

      // Aeration — churned, foam-filled water: the live wave's trail plus
      // the wash ghost's, as ONE analytic envelope (zero noise; hoisted
      // 2026-07-07 from the caustic block). Both terms are equal at the
      // death frame by construction, so anything gated on it is continuous
      // when a wave dies. This is the whole light story's shared driver:
      // churned water scatters the sun, so caustic focusing, mirror sheen
      // and glitter all yield to it together (one ocean, one light).
      float liveTrail = max(v_uv.y - broadWaveY + broadNoiseR, 0.0);
      // Ahead-side falloff: churn belongs to the crest and its dark apron,
      // not the whole sea below it — before this, aeration saturated every
      // fragment ahead of the crest, so each spawn erased the caustic light
      // across the full frame in one beat (part of the birth pop). The 4.2
      // reach matches the drama apron's, so light yields where water darkens.
      float aeraLive = step(1.5, waveVocab) * waveEnergyR *
        smoothstep(0.15, 1.1, waveLife) * exp(-liveTrail * 1.9) *
        exp(-max(broadWaveY - v_uv.y - broadNoiseR, 0.0) * 4.2);
      float gLife = u_wash.w + u_wash.y;
      float gLine = sin(v_uv.x * 3.2 + gLife * 0.5) * 0.055 +
        sin(v_uv.x * 7.9 - gLife * 0.8) * 0.020 +
        (v_uv.x - 0.5) * 0.045;
      // Two-stage decay: the bright wash dies on roughly the old clock, but
      // a faint lace residue holds for many seconds — "the front never fully
      // recovers": the next set always arrives over it. The arriving wave
      // then consumes it (drain keyed on the LIVE wave's life: 1.0 at its
      // spawn frame, so the handoff is continuous, and the residue is spent
      // long before the next death can overwrite the single wash slot).
      // u_wash.z itself stays the death energy — the TOUCH ghost-LOD pin
      // (constant texture family per fade) is untouched.
      // GHOST_* macros are ALWAYS injected by initGl (shipped tuning by
      // default; ?lifecycle=residue swaps the set). Head + tail weights sum
      // to 1.0 in every set, so ghostE is 1.0 at age 0 — death-frame parity.
      float ghostE = u_wash.z * (GHOST_HEADW * exp(-u_wash.y * 0.62) +
        GHOST_TAILW * exp(-u_wash.y * GHOST_TAIL)) *
        mix(1.0, exp(-waveLife * GHOST_DRAIN), step(1.5, waveVocab));
      float aeraGhost = ghostE * smoothstep(0.15, 1.1, u_wash.w) *
        exp(-max(v_uv.y - u_wash.x + gLine, 0.0) * 1.9) *
        exp(-max(u_wash.x - v_uv.y - gLine, 0.0) * 4.2);
      float aeration = min(max(aeraLive, aeraGhost), 1.0);
      // Relief joins the shared churn driver (see its computation above).
      // RELIEF_GAIN (tier base, declared at the trough cue) eases toward
      // the 0.40 calm floor under copy; the aeration damp is orthogonal.
      water *= 1.0 + relief * mix(RELIEF_GAIN, 0.40, u_pageCalm) * (1.0 - aeration * 0.55);

      // Portrait density: the shared texScale leaves only ~3.7 ridge
      // columns across a 390pt screen (the lace web collapsed into one
      // beam — parity review). narrow restores ~6+ columns on phones;
      // desktop (narrow = 0) is untouched.
      float narrow = 1.0 - smoothstep(0.75, 1.05, aspect);
    #ifndef CAUSTIC_OFF
      // The raw filament field for the additive caustic composite below
      // (lobe envelope + decohere + gates applied there). The churned zone
      // drags the domain down-screen (aeration term): the wave carries the
      // light with it, continuously through death. NOTE: the field no
      // longer feeds the foam bodies — fresh churn is matte (Jules device
      // note 2026-07-07: "no caustics behind the wave, they streak out
      // AFTER"). Caustics only return in the aftermath, via the additive
      // layer's aeration erase opening + the ghost-lace seed.
      vec2 causticUv = (refractedUv + vec2(0.0, aeration * 0.016)) *
        (texScale * (1.0 + narrow * 0.45));
      float filRaw = causticField(causticUv, u_time, swellBend);
    #endif

      // Wash-ghost lace fields — computed ONCE for both the ghost paint
      // (after the foam block) and the caustic's aftermath seed: the light
      // that returns as the foam dissolves grows along the SAME lace
      // skeleton it replaces (one-living-ocean pass — the mixing zone is
      // where the two families used to cross-fade with no shared DNA).
      // Neutral defaults keep every consumer inert when no ghost lives;
      // noise cost unchanged (fields moved here from the paint block).
      float gBreak = 0.0;
      float gDecay = 0.0;
      float gGrow = 0.0;
      float gMat = 0.5;
      float gTh = 0.62;
      float gBody = 0.0;
      float gFringe = 0.0;
      float gDevelop = 1.0;
      float gSpent = 1.0;
      float gShallows = 1.0;
      float gBehind = 0.0;
      if (ghostE > 0.012) {
        gBreak = smoothstep(0.15, 1.1, u_wash.w) * smoothstep(0.0, 0.26, u_wash.z);
        // Lifecycle-band twins (u_wash.x continues the dead crest's travel,
        // so these equal the live wave's develop/spent/shallows at the death
        // frame by construction — every band-scaled wash term stays
        // pixel-identical across the handoff).
        vec3 glb = lifeBands(u_wash.x);
        gDevelop = glb.x;
        gSpent = glb.y;
        gShallows = glb.z;
      #if defined(LOW_Q) || defined(TOUCH_Q)
        float gFinger = 0.5 + sin(v_uv.x * 6.1 * texScale + gLife * 0.675) * 0.11 +
          sin(v_uv.x * 2.3 * texScale - gLife * 0.475) * 0.09;
      #ifdef TOUCH_Q
        // LOD pinned to the DEATH energy (constant per ghost) — never
        // swaps texture family mid-fade.
        float gPatch;
        if (u_wash.z > 0.22) {
          gPatch = noise(vec2(v_uv.x * 3.1, v_uv.y * 2.5) * texScale + vec2(0.0, gLife * 0.3 + u_time * 0.05));
        } else {
          gPatch = 0.5 + sin((v_uv.x * 3.4 + v_uv.y * 2.2) * texScale + u_time * 0.05) * 0.22;
        }
      #else
        float gPatch = 0.5 + sin((v_uv.x * 3.4 + v_uv.y * 2.2) * texScale + u_time * 0.05) * 0.22;
      #endif
      #else
        float gFinger = oceanNoise(vec2(v_uv.x * 5.3 * texScale + 7.1, gLife * 0.4 + u_time * 0.11));
        float gPatch = oceanNoise(vec2(v_uv.x * 3.1, v_uv.y * 2.5) * texScale + vec2(0.0, gLife * 0.3 + u_time * 0.05));
      #endif
        // Same displaced trail distance as the live wash (span was 1).
        float gFace = (u_wash.x - v_uv.y - gLine) +
          (gFinger - 0.5) * 0.07 + (gPatch - 0.5) * 0.09;
        gBehind = -gFace;
        float gReach = mix(2.2, 1.7, clamp(gLife * 0.25, 0.0, 1.0)) * (0.75 + gPatch * 0.5);
        gDecay = exp(-max(gBehind, 0.0) * gReach) * step(0.0, gBehind);
      #if defined(LOW_Q) || defined(TOUCH_Q)
        vec2 gMatP = vec2(v_uv.x * 6.5 + v_uv.y * 3.1, v_uv.y * 4.0) * texScale +
          vec2(0.0, gLife * 0.5 + u_time * 0.18) + ringWarp;
        gMatP += vec2(sin(gMatP.y * 2.3), sin(gMatP.x * 1.7)) * 0.55;
        gMat = noise(gMatP) * 0.66 + gPatch * 0.34;
      #else
        // Always the rich marble path (no energy LOD): one texture family
        // for the ghost's whole fade — the LOD swap would read as a pop.
        vec2 gWarp = vec2(gPatch - 0.5, (gFinger - 0.5) * 0.5) * 2.2;
        float gMatN = oceanNoise(vec2(v_uv.x * 10.5, v_uv.y * 4.0) * texScale + vec2(0.0, gLife * 0.5 + u_time * 0.18) + gWarp + ringWarp);
        gMat = gMatN * 0.66 + gPatch * 0.34;
      #endif
        float gDissolve = smoothstep(0.0, 0.46, gBehind) * (0.6 + clamp(gLife * 0.25, 0.0, 1.0) * 0.4);
        // Age erodes the lace threshold: the foam islands break apart and
        // shrink as they dissolve, instead of a flat fade.
        // Age erodes the lace threshold — the dominant clock on how long
        // the residue stays legible (the energy envelope only dims what
        // erosion hasn't already emptied). ?lifecycle=residue slows it.
        gTh = 0.30 + gDissolve * 0.32 + u_wash.y * GHOST_ERODE + gSpent * 0.09;
      #ifdef TOUCH_Q
        gBody = smoothstep(gTh, gTh + 0.10, gMat);
      #else
        gBody = smoothstep(gTh, gTh + 0.17, gMat);
      #endif
        gFringe = smoothstep(gTh - 0.11, gTh - 0.02, gMat) -
          smoothstep(gTh - 0.02, gTh + 0.09, gMat);
        gGrow = 0.60 + clamp(gLife * 0.25, 0.0, 1.0) * 0.55;
      }

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
      // Sparse glitter (2026-07-04 Jules: "the smaller reflections are too
      // many") — knee tightened and lift cut ~60% so only occasional
      // glints ride the surface; the whitewash wave carries the show.
      float knee = mix(SPARK_KNEE_FAR, SPARK_KNEE_NEAR, sunPath * sunPath);
      // Wide top edge on purpose: most sparks sit PARTIALLY lit, so they
      // read as translucent glints on the surface rather than opaque
      // confetti — the water's own colour carries through them.
      float spark = smoothstep(knee, SPARK_TOP, facetDot);
      // Glitter pulled back ~35% (2026-07-05): the caustic filament field now
      // carries the resting sea's light, so the sun-glitter reverts to sparse
      // specular accent riding on top rather than the whole texture.
      float glitterLift = SPARK_GAIN * spark * (0.08 + sunPath * 0.58) * laneMix *
        (1.0 + crestHighlight * 1.15) *
        moodFloat(0.10, 0.014, 0.032, 0.12);
      // Second tier: rare near-perfect mirrors flash brightest inside the
      // pool — the scattered stars that keep a quiet dazzle.
      glitterLift += SPARK_GAIN * smoothstep(SPARK2_LO, SPARK2_HI, facetDot) * sunPath * laneMix *
        moodFloat(0.045, 0.005, 0.013, 0.058);
      // Churned water has no mirrors (one-living-ocean): sparks thin under
      // the foam trail — the fresh whitewash is matte, not a specular field.
      glitterLift *= 1.0 - aeration * 0.45;
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
        moodFloat(0.032, 0.018, 0.023, 0.034);
      // The soft sun-on-the-sea luster is a smooth-surface effect — churn
      // scatters it hardest of all (one light story with the caustic gate).
      sheenLift *= 1.0 - aeration * 0.75;

      // A small warm glint keeps the brand sunrise present without turning
      // the surrounding water into a moving sunset wash.
      float warmGlint = pow(smoothstep(0.78, 1.0, light), 6.6) * verticalLift * moodFloat(0.010, 0.002, 0.004, 0.008);
      warmGlint *= 1.0 - aeration * 0.5;

      // Residual foam strands removed (2026-07-04 Jules): the dashes read
      // as extra mini white-water lines competing with the real breaker.
      vec3 color = water;
      color += moodCaustic * sheenLift;
      // Sparks stay mostly the water's own caustic teal with only a lean
      // toward the breaker foam's near-white — translucent lit water, not
      // white paint. (Was 0.72 white; pulled back for subtlety.)
      color += mix(moodCaustic, vec3(0.93, 0.98, 0.97), 0.52) * glitterLift;
      color += moodElectric * crest * (1.0 - aeration * 0.7) * moodFloat(0.052, 0.026, 0.038, 0.047);
      color += moodCaustic * foamLift;
      color += moodCaustic * bigWaveLift;
      // Trough shadow gives the wave depth — subtle subtractive band on
      // the back side of the crest so the swell looks like it has mass.
      color *= mix(1.0, 0.86, troughShadow * 0.22);

      // Caustic field (additive): motion decoheres it, foam erases it, wind
      // lanes/sun/horizon shape it, refractedUv lets ripples bend it. The
      // aeration envelope above is the wave-coupling driver: suppression
      // lives where the churned water actually is and fades with the ghost.
    #ifndef CAUSTIC_OFF
      {
        float slopeMag = length(vec2((east - west) * aspect, north - south) * 4.8);
        // Decohere leans on SLOPE with a soft knee on raw displacement: a
        // ring front (steep, transient) still shatters the filaments, but
        // the slow-relaxing bowl a tap leaves behind no longer parks a
        // filament-free hole for ~13 s (2026-07-07 poke measurement).
        float dish = abs(center);
        float motion = clamp(dish * dish * 5.0 + slopeMag * 1.5 +
          broadWaveR * waveEnergyR * 2.6 + aeration * 1.4, 0.0, 1.0);
        // Shared texture DNA (one-living-ocean): the lobe envelope IS the
        // wash's patch field — same domain, same drift, and phase-matched
        // at wave spawn (patchNoise = this + waveLife*0.3), so an arriving
        // set's foam lobes grow out of the lobes the light already occupied
        // and the resting web is organized at the same scale the whitewash
        // dissolves at. (Replaces the unrelated causticUv*1.1 breathe.)
      #ifdef LOW_Q
        // LOW_Q wash-patch trig stand-in, widened to envelope duty.
        float lobeN = 0.5 + sin((v_uv.x * 3.4 + v_uv.y * 2.2) * texScale + u_time * 0.05) * 0.22;
        float lobe = clamp(0.5 + (lobeN - 0.5) * 2.2, 0.08, 1.0);
      #else
        float lobe = 0.45 + 0.55 * noise(vec2(v_uv.x * 3.1, v_uv.y * 2.5) * texScale + vec2(0.0, u_time * 0.05));
      #endif
        // Aftermath seed: while a ghost dissolves, the returning lobes are
        // drawn onto its lace skeleton — the foam hands its shape back to
        // the light (the wash dissolves INTO light instead of two families
        // cross-fading). seedW rides the ghost's own aeration trail, so it
        // is zero under the death frame's full erase and zero again once
        // the ghost is gone — continuous at both ends by construction.
        float laceSkel = smoothstep(gTh - 0.08, gTh + 0.12, gMat);
        lobe = mix(lobe, 0.45 + 0.55 * laceSkel, clamp(aeraGhost * 2.2, 0.0, 1.0) * gBreak);
        // One visibility ENVELOPE: lobes x wind streets x sun path x
        // horizon x churn erase. The coherence floor below acts on the
        // whole neighborhood, so a worm cluster can never strand alone
        // over dark water (Jules's circled stickers): regions below the
        // knee die TOGETHER, connected regions keep their full lace.
        // Aeration erase is now a SATURATING knee, not linear: any pixel
        // with real churn (aeration > ~0.30) loses its caustics entirely,
        // so NO filaments glow through the live wash behind the wave
        // (Jules device note: caustics streak out AFTER, never through the
        // foam). They return only where aeration falls under the knee —
        // the dissolving edge and the calming aftermath.
        float erase = 1.0 - clamp(broadWaveR * waveEnergyR * 3.6 + smoothstep(0.04, 0.30, aeration), 0.0, 1.0);
        float env = lobe *
          mix(0.45 + 0.55 * windLane, 0.68 + 0.32 * windLane, narrow) *
          (0.55 + 0.45 * sunPath) * (0.55 + 0.45 * verticalLift) * erase;
        env *= smoothstep(0.10, 0.32, env);
        float caustic = clamp(filRaw * (1.0 - motion) * env, 0.0, 1.0);
        // The floating UI occludes the sun: its shadow kills the sun's own
        // filaments harder than the ambient-lit water it darkens (review:
        // full-strength filaments inside the phone/nav shadows).
        caustic *= 1.0 - min(hover, 0.20) * 2.2;
        // Filaments belong to open water: fade across the beach band toward
        // the sand side of the waterline (the shore block is additive-only
        // and runs later, so the band is recomputed analytically here).
        float bandTC = ((1.0 - u_shore.x) - v_uv.y) / max(u_shore.y, 0.001);
        caustic *= 1.0 - u_shore.z * smoothstep(0.10, 0.42, bandTC) * 0.75;
        // White lean matches the foam family's (0.93,0.98,0.97) — the
        // filaments and the whitewash are lit by the same sun.
      #ifndef CAUSTIC_ADD_OFF
        // QA isolation (?causticadd=off): skip ONLY the additive filament
        // layer — a diff against the full frame is the pure caustic layer.
        color += mix(moodCaustic, vec3(0.93, 0.98, 0.97), 0.30) * caustic * moodFloat(0.27, 0.034, 0.11, 0.42);
      #endif
      }
    #endif

      // Breaking crest + churning whitewash REGION (Ocean refs 01/08/15:
      // clumpy cauliflower crest, wide marbled wash dissolving into lace,
      // near-black water around the foam). Coherent uniform branch — zero
      // cost between waves. Four oceanNoise fields (two plain on LOW_Q).
      // Foam BRIGHTNESS scales with waveEnergyR (dead at the sandbank);
      // wash REACH grows with wave life — the wave dies into its own
      // spreading foam field.
      // The extra waveEnergyR gate skips the whole block once the ride is
      // spent (< 1.5% foam brightness): the last stretch of travel used to
      // pay the block's full price for invisible output.
      if (waveVocab > 1.5 && waveEnergyR > 0.015 && broadWaveY > -0.35 && broadWaveY < 1.6) {
        // Break early — on phones the crest spends mid-ride hidden behind
        // the device. Ramps back DOWN as energy dies (it used to ramp in
        // and never out, so a landed/spent wave painted a hard crest right
        // up to the death threshold — one of the two non-ghost cuts). The
        // energy ramp-out is mirrored in gBreak via u_wash.z.
        float breakAmount = smoothstep(0.15, 1.1, waveLife) *
          smoothstep(0.0, 0.26, waveEnergyR);
        // Lifecycle position of the ONE crest (Jules 2026-07-07 annotated
        // frames): the crest CHANGES CHARACTER as it travels — unbroken dark
        // swell up top, full break mid-screen, spent thinning foam over
        // darker water low, flat milky sheets into the shallows. Same fields
        // everywhere; only widths, mixes and weights move, so the phases
        // stay one substance.
        vec3 lb = lifeBands(broadWaveY);
        float develop = lb.x;
        float spent = lb.y;
        float shallows = lb.z;
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
        float fingerNoise = 0.5 + sin(v_uv.x * 6.1 * texScale + waveLife * 0.675) * 0.11 +
          sin(v_uv.x * 2.3 * texScale - waveLife * 0.475) * 0.09;
      #ifdef TOUCH_Q
        // Energy LOD: one noise() groups bright foam; trig returns when spent.
        float patchNoise;
        if (waveEnergyR > 0.22) {
          patchNoise = noise(vec2(v_uv.x * 3.1, v_uv.y * 2.5) * texScale + vec2(0.0, waveLife * 0.3 + u_time * 0.05));
        } else {
          patchNoise = 0.5 + sin((v_uv.x * 3.4 + v_uv.y * 2.2) * texScale + u_time * 0.05) * 0.22;
        }
      #else
        float patchNoise = 0.5 + sin((v_uv.x * 3.4 + v_uv.y * 2.2) * texScale + u_time * 0.05) * 0.22;
      #endif
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
          fingerNoise = oceanNoise(vec2(v_uv.x * 5.3 * texScale + 7.1, waveLife * 0.4 + u_time * 0.11));
          patchNoise = oceanNoise(vec2(v_uv.x * 3.1, v_uv.y * 2.5) * texScale + vec2(0.0, waveLife * 0.3 + u_time * 0.05));
        } else {
          fingerNoise = 0.5 + sin(v_uv.x * 6.1 * texScale + waveLife * 0.675) * 0.18 +
            sin(v_uv.x * 2.3 * texScale - waveLife * 0.475) * 0.14;
          patchNoise = 0.5 + sin((v_uv.x * 3.4 + v_uv.y * 2.2) * texScale + u_time * 0.05) * 0.22;
        }
      #endif
        // Signed distance down the face from the crest line, displaced at
        // TWO scales (fingers + broad lobes) so no foam boundary crosses
        // the frame as one coherent line — the single-scale ±0.03 wobble
        // still read as parallel LAYERS. patchNoise varies in y too, so a
        // column can cross foam-dark-foam: boundaries interpenetrate like
        // the refs instead of stacking.
        float faceDist = (broadWaveY - v_uv.y - broadNoiseR) / waveSpanR +
          (fingerNoise - 0.5) * 0.07 + (patchNoise - 0.5) * 0.09;
        float behindDist = -faceDist;
        // Lip hugs the true crest (own distance, micro wander); faceDist's
        // chunk-break throw is for the wash, not the spilling edge. Band is
        // wide enough that the crest's own ±0.075 wobble overlaps into one
        // continuous band instead of a thin snaking line (read as scattered
        // on dark moods where ambient water can't bridge the clumps).
        float lipDist = (broadWaveY - v_uv.y - broadNoiseR) / waveSpanR + (fingerNoise - 0.5) * 0.016;
        // Approaching swell: wider + patchier (scattered pre-break segments);
        // spent: the line thins hard; shallows: it relaxes into a soft sheet.
        float lipW = 0.043 * (1.0 + (1.0 - develop) * 0.42 - spent * 0.36 + shallows * 0.30);
        float lipBand = exp(-pow((lipDist - 0.015) / lipW, 2.0));
        // LOW_Q: single-octave noise() — rides are exactly where the
        // low-power tier must shed work.
      #ifdef LOW_Q
        float cascadeNoise = noise(vec2(v_uv.x * 20.0, faceDist * 12.0) * texScale + vec2(0.0, -u_time * 1.2));
        float cascade = smoothstep(0.34, 0.62, cascadeNoise);
      #elif defined(TOUCH_Q)
        // 30fps churn: slower advection + tighter span vs the 2x upscale.
        // x*20 -> x*9 (device review 2026-07-06): the fine columns
        // thresholded into vertical bars at 1.5x — wider clumps read as
        // foam along the crest, not spikes.
        float cascadeNoise = oceanNoise(vec2(v_uv.x * 9.0, faceDist * 14.0) * texScale + vec2(0.0, -u_time * 0.72));
        float cascade = smoothstep(0.40, 0.58, cascadeNoise);
      #else
        float cascadeNoise = oceanNoise(vec2(v_uv.x * 20.0, faceDist * 12.0) * texScale + vec2(0.0, -u_time * 1.2));
        float cascade = smoothstep(0.34, 0.62, cascadeNoise);
      #endif
        // High base + tame clump swing = the ribbon holds its own brightness
        // over dark water; cascade rides ON it, doesn't gate it out (dim
        // moods showed only the clump peaks with the base lost to the water).
        // Pre-break (develop < 1) the base drops and cascade takes over, so
        // the young crest reads as scattered foam patches, not a solid line.
        float lipBase = mix(0.26, 0.80, develop);
        float lipFoam = lipBand * (lipBase + cascade * (1.0 - lipBase)) *
          breakAmount * (1.0 - spent * 0.22);
        // Cauliflower cores — the patch-noise gate groups them into
        // MASSES along the crest instead of even speckle. They belong to the
        // main break: absent from the approaching swell, draining as it spends.
        float coreBand = exp(-pow((faceDist - 0.010) / 0.038, 2.0));
        float cores = coreBand * smoothstep(0.60, 0.82, cascadeNoise) *
          smoothstep(0.30, 0.72, patchNoise) * breakAmount *
          develop * (1.0 - spent * 0.55);
        // Trailing whitewash — a REGION: churn trails ~0.35 uv behind the
        // crest and the reach grows through the ride. The decay rate is
        // patch-modulated so the trail's fade-out edge wanders instead of
        // ending on a readable horizontal line.
        // Riding: the wash is a tight collar behind the crest, not a trail —
        // a pinned crest's long trail sat on screen as a permanent broken
        // glow layer (device review 2026-07-06).
        float washReach = mix(2.2, 1.7, clamp(waveLife * 0.25, 0.0, 1.0)) * (0.75 + patchNoise * 0.5);
        float matDecay = exp(-max(behindDist, 0.0) * washReach) * step(0.0, behindDist);
      #if defined(LOW_Q) || defined(TOUCH_Q)
        // Sheared + sin-warped domain: plain lattice noise under the hard
        // lace thresholds printed axis-aligned curd SQUARES on phones
        // (device pass 2026-07-05). Same clump scale, organic edges; the
        // patch remix mirrors the marbled tier's two-scale read.
        vec2 matP = vec2(v_uv.x * 6.5 + v_uv.y * 3.1, v_uv.y * 4.0) * texScale +
          vec2(0.0, waveLife * 0.5 + u_time * 0.18) + ringWarp;
        matP += vec2(sin(matP.y * 2.3), sin(matP.x * 1.7)) * 0.55;
        float matField = noise(matP) * 0.66 + patchNoise * 0.34;
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
          float matNoise = oceanNoise(vec2(v_uv.x * 10.5, v_uv.y * 4.0) * texScale + vec2(0.0, waveLife * 0.5 + u_time * 0.18) + marbleWarp + ringWarp);
          matField = matNoise * 0.66 + patchNoise * 0.34;
        } else {
          // Spent-foam tail (late-ride LOD): one sample, sheared + sin-warped
          // like the phone tier so the tail never snaps to the lattice grid.
          vec2 matP = vec2(v_uv.x * 10.5 + v_uv.y * 3.1, v_uv.y * 4.0) * texScale +
            vec2(0.0, waveLife * 0.5 + u_time * 0.18) + ringWarp;
          matP += vec2(sin(matP.y * 2.3), sin(matP.x * 1.7)) * 0.55;
          matField = noise(matP) * 0.66 + patchNoise * 0.34;
        }
      #endif
        // Dissolving bubble-lace — erosion threshold RISES behind the
        // crest; the band-pass fringe under it is the bright cell-edge
        // lace at the island boundaries.
        float dissolve = smoothstep(0.0, 0.46, behindDist) * (0.6 + clamp(waveLife * 0.25, 0.0, 1.0) * 0.4);
        // A spent wave's foam is more broken: erosion up, dark water through.
        float laceTh = 0.30 + dissolve * 0.32 + spent * 0.09;
      #ifdef TOUCH_Q
        // Tighter body edge: contrast floor against the bilinear upscale.
        float matBody = smoothstep(laceTh, laceTh + 0.10, matField);
      #else
        float matBody = smoothstep(laceTh, laceTh + 0.17, matField);
      #endif
        float laceFringe = smoothstep(laceTh - 0.11, laceTh - 0.02, matField) -
          smoothstep(laceTh - 0.02, laceTh + 0.09, matField);
        float washGrow = 0.60 + clamp(waveLife * 0.25, 0.0, 1.0) * 0.55;
        // The approaching swell trails little churn — the wash belongs to
        // the break (mirrored in the ghost via gDevelop).
        float washMat = (matBody * 0.72 + laceFringe * 0.50) * matDecay * washGrow *
          breakAmount * (0.25 + 0.75 * develop);
        // Pitching shadow under the tumbling clumps — cascade-modulated so
        // it shadows the foam chunks, not a uniform bar across the frame.
        float lipShadow = exp(-pow((faceDist - 0.075) / 0.034, 2.0)) *
          (0.35 + cascade * 0.65) * breakAmount;
        // Foam tongues thrown ahead of the lip — streaks of cascade churn
        // reaching into the dark apron, so foam and dark interpenetrate.
        // RED broken segments (Jules's annotated frames): the tongues are
        // patch-gated into DISCRETE clumps thrown further ahead (reach 5.5
        // -> 4.2), and a slow-clock floor of faint broken patches rides the
        // apron underneath — smaller broken wave segments and gentle foam
        // dissipating ahead of the front, not one continuous fringe.
        float segGate = 0.30 + 0.70 * smoothstep(0.40, 0.62, patchNoise);
        float faceStreaks = smoothstep(0.58, 0.82, cascadeNoise) * segGate *
          exp(-max(faceDist, 0.0) * 4.2) * step(0.0, faceDist) * breakAmount;
        float aheadFloor = smoothstep(0.55, 0.78, patchNoise) *
          exp(-max(faceDist, 0.0) * 2.8) * step(0.0, faceDist) *
          develop * (1.0 - shallows * 0.6) * breakAmount;
        // YELLOW backwash (net-new): as the wave spends, the water AHEAD of
        // the thinning front is drawn BACK toward it — thin low-brightness
        // foam streaks sliding seaward over the dark apron. The advection
        // clock (+waveLife) runs the domain toward the crest at ~0.19 uv/s,
        // so the front visibly overtakes water that is draining back to
        // meet it — every other wash term advects the opposite way. Ahead
        // region: no ghost mirror needed (off-screen at organic deaths,
        // same precedent as faceStreaks/aheadZone).
      #if defined(LOW_Q) || defined(TOUCH_Q)
        float bwNoise = 0.5 + sin((v_uv.x * 14.0 + faceDist * 9.0) * texScale + waveLife * 1.15) * 0.28 +
          sin((v_uv.x * 5.2 - faceDist * 5.0) * texScale + waveLife * 0.72) * 0.22;
      #else
        float bwNoise = oceanNoise(vec2(v_uv.x * 16.0, faceDist * 7.0 + waveLife * 1.3) * texScale);
      #endif
        float bwZone = smoothstep(0.03, 0.12, faceDist) * exp(-max(faceDist - 0.12, 0.0) * 5.0);
        float backwash = smoothstep(0.58, 0.80, bwNoise) * bwZone *
          spent * (1.0 - shallows * 0.55) * breakAmount;
        // BLUE pull streaks (net-new): water sucked up into the break —
        // strongest at the main break, draining as the wave spends. Shared
        // pullField (also the ghost twin's — this region is on-screen at a
        // bottom-exit death, so it must survive the handoff).
        float pullStreaks = pullField(behindDist, waveLife, texScale) *
          develop * (1.0 - spent * 0.5) * breakAmount;

        // Foam THICKNESS + volume (device pass 2026-07-05: the whitewater read
        // flat, like a sim). A broad aerated BODY below the bright lip gives it
        // vertical mass; a thin sunlit GLINT on the crest top plus a deeper
        // cast shadow beneath read the lip as a rounded 3D breaker instead of a
        // painted ribbon. Both reuse lipDist + cascade — zero new noise.
        // Body widens + flattens into the shallows (the crash spreading out
        // as milky sheets); thin before the break, draining as it spends.
        float foamBody = exp(-pow((lipDist - 0.046) / (0.058 + shallows * 0.075), 2.0)) *
          (0.45 + cascade * 0.55) * breakAmount * (0.35 + develop * 0.65) *
          (1.0 - spent * 0.30 + shallows * 0.30);
        float crestGlint = exp(-pow((lipDist + 0.008) / 0.013, 2.0)) *
          (0.40 + cascade * 0.60) * breakAmount;

        float foamGate = waveEnergyR;
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
        // The dark apron precedes the foam: swellOn opens it within ~0.4 s of
        // spawn (not the 1.1 s foam ramp), so the approaching swell reads as
        // dark water with scattered light foam — the pre-break state — and it
        // runs a touch deeper there. Into the shallows the drama drains out:
        // spent water goes milky-bright, not dark. Behind-side (matDecay)
        // scaling is mirrored in the ghost paint via gShallows.
        float swellOn = smoothstep(0.02, 0.40, waveLife);
        float aheadDrama = aheadZone * (0.58 + (1.0 - develop) * 0.20 + spent * 0.14) *
          max(breakAmount, swellOn * 0.80);
        // Under copy the apron keeps its shape but not its full depth —
        // near-black sweeping behind body text every cadence was the core
        // of the 2026-07-12 legibility report. Foam still reads
        // white-on-dark; the dark just stops short of ink-black there.
        float dramaDarken = waveEnergyR * (aheadDrama + matDecay * 0.34 * breakAmount) *
          (1.0 - shallows * 0.72) * mix(1.0, 0.78, u_pageCalm);
        // Deeper cast shadow beneath the lip — the dark the foam volume sits
        // proud of. Subsurface teal band under the body reads as light
        // scattering through aerated water (thickness cue).
        color *= mix(1.0, 0.70, lipShadow * foamGate * 0.7);
        color *= 1.0 - dramaDarken;
        // Shallow-water milk: the finished crash brightens the water it
        // spreads into instead of darkening it (green shallows state).
        color += moodCaustic * aheadZone * shallows * 0.05 * foamGate * breakAmount;
        // Foam OCCLUDES the water (Jules 2026-07-09, the rain-layer note):
        // the BODY terms replace the surface — rings/relief beneath dense
        // foam disappear with it — while thin ahead-scatter stays additive
        // translucency. Albedo is the coverage-weighted blend of the terms'
        // existing tints; peak brightness caps at albedo, so the crest keeps
        // texture through its brightest band instead of clipping to white.
        // The ghost paints the identical composite via foamCover(gWash *
        // 0.45 * ghostE) — the 0.45 weight must match on both sides.
        float w1 = lipFoam * 0.85;
        float w2 = foamBody * 0.45;
        float w3 = washMat * 0.45;
        float bodyMass = (w1 + w2 + w3) * foamGate;
        vec3 bodyAlbedo = (foamColor * (w1 + w3) + mix(foamColor, moodCaustic, 0.30) * w2) /
          max(w1 + w2 + w3, 0.0001) *
          moodFloat(0.83, 1.0, 1.0, 0.85);
        color = mix(color, bodyAlbedo, foamCover(bodyMass));
        color += foamColor * (faceStreaks * 0.20 + aheadFloor * 0.10 + backwash * 0.16) * foamGate;
        color += mix(foamColor, moodCaustic, 0.55) * pullStreaks * 0.14 * foamGate;
        color += mix(moodCaustic, vec3(0.97, 0.995, 0.99), 0.9) * cores * foamGate;
        // Sunlit crest glint last, so the top edge of the breaker catches the
        // brightest light over everything below it.
        color += vec3(0.97, 0.99, 0.985) * crestGlint * 0.28 * foamGate;
      }

      // Wash ghost — the whitewash OUTLIVES its wave (Jules 2026-07-06: the
      // trail vanished with the animation). The dead wave's wash is painted
      // with the SAME vocabulary as the live block — same fields, same
      // phases, same decay, per tier — driven by u_wash. JS keeps the ghost
      // crest traveling, so at age 0 every term equals the live block's
      // death-frame value: the handoff is pixel-identical by construction,
      // then the energy envelope + lace erosion dissolve the field over ~4 s.
      // Uniform-coherent gate; 2-3 noise fields inside while a ghost lives.
      // Fields all hoisted above the glitter block (2026-07-07, aftermath
      // seed) — the ghost's clock continues the live wave's; only the
      // composite + paint live here now.
      if (ghostE > 0.012) {
        float gWash = (gBody * 0.72 + gFringe * 0.50) * gDecay * gGrow * gBreak *
          (0.25 + 0.75 * gDevelop);
        // The live block's drama darkening (matDecay component) carries
        // over too — bright-foam-on-dark-water survives the handoff. Both
        // mirror the live block's band scaling (gDevelop / gShallows).
        // u_pageCalm factor mirrors the live dramaDarken exactly — the
        // death-frame parity invariant: identical scaling on both sides
        // of the handoff, or calm pages pop at wave death.
        color *= 1.0 - ghostE * gDecay * 0.34 * gBreak * (1.0 - gShallows * 0.72) *
          mix(1.0, 0.78, u_pageCalm);
        // Occlusion twin: gWash === washMat and ghostE === foamGate at the
        // death frame, and the live block's crest-anchored body terms are
        // off-screen at any ghost-spawning death, so this mix is
        // pixel-identical to the live body composite there (same 0.45).
        color = mix(color, mix(moodCaustic, vec3(0.93, 0.98, 0.97), 0.75) *
          moodFloat(0.83, 1.0, 1.0, 0.85),
          foamCover(gWash * 0.45 * ghostE));
        // Pull-streak twin (term-for-term with the live block at the death
        // frame: gBehind===behindDist, gLife===waveLife there).
        float gPull = pullField(gBehind, gLife, texScale) *
          gDevelop * (1.0 - gSpent * 0.5) * gBreak;
        color += mix(mix(moodCaustic, vec3(0.93, 0.98, 0.97), 0.75), moodCaustic, 0.55) * gPull * 0.14 * ghostE;
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
      // Budget: 2 noise fields; TOUCH lace is 2-octave = 3 evals in-band
      // (1 plain on LOW_Q: no sheets, solid edge). The 2026-07-07 sand +
      // dissipation vocabulary (bed mottle, grain, bubbles) is pure trig
      // — no additional noise evals on any tier.
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

        // Run-up cycle — JS owns the clock (u_shorePhase) + per-cycle reach
        // (u_shore.w): the incoming wave is THE one wave (loop/release
        // vocabulary above), landing as lineLife opens at ph ~0.40-0.42, so
        // the breaker dissipates INTO foam born in place. Aftermath:
        //   ph 0.40-0.56  landed — the wash runs up fast, foam BLOOMS
        //   ph 0.58-1.00  slow retreat: foam dies into lace and residue
        float ph = u_shorePhase;
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
        float runReach = u_shore.w;
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

        // One lace field shared by the waterline edge and the residue.
        // LOW_Q stays single-octave. TOUCH_Q runs 2 octaves (LOW_Q
        // oceanNoise recipe), scoped to the shore band only: +1 noise so
        // the edge thresholds into holey lace like desktop.
      #if defined(LOW_Q)
        float shoreLace = noise(vec2(waterUv.x * 11.0, bandT * 6.0 - u_time * 0.10));
      #elif defined(TOUCH_Q)
        vec2 slp = vec2(waterUv.x * 11.0, bandT * 6.0 - u_time * 0.10);
        float sl = noise(slp);
        float shoreLace = sl * 0.62 + noise(slp * 2.17 + sl * 1.8) * 0.38;
      #else
        float shoreLace = oceanNoise(vec2(waterUv.x * 11.0, bandT * 6.0 - u_time * 0.10));
      #endif

        // Water side — milky sediment shallows + wash sheets advected
        // shoreward (down-screen, with the ocean's flow).
        // Film PLATEAUS before the line instead of peaking on it — the
        // old rise-to-wl shape stacked into a bright straight ridge at
        // the resting waterline (device row-profile, round 2) — and the
        // edge dies lace-broken over ~4x the old distance.
        float shallowMilk = smoothstep(wl - 0.48, wl - 0.14, bandT) *
          (1.0 - smoothstep(wl - 0.012, wl + 0.045 + shoreLace * 0.035, bandT));
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
        float edgeBand = exp(-pow(toFoam / (0.034 + max(u_shore.w - 0.20, 0.0) * 0.11), 2.0));
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
        // Foam ages into strands: past mid-retreat the solid body drains
        // out and only filament ridges of the same lace field survive —
        // a bandpass on the threshold keeps the contours, drops the fill.
        float strandAge = smoothstep(0.58, 0.86, ph);
      #if defined(LOW_Q)
        // Single-octave noise thresholds into big patches, not lace —
        // run a mostly-SOLID thin edge and suppress residue instead.
        float edgeLace = edgeBand * (0.55 * (1.0 - strandAge * 0.55) +
          smoothstep(edgeTh, edgeTh + 0.30, shoreLace) * 0.45);
        float residueW = 0.12;
      #elif defined(TOUCH_Q)
        // 2-octave field thresholds into real lace now: lean on it, keep
        // a thin trig-grain aeration over a smaller solid base.
        float grain = 0.5 + 0.5 * sin(waterUv.x * 140.0 + shoreLace * 24.0 + u_time * 0.8);
        float laceBodyT = smoothstep(edgeTh, edgeTh + 0.26, shoreLace);
        float laceRidgeT = laceBodyT - smoothstep(edgeTh + 0.11, edgeTh + 0.24, shoreLace);
        float edgeLace = edgeBand * (0.26 * (1.0 - strandAge * 0.75) +
          mix(laceBodyT, laceRidgeT * 1.3, strandAge) * 0.55 +
          grain * grain * 0.19 * (1.0 - strandAge * 0.4));
        float residueW = 0.25;
      #else
        float laceBody = smoothstep(edgeTh, edgeTh + 0.24, shoreLace);
        float laceRidge = laceBody - smoothstep(edgeTh + 0.10, edgeTh + 0.22, shoreLace);
        float edgeLace = edgeBand * (0.22 * (1.0 - strandAge * 0.75) +
          mix(laceBody, laceRidge * 1.35, strandAge) * 0.78);
        float residueW = 0.30;
      #endif

        // Sand side — wet sheen to the high-water mark + drying residue
        // eroding with height above the current line (higher = drier).
        // At full run-up the exposed band collapses; retreat re-opens it.
        float wetZone = smoothstep(-0.012 - shoreLace * 0.02, 0.05, toSand) *
          (1.0 - smoothstep(wlMax - wl, wlMax - wl + 0.10, toSand));
        float resT = clamp(toSand / max(wlMax - wl, 0.001), 0.0, 1.0);
        float resTh = 0.34 + resT * 0.30 + retreat * 0.06;
        float residue = smoothstep(resTh, resTh + 0.16, shoreLace) * wetZone;

        // Wet-dark drying edge — the retreat's fresh soak darkens the
        // exposed sand and DRIES from the high mark down (freshness =
        // closeness to the receding line). Envelope dies before the wrap
        // so the per-cycle reach re-roll can't pop the footprint.
        float wetFresh = 1.0 - smoothstep(0.0, max(wlMax - wl, 0.001) * 0.85, toSand);
        // Holds through the WHOLE retreat (a blink-window read as nothing);
        // still fully dry before the wrap so the reach re-roll can't pop.
        float wetEnv = smoothstep(0.55, 0.72, ph) * (1.0 - smoothstep(0.88, 0.99, ph));
        float wetDark = wetZone * wetFresh * wetEnv * (0.70 + shoreLace * 0.30);
        // Mirror skim — the thin bright film hugging the receding edge.
        float skim = exp(-pow(toSand / 0.016, 2.0)) * retreat *
          (1.0 - smoothstep(0.90, 1.0, ph));
        // Backwash sediment — the retreating sheet stirs sand into the
        // milk just seaward of the line (tint factor for the adds below).
        float sed = retreat * smoothstep(wl - 0.12, wl, bandT) *
          (1.0 - smoothstep(wl, wl + 0.03, bandT));
      #ifndef LOW_Q
        // Bubble pops — pinpoint glints strung along the retreating edge,
        // bursting by threshold jitter (bubbles pop in place, not drift).
        float bubCell = sin(waterUv.x * 236.0 + shoreLace * 9.0) *
          sin(bandT * 410.0 - shoreLace * 7.0);
        float bubTw = sin(u_time * 3.1 + waterUv.x * 520.0 + shoreLace * 14.0);
        float bubbles = smoothstep(0.965 - 0.025 * bubTw, 0.995, bubCell) *
          exp(-pow(toSand / 0.022, 2.0)) * retreat * (1.0 - smoothstep(0.88, 0.99, ph));
      #else
        float bubbles = 0.0;
      #endif
        // The last sheet sinks INTO the sand — the low shallow milk
        // drains while the bed under it soaks darker, drying before the
        // wrap (water leaves downward, not by fading out).
        float sinkEnv = smoothstep(0.74, 0.86, ph) * (1.0 - smoothstep(0.92, 0.995, ph));
        float sink = sinkEnv * smoothstep(wlBase - 0.06, wlBase + 0.01, bandT) *
          (1.0 - smoothstep(wlBase + 0.05, wlBase + 0.15, bandT));
        // Previous front — the last cycle's landed lace dries in place
        // while the new cycle plays over it: the flat-multilayer beach
        // (Jules refs 2026-07-07). Same lace field, thresholded higher
        // as it ages; fully gone before this cycle wraps and re-arms it.
        float toPrev = bandT - (wlBase + u_shorePrev);
        // Short fade-in bridges the residue->ghost handoff at the wrap
        // (a step there would read as lace appearing from nothing).
        float prevEnv = smoothstep(0.0, 0.08, ph) *
          (1.0 - smoothstep(0.55, 0.92, ph)) * step(0.001, u_shorePrev);
        float prevBand = exp(-pow(toPrev / 0.020, 2.0));
        float prevTh = 0.40 + ph * 0.34;
        float prevLace = prevBand * (smoothstep(prevTh, prevTh + 0.14, shoreLace) -
          smoothstep(prevTh + 0.14, prevTh + 0.26, shoreLace) * 0.5);

        // Procedural sand base — the canvas paints sand-plausible color
        // below the waterline instead of dark ocean, so the lighter DOM
        // feather can hand this strip to the live layer and the two beds
        // (shader strip -> footer photo) read as one beach. Static trig
        // mottle: sand does not drift.
        float sandZone = smoothstep(-0.018 - shoreLace * 0.025, 0.075, toSand) *
          (1.0 - smoothstep(0.62, 0.88, bandT));
      #ifndef LOW_Q
        float sandMottle = sin(waterUv.x * 47.0 + sin(bandT * 61.0) * 3.1) *
          sin(bandT * 53.0 + sin(waterUv.x * 71.0) * 2.4);
        // Dry-sand grain — stationary micro-glints, twinkling by
        // threshold only (grains don't drift). Pure trig.
        float gCell = sin(waterUv.x * 214.0 + sin(bandT * 337.0) * 2.6) *
          sin(bandT * 301.0 + sin(waterUv.x * 173.0) * 2.2);
        float gTwk = sin(u_time * 1.6 + waterUv.x * 431.0 + bandT * 269.0);
        float dryGrain = smoothstep(0.982 + 0.012 * gTwk, 0.998, gCell) *
          smoothstep(0.02, 0.12, toSand) * (1.0 - smoothstep(0.62, 0.86, bandT));
      #else
        float sandMottle = 0.0;
        float dryGrain = 0.0;
      #endif
        // Warm tan pulled toward the mood tint so fog/rain grade the
        // sand with the sea; mottle breaks the flatness +-8%.
        vec3 sandBed = mix(vec3(0.336, 0.302, 0.247), vec3(0.415, 0.372, 0.302),
          0.5 + sandMottle * 0.5);
        sandBed = mix(sandBed, sandBed * (moodCaustic * 1.45 + vec3(0.30)), 0.34);

        // Composite — moodFloat weights: fog/rain dim the shore like
        // every other foam term; exposure + fog grading apply below.
        // Sand bed first, then darkening, then the bright adds on top.
        float shoreGate = u_shore.z * bandMask * moodFloat(1.0, 0.40, 0.60, 0.95);
        color = mix(color, sandBed, sandZone * 0.62 * shoreGate);
        color *= 1.0 - wetDark * 0.32 * shoreGate;
        color *= 1.0 - sink * (0.14 + shoreLace * 0.10) * shoreGate;
        vec3 sandMilk = mix(moodCaustic, moodCaustic * vec3(1.10, 0.99, 0.80), sed);
        color += sandMilk * shallowMilk * 0.07 * (1.0 - sinkEnv * 0.60) * shoreGate;
        color += sandMilk * sheets * 0.14 * shoreGate;
        color += mix(moodCaustic, vec3(0.95, 0.99, 0.98), 0.9) *
          (edgeLace * 0.78 + edgeCore * 0.34) * lineLife * deepFade * shoreGate;
        color += moodCaustic * wetZone * 0.045 * shoreGate;
        color += mix(moodCaustic, vec3(0.92, 0.97, 0.96), 0.6) * skim * 0.11 * shoreGate;
        color += vec3(1.0, 0.97, 0.88) * dryGrain * 0.22 * shoreGate;
        color += vec3(0.97, 1.0, 0.99) * bubbles * 0.52 * shoreGate;
        color += mix(moodCaustic, vec3(0.94, 0.98, 0.97), 0.8) * prevLace * 0.34 * prevEnv * shoreGate;
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
  `;function eo(e,t,o){const s=e.createShader(t);if(!s)throw new Error("Unable to create water shader.");if(e.shaderSource(s,o),e.compileShader(s),!e.getShaderParameter(s,e.COMPILE_STATUS)){const l=e.getShaderInfoLog(s)||"Unknown shader compile error.";throw e.deleteShader(s),new Error(l)}return s}function to(e,t,o){const s=eo(e,e.VERTEX_SHADER,t),l=eo(e,e.FRAGMENT_SHADER,o),d=e.createProgram();if(!d)throw new Error("Unable to create water shader program.");if(e.attachShader(d,s),e.attachShader(d,l),e.linkProgram(d),e.deleteShader(s),e.deleteShader(l),!e.getProgramParameter(d,e.LINK_STATUS)){const y=e.getProgramInfoLog(d)||"Unknown shader link error.";throw e.deleteProgram(d),new Error(y)}return d}function bn(e,t=H[0]){const o=window.matchMedia(cn).matches,s=o&&((navigator.hardwareConcurrency||8)<=4||(navigator.deviceMemory||8)<=4),l=new URLSearchParams(window.location.search),d=l.get("caustic")==="off"?`#define CAUSTIC_OFF 1
`:"",y=l.get("causticadd")==="off"?`#define CAUSTIC_ADD_OFF 1
`:"",g=l.has("simdebug")?`#define SIM_DEBUG 1
`:"",w=l.get("tier"),v=l.get("wavephase"),x=l.get("lifecycle")||"",f={heavier:{wakeStrength:.026,wakeRate:40,gapScale:1,preSeed:.3,stallLife:1.8},calmer:{wakeStrength:.011,wakeRate:22,gapScale:1.5,preSeed:.22,stallLife:1.8},residue:{wakeStrength:.016,wakeRate:30,gapScale:1.2,preSeed:.3,stallLife:1.1}}[x]||{wakeStrength:.016,wakeRate:30,gapScale:1,preSeed:.3,stallLife:1.8},T=x==="residue"?{tail:.09,headW:.55,tailW:.45,drain:.4,erode:.018}:{tail:.16,headW:.72,tailW:.28,drain:.7,erode:.05},_=o||s?256:512,C=o?1e3/30:1e3/60,W=.195,F=-.12,he=.05,ue=.02,j=.32,Z=-.13,ee=.15,se=.26,fe=1e3,K={"tropical-glass":{gapMinMs:1300,gapJitterMs:2600,speed:1},sunbreak:{gapMinMs:1300,gapJitterMs:2600,speed:1},"marine-layer":{gapMinMs:900,gapJitterMs:1400,speed:1.1},"bay-fog":{gapMinMs:600,gapJitterMs:1e3,speed:1.15},rain:{gapMinMs:150,gapJitterMs:400,speed:1.3}},me=600,te=.95,Be=new URLSearchParams(window.location.search).has("nowater");let E=t,P=t,B=0,G=0,pe=0,re=0,it=0,Gt=3;const zt={1:{rate:8,radiusMin:4,radiusSpan:5,strengthMin:.028,strengthSpan:.045,bias:2.4,gust:0},2:{rate:44,radiusMin:4,radiusSpan:5,strengthMin:.03,strengthSpan:.04,bias:2.2,gust:.15},3:{rate:20,radiusMin:5,radiusSpan:9,strengthMin:.05,strengthSpan:.1,bias:2.4,gust:.2},4:{rate:26,radiusMin:7,radiusSpan:12,strengthMin:.07,strengthSpan:.11,bias:2,gust:.35},5:{rate:32,radiusMin:9,radiusSpan:13,strengthMin:.09,strengthSpan:.12,bias:1.7,gust:.5}},lt=8,Me=new Float32Array(lt*4);let ge=0;function Yt(a,i,c,h){if(ge>=lt)return;const p=ge*4;Me[p]=M(a/Math.max(window.innerWidth,1)),Me[p+1]=1-M(i/Math.max(window.innerHeight,1)),Me[p+2]=na(c),Me[p+3]=h,ge+=1}function Ro(a){const i=Math.pow(Math.random(),a.bias),c=window.innerHeight/_*1.6;return{radius:Math.max(a.radiusMin+i*a.radiusSpan,c),strength:a.strengthMin+i*a.strengthSpan}}const z=document.createElement("canvas"),S={x:.5,y:.5,move:0,impulse:0,radius:32,tiltX:0,tiltY:0},R={stageProgress:0,stageInfluence:0,scrollVelocity:0,phone:{x:.5,y:.5,width:0,height:0}},Ge={none:0,tease:2,intro:2,loop:2},n={phase:"none",life:0,speedUv:0,crestUv:-1,energy:0,energyTarget:0,span:1,bound:!1,bandT:0,landed:!1,pinned:!1};let ct=fe;const N={crestUv:-1,age:99,energy:0,lifeAtDeath:0,speedUv:0};function dt(){return K[E.id]||K["tropical-glass"]}const ht=new URLSearchParams(window.location.search),Mo=ht.get("shore")==="off",No=ht.has("shoredebug")?1:0,m={top:3,height:0,docTop:NaN,heightPx:0,influence:0,targetInfluence:0},qt=ht.get("pagecalm"),ze=qt==="0"?0:qt==="1"?1:null,ut=e.hasAttribute("data-page-calm")?1:0,ie={docTop:NaN,heightPx:0,influence:0};let Qt=!1,Se=ze!==null?ze:ut,Ye=Se;const u={live:!1,phase:0,period:7,vary:1,boost:0,rate:1,loopArmed:!1,prevReach:0};function Vt(){u.period=6.3+Math.random()*2.3,u.vary=.78+Math.random()*.44}function Xt(){if(m.height<=.001||n.speedUv<=0)return;const a=1-m.top-m.height*j,i=(n.crestUv-a)/n.speedUv;if(i<=.25)return;const c=((.4-u.phase)%1+1)%1;u.rate=M(c*u.period/i,.3,2.6)}function Jt(){u.phase=.4,u.rate=1,u.boost=Math.max(u.boost,.084+.036*m.influence),u.loopArmed=!1}let Ne=0,ft=0,Ce=0,we=NaN,Pe=NaN,mt=NaN,Kt=NaN;const le={x:0,y:0,w:0,h:0};function $t(){const a=document.querySelector(".top-nav");if(!a)return;const i=a.getBoundingClientRect(),c=Math.max(window.innerWidth,1),h=Math.max(window.innerHeight,1);le.x=i.left/c,le.y=i.top/h,le.w=i.width/c,le.h=i.height/h}let pt=!1,jt=!1;function Zt(a){a!==jt&&(jt=a,document.documentElement.classList.toggle("is-wave-passing",a))}let ea=!1;function ta(a){a!==ea&&(ea=a,document.documentElement.classList.toggle("is-shore-lapped",a))}function qe(){pt=!0;const a=document.querySelector(".hero-mark");if(!a)return we=NaN,Pe=NaN,!1;const i=a.getBoundingClientRect();return we=i.top+window.scrollY,Pe=i.bottom+window.scrollY,mt=i.left,Kt=i.right,Pe>we}function Co(a,i){n.phase==="intro"&&!pt&&qe();const c=1-(we-i)/a,h=1-(Pe-i)/a;Zt(n.phase==="intro"&&Number.isFinite(we)&&n.crestUv<=c+.1&&n.crestUv>=h-.14)}function Po(){v||document.querySelector(".hero-mark")&&(window.scrollY>=window.innerHeight*.5||(Ce=window.setTimeout(Do,me)))}function Do(){Ce=0,!(Ue||n.pinned||n.phase!=="none")&&qe()&&(n.phase="intro",n.life=0,n.crestUv=1.08+Math.random()*.06,n.speedUv=W*dt().speed,n.energy=Math.max(n.energy,.35),n.energyTarget=te,n.span=1,n.bound=!1,n.landed=!1,oe())}function Uo(a){const i=Math.max(window.innerHeight,1),c=window.scrollY,h=n.energyTarget>n.energy?2.6:1.1;if(n.energy+=(n.energyTarget-n.energy)*Math.min(1,a*h),N.age+=a,N.crestUv-=N.speedUv*a,N.speedUv*=Math.pow(.25,a/f.stallLife),v){Oo(),ke(i,c);return}if(n.pinned){ke(i,c);return}const p=m.height>.001,k=p?1-m.top:NaN;if(n.phase==="none"){if(n.crestUv=-1,u.live&&u.loopArmed&&m.influence>.5&&p&&u.phase>=.02){const Q=(j-Z)*m.height,O=Math.max(.42-u.phase,.02)*(u.period/Math.max(u.rate,.05)),$=Q/O;if($>=W){u.loopArmed=!1,n.phase="loop",n.life=0,n.bound=!0,n.bandT=Z,n.speedUv=M($,ee,se),n.crestUv=k-n.bandT*m.height,n.energy=Math.max(n.energy,.3),n.energyTarget=.85,n.span=1,n.landed=!1,ke(i,c);return}}m.influence<.3&&(ct-=a*1e3,ct<=0&&(n.phase="tease",n.life=0,n.crestUv=1.05+Math.random()*.15,n.speedUv=W*dt().speed,n.energy=Math.max(n.energy,f.preSeed+Math.random()*.12),n.energyTarget=.84+Math.random()*.14,n.span=1,n.bound=!1,n.landed=!1)),ke(i,c);return}if(n.life+=a,n.bound){m.influence<ue||!p?n.bound=!1:(n.bandT+=n.speedUv/m.height*a,n.crestUv=k-n.bandT*m.height,!n.landed&&n.bandT>=j&&(n.phase!=="loop"&&Jt(),n.landed=!0,n.speedUv*=.35,n.energyTarget=0),n.energyTarget===0&&n.energy<.03&&Qe(n.phase!=="loop")),ke(i,c);return}else n.crestUv-=n.speedUv*a,m.influence>he&&p&&n.crestUv<=k?(n.bound=!0,n.bandT=(k-n.crestUv)/m.height,Xt()):n.crestUv<F?!n.landed&&n.phase!=="loop"?(u.live&&m.influence>.02?Jt():(u.rate=1,u.phase=Math.max(u.phase,.94)),Qe(!0)):Qe(n.phase!=="loop"):n.energyTarget===0&&n.energy<.02&&Qe(n.phase!=="loop");ke(i,c)}function Oo(){const a=v.split(","),i=a[0],c=M(Number(a[1]??.5));i in Ge&&(n.phase=i,n.span=1,n.bound=!1,n.landed=!1,i==="tease"||i==="intro"?(n.crestUv=1-c*1.3,n.energy=.95,n.life=c*8):i==="loop"?(n.crestUv=.92-c*.9,n.energy=1-c*.25,n.life=1.2+c*4):(n.crestUv=-1,n.energy=0),n.energyTarget=n.energy)}function aa(a,i,c){const h=M((c-a)/(i-a));return h*h*(3-2*h)}function Fo(a,i){let c=0;if((n.phase==="tease"||n.phase==="intro"||n.phase==="loop")&&n.energy>.015){const k=Math.sin(a*3.2+n.life*.5)*.055+Math.sin(a*7.9-n.life*.8)*.02+(a-.5)*.045;c=Math.min(n.energy,1)*aa(.15,1.1,n.life)*Math.exp(-Math.max(i-n.crestUv+k,0)*1.9)*Math.exp(-Math.max(n.crestUv-i-k,0)*4.2)}let h=0;const p=N.energy*(T.headW*Math.exp(-N.age*.62)+T.tailW*Math.exp(-N.age*T.tail))*(n.phase==="none"?1:Math.exp(-n.life*T.drain));if(p>.012){const k=N.lifeAtDeath+N.age,Q=Math.sin(a*3.2+k*.5)*.055+Math.sin(a*7.9-k*.8)*.02+(a-.5)*.045;h=p*aa(.15,1.1,N.lifeAtDeath)*Math.exp(-Math.max(i-N.crestUv+Q,0)*1.9)*Math.exp(-Math.max(N.crestUv-i-Q,0)*4.2)}return Math.min(Math.max(c,h),1)}let gt=0;function Io(a){if(n.pinned||v||n.phase!=="tease"&&n.phase!=="intro"&&n.phase!=="loop"||n.energy<.25)return;const i=n.crestUv;if(i<.03||i>.99)return;gt+=a*f.wakeRate;const c=Math.max(window.innerWidth,1),h=Math.max(window.innerHeight,1);for(;gt>=1;){gt-=1;const p=i+(Math.random()-.5)*.05;Yt(Math.random()*c,(1-p)*h,h*(.055+Math.random()*.05),f.wakeStrength*(.4+.6*n.energy))}}function Qe(a=!0){if(!n.landed&&n.energy>.2&&n.crestUv>-.6&&(N.crestUv=n.crestUv,N.age=0,N.energy=n.energy,N.lifeAtDeath=n.life,N.speedUv=n.speedUv),n.landed=!1,n.bound=!1,n.bandT=0,n.phase="none",n.energyTarget=0,n.crestUv=-1,n.span=1,a){const i=dt(),c=ut===1||Qt?2.5:1;ct=(i.gapMinMs+Math.random()*i.gapJitterMs)*f.gapScale*c}}const I={phase:"none",life:0,crestUv:-1,crestDocY:0,energy:0,span:1,stageOffset:-99,phoneTopUv:0,shorePhase:0,bound:!1,bandT:0,speedUv:0,landed:!1,shoreTopUv:0,shoreHeightUv:0};function ke(a,i){Co(a,i),I.phoneTopUv=1-R.phone.y,I.phase=n.phase,I.life=n.life,I.crestUv=n.crestUv,I.crestDocY=(1-n.crestUv)*a+i,I.energy=n.energy,I.span=n.span,I.stageOffset=0,I.shorePhase=u.phase,I.shorePrevReach=u.prevReach,I.bound=n.bound,I.bandT=n.bandT,I.speedUv=n.speedUv,I.landed=n.landed,I.shoreTopUv=1-m.top,I.shoreHeightUv=m.height,window.__WAXUP_WAVE__=I}let r=null,ae=0,De=0,Le=0,ve=1,be=1,Ve=null,U=null,A=null,ye=null,ce=null,xe=null,Ue=!1,Xe=!1,Y=0,wt=typeof window<"u"?window.innerWidth:0,vt=-1,bt=-1;const L={},b={};z.setAttribute("aria-hidden","true"),z.className="water-canvas",e.textContent="",e.append(z);function Je(){et(),yt(),e.textContent="",e.dataset.fallback="true";const a=document.createElement("div");a.className="water-fallback",a.dataset.waterFallback="",e.append(a)}function oa(a,i){S.x=Math.min(Math.max(a/Math.max(window.innerWidth,1),0),1),S.y=1-Math.min(Math.max(i/Math.max(window.innerHeight,1),0),1)}function na(a){return a/Math.max(window.innerHeight,1)}function M(a,i=0,c=1){return Math.min(Math.max(Number.isFinite(a)?a:i,i),c)}function sa(a,i,c,h){oa(a,i),S.radius=c,S.move=Math.max(S.move,h)}function Ke(a,i,c,h){oa(a,i),S.radius=c,S.impulse=Math.max(S.impulse,h)}function ra(a,i){const c=r.createTexture(),h=r.createFramebuffer();if(!c||!h)throw new Error("Unable to create water render target.");r.bindTexture(r.TEXTURE_2D,c),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MAG_FILTER,r.NEAREST),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_S,r.CLAMP_TO_EDGE),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_T,r.CLAMP_TO_EDGE),r.texImage2D(r.TEXTURE_2D,0,r.RGBA,a,a,0,r.RGBA,i,null),r.bindFramebuffer(r.FRAMEBUFFER,h),r.framebufferTexture2D(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,c,0);const p=r.checkFramebufferStatus(r.FRAMEBUFFER)===r.FRAMEBUFFER_COMPLETE;return{texture:c,framebuffer:h,complete:p}}function $e(a){!r||!a||(r.deleteTexture(a.texture),r.deleteFramebuffer(a.framebuffer))}function ia(a){const i=ra(_,a),c=ra(_,a);if(!(i.complete&&c.complete))return $e(i),$e(c),!1;ce=i,xe=c;for(const p of[ce,xe])r.bindFramebuffer(r.FRAMEBUFFER,p.framebuffer),r.viewport(0,0,_,_),r.clearColor(.5,.5,0,1),r.clear(r.COLOR_BUFFER_BIT);return!0}function Wo(){const a=r.getExtension("OES_texture_half_float"),i=r.getExtension("EXT_color_buffer_half_float");return a&&i?a.HALF_FLOAT_OES:r.UNSIGNED_BYTE}function Ho(){L.state=r.getUniformLocation(U,"u_state"),L.texel=r.getUniformLocation(U,"u_texel"),L.pointer=r.getUniformLocation(U,"u_pointer"),L.aspect=r.getUniformLocation(U,"u_aspect"),L.strength=r.getUniformLocation(U,"u_strength"),L.radius=r.getUniformLocation(U,"u_radius"),L.phone=r.getUniformLocation(U,"u_phone"),L.choreo=r.getUniformLocation(U,"u_choreo"),L.tilt=r.getUniformLocation(U,"u_tilt"),L.calm=r.getUniformLocation(U,"u_calm"),L.drops=r.getUniformLocation(U,"u_drops"),L.dropCount=r.getUniformLocation(U,"u_dropCount"),L.position=r.getAttribLocation(U,"a_position"),b.state=r.getUniformLocation(A,"u_state"),b.texel=r.getUniformLocation(A,"u_texel"),b.resolution=r.getUniformLocation(A,"u_resolution"),b.time=r.getUniformLocation(A,"u_time"),b.mood=r.getUniformLocation(A,"u_mood"),b.moodTo=r.getUniformLocation(A,"u_moodTo"),b.moodBlend=r.getUniformLocation(A,"u_moodBlend"),b.phone=r.getUniformLocation(A,"u_phone"),b.choreo=r.getUniformLocation(A,"u_choreo"),b.wave=r.getUniformLocation(A,"u_wave"),b.shadowNav=r.getUniformLocation(A,"u_shadowNav"),b.wash=r.getUniformLocation(A,"u_wash"),b.shadowMark=r.getUniformLocation(A,"u_shadowMark"),b.shore=r.getUniformLocation(A,"u_shore"),b.shorePhase=r.getUniformLocation(A,"u_shorePhase"),b.shorePrev=r.getUniformLocation(A,"u_shorePrev"),b.shoreDebug=r.getUniformLocation(A,"u_shoreDebug"),b.pageCalm=r.getUniformLocation(A,"u_pageCalm"),b.position=r.getAttribLocation(A,"a_position")}function la(a){r.bindBuffer(r.ARRAY_BUFFER,ye),r.enableVertexAttribArray(a),r.vertexAttribPointer(a,2,r.FLOAT,!1,0,0)}function je(){$t();const a=Math.min(window.devicePixelRatio||1,s?1:1.5);ve=Math.max(Math.floor(window.innerWidth*a),1),be=Math.max(Math.floor(window.innerHeight*a),1),(z.width!==ve||z.height!==be)&&(z.width=ve,z.height=be),pt&&n.phase==="intro"&&qe()}function Bo(){Y=0,je()}function ca(){const a=window.innerWidth;if(a!==wt){wt=a,Y&&(window.clearTimeout(Y),Y=0),je();return}Y&&window.clearTimeout(Y),Y=window.setTimeout(Bo,180)}function da(){wt=window.innerWidth,Y&&(window.clearTimeout(Y),Y=0),je()}function Go(a,i){r.bindFramebuffer(r.FRAMEBUFFER,xe.framebuffer),r.viewport(0,0,_,_),r.useProgram(U),la(L.position),r.activeTexture(r.TEXTURE0),r.bindTexture(r.TEXTURE_2D,ce.texture),r.uniform2f(L.pointer,S.x,S.y),r.uniform1f(L.aspect,window.innerWidth/Math.max(window.innerHeight,1)),r.uniform1f(L.strength,a),r.uniform1f(L.radius,i),r.uniform4f(L.phone,R.phone.x,R.phone.y,R.phone.width,R.phone.height),r.uniform4f(L.choreo,R.stageProgress,R.stageInfluence,R.scrollVelocity,Ge[n.phase]),r.uniform2f(L.tilt,S.tiltX,S.tiltY),r.uniform1f(L.calm,Ne),ge>0&&r.uniform4fv(L.drops,Me),r.uniform1i(L.dropCount,ge),r.drawArrays(r.TRIANGLE_STRIP,0,4),ge=0;const c=ce;ce=xe,xe=c}function zo(a){r.bindFramebuffer(r.FRAMEBUFFER,null),r.viewport(0,0,ve,be),r.useProgram(A),la(b.position),r.activeTexture(r.TEXTURE0),r.bindTexture(r.TEXTURE_2D,ce.texture),(ve!==vt||be!==bt)&&(r.uniform2f(b.resolution,ve,be),vt=ve,bt=be),r.uniform1f(b.time,a),r.uniform1f(b.mood,P.value),r.uniform1f(b.moodTo,E.value),r.uniform1f(b.moodBlend,B),r.uniform4f(b.phone,R.phone.x,R.phone.y,R.phone.width,R.phone.height),r.uniform4f(b.choreo,R.stageProgress,R.stageInfluence,R.scrollVelocity,Ge[n.phase]),r.uniform4f(b.wave,n.crestUv,n.energy,n.life,n.span),r.uniform4f(b.shadowNav,le.x,le.y,le.w,le.h),r.uniform4f(b.wash,N.crestUv,N.age,N.energy,N.lifeAtDeath);{const i=Math.max(window.innerHeight,1),c=Math.max(window.innerWidth,1),h=we-window.scrollY,p=Pe-we;Number.isFinite(h)&&h<i&&h+p>0?r.uniform4f(b.shadowMark,mt/c,h/i,(Kt-mt)/c,p/i):r.uniform4f(b.shadowMark,0,0,0,0)}r.uniform4f(b.shore,m.top,m.height,m.influence,(.2+u.boost)*u.vary),r.uniform1f(b.shorePhase,u.phase),r.uniform1f(b.shorePrev,u.live?u.prevReach:0),r.uniform1f(b.pageCalm,Se),r.drawArrays(r.TRIANGLE_STRIP,0,4)}function Yo(a){const i=pe>0;let c=0;if(E.id==="rain"?c=i&&P.id!=="rain"?B:1:i&&P.id==="rain"&&(c=1-B),c<=.001)return;const h=zt[Gt]??zt[3];it+=a*.001;const p=1+h.gust*Math.sin(it*.43)*Math.sin(it*.127+2.1),k=h.rate*p*c;re+=a;const Q=1e3/Math.max(k,.001);for(;re>=Q&&ge<lt;){re-=Q;const O=Math.random()*window.innerWidth,$=Math.random()*window.innerHeight,{radius:Ae,strength:Fe}=Ro(h),St=Fo(O/Math.max(window.innerWidth,1),1-$/Math.max(window.innerHeight,1));Yt(O,$,Ae,Fe*(1-.7*St))}re=Math.min(re,Q)}function Ze(a){if(document.hidden||Ue||Xe||!r){ae=0;return}if(Be){ae=window.requestAnimationFrame(Ze);return}const c=m.influence>.5&&R.stageInfluence<.05&&(n.phase==="none"||n.phase==="loop")?Math.max(C,1e3/30):C;if(c>0&&De){const O=c>20?5:4;if(a-Le<c-O){ae=window.requestAnimationFrame(Ze);return}Le=a-Le<c*2?Le+c:a}else Le=a;const h=a*.001,p=De?Math.min((a-De)*.001,.05):.016;if(De=a,Yo(p*1e3),pe>0){G+=p;const O=Math.min(G/pe,1);B=O*O*(3-2*O),O>=1&&(P=E,B=0,pe=0)}if(Number.isFinite(m.docTop)&&m.heightPx>0){const O=Math.max(window.innerHeight,1);m.top=M((m.docTop-window.scrollY)/O,-2,3),m.height=M(m.heightPx/O,0,3)}if(ze===null){let O=0;if(Number.isFinite(ie.docTop)&&ie.heightPx>0){const $=Math.max(window.innerHeight,1),Ae=(ie.docTop-window.scrollY)/$,Fe=Ae+ie.heightPx/$;O=M(Math.min(.5-Ae,Fe-.5)/.5)*ie.influence}Ye=Math.max(ut,O),Se+=(Ye-Se)*Math.min(1,p*1.25),Math.abs(Ye-Se)<.001&&(Se=Ye)}Uo(p),Io(p),ft*=Math.pow(.02,p/2.6),Ne+=(ft-Ne)*Math.min(1,p*7),Ne<.001&&ft<.001&&(Ne=0),m.influence+=(m.targetInfluence-m.influence)*Math.min(1,p*5),m.influence<.001&&m.targetInfluence===0&&(m.influence=0),m.influence>.001?(u.live||(u.live=!0,u.phase=.98,u.boost=0,u.rate=1,u.loopArmed=!1,u.prevReach=0,Vt(),n.phase==="release"&&Xt()),u.phase+=p/u.period*u.rate,u.phase>=1&&(u.phase-=1,u.prevReach=(.2+u.boost)*u.vary,u.boost=0,u.loopArmed=!0,Vt()),ta((.2+u.boost)*u.vary>=.215&&u.phase>.47&&u.phase<.72&&m.influence>.35)):u.live&&m.targetInfluence===0&&(u.live=!1,u.boost=0,u.rate=1,u.loopArmed=!1,ta(!1));const k=Math.min(S.move+S.impulse,.22),Q=na(S.radius);Go(k,Q),zo(h),S.move*=Math.pow(.035,p/.3),S.impulse*=Math.pow(.01,p/.1),R.scrollVelocity*=Math.pow(.03,p/.72),ae=window.requestAnimationFrame(Ze)}function oe(){!ae&&!document.hidden&&!Ue&&!Xe&&r&&(De=0,Le=0,ae=window.requestAnimationFrame(Ze))}function et(){ae&&(window.cancelAnimationFrame(ae),ae=0)}function yt(){r&&($e(ce),$e(xe),ye&&r.deleteBuffer(ye),U&&r.deleteProgram(U),A&&r.deleteProgram(A),ce=null,xe=null,ye=null,U=null,A=null,r=null)}function ha(){if(r=z.getContext("webgl",{alpha:!1,antialias:!1,depth:!1,stencil:!1,powerPreference:"high-performance",preserveDrawingBuffer:!1}),!r)return!1;Ve=Wo(),U=to(r,Za,wn);let a=s?`#define LOW_Q 1
`:o?`#define TOUCH_Q 1
`:"";w==="low"?a=`#define LOW_Q 1
`:w==="touch"?a=`#define TOUCH_Q 1
`:w==="desktop"&&(a="");const i="#define GHOST_TAIL "+T.tail+`
#define GHOST_HEADW `+T.headW+`
#define GHOST_TAILW `+T.tailW+`
#define GHOST_DRAIN `+T.drain+`
#define GHOST_ERODE `+T.erode+`
`;if(A=to(r,Za,a+d+y+g+i+vn),ye=r.createBuffer(),!ye)throw new Error("Unable to create water vertex buffer.");if(r.bindBuffer(r.ARRAY_BUFFER,ye),r.bufferData(r.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),r.STATIC_DRAW),!ia(Ve)&&(Ve=r.UNSIGNED_BYTE,!ia(Ve)))throw new Error("Unable to initialize water render targets.");Ho();const c=1/_;return r.useProgram(U),r.uniform1i(L.state,0),r.uniform2f(L.texel,c,c),r.useProgram(A),r.uniform1i(b.state,0),r.uniform2f(b.texel,c,c),r.uniform1f(b.shoreDebug,No),vt=-1,bt=-1,je(),e.removeAttribute("data-fallback"),!0}function ua(a){sa(a.clientX,a.clientY,35,.0092)}let fa=0;function ma(a){performance.now()-fa<650||Ke(a.clientX,a.clientY,o?52:46,.115)}function pa(a){const i=a.changedTouches[0];i&&(fa=performance.now(),Ke(i.clientX,i.clientY,58,.105))}function ga(a){if(s)return;const i=a.changedTouches[0];i&&sa(i.clientX,i.clientY,48,.01)}function wa(){S.move=Math.min(S.move,.018)}const qo=24,va=3.6,Qo=220,ne={requested:!1,granted:!1};let ba=0;const Vo=new URLSearchParams(window.location.search).get("debug")==="motion",tt={coarse:o,hasReqPerm:typeof DeviceOrientationEvent<"u"&&typeof DeviceOrientationEvent.requestPermission=="function",permState:"idle",lastError:null,lastTilt:null,eventCount:0,geoSupported:"geolocation"in navigator,geoState:"idle"};let V=null,de=null,ya=0;function xa(a,i){a.innerHTML="";const c=document.createElement("span");c.className="hero-pill-iris",c.setAttribute("aria-hidden","true");const h=document.createElement("span");h.className="hero-pill-label",h.textContent=i,a.append(c,h)}function _a(a,i){const c=a?.querySelector(".hero-pill-label");c&&(c.textContent=i)}function Xo(){o&&(V=document.createElement("button"),V.type="button",V.className="waxup-motion-chip hero-pill",xa(V,"Tilt Water"),V.addEventListener("click",a=>{a.preventDefault(),window.dispatchEvent(new CustomEvent("waxup:user-took-control",{detail:{source:"motion"}})),Ca(!0)},{passive:!1}),(document.querySelector(".hero-actions")||document.body).appendChild(V),Ta())}function Ta(){!Vo||de||(de=document.createElement("div"),de.className="waxup-motion-debug",document.body.appendChild(de),ka())}function Jo(){V?.remove(),V=null,de?.remove(),de=null}function Ea(a){_a(V,a)}function Sa(){V&&(V.classList.add("is-hidden"),window.setTimeout(()=>V?.remove(),700))}function q(a){Object.assign(tt,a);const i=performance.now();i-ya<250&&a.lastTilt||(ya=i,ka())}function ka(){if(!de)return;const a=tt,i=Math.round(window.scrollY),c=document.body.classList.contains("nav-logo-docked");de.textContent=[`coarse pointer: ${a.coarse}`,`has requestPerm: ${a.hasReqPerm}`,`permission state: ${a.permState}`,`geo: ${a.geoState} (supported: ${a.geoSupported})`,`events received: ${a.eventCount}`,`last tilt: ${a.lastTilt?`${a.lastTilt[0].toFixed(2)}, ${a.lastTilt[1].toFixed(2)}`:"none yet"}`,`scrollY: ${i}`,`nav-logo-docked: ${c}`,a.lastError?`error: ${a.lastError}`:""].filter(Boolean).join(`
`)}function La(a){return Math.tanh(a/qo)}const Aa=8;let _e=0,xt=0,_t=0;function Ra(a){if(a.beta===null||a.gamma===null)return;if(_e<Aa){xt=(xt*_e+a.beta)/(_e+1),_t=(_t*_e+a.gamma)/(_e+1),_e+=1,S.tiltX=0,S.tiltY=0,tt.eventCount+=1,q({lastTilt:[0,0],permState:`calibrating ${_e}/${Aa}`});return}const i=a.gamma-_t,c=a.beta-xt,h=La(i),p=-La(c),k=.04;S.tiltX+=(h-S.tiltX)*k,S.tiltY+=(p-S.tiltY)*k,tt.eventCount+=1,q({lastTilt:[S.tiltX,S.tiltY],permState:"granted"})}function Ma(a){const i=a.acceleration;if(!i)return;const c=i.x||0,h=i.y||0,p=i.z||0,k=Math.sqrt(c*c+h*h+p*p),Q=performance.now();if(k<=va||Q-ba<Qo)return;ba=Q;const O=k>0?-(c/k):0,$=k>0?h/k:0,Ae=window.innerWidth*Math.min(Math.max(.5+O*.42,.05),.95),Fe=window.innerHeight*Math.min(Math.max(.5+$*.42,.05),.95),St=Math.min(k-va,6);Ke(Ae,Fe,150,Math.min(.018+St*.008,.07))}function Na(){ne.granted||(ne.granted=!0,window.addEventListener("deviceorientation",Ra,D),window.addEventListener("devicemotion",Ma,D))}function Ko(){ne.granted&&(ne.granted=!1,window.removeEventListener("deviceorientation",Ra,D),window.removeEventListener("devicemotion",Ma,D))}function Ca(a){if(ne.requested||!o){q({permState:ne.requested?"requested-skip":"no-coarse-pointer"});return}if(typeof DeviceOrientationEvent<"u"&&typeof DeviceOrientationEvent.requestPermission=="function"){if(!a){q({permState:"awaiting-gesture"});return}ne.requested=!0,q({permState:"asking"}),DeviceOrientationEvent.requestPermission().then(c=>{q({permState:c}),c==="granted"?(Na(),Sa()):Ea("Motion off")}).catch(c=>{q({permState:"error",lastError:String(c?.message||c)}),ne.requested=!1,Ea("Tap to retry")});return}ne.requested=!0,Na(),Sa(),q({permState:"auto-granted-non-ios"})}const Oe={requested:!1,done:!1};let X=null,Te=0,Pa=!1;function Tt(){Pa||(Pa=!0,Xo(),Ca(!1))}function $o(){const a=wo();return!(a.off||a.coords||!("geolocation"in navigator)||!navigator.geolocation||!window.isSecureContext||po())}function jo(){if(Ta(),!$o()){Tt();return}X=document.createElement("button"),X.type="button",X.className="waxup-geo-chip hero-pill",xa(X,"Active Weather"),X.addEventListener("click",a=>{a.preventDefault(),en()},{passive:!1}),(document.querySelector(".hero-actions")||document.body).appendChild(X),q({geoState:"idle"}),Tt()}function Et(a){_a(X,a)}function Da(a){if(Te&&(window.clearTimeout(Te),Te=0),X){const i=X;X=null,i.classList.add("is-hidden"),window.setTimeout(()=>i.remove(),700)}Tt()}function Zo(){Te&&(window.clearTimeout(Te),Te=0),X?.remove(),X=null}function en(){Oe.requested||(Oe.requested=!0,window.dispatchEvent(new CustomEvent("waxup:user-took-control",{detail:{source:"geo"}})),Et("Locating…"),q({geoState:"asking"}),navigator.geolocation.getCurrentPosition(a=>{Oe.done=!0;const i=Math.round(a.coords.latitude*100)/100,c=Math.round(a.coords.longitude*100)/100;go(i,c),q({geoState:`granted ${i},${c}`}),vo({lat:i,lon:c},{force:!0}),Da()},a=>{const i=a&&a.code;i===1?(Oe.done=!0,q({geoState:"denied"}),Et("Location off"),Te=window.setTimeout(()=>Da(),3500)):(Oe.requested=!1,q({geoState:i===2?"unavailable":"timeout"}),Et("Tap to retry"))},{enableHighAccuracy:!1,timeout:8e3,maximumAge:10*60*1e3}))}function Ua(a){const i=a.detail||{};Number.isFinite(i.docTop)&&Number.isFinite(i.heightPx)?(m.docTop=i.docTop,m.heightPx=Math.max(i.heightPx,0)):Number.isFinite(i.top)&&Number.isFinite(i.height)&&(m.docTop=NaN,m.top=M(i.top,-2,3),m.height=M(i.height,0,3)),m.targetInfluence=M(i.influence),oe()}function Oa(a){const i=a.detail||{};Number.isFinite(i.docTop)&&Number.isFinite(i.heightPx)&&(ie.docTop=i.docTop,ie.heightPx=Math.max(i.heightPx,0)),ie.influence=M(i.influence),Qt=!0,oe()}function Fa(a){const i=a.detail||{},c=i.phone||{};if(R.stageProgress=M(i.stageProgress),R.stageInfluence=M(i.stageInfluence),R.scrollVelocity=M(i.scrollVelocity,-1,1),R.phone.x=M(c.x,-1,2),R.phone.y=M(c.y,-1,2),R.phone.width=M(c.width,0,2),R.phone.height=M(c.height,0,2),i.wavePin&&typeof i.wavePin=="object"){const h=i.wavePin;n.pinned=!0,n.phase=typeof h.phase=="string"&&h.phase in Ge?h.phase:"release",n.crestUv=Number.isFinite(h.crest)?h.crest:.5,n.energy=M(h.energy),n.energyTarget=n.energy,n.life=Number.isFinite(h.life)?Math.max(h.life,0):2,n.span=Number.isFinite(h.span)?M(h.span):1,n.bound=!1,n.landed=!1}else if(Number.isFinite(i.waveTravel)){const h=M(i.waveTravel);n.pinned=!0,n.phase="tease",n.crestUv=.92-h*.78,n.energy=Math.sin(h*Math.PI)*(1-h*.5),n.energyTarget=n.energy,n.life=h*4,n.span=1,n.bound=!1,n.landed=!1}oe()}function Ia(a){const i=a.detail||{},c=Number(i.x),h=Number(i.y);if(!Number.isFinite(c)||!Number.isFinite(h))return;const p=Number.isFinite(i.radius)?i.radius:70,k=Number.isFinite(i.strength)?i.strength:.12;Ke(c,h,p,k),oe()}function Wa(){if(document.hidden){et();return}oe()}function Ha(){oe()}function Ba(a){a.preventDefault(),Xe=!0,et(),yt()}function Ga(){if(!Ue){Xe=!1;try{ha()?oe():Je()}catch(a){console.error("WaterSurface failed to restore WebGL.",a),Je()}}}const D={passive:!0};function tn(){window.addEventListener("resize",ca,D),window.addEventListener("orientationchange",da,D),document.addEventListener("mousemove",ua,D),document.addEventListener("click",ma,D),document.addEventListener("touchstart",pa,D),document.addEventListener("touchmove",ga,D),document.addEventListener("touchend",wa,D),document.addEventListener("visibilitychange",Wa),window.addEventListener("pageshow",Ha,D),window.addEventListener(Qa,Fa),window.addEventListener(Xa,Ia),Mo||window.addEventListener(Va,Ua),ze===null&&window.addEventListener(Ja,Oa),z.addEventListener("webglcontextlost",Ba),z.addEventListener("webglcontextrestored",Ga),new URLSearchParams(window.location.search).has("waterChips")&&jo()}function an(){Y&&(window.clearTimeout(Y),Y=0),window.removeEventListener("resize",ca,D),window.removeEventListener("orientationchange",da,D),document.removeEventListener("mousemove",ua,D),document.removeEventListener("click",ma,D),document.removeEventListener("touchstart",pa,D),document.removeEventListener("touchmove",ga,D),document.removeEventListener("touchend",wa,D),document.removeEventListener("visibilitychange",Wa),window.removeEventListener("pageshow",Ha,D),window.removeEventListener(Qa,Fa),window.removeEventListener(Xa,Ia),window.removeEventListener(Va,Ua),window.removeEventListener(Ja,Oa),z.removeEventListener("webglcontextlost",Ba),z.removeEventListener("webglcontextrestored",Ga),Ko(),Zo(),Jo()}try{tn(),ha()?($t(),qe(),oe(),Po()):Je()}catch(a){console.error("WaterSurface failed to initialize WebGL.",a),Je()}return{destroy(){Ue=!0,Ce&&(window.clearTimeout(Ce),Ce=0),et(),an(),yt(),z.remove(),Zt(!1)},setMood(a){a&&(E=a,P=a,B=0,G=0,pe=0,re=0)},transitionToMood(a,i){if(a){if(!(i>0)){E=a,P=a,B=0,G=0,pe=0,re=0;return}P=B>=.5?E:P,E=a,B=0,G=0,pe=i,re=0}},setRainIntensity(a){const i=Math.round(Number(a));Number.isFinite(i)&&(Gt=Math.max(1,Math.min(5,i)))}}}class yn extends HTMLElement{connectedCallback(){if(this.waterMood=un(),this.baseMood=this.waterMood,this.dataset.waterMood=this.waterMood.id,this.weatherUpdatedHandler=s=>this.applyWeatherUpdate(s?.detail),window.addEventListener("waxup:weather-updated",this.weatherUpdatedHandler),this.cycleWaterHandler=()=>this.cycleWaterMood(),window.addEventListener("waxup:cycle-water",this.cycleWaterHandler),this.motionQuery=window.matchMedia(ln),this.motionHandler=()=>this.syncMotionPreference(),this.motionQuery.addEventListener?this.motionQuery.addEventListener("change",this.motionHandler):this.motionQuery.addListener(this.motionHandler),this.syncMotionPreference(),this.waterMood.id==="rain"){const s=new URLSearchParams(window.location.search),l=s.get("rainIntensity")??s.get("rain");if(l!==null&&l!==""){const d=Number.parseInt(l,10);Number.isFinite(d)&&d>=1&&d<=5&&(this.dataset.rainIntensity=String(d),this.surface?this.surface.setRainIntensity?.(d):this.pendingRainIntensity=d)}}const t=()=>{gn().then(s=>{s&&!this.cinematicActive&&this.applyMood(s.mood,s.intensity)}).catch(()=>{})},o=()=>{"requestIdleCallback"in window?window.requestIdleCallback(t,{timeout:2e3}):t()};document.readyState==="complete"?o():window.addEventListener("load",o,{once:!0})}disconnectedCallback(){this.motionQuery&&this.motionHandler&&(this.motionQuery.removeEventListener?this.motionQuery.removeEventListener("change",this.motionHandler):this.motionQuery.removeListener(this.motionHandler)),this.weatherUpdatedHandler&&window.removeEventListener("waxup:weather-updated",this.weatherUpdatedHandler),this.cycleWaterHandler&&window.removeEventListener("waxup:cycle-water",this.cycleWaterHandler),this.cancelPendingSurfaceInit(),this.destroySurface()}applyMood(t,o){t&&(this.waterMood=t,this.dataset.waterMood=t.id,typeof o=="number"?(this.dataset.rainIntensity=String(o),this.surface?this.surface.setRainIntensity?.(o):this.pendingRainIntensity=o):(delete this.dataset.rainIntensity,this.pendingRainIntensity=null),this.surface?.setMood?.(t))}cinematicTo(t,o,s){if(!this.surface)return;const l=H.find(d=>d.id===t);l&&(typeof s=="number"&&this.surface.setRainIntensity?.(s),this.surface.transitionToMood?.(l,o))}applyWeatherUpdate(t){if(this.cinematicActive&&!(t&&t.source==="browser-geo"))return;const o=new URLSearchParams(window.location.search);if(!(o.get("water")||o.get("waterMood")||o.has("rain")||o.get("simulateRain")==="1")){if(t&&t.source==="browser-geo"){const s=pn(t);s.id==="rain"?this.applyMood(s,Ct(t.weatherCode)):(this.baseMood=s,this.applyMood(s));return}if(Ft(t)){const s=H.find(l=>l.id==="rain");s&&this.applyMood(s,Ct(t.weatherCode))}else this.applyMood(this.baseMood||H[0])}}cycleWaterMood(){const t=H.findIndex(s=>s.id===this.waterMood?.id),o=H[(t+1)%H.length];o.id==="rain"?this.applyMood(o,3):(this.baseMood=o,this.applyMood(o))}syncMotionPreference(){if(this.motionQuery.matches){this.cancelPendingSurfaceInit(),this.destroySurface(),this.dataset.reducedMotion="true",this.innerHTML='<div class="water-fallback" data-water-fallback></div>';return}delete this.dataset.reducedMotion,!this.surface&&!this.surfaceInitPending&&this.scheduleSurfaceInit()}scheduleSurfaceInit(){this.surfaceInitPending=!0;const t=()=>{this._surfaceInitRaf=0,this.surfaceInitPending=!1,!(!this.isConnected||this.surface||this.motionQuery.matches)&&(this.surface=bn(this,this.waterMood||H[0]),this.pendingRainIntensity!=null&&(this.surface.setRainIntensity?.(this.pendingRainIntensity),this.pendingRainIntensity=null))};this._surfaceInitRaf=window.requestAnimationFrame(()=>{this._surfaceInitRaf=window.requestAnimationFrame(t)})}cancelPendingSurfaceInit(){this._surfaceInitRaf&&(window.cancelAnimationFrame(this._surfaceInitRaf),this._surfaceInitRaf=0),this.surfaceInitPending=!1}destroySurface(){this.surface&&(this.surface.destroy(),this.surface=null)}}customElements.get(qa)||customElements.define(qa,yn);let At=null;function xn(){At?.(),At=null;const e=document.getElementById("perf-hud");if(!e)return;const t=new URLSearchParams(window.location.search);if(!t.has("perfhud")){e.hidden=!0;return}e.hidden=!1;const o=t.has("noblur");document.documentElement.classList.toggle("perf-no-blur",o);const s=e.querySelector("[data-fps]"),l=e.querySelector("[data-frame]"),d=e.querySelector("[data-state]"),y=e.querySelector("[data-env]"),g=e.querySelector("[data-mode]"),w=[t.has("nowater")?"water:off":"",o?"blur:off":""].filter(Boolean).join(" · ");w&&(g.textContent=w,g.hidden=!1);const v=90,x=new Float32Array(v);let f=0,T=0,_=0,C=0,W=0,F=0;const he=()=>{e.classList.add("is-scrolling"),F&&clearTimeout(F),F=window.setTimeout(()=>e.classList.remove("is-scrolling"),160)},ue=()=>{y.textContent=`dpr ${window.devicePixelRatio||1} · w${window.innerWidth}`},j=Z=>{if(_&&(x[T]=Z-_,T=(T+1)%v,f<v&&f++),_=Z,Z-C>=250&&f){C=Z;let ee=0,se=0;for(let me=0;me<f;me++){const te=x[me];ee+=te,te>se&&(se=te)}const fe=ee/f,K=Math.round(1e3/fe);s.textContent=`${K} fps`,l.textContent=`frame ${fe.toFixed(0)} / ${se.toFixed(0)} ms`,d.textContent=e.classList.contains("is-scrolling")?"SCROLLING":"idle",e.classList.toggle("fps-ok",K>=50),e.classList.toggle("fps-warn",K>=30&&K<50),e.classList.toggle("fps-bad",K<30)}W=window.requestAnimationFrame(j)};ue(),window.addEventListener("scroll",he,{passive:!0}),window.addEventListener("resize",ue,{passive:!0}),W=window.requestAnimationFrame(j),At=()=>{W&&cancelAnimationFrame(W),F&&clearTimeout(F),window.removeEventListener("scroll",he),window.removeEventListener("resize",ue)}}document.addEventListener("astro:page-load",xn);const ao="[data-reveal]",_n="[data-reveal-group]",oo=".cta-pill, .hero-pill, .icon-cell",Tn="(prefers-reduced-motion: reduce)";let Rt=null;function Pt(){Rt?.(),Rt=null;const e=window.matchMedia(Tn).matches,t=new AbortController,{signal:o}=t;let s=null;const l=Array.from(document.querySelectorAll(ao));if(e||!("IntersectionObserver"in window))for(const d of l)d.classList.add("is-revealed");else if(l.length){for(const d of document.querySelectorAll(_n)){let y=0;for(const g of d.querySelectorAll(ao))g.style.setProperty("--wx-reveal-delay",`${Math.min(y,7)*75}ms`),y+=1}s=new IntersectionObserver(d=>{for(const y of d)y.isIntersecting&&(y.target.classList.add("is-revealed"),s?.unobserve(y.target))},{threshold:.12,rootMargin:"0px 0px -8% 0px"});for(const d of l)d.classList.contains("is-revealed")||s.observe(d)}if(!e){const d=new WeakMap;let y=0;const g=(w,v,x,f,T)=>{const _=performance.now();_-y<110||_-(d.get(w)??-1/0)<650||(y=_,d.set(w,_),window.dispatchEvent(new CustomEvent("waxup:water-impulse",{detail:{x:v,y:x,radius:f,strength:T}})))};window.matchMedia("(hover: hover) and (pointer: fine)").matches&&document.addEventListener("pointerover",w=>{const v=w.target?.closest?.(oo);v&&(w.relatedTarget&&v.contains(w.relatedTarget)||g(v,w.clientX,w.clientY,44,.035))},{passive:!0,signal:o}),document.addEventListener("focusin",w=>{const v=w.target?.closest?.(oo);if(!v||!w.target.matches(":focus-visible"))return;const x=v.getBoundingClientRect();g(v,x.left+x.width/2,x.top+x.height/2,48,.045)},{passive:!0,signal:o})}Rt=()=>{t.abort(),s?.disconnect(),s=null}}document.readyState!=="loading"?Pt():document.addEventListener("DOMContentLoaded",Pt,{once:!0});document.addEventListener("astro:page-load",Pt);const Re="data-astro-transition-persist";function En(e){for(const t of document.scripts)for(const o of e.scripts)if(!o.hasAttribute("data-astro-rerun")&&(!t.src&&t.textContent===o.textContent||t.src&&t.type===o.type&&t.src===o.src)){o.dataset.astroExec="";break}}function Sn(e){const t=document.documentElement,o=[...t.attributes].filter(({name:s})=>(t.removeAttribute(s),s.startsWith("data-astro-")));[...e.documentElement.attributes,...o].forEach(({name:s,value:l})=>t.setAttribute(s,l))}function kn(e){for(const t of Array.from(document.head.children)){const o=Rn(t,e);o?o.remove():t.remove()}document.head.append(...e.head.children)}function Ln(e,t){t.replaceWith(e);for(const o of t.querySelectorAll(`[${Re}]`)){const s=o.getAttribute(Re),l=e.querySelector(`[${Re}="${s}"]`);l&&(l.replaceWith(o),l.localName==="astro-island"&&Mn(o)&&!Nn(o,l)&&(o.setAttribute("ssr",""),o.setAttribute("props",l.getAttribute("props"))))}}const An=()=>{const e=document.activeElement;if(e?.closest(`[${Re}]`)){if(e instanceof HTMLInputElement||e instanceof HTMLTextAreaElement){const t=e.selectionStart,o=e.selectionEnd;return()=>Mt({activeElement:e,start:t,end:o})}return()=>Mt({activeElement:e})}else return()=>Mt({activeElement:null})},Mt=({activeElement:e,start:t,end:o})=>{e&&(e.focus(),(e instanceof HTMLInputElement||e instanceof HTMLTextAreaElement)&&(typeof t=="number"&&(e.selectionStart=t),typeof o=="number"&&(e.selectionEnd=o)))},Rn=(e,t)=>{const o=e.getAttribute(Re),s=o&&t.head.querySelector(`[${Re}="${o}"]`);if(s)return s;if(e.matches("link[rel=stylesheet]")){const l=e.getAttribute("href");return t.head.querySelector(`link[rel=stylesheet][href="${l}"]`)}return null},Mn=e=>{const t=e.dataset.astroTransitionPersistProps;return t==null||t==="false"},Nn=(e,t)=>e.getAttribute("props")===t.getAttribute("props"),Cn=e=>{En(e),Sn(e),kn(e);const t=An();Ln(e.body,document.body),t()},Pn="astro:before-preparation",Dn="astro:after-preparation",Un="astro:before-swap",On="astro:after-swap",Fn=e=>document.dispatchEvent(new Event(e));class bo extends Event{from;to;direction;navigationType;sourceElement;info;newDocument;signal;constructor(t,o,s,l,d,y,g,w,v,x){super(t,o),this.from=s,this.to=l,this.direction=d,this.navigationType=y,this.sourceElement=g,this.info=w,this.newDocument=v,this.signal=x,Object.defineProperties(this,{from:{enumerable:!0},to:{enumerable:!0,writable:!0},direction:{enumerable:!0,writable:!0},navigationType:{enumerable:!0},sourceElement:{enumerable:!0},info:{enumerable:!0},newDocument:{enumerable:!0,writable:!0},signal:{enumerable:!0}})}}class In extends bo{formData;loader;constructor(t,o,s,l,d,y,g,w,v,x){super(Pn,{cancelable:!0},t,o,s,l,d,y,g,w),this.formData=v,this.loader=x.bind(this,this),Object.defineProperties(this,{formData:{enumerable:!0},loader:{enumerable:!0,writable:!0}})}}class Wn extends bo{direction;viewTransition;swap;constructor(t,o){super(Un,void 0,t.from,t.to,t.direction,t.navigationType,t.sourceElement,t.info,t.newDocument,t.signal),this.direction=t.direction,this.viewTransition=o,this.swap=()=>Cn(this.newDocument),Object.defineProperties(this,{direction:{enumerable:!0},viewTransition:{enumerable:!0},swap:{enumerable:!0,writable:!0}})}}async function Hn(e,t,o,s,l,d,y,g,w){const v=new In(e,t,o,s,l,d,window.document,y,g,w);return document.dispatchEvent(v)&&(await v.loader(),v.defaultPrevented||(Fn(Dn),v.navigationType!=="traverse"&&It({scrollX,scrollY}))),v}function Bn(e,t){const o=new Wn(e,t);return document.dispatchEvent(o),o.swap(),o}const Gn=history.pushState.bind(history),ot=history.replaceState.bind(history),It=e=>{history.state&&(history.scrollRestoration="manual",ot({...history.state,...e},""))},Wt=!!document.startViewTransition,Ht=()=>!!document.querySelector('[name="astro-view-transitions-enabled"]'),yo=(e,t)=>e.pathname===t.pathname&&e.search===t.search;let J,Ee,st;const xo=e=>document.dispatchEvent(new Event(e)),_o=()=>xo("astro:page-load"),zn=()=>{let e=document.createElement("div");e.setAttribute("aria-live","assertive"),e.setAttribute("aria-atomic","true"),e.className="astro-route-announcer",document.body.append(e),setTimeout(()=>{let t=document.title||document.querySelector("h1")?.textContent||location.pathname;e.textContent=t},60)},no="data-astro-transition-persist",so="data-astro-transition",Dt="data-astro-transition-fallback";let ro,We=0;history.state?(We=history.state.index,scrollTo({left:history.state.scrollX,top:history.state.scrollY})):Ht()&&(ot({index:We,scrollX,scrollY},""),history.scrollRestoration="manual");async function Yn(e,t){try{const o=await fetch(e,t),l=(o.headers.get("content-type")??"").split(";",1)[0].trim();return l!=="text/html"&&l!=="application/xhtml+xml"?null:{html:await o.text(),redirected:o.redirected?o.url:void 0,mediaType:l}}catch{return null}}function To(){const e=document.querySelector('[name="astro-view-transitions-fallback"]');return e?e.getAttribute("content"):"animate"}function qn(){let e=Promise.resolve();for(const t of document.getElementsByTagName("script")){if(t.dataset.astroExec==="")continue;const o=t.getAttribute("type");if(o&&o!=="module"&&o!=="text/javascript")continue;const s=document.createElement("script");s.innerHTML=t.innerHTML;for(const l of t.attributes){if(l.name==="src"){const d=new Promise(y=>{s.onload=s.onerror=y});e=e.then(()=>d)}s.setAttribute(l.name,l.value)}s.dataset.astroExec="",t.replaceWith(s)}return e}const Eo=(e,t,o,s,l)=>{const d=yo(t,e),y=document.title;document.title=s;let g=!1;if(e.href!==location.href&&!l)if(o.history==="replace"){const w=history.state;ot({...o.state,index:w.index,scrollX:w.scrollX,scrollY:w.scrollY},"",e.href)}else Gn({...o.state,index:++We,scrollX:0,scrollY:0},"",e.href);if(document.title=y,st=e,d||(scrollTo({left:0,top:0,behavior:"instant"}),g=!0),l)scrollTo(l.scrollX,l.scrollY);else{if(e.hash){history.scrollRestoration="auto";const w=history.state;location.href=e.href,history.state||(ot(w,""),d&&window.dispatchEvent(new PopStateEvent("popstate")))}else g||scrollTo({left:0,top:0,behavior:"instant"});history.scrollRestoration="manual"}};function Qn(e){const t=[];for(const o of e.querySelectorAll("head link[rel=stylesheet]"))if(!document.querySelector(`[${no}="${o.getAttribute(no)}"], link[rel=stylesheet][href="${o.getAttribute("href")}"]`)){const s=document.createElement("link");s.setAttribute("rel","preload"),s.setAttribute("as","style"),s.setAttribute("href",o.getAttribute("href")),t.push(new Promise(l=>{["load","error"].forEach(d=>s.addEventListener(d,l)),document.head.append(s)}))}return t}async function io(e,t,o,s,l){async function d(w){function v(_){const C=_.effect;return!C||!(C instanceof KeyframeEffect)||!C.target?!1:window.getComputedStyle(C.target,C.pseudoElement).animationIterationCount==="infinite"}const x=document.getAnimations();document.documentElement.setAttribute(Dt,w);const T=document.getAnimations().filter(_=>!x.includes(_)&&!v(_));return Promise.allSettled(T.map(_=>_.finished))}if(l==="animate"&&!o.transitionSkipped&&!e.signal.aborted)try{await d("old")}catch{}const y=document.title,g=Bn(e,o.viewTransition);Eo(g.to,g.from,t,y,s),xo(On),l==="animate"&&(!o.transitionSkipped&&!g.signal.aborted?d("new").finally(()=>o.viewTransitionFinished()):o.viewTransitionFinished())}function Vn(){return J?.controller.abort(),J={controller:new AbortController}}async function So(e,t,o,s,l){const d=Vn();if(!Ht()||location.origin!==o.origin){d===J&&(J=void 0),location.href=o.href;return}const y=l?"traverse":s.history==="replace"?"replace":"push";if(y!=="traverse"&&It({scrollX,scrollY}),yo(t,o)&&(e!=="back"&&o.hash||e==="back"&&t.hash)){Eo(o,t,s,document.title,l),d===J&&(J=void 0);return}const g=await Hn(t,o,e,y,s.sourceElement,s.info,d.controller.signal,s.formData,w);if(g.defaultPrevented||g.signal.aborted){d===J&&(J=void 0),g.signal.aborted||(location.href=o.href);return}async function w(f){const T=f.to.href,_={signal:f.signal};if(f.formData){_.method="POST";const F=f.sourceElement instanceof HTMLFormElement?f.sourceElement:f.sourceElement instanceof HTMLElement&&"form"in f.sourceElement?f.sourceElement.form:f.sourceElement?.closest("form");_.body=F?.attributes.getNamedItem("enctype")?.value==="application/x-www-form-urlencoded"?new URLSearchParams(f.formData):f.formData}const C=await Yn(T,_);if(C===null){f.preventDefault();return}if(C.redirected){const F=new URL(C.redirected);if(F.origin!==f.to.origin){f.preventDefault();return}f.to=F}if(ro??=new DOMParser,f.newDocument=ro.parseFromString(C.html,C.mediaType),f.newDocument.querySelectorAll("noscript").forEach(F=>F.remove()),!f.newDocument.querySelector('[name="astro-view-transitions-enabled"]')&&!f.formData){f.preventDefault();return}const W=Qn(f.newDocument);W.length&&!f.signal.aborted&&await Promise.all(W)}async function v(){if(Ee&&Ee.viewTransition){try{Ee.viewTransition.skipTransition()}catch{}try{await Ee.viewTransition.updateCallbackDone}catch{}}return Ee={transitionSkipped:!1}}const x=await v();if(g.signal.aborted){d===J&&(J=void 0);return}if(document.documentElement.setAttribute(so,g.direction),Wt)x.viewTransition=document.startViewTransition(async()=>await io(g,s,x,l));else{const f=(async()=>{await Promise.resolve(),await io(g,s,x,l,To())})();x.viewTransition={updateCallbackDone:f,ready:f,finished:new Promise(T=>x.viewTransitionFinished=T),skipTransition:()=>{x.transitionSkipped=!0,document.documentElement.removeAttribute(Dt)}}}x.viewTransition?.updateCallbackDone.finally(async()=>{await qn(),_o(),zn()}),x.viewTransition?.finished.finally(()=>{x.viewTransition=void 0,x===Ee&&(Ee=void 0),d===J&&(J=void 0),document.documentElement.removeAttribute(so),document.documentElement.removeAttribute(Dt)});try{await x.viewTransition?.updateCallbackDone}catch(f){const T=f;console.log("[astro]",T.name,T.message,T.stack)}}async function lo(e,t){await So("forward",st,new URL(e,location.href),t??{})}function Xn(e){if(!Ht()&&e.state){location.reload();return}if(e.state===null)return;const t=history.state,o=t.index,s=o>We?"forward":"back";We=o,So(s,st,new URL(location.href),{},t)}const co=()=>{history.state&&(scrollX!==history.state.scrollX||scrollY!==history.state.scrollY)&&It({scrollX,scrollY})};{if(Wt||To()!=="none")if(st=new URL(location.href),addEventListener("popstate",Xn),addEventListener("load",_o),"onscrollend"in window)addEventListener("scrollend",co);else{let e,t,o,s;const l=()=>{if(s!==history.state?.index){clearInterval(e),e=void 0;return}if(t===scrollY&&o===scrollX){clearInterval(e),e=void 0,co();return}else t=scrollY,o=scrollX};addEventListener("scroll",()=>{e===void 0&&(s=history.state?.index,t=scrollY,o=scrollX,e=window.setInterval(l,50))},{passive:!0})}for(const e of document.getElementsByTagName("script"))e.dataset.astroExec=""}const ko=new Set,nt=new WeakSet;let Ut,Lo,ho=!1;function Jn(e){ho||(ho=!0,Ut??=e?.prefetchAll,Lo??=e?.defaultStrategy??"hover",Kn(),$n(),jn(),es())}function Kn(){for(const e of["touchstart","mousedown"])document.body.addEventListener(e,t=>{He(t.target,"tap")&&rt(t.target.href,{ignoreSlowConnection:!0})},{passive:!0})}function $n(){let e;document.body.addEventListener("focusin",s=>{He(s.target,"hover")&&t(s)},{passive:!0}),document.body.addEventListener("focusout",o,{passive:!0}),Bt(()=>{for(const s of document.getElementsByTagName("a"))nt.has(s)||He(s,"hover")&&(nt.add(s),s.addEventListener("mouseenter",t,{passive:!0}),s.addEventListener("mouseleave",o,{passive:!0}))});function t(s){const l=s.target.href;e&&clearTimeout(e),e=setTimeout(()=>{rt(l)},80)}function o(){e&&(clearTimeout(e),e=0)}}function jn(){let e;Bt(()=>{for(const t of document.getElementsByTagName("a"))nt.has(t)||He(t,"viewport")&&(nt.add(t),e??=Zn(),e.observe(t))})}function Zn(){const e=new WeakMap;return new IntersectionObserver((t,o)=>{for(const s of t){const l=s.target,d=e.get(l);s.isIntersecting?(d&&clearTimeout(d),e.set(l,setTimeout(()=>{o.unobserve(l),e.delete(l),rt(l.href)},300))):d&&(clearTimeout(d),e.delete(l))}})}function es(){Bt(()=>{for(const e of document.getElementsByTagName("a"))He(e,"load")&&rt(e.href)})}function rt(e,t){e=e.replace(/#.*/,"");const o=t?.ignoreSlowConnection??!1;if(ts(e,o))if(ko.add(e),document.createElement("link").relList?.supports?.("prefetch")&&t?.with!=="fetch"){const s=document.createElement("link");s.rel="prefetch",s.setAttribute("href",e),document.head.append(s)}else fetch(e,{priority:"low"})}function ts(e,t){if(!navigator.onLine||!t&&Ao())return!1;try{const o=new URL(e,location.href);return location.origin===o.origin&&(location.pathname!==o.pathname||location.search!==o.search)&&!ko.has(e)}catch{}return!1}function He(e,t){if(e?.tagName!=="A")return!1;const o=e.dataset.astroPrefetch;return o==="false"?!1:t==="tap"&&(o!=null||Ut)&&Ao()?!0:o==null&&Ut||o===""?t===Lo:o===t}function Ao(){if("connection"in navigator){const e=navigator.connection;return e.saveData||/2g/.test(e.effectiveType)}return!1}function Bt(e){e();let t=!1;document.addEventListener("astro:page-load",()=>{if(!t){t=!0;return}e()})}function as(){const e=document.querySelector('[name="astro-view-transitions-fallback"]');return e?e.getAttribute("content"):"animate"}function uo(e){return e.dataset.astroReload!==void 0}(Wt||as()!=="none")&&(document.addEventListener("click",e=>{let t=e.target;if(e.composed&&(t=e.composedPath()[0]),t instanceof Element&&(t=t.closest("a, area")),!(t instanceof HTMLAnchorElement)&&!(t instanceof SVGAElement)&&!(t instanceof HTMLAreaElement))return;const o=t instanceof HTMLElement?t.target:t.target.baseVal,s=t instanceof HTMLElement?t.href:t.href.baseVal,l=new URL(s,location.href).origin;uo(t)||t.hasAttribute("download")||!t.href||o&&o!=="_self"||l!==location.origin||e.button!==0||e.metaKey||e.ctrlKey||e.altKey||e.shiftKey||e.defaultPrevented||(e.preventDefault(),lo(s,{history:t.dataset.astroHistory==="replace"?"replace":"auto",sourceElement:t}))}),document.addEventListener("submit",e=>{let t=e.target;if(t.tagName!=="FORM"||e.defaultPrevented||uo(t))return;const o=t,s=e.submitter,l=new FormData(o,s),d=typeof o.action=="string"?o.action:o.getAttribute("action"),y=typeof o.method=="string"?o.method:o.getAttribute("method");let g=s?.getAttribute("formaction")??d??location.pathname;const w=s?.getAttribute("formmethod")??y??"get";if(w==="dialog"||location.origin!==new URL(g,location.href).origin)return;const v={sourceElement:s??o};if(w==="get"){const x=new URLSearchParams(l),f=new URL(g);f.search=x.toString(),g=f.toString()}else v.formData=l;e.preventDefault(),lo(g,v)}),Jn({prefetchAll:!0}));
