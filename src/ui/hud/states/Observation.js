import '@ui.hud.states.State';
import '@ui.hud.states.Walking';
import '@ui.hud.states.Stretching';

namespace `ui.hud.states` (
    class Observation extends ui.hud.states.State {
        constructor(sprite, machine){
            super(sprite, machine);
            this.duration=0;
            this.walking = new ui.hud.states.Walking(sprite, machine);
            this.stretching = new ui.hud.states.Stretching(sprite, machine);
		}

		stop() {
			this.clear();
			this.isAnimating=false;
		}

		clear(){
			this.sprite.classList.remove("idle");
		}

		

		



		



        




		//------------------------------MACHINE CALLED----------------------------

        //Called when machine awakes this component.
        onAwake(){
            console.log(this.sprite.namespace + " Awake");
            this.isAnimating=false;
            this.sprite.position.x = this.sprite.x;
            this.sprite.position.y = this.sprite.y;
            // this.sprite.classList.add("idle");
            // alert(this.sprite.x)
        }

        //Machine puts it to sleep.
        onSleep(){
            console.log(this.sprite.namespace + " Sleeping");
            this.isAnimating=false;
            this.stop()
        }

        //Machine calls it once if never started
        onStart(dir) {
			if(this.isAnimating){return}
			this.isAnimating=false;
			this.isStarted=true;
            console.log(this.sprite.namespace + " Started");
		}


        //Machine calls if isFinished is ever true. Destroy self and cleanup. 
        onExit(){
            console.log(this.sprite.namespace + " Exit")
            this.stop()
        }

        onDraw(){
            // this.sprite.style.transform = "translate3d(" + this.sprite.x + "px," + this.sprite.y + "px, 0px)";
        }

        //onUpdate, runs 1x per frame. Good place to handle user input
       	onUpdate(timestamp, delta){
            
            this.duration += delta;
            if(this.duration >= 8000){
                // alert("you are blocking me")
                this.machine.pop(this);
                this.duration=0;
            }
        }
    }
);
