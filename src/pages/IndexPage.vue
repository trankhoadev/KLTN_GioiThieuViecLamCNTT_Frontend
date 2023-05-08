<script setup>
import { useStoreJob } from 'src/stores/storeJob';
import { Dark, useQuasar } from 'quasar'
import { watch, onMounted } from 'vue';
import { useStoreAuthentication } from 'src/stores/storeAuthentication';

const storeJob = useStoreJob();
const storeAuthen = useStoreAuthentication();
const $q = useQuasar();

watch(() => $q.dark.isActive, val => {
  // console.log(val)
})

onMounted(async () => {
  await storeJob.getAllPost();
  await storeAuthen.checkCreateUngTuyenVien();
});

</script>

<template>
  <q-layout>
    <q-page-container>
      <q-page>
        <div id="wrap">
          <div class="search-header">
            <div class="search-landing-header-container">
              <div class="search-image-container">

                <picture class="container-picture ">
                  <source type="image/png" sizes="(max-width: 860px) 400px, 620px"
                    srcset="https://cdn.dribbble.com/assets/searches/search-header-400-a40f5b2d953007882ea557c30f11e58eb50e49a2fdb7476ab747cb03d06d0dbb.png 400w, https://cdn.dribbble.com/assets/searches/search-header-800-1f49142870a5c1428edf0f570465ce9114ca4dc76f9d645bcf5c786a18dc697f.png 800w, https://cdn.dribbble.com/assets/searches/search-header-620-ef14484efe06f8675ea0b3b90642e4aa9afdda6c2ec2352346a6a718dbea191f.png 620w, https://cdn.dribbble.com/assets/searches/search-header-1220-4fe74e874cdf583bbac4386ec4522183210907de406153c0f68e2a124b14b79c.png 1240w">
                  <img width="400" height="236" alt="Find designers and inspiration on Dribbble" class="search-image "
                    src="https://cdn.dribbble.com/assets/searches/search-header-800-1f49142870a5c1428edf0f570465ce9114ca4dc76f9d645bcf5c786a18dc697f.png" />
                </picture>

              </div>
              <div class="search-landing-image-text">
                <h1 class="search-landing-heading">Tìm kiếm công việc tại đây</h1>
                <p class="search-landing-heading-text">
                  Có rất nhiều công việc đang chờ bạn khám phá!
                </p>
              </div>
            </div>

            <div class="search-results-details">
              <div class="search-input-container">
                <div class="search-input-with-dropdown">
                  <div class="left-side-wrapper">
                    <q-form @submit="storeJob.searchJob()" class="js-search-input-form search-input-form">
                      <q-input class="search-input js-search-input text-black" v-model="storeJob.searchInput" id="search"
                        placeholder="Search..." type="text" hide-bottom-space clearable />
                    </q-form>
                  </div>

                  <div class="vertical-divider"></div>

                  <span class="btn-search">
                    <!-- <router-link to="/search"></router-link> -->
                    <q-btn @click="storeJob.searchJob()" icon="search" />
                  </span>
                </div>
              </div>


              <ul class="search-results-suggestions">
                <li class="search-results-suggestion search-results-suggestion-heading">Suggested:</li>
                <li class="search-results-suggestion">
                  <a href="/search/landing%20page">Java</a>
                </li>
                <li class="search-results-suggestion">
                  <a href="/search/ios">ReactJS</a>
                </li>
                <li class="search-results-suggestion">
                  <a href="/search/food">VueJS</a>
                </li>
                <li class="search-results-suggestion">
                  <a href="/search/landingpage">PHP</a>
                </li>
                <li class="search-results-suggestion">
                  <a href="/search/uxdesign">NodeJS</a>
                </li>
                <li class="search-results-suggestion">
                  <a href="/search/app%20design">JavaScript</a>
                </li>
              </ul>
            </div>
          </div>
        </div>


        <div class="q-gutter-sm q-px-lg">
          <div class="flex justify-start la-align-center no-wrap q-px-lg hotjob-title" style="align-items: center;">
            <q-icon name="star" size="lg" />
            <h6 class="text-bold text-uppercase">Các công việc được tìm kiếm hàng đầu</h6>
          </div>

          <!-- Render Item List Hot Job -->
          <div class="q-px-lg hotjob-content">
            <div class="row">
              <q-card class="col-12 col-md-4 q-my-md bg-grey-2 text-dark" style="min-height: 200px;"
                v-for="item in storeJob.listData" :key="item._id">
                <q-card-section>
                  <div class="row">
                    <div class="col-3 col-md-3 col-lg-3">
                      <img class="" style="max-width: 100px; max-height: 100px;" :src=item.picture alt="">
                    </div>

                    <div class="col-7 col-lg-7 col-md-12 column">
                      <p class="text-bold text-uppercase q-py-sm q-my-none">
                        {{ item.tieude }}
                      </p>
                      <span style="color: #333;">
                        {{ item.companyName }}
                      </span>
                      <div class="q-py-sm">
                        <div class="row flex justify-between">
                          <div class="col-6">
                            <q-icon name="monetization_on" size="sm" />
                            <span class="text-red-10 q-pl-md q-py-sm text-bold">{{ item.mucluong }}</span>
                          </div>

                          <div class="col-6 flex justify-end">
                            {{ item.diaChi }}
                          </div>
                        </div>
                      </div>
                      <div class="row salary-date">
                        <div class="col-8 col-lg-8 col-md-12 col-sm-8">
                          <div class="flex justify-start">
                            <div v-for="(itemTag) in item.tag" :key="itemTag">
                              <span class="tag">{{ itemTag }}</span>
                            </div>
                          </div>
                        </div>

                        <div class="col-4 col-lg-4 col-md-12 col-sm-4 flex justify-end">
                          {{ new Date(item.createdAt).toLocaleDateString('en-GB') }}
                        </div>
                      </div>
                    </div>
                  </div>
                </q-card-section>
              </q-card>
            </div>
          </div>
        </div>

        <div class="q-gutter-sm q-px-lg q-pt-lg" style="padding: 2em 0;">
          <div class="flex justify-start la-align-center no-wrap q-px-lg hotjob-title" style="align-items: center;">
            <q-icon name="star" size="lg" />
            <h6 class="text-bold text-uppercase">Các ngôn ngữ lập trình đang có cơ hội làm việc hot</h6>
          </div>

          <div class="q-px-lg hotlanguage-content" style="height: 100%;">
            <div class="row q-gutter-lg justify-evenly" style="height: 100%;">
              <q-card class="col-12 col-md-3 q-my-md bg-white" style="min-height: 150px;"
                v-for="item in storeJob.listLanguage" :key="item.id">
                <q-card-section>
                  <div class="row flex flex-center justify-between column" style="flex-direction: column;">
                    <div class="col-12 flex flex-center" style="min-height: 100px;">
                      <img :src=item.picture style="max-width: 25%;" alt="">
                    </div>

                    <div class="col-12 flex flex-center q-py-lg">
                      <h4 class="text-dark">
                        {{ item.name }}
                      </h4>
                    </div>
                  </div>
                </q-card-section>
              </q-card>
            </div>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<style lang="scss" scoped>
