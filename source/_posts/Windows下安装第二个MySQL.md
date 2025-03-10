---
title: Windows下安装第二个MySQL
date: 2025-01-09 14:37:57
updated: 2025-01-09 14:37:57
# password: 2024年12月4日
# abstract: ""
# message: 往事而已
# wrong_pass_message: 真想知道就去问问作者吧
# theme: wave
tags: 
    - MySQL
categories: 学习
keywords: 
description:
top_img: https://img.onew.us.kg/file/onew117364046699359.webp
comments: true
cover: https://img.onew.us.kg/file/onew117364046699359.webp
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
ai: 本文主要介绍了作者因项目学习需要，在已安装MySQL5.7 msi版的基础上安装MySQL8.0 zip版。先给出下载链接，安装时强调解压位置、配置文件修改要点，如端口号等。详细说明初始化、安装服务、开启服务、登录及设置密码等步骤，还介绍Navicat连接方法和额外配置（添加外网访问权限、创建用户等）。随后分享踩坑经验，包括连接报错、服务启动问题、命令执行报错、Navicat连接报错等及解决办法。最后，作者推荐通过docker安装MySQL并给出docker-compose文件，还罗列了MySQL常用命令，涵盖连接数据库、管理数据库和表、用户权限管理、数据操作等多方面。
---

# 前言
之前我安装了一个MySQL5.7的msi版，最近因为项目学习需要安装MySQL8.0。

