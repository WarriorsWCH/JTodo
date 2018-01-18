# JTodo
a todo list using jquery

## 构建工具使用的谷歌的Web Starter Kit工具
## [![Web Starter Kit](https://cloud.githubusercontent.com/assets/110953/11445049/f05512ba-9520-11e5-8fdb-8c8eb5f690d0.jpg)](https://github.com/google/web-starter-kit/releases/latest)

### 第三方库使用的[jQuery](http://jquery.cuishifeng.cn/)

### 第三方插件,日历插件 [jquery.datetimepicker](http://www.jq22.com/jquery-info332)

### Commitizen
Commitizen是一个撰写合格 Commit message 的工具。

安装命令如下。

`$ npm install -g commitizen`
然后，在项目目录里，运行下面的命令，使其支持 Angular 的 Commit message 格式。


`$ commitizen init cz-conventional-changelog --save --save-exact`
以后，凡是用到git commit命令，一律改为使用git cz。这时，就会出现选项，用来生成符合格式的 Commit message。