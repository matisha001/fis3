fis.set('domain_dev', 'http://localhost');

fis.set('domain_test', 'http://test.namiconsultant.com'); 

fis.set('domain_uat', 'http://uat.namiconsultant.com:8888'); 

fis.set('domain_production', 'http://www.namiconsultant.com'); 

var domain_url = {
  dev:{
    "webHomeUrl":"http://localhost:8080/site",//基础模块路径
    "webBbsUrl":"http://localhost:8080/webBbs",//bbs应用路径
    "webClubUrl":"http://localhost:8080/webBbs",//club应用路径
    "commonStaticFileUrl":"//localhost:8080/statics/",//引用静态资源路径
    "fileServerUrl":"//localhost:8080/nmgw_files"//内容区中返回路径前缀
  },
  test:{
    "webHomeUrl":"http://test.namiconsultant.com",
    "webBbsUrl":"http://testbbs.namiconsultant.com/webBbs",
    "webClubUrl":"http://testclub.namiconsultant.com/webClub",
    "commonStaticFileUrl":"//test.namiconsultant.com/pub_static/nmgw_web",
    "fileServerUrl":"//test.namiconsultant.com/nmgw_files"
  },
  uat:{
    "webHomeUrl":"http://uat.namiconsultant.com:8888",
    "webBbsUrl":"http://uatbbs.namiconsultant.com:8888/webBbs",
    "webClubUrl":"http://uatclub.namiconsultant.com:8888/webClub",
    "commonStaticFileUrl":"//uat.namiconsultant.com:8888/pub_static/nmgw_web",
    "fileServerUrl":"//uat.namiconsultant.com:8888/nmgw_files"
  },
  production:{
    "webHomeUrl":"http://www.namiconsultant.com",
    "webBbsUrl":"http://bbs.namiconsultant.com/webBbs",
    "webClubUrl":"http://club.namiconsultant.com/webClub",
    "commonStaticFileUrl":"//www.namiconsultant.com:8888/pub_static/nmgw_web",
    "fileServerUrl":"//www.namiconsultant.com/nmgw_files"
  }
}


fis.set('project.files', [
  'statics/css/*.css',
  'statics/js/*.js',
  'statics/images/**',
  'statics/regiondata/*.json',
  'statics/favicon.ico',
  'statics/html/**/*.html'
]);


fis.set('new date', Date.now());

//公用环境配置
fis.match("*", {
        // domain: "${domain_pre}",
        relative: true,
        release : '/pub_static/$0'
})

.match('*.{js,css,png}', {
	  // useHash: true
})
.match('::package', {
  spriter: fis.plugin('csssprites',{
  	htmlUseSprite: true,
  	styleReg: /(<style(?:(?=\s)[\s\S]*?["'\s\w\/\-]>|>))([\s\S]*?)(<\/style\s*>|$)/ig,
  	margin: 5
  })
})
.match('**.js', {
  optimizer: fis.plugin('uglify-js',{
    mangle: {
      except: 'exports, module, require, define' //不需要混淆的关键字
    },
    compress: {
      drop_console: true //自动删除console
    }
  }),
  
})
.match('**.css', {
  useSprite: true,
  optimizer: fis.plugin('clean-css'),
  
})
.match('**.png', {
  optimizer: fis.plugin('png-compressor',{
  	type: 'pngquant'
  }),
  
})
.match('**.html', {
 // optimizer: fis.plugin('html-minifier'),
  
})
.match('*.{js,css,png}', {
    query: '?t=' + fis.get('new date')
})


//开发环境
fis.media('dev')
    .match('*', {
      domain: "${domain_dev}"
    })
    .match('*.{html,js,css}', {
    	useHash: false,
      useSprite: false,
      optimizer: null,
      parser: fis.plugin('html-replaceurl', {
        newWords:domain_url.dev
      })
    })

//测试环境
fis.media('test')
    .match('*', {
      domain: "${domain_test}"
    })
    .match('*.{html,js,css}', {
      parser: fis.plugin('html-replaceurl', {
        newWords:domain_url.test
      })
    })

//uat环境
fis.media('uat')
    .match('*', {
      domain: "${domain_uat}"
    })
    .match('*.{html,js,css}', {
      parser: fis.plugin('html-replaceurl', {
        newWords:domain_url.uat
      })
    })

//生产环境
fis.media('production')
    .match("*", {
        domain: "${domain_production}",
    })
    .match('*.{html,js,css}', {
      parser: fis.plugin('html-replaceurl', {
        newWords:domain_url.production
      })
    });





