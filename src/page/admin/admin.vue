 <template>	 
    <div>
	    <adminMenu>
	        <router-view></router-view>
	    </adminMenu>
    </div>
</template>

<script>
import adminMenu from '../../components/adminMenu.vue'
export default {
  components: {
    adminMenu
  }
}
</script>
