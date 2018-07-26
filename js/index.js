// forked from hirotweets's "SVGでアニメーションするインタラクティブな円グラフ" http://jsdo.it/hirotweets/d3Pl


$(function(){
  $('#wash').on('click', function(){
    $('img[src="images/before_button_splash.png"]').attr('src','images/button_splash.gif');
    var imgfalse = function(){
      $('img[src="images/button_splash.gif"]').attr('src','images/before_button_splash.png');
    } 
    setTimeout(imgfalse, 2500);
    //別ファイルで綺麗なパンツ枚数をmaxにする処理
  });
});


// $(function () {
// 
// 
//   var $counter = 7;//ここに設定した綺麗なパンツ枚数を格納
// 
//   //下のメーター
// });

// $(function () {
//   $('.washed').on('click', function () {
//     $("#progressive-circle01").drawPieChart1({
//       value: $counter, //NOWの値
//       color: 'ffffff' //メーターの色
//     });
// 
//     //下のメーター(固定)
//     $("#progressive-circle02").drawPieChart2({
//       value: 10, //MAXの値
//       color: '7cccd5' //メーターの色
//     });
//   });
// });

/*!
 * jquery.drawPieChart.js
 * Version: 0.1(Beta)
 * Inspired by Chart.js(http://www.chartjs.org/)
 *
 * Copyright 2013 hiro
 * https://github.com/githiro/drawPieChart
 * Released under the MIT license.
 *
 */
