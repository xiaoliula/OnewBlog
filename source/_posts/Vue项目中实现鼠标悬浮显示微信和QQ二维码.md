---
title: Vue项目中实现鼠标悬浮显示微信和QQ二维码
date: 2024-12-06 16:44:32
updated: 2024-12-06 16:44:32
# password: 2024年12月4日
# abstract: ""
# message: 往事而已
# wrong_pass_message: 真想知道就去问问作者吧
# theme: wave
tags: 
    - Vue
    - HTML+CSS+JS
categories: 学习
keywords: 
description:
top_img: https://img.onew.us.kg/file/onew1173332798077863.jpg
comments: true
cover: https://img.onew.us.kg/file/onew1173332798077863.jpg
toc:
toc_number:
toc_style_simple:
copyright:
copyright_author:
copyright_author_href:
copyright_url:
copyright_info:
mathjax:
katex:
aplayer:
highlight_shrink: false
aside: true
# swiper_index: 10
# top_group_index: 10
background: "#fff"
ai: 本文主要介绍了作者计划美化博客，要实现鼠标悬停时显示二维码且内容在页面最上层，记录相关代码。HTML 代码利用 CSS 的 :hover 伪类和 display 属性控制二维码框显示隐藏，添加文字提示元素并居中显示；CSS 代码通过 position、top、left 等属性定位二维码框，设置内边距、背景色、圆角、阴影等样式，用 z-index 确保元素在最上层；JS 代码通过事件处理函数控制二维码显示隐藏。还展示了演示效果，作者表示会逐步美化博客。
---

# 前言
打算在本博客的基础上增加一些美化，为了实现在鼠标悬停时显示二维码，并且确保显示的内容位于页面的最上层，记录一下代码
# HTML代码
鼠标悬停显示二维码：使用 CSS 的 :hover 伪类，使得当鼠标悬停在图标上时，相关的二维码框架（.qr-box）才会显示出来。

二维码框（.qr-box）的显示和隐藏：通过 display: none 和 display: block 控制二维码框的显示与隐藏。display: none 隐藏元素，而 display: block 将其显示出来。

文字提示（.qr-text）：为了在二维码上方添加提示文字（例如：“打开微信扫一扫”），为文字创建一个单独的元素，并使用颜色与微信图标的颜色保持一致。通过 text-align: center 将文字居中显示。
```html
<!-- 微信二维码 -->
<span style="margin: 0px 10px; position: relative;">
  <span class="el-popover__reference-wrapper">
    <span class="el-popover__reference" aria-describedby="el-popover-wechat" tabindex="0">
      <img src="/static/assets/ico/wechat.ico" alt="微信图标" height="28" width="28">
    </span>
  </span>

  <!-- 提示文字：打开微信扫一扫 -->
  <div class="qr-text">打开微信扫一扫</div>

  <!-- 微信二维码 -->
  <div class="qr-box" style="display:none;">
    <img src="/static/assets/ico/wechat_qr.webp" alt="微信二维码" width="150" height="150">
  </div>
</span>
```
# CSS代码
position: absolute：用来让元素相对于其最近的已定位父元素（或者页面的视口）进行定位。这个属性使得你能够自由地控制元素的位置。

top 和 left：这两个属性用来设置元素相对于其定位上下文的位置。通过设置 top: 40px; left: 0;，二维码盒子被放置在距离容器顶部 40px 的位置。

padding：添加内边距，使得二维码周围有空白区域，从而避免二维码和框架的边界紧贴。

background-color: rgba(255, 255, 255, 0.9)：设置背景颜色为半透明白色（rgba），0.9 的透明度让背景稍微透明，看起来更美观。

border-radius：为二维码盒子添加圆角，使其边框更加柔和。

box-shadow：为二维码盒子添加阴影效果，使其看起来浮动在页面之上，增加层次感。

z-index：控制元素的堆叠顺序。值越大的元素会覆盖在值较小的元素之上。设置 z-index: 9999 确保二维码盒子和提示文字位于最上层。
```css
.qr-box {
  position: absolute;
  top: 40px;
  left: 0;
  padding: 15px;
  background-color: rgba(255, 255, 255, 0.9); /* 半透明白色背景 */
  border-radius: 8px; /* 圆角 */
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3); /* 阴影效果 */
  z-index: 9999; /* 确保在最上层 */
}

.qr-text {
  color: #C71D23; /* 微信图标的颜色 */
  font-size: 14px;
  text-align: center;
  margin-bottom: 10px; /* 给文字下方留出空隙 */
  z-index: 9999; /* 确保文字也在最上层 */
}
```
## 关键注意点
z-index：通过设置高 z-index 值确保二维码框和提示文字在页面的最上层，避免其他元素遮挡。
display: none 和 display: block：控制二维码框的显示与隐藏。
position: absolute：确保二维码框能够精确定位。
# JS代码
showQR函数和hideQR函数通过事件处理来控制二维码的显示和隐藏。为每个图标添加mouseover和mouseout事件，来实现鼠标悬浮时显示二维码，移开时隐藏二维码。
```js
<script>
export default {
  data() {
    return {
      isQRVisible: {
        wechat: false,
        qq: false,
      },
    };
  },
  methods: {
    // 显示二维码框
    showQR(platform) {
      this.$set(this.isQRVisible, platform, true);
    },
    // 隐藏二维码框
    hideQR(platform) {
      this.$set(this.isQRVisible, platform, false);
    },
  },
};
</script>
```
# 演示效果
![onew1173347444423337.jpg](https://img.onew.us.kg/file/onew1173347444423337.webp)
# 结语
有空慢慢美化博客，一步一个脚印慢慢来