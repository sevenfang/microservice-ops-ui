<template>
	<div class='menu-wrapper'>
	
	<template v-for="item in routes">
		<!-- <router-link v-if="item.children.length>0" :to="item.code+'/'+item.children[0].code">
			<el-menu-item :index="item.code+'/'+item.children[0].code" class='submenu-title-noDropdown'>
				<icon-svg v-if='item.icon' :icon-class="item.icon"></icon-svg>
				<span slot="title">{{item.children[0].title}}</span>
			</el-menu-item>
		</router-link> -->
		<el-submenu :index="item.title">
			<template slot="title">
				<icon-svg v-if='item.icon' :icon-class="item.icon"></icon-svg>
				<span>{{item.title}}</span>
			</template>
			<template v-for="child in item.children">
				<sidebar-item class='nest-menu' v-if='child.children&&child.children.length>0' :routes='[child]'> </sidebar-item>
				<div v-else>
					<div>
							<router-link v-if="child.type!='http'"  :to="{path:'/'+item.code+'/'+child.code}">
								<el-menu-item :index="item.code+'/'+child.code">
									<icon-svg v-if='child.icon' :icon-class="child.icon"></icon-svg>
									<span>{{child.title}}</span>
								</el-menu-item>
							</router-link>
							<router-link v-else  :to="{path:'/'+item.code+'/'+child.code,query: { href: child.href }}" @click.native="linkvalue(child.href)" replace>
								<el-menu-item :index="item.code+'/'+child.code">
									<icon-svg v-if='child.icon' :icon-class="child.icon"></icon-svg>
									<span>{{child.title}}</span>
								</el-menu-item>
							</router-link>
					</div>
					
				</div>
				
			</template>
		</el-submenu>

	</template>

	</div>
</template>

<script>
  export default {
    name: 'SidebarItem',
    props: {
      routes: {
        type: Array
      }
    },
  data () {
      return { 
        hyperlink_url:'',
        loading: false,
        html: ''
      }
    }, 
	methods:{
	linkvalue(href){
		// this.hyperlink_url=
			// alert(href);
	}
	},
	  mounted () {
     	this.hyperlink_url='';
    },
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>

