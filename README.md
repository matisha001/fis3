###  纳米项目现状
>  当前项目状态 前后端部分页面实现分离，实现前后端完全分离的页面如下

- [x]  [财富专区](http://www.namiconsultant.com/fortune/fortune.html)   

- [x] [互金详情](http://www.namiconsultant.com/fortune/fortune-detail.html?id=15036458764750005) 

- [x] [企业服务](http://www.namiconsultant.com/services/service.html)

- [x] [走进纳觅](http://www.namiconsultant.com/about/about.html)

- [x] [404页面](http://www.namiconsultant.com/sb)

> 其他页面暂时没有前后端分离



###  前后端未分离处理方案

> 按照前后端原来方式进行


###  前后端完全分离处理方案
>  #### fis-conf.js文件本地配置
![image](http://note.youdao.com/yws/public/resource/d54d6d97ed7b235f1b93d68343482fad/xmlnote/B729BE9D83B041C79BA3B2D831B640AB/17934)

    注意三个路径  
        1.本地资源根路径 
        2.工作区配置路径 
        3.静态资源发布路径
        
        
> #### 静态资源替换规则
    
    >   适用范围   css资源  js资源  image资源
    
    
以下以common.html 部分代码为例

- 替换之前的文件  
```html
<meta charset="UTF-8">
<link href="../favicon.ico" rel="shortcut icon" type="image/x-icon" />
<link rel="stylesheet" type="text/css" href="../css/common.css">
<script type="text/javascript" src="../js/jquery.js"></script>
<script type="text/javascript" src="../js/config.js"></script>
<script type="text/javascript" src="../js/common.js"></script>
```

- 经过执行本地配置命令，路径替换规则如下
   >  本地资源根路径 + 静态资源发布路径 +工作区配置路径

>    特别注意：本规则仅适用于将相对路径的静态资源替换为绝对路径，如果存在绝对路径，该绝对路径不会发生替换。

> #### a链接替换规则
   
[使用插件fis3-parser-html-replaceurl](https://github.com/shunzizhan/fis3-parser-html-replaceurl)   


以下以header.html 部分代码为例

- 替换之前的文件  
```html
    <div class='header-nav'>
    <ul class="fr">
        <li><a href="webHomeUrl/index">首页</a></li>
        <li class="nav-fortune"><a href="webHomeUrl/fortune/fortune.html">财富专区</a></li>
        <li><a href="http://www.na5zhe.com" target="_blank">五折商城 </a></li>
        <li><a href="webHomeUrl/news/index">纳觅俱乐部</a></li>
        <li class="nav-service"><a href="webHomeUrl/services/service.html">企业服务</a></li>
        <li><a href="webBbsUrl/topic/posted/list">社区论坛</a></li>
        <li class="nav-about"><a href="webHomeUrl/about/about.html">走进纳觅</a></li>
    </ul>
    </div>
```
- 经过执行本地配置命令，路径替换规则如下
   >  使用fis-conf.js中a链接替换配置的webHomeUrl等关键字对应的链接来替换页面里面的关键字。


###  当前目录提交方案

> html提交目录
![image](http://note.youdao.com/yws/public/resource/d54d6d97ed7b235f1b93d68343482fad/xmlnote/42C9E93DFBA64989898D6A8A1142B4FA/17916)


> 其他资源提交目录
![image](http://note.youdao.com/yws/public/resource/d54d6d97ed7b235f1b93d68343482fad/xmlnote/BF7728B0A05E4FCEB37358001DC17865/17906)


###  本地预览
![image](http://note.youdao.com/yws/public/resource/d54d6d97ed7b235f1b93d68343482fad/xmlnote/35F2B9A1D4944212A562517BAE2D0FCB/17914)



###  fis3的使用
[fis3的使用](http://fis.baidu.com/)



