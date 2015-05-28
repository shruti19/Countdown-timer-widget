
$(document).ready(function(){

		var finish = document.getElementById("date_reached");
		var f= finish.getContext("2d");
		f.beginPath();
		f.font="30px Verdana";
		var gradient=f.createLinearGradient(0,0,finish.width,0);
		gradient.addColorStop("0","magenta");
		gradient.addColorStop("0.5","blue");
		gradient.addColorStop("1.0","red");
		// Fill with gradient
		f.fillStyle=gradient;
		f.fillText("We Just Launched!",10,47);

		var target_date = new Date("15 June 2015").getTime();
		var days, hours, minutes, seconds;      
		var cd = document.getElementById("days");
		var ctd = cd.getContext("2d");
		var ch = document.getElementById("hours");
		var cth = ch.getContext("2d");
		var cm = document.getElementById("minutes");
		var ctm = cm.getContext("2d");
		var cs = document.getElementById("seconds");
		var cts = cs.getContext("2d");
		ctd.beginPath();
		cth.beginPath();
		ctm.beginPath();
		cts.beginPath();

	       
	function drawTimer(canvas, max_limit, time_variable, str, border_color, fill_color, text_color, c){
			c.width=c.width;
			//outer gray arc
	    canvas.lineWidth = 14;
			canvas.fillStyle="#d0d0d0";
			canvas.strokeStyle="#d0d0d0";
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
		  canvas.shadowBlur=5;
		  canvas.shadowColor="black";
		  canvas.shadowOffsetX = 2;
		  canvas.shadowOffsetY = 2;
		  canvas.lineWidth = 1;
			canvas.arc(50,50,32,0,2*Math.PI,true);
			canvas.fillStyle=fill_color;
			canvas.strokeStyle= fill_color;
		 	canvas.stroke();
			canvas.fill();
			canvas.closePath();
			canvas.shadowBlur=0;
			canvas.shadowColor=fill_color;
			//text	
			canvas.beginPath();  			
			canvas.lineWidth = 1;
			canvas.font="26px Arial";
			canvas.strokeStyle = text_color;
			canvas.fillStyle = text_color;
			canvas.textAlign = 'center';
	  	//canvas.strokeText(time_variable, 50, 40);
			canvas.fillText(time_variable, 50, 50);
			canvas.textAlign = 'center';
			canvas.font="8px  Arial";
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
		 
		  drawTimer(cth, 24, hours, "HOURS",  "#2eace6" , "#ffffff", "#a8a8a8", ch);	  
	    seconds_left = seconds_left % 3600;
	        
		//MINUTES
		  minutes = parseInt(seconds_left / 60); 
		  if(minutes==0){
				if(days!=0 || hours!=0){
				  cm.width = cm.width;
				}     
			}
			//m_deg = 360*minutes/60;      //60 minutes = 360degree
	    drawTimer(ctm, 60, minutes, "MINUTES",  "#2eace6" , "#ffffff", "#a8a8a8", cm);
	      	  
		//SECONDS
	    seconds = parseInt(seconds_left % 60);
		  if(seconds==0){
	      if(days==0 && hours==0 && minutes==0){
					document.getElementById("dials").style.display = "none";
	        document.getElementById("date_reached").style.display = "block";
					clearInterval(interval);	
	      }
	      else { cs.width = cs.width; }
		  }						 
		  // s_deg = 360*seconds/60;      //60 seconds = 360degree

			drawTimer(cts, 60, seconds, "SECONDS", "#2eace6" , "#ffffff", "#a8a8a8", cs);
	}, 1000);
		 

}); 