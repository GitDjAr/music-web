<!--  -->
<template>
  <!-- <Suspense>
    <router-view v-slot="{ Component, route }">
      <transition :name="route.meta.transition || 'fade'" mode="out-in">
        <keep-alive>
        <component :is="Component" :key="route.meta.usePathKey ? route.path : undefined" />
        </keep-alive>
      </transition>
    </router-view>
  </Suspense> -->
<router-view></router-view>
</template>