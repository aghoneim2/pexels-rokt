<template>
  <div class="home">
    <div class="row">
      <div class="col-8 moveRight">
        <b-form-input
          placeholder="Search For Images"
          v-model="query"
        ></b-form-input>
      </div>
      <div class="col-2">
        <b-button variant="info" @click="newSearch">Search</b-button>
      </div>
    </div>

    <b-container fluid class="p-4 bg-dark">
      <div class="row" v-if="!showErrorLabel">
        <!-- Show One image per row to improve loading times for the user -->
        <div class="col-md-12" v-for="image in model.imgList" :key="image.id">
          <ImageView :image="image" />
        </div>
      </div>

      <div class="row" v-if="showErrorLabel">
        <div class="col">
          <p>No results found. Please try again.</p>
        </div>
      </div>

      <br />

      <div class="row">
        <div class="col-4">
          <b-button variant="info" @click="prevClick" v-if="pageCounter !== 1"
            >Previous Page</b-button
          >
        </div>
        <div class="col-4">
          <b-button
            variant="info"
            @click="clearSearch"
            v-if="pageCounter !== 1 || showErrorLabel"
            >Clear Search</b-button
          >
        </div>
        <div class="col-4" v-if="!showErrorLabel">
          <b-button variant="info" @click="nextClick">Next Page</b-button>
        </div>
      </div>
    </b-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
import ImageView from "./ImageView.vue";
import HomeModel from "@/model/HomeModel";
import axios from "axios";

@Component({
  components: {
    HelloWorld,
    ImageView,
  },
})
/**
 * The main component to display list of photo gallery and buttons
 */
export default class HomeView extends Vue {
  model = new HomeModel();
  query = "";
  pageCounter = 1;
  showErrorLabel = false;

  mounted() {
    //check if page was reloaded
    if (
      (window.performance.navigation &&
        window.performance.navigation.type === 1) ||
      window.performance
        .getEntriesByType("navigation")
        .map((nav) => nav.type)
        .includes("reload")
    ) {
      //previous search, grab state from store
      if (this.$store.state.searchClicked) {
        //call the search
        this.query = this.$store.state.query;
        this.pageCounter = this.$store.state.pageCounter;
        this.search();
      } else {
        //reload but no search, load curated photos
        this.getPhotos();
      }
    } else {
      //first access, get random curated photos
      this.getPhotos();
    }
  }

  /**
   * Gets curated list of photos from local backend server
   */
  getPhotos() {
    window.scrollTo(0, 0);
    const options = {
      method: "GET",
      url: "http://localhost:3000/getPhotos",
      params: { page: this.pageCounter },
    };

    axios
      .request(options)
      .then((response) => {
        //assign response.data to model
        this.model.imgList = Object.assign(
          {},
          this.model.imgList,
          response.data.photos
        );
      })
      .catch((err) => {
        console.log("ERROR");
        console.log(err);
      });
  }

  /**
   * Gets previous photos from curated results when previous button clicked
   */
  getLessPhotos() {
    this.pageCounter--;
    this.getPhotos();
  }

  /**
   * Gets next photos from curated results when next button clicked
   */
  getMorePhotos() {
    this.pageCounter++;
    this.getPhotos();
  }

  /**
   * Clears search by user, resets state, reloads initial list of curated photos
   */
  clearSearch() {
    this.$store.commit("setSearchClicked", false);
    this.$store.commit("setQuery", "");
    this.$store.commit("setPageCounter", 1);
    this.showErrorLabel = false;
    this.query = "";
    this.pageCounter = 1;
    this.getPhotos();
  }

  /**
   * Next button Click; automatically determines to get from search or curated list
   */
  nextClick() {
    if (this.$store.state.searchClicked) {
      //if next called after search, get next of search
      this.searchMore();
    } else {
      //next called on curated photos page, got more curated photos
      this.getMorePhotos();
    }
  }

  /**
   * Previous button click; automatically determines to get previous from search or curated list
   */
  prevClick() {
    if (this.$store.state.searchClicked) {
      //if prev called after search, get prev of search
      this.searchLess();
    } else {
      //prev called on curated photos page, got less curated photos
      this.getLessPhotos();
    }
  }

  /**
   * Gets previous photos from user search after previous clicked
   */
  searchLess() {
    this.pageCounter--;
    this.$store.commit("setPageCounter", this.pageCounter);
    this.search();
  }

  /**
   * Gets next photos from user search after next clicked
   */
  searchMore() {
    this.pageCounter++;
    this.$store.commit("setPageCounter", this.pageCounter);
    this.search();
  }

  /**
   * Search button clicked by user, initiating new search
   */
  newSearch() {
    this.pageCounter = 1;
    this.$store.commit("setSearchClicked", true);
    this.$store.commit("setQuery", this.query);
    this.$store.commit("setPageCounter", this.pageCounter);
    this.search();
  }

  /**
   * Calls search method from local backend server
   */
  search() {
    const options = {
      method: "GET",
      url: "http://localhost:3000/search",
      params: { query: this.query, page: this.pageCounter },
    };

    axios
      .request(options)
      .then((response) => {
        this.model.imgList = Object.assign(
          {},
          this.model.imgList,
          response.data.photos
        );

        if (response.data.total_results === 0) {
          this.showErrorLabel = true;
        } else {
          this.showErrorLabel = false;
        }
      })
      .catch((err) => {
        console.log("ERROR");
        console.log(err);
      });
  }
}
</script>
<style>
.row {
  margin: 10px;
}
.moveRight {
  margin-left: 100px;
}
p {
  color: darkkhaki;
}
</style>
