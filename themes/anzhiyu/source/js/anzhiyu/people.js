// "use strict";
// function _toConsumableArray(e) {
//   return _arrayWithoutHoles(e) || _iterableToArray(e) || _unsupportedIterableToArray(e) || _nonIterableSpread();
// }

// function _nonIterableSpread() {
//   throw new TypeError(
//     "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
//   );
// }

// function _unsupportedIterableToArray(e, r) {
//   if (e) {
//     if ("string" == typeof e) return _arrayLikeToArray(e, r);
//     var t = Object.prototype.toString.call(e).slice(8, -1);
//     return (
//       "Object" === t && e.constructor && (t = e.constructor.name),
//       "Map" === t || "Set" === t
//         ? Array.from(e)
//         : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)
//         ? _arrayLikeToArray(e, r)
//         : void 0
//     );
//   }
// }

// function _iterableToArray(e) {
//   if (("undefined" != typeof Symbol && null != e[Symbol.iterator]) || null != e["@@iterator"]) return Array.from(e);
// }

// function _arrayWithoutHoles(e) {
//   if (Array.isArray(e)) return _arrayLikeToArray(e);
// }

// function _arrayLikeToArray(e, r) {
//   (null == r || r > e.length) && (r = e.length);
//   for (var t = 0, a = new Array(r); t < r; t++) a[t] = e[t];
//   return a;
// }

// function _classCallCheck(e, r) {
//   if (!(e instanceof r)) throw new TypeError("Cannot call a class as a function");
// }

// function _defineProperties(e, r) {
//   for (var t = 0; t < r.length; t++) {
//     var a = r[t];
//     (a.enumerable = a.enumerable || !1),
//       (a.configurable = !0),
//       "value" in a && (a.writable = !0),
//       Object.defineProperty(e, a.key, a);
//   }
// }

// function _createClass(e, r, t) {
//   return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), e;
// }
// var peopleConfig = {
//     src: GLOBAL_CONFIG.peoplecanvas.img,
//     rows: 15,
//     cols: 7,
//   },
//   randomRange = function (e, r) {
//     return e + Math.random() * (r - e);
//   },
//   randomIndex = function (e) {
//     return 0 | randomRange(0, e.length);
//   },
//   removeFromArray = function (e, r) {
//     return e.splice(r, 1)[0];
//   },
//   removeItemFromArray = function (e, r) {
//     return removeFromArray(e, e.indexOf(r));
//   },
//   removeRandomFromArray = function (e) {
//     return removeFromArray(e, randomIndex(e));
//   },
//   getRandomFromArray = function (e) {
//     return e[0 | randomIndex(e)];
//   },
//   resetPeep = function (e) {
//     var r,
//       t,
//       a = e.stage,
//       n = e.peep,
//       o = 0.5 < Math.random() ? 1 : -1,
//       i = 100 - 250 * gsap.parseEase("power2.in")(Math.random()),
//       s = a.height - n.height + i;
//     return (
//       1 == o ? ((r = -n.width), (t = a.width), (n.scaleX = 1)) : ((r = a.width + n.width), (t = 0), (n.scaleX = -1)),
//       (n.x = r),
//       (n.y = s),
//       {
//         startX: r,
//         startY: (n.anchorY = s),
//         endX: t,
//       }
//     );
//   },
//   normalWalk = function (e) {
//     var r = e.peep,
//       t = e.props,
//       a = (t.startX, t.startY),
//       n = t.endX,
//       o = gsap.timeline();
//     return (
//       o.timeScale(randomRange(0.5, 1.5)),
//       o.to(
//         r,
//         {
//           duration: 10,
//           x: n,
//           ease: "none",
//         },
//         0
//       ),
//       o.to(
//         r,
//         {
//           duration: 0.25,
//           repeat: 40,
//           yoyo: !0,
//           y: a - 10,
//         },
//         0
//       ),
//       o
//     );
//   },
//   walks = [normalWalk],
//   Peep = (function () {
//     function a(e) {
//       var r = e.image,
//         t = e.rect;
//       _classCallCheck(this, a),
//         (this.image = r),
//         this.setRect(t),
//         (this.x = 0),
//         (this.y = 0),
//         (this.anchorY = 0),
//         (this.scaleX = 1),
//         (this.walk = null);
//     }
//     return (
//       _createClass(a, [
//         {
//           key: "setRect",
//           value: function (e) {
//             (this.rect = e),
//               (this.width = e[2]),
//               (this.height = e[3]),
//               (this.drawArgs = [this.image].concat(_toConsumableArray(e), [0, 0, this.width, this.height]));
//           },
//         },
//         {
//           key: "render",
//           value: function (e) {
//             e.save(),
//               e.translate(this.x, this.y),
//               e.scale(this.scaleX, 1),
//               e.drawImage.apply(e, _toConsumableArray(this.drawArgs)),
//               e.restore();
//           },
//         },
//       ]),
//       a
//     );
//   })(),
//   img = document.createElement("img");
// (img.onload = init), (img.src = peopleConfig.src);
// let peoplecanvasEl = document.getElementById("peoplecanvas");

