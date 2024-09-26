<template>
  <div>
    <div class="row">
      <div class="col">
        <div class="content">
          <div class="content-overlay"></div>
          <!-- Lazy load image to improve load times for user -->
          <b-img-lazy
            :alt="image.alt"
            fluid
            thumbnail
            :src="imageSrc"
            v-if="imageSrc"
          />
          <div class="content-details fadeIn-bottom">
            <h3>By {{ photoAuthor }}</h3>
            <p class="content-text h1 mb-2">
              <i class="fa fa-map-marker"></i>
              <b-link :href="image.photographer_url" target="_blank">{{
                image.photographer_url
              }}</b-link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import PhotoModel from "@/model/PhotoModel";
import { Component, Vue, Prop } from "vue-property-decorator";
@Component({
  components: {},
})
/**
 * Image Component to display single image with overlay
 * containing author information and Pexels Profile Url
 */
export default class ImageView extends Vue {
  @Prop({ required: true }) image!: PhotoModel;
  imageSrc = null;
  photoAuthor = "Unknown";
  mountedLoaded = false;

  mounted() {
    this.imageSrc = this.image.src["medium"]; //sacrifice some quality to improve load time for user
    if (
      this.image.photographer !== null ||
      this.image.photographer !== undefined
    ) {
      this.photoAuthor = this.image.photographer;
    }
  }

  /**
   * On link click inside overlay, open Pexels account for Author of Photo
   */
  goToAuthorLink() {
    window.location.href = this.image.photographer_url;
  }
}
</script>
<style>
/* Free Styling found @ https://bbbootstrap.com/snippets/simple-image-overlay-hover-effect-38877551 */
@import url(https://fonts.googleapis.com/css?family=Raleway);
body {
  background: #f9f9f9;
  font-size: 16px;
  font-family: "Raleway", sans-serif;
}
.title {
  color: #1a1a1a;
  text-align: center;
  margin-bottom: 10px;
}
.content {
  position: relative;
  width: 90%;
  max-width: 400px;
  margin: auto;
  overflow: hidden;
}
.content .content-overlay {
  background: rgba(0, 0, 0, 0.7);
  position: absolute;
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  opacity: 0;
  -webkit-transition: all 0.4s ease-in-out 0s;
  -moz-transition: all 0.4s ease-in-out 0s;
  transition: all 0.4s ease-in-out 0s;
}
.content:hover .content-overlay {
  opacity: 1;
}
.content-image {
  width: 100%; /* You can set the dimensions to whatever you want */
}
img {
  box-shadow: 1px 1px 5px 1px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
}
.content-details {
  position: absolute;
  text-align: center;
  padding-left: 1em;
  padding-right: 1em;
  width: 100%;
  top: 50%;
  left: 50%;
  opacity: 0;
  -webkit-transform: translate(-50%, -50%);
  -moz-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  -webkit-transition: all 0.3s ease-in-out 0s;
  -moz-transition: all 0.3s ease-in-out 0s;
  transition: all 0.3s ease-in-out 0s;
}
.content:hover .content-details {
  top: 50%;
  left: 50%;
  opacity: 1;
}
.content-details h3 {
  color: #fff;
  font-weight: 500;
  letter-spacing: 0.15em;
  margin-bottom: 0.5em;
  text-transform: uppercase;
}
.content-details p {
  color: #fff;
  font-size: 0.8em;
}
.fadeIn-bottom {
  top: 80%;
}
</style>
