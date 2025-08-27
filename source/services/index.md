---
title: 
aside: false
comments: false
---
<div class="author-content author-content-item single" style="background:url(https://img.onew.us.kg/file/渐变.png) center /cover no-repeat!important">
    <div class="card-content">
    <span class="author-content-item-title">我的服务</span>
        <div class="content-bottom">
            <div class="tips">这里展示了我当前运行的所有服务，包括NAS、博客、图床、工具等。</div>
        </div>
        <div class="banner-button-group">
            <a class="banner-button" style="padding: 8px 12px;color: var(--anzhiyu-white);" onclick="pjax.loadUrl(&quot;/about&quot;)" data-pjax-state="">
                <i class="anzhiyufont anzhiyu-icon-arrow-circle-right" style="font-size:22px;margin-right:.25rem"></i>
                <span class="banner-button-text">关于本人</span>
            </a>
        </div>
    </div>
</div>
 <div class="filter-container">
            <div class="domain-filter">
                <label for="domain-select">筛选:</label>
                <select id="domain-select">
                    <option value="基础服务" selected>基础服务</option>
                    <option value="all">所有服务</option>
                    <option value="onew.us.kg">fnOS-IPv4&IPv6</option>
                    <option value="onew.pp.ua">fnOS-IPv6</option>
                    <option value="onew.dpdns.org">fnOS-IPv6</option>
                </select>
            </div>
            <div class="service-count">共 <span id="count">7</span> 个服务</div>
        </div>
        <!-- 密码弹窗 -->
        <div class="password-modal" id="passwordModal" style="display: none;position: fixed;top: 0;left: 0;width: 100%;height: 100%;background: rgba(0, 0, 0, 0.7);z-index: 1000;justify-content: center;align-items: center;">
            <div class="password-content" style="background: white;padding: 2rem;border-radius: 10px;width: 90%;max-width: 400px;box-shadow: 0 5px 25px rgba(0, 0, 0, 0.2);">
                <h3>需要密码验证</h3>
                <p>此分类的服务需要密码才能查看，请输入访问密码：</p>
                <input type="password" class="password-input" id="passwordInput" placeholder="请输入密码" style="width: 100%;padding: 10px;border: 1px solid #eee;border-radius: 5px;margin-bottom: 1rem;font-size: 1rem;">
                <div class="password-buttons" style="display: flex;justify-content: flex-end;gap: 10px;">
                    <button class="password-btn btn-secondary" id="cancelPassword" style="padding: 8px 16px;border: none;border-radius: 5px;cursor: pointer;font-weight: 500;background: #f0f0f0;color: #363636;">取消</button>
                    <button class="password-btn btn-primary" id="submitPassword" style="padding: 8px 16px;border: none;border-radius: 5px;cursor: pointer;font-weight: 500;background: #49b1f5;color: white;">确认</button>
                </div>
            </div>
        </div>
        <table class="services-table" id="services-table">
            <thead>
                <tr>
                    <th>服务名称</th>
                    <th>类型</th>
                    <th>域名</th>
                    <th>状态</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
                <!-- 基础服务 -->
                <tr data-domain="基础服务">
                    <td>Onew`s Blog</td>
                    <td><span class="service-type">Blog</span></td>
                    <td>blog.onew.us.kg</td>
                    <td><span class="status-badge status-active">运行中</span></td>
                    <td><a href="https://blog.onew.us.kg/" class="visit-btn">访问</a></td>
                </tr>
                <tr data-domain="基础服务">
                    <td>Onew's ImgHub</td>
                    <td><span class="service-type">图床</span></td>
                    <td>img.onew.us.kg</td>
                    <td><span class="status-badge status-active">运行中</span></td>
                    <td><a href="https://img.onew.us.kg/" class="visit-btn">访问</a></td>
                </tr>
                <tr data-domain="基础服务">
                    <td>探索日记</td>
                    <td><span class="service-type">Blog</span></td>
                    <td>p-blog.onew.pp.ua</td>
                    <td><span class="status-badge status-active">运行中</span></td>
                    <td><a href="https://p-blog.onew.pp.ua:8888/" class="visit-btn">访问</a></td>
                </tr>
                <tr data-domain="基础服务">
                    <td>站点统计</td>
                    <td><span class="service-type">站点统计</span></td>
                    <td>umami.onew.us.kg</td>
                    <td><span class="status-badge status-active">运行中</span></td>
                    <td><a href="https://umami.onew.us.kg/share/hbFaYrKyVP4d31Yf/blog.onew.us.kg" class="visit-btn">访问</a></td>
                </tr>
                <tr data-domain="基础服务">
                    <td>Onew的文件快递柜</td>
                    <td><span class="service-type">工具</span></td>
                    <td>file.onew.us.kg</td>
                    <td><span class="status-badge status-active">运行中</span></td>
                    <td><a href="https://file.onew.us.kg/" class="visit-btn">访问</a></td>
                </tr>
                <tr data-domain="基础服务">
                    <td>评论系统</td>
                    <td><span class="service-type">工具</span></td>
                    <td>comment.onew.us.kg</td>
                    <td><span class="status-badge status-active">运行中</span></td>
                    <td><a href="https://comment.onew.us.kg/" class="visit-btn">访问</a></td>
                </tr>
                <tr data-domain="基础服务">
                    <td>Friend-Circle-Lite</td>
                    <td><span class="service-type">工具</span></td>
                    <td>friends.onew.us.kg</td>
                    <td><span class="status-badge status-active">运行中</span></td>
                    <td><a href="https://friends.onew.us.kg/" class="visit-btn">访问</a></td>
                </tr>
                <!-- onew.us.kg -->
                <tr data-domain="onew.us.kg" class="locked-service" style="opacity: 0.5;filter: blur(3px);pointer-events: none;">
                    <td>fnOS</td>
                    <td><span class="service-type">Nas</span></td>
                    <td>nas.onew.us.kg</td>
                    <td><span class="status-badge status-active">运行中</span></td>
                    <td><a href="https://nas.onew.us.kg/" class="visit-btn">访问</a></td>
                </tr>
                <tr data-domain="onew.us.kg" class="locked-service" style="opacity: 0.5;filter: blur(3px);pointer-events: none;">
                    <td>Immich</td>
                    <td><span class="service-type">相册</span></td>
                    <td>immich.onew.us.kg</td>
                    <td><span class="status-badge status-active">运行中</span></td>
                    <td><a href="https://immich.onew.us.kg/" class="visit-btn">访问</a></td>
                </tr>
                <tr data-domain="onew.us.kg" class="locked-service" style="opacity: 0.5;filter: blur(3px);pointer-events: none;">
                    <td>Lucky</td>
                    <td><span class="service-type">工具</span></td>
                    <td>lucky.onew.us.kg</td>
                    <td><span class="status-badge status-active">运行中</span></td>
                    <td><a href="https://lucky.onew.us.kg/" class="visit-btn">访问</a></td>
                </tr>
                <tr data-domain="onew.us.kg" class="locked-service" style="opacity: 0.5;filter: blur(3px);pointer-events: none;">
                    <td>v2rayA</td>
                    <td><span class="service-type">工具</span></td>
                    <td>lucky.onew.us.kg</td>
                    <td><span class="status-badge status-active">运行中</span></td>
                    <td><a href="https://v2raya.onew.us.kg/" class="visit-btn">访问</a></td>
                </tr>
                <tr data-domain="onew.us.kg" class="locked-service" style="opacity: 0.5;filter: blur(3px);pointer-events: none;">
                    <td>MoviePilot</td>
                    <td><span class="service-type">工具</span></td>
                    <td>mp.onew.us.kg</td>
                    <td><span class="status-badge status-active">运行中</span></td>
                    <td><a href="https://mp.onew.us.kg/" class="visit-btn">访问</a></td>
                </tr>
                <tr data-domain="onew.us.kg" class="locked-service" style="opacity: 0.5;filter: blur(3px);pointer-events: none;">
                    <td>qBittorrent Web UI</td>
                    <td><span class="service-type">工具</span></td>
                    <td>qb.onew.us.kg</td>
                    <td><span class="status-badge status-active">运行中</span></td>
                    <td><a href="https://qb.onew.us.kg/" class="visit-btn">访问</a></td>
                </tr>
                <tr data-domain="onew.us.kg" class="locked-service" style="opacity: 0.5;filter: blur(3px);pointer-events: none;">
                    <td>探索日记</td>
                    <td><span class="service-type">Blog</span></td>
                    <td>p-blog.onew.us.kg</td>
                    <td><span class="status-badge status-active">运行中</span></td>
                    <td><a href="https://p-blog.onew.us.kg/" class="visit-btn">访问</a></td>
                </tr>
                <tr data-domain="onew.us.kg" class="locked-service" style="opacity: 0.5;filter: blur(3px);pointer-events: none;">
                    <td>Onew的文件快递柜</td>
                    <td><span class="service-type">工具</span></td>
                    <td>file.onew.us.kg</td>
                    <td><span class="status-badge status-active">运行中</span></td>
                    <td><a href="https://file.onew.us.kg/" class="visit-btn">访问</a></td>
                </tr>
                <tr data-domain="onew.us.kg" class="locked-service" style="opacity: 0.5;filter: blur(3px);pointer-events: none;">
                    <td>Speedtest-x</td>
                    <td><span class="service-type">工具</span></td>
                    <td>speedtest.onew.us.kg</td>
                    <td><span class="status-badge status-active">运行中</span></td>
                    <td><a href="http://speedtest.onew.us.kg/" class="visit-btn">访问</a></td>
                </tr>
                <!-- onew.pp.ua -->
                <tr data-domain="onew.pp.ua" class="locked-service" style="opacity: 0.5;filter: blur(3px);pointer-events: none;">
                    <td>fnOS</td>
                    <td><span class="service-type">Nas</span></td>
                    <td>nas.onew.pp.ua:8888</td>
                    <td><span class="status-badge status-active">运行中</span></td>
                    <td><a href="https://nas.onew.pp.ua:8888/" class="visit-btn">访问</a></td>
                </tr>
                <tr data-domain="onew.pp.ua" class="locked-service" style="opacity: 0.5;filter: blur(3px);pointer-events: none;">
                    <td>Immich</td>
                    <td><span class="service-type">相册</span></td>
                    <td>immich.onew.pp.ua:8888</td>
                    <td><span class="status-badge status-active">运行中</span></td>
                    <td><a href="https://immich.onew.pp.ua:8888/" class="visit-btn">访问</a></td>
                </tr>
                <tr data-domain="onew.pp.ua" class="locked-service" style="opacity: 0.5;filter: blur(3px);pointer-events: none;">
                    <td>Lucky</td>
                    <td><span class="service-type">工具</span></td>
                    <td>lucky.onew.pp.ua:8888</td>
                    <td><span class="status-badge status-active">运行中</span></td>
                    <td><a href="https://lucky.onew.pp.ua:8888/" class="visit-btn">访问</a></td>
                </tr>
                <tr data-domain="onew.pp.ua" class="locked-service" style="opacity: 0.5;filter: blur(3px);pointer-events: none;">
                    <td>v2rayA</td>
                    <td><span class="service-type">工具</span></td>
                    <td>lucky.onew.pp.ua:8888</td>
                    <td><span class="status-badge status-active">运行中</span></td>
                    <td><a href="https://v2raya.onew.pp.ua:8888/" class="visit-btn">访问</a></td>
                </tr>
                <tr data-domain="onew.pp.ua" class="locked-service" style="opacity: 0.5;filter: blur(3px);pointer-events: none;">
                    <td>MoviePilot</td>
                    <td><span class="service-type">工具</span></td>
                    <td>mp.onew.pp.ua:8888</td>
                    <td><span class="status-badge status-active">运行中</span></td>
                    <td><a href="https://mp.onew.pp.ua:8888/" class="visit-btn">访问</a></td>
                </tr>
                <tr data-domain="onew.pp.ua" class="locked-service" style="opacity: 0.5;filter: blur(3px);pointer-events: none;">
                    <td>qBittorrent Web UI</td>
                    <td><span class="service-type">工具</span></td>
                    <td>qb.onew.pp.ua:8888</td>
                    <td><span class="status-badge status-active">运行中</span></td>
                    <td><a href="https://qb.onew.pp.ua:8888/" class="visit-btn">访问</a></td>
                </tr>
                <tr data-domain="onew.pp.ua" class="locked-service" style="opacity: 0.5;filter: blur(3px);pointer-events: none;">
                    <td>探索日记</td>
                    <td><span class="service-type">Blog</span></td>
                    <td>p-blog.onew.pp.ua:8888</td>
                    <td><span class="status-badge status-active">运行中</span></td>
                    <td><a href="https://p-blog.onew.pp.ua:8888/" class="visit-btn">访问</a></td>
                </tr>
                <tr data-domain="onew.pp.ua" class="locked-service" style="opacity: 0.5;filter: blur(3px);pointer-events: none;">
                    <td>Onew的文件快递柜</td>
                    <td><span class="service-type">工具</span></td>
                    <td>file.onew.pp.ua:8888</td>
                    <td><span class="status-badge status-active">运行中</span></td>
                    <td><a href="https://file.onew.pp.ua:8888/" class="visit-btn">访问</a></td>
                </tr>
                <tr data-domain="onew.pp.ua" class="locked-service" style="opacity: 0.5;filter: blur(3px);pointer-events: none;">
                    <td>Speedtest-x</td>
                    <td><span class="service-type">工具</span></td>
                    <td>speedtest.onew.pp.ua:8888</td>
                    <td><span class="status-badge status-active">运行中</span></td>
                    <td><a href="http://speedtest.onew.pp.ua:8888/" class="visit-btn">访问</a></td>
                </tr>
                <!-- onew.dpdns.org -->
                <tr data-domain="onew.dpdns.org" class="locked-service" style="opacity: 0.5;filter: blur(3px);pointer-events: none;">
                    <td>fnOS</td>
                    <td><span class="service-type">Nas</span></td>
                    <td>nas.onew.dpdns.org:9999</td>
                    <td><span class="status-badge status-active">运行中</span></td>
                    <td><a href="https://nas.onew.dpdns.org:9999/" class="visit-btn">访问</a></td>
                </tr>
                <tr data-domain="onew.dpdns.org" class="locked-service" style="opacity: 0.5;filter: blur(3px);pointer-events: none;">
                    <td>Immich</td>
                    <td><span class="service-type">相册</span></td>
                    <td>immich.onew.dpdns.org:9999</td>
                    <td><span class="status-badge status-active">运行中</span></td>
                    <td><a href="https://immich.onew.dpdns.org:9999/" class="visit-btn">访问</a></td>
                </tr>
                <tr data-domain="onew.dpdns.org" class="locked-service" style="opacity: 0.5;filter: blur(3px);pointer-events: none;">
                    <td>Lucky</td>
                    <td><span class="service-type">工具</span></td>
                    <td>lucky.onew.dpdns.org:9999</td>
                    <td><span class="status-badge status-active">运行中</span></td>
                    <td><a href="https://lucky.onew.dpdns.org:9999/" class="visit-btn">访问</a></td>
                </tr>
                <tr data-domain="onew.dpdns.org" class="locked-service" style="opacity: 0.5;filter: blur(3px);pointer-events: none;">
                    <td>v2rayA</td>
                    <td><span class="service-type">工具</span></td>
                    <td>lucky.onew.dpdns.org:9999</td>
                    <td><span class="status-badge status-active">运行中</span></td>
                    <td><a href="https://v2raya.onew.dpdns.org:9999/" class="visit-btn">访问</a></td>
                </tr>
                <tr data-domain="onew.dpdns.org" class="locked-service" style="opacity: 0.5;filter: blur(3px);pointer-events: none;">
                    <td>MoviePilot</td>
                    <td><span class="service-type">工具</span></td>
                    <td>mp.onew.dpdns.org:9999</td>
                    <td><span class="status-badge status-active">运行中</span></td>
                    <td><a href="https://mp.onew.dpdns.org:9999/" class="visit-btn">访问</a></td>
                </tr>
                <tr data-domain="onew.dpdns.org" class="locked-service" style="opacity: 0.5;filter: blur(3px);pointer-events: none;">
                    <td>qBittorrent Web UI</td>
                    <td><span class="service-type">工具</span></td>
                    <td>qb.onew.dpdns.org:9999</td>
                    <td><span class="status-badge status-active">运行中</span></td>
                    <td><a href="https://qb.onew.dpdns.org:9999/" class="visit-btn">访问</a></td>
                </tr>
                <tr data-domain="onew.dpdns.org" class="locked-service" style="opacity: 0.5;filter: blur(3px);pointer-events: none;">
                    <td>探索日记</td>
                    <td><span class="service-type">Blog</span></td>
                    <td>p-blog.onew.dpdns.org:9999</td>
                    <td><span class="status-badge status-active">运行中</span></td>
                    <td><a href="https://p-blog.onew.dpdns.org:9999/" class="visit-btn">访问</a></td>
                </tr>
                <tr data-domain="onew.dpdns.org" class="locked-service" style="opacity: 0.5;filter: blur(3px);pointer-events: none;">
                    <td>Onew的文件快递柜</td>
                    <td><span class="service-type">工具</span></td>
                    <td>file.onew.dpdns.org:9999</td>
                    <td><span class="status-badge status-active">运行中</span></td>
                    <td><a href="https://file.onew.dpdns.org:9999/" class="visit-btn">访问</a></td>
                </tr>
                <tr data-domain="onew.dpdns.org" class="locked-service" style="opacity: 0.5;filter: blur(3px);pointer-events: none;">
                    <td>Speedtest-x</td>
                    <td><span class="service-type">工具</span></td>
                    <td>speedtest.onew.dpdns.org:9999</td>
                    <td><span class="status-badge status-active">运行中</span></td>
                    <td><a href="http://speedtest.onew.dpdns.org:9999/" class="visit-btn">访问</a></td>
                </tr>
            </tbody>
        </table>
    </div>
       <script>
        document.addEventListener('DOMContentLoaded', function() {
            const domainSelect = document.getElementById('domain-select');
            const serviceRows = document.querySelectorAll('#services-table tbody tr');
            const countElement = document.getElementById('count');
            const passwordModal = document.getElementById('passwordModal');
            const passwordInput = document.getElementById('passwordInput');
            const submitPassword = document.getElementById('submitPassword');
            const cancelPassword = document.getElementById('cancelPassword');
            // 密码设置
            const correctPassword = "onew123"; // 您可以更改这个密码
            let authenticated = false;
            let currentDomain = '';
            // 初始化显示基础服务
            filterServices('基础服务');
            updateServiceCount('基础服务');
            // 域名筛选功能
            domainSelect.addEventListener('change', function() {
                const selectedDomain = this.value;
                currentDomain = selectedDomain;
                // 如果是基础服务，直接显示
                if (selectedDomain === '基础服务') {
                    filterServices(selectedDomain);
                    updateServiceCount(selectedDomain);
                    return;
                }
                // 如果已经验证过密码，直接显示
                if (authenticated) {
                    filterServices(selectedDomain);
                    updateServiceCount(selectedDomain);
                    return;
                }
                // 否则显示密码输入框
                showPasswordModal();
            });
            // 显示密码弹窗
            function showPasswordModal() {
                passwordModal.style.display = 'flex';
                passwordInput.value = '';
                passwordInput.focus();
            }
            // 隐藏密码弹窗
            function hidePasswordModal() {
                passwordModal.style.display = 'none';
            }
            // 提交密码
            submitPassword.addEventListener('click', function() {
                if (passwordInput.value === correctPassword) {
                    authenticated = true;
                    hidePasswordModal();
                    filterServices(currentDomain);
                    updateServiceCount(currentDomain);
                    // 解锁所有服务
                    document.querySelectorAll('.locked-service').forEach(row => {
                        row.classList.remove('locked-service');
                        row.style.opacity = '';
                        row.style.filter = '';
                        row.style.pointerEvents = '';
                    });
                } else {
                    alert('密码错误，请重新输入！');
                    passwordInput.value = '';
                    passwordInput.focus();
                }
            });
            // 取消密码输入
            cancelPassword.addEventListener('click', function() {
                hidePasswordModal();
                domainSelect.value = '基础服务';
                filterServices('基础服务');
                updateServiceCount('基础服务');
            });
            // 按回车键提交密码
            passwordInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    submitPassword.click();
                }
            });
            // 筛选服务
            function filterServices(domain) {
                serviceRows.forEach(row => {
                    if (domain === 'all' || row.getAttribute('data-domain') === domain) {
                        row.style.display = '';
                    } else {
                        row.style.display = 'none';
                    }
                });
            }
            // 更新服务计数
            function updateServiceCount(domain) {
                let count = 0;
                if (domain === 'all') {
                    count = serviceRows.length;
                } else {
                    serviceRows.forEach(row => {
                        if (row.getAttribute('data-domain') === domain && row.style.display !== 'none') {
                            count++;
                        }
                    });
                }
                countElement.textContent = count;
            }
        });
    </script>
    <style>
        :root {
            --primary-color: #49b1f5;
            --secondary-color: #ff7242;
            --bg-color: #f7f9fe;
            --card-bg: #fff;
            --text-color: #363636;
            --text-secondary: #777;
            --border-color: #eee;
            --success-color: #52c41a;
            --warning-color: #faad14;
            --error-color: #f5222d;
            --anzhiyu-white: #fff;
            --anzhiyu-main: #49b1f5;
        }
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        body {
            background-color: var(--bg-color);
            color: var(--text-color);
            line-height: 1.6;
            padding: 0;
            margin: 0;
        }
        .content-bottom {
            margin-bottom: 1.5rem;
        }
        .tips {
            font-size: 1rem;
            opacity: 0.9;
        }
        .banner-button-group {
            display: flex;
            gap: 1rem;
        }
        .banner-button {
            display: flex;
            align-items: center;
            background: rgba(255, 255, 255, 0.2);
            padding: 10px 20px;
            border-radius: 30px;
            text-decoration: none;
            transition: all 0.3s ease;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.3);
        }
        .banner-button:hover {
            background: rgba(255, 255, 255, 0.3);
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        }
        .banner-button-text {
            font-weight: 500;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }
        div#page {
            background: none !important;
            box-shadow: none;
            padding: 0;
            border: none;
        }
        .page-header {
            text-align: center;
            margin: 40px 0;
            position: relative;
        }
        .page-title {
            font-size: 2.5rem;
            margin-bottom: 15px;
            color: var(--primary-color);
            position: relative;
            display: inline-block;
        }
        .page-description {
            font-size: 1.1rem;
            color: var(--text-secondary);
            max-width: 700px;
            margin: 0 auto;
        }
        .filter-container {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin: 30px 0 20px;
            padding: 15px;
            background: var(--card-bg);
            border-radius: 10px;
            box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
        }
        .domain-filter {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        .domain-filter label {
            font-weight: 600;
            color: var(--text-color);
        }
        .domain-filter select {
            padding: 8px 15px;
            border: 1px solid var(--border-color);
            border-radius: 6px;
            background: white;
            color: var(--text-color);
            font-size: 0.95rem;
            cursor: pointer;
        }
        .service-count {
            font-size: 0.95rem;
            color: var(--text-secondary);
        }
        .services-table {
            width: 100%;
            border-collapse: collapse;
            background: var(--card-bg);
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.06);
            margin-bottom: 40px;
        }
        .services-table th,
        .services-table td {
            padding: 15px;
            text-align: left;
            border-bottom: 1px solid var(--border-color);
        }
        .services-table th {
            background-color: #f5f7fa;
            font-weight: 600;
            color: var(--text-color);
            position: sticky;
            top: 0;
        }
        .services-table tr:last-child td {
            border-bottom: none;
        }
        .services-table tr:hover {
            background-color: #f9fafb;
        }
        .status-badge {
            padding: 5px 12px;
            border-radius: 20px;
            font-size: 0.8rem;
            font-weight: 500;
        }
        .status-active {
            background-color: rgba(82, 196, 26, 0.15);
            color: var(--success-color);
        }
        .status-inactive {
            background-color: rgba(245, 34, 45, 0.15);
            color: var(--error-color);
        }
        .visit-btn {
            background: var(--primary-color);
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 6px;
            cursor: pointer;
            font-size: 0.9rem;
            transition: background 0.3s;
            text-decoration: none;
            display: inline-block;
        }
        .visit-btn:hover {
            background: #2a9be4;
        }
        .service-type {
            display: inline-block;
            padding: 4px 10px;
            border-radius: 12px;
            font-size: 0.8rem;
            font-weight: 500;
            background: #f0f7ff;
            color: var(--primary-color);
        }
        .page-footer {
            text-align: center;
            margin-top: 60px;
            padding: 20px;
            color: var(--text-secondary);
            font-size: 0.9rem;
        }
        @media (max-width: 768px) {
            .services-table {
                display: block;
                overflow-x: auto;
            }
            .filter-container {
                flex-direction: column;
                gap: 15px;
                align-items: flex-start;
            }
        }
    </style>