# 下载
如果安装第一个MySQL是msi版，那么第二个MySQL需要zip版本，msi版链接地址：[https://downloads.mysql.com/archives/installer/](https://downloads.mysql.com/archives/installer/)，zip版链接地址：[https://downloads.mysql.com/archives/community/](https://downloads.mysql.com/archives/community/)，这边我使用的MySQL8.0.40的zip版。

# 安装
下载后的压缩包解压（注意选好安装位置，文件夹路径最好纯英文且不带空格，中文可能出现意想不到的问题）：

![image.png](https://img.onew.us.kg/file/onew11736400717422830.png)

下面是配置文件my.ini，按需修改，注意端口号不能和第一个MySQL默认的3306重复：
```bush
[mysql]
# 设置mysql客户端默认字符集
default-character-set=utf8mb4

[mysqld]
# 设置3307端口
port = 3307
# 设置mysql的安装目录
basedir=D:\\study\\MySQL8.0.40\\mysql-8.0.40-winx64
# 设置 mysql数据库的数据的存放目录，MySQL 8+ 不需要以下配置，系统自己生成即可
# datadir=D:\\study\\MySQL8.0.40\\mysql-8.0.40-winx64\\data
# 允许最大连接数
max_connections=100
# 服务端使用的字符集默认为8比特编码的utf8mb4字符集
character-set-server=utf8mb4
# 创建新表时将使用的默认存储引擎
default-storage-engine=INNODB
# 设置bind-address，确保 MySQL 仅接受来自本地的连接
bind-address = 0.0.0.0
# 防止不兼容SQL执行
sql_mode = STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION
# 设置InnoDB缓存大小
innodb_buffer_pool_size = 256M
# 设置错误日志位置
log_error = D:\\study\\MySQL8.0.40\\mysql-8.0.40-winx64\\data\\mysql_error.log

```
将配置文件放在解压的根目录下，注意后缀，Windows默认新建txt文件的后缀是txt，如不显示自行百度

![image.png](https://img.onew.us.kg/file/onew11736401103802572.png)

以管理员身份打开命令行，执行下列命令将目录切换到你解压文件的bin目录

```shell
d:
cd study/MySQL8.0.40/mysql-8.0.40-winx64/bin
```
![image.png](https://img.onew.us.kg/file/onew11736401296324885.png)

初始化Mysql，Mysql8.0之后自动生成data文件夹
```shell
mysqld  --initialize-insecure （不设置root密码）
 
//生成的密码在实际连接的时候可能会不小心输入错误或忘记，导致无法连接Mysql
mysqld  --initialize --console（在控制台生成一个随机的root密码）
```
执行命令后会自动生成data文件夹

![image.png](https://img.onew.us.kg/file/onew1173640150129170.png)

安装MySQL服务，服务名称不能和之前的服务名称相同
```shell
//安装mysql服务
mysqld install mysql8
 
//卸载mysql服务
sc delete mysql(需要管理员权限)
 
//移除mysql服务（需要停止mysql）
mysqld -remove
```
执行命令成功后会出现Service successfully installed

![image.png](https://img.onew.us.kg/file/onew11736401650896826.png)

开启Mysql服务

```shell
net start mysql8
```
![image.png](https://img.onew.us.kg/file/onew11736401789977719.png)

在任务管理器中的服务也可以启动服务

![image.png](https://img.onew.us.kg/file/onew11736401839950712.png)

登录Mysql

```shell
mysql -u root -p
```
设置（修改）密码
```shell

//切换数据库
use mysql;
 
//修改root用户的密码为root，根据需要自己设置
alter user 'root'@localhost identified by 'root';
 
//刷新权限,一般修改密码或授权用户的时候需要使用
flush privileges;
 
 //退出mysql,两个都可以正常退出数据库
 quit
 exit
```
注意：Mysql8.0之后修改密码的方式无法使用password函数!
Navicat连接MySQL，这里我用的是Navicat15，按需下载，连接名任意，端口为配置文件中的端口号，密码为刚才修改的密码，输入后点击测试连接，连接成功即可。

![image.png](https://img.onew.us.kg/file/onew11736402013545532.png)
![image.png](https://img.onew.us.kg/file/onew11736402116826171.png)

# 额外配置
## 添加外网访问权限
```shell
//切换数据库
use mysql
//更新用户的host
update user set host='%' where user='root';
//授权
grant all privileges on *.* to 'root'@'%' with grant option;
//刷新
flush privileges;
```
## 创建用户waggag并授远程访问权
```shell
//创建用户
create user 'waggag'@'%' identified by '123456';
//授予权限
GRANT ALL ON *.* TO 'waggag'@'%' WITH GRANT OPTION;
//刷新权限
flush privileges;
```

# 踩的坑
至于为什么踩的坑最后来写纯粹是因为让看见这篇博客的人再踩一次来根据问题找答案
## 连接报错Client does not support authentication protocol requested by server
Navicat 12版本之后不会报错，mysql8.0 引入了新特性 caching_sha2_password；这种密码加密方式客户端不支持；客户端支持的是mysql_native_password 这种加密方式。查看加密方式：
```shell
select host,user,plugin from user;
```
![image.png](https://img.onew.us.kg/file/onew11736402347069920.png)

修改root用户的加密方式：
```shell
alter user 'root'@localhost identified with mysql_native_password BY 'root';
```
注意：一般升级下Navicate的版本即可，不建议修改加密方式。
### 加密方式
caching_sha2_password as the Preferred Authentication Plugin（caching_sha2_password作为首选身份验证插件）

The caching_sha2_password and sha256_password authentication plugins provide more secure password encryption than the mysql_native_password plugin, andcaching_sha2_password provides better performance than sha256_password. Due to these superior security and performance characteristics of caching_sha2_password, it is as of MySQL 8.0 the preferred authentication plugin, and is also the default authentication plugin rather than mysql_native_password. This change affects both the server and the libmysqlclient client library。

翻译：该caching_sha2_password和 sha256_password认证插件提供比更安全的密码加密mysql_native_password插件，并 caching_sha2_password提供了比更好的性能sha256_password。由于这些优越的安全性和性能特征 caching_sha2_password，它是MySQL 8.0的首选认证插件，也是默认的认证插件而不是 mysql_native_password。此更改会影响服务器和libmysqlclient客户端库。

官方文档：[https://dev.mysql.com/doc/refman/8.0/en/upgrading-from-previous-series.html#upgrade-caching-sha2-password](https://dev.mysql.com/doc/refman/8.0/en/upgrading-from-previous-series.html#upgrade-caching-sha2-password)
## 启动服务时一直显示正在启动
当出现这种情况时需要修改mysql8服务的注册表，使用快捷键win+r打开运行窗口，输入regedit然后回车打开注册表，然后根据下面的路径，找到刚才新安装的mysql8

![image.png](https://img.onew.us.kg/file/onew11736402965361213.png)

这里可以看到我刚才新的mysql8的数值数据指向的地址确实之前安装mysql5的路径，所以这里是不对的，将下面的内容前面的路径内容改为自己mysql8正确的路径即可

修改前：
![image.png](https://img.onew.us.kg/file/onew11736403038504221.png)

修改后（(注意只需要修改路径，后面的mysqld mysql8这个内容不需要动)）：

![image.png](https://img.onew.us.kg/file/onew11736403060904481.png)

现在就可以顺利启动了

## 执行mysqld --initialize --console 命令报错：--initialize specified but the data directory has files in it. Aborting.
改成如下命令即可执行成功：
```shell
mysqld --defaults-file=D:\Environment\mysql-8.0.27\my.ini --initialize --console （注意：修改为自己的my.ini路径！）
```
## 连接Navicat报错：Access denied for user ‘root’@’localhost’ (using password:YES)
首先确认需要连接的端口和密码正确，其次才是后面的解决办法
### 修改用户表和权限
需要登录到MySQL。使用以下命令：
```shell
mysql -u root -p
```
接着，查看当前的用户和主机信息：
```shell
SELECT user, host FROM mysql.user;
```
这将显示所有用户及其对应的主机。默认情况下，root用户可能只允许从localhost连接。为了允许来自任何IP的连接，需要将host字段设置为'%'，这表示任何IP。可以通过以下命令来更新root用户的host值：
```shell
UPDATE mysql.user SET host = '%' WHERE user = 'root';
```
或者，可以使用GRANT语句来赋予root用户从任何IP连接的权限：
```shell
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY 'root';
```
这里的*.*表示所有数据库和所有表，'root'@'%'指定了root用户和任何IP地址。

### 刷新权限和更改认证方式

更改完用户表和权限后，需要刷新权限，使更改生效：
```shell
FLUSH PRIVILEGES;
```
因为是MySQL 8及以上版本，可能还需要更改用户的认证方式，因为MySQL 8默认使用的加密方式与早期版本不同。可以使用以下命令来更改加密方式：
```shell
ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY 'root';
```
这将把root用户的加密方式更改为mysql_native_password，这是与MySQL 5兼容的加密方式。
# 结语
其实相对于从本机安装MySQL我更趋向于通过docker安装MySQL，这样就不用配置那么繁琐，只需要修改映射端口即可，下面我给出一份docker-compose文件，各求所需吧（拉取docker的镜像地址：https://one-w.us.kg）：
```shell
version: '3.8'  # 指定 Docker Compose 文件格式版本。版本 3.8 是一个常用的、与 Docker 兼容的版本

services:  # 定义要启动的服务
  mysql:  # 定义名为 "mysql" 的服务
    image: mysql:8.0  # 使用 MySQL 8.0 官方 Docker 镜像
    container_name: MySQL8.0  # 给这个 MySQL 容器指定名称为 "MySQL8.0"
    environment:  # 设置环境变量，用于配置容器内部的 MySQL
      TZ: Asia/Shanghai  # 设置容器内的时区为上海（Asia/Shanghai）
      MYSQL_ROOT_PASSWORD: root  # 设置 MySQL 的 root 用户密码为 "root"
      MYSQL_ROOT_HOST: "%"  # 允许 root 用户从任何 IP 地址（% 代表任意主机）进行连接
    ports:
      - "3306:3306"  # 映射容器的 3306 端口到主机的 3306 端口（MySQL 默认端口）
    command:  # 覆盖容器启动时的默认命令，并传入自定义配置参数
      --default-authentication-plugin=mysql_native_password  # 设置身份验证插件为 `mysql_native_password`，避免出现 `caching_sha2_password` 插件不兼容问题
      --character-set-server=utf8mb4  # 设置 MySQL 服务器的字符集为 `utf8mb4`，支持完整的 Unicode 字符集
      --collation-server=utf8mb4_general_ci  # 设置字符集校对规则为 `utf8mb4_general_ci`，适用于 Unicode 字符
      --bind-address=0.0.0.0  # 将 MySQL 绑定到所有可用的网络接口上，允许外部主机访问（通常与容器网络相关）
    networks:
      - mysql_network  # 让该容器连接到名为 `mysql_network` 的自定义网络

networks:
  mysql_network:  # 定义一个名为 `mysql_network` 的自定义网络
    driver: bridge  # 使用 Docker 默认的桥接网络驱动（`bridge`），使容器可以互相通信
```
——————————————————————————————————————————
# MySQL常用命令
### 连接 MySQL 数据库
```shell
mysql -u username -p
```
### 连接到特定的主机和端口：
```shell
mysql -h host -P port -u username -p
```
### 显示所有数据库
```shell
SHOW DATABASES;
```
### 选择数据库
```shell
USE database_name;
```
### 显示数据库中的所有表
```shell
SHOW TABLES;
```
### 显示表的结构
```shell
DESCRIBE table_name;
```
### 创建数据库
```shell
CREATE DATABASE database_name;
```
### 删除数据库
```shell
DROP DATABASE database_name;
```
### 创建表
```shell
CREATE TABLE table_name (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    age INT
);
```
### 删除表
```shell
DROP TABLE table_name;
```
### 查看当前用户
```shell
SELECT USER();
```
### 显示所有用户
```shell
SELECT user, host FROM mysql.user;
```
### 创建用户
```shell
CREATE USER 'username'@'host' IDENTIFIED BY 'password';
```
### 删除用户
```shell
DROP USER 'username'@'host';
```
### 赋予权限
```shell
GRANT ALL PRIVILEGES ON database_name.* TO 'username'@'host';
```
### 赋予特定权限：
```shell
GRANT SELECT, INSERT, UPDATE ON database_name.* TO 'username'@'host';
```
### 刷新权限
```shell
FLUSH PRIVILEGES;
```
### 查看当前权限
```shell
SHOW GRANTS FOR 'username'@'host';
```
### 查看表中的数据
```shell
SELECT * FROM table_name;
```
### 插入数据
```shell
INSERT INTO table_name (column1, column2) VALUES (value1, value2);
```
### 更新数据
```shell
UPDATE table_name SET column1 = value1, column2 = value2 WHERE condition;
```
### 删除数据
```shell
DELETE FROM table_name WHERE condition;
```
### 删除所有数据（但保留表结构）
```shell
TRUNCATE TABLE table_name;
```
### 查找数据（使用条件）
```shell
SELECT * FROM table_name WHERE column_name = value;
```
### 排序查询结果
```shell
SELECT * FROM table_name ORDER BY column_name ASC;  # 升序
SELECT * FROM table_name ORDER BY column_name DESC; # 降序
```
### 限制查询结果数量
```shell
SELECT * FROM table_name LIMIT 10;  # 返回前 10 行
```
### 修改表（添加列）
```shell
ALTER TABLE table_name ADD column_name datatype;
```
### 修改表（删除列）
```shell
ALTER TABLE table_name DROP COLUMN column_name;
```
### 修改表（更改列数据类型）
```shell
ALTER TABLE table_name MODIFY column_name new_datatype;
```
### 重命名表
```shell
RENAME TABLE old_table_name TO new_table_name;
```
### 创建索引
```shell
CREATE INDEX index_name ON table_name (column_name);
```
### 删除索引
```shell
DROP INDEX index_name ON table_name;
```
### 查看当前数据库的状态
```shell
SHOW STATUS;
```
### 查看 MySQL 版本
```shell
SELECT VERSION();
```
### 备份数据库
```shell
mysqldump -u username -p database_name > backup.sql
```
### 恢复数据库
```shell
mysql -u username -p database_name < backup.sql
```
### 查看正在运行的查询
```shell
SHOW PROCESSLIST;
```
### 杀死一个查询
```shell
KILL query_id;
```
### 设置字符集
```shell
SET NAMES 'utf8mb4';
```
### 退出 MySQL
```shell
EXIT;
```
### 导入 CSV 文件到 MySQL 表
```shell
LOAD DATA INFILE '/path/to/your/file.csv' INTO TABLE table_name
FIELDS TERMINATED BY ','  # CSV 字段分隔符
ENCLOSED BY '"'           # 如果字段值包含逗号或其他符号，可以加引号
LINES TERMINATED BY '\n'; # 行分隔符
```
### 查询当前日期和时间
```shell
SELECT CURDATE();  # 当前日期
SELECT CURTIME();  # 当前时间
SELECT NOW();      # 当前日期和时间
```