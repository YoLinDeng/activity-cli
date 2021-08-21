### 活动页开发脚手架（activity-cli）
* 基于vue-cli构建，通过node脚本实现活动模板的新建、启动、打包功能。
* 通过.env文件区分环境
* components中放置通用组件
* template中编写活动页模板

#### 安装依赖
`yarn install`

#### 新建模板
`yarn new 模板名`
#### 启动模板
`yarn serve 模板名`

#### 打包模板
`yarn template 模板名 --activityName=[活动title] --prod`
打包后的资源会在与src同级的templateProd或者templateTest目录下, 携带prod参数则打包正式包（templateProd），否则为测试包（templateTest）

