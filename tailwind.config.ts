/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: ['app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}', '@app/components/**/*.{ts,tsx}'],
  theme: {
    container: {
      center: 'true',
      padding: '2rem',
      screens: {
        xs: '480px',
        '2xl': '1400px',
      },
    },
    extend: {
      boxShadow: {
        custom: '0px 0px 30px 5px rgba(0, 0, 0, 0.10)',
      },
      flexGrow: {
        2: '2',
      },
      colors: {
        border: '#CCCCCC',
        separator: '#EDEDED',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: '#FFFFFF',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: '#3296FF',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: '#E1E6EB',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: '#D83020',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: '#EDEDED',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: '#5283ED',
          foreground: 'hsl(var(--accent-foreground))',
        },
        label: {
          DEFAULT: '#1E1E1E',
        },
        success: {
          DEFAULT: '#19C3B9',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))',
        },
        grayShades: {
          shade1: '#F2F2F2',
          shade2: '#F8F9F9',
          shade3: '#DEDEDE',
          shade4: '#E6E6E6',
          shade5: '#686868',
          shade6: '#8B8B8B',
        },
        blueShades: {
          shade1: '#E4EBFD',
        },
        blackShades: {
          shade1: '#2D2D2D',
        },
        redShades: {
          shade1: '#d63939',
        },
        greenShades: {
          shade1: '#2fb344',
        },
        validations: {
          edge: '#D83020',
          upstream: '#169C7C',
          equipment: '#DE3D82',
          span: '#628FEE',
        },
      },
      borderRadius: {
        lg: '6px',
        md: '4px',
        sm: '2px',
        custom: '0.9375rem',
      },
      fontFamily: {
        mont: ['Mont', 'serif'],
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
      },
      fontSize: {
        xxs: ['0.5rem', { lineHeight: '0.75rem' }],
        xss: ['0.625rem', { lineHeight: '0.875rem' }],
        xs: ['0.75rem', { lineHeight: '1rem' }],
        sm: ['0.875rem', { lineHeight: '1.25rem' }],
        base: ['1rem', { lineHeight: '1.5rem' }],
        lg: ['1.125rem', { lineHeight: '1.75rem' }],
        xl: ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  safelist: [
    {
      pattern: /border-validations-(edge|upstream|equipment|span)/,
    },
    {
      pattern: /fill-validations-(edge|upstream|equipment|span)/,
    },
    {
      pattern: /bg-validations-(edge|upstream|equipment|span)/,
    },
  ],
  plugins: [require('tailwindcss-animate')],
};
