new Vue ({
    el: '#app',
    data: {
        playerHealth : 100,
        monsterHealth: 100,
        gameRunning: false,
        turns: []
    },
    methods: {
        runGame: function (){
            this.gameRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.turns = [];
        },
        attack: function() {
            var damage = this.calculateDamage(3,10);
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                text: 'Damage player is: '+ damage
            });
            if(this.checkWin()){
                return;
            }
            this.monsterAttack();
        },
        specialAttack: function(){
            var damage = this.calculateDamage(10,20)
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                text: 'Damage player is: '+ damage
            });
            if(this.checkWin()){
                return;
            }
            this.monsterAttack();
        },
        heal: function(){
            if(this.playerHealth < 90 ){
                this.playerHealth += 10 ;
            }else{
                this.playerHealth = 100;
            }
            this.turns.unshift({
                isPlayer: true,
                text: 'Player heals for: 10'
            });
            this.monsterAttack();
        },
        monsterAttack: function(){
            var damage = this.calculateDamage(5,12);
            this.playerHealth -= damage;
            this.turns.unshift ({
                isPlayer: false,
                text: 'Damage monster is: '+ damage
            });
            this.checkWin();
        },
        giveUp: function(){
            this.gameRunning = false;
        },
        calculateDamage: function(min, max){
            return Math.max(Math.floor(Math.random() * max ) + 1 , min) 
        },
        checkWin: function(){
            if(this.monsterHealth <= 0){
                if(confirm('You won ! Restart ?')){
                    this.runGame();
                }else{
                    this.gameRunning = false;
                }
                return true;
            }else if(this.playerHealth <= 0){
                if(confirm('You Lose ! Restart ?')){
                    this.runGame();
                }else{
                    this.gameRunning = false;
                }
                return true;
            }
            return false
        }

    }
})