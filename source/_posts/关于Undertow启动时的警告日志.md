---
title: 关于Undertow启动时的警告日志
date: 2024-05-26 12:41:00
updated: 2024-05-26 12:41:00
tags: Java
categories: 学习
keywords: 
description:
top_img: https://gitee.com/xiaoliula/image/raw/master/scenery2/9.webp
comments: true
cover: https://gitee.com/xiaoliula/image/raw/master/scenery2/9.webp
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
ai: 使用 Undertow 作为 Spring Boot 嵌入式服务器启动应用时会出现警告日志，解决方法有两种：一是未用 WebSocket 技术可排除 undertow - websockets - jsr 依赖；二是为 WebSocketDeploymentInfo 设置合理参数，两种方式经测试均有效。
---

# 错误提示：
当使用 Undertow 作为 Spring Boot 嵌入式服务器时，启动应用。会看到有一条 WARN 日志，如下：
```language
UT026010: Buffer pool was not set on WebSocketDeploymentInfo, the default pool will be used
```
# 解决方法如下：
## 排除undertow-websockets-jsr依赖
如果未使用到 WebSocket 技术，那么可以直接从 spring-boot-starter-undertow 中排除 undertow-websockets-jsr 依赖即可，当然，既然引入了那就肯定能用到，参考第二条。
```language
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-undertow</artifactId>
    <exclusions>
        <!-- 排除 undertow-websockets-jsr 依赖 -->
        <exclusion>
            <groupId>io.undertow</groupId>
            <artifactId>undertow-websockets-jsr</artifactId>
        </exclusion>
    </exclusions>
</dependency>
```
## 为WebSocketDeploymentInfo设置合理的参数
也可以通过上述的 “编程式” 配置方式，为 WebSocketDeploymentInfo 设置一个合理的参数。如下：
```language
import org.springframework.boot.web.embedded.undertow.UndertowServletWebServerFactory;
import org.springframework.boot.web.server.WebServerFactoryCustomizer;
import org.springframework.context.annotation.Configuration;

import io.undertow.server.DefaultByteBufferPool;
import io.undertow.websockets.jsr.WebSocketDeploymentInfo;

@Configuration
public class UndertowConfiguration implements WebServerFactoryCustomizer<UndertowServletWebServerFactory>{

    @Override
    public void customize(UndertowServletWebServerFactory factory) {
        factory.addDeploymentInfoCustomizers(deploymentInfo -> {
            
            WebSocketDeploymentInfo webSocketDeploymentInfo = new WebSocketDeploymentInfo();
            
            // 设置合理的参数
            webSocketDeploymentInfo.setBuffers(new DefaultByteBufferPool(true, 8192));
            
            deploymentInfo.addServletContextAttribute("io.undertow.websockets.jsr.WebSocketDeploymentInfo", webSocketDeploymentInfo);
        });
    }
}
```
经过测试，上述 2 种方式都可以解决 Undertow 启动时有警告日志的问题。