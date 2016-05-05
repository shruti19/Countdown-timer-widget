
$(document).ready(function(){

		var finish = $("#date_reached")[0];
		var f = finish.getContext("2d");
		f.beginPath();
		f.font = "30px Verdana";
		var gradient = f.createLinearGradient(0,0,finish.width,0);
		gradient.addColorStop("0","magenta");
		gradient.addColorStop("0.5","blue");
		gradient.addColorStop("1.0","red");
		// Fill with gradient
		f.fillStyle=gradient;
		f.fillText("We Just Launched!",10,47);

		var target_date = new Date("Thu May 28 2020 17:47:54 GMT+0530 (IST)").getTime();
		var days, hours, minutes, seconds;      
		var cd = $("#days")[0];
		var ctd = cd.getContext("2d");
		var ch = $("#hours")[0];
		var cth = ch.getContext("2d");
		var cm = $("#minutes")[0];
		var ctm = cm.getContext("2d");
		var cs = $("#seconds")[0];
		var cts = cs.getContext("2d");
		ctd.beginPath();
		cth.beginPath();
		ctm.beginPath();
		cts.beginPath();

	       
	function drawTimer(canvas, max_limit, time_variable, str, border_color, fill_color, text_color, c){
		c.width = c.width;
		//outer gray arc
	  canvas.lineWidth = 14;
		canvas.fillStyle = "#d0d0d0";
		canvas.strokeStyle = "#d0d0d0";
		canvas.beginPath();
		canvas.arc(50,50,40,0,2*Math.PI,true);
		canvas.stroke();
	  //outer blue arc (progressive)
	  canvas.lineWidth = 14;    
		canvas.beginPath();
	  canvas.strokeStyle = text_color;
	  canvas.arc(50,50,40,0,2*Math.PI*time_variable/max_limit,true);   //2.pi.r=360degree arc
		canvas.strokeStyle= border_color;
		canvas.stroke();
		canvas.closePath();
	 	//inner white circle  
		canvas.beginPath();
		canvas.shadowBlur = 5;
		canvas.shadowColor = "black";
		canvas.shadowOffsetX = 2;
		canvas.shadowOffsetY = 2;
		canvas.lineWidth = 1;
		canvas.arc(50,50,32,0,2*Math.PI,true);
		canvas.fillStyle = fill_color;
		canvas.strokeStyle = fill_color;
		canvas.stroke();
		canvas.fill();
		canvas.closePath();
		canvas.shadowBlur = 0;
		canvas.shadowColor = fill_color;
		//Text	
		canvas.beginPath();  			
		canvas.lineWidth = 1;
		canvas.font="26px Arial";
		canvas.strokeStyle = text_color;
		canvas.fillStyle = text_color;
		canvas.textAlign = 'center';
	  //canvas.strokeText(time_variable, 50, 40);
		canvas.fillText(time_variable, 50, 50);
		canvas.textAlign = 'center';
		canvas.font = "8px Arial";
	  //canvas.strokeText(str, 30,)
		canvas.fillText(str, 50, 65)
	  canvas.closePath();
	  canvas.lineWidth = 10;
		// canvas.closePath();
	}


	var interval = setInterval(function () {
    // Find the number of "seconds" between now and target
    var current_date = new Date().getTime();
	  var seconds_left = (target_date - current_date) / 1000;	
	          
		//DAYS
	 	days = parseInt(seconds_left / 86400);
	  drawTimer(ctd, 30, days, "DAYS",  "#2eace6" , "#ffffff", "#a8a8a8", cd);
	  seconds_left = seconds_left % 86400;

		//HOURS
	  hours = parseInt(seconds_left / 3600);
	 	  
	 	if(hours==0){
			if(days!=0){ch.width = ch.width; }
		}
		// arc length calculation for hours clock for x hours:
		//24 hrs = 360 degrees => x hrs = (360/24 * x) deg
		drawTimer(cth, 24, hours, "HOURS",  "#2eace6" , "#ffffff", "#a8a8a8", ch);	  
	  seconds_left = seconds_left % 3600;
	        
		//MINUTES
		minutes = parseInt(seconds_left / 60); 
		if(minutes==0){
			if(days!=0 || hours!=0){
				cm.width = cm.width;
			}     
		}
		// arc length calculation for minutes clock for x mins:
		//60 mins = 360 degrees => x mins = (360/60 * x) deg
	  drawTimer(ctm, 60, minutes, "MINUTES",  "#2eace6" , "#ffffff", "#a8a8a8", cm);
	      	  
		//SECONDS
	  seconds = parseInt(seconds_left % 60);
		if(seconds==0){
	    if(days==0 && hours==0 && minutes==0){
				$("#dials").css('display', "none");
	      $("#date_reached").css('display', "block");
		    clearInterval(interval);	
	    }
	    else { cs.width = cs.width; }
		}						 
		
		// arc length calculation for seconds clock for x seconds:
		// 60 sec = 360 degrees => x sec = (360/60 * x) deg.
		drawTimer(cts, 60, seconds, "SECONDS", "#2eace6" , "#ffffff", "#a8a8a8", cs);
	}, 1000);
		 
}); 
