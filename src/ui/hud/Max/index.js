import 'ui.hud.Sprite';
import '@system.machines.Automata';
import '@ui.hud.states.Idle';


namespace `ui.hud` (
    class Max extends ui.hud.Sprite {
        static get is() {
            return "hero-sprite"
        }

        constructor(element) {
            super(element);
            this.x = 100;
            this.y = 210;
            this.width = 64;
            this.height = 64;
            this.bounds = [{ x: 20, y: 52, width: 24, height: 9 }]
            this.velocity = .1;
            this.y_velocity = 0;
            this.x_velocity = 0;
            this.direction = 0;
            
            this.machine = new system.machines.Automata;
            this.idle = new ui.hud.states.Idle(this, this.machine);
            this.machine.push(this.idle);

            this.sfx_collide = new Audio("../../../resources/sfx/sfx_sounds_impact1.wav");
            this.sfx_collide.loop=false;
            this.sfx_collide.load();
            // window.max = this;
            // this.style.transform = `translate3d(${this.x}px, ${this.y}px, 0px)`
        }

        onCollide(object) { //displace hero away from object
            // this.sfx_collide.play()
            if (this.lastDir == "down") {
                this.y -= 2;
            } else if (this.lastDir == "up") {
                this.y += 2;
            } else if (this.lastDir == "left") {
                this.x += 2;
            } else if (this.lastDir == "right") {
                this.x -= 2;
            }
        }

        onFixedUpdate(delta) {

        }

        onDraw(interpolation) {
            this.machine.onDraw(interpolation);
        }

        onUpdate(timestamp, delta) {
            this.machine.onUpdate(timestamp, delta);
        }
    }
);