@mixin sm {
  @media screen and (max-width: 799px) {
    @content;
  }
}

#wrap {
  -ms-flex: 1 0 auto;
  flex: 1 0 auto;
  min-height: 55vh;

  @include sm() {
    min-height: 0;
  }
}

ol {
  list-style: none;
}

ul {
  list-style: none;
}

blockquote {
  quotes: none;
}

q {
  quotes: none;
}

table {
  border-spacing: 0;
  border-collapse: collapse;
}

html {
  height: 100%;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

a {
  &:link {
    -webkit-transition: color 200ms ease;
    transition: color 200ms ease;
    color: #ea4c89;
    text-decoration: none;
  }

  &:visited {
    -webkit-transition: color 200ms ease;
    transition: color 200ms ease;
    color: #ea4c89;
    text-decoration: none;
  }

  &:link.color-white {
    color: #fff;
  }

  &:visited.color-white {
    color: #fff;
  }

  &:active {
    outline: none;
  }
}

.pro-text {
  color: #ea4c89 !important;
}

.job-text {
  color: #c142a0 !important;
}

.hiring-text {
  color: #c142a0 !important;
}

body {
  font-family: "Haas Grot Text R Web", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 28px;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: column;
  flex-direction: column;
  height: 100%;
  overflow-x: hidden;
  background: #fff;
  color: #0d0c22;
}

.search-input-with-dropdown {
  display: -ms-flexbox;
  display: flex;
  position: relative;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  -ms-flex-align: center;
  align-items: center;
  height: 64px;
  border-radius: 8px;
  background: #fff;
  -webkit-box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.06);
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.06);

  .left-side-wrapper {
    display: -ms-flexbox;
    display: flex;
    position: relative;
    -ms-flex: 1;
    flex: 1;
    -ms-flex-align: center;
    align-items: center;
    height: 100%;
    padding-left: 28px;
  }

  .search-input-form {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

  .search-input {
    height: 100%;
    padding: 0;
    padding-right: 24px;
    padding-left: 50px;
    background: #fff;
    background: transparent;
    font-size: 16px;
    width: 100%;

    &:hover {
      border-color: transparent;
      background: transparent;
      -webkit-box-shadow: none;
      box-shadow: none;
    }

    &:focus {
      border-color: transparent;
      background: transparent;
      -webkit-box-shadow: none;
      box-shadow: none;
    }

    &:active {
      border-color: transparent;
      background: transparent;
      -webkit-box-shadow: none;
      box-shadow: none;
    }

    &::-webkit-search-cancel-button {
      width: 16px;
      height: 16px;
      opacity: 0.5;
      background-size: 100%;
      -webkit-appearance: none;
      appearance: none;
    }
  }

  .vertical-divider {
    width: 2px;
    height: 50%;
    margin-right: 24px;
    background: #e7e7e9;
  }

  .btn-search {
    position: static;
    min-width: 84px;
    margin-right: 36px;

    button {
      background-color: #f20091;
      color: #ffffff;
    }

    .btn-search-link {
      display: -ms-flexbox;
      display: flex;
      -ms-flex-align: center;
      align-items: center;
      -ms-flex-pack: justify;
      justify-content: space-between;
      padding: 0;
      color: #0d0c22;
      font-family: "Haas Grot Text R Web", "Helvetica Neue", Helvetica, Arial, sans-serif;
      font-size: 14px;
      font-weight: 500;
      line-height: 20px;

      .btn-search-caret {
        width: 14px;
        height: 14px;
        margin-left: 8px;
      }
    }

    .btn-search-options {
      right: 0;
      left: auto;
      min-width: 136px;
      text-align: left;
    }
  }
}

