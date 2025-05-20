---
title: 本地部署MinIO通过Java实现文件下载
date: 2024-05-21 21:42:00
updated: 2024-05-21 21:42:00
tags:  
    - Java
    - MinIO
categories: 学习
keywords: 
description:
top_img: https://gitee.com/xiaoliula/image/raw/master/scenery2/6.webp
comments: true
cover: https://gitee.com/xiaoliula/image/raw/master/scenery2/6.webp
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
ai: 文章介绍了作者提供了一个名为 MinioDownloader 的 Java 类代码，旨在从 MinIO 服务器下载文件。代码通过 MinioClient 构建客户端连接到指定服务器，使用访问密钥认证，从特定存储桶下载名为 “image.jpg” 的对象，再将其保存至本地路径，下载成功会输出提示，失败则捕获异常并输出错误信息，同时展示了运行结果的图片但未对图片内容说明。
---

# 1.实现代码
```language
import io.minio.MinioClient;
import io.minio.GetObjectArgs;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Paths;

public class MinioDownloader {
    public static void main(String[] args) {
        try {
            // 初始化 Minio 客户端
            MinioClient minioClient = MinioClient.builder()
                .endpoint("http://minio.example.com")  // MinIO 服务器地址
                .credentials("accessKey", "secretKey") // 访问密钥
                .build();

            // 下载对象到本地文件
            InputStream inputStream = minioClient.getObject(
                GetObjectArgs.builder()
                    .bucket("your-bucket-name") // 存储桶名称
                    .object("image.jpg")        // 对象键（文件名）
                    .build()
            );

            // 保存到本地文件
            Files.copy(inputStream, Paths.get("/path/to/save/image.jpg"));

            System.out.println("文件下载成功！");
        } catch (Exception e) {
            System.out.println("文件下载失败：" + e.getMessage());
        }
    }
}
```
# 2.运行结果
![image.png](https://img.onew.us.kg/file/11725862526867593.png)