// let ctx = peoplecanvasEl ? peoplecanvasEl.getContext("2d") : undefined,
//   stage = {
//     width: 0,
//     height: 0,
//   },
//   allPeeps = [],
//   availablePeeps = [],
//   crowd = [];

// function init() {
//   if (!peoplecanvasEl) return;
//   createPeeps(), resize(), gsap.ticker.add(render), window.addEventListener("resize", resize);
// }
// document.addEventListener("pjax:success", e => {
//   peoplecanvasEl = document.getElementById("peoplecanvas");
//   if (peoplecanvasEl) {
//     (ctx = peoplecanvasEl ? peoplecanvasEl.getContext("2d") : undefined), window.removeEventListener("resize", resize);
//     gsap.ticker.remove(render);
//     setTimeout(() => {
//       if (!peoplecanvasEl) return;
//       resize(), gsap.ticker.add(render), window.addEventListener("resize", resize);
//     }, 300);
//   }
// });

// function createPeeps() {
//   for (
//     var e = peopleConfig.rows,
//       r = peopleConfig.cols,
//       t = e * r,
//       a = img.naturalWidth / e,
//       n = img.naturalHeight / r,
//       o = 0;
//     o < t;
//     o++
//   )
//     allPeeps.push(
//       new Peep({
//         image: img,
//         rect: [(o % e) * a, ((o / e) | 0) * n, a, n],
//       })
//     );
// }

// function resize() {
//   if (peoplecanvasEl && peoplecanvasEl.clientWidth != 0) {
//     (stage.width = peoplecanvasEl.clientWidth),
//       (stage.height = peoplecanvasEl.clientHeight),
//       (peoplecanvasEl.width = stage.width * devicePixelRatio),
//       (peoplecanvasEl.height = stage.height * devicePixelRatio),
//       crowd.forEach(function (e) {
//         e.walk.kill();
//       }),
//       (crowd.length = 0),
//       (availablePeeps.length = 0),
//       availablePeeps.push.apply(availablePeeps, allPeeps),
//       initCrowd();
//   }
// }

// function initCrowd() {
//   for (; availablePeeps.length; ) addPeepToCrowd().walk.progress(Math.random());
// }

// function addPeepToCrowd() {
//   var e = removeRandomFromArray(availablePeeps),
//     r = getRandomFromArray(walks)({
//       peep: e,
//       props: resetPeep({
//         peep: e,
//         stage: stage,
//       }),
//     }).eventCallback("onComplete", function () {
//       removePeepFromCrowd(e), addPeepToCrowd();
//     });
//   return (
//     (e.walk = r),
//     crowd.push(e),
//     crowd.sort(function (e, r) {
//       return e.anchorY - r.anchorY;
//     }),
//     e
//   );
// }

// function removePeepFromCrowd(e) {
//   removeItemFromArray(crowd, e), availablePeeps.push(e);
// }

