import { addons } from '@storybook/addons'
import { create } from '@storybook/theming'

const theme = create({
  base: 'light',
  brandTitle: 'nanoclamp',
  brandUrl: 'https://github.com/microlinkhq/nanoclamp',
  appBg: 'white',
  appContentBg: 'white',
  appBorderColor: 'white'
})

addons.setConfig({ theme })
