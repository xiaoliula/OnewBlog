---
title: Cloudflare Workers & Pages 优选域名设置
date: 2025-7-15 20:30:25
updated: 2025-7-15 20:30:31
tags: 
    - Cloudflare
    - 优选域名
    - Worker
    - Pgaes
categories: 学习
keywords: 
description:
top_img: https://img.onew.us.kg/file/spacexcode-coverview-527@2x.jpg
comments: true
cover: https://img.onew.us.kg/file/spacexcode-coverview-527@2x.jpg
toc:
toc_number:
toc_style_simple:
copyright: 
copyright_author: Borislav Hadzhiev
copyright_author_href:
copyright_url:
copyright_info: 本博客所有文章除特别声明外，均采用 CC BY-NC-SA 4.0 许可协议。转载请注明来自 CMLiussss Blog！
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

# 使用优选域名加速 Workers & Pages 项目

最近一直沉迷于如何使我的博客打开更快，寻找了许多方法，但最后发现根源是我的图床访问太慢而导致网站访问太慢，而我的图床是通过Cloudflare Pages搭建的，所以我找到了以下教程。

## 事前准备

首先，你需要确定将要使用的优选域名。你可以使用自建的优选域名，也可以使用网友公益维护的优选域名。更多优选内容参考 [CloudFlare优选](https://blog.cmliussss.com/p/CloudFlare优选)

**本教程演示使用的优选域名为：`visa.cn`**

你需要一个已经转入 Cloudflare 的域名（不能使用双向解析的免费域名），示例：`cmliussss.us.kg`。

---

# 为 Workers 项目使用优选域名

**本教程演示的 Worker 使用的自定义域名示例为：`img.cmliussss.us.kg`**

## 步骤1：设置自定义域 CNAME 记录至优选域名

给你将要使用的域名 `cmliussss.us.kg`，添加一个 `CNAME` 类型的解析记录：
- **名称**：`img`（自定义域）
- **目标**：`visa.com`（优选域名）

{% note warning simple %}
**重要提示**：不要打开小黄云（Cloudflare 的代理功能）！！！
{% endnote %}

![image1.png](https://img.onew.us.kg/file/e9dc78abb8dfb956668c4.png)

## 步骤2：给 Workers 项目添加路由

1. 选中 `cmliussss.us.kg` 域名后，左侧选择 **Workers 路由** > **添加路由**
![image2.png](https://img.onew.us.kg/file/98aa2df4645cc4bfa2580.png)
2. **路由**填入：`img.cmliussss.us.kg/*`
3. **Worker** 选中对应的 Worker 项目名
4. 点击保存

{% note danger simple %}
**注意**  
自定义域末位必须加上 `/*`，即 `img.cmliussss.us.kg/*`！
自定义域末位必须加上 `/*`，即 `img.cmliussss.us.kg/*`！
自定义域末位必须加上 `/*`，即 `img.cmliussss.us.kg/*`！
{% endnote %}

![image3.png](https://img.onew.us.kg/file/9e988e5378956dfc3b455.png)

### Workers 项目优选前后对比

![image4.png](https://img.onew.us.kg/file/6dc17a4f963fc06c0b4ea.png)

---

# 为 Pages 项目使用优选域名

**本教程演示的 Pages 使用的自定义域名示例为：`img.cmliussss.us.kg`**

## 步骤1：为 Pages 项目添加自定义域

1. 给 Pages 项目添加自定义域
2. 记录 CNAME 目标域名：`telegraph-image-1if.pages.dev`
3. 等待自定义域生效

![image5.png](https://img.onew.us.kg/file/78e861057ace773f4ff8f.png)

## 步骤2：使用华为云国际版-云解析服务 DNS

{% note info simple %}
国际版不需要实名，注册时若频繁跳转国内版本，请开启全局代理模式
{% endnote %}

![images6.png](https://img.onew.us.kg/file/c8030b85f0e72525e9801.png)

1. **注册华为云国际版**
2. **设置安全手机**（可跳过）

![images7.png](https://img.onew.us.kg/file/83a19bee9f105b7cd5fdf.png)

3. **开通华为云**

![image8.png](https://img.onew.us.kg/file/4182536ad257fbde94a3b.png)

4. **完善信息**（注册完成，无视绑定提示）

![image9.png](https://img.onew.us.kg/file/08291704cc96a8f288e79.png)

## 步骤3：添加自定义域至云解析服务 DNS

1. 进入 **云解析服务 DNS** > **公网域名**

![image10.png](https://img.090227.xyz/file/a4b2b5f8579615fbb122a.png)

2. 点击 **创建公网域名**

![image11.png](https://img.onew.us.kg/file/f27c15cb84011622a0110.png)

3. 填入域名：`img.cmliussss.us.kg`

![image12.png](https://img.onew.us.kg/file/f07ba2061e385b516bc21.png)

4. 点击 **管理解析** > **添加记录集**

![image13.png](https://img.onew.us.kg/file/c404d79a2f8f511288546.png)
![image14.png](https://img.onew.us.kg/file/6e85717a34a755e141b40.png)

5. 添加第一条 CNAME 记录：
   - **线路类型**：全网默认
   - **记录值**：`telegraph-image-1if.pages.dev`

![image15.png](https://img.onew.us.kg/file/59937ead342070608a1d0.png)

6. 添加第二条 CNAME 记录：
   - **线路类型**：地域解析 > 中国大陆
   - **记录值**：`visa.cn`

![image16.png](https://img.onew.us.kg/file/a42f895263bf9627cc69d.png)

7. 复制保存所有 NS 记录值：
   ```plaintext
   ns1.huaweicloud-dns.com.
   ns1.huaweicloud-dns.cn.
   ns1.huaweicloud-dns.net.
   ns1.huaweicloud-dns.org.
   ```

![image17.png](https://img.onew.us.kg/file/43fc15db50101cc394d06.png)

## 步骤4：设置自定义域NS 记录至华为云 NS 记录
   ```plaintext
   ns1.huaweicloud-dns.com.
   ns1.huaweicloud-dns.cn.
   ns1.huaweicloud-dns.net.
   ns1.huaweicloud-dns.org.
   ```

![image18.png](https://img.onew.us.kg/file/2864241a903fdefb7250a.png)

# Pages 项目优选前后对比

![image19.png](https://img.onew.us.kg/file/6dc17a4f963fc06c0b4ea.png)