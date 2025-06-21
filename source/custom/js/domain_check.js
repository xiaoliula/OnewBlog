// ======================= 配置区域 =======================
// 请根据实际情况修改以下配置
const CONFIG = {
  // 主站域名（无需加密）
  MAIN_DOMAIN: 'blog.onew.us.kg',
  
  // 合法域名白名单（支持通配符）
  ALLOW_DOMAINS: [
    'blog.onew.pp.ua',  // 主站域名
    'localhost'      // 本地开发环境
  ],
  
  // 提示横幅配置
  BANNER: {
    LOCAL_MSG: ['本地测试环境，正式站点：', ''],
    MIRROR_MSG: ['您正在访问镜像站，推荐访问', '获取最新内容'],
    ILLEGAL_MSG: ['当前域名未授权，可能是恶意镜像，请访问', ''],
    LINK_TEXT: '主站',
    BG_COLOR: '#dc3545',
    TEXT_COLOR: '#ffffff'
  }
};

// ====================== 核心逻辑 =======================
(function() {
  // 非浏览器环境拦截
  try { if (window.document === undefined) throw new Error() } catch(e) {
    document.body.innerHTML = '<h1>请通过浏览器访问本页面</h1>';
    window.stop();
    return;
  }

  document.addEventListener('DOMContentLoaded', function() {
    // 当前访问域名
    const currentDomain = window.location.hostname;
    
    // 域名验证逻辑
    function isLegalDomain(domain) {
      return CONFIG.ALLOW_DOMAINS.some(pattern => {
        const regex = new RegExp(`^${pattern.replace(/\./g, '\\.').replace(/\*/g, '.*')}$`);
        return regex.test(domain);
      });
    }

    // 控制台检测（本地环境不触发）
    function isConsoleOpen() {
      if (currentDomain === 'localhost') return false;
      const devtools = new Error().stack;
      return devtools.includes('toString@') || devtools.length > 1024;
    }

    // 创建提示横幅
    function showBanner(messageParts) {
      if (localStorage.getItem('domain_warning_closed')) return;

      const banner = document.createElement('div');
      banner.style.cssText = `
        background: ${CONFIG.BANNER.BG_COLOR};
        color: ${CONFIG.BANNER.TEXT_COLOR};
        padding: 12px;
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 9999;
        text-align: center;
        font-family: sans-serif;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 8px;
      `;

      const link = document.createElement('a');
      link.href = `https://${CONFIG.MAIN_DOMAIN}`;
      link.target = '_blank';
      link.style.cssText = `
        color: ${CONFIG.BANNER.TEXT_COLOR};
        text-decoration: underline;
        font-weight: bold;
      `;
      link.textContent = CONFIG.BANNER.LINK_TEXT;

      const closeBtn = document.createElement('button');
      closeBtn.innerHTML = '×';
      closeBtn.style.cssText = `
        background: transparent;
        border: none;
        color: ${CONFIG.BANNER.TEXT_COLOR};
        font-size: 24px;
        cursor: pointer;
        margin-left: 15px;
      `;
      closeBtn.onclick = () => {
        banner.remove();
        localStorage.setItem('domain_warning_closed', '1');
      };

      banner.append(document.createTextNode(messageParts[0]), link);
      if (messageParts[1]) banner.append(document.createTextNode(messageParts[1]));
      banner.appendChild(closeBtn);
      document.body.appendChild(banner);
    }

    // 主逻辑
    if (!isLegalDomain(currentDomain)) {
      showBanner(CONFIG.BANNER.ILLEGAL_MSG);
      if (isConsoleOpen()) {
        window.location.replace(`https://${CONFIG.MAIN_DOMAIN}`);
      }
    } else if (currentDomain === 'localhost' || currentDomain === '127.0.0.1') {
      showBanner(CONFIG.BANNER.LOCAL_MSG);
    } else if (currentDomain !== CONFIG.MAIN_DOMAIN) {
      showBanner(CONFIG.BANNER.MIRROR_MSG);
    }
  });
})();