; (function ($, undefined) {
  $.fn.drawPieChart1 = function (options) {

    var $this = this,
      W = $this.width(),
      H = $this.height(),
      centerX = W / 2,
      centerY = H / 2,
      cos = Math.cos,
      sin = Math.sin,
      PI = Math.PI,
      settings = $.extend({
        value: 100,
        color: { red: 99, green: 99, blue: 99 },
        segmentShowStroke: true,
        segmentStrokeWidth: 6,
        baseColor: "transparent",
        baseOffset: 0,
        edgeOffset: 13,//offset from edge of $this
        pieSegmentGroupClass: "pieSegmentGroup",
        pieSegmentClass: "pieSegment",
        lightPiesOffset: 10,//lighten pie's width
        lightPiesOpacity: 1,//lighten pie's default opacity
        lightPieClass: "lightPie",
        animation: true,
        animationSteps: 70,
        animationEasing: "easeInOutExpo",
        tipOffsetX: -10,
        tipOffsetY: -45,
        tipClass: "pieTip",
        beforeDraw: function () { },
        afterDrawed: function () { },
        label: {
          className: 'progressive-circle-label',
          css: {
            'display': 'block',
            'position': 'relative',
            'left': '0px',
            'top': '0px',
            'color': '#fff',
            'margin-top': '-104%',
            'letter-spacing': '-0.6rem',
            'width': W + 'px',
            'height': H + 'px',
            'line-height': H + 'px',
            'text-align': 'center',
            'font-size': '7.5rem'
          }
        }
      }, options),
      animationOptions = {
        linear: function (t) {
          return t;
        },
        easeInOutExpo: function (t) {
          var v = t < .5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t;
          return (v > 1) ? 1 : v;
        }
      };
    var percent = settings.value;
    var color = settings.color;
    if (typeof settings.color === 'string') {
      color = color.replace('#', '');
      color = {
        red: parseInt(color.substr(0, 2), 16),
        green: parseInt(color.substr(2, 2), 16),
        blue: parseInt(color.substr(4, 2), 16)
      };
    }
    var data = makeData(percent, color);
    var requestAnimFrame = function () {
      return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
          window.setTimeout(callback, 300);
        };
    }();

    var $svg = $('<svg width="' + W + '" height="' + H + '" viewBox="0 0 ' + W + ' ' + H + '" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"></svg>').appendTo($this),
      $groups = [],
      $lightPies = [],
      easingFunction = animationOptions[settings.animationEasing],
      pieRadius = Min([H / 2, W / 2]) - settings.edgeOffset,
      segmentTotal = 13.1;

    settings.beforeDraw.call($this);

    //Draw base circle
    var drawBasePie = function () {
      var svgBase = document.createElementNS('http://www.w3.org/2000/svg', 'circle'),
        $svgBase = $(svgBase).appendTo($svg);
      $svgBase[0].setAttribute("cx", centerX);
      $svgBase[0].setAttribute("cy", centerY);
      $svgBase[0].setAttribute("r", pieRadius + settings.baseOffset);
      $svgBase[0].setAttribute("fill", settings.baseColor);
    }();

    //Set up pie segments wrapper
    var pathGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    var $pathGroup = $(pathGroup).appendTo($svg);
    $pathGroup[0].setAttribute("opacity", 0);

    //Set up tooltip
    var $tip = $('<div class="' + settings.tipClass + '" />').appendTo('body').hide(),
      tipW = $tip.width(),
      tipH = $tip.height();

    for (var i = 0, len = data.length; i < len; i++) {
      var g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      g.setAttribute("data-order", i);
      g.setAttribute("class", settings.pieSegmentGroupClass);
      $groups[i] = $(g).appendTo($pathGroup);

      var lp = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      lp.setAttribute("stroke-width", settings.segmentStrokeWidth);
      lp.setAttribute("stroke", data[i].color);
      lp.setAttribute("stroke-miterlimit", 2);
      lp.setAttribute("fill", "transparent");
      lp.setAttribute("opacity", 1);
      lp.setAttribute("class", settings.lightPieClass);
      $lightPies[i] = $(lp).appendTo($groups[i]);
    }

    var $label = $('<span class="' + settings.label.className + '"></span>').appendTo($this);
    $label.css(settings.label.css);

    //Animation start
    animationLoop(drawPieSegments);

    function drawPieSegments(animationDecimal) {
      var startRadius = Math.PI / 1.35,
        rotateAnimation = 1;
      if (settings.animation) {
        rotateAnimation = animationDecimal;//count up between0~1
      }

      $pathGroup[0].setAttribute("opacity", animationDecimal);

      //draw each path
      for (var i = 0, len = data.length; i < len; i++) {
        var segmentAngle = rotateAnimation * ((data[i].value / segmentTotal) * (PI * 2)),
          endRadius = startRadius + segmentAngle,
          largeArc = ((endRadius - startRadius) % (PI * 2)) > PI ? 1 : 0,
          startX = centerX + cos(startRadius) * pieRadius,
          startY = centerY + sin(startRadius) * pieRadius,
          endX = centerX + cos(endRadius) * pieRadius,
          endY = centerY + sin(endRadius) * pieRadius,
          startX2 = centerX + cos(startRadius) * (pieRadius + settings.lightPiesOffset),
          startY2 = centerY + sin(startRadius) * (pieRadius + settings.lightPiesOffset),
          endX2 = centerX + cos(endRadius) * (pieRadius + settings.lightPiesOffset),
          endY2 = centerY + sin(endRadius) * (pieRadius + settings.lightPiesOffset);
        var cmd = [
          'M', startX2, startY2,//Move pointer
          'A', pieRadius + settings.lightPiesOffset, pieRadius + settings.lightPiesOffset, 0, largeArc, 1, endX2, endY2//Draw outer arc path
          //          'L', centerX, centerY,//Draw line to the center.
          //          'Z'//Cloth path
        ];
        $lightPies[i][0].setAttribute("d", cmd.join(' '));
        $lightPies[i].css({ opacity: settings.lightPiesOpacity });
        startRadius += segmentAngle;
      }
    }

    function animateFrame(cnt, drawData) {
      var easeAdjustedAnimationPercent = (settings.animation) ? CapValue(easingFunction(cnt), null, 0) : 1;
      drawData(easeAdjustedAnimationPercent);
    }
    function animationLoop(drawData) {
      var animFrameAmount = (settings.animation) ? 1 / CapValue(settings.animationSteps, Number.MAX_VALUE, 1) : 1,
        cnt = (settings.animation) ? 0 : 1;
      requestAnimFrame(function () {
        cnt += animFrameAmount;
        animateFrame(cnt, drawData);
        if (cnt <= 1) {
          requestAnimFrame(arguments.callee);
          updateLabel(Math.floor(cnt * percent));
        } else {
          for (var i = 0, len = data.length; i < len; i++) {
            $lightPies[i].animate({ opacity: '1.0' }, 250);
            updateLabel(percent);
          }
          settings.afterDrawed.call($this);
        }
      });
    }
    function Max(arr) {
      return Math.max.apply(null, arr);
    }
    function Min(arr) {
      return Math.min.apply(null, arr);
    }
    function isNumber(n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
    }
    function CapValue(valueToCap, maxValue, minValue) {
      if (isNumber(maxValue)) {
        if (valueToCap > maxValue) {
          return maxValue;
        }
      }
      if (isNumber(minValue)) {
        if (valueToCap < minValue) {
          return minValue;
        }
      }
      return valueToCap;
    }
    function updateLabel(total) {
      $label.text(total + '');
    }
    function makeData(percent, color) {
      var BOUNDARY = 10;
      var _length = Math.floor(percent / BOUNDARY) + 1;
      var _r = color.red;
      var _g = color.green;
      var _b = color.blue;
      var _alpha = 0.6;
      var _data = [];
      for (var i = 0; i < _length; i++) {
        var _value = BOUNDARY;
        if (i === (_length - 1)) {
          _value = percent % BOUNDARY;
        }
        //_alpha += (1-0.9)/BOUNDARY;
        _alpha += BOUNDARY;
        _data.push({
          value: _value,
          color: 'rgba(' + _r + ',' + _g + ',' + _b + ',' + _alpha + ')'
        });
      }
      return _data;
    }
    return $this;
  };
})(jQuery);



