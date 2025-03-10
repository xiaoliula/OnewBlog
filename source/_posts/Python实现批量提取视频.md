---
title: Python实现批量提取视频
date: 2024-09-09 00:23:00
updated: 2024-09-09 00:23:00
tags: 
    - Python
    - Windows技巧
    - Immich
categories: 学习
keywords: 
description:
top_img: https://gitee.com/xiaoliula/image/raw/master/scenery2/11.webp
comments: true
cover: https://gitee.com/xiaoliula/image/raw/master/scenery2/11.webp
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
ai: 博主在使用 nas 时，因 immich 无法批量筛选视频，决定下载全部内容并用 Python 代码批量提取视频到指定文件夹。文章给出 Python 代码及解释，还介绍了解决运行代码时中文乱码的方法，最终成功提取 386 个视频，共 23G，有 3 个未提取到。
---

# 前言
最近在玩nas，但是之前把视频和照片都上传到immich了，因为我可以直接在手机中上传照片，但是因为手机内存不够就把视频全删了的，现在只需要把视频下载下来上传到nas中就OK。但是现在问题是immich这东西不支持批量删选视频，只能全选照片和视频，而且一共有50个G的照片和视频，视频只有三百八十几个，手动提取未免太看得起我了。于是现在就有了下载全部内容，然后待会儿就用Python代码批量提取视频到指定文件夹。（前提：安装7.zip解压缩软件并且能够找到安装目录）

![image.png](https://img.onew.us.kg/file/11725863551847104.png)
![image.png](https://img.onew.us.kg/file/11725863566415301.png)

#  Python代码批量提取指定格式的视频
```language
import os
import subprocess
import glob

# 7-Zip 可执行文件路径（请确认 7z.exe 的路径）
seven_zip_path = r"D:\APP\7.zip\7-Zip\7z.exe"

# 定义包含多个压缩包的文件夹路径
zip_folder = r'D:\本地文件夹\桌面\视频'

# 定义目标文件夹路径，用于保存所有视频文件
extract_folder = r'D:\本地文件夹\桌面\视频1'

# 创建目标文件夹（如果不存在）
if not os.path.exists(extract_folder):
    os.makedirs(extract_folder)

# 获取所有压缩包文件列表（.zip, .rar, .7z）
zip_files = glob.glob(os.path.join(zip_folder, '*.zip'))

# 支持的视频文件扩展名
video_extensions = ['.mp4', '.avi', '.mov', '.wmv', '.flv', '.mkv', '.3gp', '.webm', '.mpeg', '.mpg']

# 遍历每个压缩包文件
for zip_file in zip_files:
    print(f'正在处理压缩包: {zip_file}')
    
    try:
        # 通过 7-Zip 列出压缩包中的所有文件，并处理中文编码问题
        command = [seven_zip_path, 'l', zip_file]
        result = subprocess.run(command, capture_output=True, text=True, encoding='gbk')
        
        # 检查压缩包中是否有视频文件
        for line in result.stdout.splitlines():
            for ext in video_extensions:
                if ext in line:
                    # 如果有视频文件，则解压
                    command = [seven_zip_path, 'e', zip_file, f'-o{extract_folder}', f'*{ext}', '-y']  # '-y' 自动跳过覆盖提示
                    extract_result = subprocess.run(command, capture_output=True, text=True, encoding='gbk')
                    
                    # 输出提取的文件信息
                    if "Everything is Ok" in extract_result.stdout:
                        print(f'已提取视频文件: {line} from {os.path.basename(zip_file)}')
                    else:
                        print(f'解压失败: {zip_file}')
    
    except subprocess.CalledProcessError as e:
        print(f'压缩包处理失败: {zip_file}, 错误: {str(e)}')

print('所有压缩包中的视频文件提取完成。')
```
注：我的桌面是转移到了D盘，请勿照抄这部分内容
# 代码解释
- 定义文件夹路径：
zip_folder：指定包含多个压缩包文件的文件夹路径。
extract_folder：指定解压后保存所有视频文件的目标文件夹路径。

- 创建目标文件夹：
如果指定的目标文件夹不存在，使用 os.makedirs() 创建它。

- 获取压缩包列表：
使用 glob.glob() 获取 zip_folder 中所有以 .zip 结尾的文件。

- 遍历压缩包：
对每个压缩包文件，使用 zipfile.ZipFile(zip_file, 'r') 打开压缩包。

- 遍历文件：
使用 zip_ref.namelist() 获取压缩包中的所有文件列表。
对于每个文件，提取文件名，并检查其扩展名是否属于视频文件的扩展名列表 (video_extensions)。

- 解压视频文件：
使用 zip_ref.read(file) 读取压缩包中的文件内容。
使用 open(video_file_in_zip, 'wb') 打开目标文件，在本地保存解压的视频文件内容。
# 实现效果
运行代码中文会乱码是因为编码问题，在网上找到了解决办法，在cmd里运行以下代码
```language
set PYTHONIOENCODING=utf-8 
```
再执行Python，执行一次就行了，运行别的代码也不会中文乱码了（通过 PYTHONIOENCODING 环境变量解决）。

![image.png](https://img.onew.us.kg/file/11725863814762400.png)
![image.png](https://img.onew.us.kg/file/11725863834614766.png)
![image.png](https://img.onew.us.kg/file/11725863848574105.png)

# 结果
一共389个视频，提取出来386个视频，一共23G，有3个没有提取到，不知道是不是格式问题，总的来说问题不大。

![image.png](https://img.onew.us.kg/file/1172586389038756.png)
![image.png](https://img.onew.us.kg/file/11725863906661140.png)
![image.png](https://img.onew.us.kg/file/11725863934692421.png)