/**
 * Created by eltntawy on 24/02/15.
 */

var cable1handle1;
var cable1handle2;
var cable2handle1;
var cable2handle2;

var line1;
var line2;

var cable1Upper;
var cable2Upper;

var cable1Down;
var cable2Down;

var success = [false,false];
var fail = false;
var countFail = 0;

var timeToWait = 200;

var electricityStage = {
    preload: function () {

        /**************************************************************************************/
        // background, score and sound 
        /**************************************************************************************/
        //game.load.atlas('homeBackground','assets/home/home.png','assets/home/home.json');
        game.load.image('balls', 'assets/home/red-button-badge-circle-gloss.png', 50, 50);

        game.load.image('background','assets/Electricity/background.png');

        game.load.image('success','assets/Electricity/Home Lighting on-off.png');
        game.load.image('fail','assets/Electricity/Electrical_work.gif');

        game.load.image('cable1_up', 'assets/Electricity/1_up.png');
        game.load.image('cable2_up', 'assets/Electricity/2_up.png');
        game.load.image('cable3_up', 'assets/Electricity/3_up.png');

        game.load.image('cable1_down', 'assets/Electricity/1_down.png');
        game.load.image('cable2_down', 'assets/Electricity/2_down.png');
        game.load.image('cable3_down', 'assets/Electricity/3_down.png');
        /**************************************************************************************/
        // logger
        console.log('gameStage : preload finished');
    },

    create: function () {

        
        /**************************************************************************************/
        // background, score and sound 
        /**************************************************************************************/
        game.backgroundColor = 0xffffff;
        //scoreText = game.add.text(10,10,'Game Score : '+score,{fontsize: 60, fill: 'white'});

        /**************************************************************************************/

        var cable1X = 200;
        var cable2X = 500;

        cable1Upper = game.add.sprite(cable1X, 0, 'cable1_up');
        cable2Upper = game.add.sprite(cable2X, 0, 'cable2_up');

        cable1Down = game.add.sprite(cable1X, game.world.height - cable1Upper.height, 'cable1_down');
        cable2Down = game.add.sprite(cable2X, game.world.height - cable2Upper.height, 'cable2_down');


        cable1Down.enableBody = true;
        cable2Down.enableBody = true;


        cable1handle1 = game.add.sprite(cable1X, cable1Upper.height, 'balls', 0);
        cable1handle1.scale.setTo(0.05, 0.05);
        cable1handle1.anchor.set(0.5);
        cable1handle1.inputEnabled = true;
        //cable1handle1.input.enableDrag(true);

        cable1handle2 = game.add.sprite(cable1X, cable2Upper.height, 'balls', 0);
        cable1handle2.scale.setTo(0.05, 0.05);
        cable1handle2.anchor.set(0.5);
        cable1handle2.inputEnabled = true;
        cable1handle2.input.enableDrag(true);

        line1 = new Phaser.Line(cable1handle1.x, cable1handle1.y, cable1handle2.x, cable1handle2.y);

        cable2handle1 = game.add.sprite(cable2X, cable2Upper.height, 'balls', 0);
        cable2handle1.scale.setTo(0.05, 0.05);
        cable2handle1.anchor.set(0.5);
        cable2handle1.inputEnabled = true;
        //cable2handle1.input.enableDrag(true);

        cable2handle2 = game.add.sprite(cable2X, cable2Upper.height, 'balls', 0);
        cable2handle2.scale.setTo(0.05, 0.05);
        cable2handle2.anchor.set(0.5);
        cable2handle2.inputEnabled = true;
        cable2handle2.input.enableDrag(true);

        line2 = new Phaser.Line(cable2handle1.x, cable2handle1.y, cable2handle2.x, cable2handle2.y);


        game.physics.arcade.enable(cable1handle2);
        game.physics.arcade.enable(cable2handle2);

        game.physics.arcade.enable(cable1Down);
        game.physics.arcade.enable(cable2Down);

        cable1handle2.physicsBodyType = Phaser.Physics.ARCADE;
        cable2handle2.physicsBodyType = Phaser.Physics.ARCADE;
        /**************************************************************************************/
        // platform
        /**************************************************************************************/
        // insert code here

        /**************************************************************************************/

        /**************************************************************************************/
        // player
        /**************************************************************************************/
        // insert code here
        
        /**************************************************************************************/


        // logger
        console.log('gameStage : creation finished');
    },

    update: function () {

        line1.setTo(cable1handle1.x,cable1handle1.y, cable1handle2.x,cable1handle2.y);
        line2.setTo(cable2handle1.x,cable2handle2.y, cable2handle2.x,cable2handle2.y);


        game.physics.arcade.collide(cable1handle2,cable1Down);
        game.physics.arcade.collide(cable2handle2,cable2Down);

        game.physics.arcade.overlap(cable1handle2, cable1Down, this.overlab1, null, this);
        game.physics.arcade.overlap(cable2handle2, cable2Down, this.overlab2, null, this);

        var count = 0 ;
        for(var i = 0; i < success.length ; i ++) {
            if(success[i] == true) {
                count++;
            }
        }

        if(count == success.length) {
            game.state.start('electricity_success');
        }

        if(fail == true || countFail == timeToWait) {
            game.state.start('electricity_fail');
        }


        countFail++;
        console.log('countFail : '+countFail);
        //console.log('overlab : '+cable1handle2.
        // x +  ','+cable1handle2.y);
    },
    drawFreeLine: function () {
        var x = game.input.activePointer.x;
        var y = game.input.activePointer.y;

        //var cable = game.add.sprite(x,y,'cable');
        //cable.scale.setTo(0.05,0.05);
        //cable.anchor.setTo(0.5,0.5);


        var circles = game.add.graphics(x, y);
        circles.lineStyle(1, 0xff0000);
        circles.drawCircle(0, 0, 50);
    }, overlab1 : function () {

        cable1handle2.x = cable1Down.x+20;
        cable1handle2.y = cable1Down.y+20;

        cable1handle2.anchor.setTo(0.5,0.5);

        cable1handle2.input.enableDrag(false)

        success [0] = true;
        console.log('overlab : ' + cable1handle2.x + ',' + cable1handle2.y);
    },
        overlab2 : function () {

            cable2handle2.x = cable2Down.x+20;
            cable2handle2.y = cable2Down.y+20;

            cable2handle2.anchor.setTo(0.5,0.5);

            cable2handle2.input.enableDrag(false);

            success [1] = true;

            console.log('overlab : '+cable1handle2.x +  ','+cable1handle2.y);
        }
}