parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"ZYE2":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = void 0;
function init() {
    let bready = () => { };
    let bstop = () => { };
    return {
        getInput,
        setActive,
        setInactive,
    };
    function setActive(ready, stop) {
        bready = ready;
        bstop = stop;
        window.addEventListener('gamepadconnected', onConnected, false);
        window.addEventListener('gamepaddisconnected', onDisconncted, false);
    }
    function setInactive() {
        window.removeEventListener('gamepadconnected', onConnected, false);
        window.removeEventListener('gamepaddisconnected', onDisconncted, false);
    }
    function onConnected({ gamepad }) {
        console.log('connected', gamepad);
        bready();
    }
    function onDisconncted({ gamepad }) {
        console.log('disconnected', gamepad);
        bstop();
    }
}
exports.init = init;
function getInput() {
    const gamepads = navigator.getGamepads();
    if (!gamepads)
        return;
    const gamepad = Object.values(gamepads).find((gp) => gp);
    if (!gamepad)
        return;
    const axes = {
        x: gamepad.axes[0],
        y: gamepad.axes[1],
    };
    return {
        axes,
        fire: [0, 5, 7].map((i) => gamepad.buttons[i]).some((button) => button.pressed),
    };
}

},{}],"a0DS":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lerp = exports.clamp = void 0;
function clamp(min, max, v) {
    return v > max ? max : v < min ? min : v;
}
exports.clamp = clamp;
function lerp(start, end, v) {
    return start + (end - start) * v;
}
exports.lerp = lerp;

},{}],"H74X":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.distance = exports.mulFactor = exports.subtract = exports.add = exports.dot = exports.lerp = exports.slerp = exports.magnitude = exports.normalize = void 0;
const math_1 = require("./math");
function normalize(vector) {
    const mag = magnitude(vector);
    return {
        x: mag ? vector.x / mag : 0,
        y: mag ? vector.y / mag : 0,
    };
}
exports.normalize = normalize;
function magnitude(vector) {
    return Math.sqrt(Math.pow(vector.x, 2) + Math.pow(vector.y, 2));
}
exports.magnitude = magnitude;
function slerp(start, end, percent) {
    percent = (0, math_1.clamp)(0, 1, percent);
    const dt = dot(start, end);
    const theta = Math.acos(dt) * percent;
    const relative = normalize(subtract(end, mulFactor(start, dt)));
    return normalize(add(mulFactor(start, Math.cos(theta)), mulFactor(relative, Math.sin(theta))));
}
exports.slerp = slerp;
function lerp(start, end, percent) {
    return {
        x: (0, math_1.lerp)(start.x, end.x, percent),
        y: (0, math_1.lerp)(start.y, end.y, percent),
    };
}
exports.lerp = lerp;
function dot(a, b) {
    return a.x * b.x + a.y * b.y;
}
exports.dot = dot;
function add(a, b) {
    return {
        x: a.x + b.x,
        y: a.y + b.y,
    };
}
exports.add = add;
function subtract(a, b) {
    return {
        x: a.x - b.x,
        y: a.y - b.y,
    };
}
exports.subtract = subtract;
function mulFactor(vector, factor) {
    return {
        x: vector.x * factor,
        y: vector.y * factor,
    };
}
exports.mulFactor = mulFactor;
function distance(a, b) {
    return magnitude({
        x: a.x - b.x,
        y: a.y - b.y,
    });
}
exports.distance = distance;

},{"./math":"a0DS"}],"I6xn":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = void 0;
const vector_1 = require("../math/vector");
let position = {
    x: 0,
    y: 0,
};
let fire = false;
function init() {
    const joystick = document.querySelector('#joystick');
    const handle = document.querySelector('#handle');
    const plane = document.querySelector('#mobile-plane');
    const fireButton = document.querySelector('#button-fire');
    return {
        getInput,
        setActive,
        setInactive,
    };
    function setActive(ready) {
        handle.addEventListener('touchstart', onHandleGrab);
        handle.addEventListener('touchend', onHandleRelease);
        plane.addEventListener('touchmove', onMove);
        fireButton.addEventListener('touchstart', onFireGrab, false);
        fireButton.addEventListener('touchend', onFireRelease, false);
        fireButton.removeEventListener('touchcancel', onFireRelease, false);
        plane.hidden = false;
        ready();
    }
    function setInactive() {
        handle.removeEventListener('touchstart', onHandleGrab);
        handle.removeEventListener('touchend', onHandleRelease);
        plane.removeEventListener('touchmove', onMove);
        fireButton.removeEventListener('touchstart', onFireGrab);
        fireButton.removeEventListener('touchend', onFireRelease);
        fireButton.removeEventListener('touchcancel', onFireRelease);
        plane.hidden = true;
    }
    function onMove(event) {
        event.preventDefault();
        if (!moving)
            return;
        const touch = event.touches[0];
        const rect = joystick.getBoundingClientRect();
        const x = touch.pageX - (rect.x + rect.width / 2);
        const y = touch.pageY - (rect.y + rect.height / 2);
        const { x: nx, y: ny } = (0, vector_1.normalize)({ x, y });
        position = {
            x: nx,
            y: ny,
        };
        handle.style.transform = `translate(${nx * 56.26}px, ${ny * 56.25}px)`;
    }
}
exports.init = init;
let moving = false;
function getInput() {
    return {
        axes: position,
        fire,
    };
}
function onHandleGrab() {
    moving = true;
}
function onHandleRelease() {
    moving = false;
}
function onFireGrab() {
    fire = true;
}
function onFireRelease() {
    fire = false;
}

},{"../math/vector":"H74X"}],"PMJo":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = void 0;
const vector_1 = require("../math/vector");
let position = {
    x: 0,
    y: 0,
};
let fire = false;
function init() {
    const canvas = document.querySelector('#canvas');
    return {
        getInput,
        setActive(ready) {
            canvas.addEventListener('mousedown', onMouseDown);
            canvas.addEventListener('mouseup', onMouseUp);
            canvas.addEventListener('mousemove', onMouseMove);
            ready();
        },
        setInactive() {
            canvas.removeEventListener('mousedown', onMouseDown);
            canvas.removeEventListener('mouseup', onMouseUp);
            canvas.removeEventListener('mousemove', onMouseMove);
        },
    };
    function onMouseDown() {
        fire = true;
    }
    function onMouseUp() {
        fire = false;
    }
    function onMouseMove({ clientX, clientY }) {
        const rect = canvas.getBoundingClientRect();
        const x = clientX - (rect.x + rect.width / 2);
        const y = clientY - (rect.y + rect.height / 2);
        const norm = (0, vector_1.normalize)({ x, y });
        position = norm;
    }
}
exports.init = init;
function getInput() {
    return {
        axes: position,
        fire: fire,
    };
}

},{"../math/vector":"H74X"}],"ftuY":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = exports.InputSource = void 0;
const gamepad_1 = require("./gamepad");
const mobile_1 = require("./mobile");
const mouse_1 = require("./mouse");
;
var InputSource;
(function (InputSource) {
    InputSource["Gamepad"] = "Gamepad";
    InputSource["Mouse"] = "Mouse";
    InputSource["Mobile"] = "Mobile";
})(InputSource = exports.InputSource || (exports.InputSource = {}));
let inputSource = null;
let inputFunction = null;
function init(source, ready, stop) {
    const gamepad = (0, gamepad_1.init)();
    const mouse = (0, mouse_1.init)();
    const mobile = (0, mobile_1.init)();
    setInputSource(source);
    return {
        getInput,
        setInputSource,
        getInputSource,
    };
    function setInputSource(source) {
        inputSource = source;
        if (inputFunction) {
            inputFunction.setInactive();
        }
        inputFunction = getInputFunction(source);
        inputFunction.setActive(ready, stop);
    }
    function getInputFunction(source) {
        switch (source) {
            case InputSource.Gamepad:
                return gamepad;
            case InputSource.Mobile:
                return mobile;
            case InputSource.Mouse:
                return mouse;
        }
    }
}
exports.init = init;
function getInput() {
    return inputFunction.getInput();
}
function getInputSource() {
    return inputSource;
}

},{"./gamepad":"ZYE2","./mobile":"I6xn","./mouse":"PMJo"}],"FxBD":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ENEMY_SPAWN_COOLDOWN = exports.CENTER_RADIUS = exports.PARTICLE_SPEED = exports.PARTICLE_SIZE = exports.PARTICLE_LIFESPAN = exports.PLAYER_OFFSET = exports.PLAYER_SIZE = exports.WORLD_SIZE = exports.ENEMY_SIZE = exports.GAMEPAD_EPSILON = exports.PLAYER_SPEED = exports.PROJECTILE_SIZE = exports.PROJECTILE_SPEED = exports.FIRE_COOLDOWN = void 0;
exports.FIRE_COOLDOWN = 0.1;
exports.PROJECTILE_SPEED = 1000;
exports.PROJECTILE_SIZE = 5;
exports.PLAYER_SPEED = 10;
exports.GAMEPAD_EPSILON = 0.3;
exports.ENEMY_SIZE = 20;
exports.WORLD_SIZE = 1000;
exports.PLAYER_SIZE = 20;
exports.PLAYER_OFFSET = 50;
exports.PARTICLE_LIFESPAN = 1;
exports.PARTICLE_SIZE = 5;
exports.PARTICLE_SPEED = 5;
exports.CENTER_RADIUS = 70;
exports.ENEMY_SPAWN_COOLDOWN = 1;

},{}],"CNOl":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.distance = exports.toPolarVector = exports.toVector = void 0;
const vector_1 = require("./vector");
function toVector(polarVector) {
    return {
        x: polarVector.radius * Math.cos(polarVector.angle),
        y: polarVector.radius * Math.sin(polarVector.angle),
    };
}
exports.toVector = toVector;
function toPolarVector(vector) {
    return {
        radius: (0, vector_1.magnitude)(vector),
        angle: Math.atan2(vector.y, vector.x),
    };
}
exports.toPolarVector = toPolarVector;
function distance(a, b) {
    return Math.sqrt(a.radius ** 2 + b.radius ** 2 - 2 * a.radius * b.radius * Math.cos(a.angle - b.angle));
}
exports.distance = distance;

},{"./vector":"H74X"}],"XLY6":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toRelativeVector = void 0;
const config_1 = require("./config");
const polar_vector_1 = require("./math/polar-vector");
function toRelativeVector(polarVector) {
    const vec = (0, polar_vector_1.toVector)(polarVector);
    return {
        x: vec.x + config_1.WORLD_SIZE / 2,
        y: vec.y + config_1.WORLD_SIZE / 2
    };
}
exports.toRelativeVector = toRelativeVector;

},{"./config":"FxBD","./math/polar-vector":"CNOl"}],"cUPp":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = void 0;
const config_1 = require("./config");
const world_1 = require("./world");
function init($canvas) {
    const ctx = $canvas.getContext('2d');
    ctx.globalCompositeOperation = 'source-atop';
    return {
        draw: (data) => draw($canvas, ctx, data)
    };
}
exports.init = init;
const colors = {
    enemy: `hsl(120, 100%, 50%)`,
    particle: `hsl(300, 100%, 50%)`,
    center: `hsl(260, 100%, 50%)`,
    player: `hsl(0, 100%, 50%)`,
    projectile: `hsl(60, 100%, 50%)`,
};
function draw($canvas, ctx, { playerPosition, projectiles, enemies, particles }) {
    ctx.globalCompositeOperation = 'source-over';
    ctx.clearRect(0, 0, $canvas.width, $canvas.height);
    drawCenter();
    drawPlayer();
    drawProjectiles();
    drawEnemies();
    drawParticles();
    drawMask();
    function drawMask() {
        const mask = ctx.createRadialGradient(config_1.WORLD_SIZE / 2, config_1.WORLD_SIZE / 2, config_1.WORLD_SIZE * 0.4, config_1.WORLD_SIZE / 2, config_1.WORLD_SIZE / 2, config_1.WORLD_SIZE / 2);
        mask.addColorStop(0, '#ffff');
        mask.addColorStop(1, '#0000');
        ctx.globalCompositeOperation = 'destination-in';
        ctx.fillStyle = mask;
        ctx.fillRect(0, 0, config_1.WORLD_SIZE, config_1.WORLD_SIZE);
    }
    function drawCenter() {
        drawCircle($canvas.width / 2, $canvas.height / 2, 5, colors.center);
        drawCircle($canvas.width / 2, $canvas.height / 2, config_1.CENTER_RADIUS, colors.center, true);
    }
    function drawPlayer() {
        drawCircle(playerPosition.x + $canvas.width / 2, playerPosition.y + $canvas.height / 2, config_1.PLAYER_SIZE, colors.player);
    }
    function drawProjectiles() {
        for (const projectile of projectiles) {
            const vector = (0, world_1.toRelativeVector)(projectile.position);
            drawCircle(vector.x, vector.y, config_1.PROJECTILE_SIZE, colors.projectile);
        }
    }
    function drawEnemies() {
        for (const enemy of enemies) {
            const vector = (0, world_1.toRelativeVector)(enemy.position);
            drawCircle(vector.x, vector.y, config_1.ENEMY_SIZE, colors.enemy);
        }
    }
    function drawParticles() {
        for (const particle of particles) {
            const color = `rgba(255, 0, 255, ${1 - particle.age / config_1.PARTICLE_LIFESPAN})`;
            drawCircle(particle.position.x, particle.position.y, config_1.PARTICLE_SIZE, color);
        }
    }
    function drawCircle(x, y, r, color, hollow) {
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.closePath();
        ctx.shadowColor = color;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.shadowBlur = 10;
        if (hollow) {
            ctx.strokeStyle = color;
            ctx.lineWidth = 3;
            ctx.stroke();
        }
        else {
            ctx.fillStyle = color;
            ctx.fill();
        }
        // reset
        ctx.shadowBlur = 0;
    }
}

},{"./config":"FxBD","./world":"XLY6"}],"vBK0":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getValue = exports.advanceEnemy = exports.createEnemy = exports.Type = void 0;
const config_1 = require("./config");
var Type;
(function (Type) {
    Type["Basic"] = "Basic";
    Type["Spinner"] = "Spinner";
    Type["ZigZag"] = "ZigZag";
    Type["Oscillator"] = "Oscillator";
})(Type = exports.Type || (exports.Type = {}));
function createEnemy(type, position) {
    const pos = position || { angle: Math.random() * Math.PI * 2, radius: config_1.WORLD_SIZE };
    return {
        age: 0,
        initialPosition: pos,
        position: pos,
        type,
        direction: [-1, 1][Math.random() * 2 | 0]
    };
}
exports.createEnemy = createEnemy;
function advanceEnemy(data) {
    data.enemy.age += data.deltaTime;
    data.enemy.position = movePatterns[data.enemy.type](data);
}
exports.advanceEnemy = advanceEnemy;
const movePatterns = {
    Basic({ enemy, deltaTime }) {
        const newPos = {
            angle: enemy.position.angle,
            radius: enemy.position.radius - deltaTime * 100
        };
        return newPos;
    },
    Spinner({ enemy, deltaTime }) {
        const newPos = {
            angle: enemy.position.angle + enemy.direction * deltaTime * 1,
            radius: enemy.position.radius - deltaTime * 100
        };
        return newPos;
    },
    ZigZag({ enemy, deltaTime }) {
        const angle = enemy.initialPosition.angle + enemy.direction * Math.sin(enemy.age) * Math.PI;
        const newPos = {
            angle,
            radius: enemy.position.radius - deltaTime * 50
        };
        return newPos;
    },
    Oscillator({ enemy, deltaTime }) {
        const angle = enemy.position.angle + enemy.direction * deltaTime * 1;
        const radius = Math.sin(enemy.age * 10) * 50 + config_1.WORLD_SIZE / 2 - enemy.age * 50;
        const newPos = {
            angle,
            radius
        };
        return newPos;
    }
};
function getValue(type) {
    const values = {
        [Type.Basic]: 5,
        [Type.Spinner]: 10,
        [Type.ZigZag]: 15,
        [Type.Oscillator]: 20
    };
    return values[type];
}
exports.getValue = getValue;

},{"./config":"FxBD"}],"GomQ":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPaticle = exports.createBoom = void 0;
const polar_vector_1 = require("./math/polar-vector");
const config_1 = require("./config");
function createBoom(position, count = 32) {
    const particles = [];
    const alpha = Math.PI * 2 / count;
    for (let i = 0; i < count; i += 1) {
        particles.push(createPaticle(position, (0, polar_vector_1.toVector)({ angle: alpha * i, radius: config_1.PARTICLE_SPEED })));
    }
    return particles;
}
exports.createBoom = createBoom;
function createPaticle(position, velocity) {
    return {
        age: 0,
        position,
        velocity
    };
}
exports.createPaticle = createPaticle;

},{"./math/polar-vector":"CNOl","./config":"FxBD"}],"DVlx":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = void 0;
const config_1 = require("./config");
const enemy_1 = require("./enemy");
const polar_vector_1 = require("./math/polar-vector");
const vector_1 = require("./math/vector");
const particle_1 = require("./particle");
const world_1 = require("./world");
let currentPosition = {
    x: 0,
    y: 1
};
let destination = {
    x: 0,
    y: 1
};
let gameOver = false;
const particles = [];
const projectiles = [];
const enemies = [
    (0, enemy_1.createEnemy)(enemy_1.Type.Basic),
];
let fireTimer = 0;
let spawnTimer = 0;
function init() {
    return {
        calculate
    };
}
exports.init = init;
function calculate({ input, deltaTime, addPoints }) {
    for (const pKey in particles) {
        const particle = particles[pKey];
        particle.age += deltaTime;
        if (particle.age > config_1.PARTICLE_LIFESPAN) {
            particles.splice(+pKey, 1);
            continue;
        }
        particle.position = (0, vector_1.add)(particle.position, particle.velocity);
    }
    if (!gameOver) {
        const mag = (0, vector_1.magnitude)(input.axes);
        if (mag > config_1.GAMEPAD_EPSILON) {
            destination = (0, vector_1.normalize)(input.axes);
        }
        currentPosition = (0, vector_1.slerp)(currentPosition, destination, deltaTime * config_1.PLAYER_SPEED);
        fireTimer += deltaTime;
        if (input.fire && fireTimer > config_1.FIRE_COOLDOWN) {
            fireTimer = 0;
            projectiles.push({
                position: { ...(0, polar_vector_1.toPolarVector)((0, vector_1.mulFactor)(currentPosition, 50)) }
            });
        }
        spawnTimer += deltaTime;
        if (spawnTimer > config_1.ENEMY_SPAWN_COOLDOWN) {
            spawnTimer = 0;
            const angle = Math.random() * Math.PI * 2;
            const types = Object.values(enemy_1.Type);
            enemies.push((0, enemy_1.createEnemy)(types[Math.random() * types.length | 0], { angle, radius: config_1.WORLD_SIZE / 2 }));
        }
        for (const projectile of projectiles) {
            projectile.position.radius += deltaTime * config_1.PROJECTILE_SPEED;
        }
        for (const enemy of enemies) {
            (0, enemy_1.advanceEnemy)({
                enemy,
                deltaTime,
            });
        }
        for (const enemy of enemies) {
            if (enemy.position.radius < config_1.CENTER_RADIUS + config_1.ENEMY_SIZE) {
                gameOver = true;
                for (let i = 0; i < 10; i += 1) {
                    setTimeout(() => particles.push(...(0, particle_1.createBoom)({ x: config_1.WORLD_SIZE / 2, y: config_1.WORLD_SIZE / 2 }, 4 + i * 4)), 100 * i);
                }
                break;
            }
        }
        projectiles: for (const pKey in projectiles) {
            for (const eKey in enemies) {
                const projectile = projectiles[pKey];
                const enemy = enemies[eKey];
                const dist = (0, polar_vector_1.distance)(projectile.position, enemy.position);
                if (dist < config_1.PROJECTILE_SIZE + config_1.ENEMY_SIZE) {
                    projectiles.splice(+pKey, 1);
                    enemies.splice(+eKey, 1);
                    const position = (0, world_1.toRelativeVector)(enemy.position);
                    particles.push(...(0, particle_1.createBoom)(position));
                    addPoints((0, enemy_1.getValue)(enemy.type));
                    continue projectiles;
                }
            }
        }
    }
    return {
        playerPosition: (0, vector_1.mulFactor)(currentPosition, config_1.PLAYER_OFFSET),
        projectiles,
        enemies,
        particles,
        gameOver
    };
}

},{"./config":"FxBD","./enemy":"vBK0","./math/polar-vector":"CNOl","./math/vector":"H74X","./particle":"GomQ","./world":"XLY6"}],"CnAr":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = void 0;
const input_1 = require("./input");
const INPUT_TYPE_KEY = 'psi_input_type';
function init(start, stop, inputChange) {
    const inputType = localStorage.getItem(INPUT_TYPE_KEY);
    const $menu = document.querySelector('#menu');
    window.addEventListener('keydown', handleKeyDown);
    const $startButton = document.querySelector('#start-button');
    $startButton.addEventListener('click', onStart);
    inputChange(input_1.InputSource.Mouse);
    const $radios = document.querySelector('#input-source');
    const selectedType = [...$radios.querySelectorAll('input')].find(input => input.value == inputType);
    if (selectedType) {
        selectedType.checked = true;
        inputChange(input_1.InputSource[inputType]);
    }
    $radios.addEventListener('change', () => {
        const selected = $radios.querySelector('input:checked').value;
        localStorage.setItem(INPUT_TYPE_KEY, input_1.InputSource[selected]);
        inputChange(input_1.InputSource[selected]);
    });
    window.addEventListener('blur', show);
    function onStart() {
        document.querySelector('html').requestFullscreen().catch(console.error);
        hide();
    }
    function show() {
        $menu.hidden = false;
        stop();
    }
    function hide() {
        $menu.hidden = true;
        start();
    }
    function handleKeyDown({ key }) {
        if (key == 'Escape') {
            if ($menu.hidden) {
                show();
            }
            else {
                hide();
            }
        }
    }
    const $gameOver = document.querySelector('#game-over');
    return {
        setGameOver() {
            document.querySelector('.score').hidden = true;
            $gameOver.hidden = false;
            window.removeEventListener('blur', show);
            window.removeEventListener('keydown', handleKeyDown);
        }
    };
}
exports.init = init;

},{"./input":"ftuY"}],"dsUz":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = void 0;
const HIGHSCORE_KEY = 'psi_highscore';
function init() {
    let { highscore, score } = loadPoints();
    const $score = document.querySelector('#score');
    const $gameOverScore = document.querySelector('#game-over-score');
    const $gameOverHighscore = document.querySelector('#game-over-highscore');
    const $gameOverButton = document.querySelector('#game-over-button');
    $gameOverButton.addEventListener('click', () => location.reload());
    return {
        addPoints
    };
    function addPoints(value) {
        score += value;
        if (score > highscore) {
            highscore = score;
        }
        updateUI();
        savePoints();
    }
    function savePoints() {
        localStorage.setItem(HIGHSCORE_KEY, String(highscore));
    }
    function loadPoints() {
        const highscore = localStorage.getItem(HIGHSCORE_KEY);
        return {
            score: 0,
            highscore: highscore ? +highscore : 0
        };
    }
    function updateUI() {
        $score.textContent = String(score);
        $gameOverScore.textContent = String(score);
        $gameOverHighscore.textContent = String(highscore);
    }
}
exports.init = init;

},{}],"nTsH":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = void 0;
function init() {
    const $canvas = document.querySelector('#background');
    const ctx = $canvas.getContext('2d');
    window.addEventListener('resize', resize);
    resize();
    function drawBackground() {
        const imageData = new ImageData($canvas.width, $canvas.height);
        for (let i = 0; i < imageData.data.length; i += 4) {
            const val = Math.random() < 0.001 ? 255 : 0;
            imageData.data[i] = val;
            imageData.data[i + 1] = val;
            imageData.data[i + 2] = val;
            imageData.data[i + 3] = 255;
        }
        ctx.putImageData(imageData, 0, 0);
    }
    function resize() {
        $canvas.width = window.innerWidth;
        $canvas.height = window.innerHeight;
        drawBackground();
    }
}
exports.init = init;

},{}],"LQOA":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const input_1 = require("./input");
const render_1 = require("./render");
const physics_1 = require("./physics");
const menu_1 = require("./menu");
const score_1 = require("./score");
const background_1 = require("./background");
const config_1 = require("./config");
(0, background_1.init)();
const $canvas = document.querySelector('#canvas');
$canvas.width = config_1.WORLD_SIZE;
$canvas.height = config_1.WORLD_SIZE;
let menuPause = true;
let inputPause = true;
const { getInput, setInputSource } = (0, input_1.init)(input_1.InputSource.Mouse, () => {
    inputPause = false;
}, () => {
    inputPause = true;
});
const { setGameOver } = (0, menu_1.init)(() => {
    menuPause = false;
}, () => {
    menuPause = true;
}, (source) => {
    inputPause = true;
    setInputSource(source);
});
const { addPoints } = (0, score_1.init)();
const { calculate } = (0, physics_1.init)();
const { draw } = (0, render_1.init)($canvas);
let lastTime = 0;
addPoints(0);
window.requestAnimationFrame(update);
function update(time) {
    const deltaTime = (time - lastTime) / 1000;
    lastTime = time;
    window.requestAnimationFrame(update);
    if (menuPause || inputPause)
        return;
    const input = getInput();
    const { playerPosition, projectiles, enemies, particles, gameOver } = calculate({
        input, deltaTime, addPoints
    });
    draw({
        playerPosition,
        projectiles,
        enemies,
        particles
    });
    if (gameOver) {
        setGameOver();
    }
}

},{"./input":"ftuY","./render":"cUPp","./physics":"DVlx","./menu":"CnAr","./score":"dsUz","./background":"nTsH","./config":"FxBD"}]},{},["LQOA"], null)