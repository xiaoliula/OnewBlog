---
title: Python批量计算PDF页数
date: 2024-10-29 20:04:06
updated: 2024-05-14 17:21:00
tags: 
    - Python
categories: 学习
keywords: 
description:
top_img: https://img.onew.us.kg/file/onew11730203304146582.png
comments: true
cover: https://img.onew.us.kg/file/onew11730203304146582.png
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
ai: 本文主要介绍作者下载了 2016 年到 2024 年的国考真题，想打印出来做，因页数多不知具体数量，便编写 Python 代码批量计算 PDF 页数。先介绍安装 PyPDF2 库的命令，接着给出代码，代码中函数可统计每个 PDF 页数及总页数，通过累加实现。最后展示代码运行效果截图。
---

今天下载了2016年到2024年的国考真题，准备拿在网上去打印出来做，因为想算一下大概多少钱，但是页数太多了不知道多少页，于是写下了以下Python代码来批量计算PDF的页数
# 安装PyPDF2库：
```python
pip install PyPDF2
```
# Python代码
```python
import PyPDF2
import os

def count_pdf_pages(directory):
    pdf_page_counts = {}
    total_pages = 0  # 初始化总页数为0
    for filename in os.listdir(directory):
        if filename.endswith(".pdf"):
            filepath = os.path.join(directory, filename)
            try:
                with open(filepath, "rb") as pdf_file:
                    pdf_reader = PyPDF2.PdfReader(pdf_file)
                    page_count = len(pdf_reader.pages)
                    pdf_page_counts[filename] = page_count
                    total_pages += page_count  # 累加每个PDF的页数
            except Exception as e:
                pdf_page_counts[filename] = f"Error: {e}"
    return pdf_page_counts, total_pages

directory_path = "D:/本地文件夹/桌面/2016-2024国考真题" # PDF所在的文件夹
page_counts, total_pages = count_pdf_pages(directory_path)

# 输出每个PDF的页数
for filename, page_count in page_counts.items():
    print(f"{filename}: {page_count} pages")

# 输出PDF总页数
print(f"Total pages across all PDFs: {total_pages}")

```
# 代码说明

count_pdf_pages 函数返回一个包含每个 PDF 文件页数的字典 pdf_page_counts，以及所有 PDF 的总页数 total_pages。

代码中使用 total_pages += page_count 来累计页数。
# 运行效果
![image.png](https://img.onew.us.kg/file/onew11730203304146582.png)
