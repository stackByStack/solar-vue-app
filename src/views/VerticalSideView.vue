<template>
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=Edge;chrome=1" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0, user-scalable = no"
    />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black" />
    <title dir="ltr">3D CSS Solar System</title>
    <link
      rel="stylesheet"
      type="text/css"
      media="screen"
      href="css/styles.css"
    />
  </head>

  <body class="opening hide-UI view-2D zoom-large data-close controls-close">
    <div id="navbar">
      <a id="toggle-data" href="#data"><i class="icon-data"></i>Data</a>
      <NavbarComponent class="navbar-component" />
      <a id="toggle-controls" href="#controls"
        ><i class="icon-controls"></i>Controls</a
      >
    </div>
    <div id="data">
      <a class="sun" title="sun" href="#sunspeed">Sun</a>
      <a class="mercury" title="mercury" href="#mercuryspeed">Mercury</a>
      <a class="venus" title="venus" href="#venusspeed">Venus</a>
      <a class="earth active" title="earth" href="#earthspeed">Earth</a>
      <a class="mars" title="mars" href="#marsspeed">Mars</a>
      <a class="jupiter" title="jupiter" href="#jupiterspeed">Jupiter</a>
      <a class="saturn" title="saturn" href="#saturnspeed">Saturn</a>
      <a class="uranus" title="uranus" href="#uranusspeed">Uranus</a>
      <a class="neptune" title="neptune" href="#neptunespeed">Neptune</a>
    </div>
    <div id="controls">
      <label class="set-view">
        <input type="checkbox" />
      </label>
    </div>
    <div id="universe" class="scale-stretched">
      <div id="galaxy">
        <div id="solar-system" class="earth">
          <div id="mercury" class="orbit">
            <div class="pos">
              <div class="planet">
                <dl class="infos">
                  <dt>Mercury</dt>
                  <dd><span></span></dd>
                </dl>
              </div>
            </div>
          </div>
          <div id="venus" class="orbit">
            <div class="pos">
              <div class="planet">
                <dl class="infos">
                  <dt>Venus</dt>
                  <dd><span></span></dd>
                </dl>
              </div>
            </div>
          </div>
          <div id="earth" class="orbit">
            <div class="pos">
              <div class="orbit">
                <div class="pos">
                  <div class="moon"></div>
                </div>
              </div>
              <div class="planet">
                <dl class="infos">
                  <dt>Earth</dt>
                  <dd><span></span></dd>
                </dl>
              </div>
            </div>
          </div>
          <div id="mars" class="orbit">
            <div class="pos">
              <div class="planet">
                <dl class="infos">
                  <dt>Mars</dt>
                  <dd><span></span></dd>
                </dl>
              </div>
            </div>
          </div>
          <div id="jupiter" class="orbit">
            <div class="pos">
              <div class="planet">
                <dl class="infos">
                  <dt>Jupiter</dt>
                  <dd><span></span></dd>
                </dl>
              </div>
            </div>
          </div>
          <div id="saturn" class="orbit">
            <div class="pos">
              <div class="planet">
                <div class="ring"></div>
                <dl class="infos">
                  <dt>Saturn</dt>
                  <dd><span></span></dd>
                </dl>
              </div>
            </div>
          </div>
          <div id="uranus" class="orbit">
            <div class="pos">
              <div class="planet">
                <dl class="infos">
                  <dt>Uranus</dt>
                  <dd><span></span></dd>
                </dl>
              </div>
            </div>
          </div>
          <div id="neptune" class="orbit">
            <div class="pos">
              <div class="planet">
                <dl class="infos">
                  <dt>Neptune</dt>
                  <dd><span></span></dd>
                </dl>
              </div>
            </div>
          </div>
          <div id="sun">
            <dl class="infos">
              <dt>Sun</dt>
              <dd><span></span></dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  </body>
</template>

<style lang="css">
/* @import "../assets/verticalAndSide/css/basic.scss";
@import "../assets/verticalAndSide/css/data.scss";
@import "../assets/verticalAndSide/css/images.scss";
@import "../assets/verticalAndSide/css/legends.scss";
@import "../assets/verticalAndSide/css/lighting.scss";
@import "../assets/verticalAndSide/css/responsive.scss";
@import "../assets/verticalAndSide/css/styles.scss";
@import "../assets/verticalAndSide/css/transitions.scss";
@import "../assets/verticalAndSide/css/ui.scss";
@import "../assets/verticalAndSide/css/view.scss"; */
@import "../assets/verticalAndSide/css/styles.css";
@import "../assets/verticalAndSide/css/NavBar.css";

/* .navbar-component {
  position: relative;
  background-color: #f0f0f0;
  padding: 10px;
} */
</style>

<script>
import jQuery from "jquery";
import NavbarComponent from "@/components/NavBar.vue";

export default {
  name: "VerticalSideView",
  components: {
    NavbarComponent,
    // HelloWorld
  },
  methods: {
    
  },
  mounted() {
    // jQuery(window).load(function () {

    // });
    var body = jQuery("body"),
      // universe = jQuery("#universe"),
      solarsys = jQuery("#solar-system");

    var init = function () {
      body
        .removeClass("view-2D opening")
        .addClass("view-3D")
        .delay(2000)
        .queue(function () {
          jQuery(this).removeClass("hide-UI").addClass("set-speed");
          jQuery(this).dequeue();
        });
    };

    //var setView = function (view) { universe.removeClass().addClass(view); };

    jQuery("#toggle-data").click(function (e) {
      body.toggleClass("data-open data-close");
      e.preventDefault();
    });

    jQuery("#toggle-controls").click(function (e) {
      body.toggleClass("controls-open controls-close");
      e.preventDefault();
    });

    jQuery("#data a").click(function (e) {
      var ref = jQuery(this).attr("class");
      solarsys.removeClass().addClass(ref);
      jQuery(this).parent().find("a").removeClass("active");
      jQuery(this).addClass("active");
      e.preventDefault();
    });

    jQuery(".set-view").click(function () {
      body.toggleClass("view-3D view-2D");
    });

    init();
  },
};
</script>
