/**
 * Created by eltntawy on 24/02/15.
 */

var dontPressTheButtonStage = {
    preload: function () {

        /**************************************************************************************/
        // background, score and sound 
        /**************************************************************************************/
        game.load.image('button_up','assets/Dont_press_the_red_button_app.png');

        /**************************************************************************************/
        // logger
        console.log('gameStage : preload finished');
    },

    create: function () {

        /**************************************************************************************/
        // background,   and sound
        /**************************************************************************************/
        game.backgroundColor = 0xf545ff;
        scoreText = game.add.text(10,10,'Game Score : '+score,{fontsize: 60, fill: 'white'});
        /**************************************************************************************/


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
        //  

    }
}