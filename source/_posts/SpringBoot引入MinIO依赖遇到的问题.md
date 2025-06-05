---
title: SpringBoot引入MinIO依赖遇到的问题
date: 2024-05-23 13:35:00
updated: 2024-05-23 13:35:00
tags: 
    - Java
    - MinIO
categories: 学习
keywords: 
description:
top_img: https://gitee.com/xiaoliula/image/raw/master/scenery2/7.webp
comments: true
cover: https://gitee.com/xiaoliula/image/raw/master/scenery2/7.webp
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
ai: 本文主要介绍了 MinIO Java SDK 相关信息，包括参考文档、依赖下载地址及 JDK 要求，还给出三个常见异常的 Maven 配置解决办法。
---

参考官方文档SDK：https://docs.min.io/docs/java-client-quickstart-guide.html
MinIO Java SDK is Simple Storage Service (aka S3) client to perform bucket and object operations to any Amazon S3 compatible object storage service.
MinIO依赖jar包下载地址：[MinIO](Central Repository: io/minio/minio)
JDK最低要求：Java 1.8 或更高版本。
# 【异常1】maven仓库MinIO 8.3.4下载很慢
解决办法：maven设置依赖下载地址
```language
<repositories>
    <repository>
        <id>public</id>
        <name>aliyun nexus</name>
        <url>http://maven.aliyun.com/nexus/content/groups/public/</url>
        <releases>
            <enabled>true</enabled>
        </releases>
    </repository>
</repositories>

<pluginRepositories>
    <pluginRepository>
        <id>public</id>
        <name>aliyun nexus</name>
        <url>http://maven.aliyun.com/nexus/content/groups/public/</url>
        <releases>
            <enabled>true</enabled>
        </releases>
        <snapshots>
            <enabled>false</enabled>
        </snapshots>
    </pluginRepository>
</pluginRepositories>
```
# 【异常2】Caused by: java.lang.RuntimeException: Unsupported OkHttp library found. Must use okhttp >= 4.8
解决办法：maven引入minio排除okhttp依赖并添加高版本的okhttp依赖，如okhttp 4.9.0

```language
<!-- 对象存储 MinIO -->
<dependency>
    <groupId>io.minio</groupId>
    <artifactId>minio</artifactId>
    <version>8.3.4</version>
    <exclusions>
        <exclusion>
            <groupId>com.squareup.okhttp3</groupId>
            <artifactId>okhttp</artifactId>
        </exclusion>
    </exclusions>
</dependency>

<dependency>
    <groupId>com.squareup.okhttp3</groupId>
    <artifactId>okhttp</artifactId>
    <version>4.9.0</version>
</dependency>
```
# 【异常3】NoSuchMethodError kotlin.collections.ArraysKt.copyInto([B[BIII)...
```language
<!-- https://mvnrepository.com/artifact/org.jetbrains.kotlin/kotlin-stdlib -->
<dependency>
    <groupId>org.jetbrains.kotlin</groupId>
    <artifactId>kotlin-stdlib</artifactId>
    <version>1.3.70</version>
</dependency>
```