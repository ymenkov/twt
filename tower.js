function Tow(x,y,elem){
  	this.j = y;
  	this.i= x;
  	this.elem=elem;
  	this.vib=-1;
  	this.shot = function(){


	         for (var i=0;i<=arrOrc.length-1;i++)
	         {
	         	if 	(arrOrc[i].elem&&((Math.abs(arrOrc[i].i-this.i))<3)&&((Math.abs(arrOrc[i].j-this.j))<3))
	         	{
	         		this.vib=i;
	         	}
	         }

	    

         if((this.vib!=-1)&&(arrOrc[this.vib].elem!=null)){	
		    var t=document.createElement('div');
		    console.dir(this.j)
		 	t.style.left = (this.j+1)*hw + marg + 'px';
		 	t.style.top = (this.i+1)*hw + marg + 'px';
		 	t=document.getElementById('ololo').appendChild(t);

			function shot_anim(){
		    	t.style.left = ((arrOrc[this.vib].j)*hw + marg*(arrOrc[this.vib].j+1)+11) + 'px';
		 		t.style.top = (arrOrc[this.vib].i*hw + marg*arrOrc[this.vib].i+20) + 'px';
		 	}

		 	setTimeout(shot_anim.bind(this), 100);
		 	arrOrc[this.vib].hp=arrOrc[this.vib].hp-1;
		 	document.getElementById('ololo').appendChild(t);

			setTimeout(function(){document.getElementById('ololo').removeChild(t);
				if (arrOrc[this.vib].elem){
					var tutu=(Math.round((arrOrc[this.vib].hp-1)/hpStart*100));
		 			arrOrc[this.vib].elem.childNodes[2].style.width=tutu+"%";
		 		}

		}.bind(this), 1000);

		}	
  	}
 }