// function render() {
//   if (!peoplecanvasEl) return;
//   (peoplecanvasEl.width = peoplecanvasEl.width),
//     ctx.save(),
//     ctx.scale(devicePixelRatio, devicePixelRatio),
//     crowd.forEach(function (e) {
//       e.render(ctx);
//     }),
//     ctx.restore();
// }

//Hexo\themes\anzhiyu\source\js\anzhiyu\people.js

"use strict";
function _toConsumableArray(e) {
  return _arrayWithoutHoles(e) || _iterableToArray(e) || _unsupportedIterableToArray(e) || _nonIterableSpread();
}

function _nonIterableSpread() {
  throw new TypeError(
    "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
  );
}

function _unsupportedIterableToArray(e, r) {
  if (e) {
    if ("string" == typeof e) return _arrayLikeToArray(e, r);
    var t = Object.prototype.toString.call(e).slice(8, -1);
    return (
      "Object" === t && e.constructor && (t = e.constructor.name),
      "Map" === t || "Set" === t
        ? Array.from(e)
        : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)
        ? _arrayLikeToArray(e, r)
        : void 0
    );
  }
}

function _iterableToArray(e) {
  if (("undefined" != typeof Symbol && null != e[Symbol.iterator]) || null != e["@@iterator"]) return Array.from(e);
}

function _arrayWithoutHoles(e) {
  if (Array.isArray(e)) return _arrayLikeToArray(e);
}

function _arrayLikeToArray(e, r) {
  (null == r || r > e.length) && (r = e.length);
  for (var t = 0, a = new Array(r); t < r; t++) a[t] = e[t];
  return a;
}

function _classCallCheck(e, r) {
  if (!(e instanceof r)) throw new TypeError("Cannot call a class as a function");
}

function _defineProperties(e, r) {
  for (var t = 0; t < r.length; t++) {
    var a = r[t];
    (a.enumerable = a.enumerable || !1),
      (a.configurable = !0),
      "value" in a && (a.writable = !0),
      Object.defineProperty(e, a.key, a);
  }
}

function _createClass(e, r, t) {
  return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), e;
}
var peopleConfig = {
    src: Array.isArray(GLOBAL_CONFIG.peoplecanvas.img) 
      ? GLOBAL_CONFIG.peoplecanvas.img[Math.floor(Math.random() * GLOBAL_CONFIG.peoplecanvas.img.length)]
      : GLOBAL_CONFIG.peoplecanvas.img,
    background_image: GLOBAL_CONFIG.peoplecanvas.background_image || '',
    rows: GLOBAL_CONFIG.peoplecanvas.rows || 15,
    cols: GLOBAL_CONFIG.peoplecanvas.cols || 7,
    scale: GLOBAL_CONFIG.peoplecanvas.scale || 0.3,
    density: GLOBAL_CONFIG.peoplecanvas.density || 1.0,
    speed: GLOBAL_CONFIG.peoplecanvas.speed || 1.0,
    offsetY: GLOBAL_CONFIG.peoplecanvas.offsetY || 0,
  },
  randomRange = function (e, r) {
    return e + Math.random() * (r - e);
  },
  randomIndex = function (e) {
    return 0 | randomRange(0, e.length);
  },
  removeFromArray = function (e, r) {
    return e.splice(r, 1)[0];
  },
  removeItemFromArray = function (e, r) {
    return removeFromArray(e, e.indexOf(r));
  },
  removeRandomFromArray = function (e) {
    return removeFromArray(e, randomIndex(e));
  },
  getRandomFromArray = function (e) {
    return e[0 | randomIndex(e)];
  },
  resetPeep = function (e) {
    var r,
      t,
      a = e.stage,
      n = e.peep,
      o = 0.5 < Math.random() ? 1 : -1,
      i = 100 - 250 * gsap.parseEase("power2.in")(Math.random()),
      s = a.height - n.height + i + peopleConfig.offsetY;
    return (
      1 == o ? ((r = -n.width), (t = a.width), (n.scaleX = 1)) : ((r = a.width + n.width), (t = 0), (n.scaleX = -1)),
      (n.x = r),
      (n.y = s),
      {
        startX: r,
        startY: (n.anchorY = s),
        endX: t,
      }
    );
  },
  normalWalk = function (e) {
    var r = e.peep,
      t = e.props,
      a = (t.startX, t.startY),
      n = t.endX,
      o = gsap.timeline(),
      speedMultiplier = peopleConfig.speed;
    return (
      o.timeScale(randomRange(0.5 * speedMultiplier, 1.5 * speedMultiplier)),
      o.to(
        r,
        {
          duration: 10 / speedMultiplier,
          x: n,
          ease: "none",
        },
        0
      ),
      o.to(
        r,
        {
          duration: 0.25 / speedMultiplier,
          repeat: 40,
          yoyo: !0,
          y: a - 10,
        },
        0
      ),
      o
    );
  },
  walks = [normalWalk],
  Peep = (function () {
    function a(e) {
      var r = e.image,
        t = e.rect;
      _classCallCheck(this, a),
        (this.image = r),
        this.setRect(t),
        (this.x = 0),
        (this.y = 0),
        (this.anchorY = 0),
        (this.scaleX = 1),
        (this.walk = null);
    }
    return (
      _createClass(a, [
        {
          key: "setRect",
          value: function (e) {
            (this.rect = e),
              (this.width = e[2]),
              (this.height = e[3]),
              (this.drawArgs = [this.image].concat(_toConsumableArray(e), [0, 0, this.width, this.height]));
          },
        },
        {
          key: "render",
          value: function (e, scale) {
            var s = scale || 1;
            e.save(),
              e.translate(this.x, this.y),
              e.scale(this.scaleX * s, s),
              e.drawImage.apply(e, _toConsumableArray(this.drawArgs)),
              e.restore();
          },
        },
      ]),
      a
    );
  })(),
  img = document.createElement("img");
