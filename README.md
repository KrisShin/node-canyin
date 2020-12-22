# 饭店餐饮管理系统

> 2020.04.23 -- 更新: __项目添加图片和需要使用生产环境运行才能显示图片__

## 主要内容

* **MOBILE**

1. 餐桌预定模块：餐桌预定登记、查询、增删等功能；
2. 点菜模块：菜品登记、查询、增删等功能；
3. 结账模块：费用结算、会员折扣等功能；
4. 会员管理：登记、查询、增删等；

* **WEB**

5. 菜品管理模块：菜品展示、查询、增删等功能；
6. 销售统计模块：按菜品、菜系进行销售查询、统计等功能；
7. 采购管理：食材采购的生成、查看、修改等；
8. 员工管理：员工密码、权限、增删等；
9. 系统管理：管理员密码、权限、增删等。
 
## 基本要求

1. 开发工具：不限。
2. 所建立系统特点：界面友好，功能齐全，建立较完整的信息库。
3. 具体要求：搭建开发环境，设计数据库，制作一个功能完成，界面美观的饭店餐饮管理系统。

## 启动项目

### 环境需求
mongodb: https://docs.mongodb.com/manual/administration/install-community/

nodejs: https://nodejs.org/en/download/

1. 安装yarn

```
sudo npm install -g yarn
```

2. 安装运行库

分别进入server, mobile, web三个文件夹使用`yarn`安装依赖文件
__如果node-sass安装太慢请使用:__

```npm i node-sass --sass_binary_site=https://npm.taobao.org/mirrors/node-sass/```

3. 数据导入mongodb

```
mongo
> use restaurant
> db.dropDatabase()
mongorestore -d restaurant mongoData
```

4. 启动服务器

```
cd server
node my_server/index.js
```

5. 启动桌面端

```
cd web
yarn
# 完成之后
yarn build
```
然后打开web下的dist文件夹
使用浏览器打开index.html

桌面端管理员账号:xiaowang 密码:123
系统老板账号: boss 密码 123456


权限分配
boss: 所有权限
manager: 除系统管理的所有权限
employee: 菜品管理 订单管理 采购管理 用户管理

6. 启动移动端

```
cd mobile
yarn
# 完成之后
yarn build
```
然后打开web下的dist文件夹
使用浏览器打开index.html

移动端账号请自行注册

