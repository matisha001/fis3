$().ready(function() {
	$('.popup-trigger').on('click', function(event) {
		event.preventDefault();
		$('.cd-popup-container').css({'width':'927px','border': '4px solid rgba(0,0,0,.1)'});
		$('.cd-popup-container').css({'margin':'150px 20%'});
		$('.cd-popup').css({'position':'absolute',' margin':'0 auto'})
        $('.cd-popup').addClass('is-visible');
        $('.cd-popup-close').css({'top':'2px'})
        $('.cd-popup-container p').css('margin','0 2');
        $('.cd-popup-container p').css({'background-image':'none','width':'890px'})
	});
	$('.cd-popup-trigger').on('click', function(event) {
		event.preventDefault();
		$('.cd-popup').addClass('is-visible');
	});


	$('.cd-popup').on('click', function(event) {
		if($(event.target).is('.cd-popup-closed') || $(event.target).is('.cd-popup')) {
			event.preventDefault();
			$(this).removeClass('is-visible');
		}
	});
	
	$('.cd-popup').on('click', function(event) {
		if($(event.target).is('.cd-popup-close') || $(event.target).is('.cd-popup')) {
			event.preventDefault();
			$(this).removeClass('is-visible');
		}
	});



	//个人中心特效
	$('#Binds').click(function() {

	      $('.PcrbusInput').toggle();
		  $('.tiancong').toggle(function(){
		          $('.tiancong').css("padding-bottom",'55px')
		  });


		//$('.tiancong').toggleClass('mian')
	});
	$('#pBinds').click(function() {
			
		$('.PcrbusInputs').toggle();
		$('.tiancong').toggle(function(){
		          $('.tiancong').css("padding-bottom",'152px')
		  });

	});
	$('.show').hide();

	$('.clickshow').click(function() {
		$('.show').toggle()
	})
	///---------------///
	var nav = $(".PersonCenterLeftButtomCollect");
	var navb = $(".PersonCenterRight");
	nav.click(function() {
		var index = $(this).index();
         
		if(index == '2') {
			var index = index + 1;
			
			$(this).siblings(".PersonCenterLeftButtomCollect").removeClass("hove").end().addClass("hove");
			navb.eq(index).siblings(".PersonCenterRight").hide().end().show();
		} else {
			$(this).siblings(".PersonCenterLeftButtomCollect").removeClass("hove").end().addClass("hove");
			navb.eq(index).siblings(".PersonCenterRight").hide().end().show();
		}

	});
	$("#getServerData").click(function(){
		getServerData(1,1);
	});
	$("#getServerDatass").click(function(){
		getServerData(1,2);
	});
	$(".tcdPageCode").createPage({
		pageCount: 0,
		backFn: function(tagternum) {
			var tagternumber=tagternum%10;
			var ids = $(".mymsg").css('display');
			if(ids=='none') {
				getServerData(tagternumber, 1);
			} else {
				getServerData(tagternumber, 2);
			}
		}
	});
	getServerData(1, 1);
	
	//处理左侧折叠效果
	function leftFold(){
			var Accordion = function(el, multiple) {
				this.el = el || {};
				this.multiple = multiple || false;
				// Variables privadas
				var links = this.el.find('.link');
				// Evento
				links.on('click', {
					el: this.el,
					multiple: this.multiple
				}, this.dropdown);
			}
			Accordion.prototype.dropdown = function(e) {
				var $el = e.data.el;
				$this = $(this),
					$next = $this.next();

				$next.slideToggle();
				$this.parent().toggleClass('open');

				if(!e.data.multiple) {
					$el.find('.submenu').not($next).slideUp().parent().removeClass('open');
				};
			}
			var accordion = new Accordion($('#accordion'), false);
	};
//获取我的收藏及消息
	function getServerData(tagternumber, other) {
			if(other == 1) {
				var dataUrl = "webHomeUrl/member/favorites/queryMyAllFavorites?";
			} else if(other == 2) {
				$(".accordion").children().remove();
				var scli="<div class='personCollection'>暂无消息</div>";
				$(".accordion").append(scli);
				$(".tcdPageCode").createPage({
							pageCount: 0,
							current: 1,
						});
				return;
			}
			handleServerData(dataUrl,tagternumber, other);
		};

		function handleServerData(dataUrl,tagternumber, other){
			$.ajax({
				type: "get",
				url: dataUrl + "curPage="+ tagternumber ,
				success: function(res) {
					var dataList,datapagenumber;
					if(null == res.data || "undefined" == res.data){
						dataList = null;
						datapagenumber = 0;
					} else if(null == res.data.data || "undefined" == res.data.data){
						dataList = null;
						datapagenumber = 0;
					}else{
						dataList = res.data.data;
					}
					if(null == res.data.pager || null == res.data.pager.totalPage || "undefined" == res.data.pager || "undefined" == res.data.pager.totalPage){
						datapagenumber = 0;
					}else{
						datapagenumber = res.data.pager.totalPage;
					}
					if(other == 1) {
						$(".PersonCenterRightBodyUl").children().remove();
						if (null == dataList) {
							var scli="<div class='personCollection'>暂无收藏</div>";
							$(".PersonCenterRightBodyUl").append(scli);
							$(".tcdPageCode").createPage({
										pageCount: datapagenumber,
										current: tagternumber,
									});
						}else{
							$(".tcdPageCode").createPage({
								pageCount: datapagenumber,
								current: tagternumber,
							});
							
							for(var i = 0; i < dataList.length; i++) {
								
								var liData ="<li><div>";
								if(1 == dataList[i].mainType){
									liData +="<span><a href='webHomeUrl/news/detail/" + dataList[i].sourceId + "' target='_blank'>" + dataList[i].favortiesTitle +"</a></span>";
								}else{
									liData +="<span><a href='webBbsUrl/topic/posted/" + dataList[i].sourceId + "' target='_blank'>" + dataList[i].favortiesTitle +"</a></span>";
								}
								var _id = dataList[i].id;
								liData += "<span class='delect'><a onclick='cancelFavorites("+_id+")' id='"+dataList[i].id+"'>取消</a></span>";
								liData +="<span>"+ dateFormat(new Date(dataList[i].createTime),'yyyy-MM-dd HH:mm:ss') +"</span>";
								liData += "</div></li>";
								$(".PersonCenterRightBodyUl").append(liData);
							}
						}  
					} else if(other == 2) {
						$(".accordion").children().remove();
						if( null== dataList) {
							
							var scli="<div class='personCollection'>暂无消息</div>";
							$(".accordion").append(scli);
							$(".tcdPageCode").createPage({
										pageCount: datapagenumber,
										current: tagternumber,
									});
						}else{
							$(".tcdPageCode").createPage({
								pageCount: datapagenumber,
								current: tagternumber,
							});
							for(var i = 0; i < dataList.length; i++) {
							var scsi="<i class='fa fa-paint-brush'></i>";
							var scspan="<span>"+ dataList[i].id +"</span>";
							var scsdiv="<div class='link'>"+scsi+scspan+"</div>";
							var scp="<p>"+dataList[i].id+"</p>";
							var scpul="<ul class='submenu'>"+ scp+"</ul>";
							var scli = "<li>" +scsdiv+scpul+"</li>";
							$(".accordion").append(scli);
						}
						}						
						leftFold();
					}
				},error:function(error){
					if(other == 1){
						$(".PersonCenterRightBodyUl").children().remove();
					}else if(other == 2){
						$(".accordion").children().remove();
					}
					var error="<div class='personCollection'>网络出现问题</div>";
					$(".PersonCenterRightBodyUl,.accordion").append(error);
					$('.tcdPageCode').children().remove();
					$('.tcdPageCode').css('height','27px');
				}
				
			});
		};
		$("#getusersinofid").click(function(){
			
			var selectProvinceData = $("#selectProvince").val();
			
			if(null == selectProvinceData){
				
				getAddress();
				//$(".user-city").prepend("<option value='请选择1'></option>");
			}
				
			getUserInfo();
		});
		getUserInfo();
		var provinceData;

		function getAddress(){
			var provincehtml = "";
			$.ajax({
				url: "webHomeUrl/statics/regiondata/cityData.min.json",
				type: "get",
				success: function(data) {
					provinceData = data;
					provincehtml += "<option value='请选择2' data-index=0>请选择</option>";
					for(var i = 0; i < data.length; i++) {
						provincehtml += "<option value=" +data[i].n + " data-index=" + (i+1) +">" + data[i].n + "</option>";
					}
					$(".user-province").append(provincehtml);
				}
			})
		};
	    //获取用户基本信息
		function getUserInfo(){
			$.ajax({
				 url:"webHomeUrl/web/user/getUserInfo",
				 type:"get",
				 success:function(data){ 
					
					var newdata=data.data;
					$(".user-mobile").text(newdata.mobile);
					$(".BasceInputS>input").val(newdata.signature);
					$(".user-email").text(newdata.email);
					//$('.PersonCenterLeftName>h5').text(newdata.nickname);
					$(".Basleft>input").val(newdata.nickname);
					// $(".nickname").text(newdata.nickname);
					if(newdata.province){
						$(".user-province").find("option[value ="+newdata.province+"]").attr("selected","selected");
						 if(newdata.newdata==null){
							   
							 
							 $('.user-city>option').first().remove();
							 $(".user-city").prepend("<option></option>");
							
							}else{
								$(".user-city").prepend("<option>"+newdata.city+"</option>");
								
							}
					
						
						
						
						$(".user-province").find('option['+newdata.province+']').attr("selected","selected");
						if(newdata.city){
							//加载市信息
							var cityData,cityhtml = "";
							var t = $(".user-province").children('option:selected').data("index");
							if(t>=1){
								cityData = provinceData[t-1].s;
								for(var i = 0; i < cityData.length; i++) {
									console.log(cityData.length);
									cityhtml += "<option value=" +cityData[i].n + ">" + cityData[i].n + "</option>";
								};
								$(".user-city").html(cityhtml);
							}
							$(".user-city").val(newdata.city);
						}else{
							//$(".user-city").prepend("<option value='请选择3'>请选择</option>");
						}
					}else{
						$(".user-province").find('option[请选择]').attr("selected","selected");
						$(".user-city").find('option[请选择]').attr("selected","selected");
					}
					if(newdata.sex==1){
						
						$(".pay_list_c1:first").addClass("on");
					  	$(".pay_list_c1:last").removeClass("on");
					}else{
						$(".pay_list_c1:last").addClass("on");
					  	$(".pay_list_c1:first").removeClass("on");
					}
					
				}
			})
		};
		$(".user-province").change(function() {
			var cityData,cityhtml = "";
			var t = $(this).children('option:selected').data("index");
			if(t>=1){
				$(".user-province").val(provinceData[t-1].n);
				cityData = provinceData[t-1].s;
				for(var i = 0; i < cityData.length; i++) {
					cityhtml += "<option value=" +cityData[i].n + ">" + cityData[i].n + "</option>";
				};
				$(".user-city").html(cityhtml);
			}else{
				
				$(".user-city").html("<option value='请选择4'></option>");
			}
			
			
		});
	   

	
		//发送邮箱信息
		var Mail = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;

		function sendMail() {
			if(!$("#user-mail").val()) {
				layer.alert("邮箱不能为空");
			} else if(!Mail.test($("#user-mail").val())) {
				layer.alert("邮箱格式不正确");
			} else {
				$.ajax({
					// url: "http://192.168.0.100/web/user/getBaseUserInfo",
					url: "http://matisha.pw/city.json",
					data: {
						mail: $("#user-mail").val()
					},
					// type: "post",
					success: function(data) {

					}
				})
			}
		}
		//修改用户信息
$(".cd-popup-trigger").click(function(){
	var userProvince=$("#selectProvince option:selected").text();
	var userCity= $("#selectCity option:selected").text();
	var sex= $("input[type='radio']:checked").val();
	var userSign = $("#userSign").val();
	var nickname = $("#nickname").val();
	if(nickname == null || nickname == ""){
		layer.alert("昵称不能为空");
		return;
	}


	if(userCity=="请选择"){
		userCity="";
	}else{
		var userCity= $("#selectCity option:selected").text();
	}
    $.ajax({
        url: "webHomeUrl/web/user/updateBaseUserInfo",
        type: "post",
        data: {
        	nickname: nickname,
        	province: userProvince,
        	city:userCity,
        	signature:userSign,
        	sex:sex
 	    },
        success: function(data) {
        	// $('.PersonCenterLeftName>h5').text(nickname);
        	//  $(".nickname").text(nickname);
        	
        	 
        	if(data.code=="00000"){
        		layer.alert("信息修改成功");
			}else{
				layer.alert("修改信息失败");
			}
        }
    })
})		
//保存用户图像
$('#SaveHead').on('click',function(){
	if( !$('#upImgUrl').val() ){
		layer.alert('请先选择上传图片');
		return;
	}
	// 提交数据
	$.ajax({
		url:  'webHomeUrl/web/user/updateUserImg',
		type: 'post',
		data:{
			image: $('#upImgUrl').val()
		},
		dataType: 'json',
		success: function( data ){
			var touxia=$("#headePreviewImg_1").attr("src");
			 $('#_userHeaderImg').attr('src', touxia);  
			
		   
			if( data.code == '00000' ){
				layer.alert('您的头像更新成功！');
			}else{
				layer.alert( data.errorMsg );
			}
		},
		error: function(){}
	});

});
		
//修改密码
function changePassword() {
	var personnewpassword = $('#user-Password').val();
	var personconfirmpassword = $('#user-RePassword').val();
	var oldpasswpod = $("#user-oldPassword").val();
	
	if(null == oldpasswpod || 0 ==oldpasswpod.length){
		layer.alert("原登录密码不能为空");
		return;
	}
	if(null == personnewpassword || 0 ==personnewpassword.length){
		layer.alert("新登录密码不能为空");
		return;
	}

    var regStr = /^(?=.*?[a-zA-Z])(?=.*?[0-9])[a-zA-Z0-9]{8,16}$/;
    //对密码规则验证
    if (!regStr.test(personnewpassword)) {
    	layer.alert("新登录密码须为8-16位数字和字母组合！");
        return false;
    }
    
	if(personnewpassword == personconfirmpassword) {
		$.ajax({
			url: "webHomeUrl/front/updatePassword",
			data: {
				password: oldpasswpod,
				newPassword: personnewpassword
			},
			type: "post",
			success: function(data) {
				if(data.code=="00000"){
					$('.PcrbusInputs').toggle();
					$(".tiancong").css("display","none");
					$('#user-Password').val("");
					$('#user-RePassword').val("");
					$("#user-oldPassword").val("");
					layer.alert("恭喜你修改成功");
					
				}else{
					layer.alert("原登录密码错误");
				}
			},
			error: function() {
				layer.alert("请重新修改");
			}
		})
	} else {
		layer.alert("两次密码不一样");
	}
};
$('#changpasswordbtn').click(function(){
	 changePassword();
})

function dateFormat(now,mask){
	        var d = now;
	        var zeroize = function (value, length)
	        {
	            if (!length) length = 2;
	            value = String(value);
	            for (var i = 0, zeros = ''; i < (length - value.length); i++)
	            {
	                zeros += '0';
	            }
	            return zeros + value;
	        };
	     
	        return mask.replace(/"[^"]*"|'[^']*'|\b(?:d{1,4}|m{1,4}|yy(?:yy)?|([hHMstT])\1?|[lLZ])\b/g, function ($0)
	        {
	            switch ($0)
	            {
	                case 'd': return d.getDate();
	                case 'dd': return zeroize(d.getDate());
	                case 'ddd': return ['Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat'][d.getDay()];
	                case 'dddd': return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][d.getDay()];
	                case 'M': return d.getMonth() + 1;
	                case 'MM': return zeroize(d.getMonth() + 1);
	                case 'MMM': return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][d.getMonth()];
	                case 'MMMM': return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][d.getMonth()];
	                case 'yy': return String(d.getFullYear()).substr(2);
	                case 'yyyy': return d.getFullYear();
	                case 'h': return d.getHours() % 12 || 12;
	                case 'hh': return zeroize(d.getHours() % 12 || 12);
	                case 'H': return d.getHours();
	                case 'HH': return zeroize(d.getHours());
	                case 'm': return d.getMinutes();
	                case 'mm': return zeroize(d.getMinutes());
	                case 's': return d.getSeconds();
	                case 'ss': return zeroize(d.getSeconds());
	                case 'l': return zeroize(d.getMilliseconds(), 3);
	                case 'L': var m = d.getMilliseconds();
	                    if (m > 99) m = Math.round(m / 10);
	                    return zeroize(m);
	                case 'tt': return d.getHours() < 12 ? 'am' : 'pm';
	                case 'TT': return d.getHours() < 12 ? 'AM' : 'PM';
	                case 'Z': return d.toUTCString().match(/[A-Z]+$/);
	                // Return quoted strings with the surrounding quotes removed
	                default: return $0.substr(1, $0.length - 2);
	            }
	        });
	    };

})