(img.onload = init), (img.src = peopleConfig.src);
let peoplecanvasEl = document.getElementById("peoplecanvas");

let ctx = peoplecanvasEl ? peoplecanvasEl.getContext("2d") : undefined,
  stage = {
    width: 0,
    height: 0,
  },
  allPeeps = [],
  availablePeeps = [],
  crowd = [];

// 添加全局变量来跟踪初始化状态
let isInitializing = false;
let currentImageSrc = '';

// 修改PJAX事件监听器
document.addEventListener("pjax:success", e => {
  const newPeoplecanvasEl = document.getElementById("peoplecanvas");
  if (newPeoplecanvasEl && !isInitializing) {
    isInitializing = true;
    
    // 完全清理之前的状态
    cleanupPeopleCanvas();
    
    peoplecanvasEl = newPeoplecanvasEl;
    ctx = peoplecanvasEl ? peoplecanvasEl.getContext("2d") : undefined;
    
    // 重新选择随机图片（如果配置了多张图片）
    let newImageSrc;
    if (Array.isArray(GLOBAL_CONFIG.peoplecanvas.img)) {
      newImageSrc = GLOBAL_CONFIG.peoplecanvas.img[Math.floor(Math.random() * GLOBAL_CONFIG.peoplecanvas.img.length)];
    } else {
      newImageSrc = GLOBAL_CONFIG.peoplecanvas.img;
    }
    
    // 只有当图片真的改变时才重新加载
    if (newImageSrc !== currentImageSrc) {
      currentImageSrc = newImageSrc;
      peopleConfig.src = newImageSrc;
      
      // 创建新的图片对象
      const newImg = document.createElement("img");
      newImg.onload = function() {
        // 替换全局图片引用
        img.src = newImg.src;
        img.onload = null; // 清除旧的onload
        
        setTimeout(() => {
          if (!peoplecanvasEl || !isInitializing) return;
          
          initializePeopleCanvas();
          isInitializing = false;
          
          console.log('人潮汹涌模块重新初始化完成');
        }, 100);
      };
      
      newImg.onerror = function() {
        console.error('人潮汹涌图片加载失败:', newImageSrc);
        isInitializing = false;
      };
      
      newImg.src = newImageSrc;
    } else {
      // 图片相同，直接重新初始化
      setTimeout(() => {
        if (!peoplecanvasEl || !isInitializing) return;
        
        initializePeopleCanvas();
        isInitializing = false;
        
        console.log('人潮汹涌模块重新初始化完成（相同图片）');
      }, 100);
    }
  }
});

