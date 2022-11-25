import type { Router, RouteLocationNormalizedLoaded } from 'vue-router'
import type { StoreOptions } from 'vuex'
import store from 'src/store'
import type { Component } from 'vue'

export interface Props {
  props: {
    id: string,
    router: Router,
    singerInfo: object,
    // route: RouteLocationNormalizedLoaded,
    // store: StoreOptions<typeof store>
  }
}

export interface tabsType {
  title: string,
  id: string,
  Com: Component,
  activation: boolean
}