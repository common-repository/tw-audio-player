<?php
/*
  Plugin Name: TW Audio Player
  Plugin URI: https://twiserandom.com/wordpress/plugins/tw-audioplayer/
  Description: A simple audio player with the ability to set the playback speed.
  Version: 0.0.1
  Author: Mohamad Wael El Kurdi
  Author URI: https://www.twiserandom.com
  License: GPLv2
 */

define( 'TW_AUDIO_PLAYER_BASE', plugins_url( '/', __FILE__ ));

add_shortcode( 'tw_audio_player', 'create_tw_audio_player' );


function 
            create_tw_audio_player( 
        $atts ) {
    extract( shortcode_atts( 
                array(
                    'file' => '',
                    'caption' => 'Listen to the article' ), 
                    $atts ));

    $id = uniqid( 'tw-audio-player-id' );
    return <<<EOF
    <div class = 'tw-audio-player-to-load' 
        id = '$id'
        data-tw-id = '$id' 
        data-tw-caption = '$caption' 
        data-tw-file = '$file'> </div>
    EOF;}

add_action( 'init', 'tw_audio_player_init' );


function tw_audio_player_init() {
    if ( !is_admin ( )){
        wp_register_script('tw_audo_player_js', TW_AUDIO_PLAYER_BASE . 'js/tw_audio_player.js');
        wp_enqueue_script('tw_audo_player_js');
        wp_register_style('tw_audo_player_css', TW_AUDIO_PLAYER_BASE . 'css/tw_audio_player.css');
        wp_enqueue_style('tw_audo_player_css'); }}
