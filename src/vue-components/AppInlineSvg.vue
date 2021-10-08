<template>
  <component
    :is="tag"
    class="inline-svg"
    :class="{ [`inline-svg-${name}`]: name }"
  >
    <slot />
  </component>
</template>

<script>
export default {
  props: {
    tag: {
      type: String,
      default: 'div',
    },
    name: {
      type: String,
      default: undefined,
    },
  },
};
</script>
