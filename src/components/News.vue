<template>
  <div class="container-fluid px-0" id="wrapper">
    <div class="searchBar position-relative">
      <form @submit.prevent="fetchSearchNews" class="h-100">
        <input class="form-control form-control-lg rounded-0 bg-dark text-white border-0 shadow-none h-100" type="text" placeholder="Search" v-model="searchword">
      </form>
      <div class="searchIcons">
        <i v-if="!isBusy" class="fas fa-search" @click="fetchSearchNews"></i>
        <i v-else class="fas fa-spinner fa-spin"></i>
        <i class="fas fa-times" @click="fetchTopNews"></i>
      </div>
    </div>

    <div class="container-lg d-flex flex-lg-row flex-wrap px-0 px-lg-2">
      <article v-for="(article, index) in articles" :key="index" class="col-lg-4 col-md-6 px-0 px-lg-2 px-md-3" @click="navTo(article.url)">
        <header class="">
            <img v-if="article.urlToImage" :src="article.urlToImage" class="img-fluid" alt="">
            <i v-else class="fas fa-image"></i>
        </header>
        <section v-html="article.title" class="wrap__content"></section>
        <footer>
          <i class="fas fa-chevron-right"></i>
        </footer>
      </article>
    </div>
    <div ref="infiniteScrollerTrigger" id="scroll-trigger">
      <i v-if="showloader" class="fas fa-spinner fas-spin"></i>
    </div>
  </div>
</template>

<script>
 export default {
   props: ['apiKey'],
   data() {
     return {
       apiUrl: '',
       isBusy: false,
       showloader: false,
       currentPage: 1,
       totalResults: 0,
       maxParPage: 20,
       searchword: '',
       articles: [],
       country: 'us'
     }
   },
   computed: {
     pageCount() {
       return Math.ceil(this.totalResults/this.maxParPage);
     }
   },
   methods: {
     navTo(url) {
       window.open(url)
     },
     resetData() {
       this.currentPage = 1;
       this.articles = [];
     },
     fetchSearchNews(){
      if(this.searchword !== '') {
        this.apiUrl = 'http://newsapi.org/v2/everything?q=' + this.searchword + '&pageSize=' + this.maxParPage + '&apiKey=' + this.apiKey;
        this.isBusy = true;

        this.resetData();
        this.fetchData();
      } else {
        this.fetchTopNews();
      }
     },
     fetchTopNews() {
       this.apiUrl = 'http://newsapi.org/v2/top-headlines?country=' + this.country + '&pageSize=' + this.maxParPage + '&apiKey=' + this.apiKey;
       this.isBusy = true;
       this.searchword = '';

       this.resetData();
       this.fetchData();
     },
     fetchData() {
       return this.$http.get(this.apiUrl + '&page=' + this.currentPage)
        .then( (resp) => {
          this.totalResults = resp.data.totalResults;
          resp.data.articles.forEach( element => {
            this.articles.push(element);
          });
          
          this.isBusy = false;
          this.showloader = false
          
        })
        .catch((error) => {
          console.log(error);
        })
     },
     scrollTriger() {
       const observer = new IntersectionObserver( (entries) => {
         entries.forEach( entry => {
           if(entry.intersectionRatio > 0 && this.currentPage < this.pageCount) {
             this.showloader = true;
             this.currentPage += 1;
             this.fetchData();
           }
         });
       });
       observer.observe(this.$refs.infiniteScrollerTrigger);
     }
   },
    created() {
      this.fetchTopNews()
    },
    mounted() {
      this.scrollTriger();
    }
  }
</script>

<style lang="scss">
  
  #wrapper {
    position: relative;

    .searchBar {
      width: 100%;
      height: 60px;
      font-size: 1.6rem;

      form {
        input {
          font-size: 1.5rem;
        }
      }

      .searchIcons {
        position: absolute;
        color: #fff;
        right: 20px;
        top: 50%;
        transform: translateY(-50%);

        i {
          cursor: pointer;
          &:nth-child(2) {
            margin-left: 15px;
          }
        }
      }
    }

    article {
      cursor: pointer;

      @media only screen and (max-width: 768px) {

        display: grid;
        grid-template-columns: 160px auto 40px;
        grid-column-gap: 10px;
        overflow: hidden;
        align-items: center;

        header {
          display: flex;
          justify-content: center;
          overflow: hidden;
        }
        .wrap__content {
          font-size: 10px;
        }
        footer {
          i {
            font-size: 1.6rem;
            color: #888;
          }
        }
      }
    }

    #scroll-trigger {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100px;
      font-size: 1.6rem;
    
    }  
    
  }
  
</style>