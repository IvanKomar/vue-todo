<template>
  <div>
    <nav class="navbar">
      <label class="navbar-toggle" id="js-navbar-toggle" for="chkToggle">
        <Burger/>
      </label>
      <input type="checkbox" id="chkToggle"/>
      <ul class="main-nav" id="js-menu">

          <router-link 
            v-for="link in links"
            :key="link.url"
            tag="li"
            active-class="active"
            :to="link.url"
            :exact="link.exact"
          >
            <a class="nav-links">{{link.title}}</a>
          </router-link>
      </ul>
    </nav>
  </div>
</template>

<script>
import Burger from '@/components/elements/Burger.vue'
export default {
  name: 'Navbar',
  components: {
    Burger
  },
  data: () => ({
    links: [
      {title: 'Список заметок', url: '/', exact: true },
      {title: 'Создать заметку', url: '/create' }
    ]
  })
}
</script>

<style>
 .navbar {
  min-height: 55px;
  font-size: 18px;
  background-image: linear-gradient(260deg, #2376ae 0%, #c16ecf 100%);
  border: 1px solid rgba(0, 0, 0, 0.2);
  padding-bottom: 10px;
}

.main-nav {
  list-style-type: none;
  display: none;
}

.nav-links {
  text-decoration: none;
  color: rgba(255, 255, 255, 0.938);
}

.main-nav li {
  text-align: center;
  margin: 15px auto;
}
.main-nav .active {
  font-weight: bold;
}

.navbar-toggle {
  position: absolute;
  top: 10px;
  right: 20px;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.8);
  font-size: 24px;
}

#chkToggle {
  display: none;
}

#chkToggle:checked + ul.main-nav {
  display: block;
}

@media screen and (min-width: 768px) {
  .navbar {
    display: flex;
    justify-content: space-between;
    padding-bottom: 0;
    height: 70px;
    align-items: center;
  }

  #chkToggle:checked + ul.main-nav {
    display: flex;
  }

  .main-nav {
    display: flex;
    margin-right: 30px;
    flex-direction: row;
    justify-content: flex-end;
  }

  .main-nav li {
    margin: 0;
  }

  .nav-links {
    margin-left: 40px;
  }

  .navbar-toggle {
    display: none;
  }

  .nav-links:hover {
    color: rgba(255, 255, 255, 1);
  }
}
</style>