function tw_audio_play_html (audio_file, caption, htmlElementId ){
    let template = `
        <div class="tw_audio_player">
        <div class="tw_audio_player_caption">${caption}</div>
        <div class="tw_audio_player_control">
            <div 
                class="tw_audio_play_btn"
                onclick="tw_audio_play( this )"
                > </div>
        
            <div 
                class="tw_audio_rate_btn noselect"
                onclick="tw_audio_rate( this )"
                >
                1.0x</div>
        
            <div 
                class="tw_audio_time_slider"
                onclick="tw_audio_time_slider( this , event )"
                >
            </div>
        
            <div 
                class="tw_audio_time noselect">
                00:00
            </div>
        </div>
        
        <audio class="tw_html_audio_player">
            <source src="${audio_file}" type="audio/mpeg" />
        </audio>
        </div>
        `;

        htmlElement = document .getElementById( htmlElementId );
        htmlElement .outerHTML = template;}



function 
            tw_audio_play( 
        tw_audio_play_btn,  
        theSelectedWidth ){

    let tw_html_audio_player = tw_audio_play_btn 
                                    .parentElement 
                                    .nextElementSibling;

    let tw_audio_time_slider = tw_audio_play_btn
                                .nextElementSibling
                                .nextElementSibling;
    
    let tw_audio_time = tw_audio_play_btn
                                .nextElementSibling
                                .nextElementSibling
                                .nextElementSibling;

    function 
                update_audio_visual_indicators 
            ( ){
        let duration = tw_html_audio_player .duration;
        let current_time = tw_html_audio_player .currentTime;
        let slider_width = tw_audio_time_slider .offsetWidth;
        /* We have how much currentTime in duration, 
        we need how much currentWidth in width. 
        duration           width
        -----------    =  ---------
        currentTime        currentWidth

        currentWidth   =   Width * currentTime 
                            -------------------
                                    duration   .*/
        let currentWidth =  slider_width * current_time / duration;
        let currentWidthPercent = 100 * currentWidth / slider_width;
        
        let linear_gradient = `linear-gradient(90deg, #000000 0%, #000000 ${currentWidthPercent}%, #585858 ${currentWidthPercent + 1}%, #585858 100%)`;

        tw_audio_time_slider .style .backgroundImage = linear_gradient;

        let sec = Math .floor( tw_html_audio_player.currentTime % 60 );
        let mn = Math .floor( tw_html_audio_player.currentTime  / 60 );
        //Shows only mn:ss, not interested at this stage about hours
        
        let sec_str = sec < 10 ? `0${sec}` : `${sec}`;
        let mn_str = mn < 10 ? `0${mn}` : `${mn}`;
        
        tw_audio_time .innerHTML = `${mn_str}:${sec_str}`; };

    if( theSelectedWidth == null ){
        tw_audio_play_btn 
            .classList 
            .toggle ("tw_audio_play_btn_paused");

        if ( tw_html_audio_player .paused ){
            tw_html_audio_player .play( );
            tw_html_audio_player .ontimeupdate = update_audio_visual_indicators;}
        else{
            tw_html_audio_player .pause( ); 
            tw_html_audio_player .ontimeupdate = null;}}
    else{
        /*      duration           width
               -----------    =  ---------
               currentTime        currentWidth

               currentTime   =   duration * currentWidth 
                                  -------------------
                                        width   .*/
        if ( tw_html_audio_player .paused ){
            tw_html_audio_player .play( );
            tw_audio_play_btn 
                .classList 
                .toggle ("tw_audio_play_btn_paused");
            tw_html_audio_player .ontimeupdate = update_audio_visual_indicators;}
            
        let duration = tw_html_audio_player .duration;
        let slider_width = tw_audio_time_slider .offsetWidth;
        let currentTime = duration * theSelectedWidth / slider_width;
        
        tw_html_audio_player .currentTime = currentTime; }}

function 
            tw_audio_time_slider( 
        tw_audio_time_slider, 
        event ){
    let offsetX = event .offsetX;
    let tw_audio_play_btn = tw_audio_time_slider
                                .previousElementSibling
                                .previousElementSibling;
    tw_audio_play( tw_audio_play_btn,  offsetX )}


function 
            tw_audio_rate(
        tw_audio_rate_btn ){
    let current_rate = tw_audio_rate_btn .innerText;
    let tw_html_audio_player = tw_audio_rate_btn 
                                    .parentElement 
                                    .nextElementSibling;
    switch (current_rate ){
        case '0.5x':
            tw_html_audio_player .playbackRate = 1.0;
            tw_audio_rate_btn .innerHTML = '1.0x';
            break;
        case '1.0x':
            tw_html_audio_player .playbackRate = 1.5;
            tw_audio_rate_btn .innerHTML = '1.5x';
            break;
        case '1.5x':
            tw_html_audio_player .playbackRate = 2.0;
            tw_audio_rate_btn .innerHTML = '2.0x';
            break;
        case '2.0x':
            tw_html_audio_player .playbackRate = 0.5;
            tw_audio_rate_btn .innerHTML = '0.5x';
            break; }}

window .addEventListener('load', ()=>{
    let audio_players_to_load = document .getElementsByClassName( 'tw-audio-player-to-load' );
    if ( ! ( audio_players_to_load instanceof HTMLCollection ))
        audio_players_to_load = [ audio_players_to_load ];
    for ( let audio_player_to_load of audio_players_to_load ){
            tw_audio_play_html(
                audio_player_to_load .dataset .twFile,
                audio_player_to_load .dataset .twCaption,
                audio_player_to_load .dataset .twId );}})