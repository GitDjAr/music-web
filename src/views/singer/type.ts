import type { Component } from 'vue'

export interface Props {
  props: {
    id: string,
    singerInfo?: object,
  }
}

export interface tabsType {
  title: string,
  id: string,
  Com: Component,
  activation: boolean
}