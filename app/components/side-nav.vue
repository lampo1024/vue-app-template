<style>
	.side-nav {
		width: 100%;
		box-sizing: border-box;
    background-color:#fff;
    margin-right:15px;
	}
	
	.side-nav ul {
		padding: 0;
		margin: 0;
		overflow: hidden;
	}
	
	.side-nav li {
		list-style: none;
	}
	
	.side-nav .nav-group__title {
		background-color:#333;
    font-size: 16px;
		/*color: #99a9bf;*/
    color:#fff;
		padding-left: 8px;
		line-height: 40px;
		margin-top: 10px;
	}
	
	.nav-item a.main-nav {
    background-color:#333;
		font-size: 16px;
		/*color: #5e6d82;*/
    color:#fff;
		line-height: 40px;
		height: 40px;
		margin: 0;
		padding: 0;
		text-decoration: none;
		display: block;
		position: relative;
		transition: all .3s;
	}

  .nav-item a.item {
		font-size: 16px;
		color: #5e6d82;
		line-height: 40px;
		height: 40px;
		margin: 0;
		padding: 0;
		text-decoration: none;
		display: block;
		position: relative;
		transition: all .3s;
	}
	
	.nav-item a.active,.nav-item a:hover {
		color: #20a0ff;
	}

  .side-nav .sub-nav{
    padding-left: 20px;
  }
  .nav-group .pure-menu-list{
    padding-left: 15px;
  }
</style>
<template>
	<div class="side-nav">
		<ul>
			<li class="nav-item" v-for="item in data">
				<a v-if="!item.path" class="main-nav">{{item.name}}</a>
				<router-link v-else class="item" active-class="active" :to="base + item.path" exact v-text="item.title || item.name">
				</router-link>
				<ul class="pure-menu-list sub-nav" v-if="item.children">
					<li class="nav-item" v-for="navItem in item.children">
						<router-link class="item" active-class="active" :to="base + navItem.path" exact v-text="navItem.title || navItem.name">
						</router-link>
					</li>
				</ul>
				<template v-if="item.groups">
					<div class="nav-group" v-for="group in item.groups">
						<div class="nav-group__title">{{group.groupName}}</div>
						<ul class="pure-menu-list">
							<li class="nav-item" v-for="navItem in group.list" v-if="!navItem.disabled">
								<router-link class="item" active-class="active" :to="base + navItem.path" exact v-text="navItem.title"></router-link>
							</li>
						</ul>
					</div>
				</template>
			</li>
		</ul>
	</div>
</template>
<script>
  export default {
    props: {
      data: Array,
      base: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        highlights: [],
        navState: []
      };
    }
  };
</script>