$().ready(function() {
	//购物车特效
	$(".fr li:nth-child(3)").children().hover(function() {
		$(".shopimg").attr('src', "commonStaticFileUrl/images/shopico.png");
		}, function() {
		$(".shopimg").attr('src', "commonStaticFileUrl/images/shopico2.png");
	});
	
	
	// 固定位客服
	$(window).scroll(function() {
		if($(window).scrollTop() > 300) {
			$('.viewScrllToTop').show();

		} else {
			$('.viewScrllToTop').hide();
		}
	});
	//回到顶部
	$('.viewScrllToTop').click(function() {
		$("body, html").animate({scrollTop: 0});
	});
	var hidden = true;
	$(".mts-fixed").find("a").hover(function(){
		$(".mts-fixed").find("span").hide()
		$(this).find("span").show();
		hidden=false;
	},function(){
		if(hidden){
			$(this).find("span").hide()
		}
	})
	$(".mts-fixed").find("span").hover(function(){
		$(this).show()
	},function(){
		hidden=true;
		$(this).hide()
	})	
})

//获取地址栏参数
function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return decodeURIComponent(r[2]); return null;
}

/**
 * 如果没有登录 提示并且跳转到登录页面
 * @param viewUrl
 * @param username
 */
function goLoginViewOrToCurrView(viewUrl,username){
    if(!username || username==''){
        layer.msg('请先登录');
        setTimeout("location.href = '"+viewUrl+"'",1000);
    }else{
        location.href=viewUrl;
    }
}

//	模板调用
  String.prototype.temp = function(obj) {
	    return this.replace(/\#\w+\#/gi, function(matchs) {
	        var returns = obj[matchs.replace(/\#/g, "")];
	        return (returns + "") == "undefined"? "": returns;
	    });
   };