.search-header {
  display: -ms-flexbox;
  display: flex;
  position: relative;
  -ms-flex-direction: column;
  flex-direction: column;
  -ms-flex-align: center;
  align-items: center;

  .search-results-details {
    z-index: 1;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 100%;
    padding: 0 16px;
    text-align: center;
  }

  .background-bar {
    width: 100%;
    height: 80px;
    background: #f3f3f4;
  }

  .search-input-container {
    z-index: 1;
    width: 100%;
    max-width: 628px;
    margin: 0 auto;
    -webkit-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
  }

  .search-results-heading {
    font-family: "Haas Grot Text R Web", "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 24px;
    font-weight: 700;
    line-height: 29px;
    margin-bottom: 12px;

    &:first-letter {
      text-transform: capitalize;
    }
  }

  .search-results-suggestions {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    -ms-flex-pack: center;
    justify-content: center;
    margin-bottom: 8px;

    .search-results-suggestion {
      font-family: "Haas Grot Text R Web", "Helvetica Neue", Helvetica, Arial, sans-serif;
      font-size: 14px;
      font-weight: 400;
      line-height: 20px;
      margin-right: 16px;
      padding-bottom: 4px;
    }

    .search-results-suggestion-heading {
      font-family: "Haas Grot Text R Web", "Helvetica Neue", Helvetica, Arial, sans-serif;
      font-size: 14px;
      font-weight: 500;
      line-height: 20px;
      color: #6e6d7a;
    }
  }

  .search-landing-header-container {
    position: relative;
    width: 100%;
    min-height: 250px;
    max-height: 360px;
    background-color: #fd507e;

    &:before {
      content: "";
      display: block;
      padding-top: 25%;
    }

    .lazyload {
      visibility: hidden;
    }
  }

  .search-image-container {
    display: -ms-flexbox;
    display: flex;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    -ms-flex-pack: center;
    justify-content: center;
    width: 100%;
  }

  .search-image {
    height: auto;
    max-height: 100%;
  }

  .search-landing-image-text {
    position: absolute;
    top: 50%;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 100%;
    padding: 0 16px;
    -webkit-transform: translateY(-70%);
    -ms-transform: translateY(-70%);
    transform: translateY(-70%);
    color: #fff;
    text-align: center;
  }

  .search-landing-image-attribution {
    display: none;
    position: absolute;
    right: 16px;
    bottom: 16px;
    color: #fff;
    font-family: "Haas Grot Text R Web", "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 12px;
    font-weight: 400;
    line-height: 16px;

    a {
      color: #fff;
      text-decoration: underline;
    }
  }

  .search-landing-heading {
    font-family: "Haas Grot Text R Web", "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 32px;
    font-weight: 700;
    line-height: 38px;
    margin-top: 6%;
    margin-bottom: 16px;
  }

  .search-landing-heading-text {
    font-family: "Haas Grot Text R Web", "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 24px;
    font-weight: 500;
    line-height: 22px;
  }
}

