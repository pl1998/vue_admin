<!-- Vue SFC -->
<template>
  <div>
    <treeselect v-model="valueId" :multiple="false" :options="nodes" :normalizer="normalizer" />
  </div>
</template>

<script>
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";

export default {
  components: { Treeselect },
  props: ["nodes", "value"],
  data () {
    return {
      valueId: 0,
      node: {
           id: 0,
           name: null,
           title: null,
           label:null
      },
      normalizer (node) {
        return {
          id: node.id,
          label: node.title,
          children: node.children
        };
      }
    };
  },
  mounted () {
    this.valueId = this.value ? this.value : 0;
  },

  watch: {
    valueId (newId) {
      this.$emit("setId", this.valueId);
    }
  }
};
</script>
