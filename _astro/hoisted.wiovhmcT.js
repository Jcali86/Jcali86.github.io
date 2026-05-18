let G=null;function Xe(){G?.(),G=null;const e=new AbortController,{signal:t}=e,n=()=>{const r=window.getComputedStyle(document.documentElement).getPropertyValue("--top-nav-clearance");return Number.parseFloat(r)||112},a=()=>{const r=document.querySelector("#phone-stage");if(!r){document.body.classList.remove("nav-logo-docked");return}const c=r.getBoundingClientRect(),h=n(),l=h+window.innerHeight*.18,s=c.top<=l&&c.bottom>h;document.body.classList.toggle("nav-logo-docked",s)};window.addEventListener("scroll",a,{passive:!0,signal:t}),window.addEventListener("resize",a,{passive:!0,signal:t}),document.addEventListener("visibilitychange",a,{signal:t}),a(),G=()=>{e.abort(),document.body.classList.remove("nav-logo-docked")}}document.addEventListener("astro:page-load",Xe);document.readyState!=="loading"&&Xe();const xe="waxup-water-surface",ot="(prefers-reduced-motion: reduce)",nt="(pointer: coarse)",Ee="waxup:water-choreography",$="waxup-water-mood-v1",Te="waxup-water-last-mood-v1",P=[{id:"tropical-glass",value:0},{id:"bay-fog",value:1},{id:"marine-layer",value:2},{id:"sunbreak",value:3}],at=new Map([["tropical","tropical-glass"],["glass","tropical-glass"],["teal","tropical-glass"],["bay","bay-fog"],["fog","bay-fog"],["foggy","bay-fog"],["grey","bay-fog"],["gray","bay-fog"],["marine","marine-layer"],["overcast","marine-layer"],["pacific","marine-layer"],["sun","sunbreak"],["clear","sunbreak"]]);function K(e){if(!e)return null;const t=e.toLowerCase().trim(),n=at.get(t)||t;return P.find(a=>a.id===n)||null}function Re(e,t){if(!e)return null;try{return e.getItem(t)}catch{return null}}function Q(e,t,n){if(e)try{e.setItem(t,n)}catch{}}function Ae(e){try{return window[e]}catch{return null}}function rt(e){if(window.crypto?.getRandomValues){const t=new Uint32Array(1);return window.crypto.getRandomValues(t),t[0]%e}return Math.floor(Math.random()*e)}function it(){const e=new URLSearchParams(window.location.search),t=K(e.get("water")||e.get("waterMood")),n=Ae("sessionStorage"),a=Ae("localStorage");if(t)return Q(n,$,t.id),t;const r=K(Re(n,$));if(r)return r;const c=K(Re(a,Te)),h=c?P.filter(s=>s.id!==c.id):P,l=h[rt(h.length)]||P[0];return Q(n,$,l.id),Q(a,Te,l.id),l}const Le=`
    attribute vec2 a_position;

    varying vec2 v_uv;

    void main() {
      v_uv = a_position * 0.5 + 0.5;
      gl_Position = vec4(a_position, 0.0, 1.0);
    }
  `,st=`
    precision highp float;

    uniform sampler2D u_state;
    uniform vec2 u_texel;
    uniform vec2 u_pointer;
    uniform float u_aspect;
    uniform float u_strength;
    uniform float u_radius;
    uniform vec4 u_phone;
    uniform vec4 u_choreo;

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
      float next = ((north + south + east + west) * 0.5 - previous) * 0.989;

      // Pointer impulses are intentionally soft-edged. The slight negative ring
      // keeps a click from becoming a big mound of light; it starts as a small
      // displacement that the wave equation turns into an outward ripple.
      vec2 pointerDelta = vec2((v_uv.x - u_pointer.x) * u_aspect, v_uv.y - u_pointer.y);
      float normalizedDistance = dot(pointerDelta, pointerDelta) / max(u_radius * u_radius, 0.00001);
      float pointerFalloff = exp(-normalizedDistance * 2.6) * (1.0 - normalizedDistance * 1.15);
      next += pointerFalloff * u_strength;

      float stageInfluence = clamp(u_choreo.y, 0.0, 1.0);
      float velocity = clamp(u_choreo.z, -1.0, 1.0);
      float velocityAmount = min(abs(velocity), 1.0);
      float waveTravel = clamp(u_choreo.w, 0.0, 1.0);
      float waveEnvelope = sin(waveTravel * 3.14159265);
      float hasPhone = step(0.01, u_phone.z * u_phone.w);

      float phoneLeft = u_phone.x;
      float phoneRight = u_phone.x + u_phone.z;
      float phoneTop = 1.0 - u_phone.y;
      float phoneBottom = 1.0 - (u_phone.y + u_phone.w);
      float phoneCenterX = phoneLeft + u_phone.z * 0.5;
      float phoneCenterY = (phoneTop + phoneBottom) * 0.5;
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
      float trailingEdge = velocity >= 0.0 ? phoneBottom : phoneTop;
      float leadingEdge = velocity >= 0.0 ? phoneTop : phoneBottom;
      float trailingBand = 1.0 - smoothstep(0.0, 0.15, abs(v_uv.y - trailingEdge));
      float leadingBand = 1.0 - smoothstep(0.0, 0.12, abs(v_uv.y - leadingEdge));
      float widthBand = 1.0 - smoothstep(u_phone.z * 0.16, u_phone.z * 0.82, abs(v_uv.x - phoneCenterX));
      float wakeSigned = sin((v_uv.y - trailingEdge) * 42.0 + v_uv.x * 12.0);
      float entrySigned = sin((v_uv.y - leadingEdge) * 34.0 - v_uv.x * 8.0);
      next += hasPhone * stageInfluence * velocityAmount * (
        sideBand * verticalInside * 0.0040 +
        trailingBand * widthBand * wakeSigned * 0.0058 -
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
      next = mix(next, current * 0.72, hullInside * 0.92);
      next += (hullRim * 0.005 + leadingPressure * 0.010 + sidePressure * 0.002) * hullFlow;
      next -= leadingPressure * 0.003 * (1.0 - velocityAmount);

      // Primary swell as a tall height-field bump (bell curve, not a flat
      // band). Pushed hard into the simulation so the wave equation
      // propagates it with real volume — the render shader's normal-based
      // lighting then paints the depth naturally instead of looking like
      // a horizontal reflection stripe. Lateral noise wobbles the wave
      // line so it doesn't read as a straight ruler edge.
      float broadWaveY = 0.90 - waveTravel * 0.62;
      float broadNoiseLateral = sin(v_uv.x * 7.5 + waveTravel * 3.6) * 0.028 +
        sin(v_uv.x * 19.0 - waveTravel * 5.1) * 0.012;
      float waveOffset = (v_uv.y - broadWaveY + broadNoiseLateral) * 7.5;
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
      next += (broadWave + broadTrough) * (0.018 + broadNoise * 0.004) * waveEnvelope * hullWaveGate;

      // Bow wake — large-vessel Kelvin pattern: a churning apex at the
      // phone's leading edge with two divergent arms spreading outward,
      // plus a darker trough trailing each arm. The apex carries the most
      // displaced water; arms taper as they reach away from the bow.
      // Ambient baseline — even with no scroll, the phone is sitting in
      // water, so the bow always has a tiny constant displacement so the
      // visual doesn't collapse to nothing between active moments.
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
      float lowerBowMotion = clamp(stageInfluence * (0.035 + velocityAmount * 0.46 + waveEnvelope * velocityAmount * 0.18), 0.0, 0.62);
      next += hasPhone * lowerBowMotion * (
        lowerCrest * 0.034 +
        lowerArm * 0.017 -
        lowerTrough * 0.013
      );

      gl_FragColor = vec4(next * 0.5 + 0.5, current * 0.5 + 0.5, 0.0, 1.0);
    }
  `,lt=`
    precision highp float;

    uniform sampler2D u_state;
    uniform vec2 u_texel;
    uniform vec2 u_resolution;
    uniform float u_time;
    uniform float u_mood;
    uniform vec4 u_phone;
    uniform vec4 u_choreo;

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

    vec3 moodColor(vec3 tropical, vec3 bayFog, vec3 marineLayer, vec3 sunbreak) {
      if (u_mood < 0.5) {
        return tropical;
      }

      if (u_mood < 1.5) {
        return bayFog;
      }

      if (u_mood < 2.5) {
        return marineLayer;
      }

      return sunbreak;
    }

    float moodFloat(float tropical, float bayFog, float marineLayer, float sunbreak) {
      if (u_mood < 0.5) {
        return tropical;
      }

      if (u_mood < 1.5) {
        return bayFog;
      }

      if (u_mood < 2.5) {
        return marineLayer;
      }

      return sunbreak;
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

    float oceanNoise(vec2 p) {
      float low = noise(p);
      float mid = noise(p * 2.17 + low * 1.8);
      float high = noise(p * 4.41 - mid * 1.2);
      return low * 0.52 + mid * 0.31 + high * 0.17;
    }

    float roundedRectSdf(vec2 point, vec2 halfSize, float radius) {
      vec2 q = abs(point) - halfSize + vec2(radius);
      return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - radius;
    }

    float brokenCaustic(vec2 uv, vec2 direction, float scale, float speed, float phase) {
      vec2 dir = normalize(direction);
      float current = oceanNoise(uv * 2.4 + dir * phase + u_time * 0.018);
      float wave = sin(dot(uv + current * 0.18, dir) * scale + u_time * speed + phase);
      float strand = pow(max(1.0 - abs(wave), 0.0), 6.2);
      float breakup = smoothstep(
        0.42,
        0.86,
        oceanNoise(uv * 5.6 + vec2(phase, -phase) + u_time * 0.012)
      );

      return strand * breakup;
    }

    float causticField(vec2 uv) {
      float t = u_time * 0.048;
      vec2 warp = vec2(
        oceanNoise(uv * 1.75 + vec2(t * 0.7, -0.4)),
        oceanNoise(uv * 1.35 + vec2(1.9, -t * 0.6))
      ) - 0.5;
      vec2 drift = vec2(sin(t * 0.9), cos(t * 0.7)) * 0.025;
      vec2 q = uv + warp * 0.24 + drift;

      float shimmer = 0.0;
      shimmer += brokenCaustic(q, vec2(0.94, 0.34), 33.0, 0.050, 0.4) * 0.44;
      shimmer += brokenCaustic(q + warp.yx * 0.42, vec2(-0.18, 0.98), 43.0, -0.042, 2.1) * 0.30;
      shimmer += brokenCaustic(q * 1.08 + drift.yx, vec2(0.54, 0.84), 25.0, 0.034, 4.2) * 0.26;

      float patch = smoothstep(0.18, 0.78, oceanNoise(q * 1.18 + vec2(t * 0.32, -t * 0.18)));
      return smoothstep(0.13, 0.58, shimmer * (0.26 + patch * 0.74));
    }

    void main() {
      float aspect = u_resolution.x / max(u_resolution.y, 1.0);
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
      vec2 hullPoint = vec2((v_uv.x - phoneCenterX) * aspect, v_uv.y - phoneCenterY);
      vec2 hullHalf = vec2(max(u_phone.z * aspect * 0.5, 0.001), max(u_phone.w * 0.5, 0.001));
      float hullRadius = min(hullHalf.x, hullHalf.y) * 0.18;
      float hullSdf = roundedRectSdf(hullPoint, hullHalf, hullRadius);
      float hullOutside = smoothstep(-0.006, 0.020, hullSdf);
      float hullRim = (1.0 - smoothstep(0.0, 0.052, abs(hullSdf))) * hullOutside * hasPhone * stageInfluence;
      float hullShadow = (1.0 - smoothstep(0.0, 0.135, hullSdf)) * hullOutside * hasPhone * stageInfluence;
      float trailingEdge = scrollVelocity >= 0.0 ? phoneBottom : phoneTop;
      float leadingEdge = scrollVelocity >= 0.0 ? phoneTop : phoneBottom;
      float sideContact = (
        1.0 - smoothstep(0.0, 0.12, abs(v_uv.x - phoneLeft)) +
        1.0 - smoothstep(0.0, 0.12, abs(v_uv.x - phoneRight))
      ) * smoothstep(phoneBottom - 0.06, phoneBottom + 0.16, v_uv.y) *
        (1.0 - smoothstep(phoneTop - 0.18, phoneTop + 0.08, v_uv.y));
      float phoneWidthBand = 1.0 - smoothstep(u_phone.z * 0.22, u_phone.z * 0.9, abs(v_uv.x - phoneCenterX));
      float trailingWake = (1.0 - smoothstep(0.0, 0.18, abs(v_uv.y - trailingEdge))) * phoneWidthBand;
      float leadingPush = (1.0 - smoothstep(0.0, 0.12, abs(v_uv.y - leadingEdge))) * phoneWidthBand;
      float heroSwell = (1.0 - stageInfluence) *
        smoothstep(0.52, 0.92, sin(v_uv.y * 7.5 + oceanNoise(v_uv * 2.0 + vec2(0.0, u_time * 0.026)) * 2.4 + u_time * 0.17) * 0.5 + 0.5);
      float broadWaveY = 0.90 - waveTravel * 0.62;
      float broadWave = (1.0 - smoothstep(0.0, 0.18, abs(v_uv.y - broadWaveY))) *
        (0.55 + 0.45 * oceanNoise(vec2(v_uv.x * 3.8, u_time * 0.035)));

      // Height gradients become normals for the water surface. A tiny
      // procedural swell is added here so untouched water stays alive without
      // constantly injecting energy into the simulation texture.
      float slow = u_time * 0.052;
      float microX = sin((v_uv.x * 15.0 + v_uv.y * 4.0) + slow) * 0.009;
      float microY = cos((v_uv.y * 19.0 - v_uv.x * 3.0) - slow * 0.86) * 0.009 +
        heroSwell * 0.014 +
        hasPhone * stageInfluence * velocityAmount * (trailingWake - leadingPush * 0.35) * 0.012;
      vec3 normal = normalize(vec3(
        -((east - west) * aspect * 4.8 + microX),
        -((north - south) * 4.8 + microY),
        1.0
      ));

      // One slow light source drifts over roughly a minute. The warmth is
      // intentionally tiny; tropical teal and cyan-white caustics carry this
      // pass, while the brand/logo own the warmer notes.
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

      float crest = smoothstep(0.012, 0.105, abs(center));
      vec2 waterUv = vec2((v_uv.x - 0.5) * aspect + 0.5, v_uv.y);
      vec2 phoneFlow = vec2(
        (smoothstep(0.0, 0.13, abs(v_uv.x - phoneLeft)) - smoothstep(0.0, 0.13, abs(v_uv.x - phoneRight))) * 0.004,
        -scrollVelocity * trailingWake * 0.018
      ) * hasPhone * stageInfluence * velocityAmount;
      vec2 refractedUv = waterUv + normal.xy * vec2(0.050, 0.034) + center * vec2(0.032, 0.020) + phoneFlow;
      float caustic = causticField(refractedUv);
      float lightCaustic = pow(smoothstep(0.62, 0.985, light), 3.2);
      float causticLift = (
        caustic * moodFloat(0.074, 0.024, 0.045, 0.061) +
        lightCaustic * moodFloat(0.026, 0.012, 0.017, 0.023)
      ) * (0.48 + centerGlow * moodFloat(0.28, 0.12, 0.20, 0.24) + heroSwell * 0.18);
      float foamLift = smoothstep(0.070, 0.180, abs(center)) * moodFloat(0.07, 0.035, 0.052, 0.062);
      float wakeLift = hasPhone * stageInfluence * velocityAmount *
        (trailingWake * 0.050 + sideContact * 0.030 + leadingPush * 0.016);
      // Crest highlight only on the leading face of the swell — the side
      // facing the direction of travel — and a soft trough shadow behind
      // it. The light/dark asymmetry is what makes the band read as a
      // moving wave with mass instead of a flat pool reflection.
      float broadNoiseR = sin(v_uv.x * 7.5 + waveTravel * 3.6) * 0.028 +
        sin(v_uv.x * 19.0 - waveTravel * 5.1) * 0.012;
      float waveOffsetR = (v_uv.y - broadWaveY + broadNoiseR) * 7.5;
      float broadWaveR = exp(-waveOffsetR * waveOffsetR);
      float waveAhead = smoothstep(0.0, 0.06, broadWaveY - v_uv.y + broadNoiseR);
      float waveBehind = smoothstep(0.0, 0.10, v_uv.y - broadWaveY + broadNoiseR);
      float crestHighlight = broadWaveR * waveAhead * waveEnvelope;
      float troughShadow = broadWaveR * waveBehind * waveEnvelope;
      float waveContactR = 1.0 - smoothstep(0.0, 0.14, abs(broadWaveY - leadingEdge));
      float hullWaveMask = mix(
        1.0,
        smoothstep(u_phone.z * 0.43, u_phone.z * 0.82, abs(v_uv.x - phoneCenterX)),
        hasPhone * stageInfluence * waveContactR * 0.92
      );
      float bigWaveLift = crestHighlight * 0.080 * hullWaveMask;
      float waveSplitSide = (
        exp(-pow((v_uv.x - (phoneLeft - u_phone.z * 0.10)) / 0.055, 2.0)) +
        exp(-pow((v_uv.x - (phoneRight + u_phone.z * 0.10)) / 0.055, 2.0))
      ) * broadWaveR * waveEnvelope * waveContactR * hasPhone * stageInfluence;
      float hullFlow = clamp(0.26 + velocityAmount * 0.24 + waveEnvelope * waveContactR * 0.22, 0.0, 0.82);
      float hullLeadingPressure = exp(-pow((v_uv.y - leadingEdge) / 0.056, 2.0)) *
        (1.0 - smoothstep(u_phone.z * 0.43, u_phone.z * 0.76, abs(v_uv.x - phoneCenterX))) *
        hullOutside * hasPhone * stageInfluence;
      float hullSidePressure = sideContact * hullOutside * hasPhone * stageInfluence;

      // Bow wake — ship-scale Kelvin pattern. Two divergent arms +
      // heavy apex churn at the bow itself + foam shoulders behind the
      // inner arm. Reads as a large vessel cutting water, not a thin
      // highlight on the surface.
      float bowAmbientR = stageInfluence * 0.018;
      float bowMotionR = clamp(bowAmbientR + velocityAmount * 0.12 + waveEnvelope * waveContactR * 0.16, 0.0, 0.38);
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

      // A small warm glint keeps the brand sunrise present without turning
      // the surrounding water into a moving sunset wash.
      float warmGlint = pow(smoothstep(0.78, 1.0, light), 6.6) * verticalLift * moodFloat(0.010, 0.002, 0.004, 0.008);

      vec3 color = water;
      color += moodCaustic * causticLift;
      color += moodElectric * crest * moodFloat(0.052, 0.026, 0.038, 0.047);
      color += moodCaustic * foamLift;
      color += moodCaustic * (wakeLift * 0.58 + bigWaveLift);
      // Trough shadow gives the wave depth — subtle subtractive band on
      // the back side of the crest so the swell looks like it has mass.
      color *= mix(1.0, 0.86, troughShadow * 0.22);
      color *= mix(1.0, 0.72, hullShadow * 0.22 + hullLeadingPressure * 0.08);
      color += moodCaustic * (hullRim * 0.070 + hullLeadingPressure * 0.090 + waveSplitSide * 0.050) * hullFlow;
      color += moodElectric * (hullSidePressure * 0.030 + waveSplitSide * 0.028) * hullFlow;
      color += moodElectric * (sideContact * hasPhone * stageInfluence * velocityAmount * 0.018);
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
      color += c_sun * warmGlint;

      float fogAmount = moodFloat(0.0, 0.22, 0.10, 0.04) * (0.34 + verticalLift * 0.45) * (1.0 - centerGlow * 0.16);
      vec3 fogColor = moodColor(vec3(0.0), vec3(0.550, 0.612, 0.600), vec3(0.350, 0.490, 0.480), vec3(0.400, 0.580, 0.590));
      color = mix(color, fogColor, fogAmount);

      // Keep the edges calm so the component can sit behind any page without
      // fighting foreground content.
      float edgeShade = smoothstep(0.0, 0.22, v_uv.x) *
        smoothstep(1.0, 0.78, v_uv.x) *
        smoothstep(0.0, 0.20, v_uv.y) *
        smoothstep(1.0, 0.76, v_uv.y);
      color *= mix(0.74, 1.0, edgeShade);

      gl_FragColor = vec4(color, 1.0);
    }
  `;function Se(e,t,n){const a=e.createShader(t);if(!a)throw new Error("Unable to create water shader.");if(e.shaderSource(a,n),e.compileShader(a),!e.getShaderParameter(a,e.COMPILE_STATUS)){const r=e.getShaderInfoLog(a)||"Unknown shader compile error.";throw e.deleteShader(a),new Error(r)}return a}function De(e,t,n){const a=Se(e,e.VERTEX_SHADER,t),r=Se(e,e.FRAGMENT_SHADER,n),c=e.createProgram();if(!c)throw new Error("Unable to create water shader program.");if(e.attachShader(c,a),e.attachShader(c,r),e.linkProgram(c),e.deleteShader(a),e.deleteShader(r),!e.getProgramParameter(c,e.LINK_STATUS)){const h=e.getProgramInfoLog(c)||"Unknown shader link error.";throw e.deleteProgram(c),new Error(h)}return c}function ct(e,t=P[0]){const n=window.matchMedia(nt).matches,a=n&&(navigator.hardwareConcurrency||8)<=4,r=n||a?256:512,c=t,h=document.createElement("canvas"),l={x:.5,y:.5,move:0,impulse:0,radius:32},s={stageProgress:0,stageInfluence:0,scrollVelocity:0,waveTravel:0,waveActive:!1,phone:{x:.5,y:.5,width:0,height:0}};let o=null,f=0,d=0,y=1,p=1,g=null,w=null,v=null,L=null,A=null,S=null,I=!1,B=!1;const b={},_={};h.setAttribute("aria-hidden","true"),h.className="water-canvas",e.textContent="",e.append(h);function N(){O(),V(),e.textContent="",e.dataset.fallback="true";const i=document.createElement("div");i.className="water-fallback",i.dataset.waterFallback="",e.append(i)}function ae(i,u){l.x=Math.min(Math.max(i/Math.max(window.innerWidth,1),0),1),l.y=1-Math.min(Math.max(u/Math.max(window.innerHeight,1),0),1)}function Ke(i){return i/Math.max(window.innerHeight,1)}function R(i,u=0,m=1){return Math.min(Math.max(Number.isFinite(i)?i:u,u),m)}function re(i,u,m,T){ae(i,u),l.radius=m,l.move=Math.max(l.move,T)}function ie(i,u,m,T){ae(i,u),l.radius=m,l.impulse=Math.max(l.impulse,T)}function se(i,u){const m=o.createTexture(),T=o.createFramebuffer();if(!m||!T)throw new Error("Unable to create water render target.");o.bindTexture(o.TEXTURE_2D,m),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MIN_FILTER,o.NEAREST),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MAG_FILTER,o.NEAREST),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_WRAP_S,o.CLAMP_TO_EDGE),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_WRAP_T,o.CLAMP_TO_EDGE),o.texImage2D(o.TEXTURE_2D,0,o.RGBA,i,i,0,o.RGBA,u,null),o.bindFramebuffer(o.FRAMEBUFFER,T),o.framebufferTexture2D(o.FRAMEBUFFER,o.COLOR_ATTACHMENT0,o.TEXTURE_2D,m,0);const k=o.checkFramebufferStatus(o.FRAMEBUFFER)===o.FRAMEBUFFER_COMPLETE;return{texture:m,framebuffer:T,complete:k}}function X(i){!o||!i||(o.deleteTexture(i.texture),o.deleteFramebuffer(i.framebuffer))}function le(i){const u=se(r,i),m=se(r,i);if(!(u.complete&&m.complete))return X(u),X(m),!1;A=u,S=m;for(const k of[A,S])o.bindFramebuffer(o.FRAMEBUFFER,k.framebuffer),o.viewport(0,0,r,r),o.clearColor(.5,.5,0,1),o.clear(o.COLOR_BUFFER_BIT);return!0}function Qe(){const i=o.getExtension("OES_texture_half_float"),u=o.getExtension("EXT_color_buffer_half_float");return i&&u?i.HALF_FLOAT_OES:o.UNSIGNED_BYTE}function je(){b.state=o.getUniformLocation(w,"u_state"),b.texel=o.getUniformLocation(w,"u_texel"),b.pointer=o.getUniformLocation(w,"u_pointer"),b.aspect=o.getUniformLocation(w,"u_aspect"),b.strength=o.getUniformLocation(w,"u_strength"),b.radius=o.getUniformLocation(w,"u_radius"),b.phone=o.getUniformLocation(w,"u_phone"),b.choreo=o.getUniformLocation(w,"u_choreo"),_.state=o.getUniformLocation(v,"u_state"),_.texel=o.getUniformLocation(v,"u_texel"),_.resolution=o.getUniformLocation(v,"u_resolution"),_.time=o.getUniformLocation(v,"u_time"),_.mood=o.getUniformLocation(v,"u_mood"),_.phone=o.getUniformLocation(v,"u_phone"),_.choreo=o.getUniformLocation(v,"u_choreo")}function ce(i){const u=o.getAttribLocation(i,"a_position");o.bindBuffer(o.ARRAY_BUFFER,L),o.enableVertexAttribArray(u),o.vertexAttribPointer(u,2,o.FLOAT,!1,0,0)}function U(){const i=Math.min(window.devicePixelRatio||1,n?1.5:2);y=Math.max(Math.floor(window.innerWidth*i),1),p=Math.max(Math.floor(window.innerHeight*i),1),(h.width!==y||h.height!==p)&&(h.width=y,h.height=p)}function Je(i,u){o.bindFramebuffer(o.FRAMEBUFFER,S.framebuffer),o.viewport(0,0,r,r),o.useProgram(w),ce(w),o.activeTexture(o.TEXTURE0),o.bindTexture(o.TEXTURE_2D,A.texture),o.uniform1i(b.state,0),o.uniform2f(b.texel,1/r,1/r),o.uniform2f(b.pointer,l.x,l.y),o.uniform1f(b.aspect,window.innerWidth/Math.max(window.innerHeight,1)),o.uniform1f(b.strength,i),o.uniform1f(b.radius,u),o.uniform4f(b.phone,s.phone.x,s.phone.y,s.phone.width,s.phone.height),o.uniform4f(b.choreo,s.stageProgress,s.stageInfluence,s.scrollVelocity,s.waveTravel),o.drawArrays(o.TRIANGLE_STRIP,0,4);const m=A;A=S,S=m}function Ze(i){o.bindFramebuffer(o.FRAMEBUFFER,null),o.viewport(0,0,y,p),o.useProgram(v),ce(v),o.activeTexture(o.TEXTURE0),o.bindTexture(o.TEXTURE_2D,A.texture),o.uniform1i(_.state,0),o.uniform2f(_.texel,1/r,1/r),o.uniform2f(_.resolution,y,p),o.uniform1f(_.time,i),o.uniform1f(_.mood,c.value),o.uniform4f(_.phone,s.phone.x,s.phone.y,s.phone.width,s.phone.height),o.uniform4f(_.choreo,s.stageProgress,s.stageInfluence,s.scrollVelocity,s.waveTravel),o.drawArrays(o.TRIANGLE_STRIP,0,4)}function ue(i){if(document.hidden||I||B||!o){f=0;return}const u=i*.001,m=d?Math.min((i-d)*.001,.05):.016;d=i,U(),s.waveActive&&(s.waveTravel+=m/1.55,s.waveTravel>=1&&(s.waveActive=!1,s.waveTravel=0));const T=Math.min(l.move+l.impulse,.16),k=Ke(l.radius);Je(T,k),Ze(u),l.move*=Math.pow(.035,m/.3),l.impulse*=Math.pow(.015,m/.1),s.scrollVelocity*=Math.pow(.03,m/.72),f=window.requestAnimationFrame(ue)}function H(){!f&&!document.hidden&&!I&&!B&&o&&(d=0,f=window.requestAnimationFrame(ue))}function O(){f&&(window.cancelAnimationFrame(f),f=0)}function V(){o&&(X(A),X(S),L&&o.deleteBuffer(L),w&&o.deleteProgram(w),v&&o.deleteProgram(v),A=null,S=null,L=null,w=null,v=null,o=null)}function he(){if(o=h.getContext("webgl",{alpha:!1,antialias:!1,depth:!1,stencil:!1,powerPreference:"high-performance",preserveDrawingBuffer:!1}),!o)return!1;if(g=Qe(),w=De(o,Le,st),v=De(o,Le,lt),L=o.createBuffer(),!L)throw new Error("Unable to create water vertex buffer.");if(o.bindBuffer(o.ARRAY_BUFFER,L),o.bufferData(o.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),o.STATIC_DRAW),!le(g)&&(g=o.UNSIGNED_BYTE,!le(g)))throw new Error("Unable to initialize water render targets.");return je(),U(),e.removeAttribute("data-fallback"),!0}function de(i){re(i.clientX,i.clientY,35,.0092)}let fe=0;function me(i){performance.now()-fe<650||ie(i.clientX,i.clientY,n?58:50,.042)}function ve(i){const u=i.changedTouches[0];u&&(fe=performance.now(),ie(u.clientX,u.clientY,58,.03))}function we(i){if(a)return;const u=i.changedTouches[0];u&&re(u.clientX,u.clientY,48,.01)}function pe(){l.move=Math.min(l.move,.018)}function ge(i){const u=i.detail||{},m=u.phone||{};s.stageProgress=R(u.stageProgress),s.stageInfluence=R(u.stageInfluence),s.scrollVelocity=R(u.scrollVelocity,-1,1),s.phone.x=R(m.x,-1,2),s.phone.y=R(m.y,-1,2),s.phone.width=R(m.width,0,2),s.phone.height=R(m.height,0,2),Number.isFinite(u.waveTravel)?(s.waveActive=!1,s.waveTravel=R(u.waveTravel)):R(u.waveKick)>.2&&(s.waveActive=!0,s.waveTravel=.001),H()}function be(){if(document.hidden){O();return}H()}function ye(i){i.preventDefault(),B=!0,O(),V()}function _e(){if(!I){B=!1;try{he()?H():N()}catch(i){console.error("WaterSurface failed to restore WebGL.",i),N()}}}const x={passive:!0};function et(){window.addEventListener("resize",U,x),document.addEventListener("mousemove",de,x),document.addEventListener("click",me,x),document.addEventListener("touchstart",ve,x),document.addEventListener("touchmove",we,x),document.addEventListener("touchend",pe,x),document.addEventListener("visibilitychange",be),window.addEventListener(Ee,ge),h.addEventListener("webglcontextlost",ye),h.addEventListener("webglcontextrestored",_e)}function tt(){window.removeEventListener("resize",U,x),document.removeEventListener("mousemove",de,x),document.removeEventListener("click",me,x),document.removeEventListener("touchstart",ve,x),document.removeEventListener("touchmove",we,x),document.removeEventListener("touchend",pe,x),document.removeEventListener("visibilitychange",be),window.removeEventListener(Ee,ge),h.removeEventListener("webglcontextlost",ye),h.removeEventListener("webglcontextrestored",_e)}try{et(),he()?H():N()}catch(i){console.error("WaterSurface failed to initialize WebGL.",i),N()}return{destroy(){I=!0,O(),tt(),V(),h.remove()}}}class ut extends HTMLElement{connectedCallback(){this.waterMood=it(),this.dataset.waterMood=this.waterMood.id,this.motionQuery=window.matchMedia(ot),this.motionHandler=()=>this.syncMotionPreference(),this.motionQuery.addEventListener?this.motionQuery.addEventListener("change",this.motionHandler):this.motionQuery.addListener(this.motionHandler),this.syncMotionPreference()}disconnectedCallback(){this.motionQuery&&this.motionHandler&&(this.motionQuery.removeEventListener?this.motionQuery.removeEventListener("change",this.motionHandler):this.motionQuery.removeListener(this.motionHandler)),this.destroySurface()}syncMotionPreference(){if(this.motionQuery.matches){this.destroySurface(),this.dataset.reducedMotion="true",this.innerHTML='<div class="water-fallback" data-water-fallback></div>';return}delete this.dataset.reducedMotion,this.surface||(this.surface=ct(this,this.waterMood||P[0]))}destroySurface(){this.surface&&(this.surface.destroy(),this.surface=null)}}customElements.get(xe)||customElements.define(xe,ut);const C="data-astro-transition-persist";function ht(e){for(const t of document.scripts)for(const n of e.scripts)if(!n.hasAttribute("data-astro-rerun")&&(!t.src&&t.textContent===n.textContent||t.src&&t.type===n.type&&t.src===n.src)){n.dataset.astroExec="";break}}function dt(e){const t=document.documentElement,n=[...t.attributes].filter(({name:a})=>(t.removeAttribute(a),a.startsWith("data-astro-")));[...e.documentElement.attributes,...n].forEach(({name:a,value:r})=>t.setAttribute(a,r))}function ft(e){for(const t of Array.from(document.head.children)){const n=wt(t,e);n?n.remove():t.remove()}document.head.append(...e.head.children)}function mt(e,t){t.replaceWith(e);for(const n of t.querySelectorAll(`[${C}]`)){const a=n.getAttribute(C),r=e.querySelector(`[${C}="${a}"]`);r&&(r.replaceWith(n),r.localName==="astro-island"&&pt(n)&&!gt(n,r)&&(n.setAttribute("ssr",""),n.setAttribute("props",r.getAttribute("props"))))}}const vt=()=>{const e=document.activeElement;if(e?.closest(`[${C}]`)){if(e instanceof HTMLInputElement||e instanceof HTMLTextAreaElement){const t=e.selectionStart,n=e.selectionEnd;return()=>j({activeElement:e,start:t,end:n})}return()=>j({activeElement:e})}else return()=>j({activeElement:null})},j=({activeElement:e,start:t,end:n})=>{e&&(e.focus(),(e instanceof HTMLInputElement||e instanceof HTMLTextAreaElement)&&(typeof t=="number"&&(e.selectionStart=t),typeof n=="number"&&(e.selectionEnd=n)))},wt=(e,t)=>{const n=e.getAttribute(C),a=n&&t.head.querySelector(`[${C}="${n}"]`);if(a)return a;if(e.matches("link[rel=stylesheet]")){const r=e.getAttribute("href");return t.head.querySelector(`link[rel=stylesheet][href="${r}"]`)}return null},pt=e=>{const t=e.dataset.astroTransitionPersistProps;return t==null||t==="false"},gt=(e,t)=>e.getAttribute("props")===t.getAttribute("props"),bt=e=>{ht(e),dt(e),ft(e);const t=vt();mt(e.body,document.body),t()},yt="astro:before-preparation",_t="astro:after-preparation",xt="astro:before-swap",Et="astro:after-swap",Tt=e=>document.dispatchEvent(new Event(e));class Ue extends Event{from;to;direction;navigationType;sourceElement;info;newDocument;signal;constructor(t,n,a,r,c,h,l,s,o,f){super(t,n),this.from=a,this.to=r,this.direction=c,this.navigationType=h,this.sourceElement=l,this.info=s,this.newDocument=o,this.signal=f,Object.defineProperties(this,{from:{enumerable:!0},to:{enumerable:!0,writable:!0},direction:{enumerable:!0,writable:!0},navigationType:{enumerable:!0},sourceElement:{enumerable:!0},info:{enumerable:!0},newDocument:{enumerable:!0,writable:!0},signal:{enumerable:!0}})}}class Rt extends Ue{formData;loader;constructor(t,n,a,r,c,h,l,s,o,f){super(yt,{cancelable:!0},t,n,a,r,c,h,l,s),this.formData=o,this.loader=f.bind(this,this),Object.defineProperties(this,{formData:{enumerable:!0},loader:{enumerable:!0,writable:!0}})}}class At extends Ue{direction;viewTransition;swap;constructor(t,n){super(xt,void 0,t.from,t.to,t.direction,t.navigationType,t.sourceElement,t.info,t.newDocument,t.signal),this.direction=t.direction,this.viewTransition=n,this.swap=()=>bt(this.newDocument),Object.defineProperties(this,{direction:{enumerable:!0},viewTransition:{enumerable:!0},swap:{enumerable:!0,writable:!0}})}}async function Lt(e,t,n,a,r,c,h,l,s){const o=new Rt(e,t,n,a,r,c,window.document,h,l,s);return document.dispatchEvent(o)&&(await o.loader(),o.defaultPrevented||(Tt(_t),o.navigationType!=="traverse"&&ee({scrollX,scrollY}))),o}function St(e,t){const n=new At(e,t);return document.dispatchEvent(n),n.swap(),n}const Dt=history.pushState.bind(history),W=history.replaceState.bind(history),ee=e=>{history.state&&(history.scrollRestoration="manual",W({...history.state,...e},""))},te=!!document.startViewTransition,oe=()=>!!document.querySelector('[name="astro-view-transitions-enabled"]'),He=(e,t)=>e.pathname===t.pathname&&e.search===t.search;let E,D,Y;const Oe=e=>document.dispatchEvent(new Event(e)),We=()=>Oe("astro:page-load"),Pt=()=>{let e=document.createElement("div");e.setAttribute("aria-live","assertive"),e.setAttribute("aria-atomic","true"),e.className="astro-route-announcer",document.body.append(e),setTimeout(()=>{let t=document.title||document.querySelector("h1")?.textContent||location.pathname;e.textContent=t},60)},Pe="data-astro-transition-persist",Ce="data-astro-transition",J="data-astro-transition-fallback";let ke,F=0;history.state?(F=history.state.index,scrollTo({left:history.state.scrollX,top:history.state.scrollY})):oe()&&(W({index:F,scrollX,scrollY},""),history.scrollRestoration="manual");async function Ct(e,t){try{const n=await fetch(e,t),r=(n.headers.get("content-type")??"").split(";",1)[0].trim();return r!=="text/html"&&r!=="application/xhtml+xml"?null:{html:await n.text(),redirected:n.redirected?n.url:void 0,mediaType:r}}catch{return null}}function ze(){const e=document.querySelector('[name="astro-view-transitions-fallback"]');return e?e.getAttribute("content"):"animate"}function kt(){let e=Promise.resolve();for(const t of document.getElementsByTagName("script")){if(t.dataset.astroExec==="")continue;const n=t.getAttribute("type");if(n&&n!=="module"&&n!=="text/javascript")continue;const a=document.createElement("script");a.innerHTML=t.innerHTML;for(const r of t.attributes){if(r.name==="src"){const c=new Promise(h=>{a.onload=a.onerror=h});e=e.then(()=>c)}a.setAttribute(r.name,r.value)}a.dataset.astroExec="",t.replaceWith(a)}return e}const Ye=(e,t,n,a,r)=>{const c=He(t,e),h=document.title;document.title=a;let l=!1;if(e.href!==location.href&&!r)if(n.history==="replace"){const s=history.state;W({...n.state,index:s.index,scrollX:s.scrollX,scrollY:s.scrollY},"",e.href)}else Dt({...n.state,index:++F,scrollX:0,scrollY:0},"",e.href);if(document.title=h,Y=e,c||(scrollTo({left:0,top:0,behavior:"instant"}),l=!0),r)scrollTo(r.scrollX,r.scrollY);else{if(e.hash){history.scrollRestoration="auto";const s=history.state;location.href=e.href,history.state||(W(s,""),c&&window.dispatchEvent(new PopStateEvent("popstate")))}else l||scrollTo({left:0,top:0,behavior:"instant"});history.scrollRestoration="manual"}};function Ft(e){const t=[];for(const n of e.querySelectorAll("head link[rel=stylesheet]"))if(!document.querySelector(`[${Pe}="${n.getAttribute(Pe)}"], link[rel=stylesheet][href="${n.getAttribute("href")}"]`)){const a=document.createElement("link");a.setAttribute("rel","preload"),a.setAttribute("as","style"),a.setAttribute("href",n.getAttribute("href")),t.push(new Promise(r=>{["load","error"].forEach(c=>a.addEventListener(c,r)),document.head.append(a)}))}return t}async function Fe(e,t,n,a,r){async function c(s){function o(p){const g=p.effect;return!g||!(g instanceof KeyframeEffect)||!g.target?!1:window.getComputedStyle(g.target,g.pseudoElement).animationIterationCount==="infinite"}const f=document.getAnimations();document.documentElement.setAttribute(J,s);const y=document.getAnimations().filter(p=>!f.includes(p)&&!o(p));return Promise.allSettled(y.map(p=>p.finished))}if(r==="animate"&&!n.transitionSkipped&&!e.signal.aborted)try{await c("old")}catch{}const h=document.title,l=St(e,n.viewTransition);Ye(l.to,l.from,t,h,a),Oe(Et),r==="animate"&&(!n.transitionSkipped&&!l.signal.aborted?c("new").finally(()=>n.viewTransitionFinished()):n.viewTransitionFinished())}function Mt(){return E?.controller.abort(),E={controller:new AbortController}}async function qe(e,t,n,a,r){const c=Mt();if(!oe()||location.origin!==n.origin){c===E&&(E=void 0),location.href=n.href;return}const h=r?"traverse":a.history==="replace"?"replace":"push";if(h!=="traverse"&&ee({scrollX,scrollY}),He(t,n)&&(e!=="back"&&n.hash||e==="back"&&t.hash)){Ye(n,t,a,document.title,r),c===E&&(E=void 0);return}const l=await Lt(t,n,e,h,a.sourceElement,a.info,c.controller.signal,a.formData,s);if(l.defaultPrevented||l.signal.aborted){c===E&&(E=void 0),l.signal.aborted||(location.href=n.href);return}async function s(d){const y=d.to.href,p={signal:d.signal};if(d.formData){p.method="POST";const v=d.sourceElement instanceof HTMLFormElement?d.sourceElement:d.sourceElement instanceof HTMLElement&&"form"in d.sourceElement?d.sourceElement.form:d.sourceElement?.closest("form");p.body=v?.attributes.getNamedItem("enctype")?.value==="application/x-www-form-urlencoded"?new URLSearchParams(d.formData):d.formData}const g=await Ct(y,p);if(g===null){d.preventDefault();return}if(g.redirected){const v=new URL(g.redirected);if(v.origin!==d.to.origin){d.preventDefault();return}d.to=v}if(ke??=new DOMParser,d.newDocument=ke.parseFromString(g.html,g.mediaType),d.newDocument.querySelectorAll("noscript").forEach(v=>v.remove()),!d.newDocument.querySelector('[name="astro-view-transitions-enabled"]')&&!d.formData){d.preventDefault();return}const w=Ft(d.newDocument);w.length&&!d.signal.aborted&&await Promise.all(w)}async function o(){if(D&&D.viewTransition){try{D.viewTransition.skipTransition()}catch{}try{await D.viewTransition.updateCallbackDone}catch{}}return D={transitionSkipped:!1}}const f=await o();if(l.signal.aborted){c===E&&(E=void 0);return}if(document.documentElement.setAttribute(Ce,l.direction),te)f.viewTransition=document.startViewTransition(async()=>await Fe(l,a,f,r));else{const d=(async()=>{await Promise.resolve(),await Fe(l,a,f,r,ze())})();f.viewTransition={updateCallbackDone:d,ready:d,finished:new Promise(y=>f.viewTransitionFinished=y),skipTransition:()=>{f.transitionSkipped=!0,document.documentElement.removeAttribute(J)}}}f.viewTransition?.updateCallbackDone.finally(async()=>{await kt(),We(),Pt()}),f.viewTransition?.finished.finally(()=>{f.viewTransition=void 0,f===D&&(D=void 0),c===E&&(E=void 0),document.documentElement.removeAttribute(Ce),document.documentElement.removeAttribute(J)});try{await f.viewTransition?.updateCallbackDone}catch(d){const y=d;console.log("[astro]",y.name,y.message,y.stack)}}async function Me(e,t){await qe("forward",Y,new URL(e,location.href),t??{})}function It(e){if(!oe()&&e.state){location.reload();return}if(e.state===null)return;const t=history.state,n=t.index,a=n>F?"forward":"back";F=n,qe(a,Y,new URL(location.href),{},t)}const Ie=()=>{history.state&&(scrollX!==history.state.scrollX||scrollY!==history.state.scrollY)&&ee({scrollX,scrollY})};{if(te||ze()!=="none")if(Y=new URL(location.href),addEventListener("popstate",It),addEventListener("load",We),"onscrollend"in window)addEventListener("scrollend",Ie);else{let e,t,n,a;const r=()=>{if(a!==history.state?.index){clearInterval(e),e=void 0;return}if(t===scrollY&&n===scrollX){clearInterval(e),e=void 0,Ie();return}else t=scrollY,n=scrollX};addEventListener("scroll",()=>{e===void 0&&(a=history.state?.index,t=scrollY,n=scrollX,e=window.setInterval(r,50))},{passive:!0})}for(const e of document.getElementsByTagName("script"))e.dataset.astroExec=""}const Ve=new Set,z=new WeakSet;let Z,Ge,Be=!1;function Bt(e){Be||(Be=!0,Z??=e?.prefetchAll,Ge??=e?.defaultStrategy??"hover",Nt(),Xt(),Ut(),Ot())}function Nt(){for(const e of["touchstart","mousedown"])document.body.addEventListener(e,t=>{M(t.target,"tap")&&q(t.target.href,{ignoreSlowConnection:!0})},{passive:!0})}function Xt(){let e;document.body.addEventListener("focusin",a=>{M(a.target,"hover")&&t(a)},{passive:!0}),document.body.addEventListener("focusout",n,{passive:!0}),ne(()=>{for(const a of document.getElementsByTagName("a"))z.has(a)||M(a,"hover")&&(z.add(a),a.addEventListener("mouseenter",t,{passive:!0}),a.addEventListener("mouseleave",n,{passive:!0}))});function t(a){const r=a.target.href;e&&clearTimeout(e),e=setTimeout(()=>{q(r)},80)}function n(){e&&(clearTimeout(e),e=0)}}function Ut(){let e;ne(()=>{for(const t of document.getElementsByTagName("a"))z.has(t)||M(t,"viewport")&&(z.add(t),e??=Ht(),e.observe(t))})}function Ht(){const e=new WeakMap;return new IntersectionObserver((t,n)=>{for(const a of t){const r=a.target,c=e.get(r);a.isIntersecting?(c&&clearTimeout(c),e.set(r,setTimeout(()=>{n.unobserve(r),e.delete(r),q(r.href)},300))):c&&(clearTimeout(c),e.delete(r))}})}function Ot(){ne(()=>{for(const e of document.getElementsByTagName("a"))M(e,"load")&&q(e.href)})}function q(e,t){e=e.replace(/#.*/,"");const n=t?.ignoreSlowConnection??!1;if(Wt(e,n))if(Ve.add(e),document.createElement("link").relList?.supports?.("prefetch")&&t?.with!=="fetch"){const a=document.createElement("link");a.rel="prefetch",a.setAttribute("href",e),document.head.append(a)}else fetch(e,{priority:"low"})}function Wt(e,t){if(!navigator.onLine||!t&&$e())return!1;try{const n=new URL(e,location.href);return location.origin===n.origin&&(location.pathname!==n.pathname||location.search!==n.search)&&!Ve.has(e)}catch{}return!1}function M(e,t){if(e?.tagName!=="A")return!1;const n=e.dataset.astroPrefetch;return n==="false"?!1:t==="tap"&&(n!=null||Z)&&$e()?!0:n==null&&Z||n===""?t===Ge:n===t}function $e(){if("connection"in navigator){const e=navigator.connection;return e.saveData||/2g/.test(e.effectiveType)}return!1}function ne(e){e();let t=!1;document.addEventListener("astro:page-load",()=>{if(!t){t=!0;return}e()})}function zt(){const e=document.querySelector('[name="astro-view-transitions-fallback"]');return e?e.getAttribute("content"):"animate"}function Ne(e){return e.dataset.astroReload!==void 0}(te||zt()!=="none")&&(document.addEventListener("click",e=>{let t=e.target;if(e.composed&&(t=e.composedPath()[0]),t instanceof Element&&(t=t.closest("a, area")),!(t instanceof HTMLAnchorElement)&&!(t instanceof SVGAElement)&&!(t instanceof HTMLAreaElement))return;const n=t instanceof HTMLElement?t.target:t.target.baseVal,a=t instanceof HTMLElement?t.href:t.href.baseVal,r=new URL(a,location.href).origin;Ne(t)||t.hasAttribute("download")||!t.href||n&&n!=="_self"||r!==location.origin||e.button!==0||e.metaKey||e.ctrlKey||e.altKey||e.shiftKey||e.defaultPrevented||(e.preventDefault(),Me(a,{history:t.dataset.astroHistory==="replace"?"replace":"auto",sourceElement:t}))}),document.addEventListener("submit",e=>{let t=e.target;if(t.tagName!=="FORM"||e.defaultPrevented||Ne(t))return;const n=t,a=e.submitter,r=new FormData(n,a),c=typeof n.action=="string"?n.action:n.getAttribute("action"),h=typeof n.method=="string"?n.method:n.getAttribute("method");let l=a?.getAttribute("formaction")??c??location.pathname;const s=a?.getAttribute("formmethod")??h??"get";if(s==="dialog"||location.origin!==new URL(l,location.href).origin)return;const o={sourceElement:a??n};if(s==="get"){const f=new URLSearchParams(r),d=new URL(l);d.search=f.toString(),l=d.toString()}else o.formData=r;e.preventDefault(),Me(l,o)}),Bt({prefetchAll:!0}));