// --------------- baseの円 ---------------　//

; (function ($, undefined) {
  $.fn.drawPieChart2 = function (options) {

    var $this = this,
      W = $this.width(),
      H = $this.height(),
      centerX = W / 2,
      centerY = H / 2,
      cos = Math.cos,
      sin = Math.sin,
      PI = Math.PI,
      settings = $.extend({
        value: 100,
        color: { red: 99, green: 99, blue: 99 },
        segmentShowStroke: true,
        segmentStrokeWidth: 6,
        baseColor: "transparent",
        baseOffset: 0,
        edgeOffset: 13,//offset from edge of $this
        pieSegmentGroupClass: "pieSegmentGroup",
        pieSegmentClass: "pieSegment",
        lightPiesOffset: 10,//lighten pie's width
        lightPiesOpacity: 0.1,//lighten pie's default opacity
        lightPieClass: "lightPie",
        animation: false,
        animationEasing: "easeInOutExpo",
        tipOffsetX: -10,
        tipOffsetY: -45,
        tipClass: "pieTip",
        beforeDraw: function () { },
        afterDrawed: function () { },
        label: {
          className: 'progressive-circle-label',
          css: {
            'display': 'none',
          }
        }
      }, options),
      animationOptions = {
        linear: function (t) {
          return t;
        },
        easeInOutExpo: function (t) {
          var v = t < .5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t;
          return (v > 1) ? 1 : v;
        }
      };
    var percent = settings.value;
    var color = settings.color;
    if (typeof settings.color === 'string') {
      color = color.replace('#', '');
      color = {
        red: parseInt(color.substr(0, 2), 16),
        green: parseInt(color.substr(2, 2), 16),
        blue: parseInt(color.substr(4, 2), 16)
      };
    }
    var data = makeData(percent, color);
    var requestAnimFrame = function () {
      return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
          window.setTimeout(callback, 300);
        };
    }();

    var $svg = $('<svg width="' + W + '" height="' + H + '" viewBox="0 0 ' + W + ' ' + H + '" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"></svg>').appendTo($this),
      $groups = [],
      $lightPies = [],
      easingFunction = animationOptions[settings.animationEasing],
      pieRadius = Min([H / 2, W / 2]) - settings.edgeOffset,
      segmentTotal = 13.1;

    settings.beforeDraw.call($this);

    //Draw base circle
    var drawBasePie = function () {
      var svgBase = document.createElementNS('http://www.w3.org/2000/svg', 'circle'),
        $svgBase = $(svgBase).appendTo($svg);
      $svgBase[0].setAttribute("cx", centerX);
      $svgBase[0].setAttribute("cy", centerY);
      $svgBase[0].setAttribute("r", pieRadius + settings.baseOffset);
      $svgBase[0].setAttribute("fill", settings.baseColor);
    }();

    //Set up pie segments wrapper
    var pathGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    var $pathGroup = $(pathGroup).appendTo($svg);
    $pathGroup[0].setAttribute("opacity", 0);

    //Set up tooltip
    var $tip = $('<div class="' + settings.tipClass + '" />').appendTo('body').hide(),
      tipW = $tip.width(),
      tipH = $tip.height();

    for (var i = 0, len = data.length; i < len; i++) {
      var g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      g.setAttribute("data-order", i);
      g.setAttribute("class", settings.pieSegmentGroupClass);
      $groups[i] = $(g).appendTo($pathGroup);

      var lp = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      lp.setAttribute("stroke-width", settings.segmentStrokeWidth);
      lp.setAttribute("stroke", data[i].color);
      lp.setAttribute("stroke-miterlimit", 2);
      lp.setAttribute("fill", "transparent");
      lp.setAttribute("opacity", 1);
      lp.setAttribute("class", settings.lightPieClass);
      $lightPies[i] = $(lp).appendTo($groups[i]);
    }

    var $label = $('<span class="' + settings.label.className + '"></span>').appendTo($this);
    $label.css(settings.label.css);

    //Animation start
    animationLoop(drawPieSegments);

    function drawPieSegments(animationDecimal) {
      var startRadius = Math.PI / 1.35,
        rotateAnimation = 1;
      if (settings.animation) {
        rotateAnimation = animationDecimal;//count up between0~1
      }

      $pathGroup[0].setAttribute("opacity", animationDecimal);

      //draw each path
      for (var i = 0, len = data.length; i < len; i++) {
        var segmentAngle = rotateAnimation * ((data[i].value / segmentTotal) * (PI * 2)),
          endRadius = startRadius + segmentAngle,
          largeArc = ((endRadius - startRadius) % (PI * 2)) > PI ? 1 : 0,
          startX = centerX + cos(startRadius) * pieRadius,
          startY = centerY + sin(startRadius) * pieRadius,
          endX = centerX + cos(endRadius) * pieRadius,
          endY = centerY + sin(endRadius) * pieRadius,
          startX2 = centerX + cos(startRadius) * (pieRadius + settings.lightPiesOffset),
          startY2 = centerY + sin(startRadius) * (pieRadius + settings.lightPiesOffset),
          endX2 = centerX + cos(endRadius) * (pieRadius + settings.lightPiesOffset),
          endY2 = centerY + sin(endRadius) * (pieRadius + settings.lightPiesOffset);
        var cmd = [
          'M', startX2, startY2,//Move pointer
          'A', pieRadius + settings.lightPiesOffset, pieRadius + settings.lightPiesOffset, 0, largeArc, 1, endX2, endY2//Draw outer arc path
          //          'L', centerX, centerY,//Draw line to the center.
          //          'Z'//Cloth path
        ];
        $lightPies[i][0].setAttribute("d", cmd.join(' '));
        $lightPies[i].css({ opacity: settings.lightPiesOpacity });
        startRadius += segmentAngle;
      }
    }

    function animateFrame(cnt, drawData) {
      var easeAdjustedAnimationPercent = (settings.animation) ? CapValue(easingFunction(cnt), null, 0) : 1;
      drawData(easeAdjustedAnimationPercent);
    }
    function animationLoop(drawData) {
      var animFrameAmount = (settings.animation) ? 1 / CapValue(settings.animationSteps, Number.MAX_VALUE, 1) : 1,
        cnt = (settings.animation) ? 0 : 1;
      requestAnimFrame(function () {
        cnt += animFrameAmount;
        animateFrame(cnt, drawData);
        if (cnt <= 1) {
          requestAnimFrame(arguments.callee);
          updateLabel(Math.floor(cnt * percent));
        } else {
          for (var i = 0, len = data.length; i < len; i++) {
            $lightPies[i].animate({ opacity: '1.0' }, 250);
            updateLabel(percent);
          }
          settings.afterDrawed.call($this);
        }
      });
    }
    function Max(arr) {
      return Math.max.apply(null, arr);
    }
    function Min(arr) {
      return Math.min.apply(null, arr);
    }
    function isNumber(n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
    }
    function CapValue(valueToCap, maxValue, minValue) {
      if (isNumber(maxValue)) {
        if (valueToCap > maxValue) {
          return maxValue;
        }
      }
      if (isNumber(minValue)) {
        if (valueToCap < minValue) {
          return minValue;
        }
      }
      return valueToCap;
    }
    function updateLabel(total) {
      $label.text(total + '');
    }
    function makeData(percent, color) {
      var BOUNDARY = 10;
      var _length = Math.floor(percent / BOUNDARY) + 1;
      var _r = color.red;
      var _g = color.green;
      var _b = color.blue;
      var _alpha = 0.6;
      var _data = [];
      for (var i = 0; i < _length; i++) {
        var _value = BOUNDARY;
        if (i === (_length - 1)) {
          _value = percent % BOUNDARY;
        }
        _alpha += (1 - 0.4) / BOUNDARY;
        _data.push({
          value: _value,
          color: 'rgba(' + _r + ',' + _g + ',' + _b + ',' + _alpha + ')'
        });
      }
      return _data;
    }
    return $this;
  };
})(jQuery);
