---
title: 从base64格式的HTML中提取图片
date: 2024-12-05 00:00:46
updated: 2024-12-05 00:00:46
# password: 2024年12月4日
# abstract: ""
# message: 往事而已
# wrong_pass_message: 真想知道就去问问作者吧
# theme: wave
tags: 
    - Python
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
ai: 本文主要介绍了作者欲将前几年手机上所写小作文转至博客，因导出的是base64格式的HTML文件，其中图片不便复制且原图占空间大，故而编写Python代码。代码先读取HTML文件，查找所有base64数据，再将其解码，打开图片并转换为RGB模式，最后保存为WebP格式。作者还展示了代码运行后的效果图片。
---

# 前言
今天准备把前几年在手机上写的小作文转到博客上，但是发现导出的格式是base64的HTML文件（尝试导出过word或者pdf格式，但是不尽人意），其中的图片就不是那么方便复制，而且是原图，占用的空间比较大。于是就有了下面这段Python代码。
# 代码
```Python
import re
import base64
from io import BytesIO
from PIL import Image

# 读取 HTML 文件
with open("your_file.html", "r", encoding="utf-8") as file:
    html_content = file.read()

# 查找所有 base64 数据
base64_images = re.findall(r'data:image/[^;]+;base64,([^\"]+)', html_content)

# 保存图片为 WebP 格式
for i, base64_data in enumerate(base64_images):
    try:
        # 解码 Base64 数据
        image_data = base64.b64decode(base64_data)

        # 打开图片
        img = Image.open(BytesIO(image_data))

        # 转换为 RGB 模式（移除透明通道）
        img = img.convert("RGB")

        # 保存为 WebP 格式文件
        file_name = f"image_{i + 1}.webp"
        img.save(file_name, "WEBP", quality=80)
        print(f"图片已保存为 {file_name}")
    except Exception as e:
        print(f"转换失败：{e}")

```
# 效果演示
![onew11733320984924734.png](https://img.onew.us.kg/file/onew11733328032136841.png)
![onew11733321012025315.png](https://img.onew.us.kg/file/onew11733328040703473.png)