// 新增清理函数
function cleanupPeopleCanvas() {
  // 停止所有动画
  crowd.forEach(function (peep) {
    if (peep.walk) {
      peep.walk.kill();
      peep.walk = null;
    }
  });
  
  // 移除事件监听器
  window.removeEventListener("resize", resize);
  gsap.ticker.remove(render);
  
  // 清空所有数组
  crowd.length = 0;
  availablePeeps.length = 0;
  allPeeps.length = 0;
  
  // 清空画布
  if (peoplecanvasEl && ctx) {
    ctx.clearRect(0, 0, peoplecanvasEl.width, peoplecanvasEl.height);
  }
}

// 新增初始化函数
function initializePeopleCanvas() {
  if (!peoplecanvasEl) return;
  
  // 设置背景图片
  if (peopleConfig.background_image) {
    document.documentElement.style.setProperty('--peoplecanvas-bg-image', `url(${peopleConfig.background_image})`);
  }
  
  // 重新创建人物精灵图
  createPeeps();
  
  // 重新初始化
  resize();
  gsap.ticker.add(render);
  window.addEventListener("resize", resize);
}

// 修改原有的init函数
function init() {
  if (!peoplecanvasEl || isInitializing) return;
  
  currentImageSrc = peopleConfig.src;
  initializePeopleCanvas();
}

function createPeeps() {
  for (
    var e = peopleConfig.rows,
      r = peopleConfig.cols,
      t = e * r,
      a = img.naturalWidth / e,
      n = img.naturalHeight / r,
      o = 0;
    o < t;
    o++
  )
    allPeeps.push(
      new Peep({
        image: img,
        rect: [(o % e) * a, ((o / e) | 0) * n, a, n],
      })
    );
}

function resize() {
  if (peoplecanvasEl && peoplecanvasEl.clientWidth != 0) {
    (stage.width = peoplecanvasEl.clientWidth),
      (stage.height = peoplecanvasEl.clientHeight),
      (peoplecanvasEl.width = stage.width * devicePixelRatio),
      (peoplecanvasEl.height = stage.height * devicePixelRatio),
      crowd.forEach(function (e) {
        e.walk.kill();
      }),
      (crowd.length = 0),
      (availablePeeps.length = 0),
      availablePeeps.push.apply(availablePeeps, allPeeps),
      initCrowd();
  }
}

function initCrowd() {
  var targetCount = Math.floor(allPeeps.length * peopleConfig.density);
  for (var i = 0; i < targetCount && availablePeeps.length; i++) {
    addPeepToCrowd().walk.progress(Math.random());
  }
}

function addPeepToCrowd() {
  var e = removeRandomFromArray(availablePeeps),
    r = getRandomFromArray(walks)({
      peep: e,
      props: resetPeep({
        peep: e,
        stage: stage,
      }),
    }).eventCallback("onComplete", function () {
      removePeepFromCrowd(e);
      if (crowd.length < Math.floor(allPeeps.length * peopleConfig.density)) {
        addPeepToCrowd();
      }
    });
  return (
    (e.walk = r),
    crowd.push(e),
    crowd.sort(function (e, r) {
      return e.anchorY - r.anchorY;
    }),
    e
  );
}

function removePeepFromCrowd(e) {
  removeItemFromArray(crowd, e), availablePeeps.push(e);
}

function render() {
  if (!peoplecanvasEl) return;
  (peoplecanvasEl.width = peoplecanvasEl.width),
    ctx.save(),
    ctx.scale(devicePixelRatio, devicePixelRatio),
    crowd.forEach(function (e) {
      e.render(ctx, peopleConfig.scale);
    }),
    ctx.restore();
}