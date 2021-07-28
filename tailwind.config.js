
function withOpacity(variableName) {
    return ({ opacityValue }) => {
      if (opacityValue != undefined) {
        return `rgba(var(${variableName}), ${opacityValue})`
      }
      return `rgb(var(${variableName}))`
    }
  }
  
  module.exports = {
    mode: 'jit',
    darkMode: 'class',
    purge: ['./public/**/*.html', './src/**/*.{js,jsx,ts,tsx,vue}'],
    theme: {
      extend: {
        textColor: {
          skin: {
            base: withOpacity('--color-text-base'),
            muted: withOpacity('--color-text-muted'),
            inverted: withOpacity('--color-text-inverted'),
          }
        },
        backgroundColor: {
          skin: {
            base: withOpacity('--color-fill-base'),
            muted: withOpacity('--color-fill-muted'),
          }
        },
        maxHeight: {
            '1/2': '50%',
        },  
      },
    },
    variants: {
      extend: {
      },
    },
    plugins: [require('@tailwindcss/forms')],
  };
  