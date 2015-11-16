/**
 * Created by Jarvis on 2015/10/2.
 */
var label_cloud=0;
var link_cloud_Size=[$('.link_cloud').parents().width(),$('.link_cloud').parents().height()];
var all_cloud_label=[];
var temp_cloud_label=[];
var link_cloud_lable_max_height=0;
var linkCloud_data;
$.ajax({
	url:'http://open.sky31.com/linkCloud/getLinkCloud.php?site=index',
	type:'get',
	complete:function(XHR, TS){
		linkCloud_data=JSON.parse(XHR.responseText);
		var click=[-1,-1];
		for(var a=0;a<linkCloud_data.length;a++){
			var tempclick=parseInt(linkCloud_data[a]['click']);
			if(click[0]==-1){
				click[0]=tempclick;
			}
			else if(tempclick<click[0])click[0]=tempclick;
			if(click[1]==-1){
				click[1]=tempclick;
			}
			else if(tempclick>click[1])click[1]=tempclick;
		}
		$('.label_cloud').css('position','absolute')
		$('.label_cloud').each(function(){
			for(var a=0;a<linkCloud_data.length;a++){
				var tempclick=parseInt(linkCloud_data[a]['click']);
				var tempname=linkCloud_data[a]['name'];
				if($(this).html()==tempname){
					var fontSize=10+parseInt((28-10)*(tempclick-click[0])/(click[1]-click[0]));
					$(this).css({'font-size':fontSize+'px'});
					break;
					console.log(fontSize)
				}
			}
		});
		linkCloudIni();
		$('.label_cloud').animate({opacity: '1'}, 500);
	}
});
function linkCloudIni(){
	$('.label_cloud').each(function(){
		if(label_cloud+$(this)[0].offsetWidth<link_cloud_Size[0]){
			var temp=[$(this)[0].offsetWidth,$(this)[0].offsetHeight];
			temp_cloud_label[temp_cloud_label.length]=temp.concat();
			label_cloud+=$(this)[0].offsetWidth;
			if($(this)[0].offsetHeight>link_cloud_lable_max_height)link_cloud_lable_max_height=$(this)[0].offsetHeight;
		}else{
			var temp_=[link_cloud_lable_max_height];
			temp_[temp_.length]=temp_cloud_label.concat();
			all_cloud_label[all_cloud_label.length]=temp_.concat();
			temp_cloud_label=[];
			label_cloud=$(this)[0].offsetWidth;
			var temp=[$(this)[0].offsetWidth,$(this)[0].offsetHeight];
			temp_cloud_label[temp_cloud_label.length]=temp.concat();
			link_cloud_lable_max_height=$(this)[0].offsetHeight;
		}
	});
	var temp_=[link_cloud_lable_max_height];
	temp_[temp_.length]=temp_cloud_label.concat();
	all_cloud_label[all_cloud_label.length]=temp_.concat();
	var link_cloud_cur=0;
	var link_cloud_y=0;
	for(var a=0;a<all_cloud_label.length;a++){
		var link_cloud_x=0;
		for(var b=0;b<all_cloud_label[a][1].length;b++){
			$('.label_cloud:eq('+link_cloud_cur+')').css({'width':all_cloud_label[a][1][b][0]-4+'px','left':link_cloud_x+'px','top':link_cloud_y+(all_cloud_label[a][0]-all_cloud_label[a][1][b][1]+6)/2+'px'})
			link_cloud_cur++;
			link_cloud_x+=all_cloud_label[a][1][b][0]+5;
		}
		link_cloud_y+=all_cloud_label[a][0]+3;
	}
	$('.label_cloud').on('click',function(){
		$.ajax({
			url:'http://open.sky31.com/linkCloud/clickLinkCloud.php?site=index&name='+$(this).html(),
			type:'get'
		});
	});
}