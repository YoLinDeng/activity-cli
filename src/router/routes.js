const ApplyRoutes = [
  {
    path: '/insure/apply',
    name: 'Apply',
    component: () => import(/* webpackChunkName: "Apply" */ '@/template/hyb_tk_million/index')
  }
]

export default [
  {
    path: '/',
    redirect: '/insure/apply'
  },
  ...ApplyRoutes
]
