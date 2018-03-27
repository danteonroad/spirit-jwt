<template>
  <h3>用户详情</h3>
</template>

<script>
export default {
  props: {
    id: Number
  },
  mounted() {
    console.log(`=========> ${this.id}`)
  }
}
</script>

<style lang="less" scoped>

</style>
