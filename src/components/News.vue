<template>
  <div class="container-fluid px-0" id="wrapper">
    <div class="searchBar">
      <form action="" class="h-100">
        <input class="form-control form-control-lg rounded-0 bg-dark text-white border-0 shadow-none h-100" type="text" placeholder="Search">
      </form>
      <div class="searchIcons">
        <i class="fas fa-search"></i>
        <i class="fas fa-times"></i>
      </div>
    </div>

    <div class="result-list">
      
    </div>
  </div>
</template>

<script>
 export default {
   props: ['apiKey'],
   data: () => {
     return {}
   }
  }
</script>

<style lang="scss">
  
  #wrapper {
    position: relative;

    .searchBar {
      position: absolute;
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
    
    }
  
</style>