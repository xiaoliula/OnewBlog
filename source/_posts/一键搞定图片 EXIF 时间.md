---
title: 一键搞定图片 EXIF 时间
date: 2025-9-7 17:20:11
updated: 2025-9-7 17:20:11
tags: 
    - Python
    - Nas
categories: 学习
keywords: 
description:
top_img: https://img.onew.us.kg/file/根据代码生成博客封面.png
comments: true
cover: https://img.onew.us.kg/file/根据代码生成博客封面.png
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
ai: 
---

# 前言
最近在玩飞牛，而且之前在飞牛中部署了immich和飞牛自带的相册来进行相册管理，最近想着反正immich开着好像也没啥用，还不如就只用飞牛自带的相册，还减轻了系统的负担，于是开始了相册的迁移

# 遇到的问题
在进行相册的迁移的时候，我发现不知道什么时候有一部分照片和截图都跑在2024.11.11这一天来了，于是我开始了手动修改时间。改了两个多小时还有接近一千张照片，人麻了都。后来就想到可以用Python来处理文件，于是根据AI有了以下处理照片时间的代码（记得安装必要的包）
```python
import os
import re
from datetime import datetime
import piexif
from PIL import Image
import shutil

def validate_datetime(dt):
    """
    验证时间戳是否有效，如果超过2025年1月1日则使用2025-01-01 00:00:00
    """
    max_datetime = datetime(2025, 1, 1, 0, 0, 0)
    
    if dt > max_datetime:
        print(f"  ⚠️  时间戳 {dt} 超过2025年1月1日，使用: 2025:01:01 00:00:00")
        return max_datetime.strftime("%Y:%m:%d %H:%M:%S")
    
    return dt.strftime("%Y:%m:%d %H:%M:%S")

def parse_time_from_filename(filename):
    """
    从文件名解析时间信息，支持各种常见应用的时间格式
    """
    # 移除文件扩展名
    name_without_ext = os.path.splitext(filename)[0]
    
    print(f"  解析文件名: {name_without_ext}")
    
    # 1. retouch_ 格式: retouch_2024041520584151.jpg
    if name_without_ext.startswith('retouch_'):
        time_str = name_without_ext.replace('retouch_', '')
        if len(time_str) >= 14:
            time_str = time_str[:14]
            try:
                dt = datetime.strptime(time_str, '%Y%m%d%H%M%S')
                return validate_datetime(dt)
            except ValueError:
                pass
    
    # 2. mmexport 和时间戳格式
    timestamp_patterns = [
        r'mmexport(\d{10,13})',          # mmexport1633800347522
        r'idlefish-msg-(\d{10,13})',     # idlefish-msg-1728042452021
        r'wx_camera_(\d{10,13})',        # wx_camera_1633800347522
        r'^(\d{10,13})$',                # 纯数字时间戳
    ]
    
    for pattern in timestamp_patterns:
        match = re.search(pattern, name_without_ext)
        if match:
            timestamp = int(match.group(1))
            timestamp_str = match.group(1)
            
            # 根据长度判断秒或毫秒
            if len(timestamp_str) == 13:  # 毫秒
                timestamp /= 1000
            elif len(timestamp_str) == 10:  # 秒
                pass
            else:
                continue
                
            try:
                dt = datetime.fromtimestamp(timestamp)
                return validate_datetime(dt)
            except (ValueError, OSError):
                continue
    
    # 3. 常见应用的特殊格式
    app_specific_patterns = [
        # IMG_20181126_170558_120922.png -> 2018-11-26 17:05:58
        (r'IMG_(\d{8})_(\d{6})_(\d+)', 
         lambda m: datetime.strptime(f"{m[1]}{m[2]}", "%Y%m%d%H%M%S")),
        
        # B612Kaji_20190511_171707_656.jpg -> 2019-05-11 17:17:07
        (r'B612Kaji_(\d{8})_(\d{6})_(\d+)', 
         lambda m: datetime.strptime(f"{m[1]}{m[2]}", "%Y%m%d%H%M%S")),
        
        # Collage_20220912_113136.jpg -> 2022-09-12 11:31:36
        (r'Collage_(\d{8})_(\d{6})', 
         lambda m: datetime.strptime(f"{m[1]}{m[2]}", "%Y%m%d%H%M%S")),
        
        # Screenshot_20220912-113136.jpg -> 2022-09-12 11:31:36
        (r'Screenshot_(\d{8})[-_](\d{6})', 
         lambda m: datetime.strptime(f"{m[1]}{m[2]}", "%Y%m%d%H%M%S")),
        
        # PIC_20220912_113136.jpg -> 2022-09-12 11:31:36
        (r'PIC_(\d{8})_(\d{6})', 
         lambda m: datetime.strptime(f"{m[1]}{m[2]}", "%Y%m%d%H%M%S")),
        
        # Photo_2022-09-12_11-31-36.jpg -> 2022-09-12 11:31:36
        (r'Photo_(\d{4})-(\d{2})-(\d{2})_(\d{2})-(\d{2})-(\d{2})', 
         lambda m: datetime(int(m[1]), int(m[2]), int(m[3]), int(m[4]), int(m[5]), int(m[6]))),
    ]
    
    for pattern, converter in app_specific_patterns:
        match = re.search(pattern, name_without_ext)
        if match:
            try:
                dt = converter(match.groups())
                return validate_datetime(dt)
            except (ValueError, IndexError):
                continue
    
    # 4. 通用日期时间格式
    general_patterns = [
        # 紧凑格式: 20220916123045
        (r'(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})', 
         lambda m: datetime(int(m[1]), int(m[2]), int(m[3]), int(m[4]), int(m[5]), int(m[6]))),
        
        # 带分隔符: 2022-09-16_12-30-45
        (r'(\d{4})[-_](\d{2})[-_](\d{2})[-_](\d{2})[-_](\d{2})[-_](\d{2})', 
         lambda m: datetime(int(m[1]), int(m[2]), int(m[3]), int(m[4]), int(m[5]), int(m[6]))),
        
        # 日期时间组合: 20220916_123045
        (r'(\d{8})_(\d{6})', 
         lambda m: datetime.strptime(f"{m[1]}{m[2]}", "%Y%m%d%H%M%S")),
        
        # 日期时间组合（带分隔符）: 2022-09-16_12-30-45
        (r'(\d{4}-\d{2}-\d{2})_(\d{2}-\d{2}-\d{2})', 
         lambda m: datetime.strptime(f"{m[1].replace('-', '')}{m[2].replace('-', '')}", "%Y%m%d%H%M%S")),
    ]
    
    for pattern, converter in general_patterns:
        match = re.search(pattern, name_without_ext)
        if match:
            try:
                dt = converter(match.groups())
                return validate_datetime(dt)
            except (ValueError, IndexError):
                continue
    
    # 5. 只有日期的格式
    date_only_patterns = [
        # 20220916, 2022-09-16, 2022_09_16
        (r'(\d{4})[-_]?(\d{2})[-_]?(\d{2})', 
         lambda m: datetime(int(m[1]), int(m[2]), int(m[3]))),
        
        # 特定前缀+日期: Crossfire20220916, IMG20220916
        (r'^[A-Za-z_]*(\d{4})(\d{2})(\d{2})', 
         lambda m: datetime(int(m[1]), int(m[2]), int(m[3]))),
    ]
    
    for pattern, converter in date_only_patterns:
        match = re.search(pattern, name_without_ext)
        if match:
            try:
                dt = converter(match.groups())
                return validate_datetime(dt)
            except (ValueError, IndexError):
                continue
    
    # 6. 尝试查找任何8位数字（可能是日期）
    date_match = re.search(r'(\d{8})', name_without_ext)
    if date_match:
        date_str = date_match.group(1)
        try:
            dt = datetime.strptime(date_str, "%Y%m%d")
            return validate_datetime(dt)
        except ValueError:
            pass
    
    print(f"  无法识别文件名中的时间信息")
    return None

def get_time_from_exif(image_path):
    """
    从EXIF元数据中提取拍摄时间
    """
    try:
        if not image_path.lower().endswith(('.jpg', '.jpeg', '.tiff', '.tif')):
            return None
            
        exif_dict = piexif.load(image_path)
        
        time_fields = [
            (piexif.ExifIFD.DateTimeOriginal, 'Exif'),
            (piexif.ImageIFD.DateTime, '0th'),
        ]
        
        for field, section in time_fields:
            if field in exif_dict.get(section, {}):
                time_str = exif_dict[section][field]
                if isinstance(time_str, bytes):
                    time_str = time_str.decode('utf-8', errors='ignore')
                if time_str and time_str != '0000:00:00 00:00:00':
                    try:
                        dt = datetime.strptime(time_str, '%Y:%m:%d %H:%M:%S')
                        return validate_datetime(dt)
                    except ValueError:
                        continue
        
        return None
        
    except Exception:
        return None

def get_file_modify_time(image_path):
    """
    获取文件修改时间并进行验证
    """
    try:
        file_mtime = os.path.getmtime(image_path)
        dt = datetime.fromtimestamp(file_mtime)
        return validate_datetime(dt)
    except Exception:
        return None

def update_exif_datetime(image_path, new_datetime):
    """
    更新图像的EXIF时间字段
    """
    try:
        if not image_path.lower().endswith(('.jpg', '.jpeg', '.tiff', '.tif')):
            return False
            
        try:
            exif_dict = piexif.load(image_path)
        except:
            exif_dict = {"0th": {}, "Exif": {}, "GPS": {}, "1st": {}}
        
        exif_dict.setdefault("Exif", {})
        exif_dict.setdefault("0th", {})
        
        exif_dict['Exif'][piexif.ExifIFD.DateTimeOriginal] = new_datetime.encode('utf-8')
        exif_dict['0th'][piexif.ImageIFD.DateTime] = new_datetime.encode('utf-8')
        exif_dict['Exif'][piexif.ExifIFD.DateTimeDigitized] = new_datetime.encode('utf-8')
        
        exif_bytes = piexif.dump(exif_dict)
        
        img = Image.open(image_path)
        if img.mode in ('RGBA', 'LA'):
            img = img.convert('RGB')
        img.save(image_path, exif=exif_bytes, quality=100)
        img.close()
        
        return True
        
    except Exception:
        return False

def process_images(input_dir, output_dir):
    """
    处理输入目录中的图片，并输出到指定目录
    """
    if not os.path.exists(input_dir):
        print(f"输入目录不存在: {input_dir}")
        return
    
    os.makedirs(output_dir, exist_ok=True)
    
    supported_extensions = ('.jpg', '.jpeg', '.png', '.tiff', '.tif', '.webp', '.bmp', '.gif')
    stats = {
        'total': 0,
        'processed': 0,
        'skipped': 0,
        'sources': {'filename': 0, 'exif': 0, 'filetime': 0},
        'adjusted': 0
    }
    
    print("=" * 60)
    print("开始处理图片（增强版时间识别）...")
    print("=" * 60)
    
    for filename in os.listdir(input_dir):
        if filename.lower().endswith(supported_extensions):
            stats['total'] += 1
            input_path = os.path.join(input_dir, filename)
            output_path = os.path.join(output_dir, filename)
            
            print(f"📄 处理: {filename}")
            
            new_datetime = None
            time_source = "未知"
            
            # 1. 优先从文件名解析时间
            new_datetime = parse_time_from_filename(filename)
            if new_datetime:
                time_source = "文件名时间戳"
                stats['sources']['filename'] += 1
                if "2025:01:01 00:00:00" in new_datetime:
                    stats['adjusted'] += 1
            
            # 2. 从EXIF获取
            if not new_datetime:
                new_datetime = get_time_from_exif(input_path)
                if new_datetime:
                    time_source = "EXIF元数据"
                    stats['sources']['exif'] += 1
                    if "2025:01:01 00:00:00" in new_datetime:
                        stats['adjusted'] += 1
            
            # 3. 使用文件修改时间
            if not new_datetime:
                new_datetime = get_file_modify_time(input_path)
                if new_datetime:
                    time_source = "文件修改时间"
                    stats['sources']['filetime'] += 1
                    if "2025:01:01 00:00:00" in new_datetime:
                        stats['adjusted'] += 1
                else:
                    print(f"  ❌ 无法获取时间信息，跳过")
                    stats['skipped'] += 1
                    print("")
                    continue
            
            # 处理文件
            try:
                shutil.copy2(input_path, output_path)
                
                if update_exif_datetime(output_path, new_datetime):
                    print(f"  ✅ 成功 - 来源: {time_source}")
                    print(f"  🕒 时间: {new_datetime}")
                    stats['processed'] += 1
                else:
                    if not output_path.lower().endswith(('.jpg', '.jpeg', '.tiff', '.tif')):
                        print(f"  ✅ 已复制（格式不支持EXIF）")
                        stats['processed'] += 1
                    else:
                        print(f"  ❌ EXIF更新失败")
                        stats['skipped'] += 1
                        
            except Exception as e:
                print(f"  ❌ 文件操作错误: {e}")
                stats['skipped'] += 1
            
            print("")
    
    print("=" * 60)
    print("处理完成！ 📊 统计信息")
    print("=" * 60)
    print(f"总文件数: {stats['total']}")
    print(f"成功处理: {stats['processed']}")
    print(f"跳过处理: {stats['skipped']}")
    print(f"时间调整: {stats['adjusted']}")
    print("")
    print("时间来源分布:")
    print(f"  📁 文件名: {stats['sources']['filename']}")
    print(f"  🔍 EXIF: {stats['sources']['exif']}")
    print(f"  ⏰ 文件时间: {stats['sources']['filetime']}")

if __name__ == "__main__":
    input_directory = r".\input_directory"
    output_directory = r".\output_photos"
    
    process_images(input_directory, output_directory)
```

# 效果

![image_00.png](https://img.onew.us.kg/file/Snipaste_2025-09-07_19-09-18.png)
![image_01.png](https://img.onew.us.kg/file/b2401f993f21eb556693e6a0f2aa1368.jpg)

# 结语
OK，还是很成功的，把原来照片的正确拍摄时间都输出了。