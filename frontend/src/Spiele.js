import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class Spiele extends Component{
    render(){
        return(
            /*Hier normal HTML programmieren*/
            <div>
                <title>Unity WebGL Player | PuzzleMemory</title>
                <link rel="shortcut icon" href="TemplateData/favicon.ico">
                <link rel="stylesheet" href="TemplateData/style.css">
                <script src="TemplateData/UnityProgress.js"></script>  
                <script src="Build/UnityLoader.js"></script>
                
            {let gameInstance = UnityLoader.instantiate("gameContainer", "Build/Builds.json", {onProgress: UnityProgress});}
               

                <div class="webgl-content">
                  <div id="gameContainer" style="width: 960px; height: 600px"></div>
                  <div class="footer">
                    <div class="webgl-logo"></div>
                    <div class="fullscreen" onclick="gameInstance.SetFullscreen(1)"></div>
                    <div class="title">PuzzleMemory</div>
                  </div>
                </div>

            </div>
        );
    }
}

export default Spiele; /*um das in anderen Dateien importieren zu können*/