.hotjob-content {
  .tag {
    margin: 2em 0 0 1em;
    padding: .1em .5em;
    border: 1px solid #d2d3d3;
    color: #575656;
    transition: all .2s ease;
    cursor: pointer;

    &:hover {
      color: #fd507e;
      transition: all ease .3s;
    }
  }
}

/* Responsive */
@media (min-width: 768px) {
  .search-header {
    padding: 0;

    .search-results-heading {
      font-family: "Haas Grot Text R Web", "Helvetica Neue", Helvetica, Arial, sans-serif;
      font-size: 32px;
      font-weight: 700;
      line-height: 38px;
    }

    .search-results-description {
      text-align: center;
    }

    .search-landing-heading {
      font-family: "Haas Grot Text R Web", "Helvetica Neue", Helvetica, Arial, sans-serif;
      font-size: 48px;
      font-weight: 700;
      line-height: 56px;
    }
  }
}

@media (min-width: 500px) {
  .search-header {
    .search-image {
      width: 100%;
    }

    .search-landing-heading {
      margin-top: 0;
    }

    .search-landing-heading-text {
      font-family: "Haas Grot Text R Web", "Helvetica Neue", Helvetica, Arial, sans-serif;
      font-size: 20px;
      font-weight: 400;
      line-height: 32px;
    }
  }

  .search-landing-shots {
    margin-top: 32px;
  }
}

@media (min-width: 920px) {
  .search-header {
    .search-landing-image-attribution {
      display: block;
    }
  }
}

@media (-webkit-min-device-pixel-ratio: 1.5) {
  html {
    -webkit-font-smoothing: subpixel-antialiased;
    -moz-osx-font-smoothing: auto;
  }
}

@media (min-resolution: 144dpi) {
  html {
    -webkit-font-smoothing: subpixel-antialiased;
    -moz-osx-font-smoothing: auto;
  }
}

@media only screen and (max-width: 959px) {
  html {
    -webkit-text-size-adjust: none;
    -moz-text-size-adjust: none;
    -ms-text-size-adjust: none;
    text-size-adjust: none;
    -webkit-tap-highlight-color: transparent;
  }
}
</style>
