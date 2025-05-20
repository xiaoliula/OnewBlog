---
title: 本地部署MinIO通过Java实现文件上传
date: 2024-05-21 20:12:00
updated: 2024-05-21 20:12:00
tags:  
    - Java
    - MinIO
categories: 学习
keywords: 
description:
top_img: https://gitee.com/xiaoliula/image/raw/master/scenery2/5.webp
comments: true
cover: https://gitee.com/xiaoliula/image/raw/master/scenery2/5.webp
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
ai: 文章介绍了使用 MinIO 进行文件上传的步骤：添加依赖：在 pom.xml 中添加 MinIO 依赖，然后刷新 Maven 项目。新建 Maven 项目：给出示例代码，包含 MinIO 客户端初始化、检查存储桶是否存在（不存在则创建）以及使用文件流上传文件的逻辑。展示上传结果：附上了上传结果的图片。
---

# 添加依赖
打开pom.xml文件，将的 MinIO依赖添加进去，并保存文件，示例代码为：
```language
<dependency>
    <groupId>io.minio</groupId>
    <artifactId>minio</artifactId>
    <version>8.5.10</version>
</dependency>
```
# 新建Maven项目
右键单击文件编辑区域，选择Maven>>>Reload Project，或在右侧的Maven工具窗口中点击刷新按钮。
# 新建Maven项目
```language
package org.example;

import io.minio.MinioClient;
import io.minio.errors.MinioException;
import io.minio.BucketExistsArgs;
import io.minio.MakeBucketArgs;
import io.minio.PutObjectArgs;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;

public class MinioUploader {

    public static void main(String[] args) {
        // MinIO 服务器信息
        String endpoint = "http://localhost:9000";
        String accessKey = "YOUR_ACCESS_KEY";
        String secretKey = "YOUR_SECRET_KEY";
        String bucketName = "YOUR_BUCKET_NAME";

        // 要上传的文件信息
        String objectName = "example.jpg"; // 文件在 MinIO 中的对象键
        String filePath = "path/to/your/file/example.jpg"; // 本地文件路径

        // 初始化 MinIO 客户端
        try {
            MinioClient minioClient = MinioClient.builder()
                    .endpoint(endpoint)
                    .credentials(accessKey, secretKey)
                    .build();

            // 检查存储桶是否存在，不存在则创建
            boolean isExist = minioClient.bucketExists(
                    BucketExistsArgs.builder().bucket(bucketName).build());
            if (!isExist) {
                minioClient.makeBucket(
                        MakeBucketArgs.builder().bucket(bucketName).build());
            }

            // 使用文件流上传文件
            try (InputStream inputStream = new FileInputStream(filePath)) {
                minioClient.putObject(
                        PutObjectArgs.builder()
                                .bucket(bucketName)
                                .object(objectName)
                                .stream(inputStream, inputStream.available(), -1)
                                .build());
                System.out.println("File uploaded successfully.");
            } catch (IOException e) {
                e.printStackTrace();
            }

        } catch (MinioException | NoSuchAlgorithmException | InvalidKeyException | IOException e) {
            e.printStackTrace();
        }
    }
}
```
# 上传结果
![image.png](https://img.onew.us.kg/file/11725862415730969.png)