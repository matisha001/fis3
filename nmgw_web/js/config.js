//环境配置
//模板
(function(){
  var cache = {};  
  this.tmpl = function tmpl(str, data){
    var fn = !/\W/.test(str) ?
      cache[str] = cache[str] ||
        tmpl(document.getElementById(str).innerHTML) :
      new Function("obj",
        "var p=[],print=function(){p.push.apply(p,arguments);};" +
        "with(obj){p.push('" +
        str
          .replace(/[\r\t\n]/g, " ")
          .split("<%").join("\t")
          .replace(/((^|%>)[^\t]*)'/g, "$1\r")
          .replace(/\t=(.*?)%>/g, "',$1,'")
          .split("\t").join("');")
          .split("%>").join("p.push('")
          .split("\r").join("\\'")
      + "');}return p.join('');");
    return data ? fn( data ) : fn;
  };
})();



// 获取登录信息
var isLogin,userLoginUrl,userRegistUrl;
function getstate(){
	var html="";
	var headTemplate=$("#head-template").html();
	$.ajax({
	    url: 'webHomeUrl/getUserStatus',
	    type: 'get',
	    dataType: 'json',
	    success:function(data){
	      if(data.code=="00000"){
	      	data=data.data;
			if(data.userStatus==1){
                isLogin=true;
			}else{
                isLogin=false;
                userLoginUrl=data.userLoginUrl;
                userRegistUrl=data.userRegistUrl;
			}
	      	html= tmpl(headTemplate, data)
	      	$(".header-state").find('.fr').html(html)
			$(".financial-hujin-btn").html("请先登录").attr("src",data.userLoginUrl)
	      }else{
	      	$(".header-state").find('.fr').html("<span style='color:red;'>"+data.errorMsg+"</span>");
	      }
	      
	    }
	});
}