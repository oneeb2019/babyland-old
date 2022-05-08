import colors from 'vuetify/es5/util/colors'

export default {
  theme: {
    dark: true,
    themes: {
      light: {
        primary: '#c30f16',
        secondary: colors.grey.darken1,
        accent: colors.shades.black,
        error: colors.red.accent3,
      },
      dark: {
        primary: '#f78282',
        secondary: '#c3161a',
        secondaryLight: colors.indigo.lighten2,
        third: colors.teal.darken1,
        thirdLight: colors.teal.lighten1,
        grey: colors.grey.darken1,
        red: colors.red.lighten2,
        accent: '#8ae8d6',
        error: '#ff4444',
        info: '#0081dd',
        success: '#00C851',
        warning: '#f9be3f',
        edgeColor: '#3A87AD',
      },
    },
  },
}
