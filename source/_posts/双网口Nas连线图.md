---
title: 双网口Nas连线图
date: 2024-09-19 07:57:09
updated: 2024-09-19 07:57:09
tags: 
    - 网络
    - Nas
categories: 学习
keywords: 
description:
top_img: https://img.onew.us.kg/file/onew11726703798884247.jpg
comments: true
cover: https://img.onew.us.kg/file/onew11726703798884247.jpg
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
ai: 这是一幅多网口设备的拓扑图。其前提是群辉具备两个网口，在群辉的虚拟机系统中安装了 iKuai 和 iStoreOS，其中 iStoreOS 可用于存储或虚拟化管理。该拓扑图中，设备通过物理网卡 eth0、eth1、eth2、eth3 与外部网络以及其他设备进行通信，而虚拟桥接 vmbr0、vmbr1、vmbr2 则用于连接虚拟机之间的通信，以此构建起一个复杂的网络架构。
---

# 介绍
这是一个包含多网口设备的拓扑图，前提是群辉要有两个网口，群辉虚拟机系统上安装了iKuai和iStoreOS（用于存储或虚拟化管理），并通过物理网卡（eth0、eth1、eth2、eth3）与外部网络和其他设备通信，虚拟桥接（vmbr0、vmbr1、vmbr2）用于连接虚拟机之间的通信。
![双网口Nas连线图.jpg](https://img.onew.us.kg/file/onew11726703798884247.jpg)