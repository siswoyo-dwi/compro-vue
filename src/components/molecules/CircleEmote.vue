<template>
    <div
      :class="[
        'overflow-hidden rounded-full border-2 border-gray-300 hover:scale-110 hover:border-gray-500 transition-transform duration-200',
        sizeClass,
        'bg-black'
      ]"
      :title="label"
    >
    </div>
  </template>
  
  <script>
  export default {
    name: 'CircleEmote',
    props: {
      src: String,
      label: String,
      size: {
        type: String,
        default: 'md'
      }
    },
    computed: {
      sizeClass() {
        switch (this.size) {
          case 'sm': return 'w-8 h-8';
          case 'lg': return 'w-16 h-16';
          case 'md':
          default: return 'w-12 h-12';
        }
      }
    }
  }
  </script>
  