var posts=["2024/09/18/Docker常用命令汇总/","2024/05/20/Java项目包名该如何命名/","2024/09/09/Python实现批量提取视频/","2024/10/29/Python批量计算PDF页数/","2024/05/23/SpringBoot引入MinIO依赖遇到的问题/","2024/05/26/Spring使用Undertow作为嵌入式服务器中遇到的问题/","2024/11/16/Ubuntu系统安装docker/","2024/12/06/Vue项目中实现鼠标悬浮显示微信和QQ二维码/","2025/01/09/Windows下安装第二个MySQL/","2024/05/20/idea中的springboot项目如何重命名而不报错/","2025/03/03/主题标签/","2024/05/14/install报错问题/","2024/12/04/人生失败的那一次/","2024/12/05/从base64格式的HTML中提取图片/","2024/09/14/关于PHP报错提示修改配置失败/","2024/05/26/关于Undertow启动时的警告日志/","2024/05/24/关于Win10如何检查笔记本电脑的电池健康状况/","2024/05/17/关于Windows端口被占用/","2024/05/21/关于idea报错提示Output directory/","2022/10/23/关于代码注释/","2024/09/12/关于免费域名注册托管到cf以及开启CDN加速/","2024/09/18/关于外网无法通过域名访问Nas/","2024/01/03/单线复用之使用机顶盒直连路由器且不占用带宽/","2024/09/19/双网口Nas连线图/","2024/12/04/在京东物流做了两个月搬运工的心得体会/","2024/05/17/将图片上传到七牛云会报错error-incorrect/","2024/05/21/将本地 JAR 包安装到本地 Maven 仓库/","2024/09/27/开启IPv6后打开网页卡顿的问题解决/","2024/05/17/执行npm run serve有时提示npm update/","2024/05/21/本地部署MinIO通过Java实现文件上传/","2024/05/21/本地部署MinIO通过Java实现文件下载/","2025/02/20/用代码书写未来：一名技术新人的求职宣言/","2024/12/15/网页打开弹窗再关闭会导致内容宽度变化/","2024/09/03/这只是一个小小的博客/","2022/10/29/闲置的手机秒变随身服务器，隔壁小孩都馋哭了/","2022/12/13/高数-不定积分/","2022/11/29/高数-公式/","2022/10/26/高数-导数/","2022/11/28/高数-导数的应用/","2022/11/09/高数-微分/","2023/03/01/高数-旋转体求体积/"];function toRandomPost(){
    pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);
  };var friend_link_list=[{"name":"Hexo","link":"https://hexo.io/zh-tw/","avatar":"https://d33wubrfki0l68.cloudfront.net/6657ba50e702d84afb32fe846bed54fba1a77add/827ae/logo.svg","descr":"快速、简单且强大的网站框架"}];
    var refreshNum = 1;
    function friendChainRandomTransmission() {
      const randomIndex = Math.floor(Math.random() * friend_link_list.length);
      const { name, link } = friend_link_list.splice(randomIndex, 1)[0];
      Snackbar.show({
        text:
          "点击前往按钮进入随机一个友链，不保证跳转网站的安全性和可用性。本次随机到的是本站友链：「" + name + "」",
        duration: 8000,
        pos: "top-center",
        actionText: "前往",
        onActionClick: function (element) {
          element.style.opacity = 0;
          window.open(link, "_blank");
        },
      });
    }
    function addFriendLinksInFooter() {
      var footerRandomFriendsBtn = document.getElementById("footer-random-friends-btn");
      if(!footerRandomFriendsBtn) return;
      footerRandomFriendsBtn.style.opacity = "0.2";
      footerRandomFriendsBtn.style.transitionDuration = "0.3s";
      footerRandomFriendsBtn.style.transform = "rotate(" + 360 * refreshNum++ + "deg)";
      const finalLinkList = [];
  
      let count = 0;

      while (friend_link_list.length && count < 3) {
        const randomIndex = Math.floor(Math.random() * friend_link_list.length);
        const { name, link, avatar } = friend_link_list.splice(randomIndex, 1)[0];
  
        finalLinkList.push({
          name,
          link,
          avatar,
        });
        count++;
      }
  
      let html = finalLinkList
        .map(({ name, link }) => {
          const returnInfo = "<a class='footer-item' href='" + link + "' target='_blank' rel='noopener nofollow'>" + name + "</a>"
          return returnInfo;
        })
        .join("");
  
      html += "<a class='footer-item' href='/link/'>更多</a>";

      document.getElementById("friend-links-in-footer").innerHTML = html;

      setTimeout(()=>{
        footerRandomFriendsBtn.style.opacity = "1";
      }, 300)
    };